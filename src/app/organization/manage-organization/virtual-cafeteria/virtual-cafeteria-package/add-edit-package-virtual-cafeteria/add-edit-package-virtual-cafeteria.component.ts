import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MlApiMainService } from '@service/apiService/mlApiMain.service';

@Component({
  selector: 'app-add-edit-package-virtual-cafeteria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-edit-package-virtual-cafeteria.component.html',
  styleUrls: ['./add-edit-package-virtual-cafeteria.component.scss']
})
export class AddEditPackageVirtualCafeteriaComponent implements OnInit {
  packageForm: FormGroup = new FormGroup({
    selectedClusters: new FormControl([], Validators.required),
    packageCategory: new FormControl([], Validators.required),
    selectedMeals: new FormControl([], Validators.required),
    itemList: new FormArray([], this.minItemsValidator(1))
  });
  clusters: any[] = [];
  meals: any[] = [];
  filteredMeals: any[] = [];
  packageCategories: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditPackageVirtualCafeteriaComponent>,
    private mlApiMainService: MlApiMainService,
    private apiMainService: ApiMainService
  ) { }

  async ngOnInit(): Promise<void> {
    this.clusters = await this.mlApiMainService.getAllGeoFencingList() as any[];
    this.meals = await this.mlApiMainService.getMealPackageList() as any[];
    if (!this.data.addNew) {
      let alreadyPackages = this.data.alreadyPackages;
      this.meals = this.meals.filter(pkg => !alreadyPackages.includes(pkg._id));
    }
    this.packageForm.get('selectedClusters')?.valueChanges.subscribe(() => {
      setTimeout(() => this.updatePackageCategories(), 100);
    });
    this.packageForm.get('packageCategory')?.valueChanges.subscribe(() => {
      setTimeout(() => this.filterMeals(), 100);
    });
    this.packageForm.get('selectedMeals')?.valueChanges.subscribe(() => {
      setTimeout(() => this.buildItemList(), 100);
    });
  }

  get itemListArray(): FormArray {
    return this.packageForm.get('itemList') as FormArray;
  }

  minItemsValidator(min: number) {
    return (control: AbstractControl) => {
      const array = control as FormArray;
      return array.length >= min ? null : { minItems: { required: min, actual: array.length } };
    };
  }

  updatePackageCategories(): void {
    const selectedClusters: string[] = this.packageForm.value.selectedClusters || [];
    const categoriesSet = new Set<string>();
    this.meals.forEach(meal => {
      if (selectedClusters.length === 0 || meal.clusters.some((c: any) => selectedClusters.includes(c))) {
        categoriesSet.add(meal.packageCategory);
      }
    });
    this.packageCategories = Array.from(categoriesSet);
    const selectedCategories = this.packageForm.value.packageCategory || [];
    const validCategories = selectedCategories.filter((c: any) => this.packageCategories.includes(c));
    this.packageForm.get('packageCategory')?.setValue(validCategories, { emitEvent: false });
    this.filterMeals();
  }

  filterMeals(): void {
    const selectedClusters: string[] = this.packageForm.value.selectedClusters || [];
    const selectedCategories: string[] = this.packageForm.value.packageCategory || [];
    if (selectedClusters.length > 0 && selectedCategories.length > 0) {
      this.filteredMeals = this.meals.filter(meal =>
        meal.clusters.some((c: any) => selectedClusters.includes(c)) &&
        selectedCategories.includes(meal.packageCategory)
      );
      this.buildItemList();
      return;
    }
    while (this.itemListArray.length > 0) {
      this.itemListArray.removeAt(0);
    }
    this.filteredMeals = [];
  }


  buildItemList(): void {
    const selectedMealIds: string[] = this.packageForm.value.selectedMeals || [];
    this.itemListArray.clear();

    selectedMealIds.forEach(id => {
      const meal = this.meals.find(m => m._id === id);
      if (meal) {
        this.itemListArray.push(new FormGroup({
          masterMenuId: new FormControl(meal._id),
          name: new FormControl(meal.packageName || ''),
          payToKitchenPerMeal: new FormControl(meal.payToKitchenPerMeal || 0),
          payToKitchenPerMeal2: new FormControl(meal.payToKitchenPerMeal2 || 0),
          ddDiscount: new FormControl(meal.ddDiscount || 0),
          subsidyValue: new FormControl(meal.subsidyValue || 0),
          subsidyType: new FormControl(meal.subsidyType || 'flat')
        }));
      }
    });
    this.itemListArray.updateValueAndValidity();
  }

  async savePackage(): Promise<void> {
    try {
      if (!this.packageForm.valid) {
        console.warn("❌ Form invalid");
        return;
      }
      const orgObj = this.data.orgObj;
      const selectedCafeteria = this.data.selectedCafeteria;
      if (!orgObj || !selectedCafeteria) {
        console.error("❌ Missing orgObj or selected cafeteria");
        return;
      }
      const { _id: org_id, organization_name } = orgObj;
      const { cafeteria_id, cafeteria_name, address1, address2, cafeteria_city, cafeteria_location } = selectedCafeteria;
      const { itemList } = this.packageForm.getRawValue();
      const mergedMeals = itemList.map((item: any) => {
        const originalMeal = this.meals.find(m => m._id === item.masterMenuId);
        if (!originalMeal) {
          console.warn("⚠ Missing meal with ID:", item.masterMenuId);
          return { ...item, masterMenuId: item.masterMenuId, isActive: true, };
        }
        const { _id, ...mealWithoutId } = originalMeal;
        return { ...mealWithoutId, ...item, masterMenuId: item.masterMenuId, isActive: true };
      });
      if (!this.data.addNew) {
        const payload = {
          cafeteriaId: cafeteria_id,
          itemList: mergedMeals
        };
        const response = await this.apiMainService.updateMealItemList(payload);
        this.closeDialog();
        return;
      }
      const payload = {
        org_id,
        org_name: organization_name,
        cafeteriaDetails: {
          cafeteria_name,
          address1,
          address2,
          cafeteria_city,
          cafeteria_location,
          cafeteria_id,
        },
        itemList: mergedMeals
      };
      const response = await this.apiMainService.saveMealAweOutlet(payload);
      this.closeDialog();
    } catch (error) {
      console.error("❌ Error saving package:", error);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  removeItem(index: number) {
    const item = this.itemListArray.at(index);
    if (!item) return;
    const masterMenuId = item.get('masterMenuId')?.value;
    this.itemListArray.removeAt(index);
    const selectedMeals: string[] = this.packageForm.value.selectedMeals || [];
    const updatedMeals = selectedMeals.filter(id => id !== masterMenuId);
    this.packageForm.get('selectedMeals')?.setValue(updatedMeals);
    this.buildItemList();
  }
}

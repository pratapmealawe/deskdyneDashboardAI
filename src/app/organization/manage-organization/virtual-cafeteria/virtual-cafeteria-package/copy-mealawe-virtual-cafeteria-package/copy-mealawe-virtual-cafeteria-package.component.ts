import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { Subject, takeUntil } from 'rxjs';

interface Cluster {
  clusterId: string;
  clusterName: string;
}

interface Meal {
  _id: string;
  packageName: string;
  packagePrice: number;
  discount: number;
  packageCategory: string;
  clusters: string[];
  payToKitchenPerMeal?: number;
  payToKitchenPerMeal2?: number;
  ddDiscount?: number;
  subsidyValue?: number;
  subsidyType?: 'flat' | 'percentage';
}

interface DialogData {
  orgObj: any;
  selectedCafeteria: any;
  meals: any[];
  alreadyPackages: string[];
}

@Component({
  selector: 'app-copy-mealawe-virtual-cafeteria-package',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './copy-mealawe-virtual-cafeteria-package.component.html',
  styleUrls: ['./copy-mealawe-virtual-cafeteria-package.component.scss']
})
export class CopyMealaweVirtualCafeteriaPackageComponent implements OnInit, OnDestroy {
  packageForm: FormGroup;
  meals: Meal[] = [];
  filteredMeals: Meal[] = [];
  isSubmitting = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CopyMealaweVirtualCafeteriaPackageComponent>,
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    private fb: FormBuilder
  ) {
    this.packageForm = this.fb.group({
      selectedMeals: [[], Validators.required],
      itemList: this.fb.array([], [this.minItemsValidator(1)])
    });
  }

  async ngOnInit(): Promise<void> {
    this.meals = this.data.meals || [];
    if (this.data.alreadyPackages) {
      this.meals = this.meals.filter(pkg => !this.data.alreadyPackages.includes(pkg._id));
    }
    this.filteredMeals = this.meals;
    this.setupFormSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get itemListArray(): FormArray {
    return this.packageForm.get('itemList') as FormArray;
  }


  private setupFormSubscriptions(): void {
    this.packageForm.get('selectedMeals')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.buildItemList());
  }

  private minItemsValidator(min: number) {
    return (control: AbstractControl) => {
      const array = control as FormArray;
      return array.length >= min ? null : { minItems: { required: min, actual: array.length } };
    };
  }


  private syncSelectedMealsWithFiltered(): void {
    const selectedMeals: string[] = this.packageForm.value.selectedMeals || [];
    const validSelectedMeals = selectedMeals.filter(id => this.filteredMeals.some(m => m._id === id));
    
    if (validSelectedMeals.length !== selectedMeals.length) {
      this.packageForm.get('selectedMeals')?.setValue(validSelectedMeals);
    } else {
      this.buildItemList();
    }
  }

  buildItemList(): void {
    const selectedMealIds: string[] = this.packageForm.value.selectedMeals || [];
    
    // Efficiently update FormArray without losing existing data for common items
    const currentItems = this.itemListArray.controls.map(c => c.value.masterMenuId);
    
    // Remove items no longer selected
    for (let i = this.itemListArray.length - 1; i >= 0; i--) {
      if (!selectedMealIds.includes(this.itemListArray.at(i).value.masterMenuId)) {
        this.itemListArray.removeAt(i);
      }
    }

    // Add new items
    selectedMealIds.forEach(id => {
      if (!currentItems.includes(id)) {
        const meal = this.meals.find(m => m._id === id);
        if (meal) {
          this.itemListArray.push(this.fb.group({
            masterMenuId: [meal._id],
            name: [meal.packageName || ''],
            payToKitchenPerMeal: [meal.payToKitchenPerMeal || 0],
            payToKitchenPerMeal2: [meal.payToKitchenPerMeal2 || 0],
            ddDiscount: [meal.ddDiscount || 0],
            subsidyValue: [meal.subsidyValue || 0],
            subsidyType: [meal.subsidyType || 'flat']
          }));
        }
      }
    });
  }

  async onSave(): Promise<void> {
    if (this.packageForm.invalid) {
      this.toasterService.warning("Please complete the form requirements");
      return;
    }

    try {
      this.isSubmitting = true;
      const { orgObj, selectedCafeteria } = this.data;

      if (!orgObj || !selectedCafeteria) {
        this.toasterService.error("System error: Missing context data");
        return;
      }

      const { _id: org_id, organization_name } = orgObj;
      const { cafeteria_id, cafeteria_name, address1, address2, cafeteria_city, cafeteria_location } = selectedCafeteria;
      const { itemList } = this.packageForm.getRawValue();

      const mergedMeals = itemList.map((item: any) => {
        const originalMeal = this.meals.find(m => m._id === item.masterMenuId);
        if (!originalMeal) {
          return { ...item, isActive: true, isMealawePackage: true, isManualPackage: false };
        }
        const { _id, ...mealWithoutId } = originalMeal;
        return { ...mealWithoutId, ...item, isActive: true, isMealawePackage: true, isManualPackage: false };
      });

      const sanitizedMeals = this.sanitizePayload(mergedMeals);

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
        itemList: sanitizedMeals
      };
      await this.apiMainService.saveVirtualCafeteriaPackageList(payload);
      this.toasterService.success('New package items added successfully');
      this.closeDialog();
    } catch (error) {
      console.error("❌ Error saving package:", error);
      this.toasterService.error('Failed to save package details');
    } finally {
      this.isSubmitting = false;
    }
  }

  private sanitizePayload(data: any): any {
    const cleanValue = (val: any): any => {
      if (val === 'undefined') return null;
      if (Array.isArray(val)) return val.map(cleanValue);
      if (val !== null && typeof val === 'object') {
        const result: any = {};
        for (const key in val) {
          result[key] = cleanValue(val[key]);
        }
        return result;
      }
      return val;
    };
    return cleanValue(data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  removeItem(index: number): void {
    const item = this.itemListArray.at(index);
    if (!item) return;

    const masterMenuId = item.get('masterMenuId')?.value;
    this.itemListArray.removeAt(index);

    const selectedMeals: string[] = this.packageForm.value.selectedMeals || [];
    const updatedMeals = selectedMeals.filter(id => id !== masterMenuId);
    this.packageForm.get('selectedMeals')?.setValue(updatedMeals);
  }
}

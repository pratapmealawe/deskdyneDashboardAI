import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { MatChipsModule } from '@angular/material/chips';
import { ImageCropperComponent } from '../../../common-components/image-cropper/image-cropper.component';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { categoryList, nutritionListOptions } from 'src/config/food-category.config';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-add-outlet-master-menu',
  templateUrl: './add-outlet-master-menu.component.html',
  styleUrls: ['./add-outlet-master-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddOutletMasterMenuComponent implements OnInit {
  form!: FormGroup;
  showUpdateBtn: boolean = false;
  menuId: any = 0;
  imageUrl: any;
  uploadedImageFile: any;
  imageReplaced: boolean = false;
  displayImgUrl = environment.imageUrl;

  categoryList = categoryList;
  nutritionListOptions = nutritionListOptions;

  mealTimeList = [
    { "mealType": "Fullday", "acceptOrderFrom": "06:00", "acceptOrderTill": "23:00" },
    { "mealType": "Breakfast", "acceptOrderFrom": "07:00", "acceptOrderTill": "09:00" },
    { "mealType": "Lunch", "acceptOrderFrom": "11:00", "acceptOrderTill": "13:00" },
    { "mealType": "EveningSnacks", "acceptOrderFrom": "15:00", "acceptOrderTill": "17:00" },
    { "mealType": "Dinner", "acceptOrderFrom": "20:00", "acceptOrderTill": "22:00" }
  ];

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddOutletMasterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item?: any, outletObj: any }
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.data?.item) {
      this.showUpdateBtn = true;
      this.menuId = this.data.item._id;
      this.imageUrl = this.data.item.imageUrl;
      this.patchFormValue(this.data.item);
    }
  }

  get nutrition_Lists(): FormArray {
    return this.form.get('nutritionList') as FormArray;
  }

  createForm() {
    this.form = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      isActive: [true],
      itemType: ['', Validators.required],
      subsidy: [''],
      precedence: [''],
      description: ['', [Validators.required]],
      itemContains: [[]],
      mealTimingInfo: ['', [Validators.required]],
      category: ['', Validators.required],
      energyValue: [''],
      nutritionList: this.fb.array([
        this.fb.group({
          nutritionId: [null],
          nutritionName: [null],
          nutritionValue: [''],
          nutritionUnit: ['gm']
        })
      ])
    });

    this.form.get('nutritionList')?.valueChanges.subscribe(() => {
      this.calculateEnergyValue();
    });
  }

  patchFormValue(item: any) {
    const mealTypes = item.mealTimingInfo ? item.mealTimingInfo.map((m: any) => m.mealType || m) : [];

    this.form.patchValue({
      itemName: item.itemName,
      price: item.price,
      itemType: item.itemType,
      isActive: item.isActive,
      description: item.description,
      itemContains: item.itemContains,
      subsidy: item.subsidy,
      precedence: item.precedence,
      category: item.category,
      mealTimingInfo: mealTypes,
      energyValue: item.nutritionInfo ? item.nutritionInfo.energyValue : 0
    });

    if (item.nutritionInfo && item.nutritionInfo.nutritionList?.length) {
      this.nutrition_Lists.clear();
      item.nutritionInfo.nutritionList.forEach((nutrition: any) => {
        const option = this.nutritionListOptions.find(opt =>
          opt.id === nutrition.nutritionId || opt.title === nutrition.nutritionName
        );
        this.nutrition_Lists.push(this.fb.group({
          nutritionId: [nutrition.nutritionId || option?.id],
          nutritionName: [option || nutrition.nutritionName],
          nutritionValue: [nutrition.nutritionValue],
          nutritionUnit: [nutrition.nutritionUnit || 'gm']
        }));
      });
      this.calculateEnergyValue();
    }
  }

  calculateEnergyValue() {
    const nutritionList = this.form.get('nutritionList')?.value as any[];
    if (!nutritionList) return;

    let totalEnergy = 0;
    nutritionList.forEach((item) => {
      const value = parseFloat(item.nutritionValue) || 0;
      const nutritionId = item.nutritionId || item.nutritionName?.id;

      if (nutritionId === 1) totalEnergy += value * 4; // Protein
      else if (nutritionId === 2) totalEnergy += value * 9; // Fat
      else if (nutritionId === 3) totalEnergy += value * 4; // Carbohydrate
      else if (nutritionId === 4) totalEnergy += value * 2; // Fibre
    });

    this.form.get('energyValue')?.patchValue(parseFloat(totalEnergy.toFixed(2)), { emitEvent: false });
  }

  handleFileInput($event: any) {
    if ($event?.target?.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageUrl = reader.result;
          const dialogRef = this.dialog.open(ImageCropperComponent, {
            width: '50%',
            panelClass: 'image-cropper-dialog',
            disableClose: true,
            data: {
              imageUrl: imageUrl,
              imageWidth: 150,
              imageHeight: 150,
              aspectRatio: 1
            }
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            if (result?.croppedImages) {
              this.uploadedImageFile = result.croppedImages.file;
              this.imageUrl = result.croppedImages.resizeDataUrl;
              this.imageReplaced = true;
            }
          });
        };
      }
    }
  }

  addNutritionLists() {
    this.nutrition_Lists.push(this.fb.group({
      nutritionId: [null],
      nutritionName: [null],
      nutritionValue: [''],
      nutritionUnit: ['gm']
    }));
  }

  removenNutritionLists(index: number) {
    this.nutrition_Lists.removeAt(index);
  }

  hasError(controlName: string, errorName: string) {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.touched || control.dirty);
  }

  preventInvalidNumber(e: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(e.key)) e.preventDefault();
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.prepareFormData();
    try {
      const res = await this.apiMainService.addOutletMasterMenu(formData);
      if (res?._id) {
        this.dialogRef.close(true);
      }
    } catch (error) {
    }
  }

  async update() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.prepareFormData();
    try {
      const res = await this.apiMainService.updateOutletMasterMenu(this.menuId, formData);
      if (res?._id) {
        this.dialogRef.close(true);
      }
    } catch (error) {
    }
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const val = this.form.value;

    if (this.imageUrl && this.imageReplaced) {
      formData.append('image', this.uploadedImageFile);
    }
    formData.append('imageUrl', this.imageUrl || '');
    formData.append('description', val.description);
    formData.append('isActive', val.isActive);
    formData.append('itemName', val.itemName);
    formData.append('price', val.price);
    formData.append('subsidy', val.subsidy || 0);
    formData.append('precedence', val.precedence || 0);
    formData.append('category', val.category);
    formData.append('itemType', val.itemType || "Veg");
    formData.append('itemContains', JSON.stringify(val.itemContains));

    const selectedMealTypes = val.mealTimingInfo;
    const mealTimingObjects = this.mealTimeList.filter(m => selectedMealTypes.includes(m.mealType));
    formData.append('mealTimingInfo', JSON.stringify(mealTimingObjects));

    const nutritionInfo = {
      energyValue: val.energyValue || 0,
      nutritionList: (val.nutritionList || []).map((nut: any) => ({
        nutritionId: nut.nutritionId || nut.nutritionName?.id,
        nutritionName: typeof nut.nutritionName === 'object' ? nut.nutritionName?.title : (nut.nutritionName || ''),
        nutritionValue: nut.nutritionValue || 0,
        nutritionUnit: nut.nutritionUnit || 'gm'
      }))
    };
    formData.append('nutritionInfo', JSON.stringify(nutritionInfo));

    return formData;
  }

  setCategory(event: any) {
    // Logic for category selection if needed
    this.form.get('category')?.setValue(event.value);
  }

  compareNutrition(o1: any, o2: any): boolean {
    if (!o1 || !o2) return o1 === o2;
    return o1.id === o2.id;
  }
}

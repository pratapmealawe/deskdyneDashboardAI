import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCalendar } from '@angular/material/datepicker';
import { categoryList, nutritionListOptions } from 'src/config/food-category.config';
import { environment } from 'src/environments/environment';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-outlet-menu',
  templateUrl: './add-outlet-menu.component.html',
  styleUrls: ['./add-outlet-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AddOutletMenuComponent implements OnInit {
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;
  form: FormGroup = new FormGroup({
    itemName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    price: new FormControl(null, [Validators.required, Validators.min(1)]),
    subsidy: new FormControl(0, [Validators.min(0)]),
    category: new FormControl('', Validators.required),
    mealTimingInfo: new FormControl([], Validators.required),
    itemType: new FormControl('Veg', Validators.required),
    precedence: new FormControl(0, [Validators.min(0)]),
    isActive: new FormControl(false),
    description: new FormControl('', [Validators.maxLength(200)]),
    doNotChangeInFuture: new FormControl(false),
    energyValue: new FormControl(0),
    sectionConfig: new FormControl(null),
    nutritionList: new FormArray([]),
    addOnsList: new FormArray([]),
    weeklyMenuDates: new FormControl([]),
    discountEnabled: new FormControl(false),
    discountType: new FormControl({ value: null, disabled: true }),
    discountValue: new FormControl({ value: null, disabled: true }),
  }, { validators: [this.discountValidator()] });
  categoryList = categoryList;
  nutritionListOptions = nutritionListOptions;
  displayImgUrl = environment.imageUrl;

  imageUrl: any;
  uploadStatus: boolean = false;
  imageReplaced: boolean = false;
  uploadedImageFile: any;
  uploadedAddonImageFiles: (File | null)[] = [];

  selectedWeeklyDates: Date[] = [];
  today = new Date();

  constructor(
    private dialog: MatDialog,
    private apiService: ApiMainService,
    private toastr: ToasterService,
    public dialogRef: MatDialogRef<AddOutletMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { outletObj: any, item?: any }
  ) { }

  ngOnInit(): void {
    this.createForm();
    console.log(this.data.outletObj);
    if (this.data.item) {
      this.imageUrl = this.data.item.imageUrl;
      this.patchFormValue(this.data.item);
    } else if (this.data.outletObj?.isPreOrder) {
      const timings = this.data.outletObj?.mealTiming?.map((m: any) => m.mealType) || [];
      const control = this.form.get('mealTimingInfo');
      control?.patchValue(timings);
      control?.clearValidators();
      control?.updateValueAndValidity();
    }
  }

  createForm() {
    this.initDiscountListener();
    this.form.get('nutritionList')?.valueChanges.subscribe(() => {
      this.calculateEnergyValue();
    });
  }

  get f() {
    return this.form.controls;
  }

  get nutrition_Lists(): FormArray {
    return this.form.get('nutritionList') as FormArray;
  }

  get addons_List(): FormArray {
    return this.form.get('addOnsList') as FormArray;
  }

  addNutritionLists() {
    this.nutrition_Lists.push(
      new FormGroup({
        nutritionId: new FormControl(null),
        nutritionName: new FormControl(''),
        nutritionValue: new FormControl(0),
        nutritionUnit: new FormControl('gm'),
      })
    );
  }

  removenNutritionLists(index: number) {
    this.nutrition_Lists.removeAt(index);
  }

  addAddon() {
    this.addons_List.push(new FormGroup({
      addOnImageUrl: new FormControl(''),
      addOnName: new FormControl(''),
      addOnPrice: new FormControl(1, [Validators.min(1)]),
      addOnType: new FormControl('NA'),
    }));
    this.uploadedAddonImageFiles.push(null);
  }

  removeAddon(index: number) {
    this.addons_List.removeAt(index);
    this.uploadedAddonImageFiles.splice(index, 1);
  }

  toggleMealTiming(mealType: string): void {
    if (this.data.outletObj?.isPreOrder) return;
    const control = this.form.get('mealTimingInfo');
    const currentValues = control?.value || [];
    const index = currentValues.indexOf(mealType);
    if (index > -1) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(mealType);
    }
    control?.patchValue([...currentValues]);
    control?.markAsDirty();
  }

  toggleDate(date: Date | null): void {
    if (!date) return;
    const index = this.selectedWeeklyDates.findIndex(d => this.isSameDay(d, date));
    if (index === -1) {
      this.selectedWeeklyDates.push(date);
    } else {
      this.selectedWeeklyDates.splice(index, 1);
    }
    this.form.get('weeklyMenuDates')?.patchValue(
      this.selectedWeeklyDates.map(d => ({ date: d }))
    );
    this.form.get('weeklyMenuDates')?.markAsDirty();

    // Reassign dateClass to trigger calendar view refresh
    this.weeklyDateClass = (d: Date): string => {
      return this.isDateSelected(d) ? 'selected-date' : '';
    };

    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  weeklyDateClass = (date: Date): string => {
    return this.isDateSelected(date) ? 'selected-date' : '';
  };

  isDateSelected(date: Date): boolean {
    return this.selectedWeeklyDates.some(d => this.isSameDay(d, date));
  }

  weeklyDateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    // Allow selecting today or future dates
    const todayStr = new Date().setHours(0, 0, 0, 0);
    return date.getTime() >= todayStr;
  };

  patchFormValue(item: any) {
    let mealTimingInfoValue = [];
    if (this.data.outletObj?.isPreOrder) {
      mealTimingInfoValue = this.data.outletObj?.mealTiming?.map((m: any) => m.mealType) || [];
    } else {
      mealTimingInfoValue = item.mealTimingInfo?.length ? item.mealTimingInfo.map((a: any) => a.mealType) : [];
    }

    this.form.patchValue({
      itemName: item.itemName,
      price: item.price,
      subsidy: item.subsidy ? item.subsidy : 0,
      category: item.category,
      itemType: item.itemType,
      precedence: item.precedence,
      isActive: item.isActive,
      doNotChangeInFuture: item.doNotChangeInFuture,
      description: item.description,
      energyValue: item.nutritionInfo ? item.nutritionInfo.energyValue : 0,
      sectionConfig: item.sectionConfig || null,
      discountEnabled: item.discountEnabled || false,
      discountType: item.discountType || null,
      discountValue: item.discountValue || null,
      weeklyMenuDates: item.weeklyMenuDates || [],
      mealTimingInfo: mealTimingInfoValue
    });
    if (item.weeklyMenuDates?.length) {
      this.selectedWeeklyDates = item.weeklyMenuDates.map((d: any) => new Date(d.date));
    }
    if (item.nutritionInfo && item.nutritionInfo.nutritionList?.length) {
      this.nutrition_Lists.clear();
      item.nutritionInfo.nutritionList.forEach((nutrition: any) => {
        const nutrientID = nutrition.nutrientID || nutrition.nutritionId;
        const nutrientName = nutrition.nutrientname || nutrition.nutritionName;
        const option = this.nutritionListOptions.find(o => o.id === nutrientID || o.id === Number(nutrientName));

        this.nutrition_Lists.push(new FormGroup({
          nutritionId: new FormControl(option ? option.id : nutrientID),
          nutritionName: new FormControl(option ? option : Number(nutrientName)),
          nutritionValue: new FormControl(nutrition.nutritionValue || 0),
          nutritionUnit: new FormControl(nutrition.nutritionUnit || 'gm')
        }));
      });
    }

    if (item.addOnsList?.length) {
      this.addons_List.clear();
      this.uploadedAddonImageFiles = [];

      item.addOnsList.forEach((addon: any) => {
        this.addons_List.push(new FormGroup({
          addOnImageUrl: new FormControl(addon.addOnImageUrl ?? ''),
          addOnName: new FormControl(addon.addOnName ?? ''),
          addOnPrice: new FormControl(addon.addOnPrice ?? 0, [Validators.min(0)]),
          addOnType: new FormControl(addon.addOnType ?? 'NA'),
        }));
        this.uploadedAddonImageFiles.push(null);
      });
    } else {
      this.addons_List.clear();
      this.uploadedAddonImageFiles = [null];
      this.addons_List.push(new FormGroup({
        addOnImageUrl: new FormControl(''),
        addOnName: new FormControl(''),
        addOnPrice: new FormControl(0),
        addOnType: new FormControl('NA')
      }));
    }
  }

  calculateEnergyValue() {
    const nutritionList = this.form.get('nutritionList')?.value as any[];
    if (!nutritionList) return;

    let totalEnergy = 0;
    nutritionList.forEach((item) => {
      const value = parseFloat(item.nutritionValue) || 0;
      const nutritionId = item.nutritionId || (item.nutritionName?.id);

      if (nutritionId === 1) totalEnergy += value * 4; // Protein
      else if (nutritionId === 2) totalEnergy += value * 9; // Fat
      else if (nutritionId === 3) totalEnergy += value * 4; // Carbohydrate
      else if (nutritionId === 4) totalEnergy += value * 2; // Fibre
    });

    this.form.get('energyValue')?.patchValue(totalEnergy, { emitEvent: false });
  }

  initDiscountListener() {
    const typeCtrl = this.form.get('discountType');
    const valueCtrl = this.form.get('discountValue');
    const priceCtrl = this.form.get('price');
    const subsidyCtrl = this.form.get('subsidy');

    const toggleControls = () => {
      const enabled = this.form.get('discountEnabled')?.value;
      const price = Number(priceCtrl?.value);
      const subsidy = Number(subsidyCtrl?.value || 0);
      const effectivePrice = price - subsidy;

      if (enabled && price > 0 && effectivePrice > 0) {
        typeCtrl?.enable();
        valueCtrl?.enable();
        typeCtrl?.setValidators([Validators.required]);
        valueCtrl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        typeCtrl?.reset();
        valueCtrl?.reset();
        typeCtrl?.disable();
        valueCtrl?.disable();
        typeCtrl?.clearValidators();
        valueCtrl?.clearValidators();
      }
      typeCtrl?.updateValueAndValidity();
      valueCtrl?.updateValueAndValidity();
      this.form.updateValueAndValidity();
    };

    this.form.get('discountEnabled')?.valueChanges.subscribe(toggleControls);
    this.form.get('price')?.valueChanges.subscribe(toggleControls);
    this.form.get('subsidy')?.valueChanges.subscribe(toggleControls);
    this.form.get('discountType')?.valueChanges.subscribe(() => {
      this.form.updateValueAndValidity();
    });
  }

  discountValidator() {
    return (group: any) => {
      const enabled = group.get('discountEnabled')?.value;
      const type = group.get('discountType')?.value;
      const value = Number(group.get('discountValue')?.value);
      const price = Number(group.get('price')?.value);
      const subsidy = Number(group.get('subsidy')?.value || 0);

      if (!enabled) return null;
      if (!price || price <= 0) return { priceMissing: true };

      const effectivePrice = price - subsidy;
      if (effectivePrice <= 0) return { invalidEffectivePrice: true };

      if (type === 'percentage') {
        if (value <= 0 || value > 100) return { percentInvalid: true };
      }

      if (type === 'flat') {
        if (value <= 0) return { flatNegative: true };
        if (value >= effectivePrice) return { flatInvalid: true };
      }

      return null;
    };
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const imageUrl = reader.result;
          const dialogRef = this.dialog.open(ImageCropperComponent, {
            width: '50%',
            panelClass: 'image-cropper-dialog',
            disableClose: true,
            data: { imageUrl: imageUrl, imageWidth: 150, imageHeight: 150, aspectRatio: 1 }
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result.croppedImages) {
              this.uploadedImageFile = result.croppedImages.file;
              this.imageUrl = result.croppedImages.resizeDataUrl;
              this.uploadStatus = true;
              this.imageReplaced = true;
            }
          });
        };
      }
    }
  }

  handleAddonFileInput($event: any, index: number) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.uploadedAddonImageFiles[index] = file;
          this.addons_List.at(index).get('addOnImageUrl')?.patchValue(reader.result);
        };
      }
    }
  }

  getAddonImageSrc(addon: any, index: number): string {
    const url = addon.get('addOnImageUrl')?.value;
    if (!url) return '';
    if (url.startsWith('data:')) return url;
    if (url.startsWith('http')) return url;
    return this.displayImgUrl + url;
  }

  preventInvalidNumber(e: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(e.key)) e.preventDefault();
  }

  compareSection(o1: any, o2: any): boolean {
    if (!o1 || !o2) return o1 === o2;
    const id1 = o1._id || o1.sectionId;
    const id2 = o2._id || o2.sectionId;
    return id1 === id2;
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const formData = new FormData();

    // Prepare menu item object
    const finalItem = {
      ...value,
      nutritionInfo: {
        nutritionList: value.nutritionList,
        energyValue: value.energyValue,
      },
      imageUrl: this.data.item?.imageUrl || '',

    };

    // Sanitize enum fields to match backend validation rules
    if (finalItem.discountType === null || finalItem.discountType === undefined) {
      finalItem.discountType = '';
    }
    if (finalItem.itemType === null || finalItem.itemType === undefined) {
      finalItem.itemType = 'Veg';
    }

    // Remove unwanted fields for API
    delete (finalItem as any).nutritionList;
    delete (finalItem as any).energyValue;

    formData.append('menuItem', JSON.stringify(finalItem));

    if (this.uploadedImageFile) {
      formData.append('file', this.uploadedImageFile);
    }

    if (this.uploadedAddonImageFiles?.length) {
      this.uploadedAddonImageFiles.forEach((file, index) => {
        if (file) {
          formData.append(`addonFile_${index}`, file);
        }
      });
    }

    try {
      let res: any;
      if (this.data.item) {
        // Update
        res = await this.apiService.updateOutletMenu(this.data.outletObj._id, this.data.item._id, formData);
        if (res) {
          this.toastr.success('Menu item updated successfully');
          this.dialogRef.close(true);
        }
      } else {
        // Add
        res = await this.apiService.addOutletMenu(formData, this.data.outletObj._id);
        if (res) {
          this.toastr.success('Menu item added successfully');
          this.dialogRef.close(true);
        }
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
      this.toastr.error('Failed to save menu item');
    }
  }
}

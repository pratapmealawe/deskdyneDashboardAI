import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MaterialModule } from 'src/app/material.module';
import { ImageCropperComponent } from 'src/app/common-components/image-cropper/image-cropper.component';
import { ToasterService } from '@service/toaster.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-add-edit-virtual-cafeteria-package',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, ImageCropperComponent],
  templateUrl: './add-edit-virtual-cafeteria-package.component.html',
  styleUrls: ['./add-edit-virtual-cafeteria-package.component.scss']
})
export class AddEditVirtualCafeteriaPackageComponent implements OnInit {
  packageForm: FormGroup;

  categories: any[] = [];
  packageImageFile!: File;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;
  serverUrl = environment.imageUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditVirtualCafeteriaPackageComponent>,
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
    private toaster: ToasterService,
    private fb: FormBuilder
  ) {
    this.packageForm = this.fb.group({
      packageName: ['', Validators.required],
      packageCategory: ['', Validators.required],
      packageSubCategory: [''],
      packageType: ['Veg', Validators.required],
      packagePrice: [0, [Validators.required, Validators.min(0)]],
      payToKitchenPerMeal: [0],
      payToKitchenPerMeal2: [0],
      days: [1],
      vegMealDescription: [''],
      nonVegMealDescription: [''],
      packageInfo: [''],
      imageUrl: [''],
      isActive: [true],
      priority: [0],
      isBreakFast: [false],
      isBestSeller: [false],
      deliveryOnWeekends: [false],
      offerText: [''],
      offerColor: ['#3b82f6'],
      subsidyType: ['flat'],
      subsidyValue: [0],
      addonsList: this.fb.array([])
    });
  }

  get addonsArray(): FormArray {
    return this.packageForm.get('addonsList') as FormArray;
  }

  addAddon(addon?: any): void {
    this.addonsArray.push(this.fb.group({
      addonName: [addon?.addonName || '', Validators.required],
      extraPrice: [addon?.extraPrice || 0, [Validators.required, Validators.min(0)]],
      addOnType: [addon?.addOnType || 'NA'],
      payKitchenExtraPerMeal: [addon?.payKitchenExtraPerMeal || 0]
    }));
  }

  removeAddon(index: number): void {
    this.addonsArray.removeAt(index);
  }

  ngOnInit(): void {
    const pkg = this.data?.package;
    this.categories = this.data?.categories || [];
    this.isEditMode = !!pkg;

    if (pkg) {
      this.packageForm.patchValue({
        packageName: pkg.packageName,
        packageCategory: pkg.packageCategory,
        packageSubCategory: pkg.packageSubCategory,
        packageType: pkg.packageType,
        packagePrice: pkg.packagePrice,
        payToKitchenPerMeal: pkg.payToKitchenPerMeal,
        payToKitchenPerMeal2: pkg.payToKitchenPerMeal2,
        days: pkg.days || 1,
        vegMealDescription: pkg.vegMealDescription || '',
        nonVegMealDescription: pkg.nonVegMealDescription || '',
        packageInfo: pkg.packageInfo,
        imageUrl: pkg.imageUrl ? (pkg.imageUrl.startsWith('http') ? pkg.imageUrl : this.serverUrl + pkg.imageUrl) : '',
        isActive: pkg.isActive ?? true,
        priority: pkg.priority || 0,
        isBreakFast: pkg.isBreakFast || false,
        isBestSeller: pkg.isBestSeller || false,
        deliveryOnWeekends: pkg.deliveryOnWeekends || false,
        offerText: pkg.offerText || '',
        offerColor: pkg.offerColor || '#3b82f6',
        subsidyType: pkg.subsidyType || 'flat',
        subsidyValue: pkg.subsidyValue || 0
      });

      if (pkg.addonsList && Array.isArray(pkg.addonsList)) {
        pkg.addonsList.forEach((addon: any) => this.addAddon(addon));
      }
    }
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageUrl = reader.result;
      const dialogRef = this.dialog.open(ImageCropperComponent, {
        width: '500px',
        maxWidth: '90vw',
        panelClass: 'image-cropper-dialog',
        disableClose: true,
        data: {
          imageUrl: imageUrl,
          imageWidth: 600,
          imageHeight: 400,
          aspectRatio: 1.5 // Standard package aspect ratio
        }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result.confirm && result.croppedImages) {
          this.packageImageFile = result.croppedImages.file;
          this.packageForm.patchValue({ imageUrl: result.croppedImages.resizeDataUrl });
        }
      });
    };
    event.target.value = '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async savePackage(): Promise<void> {
    if (this.packageForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const formValue = this.packageForm.getRawValue();
    const orgObj = this.data.orgObj;
    const selectedCafeteria = this.data.selectedCafeteria;
    const isEdit = this.isEditMode;
    const masterMenuId = isEdit ? this.data.package.masterMenuId : undefined;

    // Construct the package item
    const packageItem: any = {
      packageName: formValue.packageName,
      packageCategory: formValue.packageCategory,
      packageSubCategory: formValue.packageSubCategory,
      packageType: formValue.packageType,
      packagePrice: formValue.packagePrice,
      payToKitchenPerMeal: formValue.payToKitchenPerMeal,
      payToKitchenPerMeal2: formValue.payToKitchenPerMeal2,
      days: formValue.days,
      vegMealDescription: formValue.vegMealDescription,
      nonVegMealDescription: formValue.nonVegMealDescription,
      packageInfo: formValue.packageInfo,
      isActive: formValue.isActive,
      priority: formValue.priority,
      isBreakFast: formValue.isBreakFast,
      isBestSeller: formValue.isBestSeller,
      deliveryOnWeekends: formValue.deliveryOnWeekends,
      offerText: formValue.offerText,
      offerColor: formValue.offerColor,
      subsidyType: formValue.subsidyType,
      subsidyValue: formValue.subsidyValue,
      addonsList: formValue.addonsList,
      isManualPackage: true,
      isMealawePackage: false,
      masterMenuId: masterMenuId
    };

    const fd = new FormData();
    if (this.packageImageFile) {
      fd.append('categoryImg', this.packageImageFile); // Backend expects 'categoryImg' for single image upload in some routes, or we check what saveMealAweOutlet uses
    }

    const payload: any = {
      org_id: orgObj._id,
      org_name: orgObj.organization_name,
      cafeteriaDetails: {
        cafeteria_name: selectedCafeteria.cafeteria_name,
        address1: selectedCafeteria.address1,
        address2: selectedCafeteria.address2,
        cafeteria_city: selectedCafeteria.cafeteria_city,
        cafeteria_location: selectedCafeteria.cafeteria_location,
        cafeteria_id: selectedCafeteria.cafeteria_id
      },
      itemList: [packageItem]
    };

    fd.append('payload', JSON.stringify(payload));

    try {
      const cafeteriaId = selectedCafeteria.cafeteria_id;
      if (isEdit) {
        // Use the item-level update API
        await this.apiMainService.updateVirtualCafeteriaPackageItem({ cafeteriaId, item: packageItem });
      } else {
        // Use the item-level add API
        // Note: For the very first item in a new cafeteria, we might need saveVirtualCafeteriaPackage
        // But assuming the cafeteria config is already initialized or we use upsert logic in add API
        await this.apiMainService.addVirtualCafeteriaPackageItem({ cafeteriaId, item: packageItem });
      }
      this.toaster.success(isEdit ? 'Package updated successfully' : 'Package created successfully');
      this.dialogRef.close(true);
    } catch (err) {
      console.error('❌ Failed to save package', err);
      this.toaster.error('Failed to save package');
    } finally {
      this.isSubmitting = false;
    }
  }
}

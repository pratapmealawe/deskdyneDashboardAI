import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { MaterialModule } from 'src/app/material.module';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-edit-package-category',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './add-edit-package-category.component.html',
  styleUrls: ['./add-edit-package-category.component.scss']
})
export class AddEditPackageCategoryComponent {
  packageCategoryList = [
    'Trial', 'Breakfast', 'Flexi Plans', 'Standard', 'Deluxe', 'Healthy',
    'Special', 'Jain', 'KotaBowl', 'KotaThalis', 'KotaSuperCombo',
    'BngVeg', 'BngNonVeg', 'BngCombos', 'lowcalariesmeal', 'proteinmeal',
    'Salads', 'HostelThali', 'IITThali', 'PocketThali', 'RiceCombo',
    'Classic', 'Comfort'
  ];

  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    categoryDisplayName: new FormControl('', Validators.required),
    categoryImg: new FormControl('', Validators.required),
    categoryBanners: new FormControl([]),
    imageConfigNameMealawe: new FormControl(''),
    isActive: new FormControl(true)
  });
  categoryImgFile!: File;
  bannerFiles: File[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditPackageCategoryComponent>,
    private apiMainService: ApiMainService
  ) { }

  ngOnInit() {
    const category = this.data?.category;
    if (category) {
      this.categoryForm.patchValue({
        categoryName: category.categoryName,
        categoryDisplayName: category.categoryDisplayName,
        categoryImg: category.categoryImg,
        categoryBanners: category.categoryBanners || [],
        imageConfigNameMealawe: category.imageConfigNameMealawe,
        isActive: category.isActive ?? true
      });
    }
    if (!this.data.addNew) {
      let alreadyCategory = this.data.alreadyCategory;
      this.packageCategoryList = this.packageCategoryList.filter((pkg) => !alreadyCategory.includes(pkg));
    }
    this.categoryForm.get('categoryName')?.valueChanges.subscribe(val => {
      this.categoryForm.patchValue({ categoryDisplayName: val });
    });
  }

  onCategoryImgSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.categoryImgFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.categoryForm.patchValue({ categoryImg: reader.result });
    };
    reader.readAsDataURL(file);
  }

  onBannerSelect(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.bannerFiles.push(...files);
    const existingBanners = this.categoryForm.value.categoryBanners || [];
    const newBanners: any[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newBanners.push(reader.result);
        this.categoryForm.patchValue({
          categoryBanners: [...existingBanners, ...newBanners]
        });
      };
      reader.readAsDataURL(file);
    });
  }

  dropBanner(event: CdkDragDrop<string[]>) {
    const banners = [...this.categoryForm.value.categoryBanners];
    moveItemInArray(banners, event.previousIndex, event.currentIndex);
    this.categoryForm.patchValue({ categoryBanners: banners });
  }

  removeBanner(index: number) {
    const banners = [...this.categoryForm.value.categoryBanners];
    banners.splice(index, 1);
    this.categoryForm.patchValue({ categoryBanners: banners });
    this.bannerFiles.splice(index, 1);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;
    this.sendCategoryToServer()
  }

  async sendCategoryToServer() {
    if (this.categoryForm.invalid) return;
    const formValue = this.categoryForm.getRawValue();
    const orgObj = this.data.orgObj;
    const selectedCafeteria = this.data.selectedCafeteria;
    const { _id: cafeteria_id, cafeteria_name, address1, address2, cafeteria_city, cafeteria_location } = selectedCafeteria;
    const categoryObj = {
      categoryName: formValue.categoryName,
      categoryDisplayName: formValue.categoryDisplayName,
      imageConfigNameMealawe: formValue.imageConfigNameMealawe || '',
      isActive: formValue.isActive
    };
    const fd = new FormData();
    fd.append('categoryImg', this.categoryImgFile || new Blob());
    this.bannerFiles.forEach(file => fd.append('categoryBanners', file));
    if (this.data.addNew) {
      const payload: any = {
        org_id: orgObj._id,
        org_name: orgObj.organization_name,
        cafeteriaDetails: {
          cafeteria_name,
          address1,
          address2,
          cafeteria_city,
          cafeteria_location,
          cafeteria_id
        },
        itemList: [],
        categoryConfig: [categoryObj]
      };
      fd.append('payload', JSON.stringify(payload));

      try {
        const response = await this.apiMainService.saveMealAweOutletCategoryConfig(fd);
        this.dialogRef.close(response);
      } catch (err) {
        console.error('❌ Failed to save new category', err);
      }

    } else {
      const payload: any = {
        cafeteriaId: cafeteria_id,
        categoryConfig: categoryObj
      };
      fd.append('payload', JSON.stringify(payload));
      try {
        const response = await this.apiMainService.addCategoryConfig(fd);
        this.dialogRef.close(response);
      } catch (err) {
        console.error('❌ Failed to update category', err);
      }
    }
  }
}
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { MaterialModule } from 'src/app/material.module';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-package-category',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './add-edit-package-category.component.html',
  styleUrls: ['./add-edit-package-category.component.scss']
})
export class AddEditPackageCategoryComponent {
  packageCategoryList = ['Breakfast', 'Standard', 'Deluxe', 'Healthy', 'Special', 'Jain', 'lowcalariesmeal', 'proteinmeal', 'Salads'];
  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    categoryDisplayName: new FormControl('', Validators.required),
    categoryImg: new FormControl('', Validators.required),
    categoryBanners: new FormControl([]),
    imageConfigNameMealawe: new FormControl(''),
    isActive: new FormControl(true)
  });
  categoryImgFile!: File;
  banners: { preview: string, file?: File, isExisting: boolean, path?: string }[] = [];
  deletedBannerPaths: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditPackageCategoryComponent>,
    private apiMainService: ApiMainService
  ) { }

  ngOnInit() {
    const category = this.data?.category;
    if (category) {
      if (category.categoryBanners && Array.isArray(category.categoryBanners)) {
        this.banners = category.categoryBanners.map((bannerPath: string) => ({
          preview: environment.imageUrl + bannerPath,
          isExisting: true,
          path: bannerPath
        }));
      }

      this.categoryForm.patchValue({
        categoryName: category.categoryName,
        categoryDisplayName: category.categoryDisplayName,
        categoryImg: category.categoryImg ? environment.imageUrl + category.categoryImg : '',
        categoryBanners: [], 
        imageConfigNameMealawe: category.imageConfigNameMealawe,
        isActive: category.isActive ?? true
      });
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
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.banners.push({
          preview: reader.result as string,
          file: file,
          isExisting: false
        });
      };
      reader.readAsDataURL(file);
    });
  }

  dropBanner(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.banners, event.previousIndex, event.currentIndex);
  }

  removeBanner(index: number) {
    const removedBanner = this.banners[index];
    if (removedBanner.isExisting && removedBanner.path) {
      this.deletedBannerPaths.push(removedBanner.path);
    }
    this.banners.splice(index, 1);
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
    const selectedCafeteria = this.data.selectedCafeteria;
    const { _id: cafeteria_id, cafeteria_name, address1, address2, cafeteria_city, cafeteria_location } = selectedCafeteria;
    const isEdit = !!this.data.category;
    const categoryId = isEdit ? this.data.category._id : undefined;
    const bannerPayloadIndices: string[] = [];
    const newBannerFiles: File[] = [];
    this.banners.forEach((banner) => {
      if (banner.isExisting && banner.path) {
        bannerPayloadIndices.push(banner.path);
      } else if (!banner.isExisting && banner.file) {
        bannerPayloadIndices.push(newBannerFiles.length.toString());
        newBannerFiles.push(banner.file);
      }
    });

    const categoryObj: any = {
      categoryName: formValue.categoryName,
      categoryDisplayName: formValue.categoryDisplayName,
      imageConfigNameMealawe: formValue.imageConfigNameMealawe || '',
      isActive: formValue.isActive,
      categoryBanners: bannerPayloadIndices,
      deleteBannerPaths: this.deletedBannerPaths
    };

    if (isEdit) {
      categoryObj['_id'] = categoryId;
    }

    const orgObj = this.data.orgObj;

    const fd = new FormData();
    if (this.categoryImgFile) {
      fd.append('categoryImg', this.categoryImgFile);
    } else if (!isEdit) {
      fd.append('categoryImg', new Blob());
    }
    newBannerFiles.forEach(file => fd.append('categoryBanners', file));

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
      categoryObj: categoryObj
    };
    fd.append('payload', JSON.stringify(payload));

    try {
      let response;
      if (isEdit && categoryId) {
        response = await this.apiMainService.updateCategoryMealAweOutlet(cafeteria_id, fd);
      } else {
        response = await this.apiMainService.addCategoryMealAweOutlet(fd);
      }
      this.dialogRef.close(response);
    } catch (err) {
      console.error('❌ Failed to save/update category', err);
    }
  }
}
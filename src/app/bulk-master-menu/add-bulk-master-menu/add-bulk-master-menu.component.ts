import {
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ImageCropperComponent } from '../../common-components/image-cropper/image-cropper.component';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { environment } from '@environments/environment';
import { PermissionsService } from '@service/permission.service';
import { categoryList } from 'src/config/food-category.config';

@Component({
  selector: 'app-add-bulk-master-menu',
  templateUrl: './add-bulk-master-menu.component.html',
  styleUrls: ['./add-bulk-master-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule]
})
export class AddBulkMasterMenuComponent implements OnInit {
  editType = '';
  editfoodItemObj: any = {};

  imageUrl: any;
  uploadedImageFile: File | null = null;
  displayImgUrl = environment.imageUrl;
  imageReplaced: boolean = false;

  foodItemForm!: FormGroup;
  btnPolicy: any;
  categoryList = categoryList;

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddBulkMasterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private permissionsService: PermissionsService,
    private fb: FormBuilder
  ) { 
    if (data) {
      this.editType = data.editType || 'new';
      this.editfoodItemObj = data.editMenuItemObj || {};
    }
  }

  ngOnInit(): void {
    this.btnPolicy = this.permissionsService.getCurrentButtonPolicy();
    this.initForm();

    // Edit mode â patch values
    if (this.editfoodItemObj && this.editfoodItemObj._id) {
      this.imageUrl = this.editfoodItemObj.imageUrl;
      this.foodItemForm.patchValue({
        itemName: this.editfoodItemObj.itemName,
        itemType: this.editfoodItemObj.itemType || 'Veg',
        itemServingType: this.editfoodItemObj.itemServingType || 'perPerson',
        slab1Price: this.editfoodItemObj.slab1Price,
        slab2Price: this.editfoodItemObj.slab2Price,
        slab3Price: this.editfoodItemObj.slab3Price,
        slab4Price: this.editfoodItemObj.slab4Price,
        itemDescription: this.editfoodItemObj.itemDescription,
        category: this.editfoodItemObj.category || '',
        isActive: this.editfoodItemObj.isActive !== false,
        itemFlavour: this.editfoodItemObj.itemFlavour || 'Std'
      });
    }
  }

  private initForm(): void {
    this.foodItemForm = this.fb.group({
      itemName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(80)],
      ],
      itemType: ['Veg', Validators.required],
      itemServingType: ['perPerson', Validators.required],
      slab1Price: [0, [Validators.required, Validators.min(0.01)]],
      slab2Price: [0, [Validators.min(0)]],
      slab3Price: [0, [Validators.min(0)]],
      slab4Price: [0, [Validators.min(0)]],
      itemDescription: [
        '',
        [Validators.required, Validators.maxLength(300)],
      ],
      category: ['', Validators.required],
      isActive: [true],
      itemFlavour: ['Std']
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.foodItemForm.controls[controlName].hasError(errorName);
  }

  handleFileInput($event: any): void {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const imageUrl = reader.result;
          try {
            const dialogRef = this.dialog.open(ImageCropperComponent, {
              width: '500px',
              panelClass: 'image-cropper-dialog',
              disableClose: true,
              data: {
                imageUrl: imageUrl,
                imageWidth: 300,
                imageHeight: 300,
                aspectRatio: 1
              }
            });

            dialogRef.afterClosed().subscribe((result: any) => {
              if (result && result.croppedImages) {
                this.uploadedImageFile = result.croppedImages.file;
                this.imageUrl = result.croppedImages.resizeDataUrl;
                this.imageReplaced = true;
              }
            });
          } catch (e) {
          }
        };
      }
    }
  }

  onSubmit(): void {
    if (this.foodItemForm.invalid) {
      this.foodItemForm.markAllAsTouched();
      return;
    }

    const item = this.foodItemForm.value;

    if (this.editType === 'edit' && this.editfoodItemObj?._id) {
      this.updateFoodItem(item);
    } else {
      this.addNewItem(item);
    }
  }

  private async addNewItem(item: any): Promise<void> {
    const formData = this.buildFormData(item);
    try {
      await this.apiMainService.saveBulkMasterMenu(formData);
      this.dialogRef.close('new');
    } catch (error) {
    }
  }

  private async updateFoodItem(item: any): Promise<void> {
    const formData = this.buildFormData(item);
    try {
      await this.apiMainService.updateBulkMasterMenu(
        formData,
        this.editfoodItemObj._id
      );
      this.dialogRef.close('edit');
    } catch (error) {
    }
  }

  private buildFormData(item: any): FormData {
    const formData = new FormData();

    if (this.uploadedImageFile) {
      formData.append('image', this.uploadedImageFile);
    }

    formData.append('itemName', item.itemName);
    formData.append('itemType', item.itemType);
    formData.append('itemServingType', item.itemServingType);
    formData.append('slab1Price', `${item.slab1Price}`);
    formData.append('slab2Price', `${item.slab2Price}`);
    formData.append('slab3Price', `${item.slab3Price}`);
    formData.append('slab4Price', `${item.slab4Price}`);
    formData.append('itemDescription', item.itemDescription);
    formData.append('category', item.category);
    formData.append('isActive', `${item.isActive}`);
    formData.append('itemFlavour', item.itemFlavour);

    return formData;
  }

  preventInvalidNumber(event: any) {
    if (['e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  }
}


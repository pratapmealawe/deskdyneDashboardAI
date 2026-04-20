import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
import { PolicyService } from '@service/policy.service';
import { Inject } from '@angular/core';

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

  foodItemForm!: FormGroup;
  btnPolicy: any;

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddBulkMasterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private policyService: PolicyService,
    private fb: FormBuilder
  ) { 
    if (data) {
      this.editType = data.editType || 'new';
      this.editfoodItemObj = data.editMenuItemObj || {};
    }
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.initForm();

    // Edit mode → patch values
    if (this.editfoodItemObj && this.editfoodItemObj._id) {
      this.imageUrl = environment.imageUrl + this.editfoodItemObj.imageUrl;
      this.foodItemForm.patchValue({
        itemName: this.editfoodItemObj.itemName,
        itemType: this.editfoodItemObj.itemType || 'Veg',
        itemServingType:
          this.editfoodItemObj.itemServingType || 'perPerson',
        slab1Price: this.editfoodItemObj.slab1Price,
        slab2Price: this.editfoodItemObj.slab2Price,
        slab3Price: this.editfoodItemObj.slab3Price,
        slab4Price: this.editfoodItemObj.slab4Price,
        itemDescription: this.editfoodItemObj.itemDescription,
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
    });
  }

  get f() {
    return this.foodItemForm.controls;
  }

  setItemType(type: string): void {
    this.foodItemForm.get('itemType')?.setValue(type);
    this.foodItemForm.get('itemType')?.markAsDirty();
    this.foodItemForm.get('itemType')?.markAsTouched();
  }

  setServingType(type: string): void {
    this.foodItemForm.get('itemServingType')?.setValue(type);
    this.foodItemForm.get('itemServingType')?.markAsDirty();
    this.foodItemForm.get('itemServingType')?.markAsTouched();
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
              if (result && result.croppedImages) {
                this.uploadedImageFile = result.croppedImages.file;
                this.imageUrl = result.croppedImages.resizeDataUrl;
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
      await this.apiMainService.B2B_fooditemAdd(formData);
      this.goToPreviousPage('new');
    } catch (error) {
    }
  }

  private async updateFoodItem(item: any): Promise<void> {
    const formData = this.buildFormData(item);
    try {
      await this.apiMainService.updateB2BfoodItem(
        formData,
        this.editfoodItemObj._id
      );
      this.goToPreviousPage('edit');
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

    return formData;
  }

  goToPreviousPage(action: string): void {
    this.dialogRef.close(action);
  }
}

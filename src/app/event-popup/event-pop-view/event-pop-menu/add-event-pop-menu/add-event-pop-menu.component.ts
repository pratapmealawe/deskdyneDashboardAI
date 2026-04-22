import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'src/app/common-components/image-cropper/image-cropper.component';
import { categoryList } from 'src/config/food-category.config';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-event-pop-menu',
  templateUrl: './add-event-pop-menu.component.html',
  styleUrls: ['./add-event-pop-menu.component.scss'],
  standalone: true,

  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    MatDialogModule
  ]
})
export class AddEventPopMenuComponent implements OnInit {


  form!: FormGroup;
  categoryList = categoryList;
  displayImgUrl = environment.imageUrl;

  imageUrl: any;
  uploadedImageFile: any;
  uploadStatus: boolean = false;
  imageReplaced: boolean = false;
  showUpdateBtn: boolean = false;
  menuId: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiMainService: ApiMainService,
    public dialogRef: MatDialogRef<AddEventPopMenuComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.data?.menuItem) {
      this.showUpdateBtn = true;
      this.menuId = this.data.menuItem._id;
      this.imageUrl = this.data.menuItem.imageUrl;
      this.patchFormValue(this.data.menuItem);
    }
  }

  createForm() {
    this.form = this.fb.group({
      itemName: ['', [Validators.required, Validators.maxLength(80)]],
      price: [null, [Validators.required, Validators.min(1)]],
      subsidy: [0, [Validators.min(0)]],
      category: ['', Validators.required],
      itemType: ['Veg', Validators.required],
      precedence: [0, [Validators.min(0)]],
      isActive: [false],
      description: ['', [Validators.maxLength(200)]],
      doNotChangeInFuture: [false],
      energyValue: [10],
    });
  }

  patchFormValue(item: any) {
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
    });
  }

  get f() {
    return this.form.controls;
  }

  // NUMBER VALIDATIONS
  preventInvalidNumber(e: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(e.key)) e.preventDefault();
  }

  preventInvalidPaste(e: ClipboardEvent, type: 'integer' | 'decimal' = 'integer') {
    const text = e.clipboardData?.getData('text') ?? '';
    if (type === 'integer') {
      if (!/^[1-9]\d*$/.test(text)) e.preventDefault();
    } else {
      if (!/^\d+(\.\d+)?$/.test(text)) e.preventDefault();
    }
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const imageUrl = reader.result;
          try {
            const modalRef = this.modalService.open(ImageCropperComponent, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'xl',
              backdrop: 'static',
              centered: true,
            });
            modalRef.result.then(
              (result: any) => {
                if (result && result.croppedImages) {
                  this.uploadedImageFile = result.croppedImages.file;
                  this.imageUrl = result.croppedImages.resizeDataUrl;
                  this.uploadStatus = true;
                  this.imageReplaced = true;
                }
              },
              () => {
              }
            );
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
          } catch (e) {
          }
        };
      }
    }
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      const formData: any = new FormData();
      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageUrl', this.imageUrl || '');
      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive ? this.form.value.isActive : false);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('subsidy', this.form.value.subsidy ? this.form.value.subsidy : 0);
      formData.append('doNotChangeInFuture', this.form.value.doNotChangeInFuture ? this.form.value.doNotChangeInFuture : false);
      formData.append('category', this.form.value.category);
      formData.append('itemType', this.form.value.itemType);
      formData.append('precedence', this.form.value.precedence ? this.form.value.precedence : 0);

      const res = await this.apiMainService.saveMenuItem(this.data.eventObj._id, formData);
      if (res) {
        this.dialogRef.close(res);
      }
    } catch (error) {
    }
  }

  async updateMenu() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      const outletId = this.data.eventObj._id;
      const formData = new FormData();
      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageUrl', this.uploadedImageFile ? '' : this.imageUrl || '');
      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('subsidy', this.form.value.subsidy ? this.form.value.subsidy : 0);
      formData.append('doNotChangeInFuture', this.form.value.doNotChangeInFuture ? this.form.value.doNotChangeInFuture : false);
      formData.append('category', this.form.value.category);
      formData.append('itemType', this.form.value.itemType);
      formData.append('precedence', this.form.value.precedence);

      const res = await this.apiMainService.updateMenuItem(outletId, this.menuId, formData);
      if (res) {
        this.dialogRef.close(res);
      }
    } catch (error) {
    }
  }

  dismiss() {
    this.dialogRef.close();
  }

}

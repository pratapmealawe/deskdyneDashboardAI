import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { DataFormatService } from 'src/service/data-format.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectOrgCafeteriaDialogComponent } from '../../outlet/select-org-cafeteria-dialog/select-org-cafeteria-dialog.component';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-add-event-pop',
  templateUrl: './add-event-pop.component.html',
  styleUrls: ['./add-event-pop.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule
  ]
})
export class AddEventPopComponent implements OnInit {
  eventform!: FormGroup;
  showError = false;
  showUpdate = false;
  imageUrl: string | null = null;
  uploadedImageFile: File | null = null;
  selectedOutlet: any;
  seletedCafetria: any;
  formattedOrgList: any[] = [];
  btnPolicy: any;
  outletSubsidy = 0;
  minDate = new Date();
  maxDate: Date | null = null;
  bannerFiles: File[] = [];
  bannerPreviewUrls: string[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private confirmationModal: ConfirmationModalService,
    private toasterService: ToasterService,
    private apiMainService: ApiMainService,
    private runtimeStorageService: RuntimeStorageService,
    private dataFormatService: DataFormatService,
    private modalService: NgbModal,
    private policyService: PolicyService,
    public dialogRef: MatDialogRef<AddEventPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.createForm();
    this.setDate();
    this.populateForEditIfNeeded();
  }

  setDate() {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.maxDate = null;
  }

  back() {
    this.dialogRef.close();
  }

  handleFileInput($event: any): void {
    if ($event?.target?.files?.length) {
      const file: File = $event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const imageUrl = reader.result as string;

        try {
          const modalRef: NgbModalRef = this.modalService.open(ImageCropperComponent, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
            backdrop: 'static',
            centered: true,
          });

          modalRef.componentInstance.uploadedImageUrl = imageUrl;
          modalRef.componentInstance.imageWidth = 150;
          modalRef.componentInstance.imageHeight = 150;
          modalRef.componentInstance.aspectRatio = 1;

          modalRef.result.then(
            (result: any) => {
              if (result?.croppedImages) {
                this.uploadedImageFile = result.croppedImages.file;
                this.imageUrl = result.croppedImages.resizeDataUrl;
                this.eventform.patchValue({ cardImage: this.uploadedImageFile });
              }
            },
            () => {
              console.log('Image crop modal dismissed');
            }
          );
        } catch (e) {
          console.log('error while changing outlet image ', e);
        }
      };
    }
  }

  onBannerFilesSelected(event: any) {
    event.stopPropagation();
    this.bannerPreviewUrls = [];
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        this.bannerFiles.push(file);

        // Preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.bannerPreviewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
      this.updateBannerField();
    }
  }

  removeBannerImage(index: number) {
    this.bannerFiles.splice(index, 1);
    this.bannerPreviewUrls.splice(index, 1);
    this.updateBannerField();
  }

  private updateBannerField() {
    const ctrl = this.eventform.get('bannerImages');
    ctrl?.setValue(this.bannerFiles.length ? this.bannerFiles : null);
    ctrl?.updateValueAndValidity();
  }
  get f() {
    return this.eventform.controls;
  }

  // async updateOutletLevelSubsidy(): Promise<void> {
  //   if (!this.selectedOutlet?._id) {
  //     return;
  //   }

  //   try {
  //     this.outletSubsidy = Number(this.eventform.getRawValue().subsidy) || 0;
  //     await this.apiMainService.updateOutletLevelSubsidy(
  //       this.selectedOutlet._id,
  //       this.outletSubsidy
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  private populateForEditIfNeeded(): void {
    const event = this.data?.eventObj || this.runtimeStorageService.getCacheData('EVENTPOPUP_EDIT');
    if (event && event._id) {
      this.showUpdate = true;
      this.selectedOutlet = event;
      this.imageUrl = event.cardImage ? environment.imageUrl + event.cardImage : null;
      this.bannerPreviewUrls = event.bannerImages ? event.bannerImages.map((item: any) => environment.imageUrl + item) : [];
      this.seletedCafetria = {
        organizationDetails: event.organizationDetails,
        cafeteriaDetails: event.cafeteriaDetails,
      };
      this.eventform.patchValue({
        eventPopupName: event.eventPopupName ?? '',
        eventPopupDescription: event.eventPopupDescription ?? '',
        eventPopupStartDate: event.eventPopupStartDate ? new Date(event.eventPopupStartDate) : null,
        eventPopupEndDate: event.eventPopupEndDate ? new Date(event.eventPopupEndDate) : null,
        eventPopupOpened: event.eventPopupOpened ?? false,
        vendorCommissionPercentage: event.vendorCommissionPercentage ?? 0,
        MRPCommissionPercentage: event.MRPCommissionPercentage ?? 0,
        subsidy: event.subsidy ?? 0,
        precedence: event.precedence ?? 0,
      });
    }
  }

  onSubmit(type?: 'update'): void {
    this.submit(type);
  }

  async submit(type?: 'update'): Promise<void> {
    this.showError = true;

    if (this.eventform.invalid || !this.seletedCafetria) {
      this.eventform.markAllAsTouched();
      return;
    }

    try {
      const formValue = this.eventform.getRawValue();

      if (formValue.eventPopupStartDate instanceof Date) {
        formValue.eventPopupStartDate = formValue.eventPopupStartDate.toISOString();
      }
      if (formValue.eventPopupEndDate instanceof Date) {
        formValue.eventPopupEndDate = formValue.eventPopupEndDate.toISOString();
      }

      const finalObj: any = {
        cafeteriaDetails: this.seletedCafetria.cafeteriaDetails,
        organizationDetails: this.seletedCafetria.organizationDetails,
        ...formValue,
      };

      if (this.uploadedImageFile) {
        finalObj.image = this.uploadedImageFile;
      }

      if (this.bannerFiles.length > 0) {
        finalObj.bannerImages = this.bannerFiles;
      }
      const formData = this.objectToFormData(finalObj);

      if (this.selectedOutlet && this.selectedOutlet._id) {
        const res = await this.apiMainService.updateEventPopup(this.selectedOutlet._id, formData);
        if (res) {
          this.toasterService.success('Event Popup updated successfully');
          this.dialogRef.close(true);
        }
      } else {
        const res = await this.apiMainService.saveEventPopup(formData);
        if (res) {
          this.resetAll();
          this.dialogRef.close(true);
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  }

  objectToFormData(obj: any, formData = new FormData(), parentKey = ''): FormData {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value === null || value === undefined) continue;

      if (key === "bannerImages" && Array.isArray(value)) {
        value.forEach((file: File) => {
          formData.append("bannerImages", file);
        });
        continue;
      }

      if (value instanceof File) {
        formData.append(formKey, value);
        continue;
      }

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object" && !(item instanceof File)) {
            this.objectToFormData(item, formData, `${formKey}[${index}]`);
          } else {
            formData.append(`${formKey}[${index}]`, item);
          }
        });
        continue;
      }

      if (typeof value === "object") {
        this.objectToFormData(value, formData, formKey);
        continue;
      }

      formData.append(formKey, value);
    }

    return formData;
  }

  resetAll(): void {
    this.eventform.reset();
    this.imageUrl = null;
    this.uploadedImageFile = null;
    this.bannerFiles = [];
    this.bannerPreviewUrls = [];
  }

  async getOrgList(): Promise<void> {
    try {
      const orgList = await this.apiMainService.getOrgList();
      if (orgList && orgList.length > 0) {
        this.formattedOrgList = this.dataFormatService.getformattedOrgList(orgList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async openOrgList(): Promise<void> {
    const dialogRef = this.dialog.open(SelectOrgCafeteriaDialogComponent, {
      width: '600px',
      data: {
        selectedOrgCafeteria: this.seletedCafetria?.key
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.confirmationModal.modal({
          msg: 'Are you sure you want to change Organization and Cafeteria?',
          callback: () => {
            this.seletedCafetria = { ...result };
          },
          context: this
        });
      }
    });
  }

  private createForm(): void {
    this.eventform = this.fb.group({
      eventPopupName: ['', Validators.required],
      eventPopupDescription: ['', Validators.required],
      eventPopupOpened: [false],
      eventPopupStartDate: [null, Validators.required],
      eventPopupEndDate: [null, Validators.required],
      bannerImages: [null],
      vendorCommissionPercentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      MRPCommissionPercentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      subsidy: [0, [Validators.min(0), Validators.max(100)]],
      precedence: [0, [Validators.min(0)]],

    });
  }
}

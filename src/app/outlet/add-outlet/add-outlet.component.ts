import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { DataFormatService } from 'src/service/data-format.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';

@Component({
  selector: 'app-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss'],
})
export class AddOutletComponent implements OnInit {
  @ViewChild('menuItem') menuItem: any;
  @ViewChild('contentOrg') contentOrg: any;
  orgList: any;
  form: any;
  showError = false;
  uploadedOutletImages: any = {};
  outletImages: any = {};
  selectedOrg: any = {};
  selectedCafe: any = {};
  imageUrl: any;
  uploadedImageFile: any;
  showUpdate: any = false;
  selectedOutlet: any;
  formattedOrgList: any;
  selectedOrgCafeteria: any;
  btnPolicy: any;
  seletedCafetria: any;
  BREAKFAST_END_TIME: any;
  LUNCH_END_TIME: any;
  EVENINGSNACKS_END_TIME: any;
  DINNER_END_TIME: any;
  FULLDAY_END_TIME: any;
  mealTiming: any = [
    { mealType: 'Fullday', acceptOrderFrom: '00:00', acceptOrderTill: '00:00' },
    {
      mealType: 'Breakfast',
      acceptOrderFrom: '00:00',
      acceptOrderTill: '00:00',
    },
    { mealType: 'Lunch', acceptOrderFrom: '00:00', acceptOrderTill: '00:00' },
    {
      mealType: 'EveningSnacks',
      acceptOrderFrom: '00:00',
      acceptOrderTill: '00:00',
    },
    { mealType: 'Dinner', acceptOrderFrom: '00:00', acceptOrderTill: '00:00' },
  ];
  outletSubsidy: number = 0;

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private confirmationModal: ConfirmationModalService,
    private dataFormatService: DataFormatService,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.createForm();
    this.updateOutlet();
  }

  updateOutlet() {
    const outlet = this.runtimeStorageService.getCacheData('OUTLET_EDIT');
    console.log(outlet);
    if (outlet && outlet._id) {
      this.showUpdate = true;
      this.imageUrl = environment.imageUrl + outlet.imageUrl;
      this.selectedOutlet = outlet;
      this.selectedOrg = outlet.companyDetails;
      this.selectedCafe = outlet.cafeteriaDetails;
      this.seletedCafetria = {
        organizationDetails: outlet.organizationDetails,
        cafeteriaDetails: outlet.cafeteriaDetails,
      };
      this.mealTiming = this.mealTiming.map((meal: any) => {
        const matchingMeal = outlet.mealTiming.find(
          (outletMeal: any) => outletMeal.mealType === meal.mealType
        );

        return matchingMeal
          ? {
            ...meal,
            acceptOrderFrom: matchingMeal.acceptOrderFrom,
            acceptOrderTill: matchingMeal.acceptOrderTill,
          }
          : meal;
      });

      this.selectedOrg = outlet.companyDetails;
      this.selectedCafe = outlet.cafeteriaDetails;
      this.form.patchValue({
        outletName: outlet.outletName,
        outletDescription: outlet.outletDescription,
        outletType: outlet.outletType,
        outletOpened: outlet.outletOpened,
        isPreOrder: outlet.isPreOrder ?? false,
        preOrderMealType: outlet.preOrderMealType,
        isSatAvailable: outlet.isSatAvailable,
        isSunAvailable: outlet.isSunAvailable,
        vendorCommissionPercentage: outlet.vendorCommissionPercentage,
        MRPCommissionPercentage: outlet.MRPCommissionPercentage,
        subsidy: outlet.subsidy,
        precedence: outlet.precedence
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      outletName: [''],
      outletDescription: [''],
      outletType: [''],
      outletOpened: [false],
      isPreOrder: [false],
      preOrderMealType: ['lunch'],
      isSatAvailable: [false],
      isSunAvailable: [false],
      vendorCommissionPercentage: [0],
      MRPCommissionPercentage: [0],
      subsidy: [0],
      precedence: [0]
    });
  }

  removeItem(index: any) {
    this.form.controls['menuList'].removeAt(index);
  }

  async getOrgList() {
    try {
      const orgList = await this.apiMainService.getOrgList();
      if (orgList && orgList.length > 0) {
        const formattedOrgList = this.dataFormatService.getformattedOrgList(orgList);
        this.formattedOrgList = formattedOrgList;
      }
    } catch (error) {
      console.log(error);
    }
  }

  openOrgList() {
    this.selectedOrgCafeteria = undefined;
    this.getOrgList();
    const modalRef = this.modalService.open(this.contentOrg, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
    modalRef.result.then(
      (result) => {
        if (result === 'add') {
          this.confirmationModal.modal("Are you sure you want to change Organization and Cafeteria?", () => {
            this.formattedOrgList.forEach((org: any) => {
              if (org.key === this.selectedOrgCafeteria) {
                this.seletedCafetria = { ...org };
                console.log(this.seletedCafetria);
              }
            });
          }, this)

        }
      },
      (reason) => {
        console.log(`Model Dismissed`);
      }
    );
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const modalRef: NgbModalRef = this.modalService.open(
              ImageCropperComponent,
              {
                ariaLabelledBy: 'modal-basic-title',
                size: 'xl',
                backdrop: 'static',
                centered: true,
              }
            );
            modalRef.result.then(
              (result: any) => {
                if (result && result.croppedImages) {
                  this.uploadedImageFile = result.croppedImages.file;
                  this.imageUrl = result.croppedImages.resizeDataUrl;
                }
              },
              (reason: any) => {
                console.log(`Model Dismissed`);
              }
            );
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
          } catch (e) {
            console.log('error while changes kitchen opened status ', e);
          }
        };
      }
    }
  }

  async updateOutletLevelSubsidy() {
    try {
      this.outletSubsidy = this.form.getRawValue().subsidy;
      const res = await this.apiMainService.updateOutletLevelSubsidy(
        this.selectedOutlet._id,
        this.outletSubsidy
      )
    } catch (err) {
      console.log(err);
    }
  }

  async submit(type?: any) {

    try {
      const finalObj = {
        cafeteriaDetails: this.seletedCafetria.cafeteriaDetails,
        organizationDetails: this.seletedCafetria.organizationDetails,
        mealTiming: this.mealTiming,
        ...this.form.value,
      };
      console.log(finalObj);
      let formData = this.objectToFormData(finalObj);
      if (this.uploadedImageFile) {
        formData.append('image', this.uploadedImageFile);
      }

      const res =
        type === 'update'
          ? await this.apiMainService.updateOutlet(
            this.selectedOutlet._id,
            formData,
            0
          )
          : await this.apiMainService.saveOutlet(formData);
      this.router.navigate(['/outlet']);
    } catch (error) {
      console.log(error);
    }
  }

  objectToFormData(obj: any, formData = new FormData(), parentKey = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keyName = parentKey ? `${parentKey}[${key}]` : key;
        if (
          typeof obj[key] === 'object' &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          this.objectToFormData(obj[key], formData, keyName);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item: any, index: any) => {
            if (typeof item === 'object' && item !== null) {
              this.objectToFormData(item, formData, `${keyName}[${index}]`);
            } else {
              formData.append(`${keyName}[${index}]`, item);
            }
          });
        } else {
          formData.append(keyName, obj[key]);
        }
      }
    }
    return formData;
  }

  selectOrg(org: any, cafe: any) {
    this.selectedOrg = {
      organization_name: org.organization_name,
      city: org.city,
      location: org.location,
    };
    this.selectedCafe = {
      cafeteria_name: cafe.cafeteria_name,
      cafeteria_city: cafe.cafeteria_city,
      cafeteria_location: cafe.cafeteria_location,
      address1: cafe.address1,
      address2: cafe.address2,
      landmark: cafe.landmark,
      location: cafe.location,
      cafeteria_id: cafe.cafeteria_id
    };
  }

  back() {
    this.router.navigate(['/outlet']);
  }
  setStandardEndTime() {
    this.mealTiming = [
      {
        mealType: 'Fullday',
        acceptOrderFrom: '06:00',
        acceptOrderTill: '23:00',
      },
      {
        mealType: 'Breakfast',
        acceptOrderFrom: '06:00',
        acceptOrderTill: '10:00',
      },
      {
        mealType: 'Lunch',
        acceptOrderFrom: '11:00',
        acceptOrderTill: '14:00',
      },
      {
        mealType: 'EveningSnacks',
        acceptOrderFrom: '16:00',
        acceptOrderTill: '18:00',
      },
      {
        mealType: 'Dinner',
        acceptOrderFrom: '19:00',
        acceptOrderTill: '22:00',
      },
    ];
  }
}

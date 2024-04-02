import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss']
})
export class AddOutletComponent implements OnInit {
  @ViewChild("menuItem") menuItem: any;
  @ViewChild("contentOrg") contentOrg: any;
  orgList: any;
  form: any;
  showError = false;
  uploadedOutletImages: any = {};
  outletImages: any = {};
  selectedOrg: any = {};
  selectedCafe: any = {};
  imageUrl: any;
  uploadedImageFile: any;
  showUpdate:any = false;
  selectedOutlet:any;

  constructor(private apiMainService: ApiMainService, private router: Router, private runtimeStorageService: RuntimeStorageService, private modalService: NgbModal, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.updateOutlet();
    this.getOrgList();
  }

  updateOutlet() {
    const outlet = this.runtimeStorageService.getCacheData('OUTLET_EDIT');
    this.showUpdate = true;
    if (outlet && outlet._id) {
      console.log(outlet)
      this.imageUrl = environment.imageUrl + outlet.imageUrl
      this.selectedOutlet = outlet;
      this.selectedOrg = outlet.companyDetails;
      this.selectedCafe = outlet.cafeteriaDetails;
      this.form.patchValue({
        outletName: outlet.outletName,
        outletDescription: outlet.outletDescription,
        outletType: outlet.outletType,
        ownerDetails: this.form.controls.ownerDetails.patchValue({
          owner_name: outlet.ownerDetails.owner_name || '',
          owner_phoneNo: outlet.ownerDetails.owner_phoneNo || '',
          owner_emailId: outlet.ownerDetails.owner_emailId || ''
        }),
        managerDetails: this.form.controls.managerDetails.patchValue({
          manager_name: outlet.managerDetails.manager_name || '',
          manager_phoneNo: outlet.managerDetails.manager_phoneNo || '',
          manager_emailId: outlet.managerDetails.manager_emailId || ''
        }),
        cashierDetails: this.form.controls.cashierDetails.patchValue({
          cashier_name: outlet.cashierDetails.cashier_name || '',
          cashier_phoneNo: outlet.cashierDetails.cashier_phoneNo || '',
          cashier_emailId: outlet.cashierDetails.cashier_emailId || ''
        }),
      })
    }
  }

  createForm() {
    this.form = this.fb.group({
      outletName: [''],
      outletDescription: [''],
      outletType: [''],
      // menuList:this.fb.array([]),
      ownerDetails: this.fb.group({
        owner_name: [''],
        owner_phoneNo: [''],
        owner_emailId: ['']
      }),
      managerDetails: this.fb.group({
        manager_name: [''],
        manager_phoneNo: [''],
        manager_emailId: ['']
      }),
      cashierDetails: this.fb.group({
        cashier_name: [''],
        cashier_phoneNo: [''],
        cashier_emailId: ['']
      })
    })
  }

  removeItem(index: any) {
    this.form.controls['menuList'].removeAt(index);
  }

  async getOrgList() {
    try {
      const res = await this.apiMainService.getOrgList();
      if (res && res.length > 0) {
        this.orgList = res;
      }
    } catch (error) {
      console.log(error)
    }
  }

  // openMenuList(){
  //   const modalRef = this.modalService.open(this.menuItem, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  //   modalRef.result.then((result) => {
  //     console.log(`Closed with: ${result}`);
  //     if (result === 'add') {

  //     }
  //   }, (reason) => {
  //     console.log(`Model Dismissed`);

  //   });
  // }

  openOrgList() {
    const modalRef = this.modalService.open(this.contentOrg, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
      if (result === 'add') {

      }
    }, (reason) => {
      console.log(`Model Dismissed`);

    });
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const fileName = file.name;
        console.log(fileName);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const modalRef: NgbModalRef = this.modalService.open(ImageCropperComponent,
              {
                ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static',
                centered: true
              });
            modalRef.result.then((result: any) => {
              console.log('Closed with:', result);
              if (result && result.croppedImages) {
                console.log('croppedImages ', result.croppedImages);
                this.uploadedImageFile = result.croppedImages.file;
                this.imageUrl = result.croppedImages.resizeDataUrl;
              }
            }, (reason: any) => {
              console.log(`Model Dismissed`);
            });
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
          } catch (e) {
            console.log('error while changes kitchen opened status ', e);
          }
        }
      }
    }
  }

  async submit(type?:any) {
    try {
      const finalObj = { companyDetails: this.selectedOrg, cafeteriaDetails: this.selectedCafe, ...this.form.value };
      console.log(finalObj)
      const formData = this.objectToFormData(finalObj);
      if(this.uploadedImageFile){
        formData.append('image', this.uploadedImageFile);
      }
      const res = type === 'update' ? await this.apiMainService.updateOutlet(this.selectedOutlet._id,formData): await this.apiMainService.saveOutlet(formData);
      this.router.navigate(['/outlet']);
    } catch (error) {
      console.log(error)
    }
  }

  objectToFormData(obj: any, formData = new FormData(), parentKey = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keyName = parentKey ? `${parentKey}[${key}]` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
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
      location: org.location
    }
    this.selectedCafe = {
      cafeteria_name: cafe.cafeteria_name,
      cafeteria_city: cafe.cafeteria_city,
      cafeteria_location: cafe.cafeteria_location,
      address1: cafe.address1,
      address2: cafe.address2,
      landmark: cafe.landmark,
      location: cafe.location
    }
    console.log(org, cafe)
  }

}

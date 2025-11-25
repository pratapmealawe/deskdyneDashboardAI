import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { REGEX } from 'src/shared/constants/regex';

@Component({
  selector: 'app-add-vendor-firm',
  templateUrl: './add-vendor-firm.component.html',
  styleUrls: ['./add-vendor-firm.component.scss']
})
export class AddVendorFirmComponent {
  form: any;
  showError = false;
  showUpdate = false;
  orgList: any;
  orgName = 'select organization';
  cafeteriaNameNCity: any;
  outletByCafeteriaList: any;
  showModalOutletList = false;
  selectedOutletsList: any = [];
  defaultRole: any = 'Cashier';
  isVendorEdit: any;
  showAddbutton: any = false;
  showCafeteria = false;
  showSelectCafeteriaOption = true;
  selectedVendorFirm: any;
  vendorLocation: any

  @ViewChild('outletModal') outlet: any;
  @ViewChild('complianceModal') compliance: any;
  @ViewChild('geolocation') geolocation: any;
  @ViewChild('addAddress') address: any;
  @ViewChild('pocDetailsTemp') pocdetails: any;
  addressList: any = [];
  pocDetails: any = []

  btnPolicy: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiMainService: ApiMainService,
    public modalService: NgbModal,
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private policyService: PolicyService
  ) {
    this.getOrgList();
  }

  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.createForm();
    this.updateVendorFirm();
    this.isVendorEdit = this.runtimeStorageService.getCacheData('VENDOR_FIRM_EDIT');
  }

  async getOrgList() {
    try {
      this.orgList = await this.apiMainService.getOrgList();
    } catch (error) {
      console.log('getOrgList', error);
    }
  }

  createForm() {
    this.form = this.fb.group({
      vendorFirmName: ['', [Validators.required, Validators.pattern(REGEX.NAME)]],
      vendorFirmEmail: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      vendorFirmPhoneNo: ['', [Validators.required, Validators.pattern(REGEX.PHONE)]],
      bank_details: this.fb.group({
        accountNo: ['', [Validators.required, Validators.pattern(REGEX.ACCOUNTNO)]],
        ifsc: ['', [Validators.required, Validators.pattern(REGEX.IFSC)]],
        upi: ['', [Validators.pattern(REGEX.UPI)]],
        accountName: ['', [Validators.required]],
        bank_name: ['', [Validators.required]]
      }),
      poc_details:
        this.fb.group({
          poc_id: ['', [Validators.required, Validators.pattern(REGEX.ID)]],
          poc_name: ['', [Validators.required, Validators.pattern(REGEX.NAME)]],
          poc_phoneNo: ['', [Validators.required, Validators.pattern(REGEX.PHONE)]],
          poc_email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
          poc_location: ['', [Validators.required, Validators.pattern(REGEX.LOCATION)]]
        }),
      address:
        this.fb.group({
          address1: ['', [Validators.required]],
          address2: ['', [Validators.required]],
          landmark: ['', [Validators.required]],
          location: ['', [Validators.required]],
          geolocation: this.fb.group({
            lat: ['', [Validators.required]],
            lng: ['', [Validators.required]],
          })
        }),
      accountEnrollment: ['']
    });
  }

  // get pocDetails(): FormArray {
  //   return this.form.get('poc_details') as FormArray;
  // }

  // get addressList(): FormArray {
  //   return this.form.get('address') as FormArray;
  // }

  addPocDetail() {
    // this.pocDetails.push(this.fb.group({
    //   poc_id: ['', Validators.required],
    //   poc_name: [''],
    //   poc_phoneNo: [''],
    //   poc_email: [''],
    //   poc_location: [''],
    // }));
  }
  onFileSelected(event: any) {

    const file = event.target.files[0];
    if (file) {
      this.form.get('accountEnrollment')?.setValue(file.name);
    }

  }



  // addAddress() {
  //   this.addressList.push(this.fb.group({
  //     address1: [''],
  //     address2: [''],
  //     landmark: [''],
  //     location: [''],
  //     geolocation: this.fb.group({
  //       lat: [''],
  //       lng: [''],
  //     })
  //   }));
  // }

  toggleMap(index?: any) {
    this.modalService
      .open(this.geolocation, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        windowClass: 'mapModel',
      })
      .result.then(
        (result) => {
          const geoGroup = this.form.get('address.geolocation') as FormGroup;
          geoGroup.patchValue({
            lat: this.vendorLocation.latlng.lat,
            lng: this.vendorLocation.latlng.lng,
          });
          // if (result === 'add') {
          //   if (result && result.lat && result.lng) {
          //     this.patchVendorLocation();

          //   }

          // }
        },
        (reason) => {
          console.log(`Model Dismissed`);
        }
      );
  }

  updateLocation(event: any) {
    this.vendorLocation = event;
  }
  async patchVendorLocation() {
    const geoGroup = this.form.get('address.geolocation') as FormGroup;
    geoGroup.patchValue({
      lat: this.vendorLocation.latlng.lat,
      lng: this.vendorLocation.latlng.lng,
    });
  }
  // async patchVendorLocation(index: any) {
  //   const addressArray = this.form.get('address') as FormArray;
  //   const addressGroup = addressArray.at(index) as FormGroup;

  //   const geoControl = addressGroup.get('geolocation');
  //   if (geoControl && this.vendorLocation?.latlng) {
  //     geoControl.patchValue({
  //       lat: this.vendorLocation.latlng.lat,
  //       lng: this.vendorLocation.latlng.lng,
  //     });
  //   }
  // }

  removeAddress(index: number) {
    this.addressList.splice(index, 1);
  }

  removePocDetail(index: number) {
    this.pocDetails.splice(index, 1);
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

  addComplience() {
    this.modalService.open(this.compliance, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  updateVendorFirm() {
    const firm = this.runtimeStorageService.getCacheData('VENDOR_FIRM_EDIT');
    if (firm && firm._id) {
      this.selectedVendorFirm = firm;
      this.showUpdate = true;
      this.selectedOutletsList = firm.outletList;
      this.patchVendorFirmAndBank(firm);
      // this.form.patchValue({
      //   vendorFirmName: firm.vendorFirmName,
      //   vendorFirmEmail: firm.vendorFirmEmail,
      //   vendorFirmPhoneNo: firm.vendorFirmPhoneNo,
      // });

      if (firm.poc_details?.length) {
        // this.pocDetails.clear();
        firm.poc_details.forEach((poc: any, index: number) => {
          if (index !== 0 || this.pocDetails.length === 0) {
            this.pocDetails.push(this.fb.group(poc));
          }
        });
      }

      if (firm.address?.length) {
        // this.addressList.clear();
        firm.address.forEach((addr: any, index: number) => {
          const addressGroup = this.fb.group({
            address1: [addr.address1 || ''],
            address2: [addr.address2 || ''],
            landmark: [addr.landmark || ''],
            location: [addr.location || ''],
            geolocation: this.fb.group({
              lat: [addr.geolocation?.lat || ''],
              lng: [addr.geolocation?.lng || '']
            })
          });

          if (index !== 0 || this.addressList.length === 0) {
            this.addressList.push(addressGroup.value);
          }
        });



        // this.addressList.clear();
        // firm.address.forEach((addr: any, index: number) => {
        //   if (index !== 0 || this.addressList.length === 0) {
        //     this.addressList.push(this.fb.group(addr));
        //   }
        // });
      }
      if (firm.accountEnrollment) {
        this.form.get('accountEnrollment').setValue(firm.accountEnrollment);
      }

      // if (firm.bank_details) {
      //   this.form.get('bank_details').setValue(firm.bank_details);
      // }
    }
  }

  patchVendorFirmAndBank(data: any) {
    this.form.patchValue({
      vendorFirmName: data.vendorFirmName,
      vendorFirmEmail: data.vendorFirmEmail,
      vendorFirmPhoneNo: data.vendorFirmPhoneNo,
      bank_details: data.bank_details
    });
  }

  closeAccountEnroll() {
    this.form.get('accountEnrollment').setValue('');
  }

  async submit(type?: any) {
    try {
      const finalObj = {
        ...this.form.value,
        outletList: this.selectedOutletsList,
      };
      const formData = this.objectToFormData(finalObj);

      if (type == 'update') {
        await this.apiMainService.updateVendorFirm(this.selectedVendorFirm._id, finalObj);
      } else {
        await this.apiMainService.saveVendorFirm(finalObj);
      }
      this.router.navigate(['/searchVendorFirm']);
    } catch (error) {
      console.log('submit error', error);
    }
  }

  getOrgName(org: any) {
    this.showCafeteria = true;
    if (org && org.target) {
      this.orgName = org.target.value;
    }
  }

  selectCafeteria(event: any) {
    let [cafeteriaName, cafeteriaCity, organization] = event.target.value.split(',');
    this.getOutletByCafeteriaList(cafeteriaName, cafeteriaCity, organization);
    this.showModalOutletList = true;
  }

  async getOutletByCafeteriaList(cafeteriaName: any, cafeteriaCity: any, organization: any) {
    try {
      this.outletByCafeteriaList = await this.apiMainService.getOutletByCafeteria(
        cafeteriaName,
        cafeteriaCity,
        organization
      );
    } catch (error) {
      console.log('getOutletByCafeteriaList', error);
    }
  }

  addOutlet() {
    this.modalService.open(this.outlet, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }
  addressTemplate() {
    this.modalService.open(this.address, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }
  addPoc() {
    this.modalService.open(this.pocdetails, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }

  addCompliance() {
    this.modalService.open(this.compliance, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }

  getSelectedOutlets() {
    this.outletByCafeteriaList.forEach((elm: any) => {
      if (elm.isChecked) {
        const exists = this.selectedOutletsList.some((outlet: any) => outlet.outletId === elm._id);
        if (!exists) {
          this.selectedOutletsList.push({
            outletId: elm._id,
            outletName: elm.outletName,
            outletType: elm.outletType,
            cafeteriaDetails: elm.cafeteriaDetails,
            organizationDetails: elm.organizationDetails,
          });
        }
      }
    });
    this.modalService.dismissAll();
  }

  deleteOutlet(index: number) {
    this.selectedOutletsList.splice(index, 1);
  }

  goBack() {
    this.router.navigate(['/searchVendorFirm']);
  }


  hasError(form: FormGroup, control: string, error: string) {
    return form.get(control)?.hasError(error);
  }
  hasSubErrors(form: AbstractControl<any>, control: string, error: string) {
    return form.get(control)?.hasError(error);
  }


  hasSubError(controlPath: string | string[], errorName: string) {
    return this.form.get(controlPath)?.hasError(errorName);
  }
  isEditPoc :number | null = null;
  submitPocDetails() {
    const pocDetails = this.form.get('poc_details')?.value;
    if(this.isEditPoc !== null){
      this.pocDetails[this.isEditPoc] = {...pocDetails};
    }else{
      this.pocDetails.push({...pocDetails})
    }
    this.isEditPoc = null;
    this.modalService.dismissAll();
  }
  openPocTemplate(){
    this.isEditPoc = null
    this.form.get("poc_details").reset();
    this.addPoc();
  }
  editPoc(index: number) {
    this.isEditPoc = index;
    const value = this.pocDetails[index]
    this.form.get('poc_details').patchValue(value)
    this.addPoc();
  }



  isEditIndex: number | null = null
  submitAddress() {
    const addressData = this.form.get('address')?.value;
    if (this.isEditIndex !== null) {
      this.addressList[this.isEditIndex] = { ...addressData };
    } else {
      this.addressList.push({ ...addressData });
    }
    this.isEditIndex = null; 
    this.modalService.dismissAll();
  }
  openAddressTemplate() {
    this.isEditIndex = null;
    this.form.get('address').reset()
    this.addressTemplate()
  }
  editAddress(i: number) {
    this.isEditIndex = i;
    const value = this.addressList[i]
    this.form.get('address').patchValue(value);
    this.addressTemplate();
  }

}
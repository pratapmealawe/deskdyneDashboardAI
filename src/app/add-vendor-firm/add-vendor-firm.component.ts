import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

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

  @ViewChild('outletModal') outlet: any;
  @ViewChild('complianceModal') compliance: any;
  btnPolicy: any;

  constructor(
    private fb: FormBuilder,
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
      vendorFirmName: ['', Validators.required],
      vendorFirmEmail: [''],
      vendorFirmPhoneNo: [''],
      bank_details: this.fb.group({
        accountNo: [''],
        ifsc: [''],
        upi: [''],
        accountName: [''],
        bank_name: ['']
      }),
      poc_details: this.fb.array([
        this.fb.group({
          poc_id: [''],
          poc_name: [''],
          poc_phoneNo: [''],
          poc_email: [''],
          poc_location: [''],
        })
      ]),
      address: this.fb.array([
        this.fb.group({
          address1: [''],
          address2: [''],
          landmark: [''],
          location: [''],
        })
      ]),
      accountEnrollment: [''],
      emailsToSend: this.fb.array([
        this.fb.group({
          name: [''],
          email: [''],
        })
      ])
    });
  }

  get emailsToSendList(): FormArray {
    return this.form.get('emailsToSend') as FormArray;
  }

  get pocDetails(): FormArray {
    return this.form.get('poc_details') as FormArray;
  }

  get addressList(): FormArray {
    return this.form.get('address') as FormArray;
  }

  addPocDetail() {
    this.pocDetails.push(this.fb.group({
      poc_id: ['', Validators.required],
      poc_name: [''],
      poc_phoneNo: [''],
      poc_email: [''],
      poc_location: [''],
    }));
  }

  onFileSelected(event: any) {

    const file = event.target.files[0];
    if (file) {
      this.form.get('accountEnrollment')?.setValue(file.name);
    }

  }

  removePocDetail(index: number) {
    this.pocDetails.removeAt(index);
  }

  addAddress() {
    this.addressList.push(this.fb.group({
      address1: [''],
      address2: [''],
      landmark: [''],
      location: [''],
    }));
  }

  removeAddress(index: number) {
    this.addressList.removeAt(index);
  }
  addEmailsToSend() {
    this.emailsToSendList.push(this.fb.group({
      name: [''],
      email: [''],
    }));
  }

  removeEmail(index: number) {
    this.emailsToSendList.removeAt(index);
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
      this.form.patchValue({
        vendorFirmName: firm.vendorFirmName,
        vendorFirmEmail: firm.vendorFirmEmail,
        vendorFirmPhoneNo: firm.vendorFirmPhoneNo,
      });

      if (firm.poc_details?.length) {
        this.pocDetails.clear();
        firm.poc_details.forEach((poc: any, index: number) => {
          if (index !== 0 || this.pocDetails.length === 0) {
            this.pocDetails.push(this.fb.group(poc));
          }
        });
      }

      if (firm.address?.length) {
        this.addressList.clear();
        firm.address.forEach((addr: any, index: number) => {
          if (index !== 0 || this.addressList.length === 0) {
            this.addressList.push(this.fb.group(addr));
          }
        });
      }

      if (firm.emailsToSend?.length) {
        this.emailsToSendList.clear();
        firm.emailsToSend.forEach((addr: any, index: number) => {
          if (index !== 0 || this.emailsToSendList.length === 0) {
            this.emailsToSendList.push(this.fb.group(addr));
          }
        });
      }

      if (firm.accountEnrollment) {
        this.form.get('accountEnrollment').setValue(firm.accountEnrollment);
      }

      if (firm.bank_details) {
        this.form.get('bank_details').setValue(firm.bank_details);
      }
    }
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
}
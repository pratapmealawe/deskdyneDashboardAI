import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { log } from 'console';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { REGEX } from 'src/shared/constants/regex';
import { VendorComplianceComponent } from './vendor-compliance/vendor-compliance.component';


@Component({
  selector: 'app-add-vendor-firm',
  templateUrl: './add-vendor-firm.component.html',
  styleUrls: ['./add-vendor-firm.component.scss']
})
export class AddVendorFirmComponent {
  form: any;
  addressForm: any;
  pocForm: any;
  showError = false;
  showUpdate = false;
  orgList: any;
  orgName = 'select organization';
  cafeteriaNameNCity: any;
  outletByCafeteriaList: any;
  showModalOutletList = false;
  showModalOutletListforPopup = false;
  selectedOutletsList: any = [];
  selectedPopupsList: any = [];
  defaultRole: any = 'Cashier';
  isVendorEdit: any;
  showAddbutton: any = false;
  showCafeteria = false;
  showSelectCafeteriaOption = true;
  selectedVendorFirm: any;
  vendorLocation: any
  dialogRef!: MatDialogRef<any>;
  @ViewChild('outletModal') outlet: any;
  // @ViewChild('complianceModal') compliance: any; // Removed as we use MatDialog type
  @ViewChild('geolocation') geolocation: any;
  @ViewChild('addAddress') address: any;
  @ViewChild('pocDetailsTemp') pocdetails: any;
  @ViewChild('popupModal') popupModal: any;
  addressList: any = [];
  pocDetails: any = []

  btnPolicy: any;
  pocBtn: string = 'Submit';
  cafeterialist: any;


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
      console.log(this.orgList, "roglist");

    } catch (error) {
      console.log('getOrgList', error);
    }
  }

  createForm() {
    this.form = this.fb.group({
      vendorFirmName: ['', [Validators.required]],
      vendorFirmEmail: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      vendorFirmPhoneNo: ['', [Validators.required, Validators.pattern(REGEX.PHONE)]],
      retailShareTDSPct: [2, [Validators.required, Validators.min(0), Validators.max(10)]],
      bank_details: this.fb.group({
        accountNo: ['', [Validators.required, Validators.pattern(REGEX.ACCOUNTNO)]],
        ifsc: ['', [Validators.required, Validators.pattern(REGEX.IFSC)]],
        upi: [''],
        accountName: ['', [Validators.required]],
        bank_name: ['', [Validators.required]]
      }),
      accountEnrollment: ['']
    });
    this.pocForm = this.fb.group({
      poc_id: [''],
      poc_name: [''],
      poc_phoneNo: [''],
      poc_email: [''],
      poc_location: ['']
    });
    this.addressForm = this.fb.group({
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      location: ['', [Validators.required]],
      geolocation: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]],
      })
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.get('accountEnrollment')?.setValue(file.name);
    }
  }
  toggleMap(index?: any) {
    this.modalService
      .open(this.geolocation, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        windowClass: 'mapModel',
      })
      .result.then(
        (result) => {
          const geoGroup = this.addressForm.get('geolocation') as FormGroup;
          geoGroup.patchValue({
            lat: this.vendorLocation.latlng.lat,
            lng: this.vendorLocation.latlng.lng,
          });
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
    const geoGroup = this.addressForm.get('geolocation') as FormGroup;
    geoGroup.patchValue({
      lat: this.vendorLocation.latlng.lat,
      lng: this.vendorLocation.latlng.lng,
    });
  }

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
    console.log('Opening Compliance Dialog');

    // Merge form values with selectedVendorFirm to ensure _id is present if editing
    const dialogData = {
      ...this.selectedVendorFirm, // Contains _id if it exists
      ...this.form.value,         // Contains latest form edits
      compliance: this.selectedVendorFirm?.compliance || this.form.value.compliance // prioritize existing compliance data properly
    };

    const dialogRef = this.dialog.open(VendorComplianceComponent, {
      width: '90vw',
      maxWidth: '1000px',
      height: '90vh',
      disableClose: true,
      data: dialogData,
      autoFocus: false,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // The VendorComplianceComponent saves data directly via API in saveImages().
      // However, we might want to refresh the local data or form if needed.
      if (this.selectedVendorFirm && this.selectedVendorFirm._id) {
        // Optionally refresh vendor data or patch form
        // For now, we assume the component handled the save.
      }
    });
  }

  updateVendorFirm() {
    const firm = this.runtimeStorageService.getCacheData('VENDOR_FIRM_EDIT');
    if (firm && firm._id) {
      this.selectedVendorFirm = firm;
      this.showUpdate = true;
      this.selectedOutletsList = firm.outletList;
      this.patchVendorFirmAndBank(firm);
      if (firm.poc_details?.length) {
        firm.poc_details.forEach((poc: any, index: number) => {
          if (index !== 0 || this.pocDetails.length === 0) {
            this.pocDetails.push(poc);
          }
        });
      }

      if (firm.address?.length) {
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
      }
      if (firm.accountEnrollment) {
        this.form.get('accountEnrollment').setValue(firm.accountEnrollment);
      }
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
        popup_details: this.selectedPopupsList
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

  getOrgName(org: MatSelectChange) {
    this.showCafeteria = true;
    if (org && org) {
      this.orgName = org.value;
      const cafes = this.orgList.find((o: any) => o.organization_name === this.orgName);
      this.cafeterialist = cafes?.cafeteriaList ?? []
    }
  }

  getOrgNameForPopup(org: MatSelectChange) {
    this.showCafeteria = true;
    if (org && org) {
      this.orgName = org.value;
      const cafes = this.orgList.find((o: any) => o.organization_name === this.orgName);
      this.cafeterialist = cafes?.cafeteriaList ?? []
    }
  }

selectCafeteria(event: MatSelectChange) {
  const value = event.value;
  const cafeteriaName = value.cafeteria_name;
  const cafeteriaCity = value.cafeteria_city;
  const cafeteriaId = event.value.cafeteria_id;
  const organizationName = this.orgList.find((org: any) =>
    org.cafeteriaList.some((cafe: any) => cafe.cafeteria_id === cafeteriaId)
  )?.organization_name;
  this.getOutletByCafeteriaList(cafeteriaName, cafeteriaCity, organizationName);
  this.showModalOutletList = true;
}

  selectCafeteriaForPopup(event: MatSelectChange) {
    const value = event.value;
    const cafeteriaName = value.cafeteria_name;
    const cafeteriaCity = value.cafeteria_city;
    const cafeteriaId = event.value.cafeteria_id;
    const organizationName = this.orgList.find((org: any) =>
      org.cafeteriaList.some((cafe: any) => cafe.cafeteria_id === cafeteriaId)
    )?.organization_name;
    this.getOutletByCafeteriaList(cafeteriaName, cafeteriaCity, organizationName);
    this.showModalOutletListforPopup = true;
  }

  async getOutletByCafeteriaList(cafeteriaName: any, cafeteriaCity: any, organization: any) {
    try {
      console.log('getOutletByCafeteriaList', { cafeteriaName, cafeteriaCity, organization });
      this.outletByCafeteriaList = await this.apiMainService.getOutletByCafeteria(
        cafeteriaName,
        cafeteriaCity,
        organization
      );
      console.log(this.outletByCafeteriaList);
    } catch (error) {
      console.log('getOutletByCafeteriaList', error);
    }
  }

  addressTemplate() {
    this.modalService.open(this.address, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }
  addPoc() {
    this.modalService.open(this.pocdetails, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
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
    const dialogRef = this.dialog.getDialogById('OUTLET_DIALOG');
    dialogRef?.close();
  }

  deleteOutlet(index: number) {
    this.selectedOutletsList.splice(index, 1);
  }

  goBack() {
    this.router.navigate(['/searchVendorFirm']);
  }

  hasError(form: FormGroup, controlName: string, error: string) {
    const c = form.get(controlName);
    return c?.hasError(error) && (c.touched || c.dirty);
  }

  hasSubError(path: string[], error: string) {
    let c: AbstractControl | null = null;
    if (path[0] === 'address') {
      c = this.addressForm.get(path[1]);
    } else if (path[0] === 'poc_details') {
      c = this.pocForm.get(path[1]);
    } else {
      c = this.form.get(path);
    }
    return c?.hasError(error) && (c.touched || c.dirty);
  }

  isEditPoc: number | null = null;
  submitPocDetails() {
    const pocDetails = this.pocForm.value;
    if (this.isEditPoc !== null) {
      this.pocDetails[this.isEditPoc] = { ...pocDetails };
    } else {
      this.pocDetails.push({ ...pocDetails })
    }
    this.isEditPoc = null;
    this.modalService.dismissAll();
  }
  openPocTemplate() {
    this.isEditPoc = null
    this.pocForm.reset();
    this.addPoc();
  }
  editPoc(index: number) {
    this.isEditPoc = index;
    const value = this.pocDetails[index]
    this.pocForm.patchValue(value);
    this.addPoc();
  }

  isEditIndex: number | null = null
  isEditIndexPoc: number | null = null;
  submitAddress() {
    const addressData = this.addressForm.value;
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
    this.addressForm.reset()
    this.addressTemplate()
  }
  openPOCTemplate() {
    this.isEditIndexPoc = null;
    this.pocForm.reset()
    this.addPoc()
  }
  editPOC(i: number) {
    this.isEditIndexPoc = i;
    this.pocBtn = 'Update';
    const value = this.pocDetails[i];
    this.pocForm.patchValue(value);
    this.addPoc();
  }
  editAddress(i: number) {
    this.isEditIndex = i;
    const value = this.addressList[i]
    this.addressForm.patchValue(value);
    this.addressTemplate();
  }
  closeDialog() {
    this.dialogRef.close();
  }

  @ViewChild('outletModal', { static: true }) outletDialog!: TemplateRef<any>;

addOutlet() {
  if (!this.outletDialog) {
    console.error('TemplateRef outletDialog is not available');
    return;
  }
  this.dialog.open(this.outletDialog, {
    width: '1000px',
    disableClose: false,
    id: 'OUTLET_DIALOG'
  });
}

  addPopup() {
    if (!this.popupModal) {
      console.error('TemplateRef popup is not available');
      return;
    }
    this.dialog.open(this.popupModal, {
      width: '1000px',
      disableClose: false
    });
    this.dialog.afterAllClosed.subscribe(() => {
    this.showModalOutletListforPopup = false;
    })
  }

  getSelectedPopups() {
    this.outletByCafeteriaList.forEach((elm: any) => {
      if (elm.isChecked) {
        const exists = this.selectedPopupsList.some((outlet: any) => outlet.outletId === elm._id);
        if (!exists) {
          this.selectedPopupsList.push({
            popupId: elm._id,
            popupName: elm.outletName,
            popupType: elm.outletType,
            cafeteriaDetails: elm.cafeteriaDetails,
            organizationDetails: elm.organizationDetails,
          });
        }
      }
    });
    this.showModalOutletListforPopup = false;
    this.dialog.closeAll();
  }

  deletePopup(index: number) {
    this.selectedPopupsList.splice(index, 1);
  }
}
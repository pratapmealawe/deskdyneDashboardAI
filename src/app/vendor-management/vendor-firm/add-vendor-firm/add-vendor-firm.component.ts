import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PermissionsService } from '@service/permission.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';
import { REGEX } from 'src/shared/constants/regex';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { MaterialModule } from '../../../material.module';
import { VendorFirmAddAddressComponent } from './vendor-firm-add-address/vendor-firm-add-address.component';
import { VendorFirmPocModalComponent } from './vendor-firm-poc-modal/vendor-firm-poc-modal.component';
import { VendorFirmSelectOutletsComponent } from './vendor-firm-select-outlets/vendor-firm-select-outlets.component';
import { VendorFirmSelectPopupsComponent } from './vendor-firm-select-popups/vendor-firm-select-popups.component';

@Component({
  selector: 'app-add-vendor-firm',
  templateUrl: './add-vendor-firm.component.html',
  styleUrls: ['./add-vendor-firm.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class AddVendorFirmComponent {
  form!: FormGroup;
  addressList: any[] = [];
  selectedOutletsList: any[] = [];
  selectedPopupsList: any[] = [];
  pocDetails: any = [];
  orgList: any[] = [];
  showUpdate: boolean = false;
  isVendorEdit: boolean = false;
  selectedVendorFirm: any = null;
  cafeterialist: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiMainService: ApiMainService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<AddVendorFirmComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getOrgList();
  }

  ngOnInit() {
    this.createForm();

    // Check if data is provided via Dialog (MAT_DIALOG_DATA)
    if (this.data && (this.data._id || this.data.vendorFirm?._id)) {
      const vendorData = this.data._id ? this.data : this.data.vendorFirm;
      this.isVendorEdit = true;
      this.showUpdate = true;
      this.patchAllData(vendorData);
    }
  }

  async getOrgList() {
    try {
      this.orgList = await this.apiMainService.getOrgList();

    } catch (error) {
    }
  }

  createForm() {
    this.form = this.fb.group({
      vendorFirmName: ['', [Validators.required]],
      vendorFirmEmail: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      vendorFirmPhoneNo: ['', [Validators.required, Validators.pattern(REGEX.PHONE)]],
      tds_percent: [2, [Validators.required, Validators.min(0), Validators.max(10)]],
      fssai_no: [''],
      bank_details: this.fb.group({
        accountNo: ['', [Validators.required, Validators.pattern(REGEX.ACCOUNTNO)]],
        IFSC: ['', [Validators.required, Validators.pattern(REGEX.IFSC)]],
        branch: ['', [Validators.required]],
        accountType: ['', [Validators.required]],
        accountName: ['', [Validators.required]],
        bank_name: ['', [Validators.required]]
      }),
      accountEnrollment: [''],
      MMID: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.get('accountEnrollment')?.setValue(file.name);
    }
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

  patchAllData(firm: any) {
    if (!firm) return;
    this.selectedVendorFirm = firm;
    this.showUpdate = true;

    // Patch Form
    this.patchVendorFirmAndBank(firm);

    // Patch Outlets & Popups
    this.selectedOutletsList = Array.isArray(firm.outletList) ? [...firm.outletList] : [];
    this.selectedPopupsList = Array.isArray(firm.popup_details) ? [...firm.popup_details] : [];

    // Patch POC Details
    this.pocDetails = Array.isArray(firm.poc_details) ? [...firm.poc_details] : [];

    // Patch Addresses
    this.addressList = [];
    if (Array.isArray(firm.address)) {
      this.addressList = [...firm.address];
    }

    if (firm.accountEnrollment) {
      this.form.get('accountEnrollment')?.setValue(firm.accountEnrollment);
    }
  }

  patchVendorFirmAndBank(data: any) {
    this.form.patchValue({
      vendorFirmName: data.vendorFirmName,
      vendorFirmEmail: data.vendorFirmEmail,
      vendorFirmPhoneNo: data.vendorFirmPhoneNo,
      tds_percent: data.tds_percent,
      fssai_no: data.fssai_no,
      bank_details: data.bank_details,
      MMID: data.MMID || ''
    });
  }


  closeAccountEnroll() {
    this.form.get('accountEnrollment')?.setValue('');
  }

  trimStringValues(obj: any): any {
    if (obj instanceof File || obj instanceof Blob) return obj;
    if (typeof obj === 'string') return obj.trim();
    if (Array.isArray(obj)) return obj.map((v: any) => this.trimStringValues(v));
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        obj[key] = this.trimStringValues(obj[key]);
      });
    }
    return obj;
  }

  async submit(type?: any) {
    try {
      let finalObj = {
        ...this.form.value,
        outletList: this.selectedOutletsList,
        popup_details: this.selectedPopupsList,
        poc_details: this.pocDetails,
        address: this.addressList
      };

      finalObj = this.trimStringValues(finalObj);

      const formData = this.objectToFormData(finalObj);

      if (type == 'update') {
        await this.apiMainService.updateVendorFirm(this.selectedVendorFirm._id, finalObj);
      } else {
        await this.apiMainService.saveVendorFirm(finalObj);
      }
      if (this.dialogRef) {
        this.dialogRef.close(true);
      } else {
        this.router.navigate(['/app/vendor-firm']);
      }
    } catch (error) {
    }
  }


  // New Dialog Integrations
  openAddressTemplate(index?: number) {
    const isEdit = index !== undefined;
    const dialogRef = this.dialog.open(VendorFirmAddAddressComponent, {
      width: '800px',
      disableClose: false,
      panelClass: 'custom-dialog-container',
      data: { address: isEdit ? this.addressList[index] : null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          this.addressList[index!] = result;
        } else {
          this.addressList.push(result);
        }
      }
    });
  }

  editAddress(i: number) {
    this.openAddressTemplate(i);
  }

  openPOCTemplate(index?: number) {
    const isEdit = index !== undefined;
    const dialogRef = this.dialog.open(VendorFirmPocModalComponent, {
      width: '800px',
      disableClose: false,
      panelClass: 'custom-dialog-container',
      data: { poc: isEdit ? this.pocDetails[index] : null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          this.pocDetails[index!] = result;
        } else {
          this.pocDetails.push(result);
        }
      }
    });
  }

  editPOC(i: number) {
    this.openPOCTemplate(i);
  }

  addOutlet() {
    const dialogRef = this.dialog.open(VendorFirmSelectOutletsComponent, {
      width: '1000px',
      disableClose: false,
      panelClass: 'custom-dialog-container',
      data: { orgList: this.orgList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && Array.isArray(result)) {
        result.forEach((elm: any) => {
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
        });
      }
    });
  }

  addPopup() {
    const dialogRef = this.dialog.open(VendorFirmSelectPopupsComponent, {
      width: '1000px',
      disableClose: false,
      panelClass: 'custom-dialog-container',
      data: { orgList: this.orgList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && Array.isArray(result)) {
        result.forEach((elm: any) => {
          const exists = this.selectedPopupsList.some((popup: any) => popup.popupId === elm._id);
          if (!exists) {
            this.selectedPopupsList.push({
              popupId: elm._id,
              popupName: elm.eventPopupName,
              popupType: elm.eventPopupOpened,
              cafeteriaDetails: elm.cafeteriaDetails,
              organizationDetails: elm.organizationDetails,
            });
          }
        });
      }
    });
  }

  deleteOutlet(index: number) {
    this.selectedOutletsList.splice(index, 1);
  }

  deletePopup(index: number) {
    this.selectedPopupsList.splice(index, 1);
  }

  goBack() {
    if (this.dialogRef) {
      this.dialogRef.close(false);
    } else {
      this.router.navigate(['/app/vendor-firm']);
    }
  }

  hasError(form: FormGroup, controlName: string, error: string) {
    const c = form.get(controlName);
    return c?.hasError(error) && (c.touched || c.dirty);
  }

  hasSubError(path: string[], error: string) {
    const c = this.form.get(path);
    return c?.hasError(error) && (c.touched || c.dirty);
  }

  get isFormValid(): boolean {
    // Valid if form controls are valid AND at least one address AND at least one outlet
    return this.form.valid && this.addressList.length > 0;
  }

  toggleCheckbox(outlet: any): void {
    outlet.isChecked = !outlet.isChecked;
  }

  toggleCheckboxforPopup(event: any): void {
    event.isChecked = !event.isChecked;
  }
}

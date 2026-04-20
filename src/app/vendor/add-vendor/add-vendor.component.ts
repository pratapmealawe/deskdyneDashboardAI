import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PolicyService } from '@service/policy.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';
import { AddressItem, OutletItem, PopupItem, Vendor } from 'src/app/common/interfaces/vendor.interface';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorComplianceComponent } from './vendor-compliance/vendor-compliance.component';
import { SetGeolocationComponent } from 'src/app/common-components/set-geolocation/set-geolocation.component';
import { VendorOutletModalComponent } from './vendor-outlet-modal/vendor-outlet-modal.component';
import { VendorAddressModalComponent } from './vendor-address-modal/vendor-address-modal.component';
import { VendorPopupModalComponent } from './vendor-popup-modal/vendor-popup-modal.component';

@Component({
  selector: 'app-add-vendor',
  templateUrl: 'add-vendor.component.html',
  styleUrls: ['add-vendor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    VendorComplianceComponent,
    SetGeolocationComponent,
    VendorOutletModalComponent,
    VendorAddressModalComponent,
    VendorPopupModalComponent
  ]
})
export class AddVendorCommponent {
  form: any;
  showError = false;
  showUpdate = false;
  outletByCafeteriaList: OutletItem[] = [];
  popupsByVendorFirm: PopupItem[] = [];
  selectedOutletsList: OutletItem[] = [];
  selectedPopupsList: PopupItem[] = [];
  selectedAddressList: AddressItem[] = [];
  addressList: AddressItem[] = [];

  defaultRole: string = 'Cashier';
  vendorRole = ['Owner', 'Manager', 'Cashier', 'Kitchen Manager'];
  selectedVendor: Vendor | null = null;
  vendorId: any = 0;

  loginCode: string | null = null;
  btnPolicy: any;
  vendorList: any[] = [];
  vendorLocation: any;
  title: string = 'Add Vendor';

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private runtimeStorageService: RuntimeStorageService,
    private policyService: PolicyService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddVendorCommponent>
  ) { }

  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.getAllVendors();
    this.createForm();
    this.updateVendor();
  }

  createForm() {
    this.form = this.fb.group({
      vendorName: ['', [Validators.required]],
      vendorPhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      vendorEmail: ['', [Validators.required]],
      vendorRole: ['', [Validators.required]],
      vendorId: ['', [Validators.required]],
      accessType: ['outlet', [Validators.required]],
      isPos: [false],
      isDashboard: [false],
      posEntry: [''],
      posConfiguration: this.fb.group({
        enablePrinter: [false],
        enableScanner: [false],
        enableSecondDisplay: [false],
        enableManualPrint: [false],
        kitchenKot: [false],
        userKot: [false],
        userKotOnlyForManual: [false],
      }),
      geolocation: this.fb.group({
        lat: [null],
        lng: [null]
      })
    });
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
      if (this.vendorId) {
        this.changeVendorFirm(this.vendorId, true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async changeVendorFirm(e: any, isInitial: boolean = false) {
    try {
      this.vendorId = isInitial ? e : e.value;
      await this.getVendorFirmById(this.vendorId);
      if (this.vendorId) {
        const vendorFirm = this.vendorList.find((item: any) => item?._id === this.vendorId);
        this.outletByCafeteriaList = vendorFirm?.outletList || [];
      }
    } catch (error) {
      console.error('Error changing vendor firm:', error);
    }
  }

  async getVendorFirmById(vendorFirmId: any) {
    try {
      const res = await this.apiMainService.getVendorFirmById(vendorFirmId);
      this.addressList = res?.address || [];
      this.popupsByVendorFirm = res?.popup_details || [];
    } catch (error) {
      console.error('Error getting vendor firm by id:', error);
      this.addressList = [];
      this.popupsByVendorFirm = [];
    }
  }

  updateVendor() {
    const vendor = this.runtimeStorageService.getCacheData('VENDOR_EDIT');
    if (vendor && vendor._id) {
      this.selectedVendor = vendor;
      this.showUpdate = true;
      this.title = 'Edit Vendor';
      this.defaultRole = vendor.vendorRole;
      this.selectedOutletsList = vendor.outletList || [];
      this.selectedAddressList = vendor.addressList || [];
      this.selectedPopupsList = vendor.popup_Details || [];
      this.loginCode = vendor.loginCode || null;

      let accessType = 'outlet';
      if (vendor.isDailyAndBulkAccess) accessType = 'daily_bulk';
      else if (vendor.isPopupAccess) accessType = 'popup';

      this.form.patchValue({
        vendorName: vendor.vendorName,
        vendorPhoneNo: vendor.vendorPhoneNo,
        vendorEmail: vendor.vendorEmail,
        vendorRole: vendor.vendorRole,
        accessType: accessType,
        vendorId: vendor.vendorFirmDetails?.vendorFirmId || '',
        isPos: vendor.isPos || false,
        isDashboard: vendor.isDashboard || false,
        posEntry: vendor.posEntry || '',
        posConfiguration: {
          enablePrinter: vendor.posConfiguration?.enablePrinter || false,
          enableScanner: vendor.posConfiguration?.enableScanner || false,
          enableSecondDisplay: vendor.posConfiguration?.enableSecondDisplay || false,
          enableManualPrint: vendor.posConfiguration?.enableManualPrint || false,
          kitchenKot: vendor.posConfiguration?.kitchenKot || false,
          userKot: vendor.posConfiguration?.userKot || false,
          userKotOnlyForManual: vendor.posConfiguration?.userKotOnlyForManual || false,
        },
        geolocation: vendor.geolocation || { lat: null, lng: null }
      });
      this.vendorId = vendor.vendorFirmDetails?.vendorFirmId || '';
      this.getAllVendors();
    }
  }

  async submit(type?: any) {
    try {
      if (!this.isAddVendorValid()) return;

      const vendorFirm = this.vendorList.find((item: any) => item._id === this.vendorId);
      const vendorFirmDetails = {
        vendorFirmId: this.vendorId,
        vendorFirmName: vendorFirm?.vendorFirmName
      };

      const finalObj = {
        ...this.form.value,
        isOutletAccess: this.form.value.accessType === 'outlet',
        isDailyAndBulkAccess: this.form.value.accessType === 'daily_bulk',
        isPopupAccess: this.form.value.accessType === 'popup',
        outletList: this.selectedOutletsList,
        vendorFirmDetails: vendorFirmDetails,
        addressList: this.selectedAddressList,
        popup_Details: this.selectedPopupsList,
        geolocation: this.form.get('geolocation')?.value
      };

      const trimmedObj = this.trimStringValues(finalObj);

      if (type === 'update') {
        await this.apiMainService.updateVendor(this.selectedVendor?._id, trimmedObj);
      } else {
        await this.apiMainService.saveVendor(trimmedObj);
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error submitting vendor:', error);
    }
  }

  addOutlet() {
    this.dialog.open(VendorOutletModalComponent, {
      width: '800px',
      data: { outlets: this.outletByCafeteriaList }
    }).afterClosed().subscribe(result => {
      if (result) this.selectedOutletsList = result;
    });
  }

  addAddress() {
    this.dialog.open(VendorAddressModalComponent, {
      width: '800px',
      data: { addressList: this.addressList }
    }).afterClosed().subscribe(result => {
      if (result) {
        const exists = this.selectedAddressList.some(a => a.address1 === result.address1 && a.location === result.location);
        if (!exists) this.selectedAddressList.push(result);
      }
    });
  }

  addPopup() {
    this.dialog.open(VendorPopupModalComponent, {
      width: '1000px',
      data: { popups: this.popupsByVendorFirm }
    }).afterClosed().subscribe(result => {
      if (result) this.selectedPopupsList = result;
    });
  }

  deleteOutlet(index: number) {
    this.selectedOutletsList.splice(index, 1);
  }

  deleteAddress(index: number) {
    this.selectedAddressList.splice(index, 1);
  }

  deletePopup(index: number) {
    this.selectedPopupsList.splice(index, 1);
  }

  toggleMap() {
    this.dialog.open(SetGeolocationComponent, {
      width: '800px',
      panelClass: 'mapModel',
      data: { selectedCenter: this.form.get('geolocation')?.value }
    }).afterClosed().subscribe(result => {
      if (result?.latlng) {
        this.form.get('geolocation')?.patchValue({
          lat: result.latlng.lat,
          lng: result.latlng.lng
        });
      }
    });
  }

  goBack() {
    this.dialogRef.close();
  }

  hasError(form: FormGroup, control: string, error: string) {
    return form.get(control)?.hasError(error);
  }

  isAddVendorValid(): boolean {
    const accessType = this.form.get('accessType')?.value;
    if (!this.form.valid || this.selectedAddressList.length === 0) return false;
    if (accessType === 'outlet' && this.selectedOutletsList.length === 0) return false;
    if (accessType === 'popup' && this.selectedPopupsList.length === 0) return false;
    return true;
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

  async createLoginCode() {
    try {
      const res: any = await this.apiMainService.createLoginCode(this.selectedVendor?._id!);
      this.loginCode = res?.loginCode || null;
    } catch (error) {
      console.error('Error creating login code:', error);
    }
  }

  async refreshLoginCode() {
    try {
      const res: any = await this.apiMainService.refreshLoginCode(this.selectedVendor?._id!);
      this.loginCode = res?.loginCode || null;
    } catch (error) {
      console.error('Error refreshing login code:', error);
    }
  }
}

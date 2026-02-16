import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { DataFormatService } from 'src/service/data-format.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: 'add-vendor.component.html',
  styleUrls: ['add-vendor.component.scss'],
})
export class AddVendorCommponent {
  form: any;
  showError = false;
  showUpdate = false;
  outletByCafeteriaList: any;
  popupsByVendorFirm: any = [];
  showModalOutletList = false;
  selectedOutletsList: any = [];
  selectedPopupsList: any = [];
  defaultRole: any = 'Cashier';

  showAddbutton: any = false;
  vendorRole = ['Owner', 'Manager', 'Cashier', 'Kitchen Manager'];
  showCafeteria = false;
  showSelectCafeteriaOption = true;
  selectedVendor: any;
  addressList: any = [];
  showEditModalOutletList = false;
  vendorId: number = 0
  title: string = ' Add Vendor '

  @ViewChild('outletModal') outlet: any;
  @ViewChild('addressModal') address: any;
  @ViewChild('popupModal') popupModal: any;
  selectedAddressList: any = [];
  selectedAddress: any = null;  // holds the selected address object

  btnPolicy: any;
  vendorList: any;
  vendorLocation: any
  @ViewChild('geolocation') geolocation: any;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private policyService: PolicyService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.getAllVendors()
    this.createForm();
    this.updateVendor();
  }

  createForm() {
    this.form = this.fb.group({
      vendorName: ['', [Validators.required]],
      vendorPhoneNo: ['', [Validators.required]],
      vendorEmail: ['', [Validators.required]],
      vendorRole: ['', [Validators.required]],
      vendorId: ['', [Validators.required]],
      accessType: ['outlet', [Validators.required]],
    });
  }

  // Helper for template
  get f() {
    return this.form.controls;
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
      this.vendorId && this.changeVendorFirm(this.vendorId, true)
    } catch (error) {
      console.error(error);
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

  async changeVendorFirm(e: any, isInitial: boolean = false) {
    try {
      this.vendorId = isInitial ? e : e.value
      this.getVendorFirmById(this.vendorId);
      if (this.vendorId) {
        const vendorFirm = this.vendorList.find((item: any) => item?._id === this.vendorId)
        if (vendorFirm?.outletList?.length > 0) {
          this.outletByCafeteriaList = vendorFirm?.outletList
        } else {
          this.outletByCafeteriaList = [];
        }
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
    let accessType = '';
    if (vendor?.isOutletAccess) {
      accessType = 'outlet';
    } else if (vendor?.isDailyAndBulkAccess) {
      accessType = 'daily_bulk';
    } else if (vendor?.isPopupAccess) {
      accessType = 'popup';
    }
    if (vendor && vendor._id) {
      this.selectedVendor = vendor;
      this.showUpdate = true;
      this.defaultRole = vendor.vendorRole;
      this.selectedOutletsList = vendor.outletList;
      this.selectedAddressList = vendor.addressList;
      this.selectedPopupsList = vendor.popup_Details || [];
      this.form.patchValue({
        vendorName: vendor.vendorName,
        vendorPhoneNo: vendor.vendorPhoneNo,
        vendorEmail: vendor.vendorEmail,
        vendorRole: vendor.vendorRole,
        address: vendor.address,
        geolocation: vendor.geolocation,
        accessType: accessType,
        vendorId: vendor.vendorFirmDetails ? vendor.vendorFirmDetails.vendorFirmId : "",
      });
      this.vendorId = vendor.vendorFirmDetails ? vendor.vendorFirmDetails.vendorFirmId : "";
      this.getAllVendors(); // to bind values of outletByCafeteriaList and popupsByVendorFirm after edit
    }
  }

  isAnyPopupSelected(): boolean {
    return this.popupsByVendorFirm?.some((p: any) => p.isChecked);
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
      const vendorFirmDetails = {
        vendorFirmId: this.vendorId,
        vendorFirmName: this.vendorList.find((item: any) => item._id === this.vendorId)?.vendorFirmName
      }
      const finalObj = {
        ...this.form.value,
        isOutletAccess: this.form.value.accessType === 'outlet' ? true : false,
        isDailyAndBulkAccess: this.form.value.accessType === 'daily_bulk' ? true : false,
        isPopupAccess: this.form.value.accessType === 'popup' ? true : false,
        outletList: this.selectedOutletsList,
        vendorFirmDetails: vendorFirmDetails,
        addressList: this.selectedAddressList,
        popup_Details: this.selectedPopupsList
      };

      const formData = this.objectToFormData(this.trimStringValues(finalObj));

      if (type == 'update') {
        let updated = await this.apiMainService.updateVendor(
          this.selectedVendor._id,
          finalObj
        );
      } else {
        await this.apiMainService.saveVendor(finalObj);
      }
      this.router.navigate(['/searchVendor']);
    } catch (error) {
      console.error('Error submitting vendor:', error);
    }
  }

  addOutlet() {
    try {
      this.dialog.open(this.outlet, {
        width: '800px',
      });
    } catch (error) {
      console.error('Error opening outlet modal:', error);
    }
  }

  addAddress() {
    try {
      // Reset selected address when opening the modal
      this.selectedAddress = null;
      this.dialog.open(this.address, {
        width: '800px',
      });
    } catch (error) {
      console.error('Error opening address modal:', error);
    }
  }

  getSelectedOutlets() {
    this.selectedOutletsList = []
    this.outletByCafeteriaList.forEach((elm: any) => {
      if (elm.isChecked) {
        let outletPresent = false;
        this.selectedOutletsList.forEach((savedOutlet: any) => {
          if (savedOutlet.outletId === elm.outletId) {
            outletPresent = true;
          }
        });
        if (!outletPresent) {
          this.selectedOutletsList.push({
            outletId: elm.outletId,
            outletName: elm.outletName,
            outletType: elm.outletType,
            outletOpened: elm.outletOpened,
            cafeteriaDetails: elm.cafeteriaDetails,
            organizationDetails: elm.organizationDetails,
          });
        }
      }
    });
    this.dialog.closeAll();
  }

  selectAddress(address: any) {
    try {
      this.selectedAddress = address;
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  }

  addSelectedAddress() {
    try {
      if (!this.selectedAddress) {
        console.warn('No address selected');
        return;
      }

      // Check if this address is already in the list
      const addressExists = this.selectedAddressList.some(
        (addr: any) => addr.address1 === this.selectedAddress.address1 &&
          addr.location === this.selectedAddress.location
      );

      if (!addressExists) {
        this.selectedAddressList.push({
          address1: this.selectedAddress.address1,
          address2: this.selectedAddress.address2,
          landmark: this.selectedAddress.landmark,
          location: this.selectedAddress.location,
          geolocation: this.selectedAddress.geolocation
        });
      }

      this.dialog.closeAll();
    } catch (error) {
      console.error('Error adding selected address:', error);
    }
  }

  deleteOutlet(index: any) {
    try {
      this.selectedOutletsList.splice(index, 1);
    } catch (error) {

    }
  }

  deleteAddress(index: any) {
    try {
      this.selectedAddressList.splice(index, 1);
    } catch (error) {
    }
  }

  toggleMap() {
    this.dialog.open(this.geolocation, {
      width: '800px',
      panelClass: 'mapModel'
    })
      .afterClosed().subscribe((result) => {
        if (result === 'add') {
          this.patchVendorLocation();
        }
      });
  }

  async patchVendorLocation() {
    const vendorLocationControl = this.form.get('geolocation');
    if (vendorLocationControl && this.vendorLocation?.latlng) {
      vendorLocationControl.patchValue({
        lat: this.vendorLocation.latlng.lat,
        lng: this.vendorLocation.latlng.lng,
      });
    }
  }

  updateLocation(event: any) {
    this.vendorLocation = event;
  }

  goBack() {
    this.form.reset();
    this.router.navigate(['/searchVendor']);
  }

  hasError(form: FormGroup, control: string, error: string) {
    return form.get(control)?.hasError(error);
  }

  onRadioClick(address: any) {
    this.selectedAddress = address;
  }
  isAddVendorValid(): boolean {
    const accessType = this.form.get('accessType')?.value;

    // Base validation: form must be valid and address is always required
    if (!this.form.valid || this.selectedAddressList.length === 0) {
      return false;
    }

    // Outlets required only for outlet access
    if (accessType === 'outlet' && this.selectedOutletsList.length === 0) {
      return false;
    }

    // Popups required only for popup access
    if (accessType === 'popup' && this.selectedPopupsList.length === 0) {
      return false;
    }

    // For daily_bulk access, neither outlets nor popups are required
    return true;
  }
  toggleCheckbox(outlet: any) {
    outlet.isChecked = !outlet.isChecked;
  }

  toggleCheckboxforPopup(popup: any) {
    popup.isChecked = !popup.isChecked;
  }
  addPopup() {
    try {
      if (!this.popupModal) {
        console.error('TemplateRef popup is not available');
        return;
      }
      this.dialog.open(this.popupModal, {
        width: '1000px',
        disableClose: false
      });
    } catch (error) {
      console.error('Error opening popup modal:', error);
    }
  }

  getSelectedPopups() {
    try {
      this.selectedPopupsList = [];
      this.popupsByVendorFirm.forEach((elm: any) => {
        if (elm.isChecked) {
          let popupPresent = false;
          this.selectedPopupsList.forEach((savedPopup: any) => {
            if (savedPopup.popupId === elm.popupId) {
              popupPresent = true;
            }
          });
          if (!popupPresent) {
            this.selectedPopupsList.push({
              popupId: elm.popupId,
              popupName: elm.popupName,
              popupType: elm.popupType,
              cafeteriaDetails: elm.cafeteriaDetails,
              organizationDetails: elm.organizationDetails,
            });
          }
        }
      });
      this.dialog.closeAll();
    } catch (error) {
      console.error('Error getting selected popups:', error);
    }
  }

  deletePopup(index: number) {
    try {
      this.selectedPopupsList.splice(index, 1);
    } catch (error) {
      console.error('Error deleting popup:', error);
    }
  }

}

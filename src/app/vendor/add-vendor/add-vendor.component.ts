import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import {
  NgbModal,
  NgbModalRef,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
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
  title:string = ' Add Vendor '

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
    public modalService: NgbModal,
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
      vendorName: ['',[Validators.required]],
      vendorPhoneNo: ['',[Validators.required]],
      vendorEmail: ['',[Validators.required]],
      vendorRole: ['',[Validators.required]],
      vendorId: ['',[Validators.required]],
      accessType: ['',[Validators.required]],
      // address: this.fb.group({
      //   address1: [''],
      //   address2: [''],
      //   landmark: [''],
      //   location: [''],
      //   city: [''],
      // }),
      // geolocation: this.fb.group({
      //   lat: [''],
      //   lng: [''],
      // }),
    });
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
      this.vendorId && this.changeVendorFirm(this.vendorId)
    } catch (error) {
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

    async changeVendorFirm(e: any) {
    this.getVendorFirmById(e.value);
    console.log(e.value , "ghjgdug" , e);
    this.vendorId = e.value
    if (e.value) {
      // const id = typeof e === "string" ? e : e.value
      const vendorFirm = this.vendorList.find((item: any) => item?._id === e.value)
      if (vendorFirm?.outletList.length > 0) {
        this.outletByCafeteriaList = vendorFirm?.outletList
      }
    }
  }

  async getVendorFirmById(event: any) {
    const vendorFirmId = event;
    const res = await this.apiMainService.getVendorFirmById(vendorFirmId);
    this.addressList = res.address;
  }

  updateVendor() {
    const vendor = this.runtimeStorageService.getCacheData('VENDOR_EDIT');
    if (vendor && vendor._id) {
      this.selectedVendor = vendor;
      this.showUpdate = true;
      this.defaultRole = vendor.vendorRole;
      this.selectedOutletsList = vendor.outletList;
      this.selectedAddressList = vendor.addressList;
      this.form.patchValue({
        vendorName: vendor.vendorName,
        vendorPhoneNo: vendor.vendorPhoneNo,
        vendorEmail: vendor.vendorEmail,
        vendorRole: vendor.vendorRole,
        address: vendor.address,
        geolocation: vendor.geolocation,
        accessType: vendor.isOutletAccess ? 'outlet' : 'daily_bulk',
        vendorId: vendor.vendorFirmDetails ? vendor.vendorFirmDetails.vendorFirmId : "",
      });
      this.vendorId = vendor.vendorFirmDetails ? vendor.vendorFirmDetails.vendorFirmId : ""
    }
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

      const formData = this.objectToFormData(finalObj);

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
    }
  }

  addOutlet() {
    this.modalService.open(this.outlet, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  addAddress() {
    this.modalService.open(this.address, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
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
    this.modalService.dismissAll();
  }

  selectAddress(address: any) {
    this.selectedAddress = address;

    this.selectedAddressList = [{
      address1: address.address1,
      address2: address.address2,
      landmark: address.landmark,
      location: address.location,
      geolocation: address.geolocation
    }];

    // } else {
    //   // user unchecked → clear selection
    //   this.selectedAddress = null;
    //   this.selectedAddressList = [];
    // }
  }

  addSelectedAddress() {
    this.modalService.dismissAll();

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
    this.modalService
      .open(this.geolocation, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        windowClass: 'mapModel',
      })
      .result.then(
        (result) => {
          if (result === 'add') {
            this.patchVendorLocation();
          }
        },
        (reason) => {
        }
      );
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
  return (
    this.form.valid &&
    this.selectedOutletsList.length > 0 &&
    this.selectedAddressList.length > 0
  );
}
toggleCheckbox(outlet: any) {
  outlet.isChecked = !outlet.isChecked;
}

toggleCheckboxforPopup(popup: any) {
  popup.isChecked = !popup.isChecked;
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
  }

  getSelectedPopups(){
    this.selectedPopupsList = []
    this.outletByCafeteriaList.forEach((elm: any) => {
      if (elm.isChecked) {
        let outletPresent = false;
        this.selectedPopupsList.forEach((savedOutlet: any) => {
          if (savedOutlet.outletId === elm.outletId) {
            outletPresent = true;
          }
        });
        if (!outletPresent) {
          this.selectedPopupsList.push({
            popupId: elm.outletId,
            popupName: elm.outletName,
            popupType: elm.outletType,
            cafeteriaDetails: elm.cafeteriaDetails,
            organizationDetails: elm.organizationDetails,
          });
        }
      }
    });
    this.dialog.closeAll();
  }

  deletePopup(index: number) {
    this.selectedPopupsList.splice(index, 1);
  }

}

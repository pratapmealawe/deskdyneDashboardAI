import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-organization-add-vendor',
  templateUrl: './organization-add-vendor.component.html',
  styleUrls: ['./organization-add-vendor.component.scss']
})
export class OrganizationAddVendorComponent {
  vendorForm: FormGroup = new FormGroup({
    vendorFirmId: new FormControl(null, [Validators.required]),
    vendorFirmName: new FormControl(null, [Validators.required]),
    vendorFirmEmail: new FormControl(null, [Validators.required]),
    vendorId: new FormControl(null, [Validators.required]),
    vendorName: new FormControl(null, [Validators.required]),
    vendorEmail: new FormControl(null, [Validators.required]),
    vendorPhone: new FormControl(null, [Validators.required]),
    vendorAddress: new FormGroup({
      address1: new FormControl(null, [Validators.required]),
      address2: new FormControl(null),
      landmark: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      geolocation: new FormGroup({
        lat: new FormControl(null, [Validators.required]),
        lng: new FormControl(null, [Validators.required])
      })
    })
  });
  vendorFirmList: any[] = [];
  vendorList: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<OrganizationAddVendorComponent>,
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getVendors();
  }

  getVendors() {
    this.apiMainService.searchVendor(undefined).then((res) => {
      if (res && res.length > 0) {
        const dailyAccessVendors = res.filter((vendor: any) => vendor.isDailyAndBulkAccess === true && vendor?.vendorFirmDetails?.vendorFirmName);
        const firmMap = new Map();
        dailyAccessVendors.forEach((vendor: any) => {
          const firmId = vendor?.vendorFirmDetails?.vendorFirmId;
          if (!firmMap.has(firmId)) {
            firmMap.set(firmId, {
              vendorFirmDetails: vendor.vendorFirmDetails,
              vendorList: []
            });
          }
          firmMap.get(firmId).vendorList.push(vendor);
        });
        this.vendorFirmList = [...firmMap.values()];
        if (this.data?.vendorDetails) {
          this.vendorForm.patchValue(this.data.vendorDetails);
          this.vendorList = this.vendorFirmList.find((firm: any) => firm.vendorFirmDetails.vendorFirmId === this.data.vendorDetails.vendorFirmId)?.vendorList;
        }
      }
    })
  }

  saveChanges() {
    if (this.vendorForm.invalid) {
      this.toaster.error('Please fill all the fields');
      return;
    }
    const payload = {
      organizationId: this.data.organizationId,
      cafeteriaId: this.data.cafeteriaId,
      mainCategory: this.data.mainCategory,
      subCategory: this.data.subCategory,
      vendorDetails: this.vendorForm.getRawValue(),
    }
    // employeeBulk
    if (this.data.selectedBulkMenuPath === "employeebulkmenu") {
      this.apiMainService.updateVendorForEmployeeBulkMenus(payload).then((res) => {
        if (res) {
          this.toaster.success('Vendor assigned successfully to ' + this.data.cafeteriaName);
          this.dialogRef.close({ success: true, data: res });
        }
      }).catch((err) => {
        this.toaster.error('Vendor assign failed');
      });
      // bulkMenu
    } else {
      this.apiMainService.B2B_assignVendorForBulkMenu(payload).then((res) => {
        if (res) {
          this.toaster.success('Vendor assigned successfully to ' + this.data.cafeteriaName);
          this.dialogRef.close({ success: true, data: res });
        }
      }).catch((err) => {
        this.toaster.error('Vendor assign failed');
      });
    }
  }

  onVendorFirmChange(event: any) {
    this.apiMainService.getVendorFirmById(event.value).then((res) => {
      if (res) {
        this.vendorForm.get('vendorFirmId')?.setValue(res._id);
        this.vendorForm.get('vendorFirmName')?.setValue(res.vendorFirmName);
        this.vendorForm.get('vendorFirmEmail')?.setValue(res.vendorFirmEmail);
        this.vendorList = this.vendorFirmList.find((firm: any) => firm.vendorFirmDetails.vendorFirmId === event.value)?.vendorList;
      }
    })
  }

  onVendorChange(event: any) {
    const vendor = this.vendorList.find((vendor: any) => vendor._id === event.value);
    this.vendorForm.get('vendorId')?.setValue(vendor._id);
    this.vendorForm.get('vendorName')?.setValue(vendor.vendorName);
    this.vendorForm.get('vendorEmail')?.setValue(vendor.vendorEmail);
    this.vendorForm.get('vendorPhone')?.setValue(vendor.vendorPhoneNo);
    this.vendorForm.get('vendorAddress.address1')?.setValue(vendor.addressList[0].address1);
    this.vendorForm.get('vendorAddress.address2')?.setValue(vendor.addressList[0].address2);
    this.vendorForm.get('vendorAddress.landmark')?.setValue(vendor.addressList[0].landmark);
    this.vendorForm.get('vendorAddress.location')?.setValue(vendor.addressList[0].location);
    this.vendorForm.get('vendorAddress.geolocation.lat')?.setValue(vendor.addressList[0].geolocation.lat);
    this.vendorForm.get('vendorAddress.geolocation.lng')?.setValue(vendor.addressList[0].geolocation.lng);
  }

  closeModal() {
    this.vendorForm.reset();
    this.dialogRef.close();
  }
}

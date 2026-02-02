import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/service/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-add-vendor-daily-order-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './add-vendor-daily-order-menu.component.html',
  styleUrls: ['./add-vendor-daily-order-menu.component.scss']
})
export class AddVendorDailyOrderMenuComponent implements OnInit {
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
    private dialogRef: MatDialogRef<AddVendorDailyOrderMenuComponent>,
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
        console.log(res);
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
      this.vendorForm.markAllAsTouched();
      return;
    }
    const payload = {
      organization_name: this.data.organization_name,
      organizationId: this.data.organizationId,
      cafeteriaId: this.data.cafeteriaId,
      cafeteriaName: this.data.cafeteriaName,
      vendorDetails: this.vendorForm.getRawValue(),
    }
    this.apiMainService.addVendorDetails(payload).then((res) => {
      this.toaster.success('Vendor saved successfully');
      this.dialogRef.close();
    }).catch((err) => {
      this.toaster.error('Vendor saved failed');
    })
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
    this.vendorForm.get('vendorAddress.address1')?.setValue(vendor.address.address1);
    this.vendorForm.get('vendorAddress.address2')?.setValue(vendor.address.address2);
    this.vendorForm.get('vendorAddress.landmark')?.setValue(vendor.address.landmark);
    this.vendorForm.get('vendorAddress.location')?.setValue(vendor.address.location);
    this.vendorForm.get('vendorAddress.geolocation.lat')?.setValue(vendor.geolocation.lat);
    this.vendorForm.get('vendorAddress.geolocation.lng')?.setValue(vendor.geolocation.lng);
  }

  closeModal() {
    this.dialogRef.close();
  }
}

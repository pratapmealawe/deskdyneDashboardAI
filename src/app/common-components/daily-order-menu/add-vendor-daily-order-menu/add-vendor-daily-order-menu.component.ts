import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/toaster/toaster.service';
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
      address2: new FormControl(null, [Validators.required]),
      landmark: new FormControl(null),
      location: new FormControl(null),
      geolocation: new FormControl(null)
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
        const dailyAccessVendors = res.filter((vendor: any) => vendor.isDailyAndBulkAccess === false);
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
        console.log(this.vendorFirmList);
      }
    })
  }

  saveChanges() {
    if (this.vendorForm.invalid) {
      this.toaster.error('Please fill all the fields');
      return;
    }
    const payload = {
      organization_name: this.data.organization_name,
      organizationId: this.data.organizationId,
      cafeteriaId: this.data.cafeteriaId,
      cafeteriaName: this.data.cafeteriaName,
      vendorDetails: this.vendorForm.getRawValue(),
    }
    this.apiMainService.saveVendor(payload).then((res) => {
      this.toaster.success('Vendor saved successfully');
      this.dialogRef.close();
    }).catch((err) => {
      this.toaster.error('Vendor saved failed');
    })
  }

onVendorFirmChange(event: any) {
  // set vendorFirmId, vendorFirmName, vendorFirmEmail in vendorForm
  this.vendorForm.get('vendorFirmId')?.setValue(event.value);
  this.vendorForm.get('vendorFirmName')?.setValue(event.value);
  this.vendorForm.get('vendorFirmEmail')?.setValue(event.value);

  this.vendorList = this.vendorFirmList.find((firm: any) => firm.vendorFirmId === event.value)?.vendorList;
}

onVendorChange(event: any) {
  this.vendorForm.get('vendorId')?.setValue(event.value);
}

  closeModal() {
    this.dialogRef.close();
  }
}

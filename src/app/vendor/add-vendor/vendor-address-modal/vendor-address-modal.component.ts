import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-address-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './vendor-address-modal.component.html',
  styleUrls: ['./vendor-address-modal.component.scss']
})
export class VendorAddressModalComponent {
  addressList: any[] = [];
  selectedAddress: any = null;

  constructor(
    public dialogRef: MatDialogRef<VendorAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.addressList) {
      this.addressList = data.addressList;
    }
  }

  selectAddress(address: any) {
    this.selectedAddress = address;
  }

  confirmSelection() {
    if (this.selectedAddress) {
      this.dialogRef.close({
        address1: this.selectedAddress.address1,
        address2: this.selectedAddress.address2,
        landmark: this.selectedAddress.landmark,
        location: this.selectedAddress.location,
        geolocation: this.selectedAddress.geolocation
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

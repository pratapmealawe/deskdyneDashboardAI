import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SetGeolocationComponent } from 'src/app/common-components/set-geolocation/set-geolocation.component';

@Component({
  selector: 'app-vendor-firm-add-address',
  templateUrl: './vendor-firm-add-address.component.html',
  styleUrls: ['./vendor-firm-add-address.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SetGeolocationComponent
  ]
})
export class VendorFirmAddAddressComponent implements OnInit {
  addressForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<VendorFirmAddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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

  ngOnInit(): void {
    if (this.data && this.data.address) {
      this.isEdit = true;
      this.addressForm.patchValue(this.data.address);
    }
  }

  toggleMap() {
    const dialogRef = this.dialog.open(SetGeolocationComponent, {
      width: '900px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      autoFocus: false,
      data: {
        selectedCenter: this.addressForm.get('geolocation')?.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const geoGroup = this.addressForm.get('geolocation') as FormGroup;
        geoGroup.patchValue({
          lat: result.latlng.lat,
          lng: result.latlng.lng,
        });
      }
    });
  }

  submitAddress() {
    if (this.addressForm.valid) {
      this.dialogRef.close(this.addressForm.value);
    }
  }

  hasSubError(controlName: string, error: string) {
    const c = this.addressForm.get(controlName);
    return c?.hasError(error) && (c.touched || c.dirty);
  }
}

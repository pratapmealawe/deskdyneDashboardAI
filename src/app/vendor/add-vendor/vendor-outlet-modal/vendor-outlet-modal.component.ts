import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-outlet-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './vendor-outlet-modal.component.html',
  styleUrls: ['./vendor-outlet-modal.component.scss']
})
export class VendorOutletModalComponent {
  outlets: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<VendorOutletModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.outlets) {
      this.outlets = JSON.parse(JSON.stringify(data.outlets));
    }
  }

  toggleCheckbox(outlet: any) {
    outlet.isChecked = !outlet.isChecked;
  }

  confirmSelection() {
    const selected = this.outlets.filter(o => o.isChecked).map(elm => ({
      outletId: elm.outletId,
      outletName: elm.outletName,
      outletType: elm.outletType,
      outletOpened: elm.outletOpened,
      cafeteriaDetails: elm.cafeteriaDetails,
      organizationDetails: elm.organizationDetails,
    }));
    this.dialogRef.close(selected);
  }

  close() {
    this.dialogRef.close();
  }
}

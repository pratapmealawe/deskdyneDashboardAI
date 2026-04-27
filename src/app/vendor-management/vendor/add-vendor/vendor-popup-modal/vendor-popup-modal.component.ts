import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-popup-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './vendor-popup-modal.component.html',
  styleUrls: ['./vendor-popup-modal.component.scss']
})
export class VendorPopupModalComponent {
  popups: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<VendorPopupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.popups) {
      this.popups = JSON.parse(JSON.stringify(data.popups));
    }
  }

  toggleCheckbox(popup: any) {
    popup.isChecked = !popup.isChecked;
  }

  isAnySelected(): boolean {
    return this.popups.some(p => p.isChecked);
  }

  confirmSelection() {
    const selected = this.popups.filter(p => p.isChecked).map(elm => ({
      popupId: elm.popupId,
      popupName: elm.popupName,
      popupType: elm.popupType,
      cafeteriaDetails: elm.cafeteriaDetails,
      organizationDetails: elm.organizationDetails,
    }));
    this.dialogRef.close(selected);
  }

  close() {
    this.dialogRef.close();
  }
}

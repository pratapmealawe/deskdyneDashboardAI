import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface OrgDashboardFilterData {
  cafeList: any[];
  selectedCafeteriaId: string;
}

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-org-dashboard-filter-dialog',
  templateUrl: './org-dashboard-filter-dialog.component.html',
  styleUrls: ['./org-dashboard-filter-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class OrgDashboardFilterDialogComponent {
  selectedCafeteriaId = '';

  constructor(
    public dialogRef: MatDialogRef<OrgDashboardFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrgDashboardFilterData
  ) {
    this.selectedCafeteriaId = data.selectedCafeteriaId || '';
  }

  get activeCount(): number {
    return this.selectedCafeteriaId ? 1 : 0;
  }

  clearAll() {
    this.selectedCafeteriaId = '';
  }

  apply() {
    this.dialogRef.close({
      cafeteriaId: this.selectedCafeteriaId
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}

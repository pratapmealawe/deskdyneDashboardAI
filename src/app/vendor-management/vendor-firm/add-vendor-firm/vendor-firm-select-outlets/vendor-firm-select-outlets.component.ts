import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-vendor-firm-select-outlets',
  templateUrl: './vendor-firm-select-outlets.component.html',
  styleUrls: ['./vendor-firm-select-outlets.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class VendorFirmSelectOutletsComponent implements OnInit {
  orgList: any[] = [];
  cafeterialist: any[] = [];
  outletByCafeteriaList: any[] = [];
  orgName = '';
  showModalOutletList = false;

  constructor(
    private apiMainService: ApiMainService,
    public dialogRef: MatDialogRef<VendorFirmSelectOutletsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data && this.data.orgList) {
      this.orgList = this.data.orgList;
    }
  }

  ngOnInit(): void {}

  getOrgName(org: MatSelectChange) {
    this.orgName = org.value;
    const cafes = this.orgList.find((o: any) => o.organization_name === this.orgName);
    this.cafeterialist = cafes?.cafeteriaList ?? [];
    this.showModalOutletList = false;
    this.outletByCafeteriaList = [];
  }

  async selectCafeteria(event: MatSelectChange) {
    const value = event.value;
    const cafeteriaName = value.cafeteria_name;
    const cafeteriaCity = value.cafeteria_city;
    const organizationName = this.orgName;

    try {
      this.outletByCafeteriaList = await this.apiMainService.getOutletByCafeteria(
        cafeteriaName,
        cafeteriaCity,
        organizationName
      );
      this.showModalOutletList = true;
    } catch (error) {
      console.error('Error fetching outlets:', error);
    }
  }

  toggleCheckbox(outlet: any): void {
    outlet.isChecked = !outlet.isChecked;
  }

  getSelectedOutlets() {
    const selected = this.outletByCafeteriaList.filter(o => o.isChecked);
    this.dialogRef.close(selected);
  }
}

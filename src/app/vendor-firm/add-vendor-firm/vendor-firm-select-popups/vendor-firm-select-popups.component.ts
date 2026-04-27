import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-vendor-firm-select-popups',
  templateUrl: './vendor-firm-select-popups.component.html',
  styleUrls: ['./vendor-firm-select-popups.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class VendorFirmSelectPopupsComponent implements OnInit {
  orgList: any[] = [];
  cafeterialist: any[] = [];
  eventsByOrganization: any[] = [];
  orgName = '';
  selectedOrgId = '';
  selectedCafeteriaId = '';
  showModalOutletListforPopup = false;

  constructor(
    private apiMainService: ApiMainService,
    public dialogRef: MatDialogRef<VendorFirmSelectPopupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data && this.data.orgList) {
      this.orgList = this.data.orgList;
    }
  }

  ngOnInit(): void {}

  getOrgName(org: MatSelectChange) {
    this.orgName = org.value;
    const orgData = this.orgList.find((o: any) => o.organization_name === this.orgName);
    this.selectedOrgId = orgData?._id;
    this.cafeterialist = orgData?.cafeteriaList ?? [];
    this.showModalOutletListforPopup = false;
    this.eventsByOrganization = [];
  }

  async selectCafeteriaForPopup(event: MatSelectChange) {
    const cafeteria = event.value;
    this.selectedCafeteriaId = cafeteria.cafeteria_id;

    try {
      if (!this.selectedOrgId || !this.selectedCafeteriaId) return;

      const events = await this.apiMainService.getEventPopupsByOrgId(this.selectedOrgId);
      this.eventsByOrganization = events.filter((event: any) =>
        event?.cafeteriaDetails?.cafeteria_id === this.selectedCafeteriaId
      );
      this.showModalOutletListforPopup = true;
    } catch (error) {
      console.error('Error fetching popups:', error);
    }
  }

  toggleCheckboxforPopup(event: any): void {
    event.isChecked = !event.isChecked;
  }

  get isAnyPopupSelected(): boolean {
    return this.eventsByOrganization?.some((event: any) => event.isChecked);
  }

  getSelectedPopups() {
    const selected = this.eventsByOrganization.filter(e => e.isChecked);
    this.dialogRef.close(selected);
  }
}

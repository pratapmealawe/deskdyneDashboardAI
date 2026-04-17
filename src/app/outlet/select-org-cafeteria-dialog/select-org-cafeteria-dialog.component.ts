import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { DataFormatService } from 'src/service/data-format.service';

@Component({
  selector: 'app-select-org-cafeteria-dialog',
  templateUrl: './select-org-cafeteria-dialog.component.html',
  styleUrls: ['./select-org-cafeteria-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule]
})
export class SelectOrgCafeteriaDialogComponent implements OnInit {
  orgSearchText: string = '';
  formattedOrgList: any[] = [];
  selectedOrgCafeteria: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<SelectOrgCafeteriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiMainService: ApiMainService,
    private dataFormatService: DataFormatService
  ) {
    if (data && data.selectedOrgCafeteria) {
      this.selectedOrgCafeteria = data.selectedOrgCafeteria;
    }
  }

  async ngOnInit() {
    await this.getOrgList();
  }

  async getOrgList(): Promise<void> {
    try {
      const orgList = await this.apiMainService.getOrgList();
      if (orgList && orgList.length > 0) {
        this.formattedOrgList = this.dataFormatService.getformattedOrgList(orgList);
      }
    } catch (error) {
      console.error('Error fetching org list:', error);
    }
  }

  get filteredOrgList() {
    if (!this.orgSearchText) {
      return this.formattedOrgList;
    }
    const search = this.orgSearchText.toLowerCase();
    return this.formattedOrgList.filter(org =>
      org.key.toLowerCase().includes(search)
    );
  }

  selectOrg(org: any) {
    this.selectedOrgCafeteria = org.key;
  }

  onAdd() {
    const selected = this.formattedOrgList.find(
      (org: any) => org.key === this.selectedOrgCafeteria
    );
    this.dialogRef.close(selected);
  }

  onCancel() {
    this.dialogRef.close();
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { SearchFilterService } from '@service/search-filter.service';
import { VendorComplianceComponent } from 'src/app/vendor-firm/add-vendor-firm/vendor-firm-compliance/vendor-compliance.component';

interface data {
  orgId: string;
  countOnly: number;
}
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-org-vendor-info',
  templateUrl: './org-vendor-info.component.html',
  styleUrls: ['./org-vendor-info.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class OrgVendorInfoComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  orgDetails: any;
  vendorList: any[] = [];
  page: number = 1;
  vendorData: data = {
    orgId: '',
    countOnly: 0,
  };
  // pagination
  pageSize = 10;
  pageIndex = 0;
  paginatedVendorList: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setInitials();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitials();
    }
  }

  setInitials() {
    this.orgDetails = this.adminOrg ? this.adminOrg : this.localStorageService.getCacheData('ADMIN_PROFILE')?.orgDetails;
    this.getVendorByOrgId();
  }

  async getVendorByOrgId() {
    this.vendorData.orgId = this.orgDetails?._id;
    try {
      const data = await this.apiMainService.searchVendorFirmByOrgId(this.vendorData);
      if (!data) return;
      this.vendorList = data;
      const startIndex = this.pageIndex * this.pageSize;
      this.paginatedVendorList = this.vendorList.slice(startIndex, startIndex + this.pageSize);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  }

  openCompliance(event: any, vendor: any) {
    event.stopPropagation();
    this.localStorageService.setCacheData('ORG_VENDOR_INFO', vendor);

    this.matDialog.open(VendorComplianceComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '80vh',
      autoFocus: false,
      data: vendor,
    });
  }

  onKeyEvent(event: any) {
    if (event.key === 'Escape') {
      (event.target as HTMLInputElement).value = '';
      this.paginatedVendorList = [...this.vendorList];
    }

    if (event.key === 'Enter') {
      this.searchFilter(event);
    }
  }

  searchFilter(e: any) {
    const searchText = e.target.value;

    const config = {
      keys: [
        'vendorFirmName',
        'vendorFirmEmail',
        'vendorFirmPhoneNo',
        'outletList.outletName',
        'outletList.cafeteriaDetails.cafeteria_name',
        'poc_details.poc_name',
      ],
    };

    this.paginatedVendorList = this.searchService.searchData(
      this.vendorList,
      config,
      searchText
    );
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedVendorList = this.vendorList.slice(startIndex, startIndex + this.pageSize);
  }
}

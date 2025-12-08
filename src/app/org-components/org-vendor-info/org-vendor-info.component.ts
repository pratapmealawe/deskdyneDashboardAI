import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface data {
  orgId: string;
  countOnly: number;
}
@Component({
  selector: 'app-org-vendor-info',
  templateUrl: './org-vendor-info.component.html',
  styleUrls: ['./org-vendor-info.component.scss'],
})
export class OrgVendorInfoComponent implements OnInit, OnChanges {
  @Input() adminOrg: any
  @ViewChild('complianceModal') compliance: any;
  orgDetails: any;
  vendorList: any[] = [];
  page: number = 1;
  vendorData: data = {
    orgId: '',
    countOnly: 0,
  };
  selectedVendor: any;
  // pagination
  pageSize = 10;
  pageIndex = 0;
  paginatedVendorList: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
    public modalService: NgbModal,
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
      const data = await this.apiMainService.searchVendorByOrgId(this.vendorData);
      if (!data) return;
      this.vendorList = data;
      const startIndex = this.pageIndex * this.pageSize;
      this.paginatedVendorList = this.vendorList.slice(startIndex, startIndex + this.pageSize);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  }

  addComplience(event: any, vendorData: any) {
    event.stopPropagation();
    this.localStorageService.setCacheData('ORG_VENDOR_INFO', vendorData);
    this.selectedVendor = vendorData;

    const dialogRef = this.matDialog.open(this.compliance, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '80vh',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => { });
  }

  onKeyEvent(event: any) {
    if (event.key === "Escape") {
      (event.target as HTMLInputElement).value = '';
      this.paginatedVendorList = [...this.vendorList];
    }

    if (event.key === "Enter") {
      this.searchFilter(event);
    }
  }

  searchFilter(e: any) {
    const searchText = e.target.value;

    const config = {
      keys: [
        'vendorName',
        'outletList.outletName',
        'outletList.cafeteriaDetails.cafeteria_name',
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

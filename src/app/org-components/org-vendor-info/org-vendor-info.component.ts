import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
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
  expandedItems: boolean[] = [];
  filteredVendorList: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.initFunc()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.initFunc()
    }
  }

  initFunc() {
    this.orgDetails = this.adminOrg ? this.adminOrg : this.localStorageService.getCacheData('ADMIN_PROFILE')?.orgDetails;
    this.getVendorByOrgId();
  }

  async getVendorByOrgId() {
    this.vendorData.orgId = this.orgDetails?._id;
    try {
      const data = await this.apiMainService.searchVendorByOrgId(this.vendorData);
      console.log(data);

      this.vendorList = data;
      this.filteredVendorList = data.length === 0 ? [] : data;
      this.expandedItems = new Array(this.vendorList.length).fill(true);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  }

  addComplience(event: any, vendorData: any) {
    event.stopPropagation();
    this.localStorageService.setCacheData('ORG_VENDOR_INFO',vendorData);
    this.selectedVendor = vendorData;
    this.modalService.open(this.compliance, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  toggleVendor(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
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

    this.filteredVendorList = this.searchService.searchData(
      this.vendorList,
      config,
      searchText
    );
  }
}

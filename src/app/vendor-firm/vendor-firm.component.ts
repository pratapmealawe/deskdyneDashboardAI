import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { ConfirmationModalService } from '../../service/confirmation-modal.service';

@Component({
  selector: 'app-vendor-firm',
  templateUrl: './vendor-firm.component.html',
  styleUrls: ['./vendor-firm.component.scss']
})
export class VendorFirmComponent {
  searchObj: any = {
    vendorName: '',
    vendorPhoneNo: '',
    vendorEmail: '',
  };
  vendorList: any;
  orgName: any;
  vendorFirmInfo: any;
  showSearchSection = true;
  vendorInfo: any;
  searchControl = new FormControl('');
  pageSize: number = 10;
  pageIndex: number = 0;
  pagedVendorFirm: any[] = [];
  filteredList: any[] = [];

  organizationList: string[] = [];
  selectedOrgs: string[] = [];
  tempSelectedOrgs: string[] = [];

  @ViewChild('filterDialog') filterDialog!: TemplateRef<any>;

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private confirmationModalService: ConfirmationModalService,
    private searchService: SearchFilterService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllVendors()
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilter();
    })
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
      this.extractOrganizations();
      this.applyFilter();
    } catch (error) {
      console.log('getAllVendor', error);
    }
  }

  extractOrganizations() {
    const orgs = new Set<string>();
    if (this.vendorList) {
      this.vendorList.forEach((vendor: any) => {
        if (vendor.outletList) {
          vendor.outletList.forEach((outlet: any) => {
            if (outlet.organizationDetails?.organization_name) {
              orgs.add(outlet.organizationDetails.organization_name);
            }
          });
        }
      });
    }
    this.organizationList = Array.from(orgs).sort();
  }

  openFilterDialog() {
    this.tempSelectedOrgs = [...this.selectedOrgs];
    this.dialog.open(this.filterDialog, {
      width: '520px',
      panelClass: 'filter-dialog-panel',
      autoFocus: false,
    });
  }

  toggleOrgSelection(org: string) {
    const index = this.tempSelectedOrgs.indexOf(org);
    if (index >= 0) {
      this.tempSelectedOrgs.splice(index, 1);
    } else {
      this.tempSelectedOrgs.push(org);
    }
  }

  isOrgSelected(org: string): boolean {
    return this.tempSelectedOrgs.includes(org);
  }

  applyFilterFromDialog() {
    this.selectedOrgs = [...this.tempSelectedOrgs];
    this.dialog.closeAll();
    this.applyFilter();
  }

  removeOrg(org: string) {
    this.selectedOrgs = this.selectedOrgs.filter(o => o !== org);
    this.applyFilter();
  }

  clearOrgFilter() {
    this.selectedOrgs = [];
    this.applyFilter();
  }

  applyFilter() {
    let filtered = this.vendorList || [];

    // Filter by Search Text
    const searchText = this.searchControl.value;
    if (searchText) {
      const config = { keys: ['vendorFirmName'] };
      filtered = this.searchService.searchData(filtered, config, searchText);
    }

    // Filter by Organization (Multiple)
    if (this.selectedOrgs.length > 0) {
      filtered = filtered.filter((vendor: any) => {
        if (!vendor.outletList) return false;
        return vendor.outletList.some((outlet: any) =>
          this.selectedOrgs.includes(outlet.organizationDetails?.organization_name)
        );
      });
    }

    this.filteredList = [...filtered];
    this.pageIndex = 0;
    this.updateCard();
  }

  editVendor(vendor: any) {
    this.localStorageService.setCacheData('VENDOR_FIRM_EDIT', vendor);
    this.showSearchSection = false;
    this.vendorInfo = vendor;
  }

  async deleteVendorFirm() {
    try {
      let id = this.vendorFirmInfo._id;
      const deleted = await this.apiMainService.deleteVendorFirm(id);
      this.getAllVendors();
    } catch (error) {
      console.log('deleteVendor', error);
    }
  }

  showPopup(vendorFirm: any) {
    this.vendorFirmInfo = vendorFirm;
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to delete this firm?',
      callback: this.deleteVendorFirm,
      context: this,
      data: vendorFirm._id
    });
  }


  resetForm() {
    this.localStorageService.setCacheData('VENDOR_FIRM_EDIT', {});
  }

  addVendor() {
    this.resetForm()
    this.router.navigate(['/app/addVendorFirm']);
  }


  toggleShowOrder(val: any) {
    this.showSearchSection = val;
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateCard();
  }

  updateCard() {
    if (!this.filteredList) return;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedVendorFirm = this.filteredList.slice(start, end);

  }
}

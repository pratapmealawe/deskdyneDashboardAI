import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { LocalStorageService } from '@service/local-storage.service';
import { SearchFilterService } from '@service/search-filter.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { MaterialModule } from '../material.module';
import { AddVendorFirmComponent } from './add-vendor-firm/add-vendor-firm.component';
import { VendorFirmCardComponent } from './vendor-firm-card/vendor-firm-card.component';

@Component({
  selector: 'app-vendor-firm',
  templateUrl: './vendor-firm.component.html',
  styleUrls: ['./vendor-firm.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    VendorFirmCardComponent,
    RouterModule
  ]
})
export class VendorFirmComponent {
  vendorList: any;
  vendorFirmInfo: any;
  isListingView = true;
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
    this.checkRoute();

    // Subscribe to router events to toggle view
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });

    this.getAllVendors()
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilter();
    })
  }

  checkRoute() {
    const baseUrl = this.router.url.split('?')[0].split('#')[0];
    const urlParts = baseUrl.split('/').filter(p => p);
    // /app/vendor-firm is 2 parts
    this.isListingView = urlParts.length === 2 && urlParts[1] === 'vendor-firm';
  }

  async getAllVendors() {
    try {
      this.vendorList = await this.apiMainService.getAllVendorFirms();
      this.extractOrganizations();
      this.applyFilter();
    } catch (error) {
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
  }

  editVendor(vendor: any) {
    if (vendor) {
      this.router.navigate(['/app/vendor-firm', vendor._id]);
    }
  }

  async deleteVendorFirm() {
    try {
      let id = this.vendorFirmInfo._id;
      const deleted = await this.apiMainService.deleteVendorFirm(id);
      this.getAllVendors();
    } catch (error) {
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

  addVendor() {
    const dialogRef = this.dialog.open(AddVendorFirmComponent, {
      width: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllVendors();
      }
    });
  }
}

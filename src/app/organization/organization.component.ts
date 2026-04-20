import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { OrganizationCardComponent } from './organization-card/organization-card.component';
import { ManageOrganizationComponent } from './manage-organization/manage-organization.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletedOrganizationListingComponent } from './deleted-organization-listing/deleted-organization-listing.component';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    CommonModule,
    OrganizationCardComponent,
    ManageOrganizationComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 5;
  orgList: any = [];
  showSearchSection: boolean = true;
  showSearchFilter: boolean = true;
  selectedOrg: any = {};
  searchControl = new FormControl('');
  originalOrgList: any = [];

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.searchOrg();
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      this.applyLocalFilter(value);
    })
  }

  applyLocalFilter(value: any) {
    if (!value) {
      this.orgList = [...this.originalOrgList];
      return;
    }
    const lower = value.toLowerCase();
    this.orgList = this.originalOrgList.filter((d: any) =>
      d.organization_name?.toLowerCase().includes(lower)
    );
  }

  async searchOrg(searchValue?: any) {
    try {
      const safeSearchValue = searchValue || {};
      const safePoc = safeSearchValue.poc_details || {};
      const searchObj: any = {
        organization_name: searchValue || '',
        location: safeSearchValue.location || '',
        poc_details: {
          poc_name: safePoc.poc_name || '',
          poc_phoneNo: safePoc.poc_phoneNo || '',
          poc_email: safePoc.poc_email || '',
          poc_location: safePoc.poc_location || ''
        }
      };
      const orgList = await this.apiMainService.fetchFilteredAllOrgs(searchObj);
      if (orgList && orgList.length > 0) {
        this.orgList = orgList;
        this.originalOrgList = orgList;
      } else {
        this.orgList = [];
        this.originalOrgList = [];
      }
    } catch (error) {
    }
  }

  viewOrg(org: any) {
    this.selectedOrg = org;
    this.showSearchSection = false;
  }

  toggleShowOrder(val: any) {
    this.showSearchSection = true;
    this.selectedOrg = {};
  }

  paginationConfig(config: any) {
    this.pageIndex = config.pageIndex;
    this.pageSize = config.pageSize;
  }

  addOrg() {
    this.router.navigate(['/app/add-organization'])
  }

  openDeletedOrganizationListing() {
    this.dialog.open(DeletedOrganizationListingComponent, {
      width: '850px',
      maxHeight: '85vh',
      panelClass: 'deleted-orgs-dialog-container'
    });
  }

  onSoftDelete(org: any) {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete "${org.organization_name}"? This can be restored later from the Deleted list.`,
      callback: async () => {
        try {
          await this.apiMainService.deleteOrganization(org._id, 'soft');
          this.searchOrg();
        } catch (error) {
          console.error('Error deleting organization:', error);
        }
      },
      context: this
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { MaterialModule } from '../material.module';
import { DeletedOrganizationListingComponent } from './deleted-organization-listing/deleted-organization-listing.component';
import { OrganizationCardComponent } from './organization-card/organization-card.component';
import { OrganizationSharedService } from './organization-shared.service';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    CommonModule,
    OrganizationCardComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    DirectivesModule
  ],
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 5;
  orgList: any = [];
  searchControl = new FormControl('');
  originalOrgList: any = [];
  isListingView: boolean = true;

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService,
    private dialog: MatDialog,
    private orgSharedService: OrganizationSharedService
  ) { }

  ngOnInit() {
    this.checkRoute();
    
    // Subscribe to router events to toggle view
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });

    this.searchOrg();
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      this.applyLocalFilter(value);
    });
  }

  checkRoute() {
    // Get the base URL without query parameters or fragments
    const baseUrl = this.router.url.split('?')[0].split('#')[0];
    const urlParts = baseUrl.split('/').filter(p => p);
    
    // Expected parts for /app/organization is 2
    this.isListingView = urlParts.length === 2 && urlParts[1] === 'organization';
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
    this.orgSharedService.setOrganization(org);
    this.router.navigate(['/app/organization', org._id]);
  }

  paginationConfig(config: any) {
    this.pageIndex = config.pageIndex;
    this.pageSize = config.pageSize;
  }

  addOrg() {
    this.router.navigate(['/app/add-organization']);
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

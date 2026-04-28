import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PermissionsService } from '@service/permission.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { MaterialModule } from 'src/app/material.module';
import { CustomerComponent } from 'src/app/customer/customer.component';
import { BillingModule } from 'src/app/billing/billing.module';
import { RouterModule, NavigationEnd } from '@angular/router';
import { OrganizationSharedService } from '../organization/organization-shared.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    MaterialModule,
    RouterModule,

    // Modules
    BillingModule
  ]
})
export class DashboardComponent implements OnInit {

  orglist: any = [];
  orgSelected: any = null;
  isOrgSelected: boolean = false;
  isLoading: boolean = false;

  selectedIndex: number = 0;
  allTabs = [
    { index: 0, name: 'Dashboard', icon: 'dashboard', policyKey: 'Dashboard', path: 'main' },
    { index: 1, name: 'Admin Orders', icon: 'receipt_long', policyKey: 'dashBoardAdminOrder', path: 'admin-orders' },
    { index: 2, name: 'Menu Items', icon: 'menu_book', policyKey: 'menuItems', path: 'menu-items' },
    { index: 3, name: 'Orders', icon: 'shopping_cart', policyKey: 'Orders', path: 'orders' },
    { index: 4, name: 'Reviews', icon: 'rate_review', policyKey: 'Reviews', path: 'reviews' },
    { index: 5, name: 'Users', icon: 'people', policyKey: 'User', path: 'users' },
    { index: 6, name: 'Vendor Info', icon: 'store', policyKey: 'vendorInfo', path: 'vendor-info' },
    { index: 7, name: 'Menu Counters', icon: 'countertops', policyKey: 'menuCounters', path: 'menu-counters' },
    { index: 8, name: 'Audit Reports', icon: 'assessment', policyKey: 'auditReports', path: 'audit-reports' },
    { index: 9, name: 'Employee Poll', icon: 'poll', policyKey: 'empPoll', path: 'emp-poll' }
  ];

  tabs: any[] = [];
  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private permissionsService: PermissionsService,
    private organizationSharedService: OrganizationSharedService
  ) {
  }

  ngOnInit() {
    this.tabs = this.permissionsService.filterTabsByPolicy(this.allTabs);
    this.getorganizations();

    // Sync selectedIndex with route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSelectedIndex();
    });
    this.updateSelectedIndex();
  }

  updateSelectedIndex() {
    const url = this.router.url;
    const currentPath = url.split('/').pop();
    const tab = this.tabs.find(t => t.path === currentPath);
    if (tab) {
      this.selectedIndex = tab.index;
    }
  }

  onTabChange(index: number) {
    this.selectedIndex = index;
    const tab = this.allTabs.find(t => t.index === index);
    if (tab) {
      this.router.navigate(['/app/dashboard', tab.path]);
    }
  }

  changeOrganization(e: any) {
    const id = e.value
    this.orgSelected = this.orglist.find((item: any) => item._id === id);
    this.isOrgSelected = true;
    this.organizationSharedService.setOrganization(this.orgSelected);
    
    if (this.tabs.length > 0) {
      // If we are already on a dashboard path, stay there, otherwise go to first tab
      const url = this.router.url;
      if (!url.includes('/dashboard/')) {
        this.selectedIndex = this.tabs[0].index;
        this.router.navigate(['/app/dashboard', this.tabs[0].path]);
      }
    }
  }


  async getorganizations() {
    try {
      this.isLoading = true;
      this.orglist = [];
      let page = 1;
      let searchObj = {
        countOnly: false
      }
      let result = await this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
      this.orglist = result;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }
}


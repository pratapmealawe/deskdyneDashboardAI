import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PermissionsService } from '@service/permission.service';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { OrganizationSharedService } from '../organization-shared.service';
import { Subscription, filter } from 'rxjs';


@Component({
  selector: 'app-manage-organization',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.scss'],
})
export class ManageOrganizationComponent implements OnInit {
  organization: any;
  @ViewChild('mainTabsContainer') mainTabsContainer!: ElementRef;
  isDown = false;
  startX = 0;
  scrollLeft = 0;
  selectedMainTabIndex = 0;
  btnPolicy: any;
  private routeSub: Subscription | undefined;
  orgViewList = [
    { name: 'Org Details', path: 'details', policyKey: 'orgDetails', icon: 'business' },
    { name: 'Compliance', path: 'compliance', policyKey: 'compliance', icon: 'verified_user' },
    { name: 'Bulk Menu', path: 'bulk-menu', policyKey: 'bulkMenu', icon: 'restaurant_menu' },
    { name: 'Virtual Cafeteria', path: 'virtual-cafeteria', policyKey: 'virtualCafeteria', icon: 'storefront' },
    { name: 'Admin Daily Order', path: 'admin-daily-order', policyKey: 'adminDailyOrder', icon: 'fact_check' },
    { name: 'Employee Listing', path: 'employees', policyKey: 'employeeList', icon: 'people' },
    { name: 'Consumption Menu', path: 'consumption-order', policyKey: 'consumptionMenu', icon: 'receipt_long' },
    { name: 'Outlet Employee Listing', path: 'outlet-employees', policyKey: 'outletEmployee', icon: 'badge' },
    { name: 'Company Wallet', path: 'company-wallet', policyKey: 'companyWallet', icon: 'account_balance_wallet' },
  ];

  constructor(
    private permissionsService: PermissionsService,
    private route: ActivatedRoute,
    private router: Router,
    private orgSharedService: OrganizationSharedService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.btnPolicy = this.permissionsService.getCurrentButtonPolicy();
    this.orgViewList = this.permissionsService.filterTabsByPolicy(this.orgViewList);
    
    // Subscribe to route parameters to get organization ID
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadOrganization(id);
      }
    });

    this.checkChildRoute();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkChildRoute();
    });
  }

  async loadOrganization(id: string) {
    // Check if organization is already in shared state
    const currentOrg = this.orgSharedService.getOrganization();
    if (currentOrg && currentOrg._id === id) {
      this.organization = currentOrg;
    } else {
      // Fetch from API if not present or different
      this.organization = await this.orgSharedService.refreshOrganization(id);
    }
  }

  checkChildRoute() {
    const baseUrl = this.router.url.split('?')[0].split('#')[0];
    const urlParts = baseUrl.split('/').filter(p => p);
    // /app/organization/:id/:tab
    if (urlParts.length >= 4) {
      const tabPath = urlParts[3];
      const activeIndex = this.orgViewList.findIndex(tab => tab.path === tabPath);
      if (activeIndex !== -1) {
        this.selectedMainTabIndex = activeIndex;
      }
    } else {
      this.selectedMainTabIndex = 0;
    }
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  goBack(): void {
    this.router.navigate(['/app/organization']);
  }

  onMainTabChange(index: number): void {
    this.selectedMainTabIndex = index;
    const tab = this.orgViewList[index];
    this.router.navigate([tab.path], { relativeTo: this.route });
  }

  get selectedMain(): any {
    return this.orgViewList[this.selectedMainTabIndex];
  }

  get selectedMainPath(): string | undefined {
    return this.orgViewList[this.selectedMainTabIndex]?.path;
  }

  onMouseDown(e: MouseEvent): void {
    this.isDown = true;
    this.startX = e.pageX - this.mainTabsContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.mainTabsContainer.nativeElement.scrollLeft;
  }

  onMouseLeave(): void {
    this.isDown = false;
  }

  onMouseUp(): void {
    this.isDown = false;
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.mainTabsContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2; // scroll-fast
    this.mainTabsContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }



}


import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PermissionsService } from '@service/permission.service';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrganizationSharedService } from '../organization-shared.service';
import { Subscription } from 'rxjs';


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
    { name: 'Org Details', path: 'details', policyKey: 'orgDetails' },
    { name: 'Compliance', path: 'compliance', policyKey: 'compliance' },
    { name: 'Bulk Menu', path: 'bulk-menu', policyKey: 'bulkMenu' },
    { name: 'Virtual Cafeteria', path: 'virtual-cafeteria', policyKey: 'virtualCafeteria' },
    { name: 'Admin Daily Order', path: 'admin-daily-order', policyKey: 'adminDailyOrder' },
    { name: 'Employee Listing', path: 'employees', policyKey: 'employeeList' },
    { name: 'Consumption Menu', path: 'consumption-order', policyKey: 'consumptionMenu' },
    { name: 'Outlet Employee Listing', path: 'outlet-employees', policyKey: 'outletEmployee' },
    { name: 'Company Wallet', path: 'company-wallet', policyKey: 'companyWallet' },
    // { name: 'QR Employee', path: 'qr-employees', policyKey: 'qrEmployee' },
    // { name: 'Guest Employee Listing', path: 'guest-employees', policyKey: 'guestEmployeeList' },
  ];

  constructor(
    private permissionsService: PermissionsService,
    private route: ActivatedRoute,
    private router: Router,
    private orgSharedService: OrganizationSharedService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.permissionsService.getCurrentButtonPolicy();
    this.orgViewList = this.permissionsService.filterTabsByPolicy(this.orgViewList);
    
    // Subscribe to route parameters to get organization ID
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadOrganization(id);
      }
    });

    // Update selected tab index based on current URL
    this.updateSelectedTabFromUrl();
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

  updateSelectedTabFromUrl() {
    const url = this.router.url;
    const activeIndex = this.orgViewList.findIndex(tab => url.includes(tab.path));
    if (activeIndex !== -1) {
      this.selectedMainTabIndex = activeIndex;
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

  getTabIcon(path: string): string {

    const icons: { [key: string]: string } = {
      'details': 'business',
      'compliance': 'verified_user',
      'bulk-menu': 'restaurant_menu',
      'virtual-cafeteria': 'storefront',
      'consumption-order': 'receipt_long',
      'outlet-employees': 'badge',
      'wallet': 'account_balance_wallet',
      'qr-employees': 'qr_code',
      'admin-daily-order': 'fact_check',
      'employees': 'people',
      'guest-employees': 'person_add_alt'
    };
    return icons[path] || 'article';
  }

}


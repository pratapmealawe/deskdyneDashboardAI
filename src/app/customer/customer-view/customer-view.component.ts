import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PermissionsService } from '@service/permission.service';
import { MaterialModule } from 'src/app/material.module';
import { CustomerSharedService } from '../customer-shared.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  providers: [CustomerSharedService]
})
export class CustomerViewComponent implements OnInit, OnChanges {
  userDetails: any
  @ViewChild('mainTabsContainer') mainTabsContainer!: ElementRef;
  private routeSub: any;
  isDown = false;
  startX = 0;
  scrollLeft = 0;

  userViewList = [
    { name: 'Details', path: 'details', policyKey: 'customerDetails', icon: 'person' },
    { name: 'Orders', path: 'orders', policyKey: 'customerOrders', icon: 'shopping_bag' },
    { name: 'Wallet', path: 'wallet', policyKey: 'customerWallet', icon: 'account_balance_wallet' },
    { name: 'Company Wallet', path: 'company-wallet', policyKey: 'customerCompanyWallet', icon: 'corporate_fare' },
    { name: 'Review', path: 'review', policyKey: 'customerReview', icon: 'rate_review' },
    { name: 'Feedback', path: 'feedback', policyKey: 'customerFeedback', icon: 'feedback' }
  ];
  selectedTab = 'details';
  selectedTabIndex: number = 0;


  constructor(
    private permissionsService: PermissionsService,
    private customerSharedService: CustomerSharedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.customerSharedService.userDetails$.subscribe(details => {
      this.userDetails = details;
    });

    // Extract ID from route
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadCustomer(id);
      }
    });

    this.userViewList = this.userViewList.filter(tab => {
      if (!tab.policyKey) return true;
      return this.permissionsService.hasPermission(tab.policyKey);
    });

    this.updateSelectedTab();
  }

  async loadCustomer(id: string) {
    // Check if customer is already in shared state
    const currentCustomer = this.customerSharedService.getUserDetails();
    if (currentCustomer && (currentCustomer._id === id || currentCustomer.customer?._id === id)) {
      this.userDetails = currentCustomer;
    } else {
      // Fetch from API if not present or different
      this.userDetails = await this.customerSharedService.refreshCustomerById(id);
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  updateSelectedTab() {
    const url = this.router.url;
    const currentTab = url.split('/').pop() || 'details';
    const index = this.userViewList.findIndex(t => t.path === currentTab);
    this.selectedTabIndex = index >= 0 ? index : 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 
    if (this.selectedTab) {
      const foundIndex = this.userViewList.findIndex(x => x.path === this.selectedTab);
      this.selectedTabIndex = foundIndex >= 0 ? foundIndex : 0;
      if (this.selectedTabIndex === 0 && this.userViewList.length > 0) {
        this.selectedTab = this.userViewList[0].path;
      }
    }
  }

  gotToTab(tab: string) {
    this.selectedTab = tab;
  }

  onTabChange(event: any) {
    const selectTab = this.userViewList[event.index];
    this.gotToTab(selectTab.path);
  }

  onMainTabChange(index: number) {
    const userId = this.userDetails?.customer?._id || this.userDetails?._id;
    if (!userId || userId === 'undefined') return;

    this.selectedTabIndex = index;
    const tab = this.userViewList[index].path;
    this.router.navigate(['/app/customer', userId, tab]);
  }


  backBtn() {
    this.router.navigate(['/app/customer']);
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

  getInitials(name: string | undefined): string {
    if (!name) return '?';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

}


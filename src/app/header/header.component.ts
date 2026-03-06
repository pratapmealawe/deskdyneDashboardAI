import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { routeMapper } from 'src/config/route.mapping.config';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SuggestionsFeedbackService } from 'src/service/suggestions-feedback.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: any;
  adminProfile: any = {};
  imageUrl = environment.imageUrl;
  isOrgAdmin: boolean = false;
  orgDetails: any = {};

  // Count observables from service
  unAcknowledgedFeedbackCount$ = this.suggestionsFeedbackService.GeneralAppFeedbackCount$;
  enquiryCount$ = this.suggestionsFeedbackService.enquiryCount$;
  inReviewIncidentsCount$ = this.suggestionsFeedbackService.incidentCount$;

  finalNavOption: any = [];

  deskDineOptions: any = [
    {
      name: 'Dashboard',
      showParent: true,
      route: 'mainDashboard',
      image: 'Dashbaord_white',
      imageblue: 'Dashbaord_blue',
    },
    {
      name: 'Org Dashboard',
      showParent: true,
      route: 'dashboard',
      image: 'Dashbaord_white_1',
      imageblue: 'Organization_dashbaord_blue',
    },
    {
      name: 'Orders Dashboard',
      showParent: true,
      route: 'allOrders',
      image: 'Billing_white',
      imageblue: 'Billing_blue',
    },
    {
      name: 'Organization',
      showParent: true,
      image: 'Organization_white',
      imageblue: 'Organization_Blue',
      route: 'b2bSearchOrg',
    },
    {
      name: 'Outlet',
      showParent: true,
      image: 'Outlet_white',
      imageblue: 'Outlet_blue',
      children: [
        { name: 'Search Outlet', route: 'outlet', showChild: true },
        {
          name: 'Outlet Master Menu',
          route: 'outletMasterMenu',
          showChild: true
        }
      ],
    },
    {
      name: 'Event Popup',
      showParent: true,
      image: 'Outlet_white',
      imageblue: 'Outlet_blue',
      children: [
        { name: 'Search Event Popup', route: 'eventPopup', showChild: true },
        { name: 'Add Event Popup', route: 'addEventPopup', showChild: true, clearRunTimeStorage: ['OUTLET_EDIT'] },
      ],
    },

    {
      name: 'Vendor Firm',
      showParent: true,
      image: 'Vendor firm_white',
      imageblue: 'Vendor firm_blue',
      route: 'searchVendorFirm',
    },
    {
      name: 'Vendor',
      showParent: true,
      image: 'Vendor_white',
      imageblue: 'Vendor_blue',
      route: 'searchVendor',
    },
    {
      name: 'Outlet Orders',
      showParent: true,
      image: 'Outlet orders_white',
      imageblue: 'Outlet orders_blue',
      children: [
        {
          name: 'Outlet Current Order',
          route: 'currentOrder',
          showChild: true,
        },
        { name: 'Outlet Search Order', route: 'searchOrder', showChild: true },
        { name: 'Outlet Export Order', route: 'outletExcelExport', showChild: true },
      ],
    },
    {
      name: 'Other Orders',
      showParent: true,
      image: 'Other orders_white',
      imageblue: 'Other orders_blue',
      children: [
        {
          name: 'Current Order',
          route: 'otherOrder',
          showChild: true,
        },
        { name: 'Search Order', route: 'searchOrder', showChild: true },
      ],
    },
    {
      name: 'Notifications',
      showParent: true,
      route: 'scheduledNotifications',
      image: 'Enquiries_white',
      imageblue: 'Enquiries_blue',
    },
    {
      name: 'Vendor Wallet Dashboard',
      showParent: true,
      route: 'vendorWalletDashboard',
      image: 'Users_white',
      imageblue: 'Users_blue',
    },
    {
      name: 'Vendor Payout',
      showParent: true,
      route: 'vendorPayout',
      image: 'Users_white',
      imageblue: 'Users_blue',
    },
    {
      name: 'Users',
      showParent: true,
      route: 'customer',
      image: 'Users_white',
      imageblue: 'Users_blue',
    },
    {
      name: 'Billing',
      showParent: true,
      route: 'billing',
      image: 'Billing_white',
      imageblue: 'Billing_blue',
    },

    {
      name: 'Food Items',
      showParent: true,
      route: 'foodItem',
      image: 'Food items_white',
      imageblue: 'Food items_blue',
    }
    ,
    {
      name: 'Incident Reporting',
      showParent: true,
      showBadge: true,
      count: this.inReviewIncidentsCount$,
      route: 'orgIncidentManagement',
      image: 'Incident reporting_white',
      imageblue: 'Incident reporting_blue',
    },
    {
      name: 'Audit Report',
      showParent: true,
      route: 'auditReport',
      image: 'Incident reporting_white',
      imageblue: 'Incident reporting_blue',
    },

    {
      name: 'CheckList',
      showParent: true,
      image: 'Checklist_white',
      imageblue: 'Checklist_blue',
      children: [
        {
          name: 'View Checklist',
          route: 'viewChecklistQuestion',
          showChild: true,
        },
        {
          name: 'Submit CheckList',
          route: 'submitChecklist',
          showChild: true,
        },
        {
          name: 'Checklist History',
          route: 'checklistHistory',
          showChild: true,
        },
      ],
    },
    {
      name: 'Reviews',
      route: 'orgReviews',
      image: 'Reviews_white',
      imageblue: 'Reviews_blue',
    },
    {
      name: 'Feedback',
      showBadge: true,
      count: this.unAcknowledgedFeedbackCount$,
      route: 'appFeedbacks',
      image: 'Feedback_white',
      imageblue: 'Feedback_blue',
    },
    {
      name: 'Excel Export',
      showParent: true,
      route: 'excelExport',
      image: 'Excel reports_white',
      imageblue: 'Excel reports_blue',
    },
    {
      name: 'Enquiries',
      showBadge: true,
      count: this.enquiryCount$,
      route: 'viewEnquiries',
      image: 'Enquiries_white',
      imageblue: 'Enquiries_blue',
    },

    {
      name: 'Policy',
      showParent: true,
      image: 'Policy_white',
      imageblue: 'Policy_blue',
      children: [
        { name: 'Policy', route: 'policy', showChild: true },
        { name: 'Add Policy', route: 'addPolicy', showChild: true },
      ],
    },
    {
      name: 'Admin',
      showParent: true,
      image: 'Admin_white',
      imageblue: 'Admin_blue',
      children: [
        { name: 'Admin', route: 'admin', showChild: true },
        { name: 'Add Admin', route: 'addAdmin', showChild: true },
      ],
    },

    {
      name: 'Miscelleneous',
      showParent: true,
      image: 'Misc_white',
      imageblue: 'Misc_blue',
      children: [
        { name: 'FAQ', route: 'faq', showChild: true },
        { name: 'Config Images', route: 'configImages', showChild: true },
        { name: 'Config Group Images', route: 'configImagesGroup', showChild: true },
        { name: 'Config Variables', route: 'configVariable', showChild: true },
        {
          name: 'App Version Control',
          route: 'appVersionControl',
          showChild: true,
        },
        { name: 'Server Logs', route: 'serverlogs', showChild: true },
      ],
    },
  ];

  orgOptions: any = [
    {
      name: 'Dashboard',
      showParent: true,
      route: 'orgDashboard',
      image: 'Dashbaord_white',
      imageblue: 'Dashbaord_blue',
    },
    {
      name: 'Consumption Orders',
      showParent: true,
      route: 'consumptionOrders',
      image: 'Users_white',
      imageblue: 'Users_blue',
    },
    {
      name: 'Menu Items',
      showParent: true,
      route: 'orgMenuItems',
      image: 'Food items_white',
      imageblue: 'Food items_blue',
    },
    // {
    //   name: 'Orders',
    //   showParent: true,
    //   route: 'orgOrders',
    //   image: 'Orders_white',
    //   imageblue: 'Orders_blue',
    // },
    {
      name: 'Orders',
      showParent: true,
      route: 'outletExcelExport',
      image: 'Other orders_white',
      imageblue: 'Other orders_blue',
    },
    // {
    //   name: 'Pre Orders',
    //   showParent: true,
    //   route: 'orgPreOrders',
    //   image: 'Pre_order_white',
    //   imageblue: 'Pre_Order_blue',
    // },
    // {
    //   name: 'Subscription',
    //   showParent: true,
    //   route: 'orgSubcription',
    //   image: 'Subscription_white',
    //   imageblue: 'Subscription_blue',
    // },
    {
      name: 'Reviews',
      showParent: true,
      route: 'orgReviews',
      image: 'Reviews_white',
      imageblue: 'Reviews_blue',
    },
    {
      name: 'Users',
      showParent: true,
      route: 'customer',
      image: 'Users_white',
      imageblue: 'Users_blue',
    },
    // {
    //   name: 'Reports',
    //   showParent: true,
    //   route: 'orgReports',
    //   image: 'Reports_white',
    //   imageblue: 'Reports_blue',
    // },
    {
      name: 'Vendor Info',
      showParent: true,
      route: 'orgVendorInfo',
      image: 'Vendor_white',
      imageblue: 'Vendor_blue',
    },
    {
      name: 'Menu Counters',
      showParent: true,
      route: 'orgMenuCounters',
      image: 'Food items_white',
      imageblue: 'Food items_blue',
    },
    {
      name: 'Audit Report',
      showParent: true,
      route: 'auditReport',
      image: 'Incident reporting_white',
      imageblue: 'Incident reporting_blue',
    },
    {
      name: 'Incident Management',
      showParent: true,
      route: 'orgIncidentManagement',
      image: 'Incident reporting_white',
      imageblue: 'Incident reporting_blue',
    },
    {
      name: 'Checklist',
      showParent: true,
      route: 'orgChecklist',
      image: 'Checklist_white',
      imageblue: 'Checklist_blue',
    },
    // {
    //   name: 'Employee List',
    //   showParent: true,
    //   route: 'orgEmployeeList',
    //   image: 'Enquiry',
    //   imageblue: 'Enquiries_Blue',
    // },
    {
      name: 'Bulk Order History',
      showParent: true,
      route: 'orgBulkOrderHistory',
      image: 'Other orders_white',
      imageblue: 'Other orders_blue',
    },
    // {
    //   name: 'Manual Orders',
    //   showParent: true,
    //   route: 'orgManualOrders',
    //   image: 'Manual_Orders_white',
    //   imageblue: 'Manual_orders_blue',
    // },
    {
      name: 'Billing',
      showParent: true,
      route: 'billing',
      image: 'Billing_white',
      imageblue: 'Billing_Blue',
    },
  ];

  breadCrumbText: any = 'home';
  currentRoute: string = 'currentOrder';
  policyArr: any;
  routeMapper: any = routeMapper;
  routePolicies: any;
  selectedIndex: number = 0; // Default selected index
  childSelectedIndex = -1;
  openChildSectionIndex = -1;
  selectedIndexpar: number = 0;
  selectedIndexchild: number = 0;
  orgLogo!: any

  constructor(
    private router: Router,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService,
    private offcanvasService: NgbOffcanvas,
    private suggestionsFeedbackService: SuggestionsFeedbackService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.breadCrumbText = event.url;
        const url = event.url.replace('/', '');
        this.setBreadcrumb(url);
        this.setActiveStateFromRoute(event.url);
        // alert(event.url);
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit(): void {
    this.getAdminProfile();
    this.setActiveStateFromRoute(this.router.url);
  }



  setActiveStateFromRoute(url: string): void {
    this.selectedIndex = -1;
    this.openChildSectionIndex = -1;
    this.childSelectedIndex = -1;

    const currentPath = url.split('?')[0];

    for (let i = 0; i < this.finalNavOption.length; i++) {
      const nav = this.finalNavOption[i];

      if (nav.children && nav.children.length > 0) {
        for (let j = 0; j < nav.children.length; j++) {
          const child = nav.children[j];
          if (child.route && currentPath.includes(child.route)) {
            this.openChildSectionIndex = i;
            this.childSelectedIndex = j;
            return;
          }
        }
      }
      else if (nav.route && currentPath.includes(nav.route)) {
        this.selectedIndex = i;
        return;
      }
    }
  }

  selectLink(nav: any, index: number): void {
    if (nav.children && nav.children.length > 0) {
      if (this.openChildSectionIndex === index) {
        this.openChildSectionIndex = -1;
      } else {
        this.openChildSectionIndex = index;
      }
    } else {
      this.selectedIndex = index;
      this.openChildSectionIndex = -1;
      this.closeSidebar();
      this.router.navigate([nav.route]);
    }
  }

  selectChildLink(route: any, parentIndex: number, childIndex: number) {
    this.router.navigate([route]);
    this.openChildSectionIndex = parentIndex;
    this.childSelectedIndex = childIndex;
    this.selectedIndex = -1;

    let testObj = this.finalNavOption[parentIndex].children[childIndex]
    if (testObj.clearRunTimeStorage) {
      this.clearRunTimeStorage(testObj.clearRunTimeStorage)
    }
    this.closeSidebar();
  }

  clearRunTimeStorage(clearArr: any) {
    clearArr.forEach((item: any) => {
      this.runtimeStorageService.resetCacheData(item)
    })
  }

  closeSidebar() {
    this.offcanvasService.dismiss();
  }

  setBreadcrumb(child: any) {
    let parent = '';
    parent = this.routeMapper[child];
    this.breadCrumbText = parent;
  }

  openEnd() {
    this.offcanvasService.open(this.content, { position: 'start' });
  }

  async getAdminProfile() {
    const adminId = this.localStorageService.getCacheData('ADMIN_ID');
    try {
      const adminProfile = await this.apiMainService.getadminprofile(adminId);
      if (adminProfile && adminProfile._id) {
        this.adminProfile = adminProfile;
        if (this.adminProfile.role == 'ORGADMIN' || this.adminProfile.role == 'HYPERPURE_ADMIN' || this.adminProfile.role == 'HYPERPURE_POC') {
          this.isOrgAdmin = true;
          // this.orgLogo = this.adminProfile.orgDetails.organizationLogoUrl;
          this.orgDetails = JSON.parse(
            JSON.stringify(this.adminProfile.orgDetails)
          );

          this.finalNavOption = this.orgOptions;
          // this.router.navigate(['/org-dashboard']);
        } else {
          this.finalNavOption = this.deskDineOptions;
          this.isOrgAdmin = false;
        }
        this.getAllPolicy();

        // this.localStorageService.setCacheData('ADMIN_PROFILE', adminProfile);
      } else {
        this.logout();
      }
    } catch (error) {
      console.log('error while logging out ', error);
    }
  }

  async logout() {
    try {
      await this.apiMainService.logout();
      this.localStorageService.resetAllCacheData();
      this.runtimeStorageService.resetAllCacheData();

      this.currentRoute === "/guest" ? this.router.navigate(['/guest']) : this.router.navigate(['/login']);
    } catch (error) {
      console.log('error while logging out ', error);
    }
  }

  async getAllPolicy() {
    try {
      const policyArr: any = await this.apiMainService.getAllPolicy();


      if (policyArr && policyArr.length > 0) {
        this.localStorageService.setCacheData('POLICIES', policyArr);
        this.policyArr = policyArr;
        const adminPolicy = this.policyArr.filter(
          (el: any) => el.policy_name === this.adminProfile.policy_name
        );

        if (adminPolicy && adminPolicy.length > 0) {
          this.adminProfile.policy = adminPolicy;
          const routePolicies = this.adminProfile.policy[0].route_policies;

          this.finalNavOption.forEach((el: any) => {
            el.showParent = routePolicies[el.route] ? true : false;

            if (el.children) {
              el.children?.forEach((childEl: any) => {
                if (routePolicies && routePolicies[childEl.route]) {
                  childEl.showChild = true;
                  el.showParent = true;
                } else {
                  childEl.showChild = false;
                }
              });
            }
          });
        }
        this.localStorageService.setCacheData(
          'ADMIN_PROFILE',
          this.adminProfile
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  getInitials(name: string): string {
    if (!name) return '';

    let parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0).toUpperCase() +
      parts[1].charAt(0).toUpperCase()
    );
  }

  getAvatarColor(name: string): string {
    if (name) {
      const colors = ['#192754', '#FF6B6B', '#17C964', '#FFB020', '#9333EA'];
      let index = name.length % colors.length;
      return colors[index];
    } else {
      return '#192754'
    }
  }

  ngOnDestroy(): void {
    // this.pollingSub.unsubscribe()
  }

}

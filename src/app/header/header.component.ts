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
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { SuggestionsFeedbackService } from 'src/service/suggestions-feedback.service';
import { UtilityService } from 'src/service/utility.service';

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
  unAcknowledgedFeedbackCount$: Observable<number> = this.suggestionsFeedbackService.GeneralAppFeedbackCount$;
  enquiryCount$: Observable<number> = this.suggestionsFeedbackService.enquiryCount$;
  inReviewIncidentsCount$: any = new BehaviorSubject<number>(0);

  finalNavOption: any = [];

  deskDineOptions: any = [
    {
      name: 'Dashboard',
      showParent: true,
      route: 'mainDashboard',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Org Dashboard',
      showParent: true,
      route: 'dashboard',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Organization',
      showParent: true,
      image: 'Company_Dashboard',
      imageblue: 'Company_Dashbaord_Blue',
      children: [
        {
          name: 'Search Organization',
          route: 'b2bSearchOrg',
          showChild: true,
        },
        { name: 'Add Organization', route: 'b2bAddorg', showChild: true },
      ],
    },
    {
      name: 'Outlet',
      showParent: true,
      image: 'Outlet',
      imageblue: 'Outlets_Blue',
      children: [
        { name: 'Outlet Overview', route: 'outlet', showChild: true },
        { name: 'Outlet Add', route: 'addOutlet', showChild: true },
        {
          name: 'Outlet Master Menu',
          route: 'outletMasterMenu',
          showChild: true
        }
      ],
    },
    {
      name: 'vendor Firm',
      showParent: true,
      image: 'Vendor_Info_white',
      imageblue: 'Vendor_Info_blue',
      children: [
        {
          name: 'Search vendor Firm',
          route: 'searchVendorFirm',
          showChild: true,
        },
        { name: 'Add Vendor Firm', route: 'addVendorFirm', showChild: true },
      ],
    },
    {
      name: 'Vendor',
      showParent: true,
      image: 'Vendor_Info_white',
      imageblue: 'Vendor_Info_blue',
      children: [
        {
          name: 'Search vendor',
          route: 'searchVendor',
          showChild: true,
        },
        { name: 'Add Vendor', route: 'addVendor', showChild: true },
      ],
    },
    {
      name: 'Outlet Orders',
      showParent: true,
      image: 'B2BOrders',
      imageblue: 'B2BOrders_Blue',
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
      image: 'B2BOrders',
      imageblue: 'B2BOrders_Blue',
      children: [
        {
          name: 'Current Order',
          route: 'otherOrder',
          showChild: true,
        },
        { name: 'Search Order', route: 'searchOrder', showChild: true },
        { name: 'Export Order', route: 'outletExcelExport', showChild: true },
      ],
    },
    {
      name: 'Users',
      showParent: true,
      route: 'customer',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
    },
    {
      name: 'Billing',
      showParent: true,
      route: 'billing',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
    },
    {
      name: 'Food Items',
      showParent: true,
      route: 'foodItem',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
    }
    ,
    {
      name: 'Incident Reporting',
      showParent: true,
      showBadge: true,
      count: this.inReviewIncidentsCount$,
      route: 'orgIncidentManagement',
      image: 'Incident_Reporting',
      imageblue: 'Incident_Reporting_Blue',
    },
    {
      name: 'Submit CheckList',
      route: 'submitChecklist',
      showParent: true,
      image: 'Checklist_white',
      imageblue: 'Checklist_blue',
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
          name: 'Checklist History',
          route: 'checklistHistory',
          showChild: true,
        },
      ],
    },
    {
      name: 'Reviews',
      route: 'orgReviews',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
    },
    {
      name: 'Feedback',
      showBadge: true,
      count: this.unAcknowledgedFeedbackCount$,
      route: 'appFeedbacks',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
    },
    {
      name: 'Excel Export',
      showParent: true,
      route: 'excelExport',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
    },
    {
      name: 'Enquiries',
      showBadge: true,
      count: this.enquiryCount$,
      route: 'viewEnquiries',
      image: 'Enquiry',
      imageblue: 'Enquiries_Blue',
    },

    {
      name: 'Policy',
      showParent: true,
      image: 'Company_Dashboard',
      imageblue: 'Company_Dashbaord_Blue',
      children: [
        { name: 'Policy', route: 'policy', showChild: true },
        { name: 'Add Policy', route: 'addPolicy', showChild: true },
      ],
    },
    {
      name: 'Admin',
      showParent: true,
      image: 'Company_Dashboard',
      imageblue: 'Company_Dashbaord_Blue',
      children: [
        { name: 'Admin', route: 'admin', showChild: true },
        { name: 'Add Admin', route: 'addAdmin', showChild: true },
      ],
    },

    {
      name: 'Miscelleneous',
      showParent: true,
      image: 'Company_Dashboard',
      imageblue: 'Company_Dashbaord_Blue',
      children: [
        { name: 'FAQ', route: 'faq', showChild: true },
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
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Menu Items',
      showParent: true,
      route: 'orgMenuItems',
      image: 'Menu Items_white',
      imageblue: 'Menu Items_blue',
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
      image: 'Orders_white',
      imageblue: 'Orders_blue',
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
      image: 'Vendor_Info_white',
      imageblue: 'Vendor_Info_blue',
    },
    {
      name: 'Menu Counters',
      showParent: true,
      route: 'orgMenuCounters',
      image: 'Order History',
      imageblue: 'Order History_Blue',
    },
    {
      name: 'Incident Management',
      showParent: true,
      route: 'orgIncidentManagement',
      image: 'Incident_Reporting',
      imageblue: 'Incident_Reporting_Blue',
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
      image: 'Bulk_history_white',
      imageblue: 'Bulk_history_blue',
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
  pollingSub!: Subscription;

  constructor(
    private router: Router,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService,
    private utilityService: UtilityService,
    private offcanvasService: NgbOffcanvas,
    private suggestionsFeedbackService: SuggestionsFeedbackService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        console.log(event.url);

        this.currentRoute = event.url;
        this.breadCrumbText = event.url;
        const url = event.url.replace('/', '');
        this.setBreadcrumb(url);
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
    this.suggestionsFeedbackService.getGeneralAppFeebackCount(false);
    this.suggestionsFeedbackService.fetchAllEnquiries();
    this.getInReviewIncidents();

    // this.pollingSub = interval(30_000).subscribe(() => {
    //   this.getInReviewIncidents();
    // });
  }

  async getInReviewIncidents() {
    try {
      const data = await this.apiMainService.getAllIncidents();

      if (data && data.length > 0) {
        const inReviewIncidents = data.filter((incident: any) => incident.status === "created").length;
        this.inReviewIncidentsCount$.next(inReviewIncidents);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
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
    this.closeSidebar();
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

      console.log(adminProfile);

      if (adminProfile && adminProfile._id) {
        this.adminProfile = adminProfile;
        if (this.adminProfile.role == 'ORGADMIN') {
          this.isOrgAdmin = true;
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

  ngOnDestroy(): void {
    // this.pollingSub.unsubscribe()
  }

}

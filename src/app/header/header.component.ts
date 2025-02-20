import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { routeMapper } from 'src/config/route.mapping.config';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('content') content: any;
  adminProfile: any = {};
  imageUrl = environment.imageUrl;
  isOrgAdmin: boolean = false;
  orgDetails: any = {};

  finalNavOption: any = [];

  deskDineOptions: any = [
    {
      name: 'Outlet',
      showParent: true,
      image: 'Outlet',
      imageblue: 'Outlets_Blue',
      children: [
        { name: 'Outlet Overview', route: 'outlet', showChild: true },
        { name: 'Outlet Add', route: 'outlet/add-outlet', showChild: true },
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
          route: 'vendor/search-vendor',
          showChild: true,
        },
        { name: 'Add Vendor', route: 'vendor/add-vendor', showChild: true },
      ],
    },
    {
      name: 'Orders',
      showParent: true,
      image: 'B2BOrders',
      imageblue: 'B2BOrders_Blue',
      children: [
        { name: 'Outlet Current Order', route: 'currentOrder', showChild: true },
        { name: 'Outlet Search Order', route: 'searchOrder', showChild: true },
        { name: 'Current Order', route: 'current_order', showChild: true},
        { name: 'Past Order', route: 'past_order', showChild: true}
      ],
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
        { name: 'Add Admin', route: 'add-admin', showChild: true },
      ],
    },
    {
      name: 'Organization',
      showParent: true,
      image: 'Company_Dashboard',
      imageblue: 'Company_Dashbaord_Blue',
      children: [
        {
          name: 'Search Organization',
          route: 'B2B_search_org',
          showChild: true,
        },
        { name: 'Add Organization', route: 'B2B_add_org', showChild: true },
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
    {
      name: 'CheckList',
      showParent: true,
      image: 'Checklist_white',
      imageblue: 'Checklist_blue',
      children: [
        {
          name: 'View Checklist',
          route: 'view-checklist-question',
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
      name: 'Enquiries',
      showParent: true,
      route: 'dashboard',
      image: 'Enquiry',
      imageblue: 'Enquiries_Blue',
      children: [
        { name: 'View Enquiries', route: 'viewEnquiries', showChild: true },
      ],
    },
    {
      name: 'Feedback',
      showParent: true,
      route: 'dashboard',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
      children: [
        { name: 'View Feedbacks', route: 'org-reviews', showChild: true },
      ],
    },
    {
      name: 'App Feedback',
      showParent: true,
      route: 'dashboard',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
      children: [
        { name: 'View App Feedbacks', route: 'app-feedbacks', showChild: true },
      ],
    },
    {
      name: 'Excel Export',
      showParent: true,
      route: 'excel-export',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
    },
    {
      name: 'Food Items',
      showParent: true,
      route: 'food_item',
      image: 'Feedback',
      imageblue: 'Feedback_Blue',
    },
    {
      name: 'Incident Reporting',
      showParent: true,
      route: 'dashboard',
      image: 'Incident_Reporting',
      imageblue: 'Incident_Reporting_Blue',
    },
  ];

  orgOptions: any = [
    {
      name: 'Dashboard',
      showParent: true,
      route: 'org-dashboard',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Menu Items',
      showParent: true,
      route: 'org-menu-items',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Orders',
      showParent: true,
      route: 'org-orders',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    // {
    //   name: 'Pre Orders',
    //   showParent: true,
    //   route: 'org-pre-orders',
    //   image: 'DDDashboard',
    //   imageblue: 'DDDashboard_Blue',
    // },
    // {
    //   name: 'Subscription',
    //   showParent: true,
    //   route: 'org-subcription',
    //   image: 'DDDashboard',
    //   imageblue: 'DDDashboard_Blue',
    // },
    {
      name: 'Reviews',
      showParent: true,
      route: 'org-reviews',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Reports',
      showParent: true,
      route: 'org-reports',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Vendor Info',
      showParent: true,
      route: 'org-vendor-info',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Menu Counters',
      showParent: true,
      route: 'org-menu-counters',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Incident Management',
      showParent: true,
      route: 'org-incident-management',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Checklist',
      showParent: true,
      route: 'org-checklist',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    {
      name: 'Employee List',
      showParent: true,
      route: 'org-employee-list',
      image: 'DDDashboard',
      imageblue: 'DDDashboard_Blue',
    },
    // { name: 'Bulk Order History', showParent: true, route: 'org-bulk-order-history', image: 'DDDashboard', imageblue: 'DDDashboard_Blue' },
    // { name: 'Manual Orders', showParent: true, route: 'org-manual-orders', image: 'DDDashboard', imageblue: 'DDDashboard_Blue' },
    // { name: 'Billing', showParent: true, route: 'org-billing', image: 'DDDashboard', imageblue: 'DDDashboard_Blue' },
    {
      name: 'Submit CheckList',
      route: 'submit-checklist',
      showParent: true,
      image: 'Checklist_white',
      imageblue: 'Checklist_blue',
    },
  ];

  breadCrumbText: any = 'Home';
  currentRoute: string = 'currentOrder';
  policyArr: any;
  routeMapper: any = routeMapper;
  routePolicies: any;
  selectedIndex: number = 0; // Default selected index
  childSelectedIndex = -1;
  openChildSectionIndex = -1;
  selectedIndexpar: number = 0;
  selectedIndexchild: number = 0;

  constructor(
    private router: Router,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService,
    private utilityService: UtilityService,
    private offcanvasService: NgbOffcanvas
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
      if (adminProfile && adminProfile._id) {
        this.adminProfile = adminProfile;
        if (this.adminProfile.role == 'ORGADMIN') {
          this.isOrgAdmin = true;
          this.orgDetails = JSON.parse(
            JSON.stringify(this.adminProfile.orgDetails)
          );
          this.finalNavOption = this.orgOptions;
          this.router.navigate(['/org-dashboard']);
        } else {
          this.finalNavOption = this.deskDineOptions;
          this.isOrgAdmin = false;
        }
        this.getAllPolicy();

        this.localStorageService.setCacheData('ADMIN_PROFILE', adminProfile);
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
      this.router.navigate(['/login']);
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
            el.children.forEach((childEl: any) => {
              if (routePolicies && routePolicies[childEl.route] == true) {
                childEl.showRoute = true;
                el.showParent = true;
              } else {
                childEl.showRoute = false;
              }
            });
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
}

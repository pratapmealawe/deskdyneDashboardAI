import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
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
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('content') content: any;
  selectedTab = '';
  adminProfile: any = {};
  imageUrl = environment.imageUrl;
  opened = true;
  isOrgAdmin:boolean=false;
  showOld:boolean=false;
  orgDetails:any={};
  navOptions:any = [
    { name: 'Outlet', showParent:true, children: [{ label: 'Outlet Overview', route: 'outlet' },{ label: 'Outlet Add', route: 'outlet/add-outlet' }] },
    { name: 'Vendor', showParent:true, children: [{ label: 'Search vendor', route: 'vendor/search-vendor' }, { label: 'Add Vendor', route: 'vendor/add-vendor' }] },
    { name: 'Orders', showParent:false, children: [{ label: 'Current', route: 'currentOrder' }, { label: "Search", route: 'searchOrder' }] },
    { name: 'Miscelleneous', showParent:true, children: [{ label: 'FAQ', route: 'faq' }, { label: 'Config Variables', route: 'configVariable' }, { label: 'App Version Control', route: 'appVersionControl' }, { label: 'Server Logs', route: 'serverlogs' }] },
    { name: 'Admin', showParent:true, children: [{ label: 'Admin', route: 'admin' }, { label: 'Add Admin', route: 'add-admin' }] },
    { name: 'Policy', showParent:true, children: [{ label: 'Policy', route: 'policy' }, { label: 'Add Policy', route: 'addPolicy' }] },
    // { name: 'Dashboard', route: 'dashboard'}
    // children: [{ label: 'Dashboard', route: 'dashboard' }, { label: 'Search Organization', route: 'B2B_search_org' }, { label: 'Add Organization', route: 'B2B_add_org' }]
  ]

  parentNavOptions:any = [
    { name: 'Dashboard', route: 'orgDashboard',image:'DDDashboard',imageblue:'DDDashboard_Blue'},
    { name: 'Menu Items', route: 'orgmenuitems',image:'FoodItem',imageblue:'FoodItem_Blue'},
    { name: 'Orders', route: 'orgorders',image:'B2BOrders',imageblue:'B2BOrders_Blue'},
    { name: 'Pre Orders', route: 'orgpreorders',image:'Pre_order_white',imageblue:'Pre_Order_blue'},
    { name: 'Subscription', route: 'orgsubscription',image:'Subscription_white',imageblue:'Subscription_blue'},
    { name: 'Reviews', route: 'orgreviews',image:'Reviews_white',imageblue:'Reviews_blue'},
    { name: 'Reports', route: 'orgreports',image:'Reports_white',imageblue:'Reports_blue'},
    { name: 'Vendor Info', route: 'orgvendor',image:'Vendor_Info_white',imageblue:'Vendor_Info_blue'},
    { name: 'Menu Counters', route: 'orgoutlet',image:'Outlet',imageblue:'Outlets_Blue'},
    { name: 'Incident Management', route: 'orgincidentmanagement',image:'Incident_Reporting',imageblue:'Incident_Reporting_Blue'},
    { name: 'CheckList', route: 'orgcheckList',image:'Checklist_white',imageblue:'Checklist_blue'},
    { name: 'Employee List', route: 'orgemployeelist',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Bulk Order History', route: 'orgbulkorderhistory',image:'Bulk_history_white',imageblue:'Bulk_history_blue'},
    { name: 'Billing', route: 'orgbilling',image:'Billing_white',imageblue:'Billing_Blue'},
    { name: 'Manual Orders', route: 'orgmanualorders',image:'Manual_Orders_white',imageblue:'Manual_orders_blue'},
  ];
  DeskdyneOptions:any = [
    { name: 'DeskDyne Dashboard', route: 'dashboard',image:'DDDashboard',imageblue:'DDDashboard_Blue'},
    { name: 'B2B Orders', route: 'orders',image:'B2BOrders',imageblue:'B2BOrders_Blue'},
    { name: 'Company Dashboard', route: 'orders',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Search Organization', route: 'preorders',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Add Organization', route: 'subscription',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Cafeteria Orders', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Food Item', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Billing', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Order History', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Outlets', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Vendors', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Enquiries', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Feedback', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
    { name: 'Incident Reporting', route: 'dashboard',image:'Company_Dashboard',imageblue:'Company_Dashbaord_Blue'},
  ];

  breadCrumbText: any = 'Home';
  currentRoute: string = 'currentOrder';
  policyArr:any;
  routeMapper:any = routeMapper;
  routePolicies:any;
  selectedIndex: number = 0; // Default selected index
  selectedIndexpar: number = 0;
  selectedIndexchild: number = 0;

  constructor(private router: Router, private apiMainService: ApiMainService, private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService, private utilityService: UtilityService, private offcanvasService: NgbOffcanvas) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
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
    })

  }

  ngOnInit(): void {
    this.getAdminProfile();
  }
  

  selectLink(index: number): void {
    this.selectedIndex = index; // Update selected index
  }

  checkRoute() {
    // console.log('checkRoute')
    // const hash = location.hash;
    // let route;
    // this.navOptions.forEach(routeObj => {
    //   if(hash.indexOf(routeObj.route) > -1){
    //     route = routeObj;
    //   }
    // });
    // if(route){
    //   this.selectTab(route);
    // }else{
    //   this.selectTab(this.navOptions[0]);
    // }
  }

  closeSidebar(child: any) {
    console.log(child)
    this.offcanvasService.dismiss()
  }

  setBreadcrumb(child: any) {
    let parent = '';
    parent = this.routeMapper[child];
    this.breadCrumbText = parent;
  }

  selectTab(navObj: any) {
    this.selectedTab = navObj.name;
    // this.router.navigate([navObj.route])
  }

  openEnd() {
    this.offcanvasService.open(this.content, { position: 'start' });
  }
  
    async getAdminProfile(){
    const adminId = this.localStorageService.getCacheData('ADMIN_ID');
    try{
      const adminProfile = await this.apiMainService.getadminprofile(adminId);
      this.getAllPolicy();
      if(adminProfile && adminProfile._id){
        this.adminProfile = adminProfile;
        console.log(this.adminProfile,"this.adminProfile");
        if (this.adminProfile.role=="ORGADMIN"){
          this.isOrgAdmin=true;
          this.orgDetails=JSON.parse(JSON.stringify(this.adminProfile.orgDetails));
          this.router.navigate(['/orgDashboard']);
        }else{
          this.isOrgAdmin=false;
        }
        this.localStorageService.setCacheData('ADMIN_PROFILE',adminProfile);
      }
    }catch(error){
      console.log('error while logging out ', error)
    }
  }
  async logout() {
    try {
      await this.apiMainService.logout();
      this.localStorageService.resetAllCacheData();
      this.runtimeStorageService.resetAllCacheData();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('error while logging out ', error)
    }
  }

  selectchild(num1:number,num: number) {
    console.log(num);
    this.selectedIndexchild = num1+num;
  }
  selectParent(num: number) {
    console.log(num);
    this.selectedIndexpar = num;
  }
  async getAllPolicy() {
    try {
      const policyArr:any = await this.apiMainService.getAllPolicy();
      if (policyArr && policyArr.length > 0) {
        this.localStorageService.setCacheData('POLICIES',policyArr)
        this.policyArr = policyArr;
        const adminPolicy = this.policyArr.filter((el:any)=>el.policy_name === this.adminProfile.policy_name);
        if(adminPolicy && adminPolicy.length>0){
          this.adminProfile.policy = adminPolicy;
          const routePolicies = this.adminProfile.policy[0].route_policies;
          this.navOptions.forEach((el:any)=>{
            el.children.forEach((childEl:any)=>{
              if(routePolicies[childEl.route] == true){
                childEl.showRoute = true;
                el.showParent = true;
              }
              else{
                childEl.showRoute = false;
              }
            })
          })
        }
        this.localStorageService.setCacheData('ADMIN_PROFILE', this.adminProfile);
      }
    } catch (error) {
      console.log(error)
    }
  }

}

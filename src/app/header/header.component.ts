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
  navOptions:any = [
    { name: 'Outlet', showParent:true, children: [{ label: 'Outlet Overview', route: 'outlet' },{ label: 'Outlet Add', route: 'outlet/add-outlet' }] },
    { name: 'Vendor', showParent:true, children: [{ label: 'Search vendor', route: 'vendor/search-vendor' }, { label: 'Add Vendor', route: 'vendor/add-vendor' }] },
    { name: 'Orders', showParent:false, children: [{ label: 'Current', route: 'currentOrder' }, { label: "Search", route: 'searchOrder' }] },
    { name: 'Miscelleneous', showParent:true, children: [{ label: 'FAQ', route: 'faq' }, { label: 'Config Variables', route: 'configVariable' }, { label: 'App Version Control', route: 'appVersionControl' }, { label: 'Server Logs', route: 'vendor/add-vendor' }] },
    { name: 'Admin', showParent:true, children: [{ label: 'Admin', route: 'admin' }, { label: 'Add Admin', route: 'add-admin' }] },
    { name: 'Policy', showParent:true, children: [{ label: 'Policy', route: 'policy' }, { label: 'Add Policy', route: 'addPolicy' }] },
  ]
  breadCrumbText: any = 'Home';
  currentRoute: string = 'currentOrder';
  policyArr:any;
  routeMapper:any = routeMapper;
  routePolicies:any;

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
      if(adminProfile && adminProfile._id){
        this.adminProfile = adminProfile;
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

}

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
    { name: 'Outlet', showParent:true, children: [{ label: 'Outlet Overview', route: 'outlet' }] },
    { name: 'Vendor', showParent:true, children: [{ label: 'Search User', route: 'searchUser' }, { label: 'Coupon User', route: 'couponUser' }] },
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
  
  async logout() {
    // try {
    //   await this.apiMainService.logout();
    //   this.localStorageService.resetAllCacheData();
    //   this.runtimeStorageService.resetAllCacheData();
    //   this.router.navigate(['/login']);
    // } catch (error) {
    //   console.log('error while logging out ', error)
    // }
  }

}

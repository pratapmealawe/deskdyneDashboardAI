import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('content') content:any;
  selectedTab = '';
  adminProfile:any = {};
  imageUrl = environment.imageUrl;
  opened = true;
  navOptions = [
    {name: 'DashBoard', children:[{label:'Dashboard',route:'/dashboard'}]},
    {name: 'Menu',children:[{label:'Food Items', route:'/foodItem'}, {label:'Special Items', route:'specialItem'},{label:"Meal Package", route:'mealPackage'}]},
    {name: 'Kitchen',children:[{label:'Search Kitchen', route:'searchKitchen'}, {label:'Add Kitchen', route:'addKitchen'}, {label:'Kitchen Leads', route:'kitchenLeads'},{label:"Test Notifications", route:'testNotification'}]},
    {name: 'User', children:[{label:'Search User', route:'searchUser'}, {label:'Coupon User', route:'couponUser'}]},    
    {name: 'Orders',children:[{label:'Current', route:'currentOrder'}, {label:'Refund', route:'refundOrder'},{label:"Search", route:'searchOrder'}, {label:"Create Manual", route:'manualOrder'},{label:"Bulk", route:'bulkOrder'},{label:"Meal End Details", route:'mealEndDetail'}]},
    // {name: 'Reward',children:[{label:'Give Reward', route:'giveReward'}, {label:'Reward History', route:'rewardHistory'}]},
    {name: 'Geo Fencing',children:[{label:'Geo Fencing', route:'geofencing'}]},
    {name: 'Miscellaneous',children:[{label:'FAQ', route:'faq'},{label:'Config Variables', route:'configVariables'},{label:'Connfig Images', route:'configImages'},{label:'App Version Control', route:'appVersionControl'},{label:'Coupon', route:'offercoupon'},{label:'Voucher', route:'offervoucher'},{label:'Banner', route:'banner'},{label:'Server Logs', route:'serverlogs'}]},
    {name: 'Admin',children:[{label:'Admin', route:'admin'}]},
    {name: 'Feedback',children:[{label:'App Feedback', route:'appFeedback'}, {label:'Dish Suggestion', route:'dishSuggestion'}]},
    // {name: 'Test User',children:[{label:'Test User', route:'/home/testUser'}]}
  ]
  breadCrumbText: any = 'Dashboard';

  withgstsales:any=23759;
  gstamtsales:any=0;
  fromDate:any;
  highcharts = Highcharts;
  showChart1=true;

  orderData = [
    { date: "2025-01-02", count: 10 },
    { date: "2025-01-03", count: 15 },
    { date: "2025-01-04", count: 8 },
    { date: "2025-01-05", count: 10 },
    { date: "2025-01-06", count: 15 },
    { date: "2025-01-07", count: 8 },
    { date: "2025-01-08", count: 8 },
    // ...
  ];
  chartOptions1: any = {
    chart: {
      type: "column",
      backgroundColor: '#e4e9ef',
    },
    title: {
      text: "Order Count (Last 7 Days)"
    },
    xAxis: {
      categories: [], // Days of the week or dates
      title: {
        text: "Days"
      }
    },
    yAxis: {
      title: {
        text: "Order Count"
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold'
        }
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      { name: 'Orders', data: [] } // Populate this with order counts
    ],
    accessibility: {
      enabled: false // Disable accessibility module
    }
  };

  chartOptions2: any = {
    chart: {
      type: "column",
      backgroundColor: '#e4e9ef',
    },
    title: {
      text: "Order Count (Last 7 Days)"
    },
    xAxis: {
      categories: [], // Days of the week or dates
      title: {
        text: "Days"
      }
    },
    yAxis: {
      title: {
        text: "Order Count"
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold'
        }
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      { name: 'Orders', data: [] } // Populate this with order counts
    ],
    accessibility: {
      enabled: false // Disable accessibility module
    }
  };

  
  constructor(private router: Router, private apiMainService: ApiMainService, private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService, private utilityService: UtilityService, private offcanvasService: NgbOffcanvas){}
  
  ngOnInit(): void {
    // this.getAdminProfile();
    // this.checkRoute();
    // this.utilityService.getCurrentOrdersCount(false)
    // this.mockCredSet();
    // this.router.navigate(['//home/dashboard'])
    // this.lastsevendaysorder();
  }

  // mockCredSet(){
  //   let creds = {allowAdminRouting:false, allowMenuRouting:true}
  //   this.localStorageService.setCacheData('CREDS', creds)
  // }
  
  // checkRoute(){
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
  // }

  // closeSidebar(child:any){
  //   console.log(child)
  //   this.offcanvasService.dismiss()
  // }

  // setBreadcrumb(parent:any, child:any){
  //   this.breadCrumbText = parent.concat(' > '+child)
  // }

  // selectTab(navObj: any){
  //   this.selectedTab = navObj.name;
  //   // this.router.navigate([navObj.route])
  // }


  // openEnd() {
	// 	this.offcanvasService.open(this.content, { position: 'start' });
	// }

  // async logout(){
  //   try{
  //     await this.apiMainService.logout();
  //     this.localStorageService.resetAllCacheData();
  //     this.runtimeStorageService.resetAllCacheData();       
  //     this.router.navigate(['/login']);
  //   }catch(error){
  //     console.log('error while logging out ', error)
  //   }
  // }

  onDateSelect(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    console.log('Selected Date:', selectedDate);
    // Handle the selected date here
  }

}

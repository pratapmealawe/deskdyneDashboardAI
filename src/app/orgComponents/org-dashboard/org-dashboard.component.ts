import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import * as Highcharts from 'highcharts';
import { Router } from "@angular/router";
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.scss']
})
export class OrgDashboardComponent implements OnInit {
  // Accessibility(Highcharts);
  Outletcount = 0;
  vendorCount = 0;
  orglist: any = [];
  isDropdownOpen = false; 
  orgSelected: any = null;
  highcharts = Highcharts;
  showChart1 = false;
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
      type: "column"
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
  vendorList:any=[];
  outletList:any=[];
  orgDetails:any={};

  constructor(private apiMainService: ApiMainService,private localStorageService:LocalStorageService) {
    this.getorganizationCount();
    // this.generateLastSevenDaysChart(this.orderData);
    // this.getVendorsCount();
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.getorganizationCount();
  }
  ngOnInit(){
    console.log("ngOnInit Calling");
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.orgDetails = profile.orgDetails;
    this.selectOption(this.orgDetails._id)
  }



  async getorganizationCount() {
    try {
      this.orglist = [];
      let page = 1;
      let searchObj = {
        countOnly: false
      }
      let result = await this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
      this.orglist = result;
      console.log(this.orglist);
      this.isDropdownOpen = true;
    } catch (error) {
      console.log(error)
    }
  }

  async getVendorsCount() {
    try {
      this.Outletcount = 0;
      let searchObj={
        countOnly:true,
        orgId:this.orgSelected
      }
      let result = await this.apiMainService.searchVendorByOrgId(searchObj);
      this.vendorCount = result.count;
    } catch (error) {
      console.log(error)
    }
  }

  selectOption(org: any) {
    this.showChart1=false;
    this.orgSelected = org;
    console.log(this.orgSelected);
    this.getVendorsCount();
    this.getOutletsCount();
    this.lastsevendaysorder();
    this.getOutletsList();
    this.showVendorList();
    
    
    this.isDropdownOpen = false; // Close the dropdown after selecting
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  async getOutletsCount() {
    try {
      this.Outletcount = 0;
      let searchObj={
        countOnly:true,
        orgId:this.orgSelected
      }
      let result = await this.apiMainService.searchOutletByOrgId(searchObj);
      this.Outletcount = result.count;
    } catch (error) {
      console.log(error)
    }
  }

  async getOutletsList() {
    try {
      let searchObj={
        orgId:this.orgSelected
      }
      let result = await this.apiMainService.searchOutletByOrgId(searchObj);
      console.log(result,"getOutletsList")
      this.outletList=result;
    } catch (error) {
      console.log(error)
    }
  }

  async showVendorList() {
    try {
      let searchObj={
        orgId:this.orgSelected
      }
      let result = await this.apiMainService.searchVendorByOrgId(searchObj);
      console.log(result,"showVendorList");
      this.vendorList=result;
      // this.router.navigate(['/vendor/search-vendor'])
    } catch (error) {
      console.log(error)
    }
  }

  async lastsevendaysorder(){
    try {
      let searchObj={
        orgId:this.orgSelected
      }
      let result = await this.apiMainService.lastsevendaysorderdaywisecount(searchObj);
      console.log(result,"lastsevendaysorderdaywisecount");
       this.generateLastSevenDaysChart(result);
    
    } catch (error) {
      console.log(error)
    }
  }

  generateLastSevenDaysChart(orderData: { date: string, count: number }[]) {
    const lastSevenDays = [];
    const today = new Date();
  
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  
      // Find the matching order count for the date
      const order = orderData.find(o => new Date(o.date).toDateString() === date.toDateString());
      lastSevenDays.push({
        date: formattedDate,
        count: order ? order.count : 0
      });
    }
  
    // Update chart options
    this.chartOptions1.xAxis.categories = lastSevenDays.map(day => day.date);
    this.chartOptions1.series[0].data = lastSevenDays.map(day => day.count);
    this.showChart1=true;
  
    // // Refresh chart (if using a library like Highcharts Angular)
    // Highcharts.chart('container', this.chartOptions1);
  }

}

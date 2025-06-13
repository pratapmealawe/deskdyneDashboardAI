import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';



@Component({
  selector: 'app-org-menu-items',
  templateUrl: './org-menu-items.component.html',
  styleUrls: ['./org-menu-items.component.scss'],
})
export class OrgMenuItemsComponent implements OnInit, OnChanges {
  Highcharts: typeof Highcharts = Highcharts;

  @Input() adminOrg: any

  maxDate: Date = new Date();



  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;

  orgAdmin: any;

  initialData: any[] = [];

  dateGroup!: FormGroup;

  chartOptions!: Highcharts.Options;
  updateOrdersFlag: boolean = false;
  oneToOneOrdersFlag: boolean = true;

  cafeteria_id: any
  cafeList: any[] = []
  orgDetails: any
  outletOrderData: any[] = []

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService
  ) {
    this.dateGroup = new FormGroup({
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {
    this.initFunc()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.initFunc()
    }
  }

  initFunc() {
    this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgDetailsById();
    this.maxDate.setDate(this.maxDate.getDate());
    this.maxDate.setHours(23, 59, 59, 999);
    this.fetchData()
  }

  buildPayload() {
    return {
      startDate: this.dateGroup.value.start,
      endDate: this.dateGroup.value.end,
      orgId: this.orgAdmin.orgDetails._id,
      cafeteria_name: this.cafeList.find(c => c.cafeteria_id === this.cafeteria_id)
        ?.cafeteria_name,
    };
  }

  async getOrgDetailsById() {
    try {
      const res = await this.apiMainService.getOrg(this.orgAdmin?.orgDetails?._id)
      this.orgDetails = res
      if (res?.cafeteriaList.length > 0) {
        this.cafeList = res?.cafeteriaList
        this.cafeteria_id = this.cafeList[0]?.cafeteria_id
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  async getOrgTotalOrdersStatusWiseData() {
    const data = this.buildPayload()
    try {
      const res = await this.apiMainService.getOrgTotalOrdersStatusWiseData(data)
      console.log(res);

      this.outletOrderData = res
      if (res.length > 0) {
        this.generateChartData(res)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  async generateChartData(data: any) {
  const itemData: any = {};

  data.forEach((order: any) => {
    if (order?.orderstatus === 'completed') {
      order.itemList.forEach((item: any) => {
        if (!itemData[item.itemName]) {
          itemData[item.itemName] = {
            count: 0,
            totalAmount: 0,
            totalSubsidy: 0
          };
        }

        itemData[item.itemName].count += item.count;
        itemData[item.itemName].totalAmount += item.price * item.count;
      });
    }
  });

  const chartData = Object.keys(itemData).map(itemName => {
    const item = itemData[itemName];
    return {
      name: itemName,
      y: item.totalAmount, 
      count: item.count, 
    };
  });

  this.chartOptions = {
    chart: {
      type: 'pie' 
    },
    title: {
      text: 'Item Distribution by Total Amount (Completed Orders)'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>₹{point.y}</b> (Count: {point.count})'
    },
    series: [{
      type: 'pie', 
      name: 'Total',
      data: chartData
    }]
  };

  this.updateOrdersFlag = !this.updateOrdersFlag;  
}


  fetchData() {
    this.getOrgTotalOrdersStatusWiseData()
  }
}

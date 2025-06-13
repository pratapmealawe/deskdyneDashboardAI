import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import * as Highcharts from 'highcharts';

interface SearchObj {
  startDate: Date;
  endDate: Date;
  orgId: string;
}

interface DashboardCounts {
  orgsCount: number;
  outletsCount: number;
  vendorsCount: number;
}

interface TotalCounts {
  ordersCount: number;
  subscriptionCount: number;
}

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  // Chart Config
  chartOptionsPie: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Outlet Orders',
    },
    tooltip: {
      pointFormat: '<small>Count</small>: <b>{point.count}</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%',
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Percentage',
        data: [],
      },
    ],
  };
  chartOptionsSub: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Subscription Orders',
    },
    tooltip: {
      pointFormat: '<small>Count</small>: <b>{point.count}</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%',
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Percentage',
        data: [],
      },
    ],
  };
  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;
  initialStatusData: any[] = [];
  updateStatusFlagSub: boolean = false;
  oneToOneStatusFlagSub: boolean = true;
  initialStatusDataSub: any[] = [];

  // Input
  dateGroup!: FormGroup;
  maxDate: Date = new Date();
  searchObj: SearchObj = {
    startDate: new Date(),
    endDate: new Date(),
    orgId: ""
  }

  // Output
  staticTotalCounts: DashboardCounts = {
    orgsCount: 0,
    outletsCount: 0,
    vendorsCount: 0
  }

  totalCounts: TotalCounts = {
    ordersCount: 0,
    subscriptionCount: 0,
  }

  bulkOrders: any[] = []

  constructor(private apiMainService: ApiMainService) {
    this.dateGroup = new FormGroup({
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.getStaticTotalCounts()
    this.searchObj.startDate = this.dateGroup.value.start
    this.searchObj.endDate = this.dateGroup.value.end
    this.getOrdersCount()
    this.getPieChartData()
    this.getPieChartDataSub()
    this.getBulkOrdersByDate()
  }


  async getStaticTotalCounts() {
    try {
      const data = await this.apiMainService.getStaticTotalCounts()
      this.staticTotalCounts = data
    } catch (err: any) {
      console.log("order count err", err);
    }
  }

  async getOrdersCount() {
    try {
      const data = await this.apiMainService.getTotalCounts(this.searchObj)

      this.totalCounts = data
    } catch (err: any) {
      console.log("order count err", err);
    }
  }

  async getBulkOrdersByDate() {
    try {
      const data = await this.apiMainService.getBulkOrdersByDate(this.searchObj)

      this.bulkOrders = data
    } catch (err: any) {
      console.log("order count err", err);
    }
  }

  async getPieChartData() {
    try {
      let data = await this.apiMainService.getTotalOrdersStatusWiseData(this.searchObj);

      this.initialStatusData = data;

      const formattedData = data.map((item: any) => ({
        name: item.orderStatus,
        y: item.percentage,
        count: item.count,
      }));

      this.chartOptionsPie = {
        ...this.chartOptionsPie,
        series: [
          {
            type: 'pie',
            name: 'Percentage',
            data: formattedData,
          },
        ],
      };

      this.updateStatusFlag = true;
    } catch (err) {
      console.error('Error fetching chart data:', err);
    }
  }

  async getPieChartDataSub() {
    try {
      let data = await this.apiMainService.getTotalSubOrdersStatusWiseData(this.searchObj);

      this.initialStatusDataSub = data;

      const formattedData = data.map((item: any) => ({
        name: item.orderStatus,
        y: item.percentage,
        count: item.count,
      }));

      this.chartOptionsSub = {
        ...this.chartOptionsSub,
        series: [
          {
            type: 'pie',
            name: 'Percentage',
            data: formattedData,
          },
        ],
      };

      this.updateStatusFlagSub = true;
    } catch (err) {
      console.error('Error fetching chart data:', err);
    }
  }

  changeDate() {
    this.init()
  }

}

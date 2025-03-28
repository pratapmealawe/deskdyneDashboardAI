import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import * as Highcharts from 'highcharts';
import { FormControl, FormGroup } from '@angular/forms';

interface SearchObj {
  orgId: string;
  time: 'today' | 'week' | 'month' | '3month' | '6month' | string;
  status:
    | 'paymentInprogress'
    | 'paymentFailed'
    | 'placed'
    | 'completed'
    | 'cancelled'
    | string;
  type: string;
  startDate: Date;
  endDate: Date;
}

interface DashboardData {
  totalVendors: number;
  totalOrders: number;
  totalOutlet: number;
  totalEmployee: number;
}
@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.scss'],
})
export class OrgDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  maxDate: Date = new Date();

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Orders per Outlet',
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Outlets',
      },
    },
    yAxis: {
      title: {
        text: 'Order Count',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        cursor: 'pointer',
        colorByPoint: true,
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: 'column',
        name: 'Orders',
        data: [],
      },
    ],
  };

  chartOptionsPie: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Orders Status',
    },
    tooltip: {
      // valueSuffix: '%',
      // valueDecimals: 1,
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
        data: [], // Initially empty, will be updated with API data
      },
    ],
  };

  updateOrdersFlag: boolean = false;
  oneToOneOrdersFlag: boolean = true;
  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;

  orgAdmin: any;

  searchObj: SearchObj = {
    orgId: '',
    time: 'customRange',
    status: '',
    type: '',
    startDate: new Date(),
    endDate: new Date(),
  };
  searchObjBar: SearchObj = {
    orgId: '',
    time: '6month',
    status: 'completed',
    type: 'salesByOutlet',
    startDate: new Date(),
    endDate: new Date(),
  };

  searchObjForPie: SearchObj = {
    orgId: '',
    time: '6month',
    status: '',
    type: 'orderStatusPercentage',
    startDate: new Date(),
    endDate: new Date(),
  };

  searchObjForLine: SearchObj = {
    orgId: '',
    time: '6month',
    status: '',
    type: 'salesByMenuItems',
    startDate: new Date(),
    endDate: new Date(),
  };

  dashboardData: DashboardData = {
    totalVendors: 0,
    totalOrders: 0,
    totalOutlet: 0,
    totalEmployee: 0,
  };

  initialOrdersData: any[] = [];
  initialStatusData: any[] = [];
  dateGroup!: FormGroup;

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
    this.maxDate.setDate(this.maxDate.getDate());
    this.maxDate.setHours(23, 59, 59, 999);
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getDashboardData();
    this.getChartData();
    this.getPieChartData();
  }

  async getDashboardData() {
    this.searchObj.orgId = this.orgAdmin?.orgDetails?._id;
    this.searchObj.startDate = this.dateGroup.value.start;
    this.searchObj.endDate = this.dateGroup.value.end;
    try {
      let data = await this.apiMainService.getDashboardCounts(this.searchObj);
      this.dashboardData = data;
    } catch (err) {
      console.error('Error fetching employee:', err);
    }
  }

  async getChartData() {
    this.searchObjBar.orgId = this.orgAdmin?.orgDetails?._id;
    try {
      let data = await this.apiMainService.getChartData(this.searchObjBar);

      this.initialOrdersData = data;

      const formattedData = data.map((item: any) => ({
        name: item.outletName,
        y: item.totalOrders,
      }));

      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            type: 'column',
            name: 'Orders',
            data: formattedData,
          },
        ],
      };

      this.updateOrdersFlag = true;
    } catch (err) {
      console.error('Error fetching chart data:', err);
    }
  }

  async getPieChartData() {
    this.searchObjForPie.orgId = this.orgAdmin?.orgDetails?._id;
    try {
      let data = await this.apiMainService.getChartData(this.searchObjForPie);

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

  changeDate() {
    this.getDashboardData();
  }
}

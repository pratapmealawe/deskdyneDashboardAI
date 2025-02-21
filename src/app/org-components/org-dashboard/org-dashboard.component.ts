import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import * as Highcharts from 'highcharts';

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
      valueSuffix: '%',
      valueDecimals: 1,
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
    time: '6month',
    status: 'completed',
    type: 'salesByOutlet',
  };

  searchObjForPie: SearchObj = {
    orgId: '',
    time: '6month',
    status: '',
    type: 'orderStatusPercentage',
  };
  dashboardData: DashboardData = {
    totalVendors: 0,
    totalOrders: 0,
    totalOutlet: 0,
    totalEmployee: 0,
  };

  initialOrdersData: any[] = [];
  initialStatusData: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getDashboardData();
    this.getChartData();
    this.getPieChartData();
  }

  async getDashboardData() {
    this.searchObj.orgId = this.orgAdmin?.orgDetails?._id;
    try {
      let data = await this.apiMainService.getDashboardCounts(this.searchObj);
      this.dashboardData = data;
    } catch (err) {
      console.error('Error fetching employee:', err);
    }
  }

  async getChartData() {
    this.searchObj.orgId = this.orgAdmin?.orgDetails?._id;
    try {
      let data = await this.apiMainService.getChartData(this.searchObj);

      this.initialOrdersData = data;

      console.log(data);

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

      console.log(data);

      const formattedData = data.map((item: any) => ({
        name: item.orderStatus,
        y: item.percentage,
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

      this.updateOrdersFlag = true;
    } catch (err) {
      console.error('Error fetching chart data:', err);
    }
  }
}

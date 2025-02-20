import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import * as Highcharts from 'highcharts';

interface SearchObj {
  orgId: string;
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
      type: 'pie',
    },
    title: {
      text: '',
    },
    tooltip: {
      valueSuffix: '%',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%',
        },
        showInLegend: true,
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

  orgAdmin: any;
  searchObj: SearchObj = {
    orgId: '',
  };
  dashboardData: DashboardData = {
    totalVendors: 0,
    totalOrders: 0,
    totalOutlet: 0,
    totalEmployee: 0,
  };

  initialOrdersData: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getDashboardData();
  }

  async getDashboardData() {
    this.searchObj.orgId = this.orgAdmin?.orgDetails?._id;
    try {
      let data = await this.apiMainService.getDashboardCounts(this.searchObj);
      console.log(data);
      this.dashboardData = data;
    } catch (err) {
      console.error('Error fetching employee:', err);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

interface SearchObj {
  orgId: string;
  time: 'today' | 'week' | 'month' | '3month' | '6month';
  status:
    | 'paymentInprogress'
    | 'paymentFailed'
    | 'placed'
    | 'completed'
    | 'cancelled';
  type: string;
}

@Component({
  selector: 'app-org-menu-items',
  templateUrl: './org-menu-items.component.html',
  styleUrls: ['./org-menu-items.component.scss'],
})
export class OrgMenuItemsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  timeArray = ['today', 'week', 'month', '3month', '6month'];

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
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

  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;

  orgAdmin: any;
  searchObj: SearchObj = {
    orgId: '',
    time: '6month',
    status: 'completed',
    type: 'salesByMenuItems',
  };

  initialData: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getChartData();
  }

  async getChartData() {
    this.searchObj.orgId = this.orgAdmin?.orgDetails?._id;
    try {
      let data = await this.apiMainService.getChartData(this.searchObj);

      this.initialData = data;

      const formattedData = data.map((item: any) => ({
        name: item.itemName,
        y: item.percentage,
      }));

      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            type: 'pie',
            name: 'Percentage',
            data: formattedData,
          },
        ],
      };

      this.updateFlag = true;
    } catch (err) {
      console.error('Error fetching chart data:', err);
    }
  }
}

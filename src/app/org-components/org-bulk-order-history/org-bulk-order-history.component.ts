import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import * as Highcharts from 'highcharts';

interface filter {
  orgId: string;
  fromDate: Date;
  toDate: Date
}

@Component({
  selector: 'app-org-bulk-order-history',
  templateUrl: './org-bulk-order-history.component.html',
  styleUrls: ['./org-bulk-order-history.component.scss']
})
export class OrgBulkOrderHistoryComponent implements OnInit, OnChanges {
  Highcharts: typeof Highcharts = Highcharts;

  @Input() adminOrg: any
  orgAdmin: any;
  searchObj: filter = {
    orgId: '',
    fromDate: new Date(),
    toDate: new Date()
  };
  dateGroup!: FormGroup;
  maxDate: Date = new Date();


  updateOrdersFlag: boolean = false;
  oneToOneOrdersFlag: boolean = true;
  chartOptionsPie: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Order History',
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
  initialOrdersData: any[] = [];


  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
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
    this.maxDate.setDate(this.maxDate.getDate());
    this.maxDate.setHours(23, 59, 59, 999);
    this.getFoodOrderList()
  }

  async getFoodOrderList() {
    this.searchObj.orgId = this.orgAdmin?.orgDetails._id;
    this.searchObj.fromDate = this.dateGroup.value.start;
    this.searchObj.toDate = this.dateGroup.value.end;
    try {
      const data = await this.apiMainService.getBulkOrderForChart(
        this.searchObj
      );


      this.initialOrdersData = data

      const formattedData = data.map((item: any) => ({
        name: item.orderType,
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

      this.updateOrdersFlag = true;
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  }

  changeDate() {
    this.getFoodOrderList();
  }
}

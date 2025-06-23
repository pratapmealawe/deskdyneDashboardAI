import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import * as Highcharts from 'highcharts';
import { FormControl, FormGroup } from '@angular/forms';

interface DashboardStaticData {
  outletsCount: number,
  vendorsCount: number,
}

interface DashboardData {
  ordersCount: number,
  employeeCount: number,
  outletEmployeeCount: number,
  employeePollCount: number,
}

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.scss'],
})
export class OrgDashboardComponent implements OnInit, OnChanges {
  Highcharts: typeof Highcharts = Highcharts;

  @Input() adminOrg: any

  maxDate: Date = new Date();

  chartOptions!: Highcharts.Options;
  updateOrdersFlag: boolean = false;
  oneToOneOrdersFlag: boolean = true;

  amountChartOptions!: Highcharts.Options;
  updateAmountFlag = false;

  orgAdmin: any;


  dashboardStaticData: DashboardStaticData = {
    outletsCount: 0,
    vendorsCount: 0,
  }

  dashboarData: DashboardData = {
    ordersCount: 0,
    employeeCount: 0,
    outletEmployeeCount: 0,
    employeePollCount: 0,
  };

  dateGroup!: FormGroup;

  cafeteria_id: any
  cafeList: any[] = []
  orgDetails: any
  outletOrderData: any[] = []
  selectedCafe: any

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
    this.maxDate.setDate(this.maxDate.getDate());
    this.maxDate.setHours(23, 59, 59, 999);
    this.getOrgDetailsById()
    this.getStaticDashboardDataByOrgId()
  }

  buildPayload() {
    return {
      startDate: this.dateGroup.value.start,
      endDate: this.dateGroup.value.end,
      orgId: this.orgAdmin.orgDetails._id,
      cafeteria_name: this.cafeList.find(c => c.cafeteria_id === this.cafeteria_id)?.cafeteria_name,
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
    this.fetchData()
    } catch (err: any) {
      console.log(err);
    }
  }

  async getStaticDashboardDataByOrgId() {
    try {
      const res = await this.apiMainService.getStaticTotalCountsByOrg(this.orgAdmin?.orgDetails?._id)
      this.dashboardStaticData = res
    } catch (err: any) {
      console.log(err)
    }
  }

  async getDashboardDataByOrgId() {
    const data = this.buildPayload()
    try {
      const res = await this.apiMainService.getTotalCountsByOrgId(data)
      console.log(res);
      this.dashboarData = res
    } catch (err: any) {
      console.log(err)
    }
  }

  async getOrgTotalOrdersStatusWiseData() {
    const data = this.buildPayload()
    try {
      const res = await this.apiMainService.getOrgTotalOrdersStatusWiseData(data)
      this.outletOrderData = res
      if (res.length > 0) {
        this.generateChartData(res)
        this.generateAmountAreaChart(res)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  generateChartData(data: any) {
    const { categories, series } = this.processOrdersData(data);

    this.chartOptions = {
      chart: {
        type: 'column',
        zooming: {
          type: "x",
          mouseWheel: {
            enabled: true,
            orientation: 'x'
          },
          resetButton: {
            position: { align: 'right', verticalAlign: 'top' },
            theme: {
              fill: 'white',
              stroke: 'gray',
              r: 3,
              style: { color: 'black' }
            }
          }, 
          pinchType: 'x',
          key: 'shift'
        }
      },
      title: {
        text: 'Orders by Date and Status',
        align: 'left'
      },
      xAxis: {
        categories: categories,
        labels: {
          useHTML: true,
          formatter: function () {
            return `<span title="${this.value}">${this.value}</span>`;
          }
        }
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Number of Orders'
        }
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      series: series as Highcharts.SeriesOptionsType[]
    };

    this.updateOrdersFlag = true;
  }

  generateAmountAreaChart(data: any) {
    const dateAmountMap: Record<string, number> = {};
    data.forEach((item: any) => {
      if (item.orderstatus === "completed") {
        const d = new Date(item.orderDate).toISOString().slice(0, 10);
        dateAmountMap[d] = (dateAmountMap[d] || 0) + (item.amount + item.moneyWalletPointsUsed || 0);
      }
    });
    const categories = Object.keys(dateAmountMap).sort();
    const seriesData = categories.map(d => dateAmountMap[d]);

    this.amountChartOptions = {
      chart: {
        type: 'area', 
        zooming: {
          type: "x", 
          mouseWheel: {
            enabled: true,
            orientation: 'x'
          }, 
          resetButton: {
            position: { align: 'right', verticalAlign: 'top' },
            theme: {
              fill: 'white',
              stroke: 'gray',
              r: 3,
              style: { color: 'black' }
            }
          }, 
          pinchType: 'x',
          key: 'shift'
        }
      },
      title: { text: 'Total Amount by Date', align: 'left' },
      xAxis: {
        categories,
        tickmarkPlacement: 'on',
        title: { text: 'Date' },
      },
      yAxis: {
        title: { text: 'Amount (₹)' },
        allowDecimals: false,
      },
      tooltip: {
        pointFormat: '<b>₹{point.y:.2f}</b>',
        shared: true
      },
      plotOptions: {
        area: {
          stacking: undefined,
          marker: { enabled: false }
        }
      },
      series: [{
        name: 'Amount (₹)',
        data: seriesData,
        type: 'area'
      }]
    };

    this.updateAmountFlag = true;
  }


  processOrdersData(data: any) {
    const dateStatusMap: Record<string, Record<string, number>> = {};

    data.forEach((item: any) => {
      const dateOnly = new Date(item.orderDate).toISOString().slice(0, 10);
      const status = item.orderstatus;

      if (!dateStatusMap[dateOnly]) {
        dateStatusMap[dateOnly] = {};
      }
      if (!dateStatusMap[dateOnly][status]) {
        dateStatusMap[dateOnly][status] = 0;
      }
      dateStatusMap[dateOnly][status]++;
    });

    const categories = Object.keys(dateStatusMap).sort((a, b) =>
      a < b ? -1 : a > b ? 1 : 0
    );

    const statusSet = new Set<string>();
    Object.values(dateStatusMap).forEach((statusCounts) => {
      Object.keys(statusCounts).forEach((st) => statusSet.add(st));
    });
    const statuses = Array.from(statusSet).sort();

    const series = statuses.map((status) => {
      const dataArray = categories.map((d) => {
        return dateStatusMap[d]?.[status] ?? 0;
      });
      return {
        name: status,
        data: dataArray,
        stack: 'orders'
      };
    });

    return { categories, series };
  }

  fetchData() {
    const selCafe = this.cafeList.find(c => c.cafeteria_id === this.cafeteria_id)
    console.log(selCafe);
    this.selectedCafe = selCafe
    this.getDashboardDataByOrgId()
    this.getOrgTotalOrdersStatusWiseData()
  }
}

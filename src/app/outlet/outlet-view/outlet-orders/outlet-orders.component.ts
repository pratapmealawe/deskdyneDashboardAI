import { Component, Input, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import * as Highcharts from 'highcharts';
import { ExcelService } from 'src/service/excel.service';
import { orderStatusMapper } from 'src/config/order-status.config';

@Component({
  selector: 'app-outlet-orders',
  templateUrl: './outlet-orders.component.html',
  styleUrls: ['./outlet-orders.component.scss']
})
export class OutletOrdersComponent implements OnInit {
  @Input() outletObj: any
  Highcharts: typeof Highcharts = Highcharts;

  // date pickers
  fromDate: string | null = null;
  toDate: string | null = null;
  orderStatusMapper: any = orderStatusMapper
  pastOrderList: any[] = []
  chartOptions!: Highcharts.Options;
  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;
  isShowChart: boolean = false

  constructor(private apiMainService: ApiMainService,  private excelService: ExcelService,) { }

  ngOnInit(): void {
    console.log(this.outletObj);
    this.init()
  }

  init() {
    const today = new Date().toISOString().substring(0, 10);
    this.fromDate = today;
    this.toDate = today;
  }

  getPastOrdersByDate() {
    if (!this.fromDate || !this.toDate) {
      // this.toasterService.show(113);
      return;
    }

    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    if (from > to) {
      // this.toasterService.show(108);
      return;
    }

    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);

    this.callPastOrderApi(from, to);
  }

  private async callPastOrderApi(from: Date, to: Date) {
    // this.showloader = true;
    this.pastOrderList = [];
    try {
      const dataObj = {
        outletId: this.outletObj._id,
        fromDate: from,
        toDate: to
      };

      const res = await this.apiMainService.fetchPastOutletOrdersbysearchObj(dataObj);

      this.pastOrderList = res.filter((item: any) => item.orderstatus !== 'placed')

    } catch (err) {
      console.error(err);
    } finally {
      // this.showloader = false;
    }
  }

  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData()
    } else {
      this.isShowChart = false
    }
  }

  async excelExport() {
    const exportData = this.pastOrderList.map(order => {
      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');
      return {
        'Order No': order.orderNo,
        'Order Date': new Date(order.orderDate).toLocaleString(),
        'Status': this.orderStatusMapper[order.orderstatus] || order.orderstatus,
        'Customer Name': order.customerName,
        'Customer Mobile': order.customerPhoneNo,
        'Customer Email': order.customerEmail,
        'Org Name': order.organizationDetails.organization_name,
        'Cafe Name': order.cafeteriaDetails.cafeteria_name,
        'Items': items,
        'Total Amount (₹)': order.itemAmount,
        'Subsidy Amount (₹)': order.subsidyAmount,
        'Paid Amount (₹)': order.amount,
      };
    })


    this.excelService.download(exportData, `outlet_order_${this.fromDate}_TO_${this.toDate}`)
  }

  private processOrdersData(data: Array<{ orderDate: string; orderstatus: string }>) {
      const dateStatusMap: Record<string, Record<string, number>> = {};
  
      data.forEach((item) => {
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
  
    generateChartData() {
      let data: any = this.pastOrderList
  
      const { categories, series } = this.processOrdersData(data);
  
      this.chartOptions = {
        chart: {
          type: 'column'
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
  
      this.isShowChart = true
      this.updateStatusFlag = true;
    }
}

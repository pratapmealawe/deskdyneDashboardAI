import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import * as Highcharts from 'highcharts';

interface Filter {
  orgId: string;
  cafeId: string;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-outlet-excel-export',
  templateUrl: './outlet-excel-export.component.html',
  styleUrls: ['./outlet-excel-export.component.scss']
})
export class OutletExcelExportComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  orglist: any[] = [];
  orgDetails: any = {};
  orgAdmin: any;
  cafeList: any[] = [];

  filterObj: Filter = {
    orgId: '',
    cafeId: '',
    fromDate: '',
    toDate: '',
  };

  filteredOrderList: any[] = []
  orderStatusMapper: any = orderStatusMapper

  // Chart
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

  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;
  isShowChart: boolean = false

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private excelService: ExcelService,
    private localStorageService: LocalStorageService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');

    this.initializeDates();

    this.getOrgList();
  }

  private initializeDates(): void {
    const today = new Date();
    const iso = today.toISOString().substring(0, 10);
    this.filterObj.fromDate = iso;
    this.filterObj.toDate = iso;
  }

  async getOrgList() {
    try {
      const data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        { countOnly: false },
        1
      );
      this.orglist = data;
      this.setInitialData();
    } catch (error) {
      console.error(error);
    }
  }

  setInitialData() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails();
    }
  }

  setOrgDetails() {
    const org = this.orglist.find(o => o._id === this.filterObj.orgId);
    this.cafeList = org?.cafeteriaList ?? [];
  }

  filterOrders(): void {
    const org = this.orglist.find(o => o._id === this.filterObj.orgId);
    const cafe = this.cafeList.find(c => c.cafeteria_id === this.filterObj.cafeId);

    if (!org || !cafe) {
      console.warn('Organization or Cafeteria not selected!');
      return;
    }

    const body = {
      cafeteriaName: cafe.cafeteria_name,
      organizationName: org.organization_name,
      fromDate: new Date(this.filterObj.fromDate),
      toDate: new Date(this.filterObj.toDate),
    };

    this.getOutletByFilter(body);
  }

  async getOutletByFilter(body: any) {
    this.isShowChart = false
    try {
      const res = await this.apiMainService.fetchOutletOrdersbysearchObj(body);

      this.filteredOrderList = res
    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
    }
  }

  async excelExport() {
    const exportData = this.filteredOrderList.map(order => {
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

    console.log(exportData);

    this.excelService.download(exportData, `outlet_order_${this.filterObj.fromDate}_TO_${this.filterObj.toDate}`)
  }

  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData()
      // console.log(this.filteredOrderList)
    } else {
      this.isShowChart = false
    }
  }

  generateChartData() {
    let data: any = this.filteredOrderList

    const statusCounts = data.reduce((acc: Record<string, number>, order: any) => {
      const status = order.orderstatus;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const totalOrders = data.length;

    const formattedData = Object.keys(statusCounts).map(status => ({
      name: status,
      y: +(statusCounts[status] / totalOrders * 100).toFixed(2),
      count: statusCounts[status]
    }));

    this.chartOptionsPie = {
      ...this.chartOptionsPie,
      series: [
        {
          type: 'pie',
          name: 'Order Status %',
          data: formattedData
        }
      ]
    };

    this.isShowChart = true
    this.updateStatusFlag = true;
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as Highcharts from 'highcharts';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { orderStatusMapper } from 'src/config/order-status.config';

@Component({
  selector: 'app-outlet-orders',
  templateUrl: './outlet-orders.component.html',
  styleUrls: ['./outlet-orders.component.scss'],
})
export class OutletOrdersComponent implements OnInit {
  @Input() outletObj: any;

  Highcharts: typeof Highcharts = Highcharts;
  orderStatusMapper: any = orderStatusMapper;

  orders: any[] = [];          // raw list from API
  filteredOrders: any[] = [];  // after status filter
  pagedOrders: any[] = [];     // current page to display

  chartOptions!: Highcharts.Options;
  updateStatusFlag = false;
  oneToOneStatusFlag = true;
  isShowChart = false;
  loading = false;

  // paginator
  pageSize = 10;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // status filter
  statusOptions: string[] = [];
  selectedStatus: string = 'all';

  // Date range form
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;

  constructor(
    private apiMainService: ApiMainService,
    private fb: FormBuilder
  ) {
    this.dateForm = this.fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    // Default date = today
    const today = new Date();
    this.dateForm.patchValue({
      dateFrom: today,
      dateTo: today,
    });

    if (this.outletObj) {
      this.onSubmit(); // load initial data for today
    }
  }

  // --- COMPUTED TOTALS (adjust field names if needed) ---
  get totals() {
    const list = this.filteredOrders || [];
    const totalAmount = list.reduce(
      (sum, o) => sum + (o.amount || 0), 0  // << change field if needed
    );
    const walletAmount = list.reduce(
      (sum, o) => sum + (o.moneyWalletPointsUsed || 0), 0 // << change field if needed
    );
    return { totalAmount, walletAmount };
  }

  // --- LOAD ORDERS ---

  onSubmit(): void {
    const dateFrom: Date | null = this.dateForm.get('dateFrom')?.value || null;
    const dateTo: Date | null = this.dateForm.get('dateTo')?.value || null;

    if (!dateFrom || !dateTo || !this.outletObj?._id) {
      this.dateForm.markAllAsTouched();
      return;
    }

    const body = {
      outletId: this.outletObj._id,
      fromDate: dateFrom,
      toDate: dateTo,
    };

    this.fetchOutletOrders(body);
  }

  async fetchOutletOrders(body: any) {
    try {
      this.loading = true;
      console.log(body);

      const res = await this.apiMainService.fetchCompletedOutletOrdersbysearchObj(body);
      this.orders = res || [];
      this.buildStatusOptions();
      this.applyFilters(); // also rebuild chart if needed
    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
      this.orders = [];
      this.filteredOrders = [];
      this.pagedOrders = [];
    } finally {
      this.loading = false;
    }
  }

  // Collect unique statuses from orders
  private buildStatusOptions() {
    const set = new Set<string>();
    this.orders.forEach((o: any) => {
      if (o.orderstatus) {
        set.add(o.orderstatus);
      }
    });
    this.statusOptions = Array.from(set).sort();
  }

  // --- FILTER & PAGINATION ---

  applyFilters() {
    if (this.selectedStatus === 'all') {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(
        (o) => o.orderstatus === this.selectedStatus
      );
    }

    // this.filteredOrders = this.orders.filter(
    //   (o) => o.isPosOrder
    // );

    // reset paginator
    this.pageIndex = 0;
    this.updatePagedOrders();

    if (this.isShowChart) {
      this.generateChartData();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedOrders();
  }

  private updatePagedOrders() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedOrders = this.filteredOrders.slice(start, end);
  }

  // --- CHART VIEW ---

  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData();
      this.isShowChart = true;
    } else {
      this.isShowChart = false;
    }
  }

  private processOrdersData(
    data: Array<{ orderDate: string; orderstatus: string }>
  ) {
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
        name: this.orderStatusMapper[status] || status,
        data: dataArray,
        stack: 'orders',
      };
    });

    return { categories, series };
  }

  generateChartData() {
    const data: any = this.filteredOrders;

    if (!data || data.length === 0) {
      this.chartOptions = {};
      return;
    }

    const { categories, series } = this.processOrdersData(data);

    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Orders by Date and Status',
        align: 'left',
      },
      xAxis: {
        categories: categories,
        labels: {
          useHTML: true,
          formatter: function () {
            return `<span title="${this.value}">${this.value}</span>`;
          },
        },
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Number of Orders',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
      },
      series: series as Highcharts.SeriesOptionsType[],
    };

    this.updateStatusFlag = true;
  }

  // --- EXCEL EXPORT ---

  async excelExport() {
    if (!this.filteredOrders || this.filteredOrders.length === 0) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Orders');

    worksheet.columns = [
      { header: 'Order No', key: 'orderNo', width: 18 },
      { header: 'Order Date', key: 'orderDate', width: 20 },
      { header: 'Status', key: 'orderstatus', width: 15 },
      { header: 'Amount (₹)', key: 'totalAmount', width: 18 },
      { header: 'Wallet Amount (₹)', key: 'walletAmount', width: 18 },
    ];

    // Header style
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    this.filteredOrders.forEach((o) => {
      worksheet.addRow({
        orderNo: o.orderNo, // << change if your field is different
        orderDate: o.orderDate
          ? new Date(o.orderDate).toLocaleString('en-IN')
          : '',
        orderstatus: this.orderStatusMapper[o.orderstatus] || o.orderstatus,
        totalAmount: o.amount || 0,     // << adjust field name if needed
        walletAmount: o.moneyWalletPointsUsed || 0,   // << adjust field name if needed
      });
    });

    // Totals row
    const totalsRow = worksheet.addRow({
      orderNo: 'TOTAL',
      orderDate: '',
      orderstatus: '',
      totalAmount: this.totals.totalAmount,
      walletAmount: this.totals.walletAmount,
    });
    totalsRow.font = { bold: true };

    const fileName =
      `outlet_orders_${this.outletObj?.outletName || 'outlet'}` +
      `_${new Date().toISOString().slice(0, 10)}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName);
  }
}

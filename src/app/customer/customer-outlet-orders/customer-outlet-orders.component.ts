import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import { OrderFilterDialogComponent, OrderFilterDialogData } from '../../common-components/order-filter-dialog/order-filter-dialog.component';

import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-customer-outlet-orders',
  templateUrl: './customer-outlet-orders.component.html',
  styleUrls: ['./customer-outlet-orders.component.scss']
})
export class CustomerOutletOrdersComponent implements OnInit {
  @Input() userDetails: any;

  outletOrderList: any[] = [];
  filteredList: any[] = [];
  pagedList: any[] = [];

  orderStatusMapper: any = orderStatusMapper;

  // Totals
  totalAmount = 0;         // wallet + amount
  totalWalletUsed = 0;     // only moneyWalletPointsUsed
  totalAmountPaid = 0;     // only amount

  // Filters
  orderNoSearch: string | number | null = null;
  selectedStatus: string = 'all';

  // New Detailed Filters
  filterPgName = '';
  filterAppVersion = '';
  filterPlatform = '';
  filterIsPosOrder = '';

  uniquePgNames: string[] = [];
  uniqueAppVersions: string[] = [];
  uniquePlatforms: string[] = [];

  statusList: string[] = [
    'paymentInprogress',
    'paymentFailed',
    'placed',
    'completed',
    'cancelled',
    'readyOrder',
    'autoComplete'
  ];

  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;

  // Highcharts
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag: boolean = false;

  // Pagination
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private apiMainService: ApiMainService,
    private excelService: ExcelService, // keep if used elsewhere
    fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.dateForm = fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    this.setTodayRange();
    this.getOrderListByCustomerId();
  }

  setTodayRange() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    this.dateForm.patchValue(
      { dateFrom: start, dateTo: end },
      { emitEvent: false }
    );
  }

  applyDateRange() {
    this.getOrderListByCustomerId();
  }

  async getOrderListByCustomerId() {
    if (!this.userDetails?._id) { return; }

    try {
      const { dateFrom, dateTo } = this.dateForm.value;

      const orderList: any = await this.apiMainService.getOutletOrdersByCustomerId(
        this.userDetails._id,
        dateFrom,
        dateTo
      );

      this.outletOrderList = Array.isArray(orderList) ? orderList : [];
      this.extractUniqueFilterValues();
      this.applyFilters();
    } catch (err: any) {
      console.error(err);
    }
  }

  extractUniqueFilterValues() {
    const pgSet = new Set<string>();
    const versionSet = new Set<string>();
    const platformSet = new Set<string>();

    this.outletOrderList.forEach((order: any) => {
      if (order.pgName) pgSet.add(order.pgName);
      if (order.appVersion) versionSet.add(String(order.appVersion));
      if (order.deviceInfo?.platform) platformSet.add(order.deviceInfo.platform);
    });

    this.uniquePgNames = Array.from(pgSet).sort();
    this.uniqueAppVersions = Array.from(versionSet).sort();
    this.uniquePlatforms = Array.from(platformSet).sort();
  }

  hasActiveFilters(): boolean {
    return !!(this.filterPgName || this.filterAppVersion || this.filterPlatform || this.filterIsPosOrder);
  }

  get activeFilterCount(): number {
    let count = 0;
    if (this.filterPgName) count++;
    if (this.filterAppVersion) count++;
    if (this.filterPlatform) count++;
    if (this.filterIsPosOrder) count++;
    return count;
  }

  openFilterDialog() {
    const dialogData: OrderFilterDialogData = {
      filterOrderStatus: '',
      filterPgName: this.filterPgName,
      filterAppVersion: this.filterAppVersion,
      filterPlatform: this.filterPlatform,
      filterIsPosOrder: this.filterIsPosOrder,
      uniqueOrderStatuses: [],
      uniquePgNames: this.uniquePgNames,
      uniqueAppVersions: this.uniqueAppVersions,
      uniquePlatforms: this.uniquePlatforms,
      showStatusFilter: false,
    };

    const dialogRef = this.dialog.open(OrderFilterDialogComponent, {
      data: dialogData,
      width: '520px',
      panelClass: 'filter-dialog-panel',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterPgName = result.filterPgName;
        this.filterAppVersion = result.filterAppVersion;
        this.filterPlatform = result.filterPlatform;
        this.filterIsPosOrder = result.filterIsPosOrder;
        this.applyFilters();
      }
    });
  }

  clearFilters() {
    this.filterPgName = '';
    this.filterAppVersion = '';
    this.filterPlatform = '';
    this.filterIsPosOrder = '';
    this.applyFilters();
  }

  applyFilters() {
    let list = [...this.outletOrderList];

    // 1) Status filter
    if (this.selectedStatus && this.selectedStatus !== 'all') {
      list = list.filter(o => o.orderstatus === this.selectedStatus);
    }

    // 2) Filter by order no (client-side)
    if (this.orderNoSearch !== null && this.orderNoSearch !== undefined && this.orderNoSearch !== '') {
      const searchStr = String(this.orderNoSearch).trim();
      list = list.filter(o => String(o.orderNo).includes(searchStr));
    }

    // 3) Filter by pgName
    if (this.filterPgName) {
      list = list.filter(o => o.pgName === this.filterPgName);
    }

    // 4) Filter by appVersion
    if (this.filterAppVersion) {
      list = list.filter(o => String(o.appVersion) === this.filterAppVersion);
    }

    // 5) Filter by platform
    if (this.filterPlatform) {
      list = list.filter(o => o.deviceInfo?.platform === this.filterPlatform);
    }

    // 6) Filter by isPosOrder
    if (this.filterIsPosOrder) {
      const isPOS = this.filterIsPosOrder === 'true';
      list = list.filter(o => !!o.isPosOrder === isPOS);
    }

    this.filteredList = list;

    // Totals
    this.totalWalletUsed = list.reduce((sum, order) =>
      sum + (Number(order.moneyWalletPointsUsed) || 0), 0
    );

    this.totalAmountPaid = list.reduce((sum, order) =>
      sum + (Number(order.amount) || 0), 0
    );

    this.totalAmount = this.totalWalletUsed + this.totalAmountPaid;

    this.updateChartData();

    // Reset pagination
    this.pageIndex = 0;
    this.updatePagedList();
  }

  updateChartData() {
    const dataMap = new Map<string, number>();

    // Group by date
    this.filteredList.forEach(order => {
      const dateKey = new Date(order.orderDate).toLocaleDateString('en-IN');
      const amount = this.getGrandTotal(order);
      dataMap.set(dateKey, (dataMap.get(dateKey) || 0) + amount);
    });

    const categories = Array.from(dataMap.keys()).reverse(); // Reverse for chronological order if needed, but the list might already be sorted
    const data = Array.from(dataMap.values()).reverse();

    this.chartOptions = {
      chart: { type: 'areaspline', height: 300, backgroundColor: 'transparent' },
      title: { text: '' },
      xAxis: { categories: categories, crosshair: true },
      yAxis: { title: { text: 'Amount (₹)' } },
      tooltip: { shared: true, valuePrefix: '₹' },
      credits: { enabled: false },
      series: [{
        name: 'Daily Spend',
        type: 'areaspline',
        data: data,
        color: '#4f46e5',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(79, 70, 229, 0.2)'],
            [1, 'rgba(79, 70, 229, 0)']
          ]
        }
      }]
    };
    this.updateFlag = true;
  }

  updatePagedList() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedList = this.filteredList.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedList();
  }

  getGrandTotal(order: any): number {
    return (Number(order.itemAmount) || 0)
      + (Number(order.taxes) || 0)
      + (Number(order.packagingAmount) || 0);
  }

  private getDateRangeLabel(): string {
    const { dateFrom, dateTo } = this.dateForm.value;

    if (!dateFrom || !dateTo) return 'All Dates';

    const from = new Date(dateFrom);
    const to = new Date(dateTo);

    const fmt = (d: Date) =>
      d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    return `${fmt(from)} - ${fmt(to)}`;
  }

  async excelExport() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Orders');

    // ---- Customer details for header ----
    const firstOrder = this.filteredList[0] || this.outletOrderList[0] || {};
    const customerName =
      firstOrder.customerName ||
      this.userDetails?.name ||
      this.userDetails?.fullName ||
      '-';

    const customerMobile =
      firstOrder.customerPhoneNo ||
      this.userDetails?.phoneNo ||
      this.userDetails?.mobileNo ||
      '-';

    const customerEmail =
      firstOrder.customerEmail ||
      (this.userDetails as any)?.email ||
      '-';

    // ---- Title + Date Range + Customer Info ----
    const title = 'Outlet Orders';
    const dateRangeLabel = this.getDateRangeLabel();

    // Row 1: Title
    worksheet.mergeCells('A1', 'N1');
    worksheet.getCell('A1').value = "apps";
    worksheet.getCell('A1').font = { size: 14, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    // Row 2: Date range
    worksheet.mergeCells('A2', 'N2');
    worksheet.getCell('A2').value = dateRangeLabel;
    worksheet.getCell('A2').font = { size: 11, italic: true, color: { argb: 'FF555555' } };
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Row 3: Customer Name
    worksheet.mergeCells('A3', 'N3');
    worksheet.getCell('A3').value = `Customer Name: ${customerName}`;
    worksheet.getCell('A3').font = { size: 11 };
    worksheet.getCell('A3').alignment = { horizontal: 'left' };

    // Row 4: Mobile + Email
    worksheet.mergeCells('A4', 'N4');
    worksheet.getCell('A4').value = `Mobile: ${customerMobile}    Email: ${customerEmail}`;
    worksheet.getCell('A4').font = { size: 11 };
    worksheet.getCell('A4').alignment = { horizontal: 'left' };

    // Empty row 5
    worksheet.addRow([]);

    // ---- Define columns (for widths/keys) ----
    worksheet.columns = [
      { header: 'Order No', key: 'orderNo', width: 12 },           // A
      { header: 'Token No', key: 'tokenNo', width: 10 },           // B
      { header: 'Order Date', key: 'orderDate', width: 18 },       // C
      { header: 'Status', key: 'status', width: 16 },              // D
      { header: 'Customer Name', key: 'customerName', width: 20 }, // E
      { header: 'Customer Mobile', key: 'customerPhoneNo', width: 16 }, // F
      { header: 'Customer Email', key: 'customerEmail', width: 24 },    // G
      { header: 'Org Name', key: 'orgName', width: 22 },           // H
      { header: 'Cafe Name', key: 'cafeName', width: 18 },         // I
      { header: 'Items', key: 'items', width: 40 },                // J
      { header: 'Item Amount (₹)', key: 'itemAmount', width: 16 }, // K
      { header: 'Subsidy Amount (₹)', key: 'subsidyAmount', width: 18 }, // L
      { header: 'Wallet Used (₹)', key: 'walletUsed', width: 16 }, // M
      { header: 'Amount Paid (₹)', key: 'amountPaid', width: 16 }, // N
    ];

    // ---- Header row (row 6) ----
    const headerRowIndex = 6;
    const headerRow = worksheet.getRow(headerRowIndex);

    headerRow.values = [
      'Order No',
      'Token No',
      'Order Date',
      'Status',
      'Customer Name',
      'Customer Mobile',
      'Customer Email',
      'Org Name',
      'Cafe Name',
      'Items',
      'Item Amount (₹)',
      'Subsidy Amount (₹)',
      'Wallet Used (₹)',
      'Amount Paid (₹)',
    ] as ExcelJS.CellValue[];

    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F46E5' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 22;

    // ---- Data rows start from row 7 ----
    let rowIndex = headerRowIndex + 1;

    // Totals (only for filtered list)
    let totalItemAmount = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalAmountPaid = 0;

    this.filteredList.forEach(order => {
      const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
      const amountPaid = Number(order.amount) || 0;
      const itemAmount = Number(order.itemAmount) || 0;
      const subsidyAmount = Number(order.subsidyAmount) || 0;

      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');

      const row = worksheet.addRow({
        orderNo: order.orderNo,
        tokenNo: order.tokenNo || '-',
        orderDate: new Date(order.orderDate).toLocaleString('en-IN'),
        status: this.orderStatusMapper[order.orderstatus] || order.orderstatus,
        customerName: order.customerName,
        customerPhoneNo: order.customerPhoneNo,
        customerEmail: order.customerEmail || customerEmail,
        orgName: order.organizationDetails?.organization_name,
        cafeName: order.cafeteriaDetails?.cafeteria_name,
        items,
        itemAmount,
        subsidyAmount,
        walletUsed,
        amountPaid,
      });

      // K, L, M, N numeric columns
      row.getCell('K').numFmt = '#,##0.00';
      row.getCell('L').numFmt = '#,##0.00';
      row.getCell('M').numFmt = '#,##0.00';
      row.getCell('N').numFmt = '#,##0.00';

      // accumulate totals
      totalItemAmount += itemAmount;
      totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed;
      totalAmountPaid += amountPaid;

      rowIndex++;
    });

    // ---- Totals row (last row) ----
    const totalsRow = worksheet.addRow({
      orderNo: 'Totals',
      itemAmount: totalItemAmount,
      subsidyAmount: totalSubsidy,
      walletUsed: totalWalletUsed,
      amountPaid: totalAmountPaid,
    });

    totalsRow.font = { bold: true };
    totalsRow.getCell('A').alignment = { horizontal: 'right' };

    totalsRow.getCell('K').numFmt = '#,##0.00';
    totalsRow.getCell('L').numFmt = '#,##0.00';
    totalsRow.getCell('M').numFmt = '#,##0.00';
    totalsRow.getCell('N').numFmt = '#,##0.00';

    // ---- Borders for table (header + data + totals) ----
    worksheet.eachRow((row, rIndex) => {
      if (rIndex >= headerRowIndex) {
        row.eachCell(cell => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            right: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          };
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const filename = `outlet_orders_${customerName || 'customer'}_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;

    saveAs(blob, filename);
  }


}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as Highcharts from 'highcharts';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { orderStatusMapper } from 'src/config/order-status.config';
import {
  OrderFilterDialogComponent,
  OrderFilterDialogData,
} from 'src/app/common-components/order-filter-dialog/order-filter-dialog.component';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

@Component({
  selector: 'app-outlet-orders',
  templateUrl: './outlet-orders.component.html',
  styleUrls: ['./outlet-orders.component.scss'],
})
export class OutletOrdersComponent implements OnInit {
  @Input() outletObj: any;

  Highcharts: typeof Highcharts = Highcharts;
  orderStatusMapper: any = orderStatusMapper;

  orders: any[] = [];
  filteredOrders: any[] = [];
  pagedOrders: any[] = [];

  chartOptions!: Highcharts.Options;
  updateStatusFlag = false;
  oneToOneStatusFlag = true;
  isShowChart = false;
  loading = false;

  // Paginator
  pageSize = 10;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Date range form
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;

  // Filters
  searchText = '';
  filterOrderStatus = '';
  filterPgName = '';
  filterAppVersion = '';
  filterPlatform = '';
  filterIsPosOrder = '';

  // Unique values for filter dropdowns
  uniqueOrderStatuses: string[] = [];
  uniquePgNames: string[] = [];
  uniqueAppVersions: string[] = [];
  uniquePlatforms: string[] = [];

  // Totals
  totalAmountPaid = 0;
  totalWalletUsed = 0;
  totalAmount = 0;
  totalSubsidy = 0;
  totalCompanyWallet = 0;
  totalPackaging = 0;

  constructor(
    private apiMainService: ApiMainService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.dateForm = this.fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    const today = new Date();
    this.dateForm.patchValue({ dateFrom: today, dateTo: today });
    if (this.outletObj) {
      this.onSubmit();
    }
  }

  // ── Load ────────────────────────────────────────────────────

  onSubmit(): void {
    const dateFrom = this.dateForm.get('dateFrom')?.value || null;
    const dateTo = this.dateForm.get('dateTo')?.value || null;
    if (!dateFrom || !dateTo || !this.outletObj?._id) {
      this.dateForm.markAllAsTouched();
      return;
    }
    this.fetchOutletOrders({ outletId: this.outletObj._id, fromDate: dateFrom, toDate: dateTo });
  }

  async fetchOutletOrders(body: any) {
    try {
      this.loading = true;
      const res = await this.apiMainService.fetchCompletedOutletOrdersbysearchObj(body);
      this.orders = res || [];
      this.extractUniqueFilterValues();
      this.applyFilters();
    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
      this.orders = [];
      this.filteredOrders = [];
      this.pagedOrders = [];
    } finally {
      this.loading = false;
    }
  }

  // ── Filter values ────────────────────────────────────────────

  private extractUniqueFilterValues() {
    const pgSet = new Set<string>();
    const versionSet = new Set<string>();
    const platformSet = new Set<string>();
    const statusSet = new Set<string>();

    this.orders.forEach((o: any) => {
      if (o.pgName) pgSet.add(o.pgName);
      if (o.appVersion) versionSet.add(String(o.appVersion));
      if (o.deviceInfo?.platform) platformSet.add(o.deviceInfo.platform);
      if (o.orderstatus) statusSet.add(o.orderstatus);
    });

    this.uniquePgNames = Array.from(pgSet).sort();
    this.uniqueAppVersions = Array.from(versionSet).sort();
    this.uniquePlatforms = Array.from(platformSet).sort();
    this.uniqueOrderStatuses = Array.from(statusSet).sort();
  }

  // ── Filters & pagination ─────────────────────────────────────

  applyFilters() {
    let list = [...this.orders];

    if (this.searchText) {
      const lower = this.searchText.toLowerCase();
      list = list.filter((o: any) =>
        (o.orderNo?.toString().toLowerCase().includes(lower)) ||
        (o.customerName?.toLowerCase().includes(lower)) ||
        (o.customerPhoneNo?.toString().includes(lower)) ||
        (o.customerEmail?.toLowerCase().includes(lower))
      );
    }

    if (this.filterOrderStatus) {
      list = list.filter((o: any) => o.orderstatus === this.filterOrderStatus);
    }

    if (this.filterPgName) {
      list = list.filter((o: any) => o.pgName === this.filterPgName);
    }

    if (this.filterAppVersion) {
      list = list.filter((o: any) => String(o.appVersion) === this.filterAppVersion);
    }

    if (this.filterPlatform) {
      list = list.filter((o: any) => o.deviceInfo?.platform === this.filterPlatform);
    }

    if (this.filterIsPosOrder) {
      const isPOS = this.filterIsPosOrder === 'true';
      list = list.filter((o: any) => !!o.isPosOrder === isPOS);
    }

    this.filteredOrders = list;
    this.calculateTotals();
    this.pageIndex = 0;
    this.updatePagedOrders();

    if (this.isShowChart) {
      this.generateChartData();
    }
  }

  private calculateTotals() {
    this.totalAmountPaid = 0;
    this.totalWalletUsed = 0;
    this.totalSubsidy = 0;
    this.totalCompanyWallet = 0;
    this.totalPackaging = 0;

    this.filteredOrders.forEach((o: any) => {
      this.totalAmountPaid    += Number(o.amount) || 0;
      this.totalWalletUsed    += Number(o.moneyWalletPointsUsed) || 0;
      this.totalSubsidy       += Number(o.subsidyAmount) || 0;
      this.totalCompanyWallet += Number(o.companyWalletPointUsed) || 0;
      this.totalPackaging     += Number(o.packagingAmount) || 0;
    });

    this.totalAmount = this.totalAmountPaid + this.totalWalletUsed;
  }

  get activeFilterCount(): number {
    let count = 0;
    if (this.filterOrderStatus) count++;
    if (this.filterPgName) count++;
    if (this.filterAppVersion) count++;
    if (this.filterPlatform) count++;
    if (this.filterIsPosOrder) count++;
    return count;
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applyFilters();
  }

  openFilterDialog() {
    const data: OrderFilterDialogData = {
      filterOrderStatus: this.filterOrderStatus,
      filterPgName: this.filterPgName,
      filterAppVersion: this.filterAppVersion,
      filterPlatform: this.filterPlatform,
      filterIsPosOrder: this.filterIsPosOrder,
      uniqueOrderStatuses: this.uniqueOrderStatuses,
      uniquePgNames: this.uniquePgNames,
      uniqueAppVersions: this.uniqueAppVersions,
      uniquePlatforms: this.uniquePlatforms,
      showStatusFilter: true,
    };

    const dialogRef = this.dialog.open(OrderFilterDialogComponent, {
      data,
      width: '520px',
      panelClass: 'filter-dialog-panel',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filterOrderStatus = result.filterOrderStatus;
        this.filterPgName      = result.filterPgName;
        this.filterAppVersion  = result.filterAppVersion;
        this.filterPlatform    = result.filterPlatform;
        this.filterIsPosOrder  = result.filterIsPosOrder;
        this.applyFilters();
      }
    });
  }

  clearFilters() {
    this.searchText        = '';
    this.filterOrderStatus = '';
    this.filterPgName      = '';
    this.filterAppVersion  = '';
    this.filterPlatform    = '';
    this.filterIsPosOrder  = '';
    this.applyFilters();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedOrders();
  }

  private updatePagedOrders() {
    const start = this.pageIndex * this.pageSize;
    this.pagedOrders = this.filteredOrders.slice(start, start + this.pageSize);
  }

  // ── Chart ────────────────────────────────────────────────────

  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData();
      this.isShowChart = true;
    } else {
      this.isShowChart = false;
    }
  }

  private processOrdersData(data: Array<{ orderDate: string; orderstatus: string }>) {
    const dateStatusMap: Record<string, Record<string, number>> = {};

    data.forEach((item) => {
      const dateOnly = new Date(item.orderDate).toISOString().slice(0, 10);
      const status = item.orderstatus;
      if (!dateStatusMap[dateOnly]) dateStatusMap[dateOnly] = {};
      dateStatusMap[dateOnly][status] = (dateStatusMap[dateOnly][status] || 0) + 1;
    });

    const categories = Object.keys(dateStatusMap).sort();
    const statusSet = new Set<string>();
    Object.values(dateStatusMap).forEach((sc) => Object.keys(sc).forEach((s) => statusSet.add(s)));

    const series = Array.from(statusSet).sort().map((status) => ({
      name: this.orderStatusMapper[status] || status,
      data: categories.map((d) => dateStatusMap[d]?.[status] ?? 0),
      stack: 'orders',
    }));

    return { categories, series };
  }

  generateChartData() {
    if (!this.filteredOrders.length) { this.chartOptions = {}; return; }
    const { categories, series } = this.processOrdersData(this.filteredOrders);

    this.chartOptions = {
      chart: { type: 'column' },
      title: { text: 'Orders by Date and Status', align: 'left' },
      xAxis: { categories },
      yAxis: { allowDecimals: false, min: 0, title: { text: 'Number of Orders' } },
      tooltip: { pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}' },
      plotOptions: { column: { stacking: 'normal' } },
      legend: { align: 'center', verticalAlign: 'bottom' },
      series: series as Highcharts.SeriesOptionsType[],
    };
    this.updateStatusFlag = true;
  }

  // ── Excel Export ─────────────────────────────────────────────

  async excelExport() {
    if (!this.filteredOrders.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Orders');

    worksheet.columns = [
      { header: 'Order No',           key: 'orderNo',        width: 12 },
      { header: 'Token No',           key: 'tokenNo',        width: 10 },
      { header: 'Order Date',         key: 'orderDate',      width: 20 },
      { header: 'Status',             key: 'status',         width: 16 },
      { header: 'Customer Name',      key: 'customerName',   width: 22 },
      { header: 'Mobile',             key: 'mobile',         width: 16 },
      { header: 'Email',              key: 'email',          width: 26 },
      { header: 'Org Name',           key: 'orgName',        width: 22 },
      { header: 'Cafe Name',          key: 'cafeName',       width: 18 },
      { header: 'Items',              key: 'items',          width: 42 },
      { header: 'Item Amount (₹)',    key: 'itemAmount',     width: 16 },
      { header: 'Packaging (₹)',      key: 'packaging',      width: 14 },
      { header: 'Subsidy (₹)',        key: 'subsidy',        width: 14 },
      { header: 'Wallet Used (₹)',    key: 'walletUsed',     width: 16 },
      { header: 'Company Wallet (₹)', key: 'companyWallet',  width: 18 },
      { header: 'Amount Paid (₹)',    key: 'amountPaid',     width: 16 },
      { header: 'PG Name',            key: 'pgName',         width: 14 },
      { header: 'App Version',        key: 'appVersion',     width: 12 },
      { header: 'Platform',           key: 'platform',       width: 12 },
      { header: 'POS Order',          key: 'isPosOrder',     width: 10 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    let totItemAmt = 0, totPackaging = 0, totSubsidy = 0,
        totWallet = 0, totCompanyWallet = 0, totAmountPaid = 0;

    this.filteredOrders.forEach((o: any) => {
      const itemAmount    = Number(o.itemAmount) || 0;
      const packaging     = Number(o.packagingAmount) || 0;
      const subsidy       = Number(o.subsidyAmount) || 0;
      const walletUsed    = Number(o.moneyWalletPointsUsed) || 0;
      const companyWallet = Number(o.companyWalletPointUsed) || 0;
      const amountPaid    = Number(o.amount) || 0;

      const items = (o.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');

      worksheet.addRow({
        orderNo:       o.orderNo,
        tokenNo:       o.tokenNo || '-',
        orderDate:     new Date(o.orderDate).toLocaleString('en-IN'),
        status:        this.orderStatusMapper[o.orderstatus] || o.orderstatus,
        customerName:  o.customerName,
        mobile:        o.customerPhoneNo,
        email:         o.customerEmail,
        orgName:       o.organizationDetails?.organization_name || '-',
        cafeName:      o.cafeteriaDetails?.cafeteria_name || '-',
        items,
        itemAmount, packaging, subsidy, walletUsed, companyWallet, amountPaid,
        pgName:        o.pgName || '-',
        appVersion:    o.appVersion || '-',
        platform:      o.deviceInfo?.platform || '-',
        isPosOrder:    o.isPosOrder ? 'Yes' : 'No',
      });

      totItemAmt      += itemAmount;
      totPackaging    += packaging;
      totSubsidy      += subsidy;
      totWallet       += walletUsed;
      totCompanyWallet+= companyWallet;
      totAmountPaid   += amountPaid;
    });

    const totalsRow = worksheet.addRow({
      orderNo: 'TOTAL',
      itemAmount: totItemAmt, packaging: totPackaging, subsidy: totSubsidy,
      walletUsed: totWallet, companyWallet: totCompanyWallet, amountPaid: totAmountPaid,
    });
    totalsRow.font = { bold: true };

    worksheet.eachRow((row, idx) => {
      if (idx >= 1) {
        row.eachCell((cell) => {
          cell.border = {
            top:    { style: 'thin', color: { argb: 'FFDDDDDD' } },
            left:   { style: 'thin', color: { argb: 'FFDDDDDD' } },
            bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            right:  { style: 'thin', color: { argb: 'FFDDDDDD' } },
          };
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `outlet_orders_${this.outletObj?.outletName || 'outlet'}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  // ── PDF Export ───────────────────────────────────────────────

  downloadPdf() {
    if (!this.filteredOrders.length) return;

    const tableHeaders = [
      { text: 'Order No', bold: true }, { text: 'Token', bold: true },
      { text: 'Date', bold: true },     { text: 'Status', bold: true },
      { text: 'Customer', bold: true }, { text: 'Mobile', bold: true },
      { text: 'Items', bold: true },    { text: 'Item Amt (₹)', bold: true },
      { text: 'Subsidy (₹)', bold: true }, { text: 'Wallet (₹)', bold: true },
      { text: 'Paid (₹)', bold: true },
    ];

    const body: any[] = [tableHeaders];
    let totItemAmt = 0, totSubsidy = 0, totWallet = 0, totAmountPaid = 0;

    this.filteredOrders.forEach((o: any) => {
      const itemAmount = Number(o.itemAmount) || 0;
      const subsidy    = Number(o.subsidyAmount) || 0;
      const wallet     = Number(o.moneyWalletPointsUsed) || 0;
      const paid       = Number(o.amount) || 0;
      const items      = (o.itemList || []).map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`).join('; ');

      body.push([
        o.orderNo || '', o.tokenNo || '',
        new Date(o.orderDate).toLocaleString('en-IN'),
        this.orderStatusMapper[o.orderstatus] || o.orderstatus,
        o.customerName || '', o.customerPhoneNo || '', items,
        itemAmount.toFixed(2), subsidy.toFixed(2), wallet.toFixed(2), paid.toFixed(2),
      ]);

      totItemAmt += itemAmount; totSubsidy += subsidy; totWallet += wallet; totAmountPaid += paid;
    });

    body.push([
      { text: 'Totals', bold: true, colSpan: 7, alignment: 'right' },
      {}, {}, {}, {}, {}, {},
      { text: totItemAmt.toFixed(2), bold: true },
      { text: totSubsidy.toFixed(2), bold: true },
      { text: totWallet.toFixed(2), bold: true },
      { text: totAmountPaid.toFixed(2), bold: true },
    ]);

    const dateStr = new Date().toISOString().slice(0, 10);

    const docDefinition: any = {
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],
      content: [
        { text: 'Outlet Orders Report', style: 'header' },
        { text: `Outlet: ${this.outletObj?.outletName || '-'}`, style: 'subheader' },
        { text: `Generated on: ${dateStr}`, style: 'subheader', margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: [40, 35, 70, 55, 80, 60, '*', 60, 55, 55, 55],
            body,
          },
          layout: {
            fillColor: (rowIndex: number) => (rowIndex === 0 ? '#2E75B6' : null),
            paddingLeft: () => 3, paddingRight: () => 3,
            paddingTop: () => 3,  paddingBottom: () => 3,
            hLineColor: () => '#999999', vLineColor: () => '#999999',
          },
        },
      ],
      styles: {
        header:    { fontSize: 15, bold: true, margin: [0, 0, 0, 6] },
        subheader: { fontSize: 10, color: '#555' },
      },
      defaultStyle: { fontSize: 8, color: '#000' },
    };

    (pdfMake as any).createPdf(docDefinition).download(`OutletOrders_${dateStr}.pdf`);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import * as Highcharts from 'highcharts';
import { CommonSelectConfig } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { OrderFilterDialogComponent, OrderFilterDialogData } from '../common-components/order-filter-dialog/order-filter-dialog.component';
import { MaterialModule } from "src/app/material.module";

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrderCardComponent } from 'src/app/outlet-orders/order-card/order-card.component';
import { CommonOutletCafeSelectComponent } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { OrgOutletOrdersComponent } from '../organization-dashboard/org-outlet-orders/org-outlet-orders.component';
import { OutletCardComponent } from 'src/app/outlet/outlet-card/outlet-card.component';

@Component({
  selector: 'app-outlet-excel-export',
  templateUrl: './outlet-excel-export.component.html',
  styleUrls: ['./outlet-excel-export.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HighchartsChartModule,
    OrderCardComponent,
    CommonOutletCafeSelectComponent,
    OrderFilterDialogComponent,
    OrgOutletOrdersComponent,
    OutletCardComponent
  ],
  providers: [DatePipe]
})
export class OutletExcelExportComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  isAdmin: boolean = false;
  orgDetails: any = {};
  orgAdmin: any;
  headerConfigAdmin: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: false,
    requireAll: true
  }
  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true
  };
  fromDate = '';
  toDate = '';
  filteredOrderList: any[] = [];
  displayedList: any[] = [];

  // Totals
  totalAmountPaid = 0;
  totalWalletUsed = 0;
  totalAmount = 0;
  totalSubsidy = 0;
  totalCompanyWallet = 0;
  totalPackaging = 0;

  orderStatusMapper: any = orderStatusMapper;

  // Chart
  chartOptions!: Highcharts.Options;
  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;
  isShowChart: boolean = false;
  isLoading: boolean = false;

  // Pagination
  pageSize = 10;
  pageIndex = 0;
  estimatedTotal = 0;
  paginatedList: any[] = [];

  // Selected outlet card
  selectedOutletCard: any[] = [];

  // Search & Filters
  searchText = '';
  filterPgName = '';
  filterAppVersion = '';
  filterPlatform = '';
  filterIsPosOrder = '';
  filterOrderStatus = '';

  // Unique values for filter dropdowns
  uniquePgNames: string[] = [];
  uniqueAppVersions: string[] = [];
  uniquePlatforms: string[] = [];
  uniqueOrderStatuses: string[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.headerConfig.defaultOrgId = this.orgAdmin?.orgDetails?._id;
    if (this.orgAdmin) {
      this.isAdmin = this.orgAdmin.role === 'ADMIN';
    }
  }

  async getOutletByFilter(body: any) {
    this.isShowChart = false;
    this.isLoading = true;
    this.resetTotals();
    try {

      const res = await this.apiMainService.fetchAllOutletOrdersbysearchObj(body);
      this.filteredOrderList = res || [];
      this.extractUniqueFilterValues();
      this.applyFilters();
    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
    } finally {
      this.isLoading = false;
    }
  }

  resetTotals() {
    this.totalAmountPaid = 0;
    this.totalWalletUsed = 0;
    this.totalAmount = 0;
    this.totalSubsidy = 0;
    this.totalCompanyWallet = 0;
    this.totalPackaging = 0;
  }

  extractUniqueFilterValues() {
    const pgSet = new Set<string>();
    const versionSet = new Set<string>();
    const platformSet = new Set<string>();
    const statusSet = new Set<string>();

    this.filteredOrderList.forEach(order => {
      if (order.pgName) pgSet.add(order.pgName);
      if (order.appVersion) versionSet.add(String(order.appVersion));
      if (order.deviceInfo?.platform) platformSet.add(order.deviceInfo.platform);
      if (order.orderstatus) statusSet.add(order.orderstatus);
    });

    this.uniquePgNames = Array.from(pgSet).sort();
    this.uniqueAppVersions = Array.from(versionSet).sort();
    this.uniquePlatforms = Array.from(platformSet).sort();
    this.uniqueOrderStatuses = Array.from(statusSet).sort();
  }

  onSearch(searchValue: string) {
    this.searchText = searchValue;
    this.applyFilters();
  }

  applyFilters() {
    let list = this.filteredOrderList;

    // Search
    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      list = list.filter((order: any) =>
        (order.orderNo && order.orderNo.toString().toLowerCase().includes(lowerSearch)) ||
        (order.customerName && order.customerName.toLowerCase().includes(lowerSearch)) ||
        (order.customerPhoneNo && order.customerPhoneNo.toString().includes(lowerSearch)) ||
        (order.customerEmail && order.customerEmail.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter by orderstatus
    if (this.filterOrderStatus) {
      list = list.filter((order: any) => order.orderstatus === this.filterOrderStatus);
    }

    // Filter by pgName
    if (this.filterPgName) {
      list = list.filter((order: any) => order.pgName === this.filterPgName);
    }

    // Filter by appVersion
    if (this.filterAppVersion) {
      list = list.filter((order: any) => String(order.appVersion) === this.filterAppVersion);
    }

    // Filter by platform
    if (this.filterPlatform) {
      list = list.filter((order: any) => order.deviceInfo?.platform === this.filterPlatform);
    }

    // Filter by isPosOrder
    if (this.filterIsPosOrder) {
      const isPOS = this.filterIsPosOrder === 'true';
      list = list.filter((order: any) => !!order.isPosOrder === isPOS);
    }

    this.displayedList = list;
    this.calculateTotals();
    this.pageIndex = 0;
    this.updatePaginatedList();
  }

  calculateTotals() {
    this.resetTotals();
    this.displayedList.forEach(order => {
      this.totalAmountPaid += Number(order.amount) || 0;
      this.totalWalletUsed += Number(order.moneyWalletPointsUsed) || 0;
      this.totalSubsidy += Number(order.subsidyAmount) || 0;
      this.totalCompanyWallet += Number(order.companyWalletPointUsed) || 0;
      this.totalPackaging += Number(order.packagingAmount) || 0;
    });
    this.totalAmount = this.totalWalletUsed + this.totalAmountPaid;
  }

  hasActiveFilters(): boolean {
    return !!(this.filterPgName || this.filterAppVersion || this.filterPlatform || this.filterIsPosOrder || this.filterOrderStatus || this.searchText);
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

  openFilterDialog() {
    const dialogData: OrderFilterDialogData = {
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
      data: dialogData,
      width: '520px',
      panelClass: 'filter-dialog-panel',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterOrderStatus = result.filterOrderStatus;
        this.filterPgName = result.filterPgName;
        this.filterAppVersion = result.filterAppVersion;
        this.filterPlatform = result.filterPlatform;
        this.filterIsPosOrder = result.filterIsPosOrder;
        this.applyFilters();
      }
    });
  }

  clearFilters() {
    this.searchText = '';
    this.filterPgName = '';
    this.filterAppVersion = '';
    this.filterPlatform = '';
    this.filterIsPosOrder = '';
    this.filterOrderStatus = '';
    this.applyFilters();
  }

  updatePaginatedList() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedList = this.displayedList.slice(startIndex, endIndex);
    this.estimatedTotal = this.displayedList.length;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedList();
  }

  async excelExport() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Orders');
    // ------------------------------------------------------------------
    //                      TABLE COLUMN DEFINITIONS
    // ------------------------------------------------------------------
    worksheet.columns = [
      { header: 'Order No', key: 'orderNo', width: 12 },
      { header: 'Token No', key: 'tokenNo', width: 10 },
      { header: 'Order Date', key: 'orderDate', width: 18 },
      { header: 'Status', key: 'status', width: 16 },
      { header: 'Customer Name', key: 'customerName', width: 20 },
      { header: 'Customer Mobile', key: 'customerPhoneNo', width: 16 },
      { header: 'Customer Email', key: 'customerEmail', width: 24 },
      { header: 'Org Name', key: 'orgName', width: 22 },
      { header: 'Cafe Name', key: 'cafeName', width: 18 },
      { header: 'Items', key: 'items', width: 40 },
      { header: 'Item Amount (₹)', key: 'itemAmount', width: 16 },
      { header: 'Packaging (₹)', key: 'packaging', width: 14 },
      { header: 'Subsidy Amount (₹)', key: 'subsidyAmount', width: 18 },
      { header: 'Wallet Used (₹)', key: 'walletUsed', width: 16 },
      { header: 'Company Wallet (₹)', key: 'companyWallet', width: 16 },
      { header: 'Amount Paid (₹)', key: 'amountPaid', width: 16 },
      { header: 'PG Name', key: 'pgName', width: 14 },
      { header: 'App Version', key: 'appVersion', width: 12 },
      { header: 'Platform', key: 'platform', width: 12 },
    ];

    // ------------------------------------------------------------------
    //                   HEADER ROW
    // ------------------------------------------------------------------
    const headerRowIndex = 0;
    const headerRow = worksheet.getRow(headerRowIndex);

    headerRow.values = [
      "",
      ...worksheet.columns.map(c => c.header || "")
    ] as ExcelJS.CellValue[];

    // ------------------------------------------------------------------
    //                         DATA ROWS
    // ------------------------------------------------------------------
    let totalItemAmount = 0;
    let totalPackaging = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalCompanyWallet = 0;
    let totalAmountPaid = 0;

    this.displayedList.forEach(order => {
      const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
      const amountPaid = Number(order.amount) || 0;
      const itemAmount = Number(order.itemAmount) || 0;
      const packaging = Number(order.packagingAmount) || 0;
      const subsidyAmount = Number(order.subsidyAmount) || 0;
      const companyWallet = Number(order.companyWalletPointUsed) || 0;

      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');

      worksheet.addRow({
        orderNo: order.orderNo,
        tokenNo: order.tokenNo || '-',
        orderDate: new Date(order.orderDate).toLocaleString('en-IN'),
        status: this.orderStatusMapper[order.orderstatus] || order.orderstatus,
        customerName: order.customerName,
        customerPhoneNo: order.customerPhoneNo,
        customerEmail: order.customerEmail,
        orgName: order.organizationDetails?.organization_name,
        cafeName: order.cafeteriaDetails?.cafeteria_name,
        items,
        itemAmount,
        packaging,
        subsidyAmount,
        walletUsed,
        companyWallet,
        amountPaid,
        pgName: order.pgName || '-',
        appVersion: order.appVersion || '-',
        platform: order.deviceInfo?.platform || '-',
        isPosOrder: order.isPosOrder ? 'Yes' : 'No',
      });

      totalItemAmount += itemAmount;
      totalPackaging += packaging;
      totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed;
      totalCompanyWallet += companyWallet;
      totalAmountPaid += amountPaid;
    });

    // ------------------------------------------------------------------
    //                          TOTALS ROW
    // ------------------------------------------------------------------
    const totalsRow = worksheet.addRow({
      orderNo: 'Totals',
      itemAmount: totalItemAmount,
      packaging: totalPackaging,
      subsidyAmount: totalSubsidy,
      walletUsed: totalWalletUsed,
      companyWallet: totalCompanyWallet,
      amountPaid: totalAmountPaid,
    });

    totalsRow.font = { bold: true };
    totalsRow.getCell('A').alignment = { horizontal: 'right' };

    // ------------------------------------------------------------------
    //                        TABLE BORDERS
    // ------------------------------------------------------------------
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

    // ------------------------------------------------------------------
    //                      SAVE EXCEL FILE
    // ------------------------------------------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const filename = `outlet_orders_${new Date().toISOString().slice(0, 10)}.xlsx`;
    saveAs(blob, filename);
  }

  downloadPdf() {

    if (!this.displayedList.length) return;

    // ---------------------------------------------------------
    //           TABLE HEADERS
    // ---------------------------------------------------------
    const tableHeaders = [
      { text: 'Order No', bold: true },
      { text: 'Token', bold: true },
      { text: 'Date', bold: true },
      { text: 'Status', bold: true },
      { text: 'Customer Name', bold: true },
      { text: 'Mobile', bold: true },
      { text: 'Email', bold: true },
      { text: 'Items', bold: true },
      { text: 'Item Amt (₹)', bold: true },
      { text: 'Subsidy (₹)', bold: true },
      { text: 'Wallet (₹)', bold: true },
      { text: 'Paid (₹)', bold: true }
    ];

    const body: any[] = [];
    body.push(tableHeaders);

    let totalItemAmount = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalAmountPaid = 0;

    // ---------------------------------------------------------
    //                       DATA ROWS
    // ---------------------------------------------------------
    this.displayedList.forEach(order => {
      const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
      const amountPaid = Number(order.amount) || 0;
      const itemAmount = Number(order.itemAmount) || 0;
      const subsidyAmount = Number(order.subsidyAmount) || 0;

      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');

      body.push([
        order.orderNo || '',
        order.tokenNo || '',
        new Date(order.orderDate).toLocaleString('en-IN') || '',
        this.orderStatusMapper[order.orderstatus] || order.orderstatus || '',
        order.customerName || '',
        order.customerPhoneNo || '',
        order.customerEmail || '',
        items || '',
        itemAmount.toFixed(2),
        subsidyAmount.toFixed(2),
        walletUsed.toFixed(2),
        amountPaid.toFixed(2)
      ]);

      totalItemAmount += itemAmount;
      totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed;
      totalAmountPaid += amountPaid;
    });

    // ---------------------------------------------------------
    //                       TOTALS ROW
    // ---------------------------------------------------------
    body.push([
      { text: 'Totals', bold: true, colSpan: 8, alignment: 'right' },
      {}, {}, {}, {}, {}, {}, {},
      { text: totalItemAmount.toFixed(2), bold: true },
      { text: totalSubsidy.toFixed(2), bold: true },
      { text: totalWalletUsed.toFixed(2), bold: true },
      { text: totalAmountPaid.toFixed(2), bold: true }
    ]);

    // ---------------------------------------------------------
    //                 COMMON HEADER VALUES
    // ---------------------------------------------------------
    const dateStr = new Date().toISOString().slice(0, 10);

    const orgName =
      this.displayedList[0]?.organizationDetails?.organization_name ||
      'All Organizations';

    const cafeteria =
      this.displayedList[0]?.cafeteriaDetails?.cafeteria_name ||
      'All Cafeterias';

    // ---------------------------------------------------------
    //                 PDF DOCUMENT STRUCTURE
    // ---------------------------------------------------------
    const docDefinition: any = {
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],

      content: [
        { text: 'Outlet Orders Report', style: 'header' },
        { text: `Organization: ${orgName}`, style: 'subheader' },
        { text: `Cafeteria: ${cafeteria}`, style: 'subheader' },
        { text: `Generated on: ${dateStr}`, style: 'subheader', margin: [0, 0, 0, 10] },

        {
          table: {
            headerRows: 1,
            widths: [
              40, 35, 70, 55, 80, 60, 90, '*', 60, 55, 55, 55
            ],
            body
          },
          layout: {
            fillColor: (rowIndex: number) => (rowIndex === 0 ? '#2E75B6' : null),
            paddingLeft: () => 3,
            paddingRight: () => 3,
            paddingTop: () => 3,
            paddingBottom: () => 3,
            hLineColor: () => '#999999',
            vLineColor: () => '#999999'
          }
        }
      ],

      styles: {
        header: {
          fontSize: 15,
          bold: true,
          margin: [0, 0, 0, 6]
        },
        subheader: {
          fontSize: 10,
          color: '#555'
        }
      },

      defaultStyle: {
        fontSize: 8,
        color: '#000'
      }
    };

    (pdfMake as any)
      .createPdf(docDefinition)
      .download(`OutletOrders_${dateStr}.pdf`);
  }

  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData();
    } else {
      this.isShowChart = false
    }
  }

  processOrdersData(data: Array<{ orderDate: string; orderstatus: string }>) {
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
    let data: any = this.displayedList;

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

  filterSubmitted(event: any) {
    if (event) {
      const body = {
        outletId: event.outlet_id,
        fromDate: event.date_from,
        toDate: event.date_to,
      }
      this.getOutletByFilter(body);
      this.fromDate = this.convertDate(event.date_from);
      this.toDate = this.convertDate(event.date_to);
    }
  }

  convertDate(dateInput: any): string {
    const date = new Date(dateInput);
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + istOffsetMs);

    const dd = String(istDate.getDate()).padStart(2, '0');
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const yyyy = istDate.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }
}
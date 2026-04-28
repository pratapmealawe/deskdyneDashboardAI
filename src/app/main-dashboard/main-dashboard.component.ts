import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiMainService } from '@service/apiService/apiMain.service';
import * as Highcharts from 'highcharts';
import { MatDialog } from '@angular/material/dialog';
import { MainDashboardFilterDialogComponent } from './main-dashboard-filter-dialog/main-dashboard-filter-dialog.component';
import { orderStatusMapper } from 'src/config/order-status.config';

import * as ExcelJS from 'exceljs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { DailyBulkCardComponent } from '../orders/other-orders/daily-bulk-order/daily-bulk-card/daily-bulk-card.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HighchartsChartModule,
    DailyBulkCardComponent
  ]
})
export class MainDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  orderStatusMapper: any = orderStatusMapper;
  isLoading = false;

  // ── Date Range ──
  dateGroup!: FormGroup;
  maxDate: Date = new Date();

  // ── Raw Data ──
  orgList: any[] = [];
  outletList: any[] = [];
  vendorList: any[] = [];
  allOrders: any[] = [];
  filteredOrders: any[] = [];

  // ── Filters ──
  filterOrg = '';
  filterCity = '';
  filterLocation = '';
  filterStatus = '';

  uniqueOrgs: string[] = [];
  uniqueCities: string[] = [];
  uniqueLocations: string[] = [];
  uniqueOrderStatuses: string[] = [];

  // ── Computed Totals ──
  ordersCount = 0;
  totalAmountPaid = 0;
  totalWalletUsed = 0;
  totalCompanyWallet = 0;
  totalSubsidy = 0;
  totalPackaging = 0;
  totalAmount = 0;

  // ── Pie Chart ──
  chartOptionsPie: Highcharts.Options = {
    chart: { type: 'pie' },
    title: { text: 'Outlet Orders by Status' },
    credits: { enabled: false },
    legend: { enabled: true },
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        return `<div style="padding:6px 8px">
          <div><b>${this.name}</b></div>
          <div>Orders: <b>${Number(this.y || 0).toLocaleString('en-IN')}</b></div>
          <div>Share: <b>${(this.percentage || 0).toFixed(1)}%</b></div>
        </div>`;
      }
    } as Highcharts.TooltipOptions,
    plotOptions: {
      pie: {
        showInLegend: true,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: { enabled: true, format: '{point.name}: {point.y}' },
      },
    },
    series: [{ type: 'pie', name: 'Percentage', data: [] }],
  };
  updateStatusFlag = false;
  oneToOneStatusFlag = true;
  initialStatusData: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog
  ) {
    this.dateGroup = new FormGroup({
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {
    this.loadStaticData();
    this.loadOrders();
  }

  // ── Static Data (no date filter) ──
  async loadStaticData() {
    try {
      const [orgs, outlets, vendors] = await Promise.all([
        this.apiMainService.B2B_fetchFilteredAllOrgs({ countOnly: false }, 1),
        this.apiMainService.searchOutlet({}),
        this.apiMainService.getAllVendorFirms(),
      ]);
      this.orgList = orgs || [];
      this.outletList = outlets || [];
      this.vendorList = vendors || [];
      this.extractFilterOptions(); // Re-extract in case static data loads after orders
    } catch (err) {
      console.error('Error loading static counts:', err);
    }
  }

  // ── Orders (date-filtered) ──
  async loadOrders() {
    this.isLoading = true;
    try {
      const body: any = {
        fromDate: this.dateGroup.value.start?.toISOString(),
        toDate: this.dateGroup.value.end?.toISOString(),
      };
      const orders = await this.apiMainService.fetchAllOutletOrdersbysearchObj(body);
      this.allOrders = orders || [];
      this.extractFilterOptions();
      this.applyFilters();
      this.buildPieChart();
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      this.isLoading = false;
    }
  }

  // ── Filters ──
  extractFilterOptions() {
    // Order Status comes from allOrders (dynamic)
    const statuses = new Set<string>();
    this.allOrders.forEach(o => {
      if (o.orderstatus) statuses.add(o.orderstatus);
    });
    this.uniqueOrderStatuses = Array.from(statuses).sort();

    // Org/City/Location from orgList
    const orgs = new Set<string>();
    const cities = new Set<string>();
    const locations = new Set<string>();

    this.orgList.forEach((org: any) => {
      if (org.organization_name) orgs.add(org.organization_name);
      if (org.cafeteriaList) {
        org.cafeteriaList.forEach((cafe: any) => {
          if (cafe.cafeteria_city) cities.add(cafe.cafeteria_city);
          if (cafe.location) locations.add(cafe.location);
        });
      }
    });

    this.uniqueOrgs = Array.from(orgs).sort();
    this.uniqueCities = Array.from(cities).sort();
    this.uniqueLocations = Array.from(locations).sort();
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(MainDashboardFilterDialogComponent, {
      width: '450px',
      panelClass: 'filter-dialog-panel',
      autoFocus: false,
      data: {
        orgList: this.orgList,
        uniqueOrderStatuses: this.uniqueOrderStatuses,
        currentFilters: {
          org: this.filterOrg,
          city: this.filterCity,
          location: this.filterLocation,
          status: this.filterStatus
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterOrg = result.org;
        this.filterCity = result.city;
        this.filterLocation = result.location;
        this.filterStatus = result.status;
        this.applyFilters();
        this.buildPieChart();
      }
    });
  }

  applyFilters() {
    let orders = [...this.allOrders];

    if (this.filterOrg) {
      orders = orders.filter(o => o.organizationDetails?.organization_name === this.filterOrg);
    }
    if (this.filterCity) {
      orders = orders.filter(o => o.cafeteriaDetails?.cafeteria_city === this.filterCity);
    }
    if (this.filterLocation) {
      orders = orders.filter(o => o.cafeteriaDetails?.location === this.filterLocation);
    }
    if (this.filterStatus) {
      orders = orders.filter(o => o.orderstatus === this.filterStatus);
    }

    this.filteredOrders = orders;
    this.calculateTotals();
  }

  private readonly excludedStatuses = new Set(['cancelled', 'paymentfailed', 'paymentinprogress']);

  calculateTotals() {
    this.totalAmountPaid = 0;
    this.totalWalletUsed = 0;
    this.totalCompanyWallet = 0;
    this.totalSubsidy = 0;
    this.totalPackaging = 0;

    this.filteredOrders.forEach(order => {
      if (this.excludedStatuses.has((order.orderstatus || '').toLowerCase())) return;
      this.totalAmountPaid += Number(order.amount) || 0;
      this.totalWalletUsed += Number(order.moneyWalletPointsUsed) || 0;
      this.totalCompanyWallet += Number(order.companyWalletPointUsed) || 0;
      this.totalSubsidy += Number(order.subsidyAmount) || 0;
      this.totalPackaging += Number(order.packagingAmount) || 0;
    });

    this.totalAmount = this.totalAmountPaid + this.totalWalletUsed;
    this.ordersCount = this.filteredOrders.length;
  }

  get activeFilterCount(): number {
    let count = 0;
    if (this.filterOrg) count++;
    if (this.filterCity) count++;
    if (this.filterLocation) count++;
    if (this.filterStatus) count++;
    return count;
  }

  clearFilters() {
    this.filterOrg = '';
    this.filterCity = '';
    this.filterLocation = '';
    this.filterStatus = '';
    this.applyFilters();
    this.buildPieChart();
  }

  removeFilter(key: string) {
    if (key === 'org') this.filterOrg = '';
    if (key === 'city') this.filterCity = '';
    if (key === 'location') this.filterLocation = '';
    if (key === 'status') this.filterStatus = '';
    this.applyFilters();
    this.buildPieChart();
  }

  // ── Pie Chart ──
  buildPieChart() {
    const statusMap: Record<string, number> = {};

    this.filteredOrders.forEach(o => {
      const s = o.orderstatus || 'unknown';
      statusMap[s] = (statusMap[s] || 0) + 1;
    });

    const formattedData = Object.entries(statusMap)
      .sort((a, b) => b[1] - a[1])
      .map(([status, count]) => ({
        name: this.orderStatusMapper[status] || status,
        y: count,
      }));

    this.initialStatusData = formattedData;

    this.chartOptionsPie = {
      ...this.chartOptionsPie,
      series: [{ type: 'pie', name: 'Orders', data: formattedData }],
    };
    this.updateStatusFlag = true;
  }

  // ── Date Change ──
  changeDate() {
    if (this.dateGroup.value.start && this.dateGroup.value.end) {
      this.loadOrders();
    }
  }


  // ── Exports ──

  async excelExport() {
    if (!this.filteredOrders.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Orders');

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

    // Header Row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };

    // Data Rows
    let totalItemAmount = 0;
    let totalPackaging = 0;
    let totalSubsidy = 0;
    let totalWalletUsed = 0;
    let totalCompanyWallet = 0;
    let totalAmountPaid = 0;

    this.filteredOrders.forEach(order => {
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
      });

      totalItemAmount += itemAmount;
      totalPackaging += packaging;
      totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed;
      totalCompanyWallet += companyWallet;
      totalAmountPaid += amountPaid;
    });

    // Totals Row
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

    // Borders
    worksheet.eachRow((row, rIndex) => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // Write Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `Dashboard_Orders_${new Date().toISOString().slice(0, 10)}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  downloadPdf() {
    if (!this.filteredOrders.length) return;

    const tableHeaders = [
      { text: 'Order No', bold: true },
      { text: 'Date', bold: true },
      { text: 'Status', bold: true },
      { text: 'Customer', bold: true },
      { text: 'Mobile', bold: true },
      { text: 'Org', bold: true },
      { text: 'Items', bold: true },
      { text: 'Amt (₹)', bold: true },
      { text: 'Paid (₹)', bold: true }
    ];

    const body: any[] = [];
    body.push(tableHeaders);

    let totalAmountPaid = 0;

    this.filteredOrders.forEach(order => {
      const amountPaid = Number(order.amount) || 0;
      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count}`)
        .join('; ');

      body.push([
        order.orderNo || '',
        new Date(order.orderDate).toLocaleString('en-IN') || '',
        this.orderStatusMapper[order.orderstatus] || order.orderstatus || '',
        order.customerName || '',
        order.customerPhoneNo || '',
        order.organizationDetails?.organization_name?.slice(0, 15) || '',
        items.slice(0, 50) + (items.length > 50 ? '...' : ''),
        (Number(order.amount) + Number(order.walletUsed || 0)).toFixed(2),
        amountPaid.toFixed(2)
      ]);

      totalAmountPaid += amountPaid;
    });

    body.push([
      { text: 'Totals', bold: true, colSpan: 8, alignment: 'right' },
      {}, {}, {}, {}, {}, {}, {},
      { text: totalAmountPaid.toFixed(2), bold: true }
    ]);

    const docDefinition: any = {
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],
      content: [
        { text: 'Dashboard Orders Report', style: 'header' },
        { text: `Generated on: ${new Date().toLocaleString()}`, style: 'subheader', margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: [50, 70, 60, 80, 60, 70, '*', 50, 50],
            body
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: { fontSize: 16, bold: true, margin: [0, 0, 0, 5] },
        subheader: { fontSize: 10, color: '#555' }
      },
      defaultStyle: { fontSize: 9 }
    };

    (pdfMake as any).createPdf(docDefinition).download(`Dashboard_Orders_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}


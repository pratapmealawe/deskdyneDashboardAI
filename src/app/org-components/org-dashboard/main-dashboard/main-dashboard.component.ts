import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { OrgDashboardFilterDialogComponent } from './org-dashboard-filter-dialog/org-dashboard-filter-dialog.component';

import * as ExcelJS from 'exceljs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

interface DashboardConfig {
  showSaas: boolean;
  showVirtualCafe: boolean;
  showEmpPolls: boolean;
  showAdminDaily: boolean;
}

type OutletOrder = {
  orderDate: string | Date;
  orderstatus?: string;
  itemAmount?: number;
  taxes?: number;
  packagingAmount?: number;
  amount?: number;
  moneyWalletPointsUsed?: number;
  companyWalletPointUsed?: number;
  subsidyAmount?: number;
  itemList?: Array<{ itemName?: string; count?: number; price?: number }>;
  cafeteriaDetails?: { cafeteria_name?: string; cafeteria_city?: string };
  orderNo?: string;
  tokenNo?: string;
  customerName?: string;
  customerPhoneNo?: string;
  customerEmail?: string;
};

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() orgAdmin: any;

  orgDetails: any;
  cafeList: any[] = [];
  orders: OutletOrder[] = [];
  loading = false;
  maxDate: Date = new Date();
  dataFetched = false;

  dateGroup!: FormGroup;

  outletsCount = 0;
  vendorFirmsCount = 0;

  dashboardConfig: DashboardConfig = {
    showSaas: false,
    showVirtualCafe: false,
    showEmpPolls: false,
    showAdminDaily: false,
  };

  // ── Filter state (managed via dialog) ──────────────────────────
  filterCafeteriaId = '';
  filterCity = '';

  fin = {
    totalOrders: 0,
    totalRevenue: 0,
    totalAmountPaid: 0,
    totalWalletUsed: 0,
    totalCompanyWallet: 0,
    totalSubsidy: 0,
    totalPackaging: 0,
    completed: 0,
    cancelled: 0,
  };

  // ── Order Status Pie ────────────────────────────────────────────
  statusPieOptions: Highcharts.Options = {
    chart: { type: 'pie' },
    title: { text: 'Orders by Status' },
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
    plotOptions: { pie: { showInLegend: true, allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, format: '{point.name}: {point.y}' } } },
    series: []
  };
  statusPieUpdateFlag = false;
  statusPieRef?: Highcharts.Chart;
  statusPieCallback: Highcharts.ChartCallbackFunction = (c) => { this.statusPieRef = c; };

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog
  ) {
    this.dateGroup = new FormGroup(
      {
        start: new FormControl<Date | null>(new Date(), { validators: [Validators.required] }),
        end: new FormControl<Date | null>(new Date(), { validators: [Validators.required] }),
      },
      { validators: [this.dateRangeValidator.bind(this)] }
    );
  }

  ngOnInit(): void { this.initFunc(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orgAdmin']?.currentValue) this.initFunc();
  }

  initFunc() {
    this.maxDate = new Date();
    this.maxDate.setHours(23, 59, 59, 999);
    this.getOrgDetailsById();
  }

  private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('start')?.value as Date | null;
    const end = group.get('end')?.value as Date | null;
    if (!start || !end) return { rangeRequired: true };
    if (new Date(end) < new Date(start)) return { endBeforeStart: true };
    if (new Date(start) > this.maxDate) return { inFuture: true };
    return null;
  }

  private toDateStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private normalizeDate(d: Date, isEnd = false): Date {
    const nd = new Date(d);
    if (isEnd) nd.setHours(23, 59, 59, 999);
    else nd.setHours(0, 0, 0, 0);
    return nd;
  }

  async getOrgDetailsById() {
    try {
      const res = await this.apiMainService.getOrg(this.orgAdmin?.orgDetails?._id);
      console.log(res);
      
      this.orgDetails = res;
      this.cafeList = res?.cafeteriaList?.length ? res.cafeteriaList : [];
      this.buildDashboardConfig();
      if (this.orgDetails) {
        this.getVendorFirmsByOrgId();
        if (this.dashboardConfig.showSaas) {
          this.getOutletsCount();
          this.fetchData();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  private buildDashboardConfig() {
    const flags: (keyof DashboardConfig)[] = ['showSaas', 'showVirtualCafe', 'showEmpPolls', 'showAdminDaily'];
    const config: DashboardConfig = { showSaas: false, showVirtualCafe: false, showEmpPolls: false, showAdminDaily: false };
    for (const cafe of this.cafeList) {
      for (const flag of flags) {
        if (cafe[flag]) config[flag] = true;
      }
    }
    this.dashboardConfig = config;
  }

  async getVendorFirmsByOrgId() {
    try {
      const res: any = await this.apiMainService.searchVendorFirmByOrgId({
        orgId: this.orgAdmin?.orgDetails?._id
      });
      this.vendorFirmsCount = Array.isArray(res) ? res.length : 0;
    } catch (err) {
      console.error(err);
    }
  }

  async getOutletsCount() {
    try {
      const res: any = await this.apiMainService.searchOutletByOrgId({
        orgId: this.orgAdmin?.orgDetails?._id,
        countOnly: true
      });
      this.outletsCount = res?.count ?? 0;
    } catch (err) {
      console.error(err);
    }
  }

  buildPayload() {
    const start = this.normalizeDate(this.dateGroup.value.start as Date, false);
    const end = this.normalizeDate(this.dateGroup.value.end as Date, true);

    const payload: any = {
      orgId: this.orgDetails?._id,
      fromDate: this.toDateStr(start),
      toDate: this.toDateStr(end)
    };

    if (this.filterCafeteriaId) {
      const selectedCafe = this.cafeList.find(c => c.cafeteria_id === this.filterCafeteriaId);
      if (selectedCafe?.cafeteria_name) payload.cafeteria_name = selectedCafe.cafeteria_name;
      if (selectedCafe?.cafeteria_city) payload.cafeteria_city = selectedCafe.cafeteria_city;
    } else if (this.filterCity) {
      payload.cafeteria_city = this.filterCity;
    }

    return payload;
  }

  async fetchData() {
    if (this.dateGroup.invalid || !this.orgDetails?._id) return;
    const payload = this.buildPayload();
    this.loading = true;
    try {
      const res: any = await this.apiMainService.fetchOutletOrdersByOrgAndDateRange(payload);
      this.orders = Array.isArray(res) ? res : [];
      this.dataFetched = true;
      this.computeFinancials();
      this.refreshStatusPie();
    } catch (err) {
      console.error('Error fetching outlet orders:', err);
      this.orders = [];
      this.dataFetched = true;
      this.computeFinancials();
      this.refreshStatusPie();
    } finally {
      this.loading = false;
    }
  }

  onEndDateChange() {
    if (this.dateGroup.valid) this.fetchData();
  }

  // ── Filter Dialog ───────────────────────────────────────────────
  openFilterDialog() {
    const dialogRef = this.dialog.open(OrgDashboardFilterDialogComponent, {
      width: '420px',
      panelClass: 'filter-dialog-panel',
      autoFocus: false,
      data: {
        cafeList: this.cafeList,
        currentFilters: {
          cafeteria_id: this.filterCafeteriaId,
          city: this.filterCity
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.filterCafeteriaId = result.cafeteria_id || '';
        this.filterCity = result.city || '';
        this.fetchData();
      }
    });
  }

  removeFilter(key: 'cafeteria' | 'city') {
    if (key === 'cafeteria') this.filterCafeteriaId = '';
    if (key === 'city') { this.filterCity = ''; this.filterCafeteriaId = ''; }
    this.fetchData();
  }

  get activeFilterCount(): number {
    let count = 0;
    if (this.filterCity) count++;
    if (this.filterCafeteriaId) count++;
    return count;
  }

  get selectedCafeName(): string {
    if (!this.filterCafeteriaId) return '';
    return this.cafeList.find(c => c.cafeteria_id === this.filterCafeteriaId)?.cafeteria_name || '';
  }

  private readonly excludedStatuses = new Set(['cancelled', 'paymentfailed', 'paymentinprogress']);

  private computeFinancials() {
    let totalRevenue = 0, totalAmountPaid = 0, totalWalletUsed = 0;
    let totalCompanyWallet = 0, totalSubsidy = 0, totalPackaging = 0;
    let completed = 0, cancelled = 0;

    for (const o of this.orders) {
      const s = (o.orderstatus || '').toLowerCase();
      if (s === 'completed' || s === 'delivered') completed++;
      if (s === 'cancelled') cancelled++;
      if (this.excludedStatuses.has(s)) continue;
      totalAmountPaid += Number(o.amount) || 0;
      totalWalletUsed += Number(o.moneyWalletPointsUsed) || 0;
      totalCompanyWallet += Number(o.companyWalletPointUsed) || 0;
      totalSubsidy += Number(o.subsidyAmount) || 0;
      totalPackaging += Number(o.packagingAmount) || 0;
      totalRevenue += (Number(o.itemAmount) || 0) + (Number(o.taxes) || 0) + (Number(o.packagingAmount) || 0);
    }

    this.fin = {
      totalOrders: this.orders.length,
      totalRevenue: Math.round(totalRevenue),
      totalAmountPaid: Math.round(totalAmountPaid),
      totalWalletUsed: Math.round(totalWalletUsed),
      totalCompanyWallet: Math.round(totalCompanyWallet),
      totalSubsidy: Math.round(totalSubsidy),
      totalPackaging: Math.round(totalPackaging),
      completed,
      cancelled,
    };
  }

  private refreshStatusPie() {
    const agg: Record<string, number> = {};
    for (const o of this.orders) {
      const s = (o.orderstatus || 'Unknown').trim();
      agg[s] = (agg[s] || 0) + 1;
    }
    const data: Highcharts.PointOptionsObject[] = Object.entries(agg)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, y: count } as any));

    this.statusPieOptions = {
      ...this.statusPieOptions,
      series: [{ type: 'pie', name: 'Orders', data }]
    };
    this.statusPieUpdateFlag = true;
    setTimeout(() => this.statusPieRef?.reflow(), 0);
  }

  // ── Exports ─────────────────────────────────────────────────────
  async excelExport() {
    if (!this.orders.length) return;

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
      { header: 'Cafe Name', key: 'cafeName', width: 18 },
      { header: 'Items', key: 'items', width: 40 },
      { header: 'Item Amount (₹)', key: 'itemAmount', width: 16 },
      { header: 'Packaging (₹)', key: 'packaging', width: 14 },
      { header: 'Subsidy (₹)', key: 'subsidyAmount', width: 16 },
      { header: 'Wallet Used (₹)', key: 'walletUsed', width: 16 },
      { header: 'Company Wallet (₹)', key: 'companyWallet', width: 18 },
      { header: 'Amount Paid (₹)', key: 'amountPaid', width: 16 },
    ];

    worksheet.getRow(1).font = { bold: true };

    let totalItemAmount = 0, totalPackaging = 0, totalSubsidy = 0;
    let totalWalletUsed = 0, totalCompanyWallet = 0, totalAmountPaid = 0;

    this.orders.forEach((order: any) => {
      const itemAmount = Number(order.itemAmount) || 0;
      const packaging = Number(order.packagingAmount) || 0;
      const subsidyAmount = Number(order.subsidyAmount) || 0;
      const walletUsed = Number(order.moneyWalletPointsUsed) || 0;
      const companyWallet = Number(order.companyWalletPointUsed) || 0;
      const amountPaid = Number(order.amount) || 0;
      const items = (order.itemList || []).map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`).join('; ');

      worksheet.addRow({
        orderNo: order.orderNo,
        tokenNo: order.tokenNo || '-',
        orderDate: new Date(order.orderDate).toLocaleString('en-IN'),
        status: order.orderstatus,
        customerName: order.customerName,
        customerPhoneNo: order.customerPhoneNo,
        customerEmail: order.customerEmail,
        cafeName: order.cafeteriaDetails?.cafeteria_name,
        items,
        itemAmount, packaging, subsidyAmount, walletUsed, companyWallet, amountPaid,
      });

      totalItemAmount += itemAmount; totalPackaging += packaging; totalSubsidy += subsidyAmount;
      totalWalletUsed += walletUsed; totalCompanyWallet += companyWallet; totalAmountPaid += amountPaid;
    });

    const totalsRow = worksheet.addRow({
      orderNo: 'Totals',
      itemAmount: totalItemAmount, packaging: totalPackaging, subsidyAmount: totalSubsidy,
      walletUsed: totalWalletUsed, companyWallet: totalCompanyWallet, amountPaid: totalAmountPaid,
    });
    totalsRow.font = { bold: true };

    worksheet.eachRow(row => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' }, left: { style: 'thin' },
          bottom: { style: 'thin' }, right: { style: 'thin' }
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `OrgDashboard_Orders_${new Date().toISOString().slice(0, 10)}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  downloadPdf() {
    if (!this.orders.length) return;

    const tableHeaders = [
      { text: 'Order No', bold: true }, { text: 'Date', bold: true },
      { text: 'Status', bold: true }, { text: 'Customer', bold: true },
      { text: 'Mobile', bold: true }, { text: 'Cafe', bold: true },
      { text: 'Items', bold: true }, { text: 'Paid (₹)', bold: true }
    ];

    const body: any[] = [tableHeaders];
    let totalAmountPaid = 0;

    this.orders.forEach((order: any) => {
      const amountPaid = Number(order.amount) || 0;
      const items = (order.itemList || []).map((i: any) => `${i.itemName} x${i.count}`).join('; ');
      body.push([
        order.orderNo || '',
        new Date(order.orderDate).toLocaleString('en-IN'),
        order.orderstatus || '',
        order.customerName || '',
        order.customerPhoneNo || '',
        order.cafeteriaDetails?.cafeteria_name?.slice(0, 15) || '',
        items.slice(0, 50) + (items.length > 50 ? '...' : ''),
        amountPaid.toFixed(2)
      ]);
      totalAmountPaid += amountPaid;
    });

    body.push([
      { text: 'Totals', bold: true, colSpan: 7, alignment: 'right' },
      {}, {}, {}, {}, {}, {},
      { text: totalAmountPaid.toFixed(2), bold: true }
    ]);

    const docDefinition: any = {
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],
      content: [
        { text: 'Org Dashboard Orders Report', style: 'header' },
        { text: `Generated on: ${new Date().toLocaleString()}`, style: 'subheader', margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: [50, 70, 60, 80, 60, 70, '*', 55],
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

    (pdfMake as any).createPdf(docDefinition).download(`OrgDashboard_Orders_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}

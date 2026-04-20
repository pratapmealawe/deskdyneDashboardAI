import { Component, Input, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';

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

import { LocalStorageService } from '@service/local-storage.service';
import { OrgDashboardFilterDialogComponent } from './org-dashboard-filter-dialog/org-dashboard-filter-dialog.component';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { MaterialModule } from 'src/app/material.module';
import { DailyBulkCardComponent } from "src/app/other-orders/daily-bulk-order/daily-bulk-card/daily-bulk-card.component";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule,
    DailyBulkCardComponent
]
})
export class MainDashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() orgAdmin: any;

  orgDetails: any;
  cafeList: any[] = [];
  orders: OutletOrder[] = [];
  dailyOrders: any[] = [];
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

  dailyFin = {
    totalOrders: 0,
    totalRevenue: 0,
    totalAmountPaid: 0,
    totalDeliveryCharge: 0,
    totalTaxes: 0,
    totalPaidToKitchen: 0,
    completed: 0,
    cancelled: 0,
  };

  pollSummary = {
    totalPolls: 0,
    totalParticipants: 0,
    activePolls: 0
  };

  vcSummary = {
    totalOrders: 0,
    totalRevenue: 0,
    completed: 0,
    cancelled: 0
  };

  // ── Drill-down Dialog State ─────────────────────────────────────
  dialogLoading = false;
  dialogOrders: any[] = [];
  dialogStatus = 'placed';
  dialogPage = 1;
  dialogPageSize = 10;
  dialogTotalCount = 0;
  @ViewChild('dailyOrdersDialogTpl') dailyOrdersDialogTpl!: TemplateRef<any>;

  // ── Order Status Pie ────────────────────────────────────────────
  statusPieOptions: Highcharts.Options = {
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
    plotOptions: { pie: { showInLegend: true, allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, format: '{point.name}: {point.y}' } } },
    series: []
  };
  statusPieUpdateFlag = false;
  statusPieRef?: Highcharts.Chart;
  statusPieCallback: Highcharts.ChartCallbackFunction = (c) => { this.statusPieRef = c; };

  // ── Daily Order Status Pie ──────────────────────────────────────
  dailyStatusPieOptions: Highcharts.Options = {
    chart: { type: 'pie' },
    title: { text: 'Daily Orders by Status' },
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
  dailyStatusPieUpdateFlag = false;
  dailyStatusPieRef?: Highcharts.Chart;
  dailyStatusPieCallback: Highcharts.ChartCallbackFunction = (c) => { this.dailyStatusPieRef = c; };

  private setupCharts() {
    const self = this;
    this.dailyStatusPieOptions = {
      ...this.dailyStatusPieOptions,
      plotOptions: {
        pie: {
          showInLegend: true,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: { enabled: true, format: '{point.name}: {point.y}' },
          point: {
            events: {
              click: function () {
                self.openDailyOrdersDialog(this.name.toLowerCase());
              }
            }
          }
        }
      }
    };
  }

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ) {
    this.dateGroup = new FormGroup(
      {
        start: new FormControl<Date | null>(new Date(), { validators: [Validators.required] }),
        end: new FormControl<Date | null>(new Date(), { validators: [Validators.required] }),
      },
      { validators: [this.dateRangeValidator.bind(this)] }
    );
    this.setupCharts();
  }

  ngOnInit(): void { this.initFunc(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orgAdmin']?.currentValue) this.initFunc();
  }

  initFunc() {
    this.maxDate = new Date();
    this.maxDate.setHours(23, 59, 59, 999);
    if (!this.orgAdmin) {
      this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    }
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
      const orgId = this.orgAdmin?.orgDetails?._id;
      if (!orgId) {
        console.warn('getOrgDetailsById: No organization ID found');
        return;
      }
      const res = await this.apiMainService.getOrg(orgId);
      this.orgDetails = res;
      this.cafeList = res?.cafeteriaList?.length ? res.cafeteriaList : [];
      this.buildDashboardConfig();
      if (this.orgDetails) {
        await this.getVendorFirmsByOrgId();
        this.fetchData();
        if (this.dashboardConfig.showSaas) {
          this.getOutletsCount();
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
      const res = await this.apiMainService.searchVendorFirmByOrgId({ orgId: this.orgAdmin?.orgDetails?._id });
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
      org_id: this.orgDetails?._id, // Added for Daily Admin API
      fromDate: this.toDateStr(start),
      toDate: this.toDateStr(end)
    };

    if (this.filterCafeteriaId) {
      const selectedCafe = this.cafeList.find(c => c.cafeteria_id === this.filterCafeteriaId);
      if (selectedCafe?.cafeteria_name) {
        payload.cafeteria_name = selectedCafe.cafeteria_name;
        payload.cafeteria_id = selectedCafe.cafeteria_id;
      }
      if (selectedCafe?.cafeteria_city) {
        payload.cafeteria_city = selectedCafe.cafeteria_city;
      }
    }

    return payload;
  }

  async fetchData() {
    if (this.dateGroup.invalid || !this.orgDetails?._id) return;
    this.loading = true;
    const payload = this.buildPayload();
    try {
      const [outletRes, dailyRes, pollRes, vcRes] = await Promise.all([
        this.dashboardConfig.showSaas ? this.apiMainService.fetchOutletOrdersByOrgAndDateRange(payload) : Promise.resolve([]),
        this.dashboardConfig.showAdminDaily ? this.apiMainService.getAdminDailyBulkOrders(payload) : Promise.resolve([]),
        this.dashboardConfig.showEmpPolls ? this.apiMainService.getAdminEmpPolls(payload) : Promise.resolve([]),
        this.dashboardConfig.showVirtualCafe ? this.apiMainService.fetchFoodOrderPackagebysearchObj(payload) : Promise.resolve([])
      ]);
      
      this.refreshStatusPie();
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      this.orders = [];
      this.dailyOrders = [];
      this.dataFetched = true;
      this.computeFinancials([], []);
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
      width: '440px',
      data: {
        cafeList: this.cafeList,
        selectedCafeteriaId: this.filterCafeteriaId
      },
      panelClass: 'org-filter-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filterCafeteriaId = result.cafeteriaId || '';
        this.fetchData();
      }
    });
  }

  removeFilter() {
    this.filterCafeteriaId = '';
    this.fetchData();
  }

  activeFilterCount(): number {
    return this.filterCafeteriaId ? 1 : 0;
  }

  selectedCafeName(): string {
    const c = this.cafeList.find(c => c.cafeteria_id === this.filterCafeteriaId);
    return c ? c.cafeteria_name : 'Selected Cafe';
  }

  computeFinancials(pollData: any[] = [], vcData: any[] = []) {
    // Outlet Orders
    let revenue = 0, paid = 0, wallet = 0, company = 0, subsidy = 0, packaging = 0;
    let comp = 0, canc = 0;
    for (const o of this.orders) {
      revenue += Number(o.itemAmount) || 0;
      paid += Number(o.amount || o.itemAmount) || 0;
      wallet += Number(o.moneyWalletPointsUsed) || 0;
      company += Number(o.companyWalletPointUsed) || 0;
      subsidy += Number(o.subsidyAmount) || 0;
      packaging += Number(o.packagingAmount) || 0;
      if (o.orderstatus === 'completed' || o.orderstatus === 'delivered') comp++;
      if (o.orderstatus === 'cancelled' || o.orderstatus === 'rejectedbykitchen') canc++;
    }
    this.fin = {
      totalOrders: this.orders.length,
      totalRevenue: revenue,
      totalAmountPaid: paid,
      totalWalletUsed: wallet,
      totalCompanyWallet: company,
      totalSubsidy: subsidy,
      totalPackaging: packaging,
      completed: comp,
      cancelled: canc
    };

    // Daily Orders
    let dRev = 0, dPaid = 0, dDel = 0, dTax = 0, dKitchen = 0;
    let dComp = 0, dCanc = 0;
    for (const o of this.dailyOrders) {
      dRev += Number(o.orderAmount || o.itemAmount) || 0;
      dPaid += Number(o.amount || o.itemAmount) || 0;
      dDel += Number(o.deliveryCharge) || 0;
      dTax += Number(o.taxes) || 0;
      dKitchen += Number(o.amtAfterCommisionPaidToKitchen || o.itemAmount) || 0;
      if (o.orderstatus === 'completed' || o.orderstatus === 'delivered') dComp++;
      if (o.orderstatus === 'cancelled' || o.orderstatus === 'rejectedbykitchen') dCanc++;
    }
    this.dailyFin = {
      totalOrders: this.dailyOrders.length,
      totalRevenue: dRev,
      totalAmountPaid: dPaid,
      totalDeliveryCharge: dDel,
      totalTaxes: dTax,
      totalPaidToKitchen: dKitchen,
      completed: dComp,
      cancelled: dCanc
    };

    // Poll Summary
    let totalParticipants = 0;
    let activePolls = 0;
    if (Array.isArray(pollData)) {
      activePolls = pollData.filter(p => p.isActive !== false).length;
      pollData.forEach(p => {
        totalParticipants += p.employeeList?.length || 0;
      });
    }
    this.pollSummary = {
      totalPolls: pollData?.length || 0,
      totalParticipants: totalParticipants,
      activePolls: activePolls
    };

    // Virtual Cafe Summary (Subscription Packages)
    let vRev = 0, vComp = 0, vCanc = 0;
    if (Array.isArray(vcData)) {
      for (const o of vcData) {
        vRev += Number(o.amount || o.itemAmount) || 0;
        if (o.orderstatus === 'completed' || o.orderstatus === 'delivered' || o.orderstatus === 'active') vComp++;
        if (o.orderstatus === 'cancelled' || o.orderstatus === 'expired') vCanc++;
      }
    }
    this.vcSummary = {
      totalOrders: vcData?.length || 0,
      totalRevenue: vRev,
      completed: vComp,
      cancelled: vCanc
    };
  }

  private refreshStatusPie() {
    // Outlet Orders Pie
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

    // Daily Orders Pie
    const dAgg: Record<string, number> = {};
    for (const o of this.dailyOrders) {
      const s = (o.orderstatus || 'Unknown').trim();
      dAgg[s] = (dAgg[s] || 0) + 1;
    }
    const dData: Highcharts.PointOptionsObject[] = Object.entries(dAgg)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, y: count } as any));

    this.dailyStatusPieOptions = {
      ...this.dailyStatusPieOptions,
      series: [{ type: 'pie', name: 'Daily Orders', data: dData }]
    };
    this.dailyStatusPieUpdateFlag = true;
    setTimeout(() => this.dailyStatusPieRef?.reflow(), 0);
  }

  async openDailyOrdersDialog(status: string) {
    this.dialogStatus = status;
    this.dialogPage = 1;
    this.fetchDialogOrders();
    this.dialog.open(this.dailyOrdersDialogTpl, {
      width: '95vw',
      maxWidth: '1200px',
      height: '90vh',
      panelClass: 'daily-orders-list-dialog'
    });
  }

  async fetchDialogOrders() {
    this.dialogLoading = true;
    try {
      const start = this.normalizeDate(this.dateGroup.value.start as Date, false);
      const end = this.normalizeDate(this.dateGroup.value.end as Date || this.dateGroup.value.start as Date, true);
      const res: any = await this.apiMainService.getBulkDailyOrderList(
        this.dialogStatus,
        start.toISOString(),
        end.toISOString(),
        this.orgAdmin?.orgDetails?._id
      );
      if (res) {
        this.dialogOrders = res.orderList || [];
        this.dialogTotalCount = res.totalCount || 0;
      }
    } catch (err) {
      console.error('Error fetching dialog orders locally:', err);
      this.dialogOrders = [];
      this.dialogTotalCount = 0;
    } finally {
      this.dialogLoading = false;
    }
  }

  onDialogPageChange(event: any) {
    this.dialogPage = event.pageIndex + 1;
    this.dialogPageSize = event.pageSize;
    this.fetchDialogOrders();
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

    if (this.dailyOrders.length) {
      const dailySheet = workbook.addWorksheet('Daily Admin Orders');
      dailySheet.columns = [
        { header: 'Order No', key: 'orderNo', width: 12 },
        { header: 'Order Date', key: 'orderDate', width: 18 },
        { header: 'Delivery Date', key: 'deliveryDate', width: 18 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'Org Name', key: 'orgName', width: 20 },
        { header: 'Cafe Name', key: 'cafeteriaName', width: 18 },
        { header: 'POC Name', key: 'pocName', width: 20 },
        { header: 'Items', key: 'items', width: 40 },
        { header: 'Order Amount (₹)', key: 'orderAmount', width: 16 },
        { header: 'Taxes (₹)', key: 'taxes', width: 12 },
        { header: 'Delivery (₹)', key: 'deliveryCharge', width: 14 },
        { header: 'Total Amount (₹)', key: 'amount', width: 16 },
      ];
      dailySheet.getRow(1).font = { bold: true };
      let dTotalOrder = 0, dTotalTax = 0, dTotalDel = 0, dTotalAmt = 0;
      this.dailyOrders.forEach((order: any) => {
        const orderAmount = Number(order.orderAmount) || 0;
        const taxes = Number(order.taxes) || 0;
        const deliveryCharge = Number(order.deliveryCharge) || 0;
        const amount = Number(order.amount) || 0;
        const items = (order.itemList || []).map((i: any) => `${i.itemName || i.mealConfigName} x${i.count} @₹${i.mealPrice}`).join('; ');

        dailySheet.addRow({
          orderNo: order.orderNo,
          orderDate: new Date(order.orderDate).toLocaleString('en-IN'),
          deliveryDate: new Date(order.deliveryDate).toLocaleString('en-IN'),
          status: order.orderstatus,
          orgName: order.orgName,
          cafeteriaName: order.cafeteriaName,
          pocName: order.pocDetails?.pocName || '-',
          items,
          orderAmount, taxes, deliveryCharge, amount
        });
        dTotalOrder += orderAmount; dTotalTax += taxes; dTotalDel += deliveryCharge; dTotalAmt += amount;
      });
      const dTotalsRow = dailySheet.addRow({
        orderNo: 'Totals',
        orderAmount: dTotalOrder, taxes: dTotalTax, deliveryCharge: dTotalDel, amount: dTotalAmt,
      });
      dTotalsRow.font = { bold: true };
      dailySheet.eachRow(row => {
        row.eachCell(cell => {
          cell.border = {
            top: { style: 'thin' }, left: { style: 'thin' },
            bottom: { style: 'thin' }, right: { style: 'thin' }
          };
        });
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `OrgDashboard_Report_${new Date().toISOString().slice(0, 10)}.xlsx`;
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

    const content: any[] = [
      { text: 'Org Dashboard Report', style: 'header' },
      { text: `Generated on: ${new Date().toLocaleString()}`, style: 'subheader', margin: [0, 0, 0, 10] },
      { text: 'Outlet Orders', style: 'sectionHeader', margin: [0, 10, 0, 5] },
      {
        table: {
          headerRows: 1,
          widths: [50, 70, 60, 80, 60, 70, '*', 55],
          body
        },
        layout: 'lightHorizontalLines'
      }
    ];

    if (this.dailyOrders.length) {
      const dailyHeaders = [
        { text: 'Order No', bold: true }, { text: 'Date', bold: true },
        { text: 'Status', bold: true }, { text: 'Cafe', bold: true },
        { text: 'Items', bold: true }, { text: 'Amount (₹)', bold: true }
      ];
      const dailyBody: any[] = [dailyHeaders];
      let dTotal = 0;
      this.dailyOrders.forEach((order: any) => {
        const amt = Number(order.amount) || 0;
        const items = (order.itemList || []).map((i: any) => `${i.itemName || i.mealConfigName} x${i.count}`).join('; ');
        dailyBody.push([
          order.orderNo || '',
          new Date(order.orderDate).toLocaleString('en-IN'),
          order.orderstatus || '',
          order.cafeteriaName || '',
          items.slice(0, 50) + (items.length > 50 ? '...' : ''),
          amt.toFixed(2)
        ]);
        dTotal += amt;
      });
      dailyBody.push([
        { text: 'Totals', bold: true, colSpan: 5, alignment: 'right' },
        {}, {}, {}, {},
        { text: dTotal.toFixed(2), bold: true }
      ]);
      content.push({ text: 'Daily Admin Orders', style: 'sectionHeader', margin: [0, 20, 0, 5] });
      content.push({
        table: {
          headerRows: 1,
          widths: [50, 70, 60, 70, '*', 60],
          body: dailyBody
        },
        layout: 'lightHorizontalLines'
      });
    }

    const docDefinition: any = {
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],
      content,
      styles: {
        header: { fontSize: 16, bold: true, margin: [0, 0, 0, 5] },
        subheader: { fontSize: 10, color: '#555' },
        sectionHeader: { fontSize: 12, bold: true, color: '#333' }
      },
      defaultStyle: { fontSize: 9 }
    };

    (pdfMake as any).createPdf(docDefinition).download(`OrgDashboard_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}

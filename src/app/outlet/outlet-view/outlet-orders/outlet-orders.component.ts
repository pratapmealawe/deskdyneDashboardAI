import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as Highcharts from 'highcharts';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { orderStatusMapper } from 'src/config/order-status.config';
import { OrderFilterDialogComponent, OrderFilterDialogData } from 'src/app/common-components/order-filter-dialog/order-filter-dialog.component';
import { OutletViewService } from '../outlet-view.service';
import { OutletOrderService } from '@service/outlet-order.service';
import { ToasterService } from '@service/toaster.service';
import { interval, Subscription } from 'rxjs';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { OutletOrderCardComponent } from 'src/app/orders/outlet-orders/outlet-order-card/outlet-order-card.component';

@Component({
  selector: 'app-outlet-orders',
  templateUrl: './outlet-orders.component.html',
  styleUrls: ['./outlet-orders.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    OutletOrderCardComponent,
    OrderFilterDialogComponent
  ]
})
export class OutletOrdersComponent implements OnInit {
  outletObj: any;

  Highcharts: typeof Highcharts = Highcharts;
  orderStatusMapper: any = orderStatusMapper;

  currentoutletOrderList: any[] = [];
  filteredList: any[] = [];
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
  selectedStatus = 'all';
  orderStatusCountObj: any = {
    paymentInprogress: 0,
    paymentFailed: 0,
    completed: 0,
    placed: 0,
    readyOrder: 0
  };
  pollingSub!: Subscription;
  autoRefreshEnabled = true;

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
  totalAmount = 0;
  totalWalletUsed = 0;
  totalAmountPaid = 0;
  totalSubsidy = 0;
  totalCompanyWallet = 0;
  totalPackaging = 0;
  totalTaxes = 0;
  errorMessage = '';

  constructor(
    private apiMainService: ApiMainService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private outletViewService: OutletViewService,
    private outletOrderService: OutletOrderService,
    private toaster: ToasterService,
    private confirmationModalService: ConfirmationModalService
  ) {
    this.dateForm = this.fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    const today = new Date();
    this.dateForm.patchValue({ dateFrom: today, dateTo: today });
    this.outletViewService.outlet$.subscribe(outlet => {
      if (outlet) {
        this.outletObj = outlet;
        this.onSubmit();
      }
    });

    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private startPolling() {
    this.stopPolling();
    this.pollingSub = interval(30000).subscribe(() => {
      if (this.autoRefreshEnabled && !this.loading && this.isTodaySelected()) {
        this.onSubmit();
      }
    });
  }

  private stopPolling() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  public isTodaySelected(): boolean {
    const dateFrom = this.dateForm.get('dateFrom')?.value;
    if (!dateFrom) return false;
    const today = new Date().toISOString().slice(0, 10);
    const selected = new Date(dateFrom).toISOString().slice(0, 10);
    return today === selected;
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
      const res = await this.apiMainService.fetchAllOutletOrdersbysearchObj(body);
      this.currentoutletOrderList = res || [];
      this.updateStatusCounts();
      this.extractUniqueFilterValues();
      this.applyFilters();
    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
      this.currentoutletOrderList = [];
      this.filteredList = [];
      this.pagedOrders = [];
    } finally {
      this.loading = false;
    }
  }

  updateStatusCounts() {
    const counts = {
      paymentInprogress: 0,
      paymentFailed: 0,
      completed: 0,
      placed: 0,
      readyOrder: 0
    };
    this.currentoutletOrderList.forEach((o: any) => {
      if (counts.hasOwnProperty(o.orderstatus)) {
        (counts as any)[o.orderstatus]++;
      }
    });
    this.orderStatusCountObj = counts;
  }

  getLatestOrderStatusList(status: string) {
    this.selectedStatus = status;
    this.applyFilters();
  }

  toggleAutoRefresh() {
    this.autoRefreshEnabled = !this.autoRefreshEnabled;
    if (this.autoRefreshEnabled) {
      this.toaster.success('Auto-refresh enabled');
    } else {
      this.toaster.warning('Auto-refresh disabled');
    }
  }

  excelExport() {
    this.outletOrderService.exportToExcel(this.filteredList);
  }

  downloadPdf() {
    this.outletOrderService.exportToPdf(this.filteredList);
  }

  // ── Filter values ────────────────────────────────────────────

  private extractUniqueFilterValues() {
    const pgSet = new Set<string>();
    const versionSet = new Set<string>();
    const platformSet = new Set<string>();
    const statusSet = new Set<string>();

    this.currentoutletOrderList.forEach((o: any) => {
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
    let list = [...this.currentoutletOrderList];

    // Status Filter (Stats Grid) - Only applies if date range is today or not set
    if (this.selectedStatus && this.selectedStatus !== 'all' && this.isTodaySelected()) {
      list = list.filter((o: any) => o.orderstatus === this.selectedStatus);
    }

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

    this.filteredList = list;
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

    this.filteredList.forEach((o: any) => {
      this.totalAmountPaid += Number(o.amount) || 0;
      this.totalWalletUsed += Number(o.moneyWalletPointsUsed) || 0;
      this.totalSubsidy += Number(o.subsidyAmount) || 0;
      this.totalCompanyWallet += Number(o.companyWalletPointUsed) || 0;
      this.totalPackaging += Number(o.packagingAmount) || 0;
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
    this.filterOrderStatus = '';
    this.filterPgName = '';
    this.filterAppVersion = '';
    this.filterPlatform = '';
    this.filterIsPosOrder = '';
    this.applyFilters();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedOrders();
  }

  private updatePagedOrders() {
    const start = this.pageIndex * this.pageSize;
    this.pagedOrders = this.filteredList.slice(start, start + this.pageSize);
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
    if (!this.filteredList.length) { this.chartOptions = {}; return; }
    const { categories, series } = this.processOrdersData(this.filteredList);

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

  // ── Actions ────────────────────────────────────────────────
  handleOrderAction(event: { type: 'ready' | 'complete' | 'cancel' | 'validate', order: any }) {
    switch (event.type) {
      case 'ready': this.readyOrder(event.order); break;
      case 'complete': this.completeOrder(event.order); break;
      case 'cancel': this.cancelOrder(event.order); break;
      case 'validate': this.validatePayment(event.order); break;
    }
  }

  async validatePayment(order: any) {
    try {
      this.loading = true;
      const res = await this.apiMainService.validateJusPayPaymentTransactionManual({
        foodOrderId: order._id,
        orderType: "outletOrder"
      });

      if (res.status === 'success' || res.status === 'placed' || res.status === true) {
        this.toaster.success(res.message || 'Payment validated successfully');
      } else {
        this.toaster.error("Failed to validate payment transaction");
      }
      this.onSubmit();
    } catch (err) {
      console.error(err);
      this.toaster.error("Error validating payment");
    } finally {
      this.loading = false;
    }
  }

  cancelOrder(order: any) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to cancel this order?',
      callback: this.submitCancellation,
      context: this,
      data: order
    });
  }

  async submitCancellation() {
    try {
      const body = {
        fromOrderNo: true,
        orderNo: this.confirmationModalService.data.orderNo,
        outletId: this.confirmationModalService.data.outletId,
        updatestatus: 'Cancel',
      };
      await this.apiMainService.updatescanOrder(body);
      this.toaster.success("Order Cancelled SuccessFully");
      this.onSubmit();
    } catch (err) {
      console.error('Error cancelling order:', err);
      this.toaster.error("Failed to cancel order");
    }
  }

  readyOrder(order: any) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to mark this order as ready?',
      callback: this.submitReadyOrder,
      context: this,
      data: order
    });
  }

  async submitReadyOrder() {
    try {
      const body = {
        fromOrderNo: true,
        orderNo: this.confirmationModalService.data.orderNo,
        outletId: this.confirmationModalService.data.outletId,
        updatestatus: 'readyOrder',
      };
      await this.apiMainService.updatescanOrder(body);
      this.toaster.success("Order marked as Ready");
      this.onSubmit();
    } catch (err) {
      console.error('Error marking order ready:', err);
      this.toaster.error("Failed to mark order as Ready");
    }
  }

  completeOrder(order: any) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to complete this order?',
      callback: this.submitCompletion,
      context: this,
      data: order
    });
  }

  async submitCompletion() {
    try {
      const body = {
        fromOrderNo: true,
        orderNo: this.confirmationModalService.data.orderNo,
        outletId: this.confirmationModalService.data.outletId,
        updatestatus: 'completed',
      };
      await this.apiMainService.updatescanOrder(body);
      this.toaster.success("Order Completed SuccessFully");
      this.onSubmit();
    } catch (err) {
      console.error('Error completing order:', err);
      this.toaster.error("Failed to complete order");
    }
  }
}

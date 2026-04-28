import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { SendDataToComponent } from '@service/sendDataToComponent.service';
import { interval, Subscription } from 'rxjs';
import { CommonSelectConfig } from '../../common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { OrderFilterDialogComponent, OrderFilterDialogData } from '../../common-components/order-filter-dialog/order-filter-dialog.component';
import { ToasterService } from '@service/toaster.service';
import { LocalStorageService } from '@service/local-storage.service';
import { OutletOrderService } from '@service/outlet-order.service';
import * as Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { OutletOrderCardComponent } from './outlet-order-card/outlet-order-card.component';
import { CommonOutletCafeSelectComponent } from '../../common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-orders',
  templateUrl: './outlet-orders.component.html',
  styleUrls: ['./outlet-orders.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    OutletOrderCardComponent,
    CommonOutletCafeSelectComponent,
    OrderFilterDialogComponent,
    HighchartsChartModule
  ]
})
export class OutletOrdersComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  pollingSub!: Subscription;
  isAdmin: boolean = false;
  orgAdmin: any;

  orderStatusCountObj: any = {
    paymentInprogress: 0,
    paymentFailed: 0,
    completed: 0,
    placed: 0,
    readyOrder: 0
  };

  // Totals
  totalAmount = 0;
  totalWalletUsed = 0;
  totalAmountPaid = 0;
  totalSubsidy = 0;
  totalCompanyWallet = 0;
  totalPackaging = 0;
  totalTaxes = 0;
  orderStatusMapper: any = orderStatusMapper;

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

  selectedStatus = '';
  selectedGroup = ''
  currentoutletOrderList: any = [];
  filteredList: any[] = [];
  orglist: any[] = [];
  cafeList: any[] = [];
  filterObj: any = {
    orgId: '',
    cafeId: '',
    dateFrom: '',
    dateTo: ''
  };

  // Chart
  chartOptions!: Highcharts.Options;
  updateStatusFlag: boolean = false;
  oneToOneStatusFlag: boolean = true;
  isShowChart: boolean = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    public router: Router,
    private apiMainService: ApiMainService,
    private modalService: NgbModal,
    private sendDataToComponent: SendDataToComponent,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private outletOrderService: OutletOrderService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999);

    this.headerConfig.defaultDateFrom = today;
    this.headerConfig.defaultDateTo = tomorrow;
    this.headerConfigAdmin.defaultDateFrom = today;
    this.headerConfigAdmin.defaultDateTo = tomorrow;

    // Remove strict constraints to allow month/range selection
    this.headerConfig.minDate = undefined;
    this.headerConfig.maxDate = undefined;
    this.headerConfigAdmin.minDate = undefined;
    this.headerConfigAdmin.maxDate = undefined;

    this.filterObj.dateFrom = today.toISOString();
    this.filterObj.dateTo = tomorrow.toISOString();

    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (this.orgAdmin) {
      this.isAdmin = this.orgAdmin.role === 'ADMIN';
      this.headerConfig.defaultOrgId = this.orgAdmin?.orgDetails?._id;
      this.headerConfigAdmin.defaultOrgId = this.orgAdmin?.orgDetails?._id;
    }

    this.pollingSub = interval(30_000).subscribe(() => {
      if (this.filterObj.cafeId && !this.filterObj.dateFrom) {
        this.getLatestOrderStatusList(this.selectedStatus || 'placed');
      }
    });
  }

  reloadPage() {
    this.getLatestOrderStatusList('placed');
  }

  filterSubmitted(event: any) {
    if (event) {
      this.filterObj.cafeId = event.outlet_id;
      this.filterObj.dateFrom = event.date_from;
      this.filterObj.dateTo = event.date_to;

      if (this.filterObj.dateFrom) {
        this.getOutletOrdersBySearch();
      } else {
        this.getLatestOrderStatusList('placed');
      }
    }
  }

  async getOutletOrdersBySearch() {
    this.isShowChart = false;
    this.isLoading = true;
    this.errorMessage = '';
    this.currentoutletOrderList = [];
    this.filteredList = [];

    try {
      const body = {
        outletId: this.filterObj.cafeId,
        fromDate: this.filterObj.dateFrom,
        toDate: this.filterObj.dateTo,
      };
      const res = await this.apiMainService.fetchAllOutletOrdersbysearchObj(body);
      this.currentoutletOrderList = res || [];
      this.extractUniqueFilterValues();
      this.applyFilter();
    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
      this.errorMessage = 'Failed to load orders. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  handleOrderAction(event: { type: 'ready' | 'complete' | 'cancel' | 'validate', order: any }) {
    switch (event.type) {
      case 'ready': this.readyOrder(event.order); break;
      case 'complete': this.completeOrder(event.order); break;
      case 'cancel': this.cancelOrder(event.order); break;
      case 'validate': this.validatePayment(event.order); break;
    }
  }

  goBack() {
    this.router.navigate(['/app/home/orders']);
  }

  async getLatestOrderStatusList(status: string) {
    this.selectedGroup = '';
    this.selectedStatus = status;
    this.currentoutletOrderList = [];
    this.filteredList = [];
    this.getOrderStatusList(status);
  }

  async getOrderStatusList(status: string) {
    if (!this.filterObj.cafeId) {
      this.errorMessage = 'Please select an outlet to view orders.';
      return;
    }

    try {
      this.isLoading = true;
      this.errorMessage = '';
      this.filteredList = [];

      const newOrders: any = await this.apiMainService.getAllCurrentOrders(this.filterObj.cafeId);

      if (Array.isArray(newOrders)) {
        this.currentoutletOrderList = newOrders;
        this.extractUniqueFilterValues();
        this.applyFilter();
        this.updateStatusCounts();
      } else {
        this.currentoutletOrderList = [];
        this.errorMessage = 'No data received from server.';
      }

    } catch (error) {
      console.error('error while searching orders ', error);
      this.errorMessage = 'Failed to load orders. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  calculateTotals() {
    this.totalWalletUsed = this.filteredList.reduce((sum, order) =>
      sum + (Number(order.moneyWalletPointsUsed) || 0), 0
    );

    this.totalAmountPaid = this.filteredList.reduce((sum, order) =>
      sum + (Number(order.amount) || 0), 0
    );

    this.totalSubsidy = this.filteredList.reduce((sum, order) =>
      sum + (Number(order.subsidyAmount) || 0), 0
    );

    this.totalCompanyWallet = this.filteredList.reduce((sum, order) =>
      sum + (Number(order.companyWalletPointUsed) || 0), 0
    );

    this.totalPackaging = this.filteredList.reduce((sum, order) =>
      sum + (Number(order.packagingAmount) || 0), 0
    );

    this.totalTaxes = this.filteredList.reduce((sum, order) =>
      sum + (Number(order.taxes) || 0), 0
    );

    this.totalAmount = this.totalWalletUsed + this.totalAmountPaid;
  }

  getGrandTotal(order: any): number {
    return (Number(order.itemAmount) || 0)
      + (Number(order.taxes) || 0)
      + (Number(order.packagingAmount) || 0) + (Number(order.addOnCharges) || 0);
  }

  searchText = '';
  filterPgName = '';
  filterAppVersion = '';
  filterPlatform = '';
  filterIsPosOrder = '';
  filterOrderStatus = '';

  uniquePgNames: string[] = [];
  uniqueAppVersions: string[] = [];
  uniquePlatforms: string[] = [];
  uniqueOrderStatuses: string[] = [];

  onSearch(searchValue: string) {
    this.searchText = searchValue;
    this.applyFilter();
  }

  applyFilter() {
    let list = this.currentoutletOrderList;

    if (this.selectedStatus && this.selectedStatus !== 'all' && !this.filterObj.dateFrom) {
      list = list.filter((order: any) => order.orderstatus === this.selectedStatus);
    }

    if (this.filterOrderStatus) {
      list = list.filter((order: any) => order.orderstatus === this.filterOrderStatus);
    }

    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      list = list.filter((order: any) =>
        (order.orderNo && order.orderNo.toString().toLowerCase().includes(lowerSearch)) ||
        (order.customerName && order.customerName.toLowerCase().includes(lowerSearch)) ||
        (order.customerPhoneNo && order.customerPhoneNo.toString().includes(lowerSearch)) ||
        (order.customerEmail && order.customerEmail.toLowerCase().includes(lowerSearch))
      );
    }

    if (this.filterPgName) {
      list = list.filter((order: any) => order.pgName === this.filterPgName);
    }

    if (this.filterAppVersion) {
      list = list.filter((order: any) => String(order.appVersion) === this.filterAppVersion);
    }

    if (this.filterPlatform) {
      list = list.filter((order: any) => order.deviceInfo?.platform === this.filterPlatform);
    }

    if (this.filterIsPosOrder) {
      const isPOS = this.filterIsPosOrder === 'true';
      list = list.filter((order: any) => !!order.isPosOrder === isPOS);
    }

    this.filteredList = list;
    this.calculateTotals();
  }

  extractUniqueFilterValues() {
    const pgSet = new Set<string>();
    const versionSet = new Set<string>();
    const platformSet = new Set<string>();
    const statusSet = new Set<string>();

    this.currentoutletOrderList.forEach((order: any) => {
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

  get activeFilterCount(): number {
    let count = 0;
    if (this.filterPgName) count++;
    if (this.filterAppVersion) count++;
    if (this.filterPlatform) count++;
    if (this.filterIsPosOrder) count++;
    if (this.filterOrderStatus) count++;
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
      showStatusFilter: !!this.filterObj.dateFrom,
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
        this.filterOrderStatus = result.filterOrderStatus;
        this.applyFilter();
      }
    });
  }

  clearFilters() {
    this.filterPgName = '';
    this.filterAppVersion = '';
    this.filterPlatform = '';
    this.filterIsPosOrder = '';
    this.filterOrderStatus = '';
    this.searchText = '';
    this.applyFilter();
  }

  excelExport() {
    this.outletOrderService.exportToExcel(this.filteredList);
  }

  downloadPdf() {
    this.outletOrderService.exportToPdf(this.filteredList);
  }

  changeDataView() {
    if (!this.isShowChart) {
      this.generateChartData();
    } else {
      this.isShowChart = false;
    }
  }

  generateChartData() {
    const { categories, series } = this.processOrdersData(this.filteredList);

    this.chartOptions = {
      chart: { type: 'column' },
      title: { text: 'Orders by Date and Status', align: 'left' },
      xAxis: { categories: categories },
      yAxis: { allowDecimals: false, min: 0, title: { text: 'Number of Orders' } },
      tooltip: { pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}' },
      plotOptions: { column: { stacking: 'normal' } },
      series: series as Highcharts.SeriesOptionsType[]
    };

    this.isShowChart = true;
    this.updateStatusFlag = true;
  }

  processOrdersData(data: Array<{ orderDate: string; orderstatus: string }>) {
    const dateStatusMap: Record<string, Record<string, number>> = {};

    data.forEach((item) => {
      const dateOnly = new Date(item.orderDate).toISOString().slice(0, 10);
      const status = item.orderstatus;

      if (!dateStatusMap[dateOnly]) dateStatusMap[dateOnly] = {};
      if (!dateStatusMap[dateOnly][status]) dateStatusMap[dateOnly][status] = 0;
      dateStatusMap[dateOnly][status]++;
    });

    const categories = Object.keys(dateStatusMap).sort();
    const statusSet = new Set<string>();
    Object.values(dateStatusMap).forEach(counts => Object.keys(counts).forEach(st => statusSet.add(st)));
    const statuses = Array.from(statusSet).sort();

    const series = statuses.map(status => ({
      name: status,
      data: categories.map(d => dateStatusMap[d]?.[status] ?? 0),
      stack: 'orders'
    }));

    return { categories, series };
  }

  updateStatusCounts() {
    const counts = {
      paymentInprogress: 0,
      paymentFailed: 0,
      completed: 0,
      placed: 0,
      readyOrder: 0
    };

    this.currentoutletOrderList.forEach((order: any) => {
      let status = order.orderstatus;
      if (status === 'autocompleted' || status === 'autoCompleted') {
        status = 'completed';
      }
      if (counts.hasOwnProperty(status)) {
        (counts as any)[status]++;
      }
    });
    this.orderStatusCountObj = counts;
  }

  async validatePayment(order: any) {
    try {
      const res = await this.apiMainService.validateJusPayPaymentTransactionManual({
        foodOrderId: order._id,
        orderType: "outletOrder"
      });

      if (res.status === 'success' || res.status === 'placed' || res.status === true) {
        this.toaster.success(res.message || 'Payment validated successfully');
      } else {
        this.toaster.error("Failed to validate payment transaction");
      }
      this.getLatestOrderStatusList(this.selectedStatus);
    } catch (err) {
      console.error(err);
      this.toaster.error("Error validating payment");
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
      this.toaster.success("Order Cancelled SuccessFully")
      this.getLatestOrderStatusList(this.selectedStatus);
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
      this.getLatestOrderStatusList(this.selectedStatus);
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
      this.getLatestOrderStatusList(this.selectedStatus);
    } catch (err) {
      console.error('Error completing order:', err);
      this.toaster.error("Failed to complete order");
    }
  }

  ngOnDestroy() {
    this.pollingSub?.unsubscribe();
  }
}

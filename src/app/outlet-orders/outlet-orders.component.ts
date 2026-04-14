import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { UtilityService } from 'src/service/utility.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { interval, Subscription } from 'rxjs';
import { CommonSelectConfig } from '../common-outlet-cafe-select/common-outlet-cafe-select.component';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ConfirmationModalService } from '../../service/confirmation-modal.service';
import { OrderFilterDialogComponent, OrderFilterDialogData } from '../common-components/order-filter-dialog/order-filter-dialog.component';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-orders',
  templateUrl: './outlet-orders.component.html',
  styleUrls: ['./outlet-orders.component.scss']
})
export class OutletOrdersComponent implements OnInit, OnDestroy {
  pollingSub!: Subscription;

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
    showDateRange: false,
    disableOrg: false,
    requireAll: true
  }

  selectedStatus = '';
  selectedGroup = ''
  currentOrderStatusList: any = [];
  filteredList: any[] = [];
  orglist: any[] = [];
  cafeList: any[] = [];
  filterObj: any = {
    orgId: '',
    cafeId: '',
  };


  constructor(public router: Router, private apiMainService: ApiMainService, private modalService: NgbModal, private utilityService: UtilityService, private sendDataToComponent: SendDataToComponent, private confirmationModalService: ConfirmationModalService, private toaster: ToasterService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.pollingSub = interval(30_000).subscribe(() => {
      if (this.filterObj.cafeId) {
        this.getLatestOrderStatusList(this.selectedStatus || 'placed');
      }
    });
  }

  reloadPage() {
    this.getLatestOrderStatusList('placed');
  }


  filterSubmitted(event: any) {
    console.log(event);

    if (event) {
      this.filterObj.cafeId = event.outlet_id;
      this.getLatestOrderStatusList('placed');
    }
  }


  goBack() {
    this.router.navigate(['/app/home/orders']);
  }

  async getLatestOrderStatusList(status: string) {
    this.selectedGroup = '';
    this.selectedStatus = status;
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.getOrderStatusList(status);
  }

  isLoading = false;
  errorMessage = '';

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
        this.currentOrderStatusList = newOrders;
        this.extractUniqueFilterValues();
        this.applyFilter();
        this.updateStatusCounts();
      } else {
        // Fallback if response is not array
        this.currentOrderStatusList = [];
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

  getItemAddOnTotal(item: any): number {
    if (!item.addOnsList?.length) return 0;
    return item.addOnsList.reduce((sum: number, addon: any) => {
      return sum + ((addon.addOnPrice ?? addon.addonPrice ?? 0) * (item.count || 1));
    }, 0);
  }

  getGrandTotal(order: any): number {
    return (Number(order.itemAmount) || 0)
      + (Number(order.taxes) || 0)
      + (Number(order.packagingAmount) || 0) + (Number(order.addOnCharges) || 0);
  }

  searchText = '';

  // Filters
  filterPgName = '';
  filterAppVersion = '';
  filterPlatform = '';
  filterIsPosOrder = '';

  // Unique values for filter dropdowns
  uniquePgNames: string[] = [];
  uniqueAppVersions: string[] = [];
  uniquePlatforms: string[] = [];

  // ... (keep existing calculateTotals)

  onSearch(searchValue: string) {
    this.searchText = searchValue;
    this.applyFilter();
  }

  applyFilter() {
    let list = this.currentOrderStatusList;

    // 1. Filter by status
    if (this.selectedStatus && this.selectedStatus !== 'all') {
      list = list.filter((order: any) => order.orderstatus === this.selectedStatus);
    }

    // 2. Filter by search text
    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      list = list.filter((order: any) =>
        (order.orderNo && order.orderNo.toString().toLowerCase().includes(lowerSearch)) ||
        (order.customerName && order.customerName.toLowerCase().includes(lowerSearch)) ||
        (order.customerPhoneNo && order.customerPhoneNo.toString().includes(lowerSearch)) ||
        (order.customerEmail && order.customerEmail.toLowerCase().includes(lowerSearch))
      );
    }

    // 3. Filter by pgName
    if (this.filterPgName) {
      list = list.filter((order: any) => order.pgName === this.filterPgName);
    }

    // 4. Filter by appVersion
    if (this.filterAppVersion) {
      list = list.filter((order: any) => String(order.appVersion) === this.filterAppVersion);
    }

    // 5. Filter by platform
    if (this.filterPlatform) {
      list = list.filter((order: any) => order.deviceInfo?.platform === this.filterPlatform);
    }

    // 6. Filter by isPosOrder
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

    this.currentOrderStatusList.forEach((order: any) => {
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
        this.applyFilter();
      }
    });
  }

  clearFilters() {
    this.filterPgName = '';
    this.filterAppVersion = '';
    this.filterPlatform = '';
    this.filterIsPosOrder = '';
    this.applyFilter();
  }


  updateStatusCounts() {
    const counts = {
      paymentInprogress: 0,
      paymentFailed: 0,
      completed: 0,
      placed: 0,
      readyOrder: 0
    };

    this.currentOrderStatusList.forEach((order: any) => {
      if (counts.hasOwnProperty(order.orderstatus)) {
        (counts as any)[order.orderstatus]++;
      }
    });
    // Also update counts for 'readyOrder' if mapped to 'placed' or keep separate if needed
    // based on existing logic. For now, assuming standard statuses.
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

  setBtnGroup(group: any) {
    this.selectedGroup = group;
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

      // Update local list instead of full reload if possible, 
      // or just reload list
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

  isPaymentValidationVisible(order: any): boolean {
    if (!order) return false;
    const orderDateStr = order.orderDate;
    if (!orderDateStr) return false;

    const orderTime = new Date(orderDateStr).getTime();
    const currentTime = Date.now();
    const diffInMinutes = (currentTime - orderTime) / (1000 * 60);

    return diffInMinutes > 20;
  }

  ngOnDestroy() {
    this.pollingSub?.unsubscribe();
  }
}

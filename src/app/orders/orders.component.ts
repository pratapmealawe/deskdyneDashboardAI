import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { UtilityService } from 'src/service/utility.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { interval, Subscription } from 'rxjs';
import { CommonSelectConfig } from '../common-outlet-cafe-select/common-outlet-cafe-select.component';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ConfirmationModalService } from '../confirmation-modal/confirmation-modal.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  pollingSub!: Subscription;

  orderStatusCountObj: any = {
    paymentInprogress: 0,
    paymentFailed: 0,
    completed: 0,
    placed: 0
  };

  // Totals
  totalAmount = 0;
  totalWalletUsed = 0;
  totalAmountPaid = 0;
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


  constructor(public router: Router, private apiMainService: ApiMainService, private modalService: NgbModal, private utilityService: UtilityService, private sendDataToComponent: SendDataToComponent, private confirmationModalService: ConfirmationModalService, private toaster: ToasterService) {
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
    this.router.navigate(['/home/orders']);
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

    this.totalAmount = this.totalWalletUsed + this.totalAmountPaid;
  }

  searchText = '';

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

    this.filteredList = list;
    this.calculateTotals();
  }


  updateStatusCounts() {
    const counts = {
      paymentInprogress: 0,
      paymentFailed: 0,
      completed: 0,
      placed: 0
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

  async validateJusPayPaymentTransaction(orderId: string) {
    const payload = {
      foodOrderId: orderId,
      orderType: "outletOrder"
    };
    const res = await this.apiMainService.validateJusPayPaymentTransaction(payload)
    if (res.status === 'success' || res.status === 'placed' || res.status === true) {
      this.toaster.success(res.message);
      this.getOrderStatusList(this.selectedStatus);
    } else {
      this.toaster.error("Failed to validate payment transaction");
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
    }
  }

  isPaymentValidationVisible(order: any): boolean {
    if (!order) return false;
    const orderDateStr = order.orderDate;
    if (!orderDateStr) return false;

    const orderTime = new Date(orderDateStr).getTime();
    const currentTime = Date.now();
    const diffInMinutes = (currentTime - orderTime) / (1000 * 60);

    return diffInMinutes > 8;
  }

  ngOnDestroy() {
    this.pollingSub?.unsubscribe();
  }


}

import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ToasterService } from 'src/service/toaster.service';
import { ConfirmationModalService } from '../../service/confirmation-modal.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OrdersDashboardComponent implements OnInit {

  orders: any[] = [];
  originalOrders: any[] = [];
  statusList = ['paymentInprogress', 'placed', 'cancelled', 'readyOrder'];
  selectedStatus = 'paymentInprogress';
  isLoading = false;
  orderStatusMapper: any = orderStatusMapper;

  // Grouping
  ordersByDate: { [key: string]: any[] } = {};
  dateKeys: string[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  async getAllOrders(status?: string) {
    try {
      if (status) {
        this.selectedStatus = status;
      }
      this.isLoading = true;
      // Send single status as array
      const res: any = await this.apiMainService.getOutletOrdersByStatus(this.selectedStatus);

      let fetchedOrders: any[] = [];
      if (Array.isArray(res)) {
        fetchedOrders = res;
      } else if (res && typeof res === 'object') {
        // If api returns grouped object for single status, extract the list
        const values = Object.values(res);
        if (values.length > 0 && Array.isArray(values[0])) {
          fetchedOrders = values[0] as any[];
        } else {
          fetchedOrders = [];
        }
      }

      this.orders = fetchedOrders;
      this.originalOrders = JSON.parse(JSON.stringify(this.orders));

      this.groupOrdersByDate();

    } catch (error) {
      console.error('Error fetching all orders:', error);
      this.orders = [];
      this.originalOrders = [];
      this.dateKeys = [];
      this.ordersByDate = {};
    } finally {
      this.isLoading = false;
    }
  }

  reloadPage() {
    this.getAllOrders();
  }

  onSearch(searchValue: string) {
    if (!searchValue) {
      this.orders = JSON.parse(JSON.stringify(this.originalOrders));
      this.groupOrdersByDate();
      return;
    }

    const lowerSearch = searchValue.toLowerCase();
    this.orders = this.originalOrders.filter((order: any) =>
      (order.orderNo && order.orderNo.toString().toLowerCase().includes(lowerSearch)) ||
      (order.customerName && order.customerName.toLowerCase().includes(lowerSearch)) ||
      (order.customerPhoneNo && order.customerPhoneNo.toString().includes(lowerSearch)) ||
      (order.customerEmail && order.customerEmail.toLowerCase().includes(lowerSearch))
    );
    this.groupOrdersByDate();
  }

  groupOrdersByDate() {
    this.ordersByDate = {};
    this.orders.forEach(order => {
      const dateStr = order.SubmitedDate || order.orderDate;
      const dateKey = dateStr ? new Date(dateStr).toDateString() : 'Unknown Date';

      if (!this.ordersByDate[dateKey]) {
        this.ordersByDate[dateKey] = [];
      }
      this.ordersByDate[dateKey].push(order);
    });

    // Sort dates descending
    this.dateKeys = Object.keys(this.ordersByDate).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });
  }

  bulkCompleteOrders(ordersList: any[]) {
    if (!ordersList || ordersList.length === 0) {
      return;
    }

    this.confirmationModalService.modal({
      msg: `Are you sure you want to complete ${ordersList.length} orders ? `,
      callback: () => this.submitBulkCompletion(ordersList),
      context: this,
      data: null
    });
  }

  async submitBulkCompletion(ordersList: any[]) {
    try {
      this.isLoading = true;
      const orderNos = ordersList.map(o => o.orderNo);
      const payload = { orderNos: orderNos };

      console.log(payload);

      const res = await this.apiMainService.updateBulkOrdersList(payload);
      console.log(res);

      this.toaster.success('Bulk completion successful');
      this.getAllOrders();
    } catch (err) {
      console.error('Bulk completion failed', err);
      this.toaster.error('Failed to complete orders');
    } finally {
      this.isLoading = false;
    }
  }

  bulkPaymentFailedOrders(ordersList: any[]) {
    if (!ordersList || ordersList.length === 0) {
      return;
    }

    this.confirmationModalService.modal({
      msg: `Are you sure you want to mark ${ordersList.length} orders as Payment Failed?`,
      callback: () => this.submitBulkPaymentFailed(ordersList),
      context: this,
      data: null
    });
  }

  async submitBulkPaymentFailed(ordersList: any[]) {
    try {
      this.isLoading = true;
      const orderNos = ordersList.map(o => o.orderNo);
      const payload = { orderNos: orderNos };

      console.log('Bulk Payment Failed Payload:', payload);

      const res = await this.apiMainService.updateBulkOrdersListPaymentFailed(payload);
      console.log('Bulk Payment Failed Response:', res);

      this.toaster.success('Bulk Payment Failed update successful');
      this.getAllOrders();
    } catch (err) {
      console.error('Bulk Payment Failed update error:', err);
      this.toaster.error('Failed to update orders as Payment Failed');
    } finally {
      this.isLoading = false;
    }
  }

  // Payment Validation
  isPaymentValidationVisible(order: any): boolean {
    if (!order) return false;
    const orderDateStr = order.SubmitedDate || order.orderDate;
    if (!orderDateStr) return false;

    const orderTime = new Date(orderDateStr).getTime();
    const currentTime = Date.now();
    // > 30 mins
    const diffInMinutes = (currentTime - orderTime) / (1000 * 60);

    return diffInMinutes > 20;
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
      this.getAllOrders();
    } catch (err) {
      console.error(err);
      this.toaster.error("Error validating payment");
    }
  }
  // Helper to check if date is strictly in the past (before today)
  isPastDate(dateKey: string): boolean {
    if (!dateKey || dateKey === 'Unknown Date') return false;

    const date = new Date(dateKey);
    // Reset time to start of day for accurate comparison
    date.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date.getTime() < today.getTime();
  }
}


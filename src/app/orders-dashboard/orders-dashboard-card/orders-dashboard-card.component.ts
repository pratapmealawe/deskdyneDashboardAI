import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-orders-dashboard-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './orders-dashboard-card.component.html',
  styleUrls: ['./orders-dashboard-card.component.scss']
})
export class OrdersDashboardCardComponent {
  @Input() order: any;
  @Output() refresh = new EventEmitter<void>();
  orderStatusMapper: any = orderStatusMapper;

  constructor(
    private apiMainService: ApiMainService,
    private toaster: ToasterService
  ) {}

  get isPaymentValidationVisible(): boolean {
    if (!this.order) return false;
    const orderDateStr = this.order.SubmitedDate || this.order.orderDate;
    if (!orderDateStr) return false;

    const orderTime = new Date(orderDateStr).getTime();
    const currentTime = Date.now();
    const diffInMinutes = (currentTime - orderTime) / (1000 * 60);
    return diffInMinutes > 20;
  }

  async onValidatePayment() {
    try {
      const payload = {
        foodOrderId: this.order._id,
        orderType: "outletOrder"
      }
      const res = await this.apiMainService.validateJusPayPaymentTransactionManual(payload);
      if (res.status === 'success' || res.status === 'placed' || res.status === true) {
        this.toaster.success(res.message || 'Payment validated successfully');
      } else {
        this.toaster.warning("Failed to validate payment transaction");
      }
      this.refresh.emit();
    } catch (err) {
      console.error(err);
      this.toaster.error("Error validating payment");
    }
  }
}

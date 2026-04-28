import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ToasterService } from '@service/toaster.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-consumption-order-card',
  templateUrl: './consumption-order-card.component.html',
  styleUrls: ['./consumption-order-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ConsumptionOrderCardComponent {
  @Input() order: any;
  @Input() orgAdmin: any;
  @Output() orderUpdated = new EventEmitter<void>();

  imageUrl = environment.imageUrl;
  orderDate: any;
  statusPayload: any;

  constructor(
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  // Admin meta
  private get adminName(): string {
    return (
      this.orgAdmin?.adminDetails?.name ||
      this.orgAdmin?.name ||
      this.orgAdmin?.userName ||
      'Admin'
    );
  }
  private get adminMobile(): string {
    return (
      this.orgAdmin?.adminDetails?.mobile ||
      this.orgAdmin?.phone ||
      this.orgAdmin?.mobile ||
      ''
    );
  }

  downloadOrder(order: any) {
    const url = `${this.imageUrl}${order.imageUrl}`;
    const link = document.createElement('a');
    link.href = url;
    const fileName = order.imageUrl?.split('/').pop() || 'downloaded-file';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  checkAllMealStatus(order: any) {
    return order.mealTypeList.find((data: any) => data.status == 'review');
  }

  /** ===================== APPROVE / CANCEL ===================== */

  showPopupForItemActivation(order: any, status: 'approved' | 'cancelled') {
    if (status === 'cancelled') return;
    
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'approved',
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };
    
    const statusText = `Are you sure you want to approve all menu items?`;
    this.confirmationModalService.modal({
      msg: statusText,
      callback: this.updateConsumptionOrderStatus,
      context: this,
      data: status
    });
  }

  showPopupForSinleItemActivation(order: any, meal: any, status: 'approved' | 'cancelled') {
    if (status === 'cancelled') return;

    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'approved',
      itemId: meal._id,
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };

    const statusText = `Are you sure you want to approve ${meal.itemName} item?`;
    this.confirmationModalService.modal({
      msg: statusText,
      callback: this.updateConsumptionSingleMealStatus,
      context: this,
      data: status
    });
  }

  onCancelItem(order: any, meal: any) {
    const reason = (window.prompt(`Enter cancel reason for "${meal?.itemName}"`) || '').trim();
    if (!reason) return;

    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: 'cancelled',
      itemId: meal._id,
      cancelReason: reason,
      adminName: this.adminName,
      adminMobile: this.adminMobile
    };

    this.updateConsumptionSingleMealStatus();
  }

  async updateConsumptionOrderStatus() {
    try {
      await this.apiMainService.updateConsumptionOrderStatus(
        this.order?.organization_id,
        this.order?.cafeteria_orignal_id,
        this.statusPayload
      );
      this.orderUpdated.emit();
    } catch (err: any) {
      console.error('Error updating order status', err);
    }
  }

  async updateConsumptionSingleMealStatus() {
    try {
      await this.apiMainService.updateConsumptionSingleMeslStatus(
        this.order?.organization_id,
        this.order?.cafeteria_orignal_id,
        this.statusPayload
      );
      this.orderUpdated.emit();
    } catch (err: any) {
      console.error('Error updating single meal status', err);
    }
  }
}

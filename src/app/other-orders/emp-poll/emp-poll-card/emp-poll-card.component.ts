import { Component, Input } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { LocalStorageService } from 'src/service/local-storage.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-emp-poll-card',
  templateUrl: './emp-poll-card.component.html',
  styleUrls: ['./emp-poll-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EmpPollCardComponent {
  @Input() orderInput: any;
  order: any;
  showCreateBtn: boolean = true;
  isCreating: boolean = false;
  totalDeliveryCharge: number = 0;
  showEmployees: boolean = false;

  constructor(
    private apiMainService: ApiMainService,
    private sendDataToComponent: SendDataToComponent,
    private confirmationModalService: ConfirmationModalService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.order = this.orderInput;
    this.checkCutoff(this.order);
  }

  async createOrder() {
    this.confirmationModalService.modal({
      msg: "Are you sure you want to create this order?",
      callback: async () => {
        try {
          this.isCreating = true;
          const adminId = this.localStorageService.getCacheData('ADMIN_ID');
          if (adminId) {
            this.orderInput.actionBy = adminId;
          }
          console.log(this.orderInput);

          await this.apiMainService.createOrderFromPollObj(this.orderInput);
          this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', { reload: true, _id: this.order._id });
        } catch (err) {
          console.error('Error creating order from poll:', err);
        } finally {
          this.isCreating = false;
        }
      },
      context: this
    });
  }

  checkCutoff(order: any) {
    this.totalDeliveryCharge = 0;
    this.showCreateBtn = false;
    if (order && order.mealTypeList && order.mealTypeList.length > 0) {
      let isAnyActive = false;
      const currDate = new Date();
      let orderDate = new Date();
      if (order.deliveryDate) {
        orderDate = new Date(order.deliveryDate);
      } else if (order.pollDate) {
        orderDate = new Date(order.pollDate);
      }

      order.mealTypeList.forEach((item: any) => {
        this.totalDeliveryCharge += (item.deliveryCharge || 0);
        const cutoffDate = new Date(orderDate);
        if (!item.isSameDay) {
          cutoffDate.setDate(cutoffDate.getDate() - 1);
        }
        if (item.cutOffTime) {
          const [hours, minutes] = item.cutOffTime.split(':');
          cutoffDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        }
        if (currDate.getTime() > cutoffDate.getTime()) {
          isAnyActive = true;
        }
      });

      this.showCreateBtn = isAnyActive;
    }
  }

  getTotalItemCount(): number {
    if (!this.order?.mealTypeList) return 0;
    return this.order.mealTypeList.reduce((sum: number, item: any) => sum + (item.count || 0), 0);
  }

  formatTime12Hour(time: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    const m = parseInt(minutes);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    const mStr = m < 10 ? '0' + m : m;
    return `${h}:${mStr} ${ampm}`;
  }
}
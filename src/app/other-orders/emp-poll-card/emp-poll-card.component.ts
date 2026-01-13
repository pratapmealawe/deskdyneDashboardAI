import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-emp-poll-card',
  templateUrl: './emp-poll-card.component.html',
  styleUrls: ['./emp-poll-card.component.scss']
})
export class EmpPollCardComponent {
  @Input() orderInput: any;
  order: any;
  showCreateBtn: boolean = true;

  constructor(
    private apiMainService: ApiMainService,
    private sendDataToComponent: SendDataToComponent,
    private modalService: NgbModal,
    private confirmationModalService: ConfirmationModalService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.order = this.orderInput;
    this.checkCutoff(this.order);
  }

  createOrder() {
    this.confirmationModalService.modal({
      msg: "Are you sure you want to create this order?",
      callback: () => {
        const adminId = this.localStorageService.getCacheData('ADMIN_ID');
        if (adminId) {
          this.orderInput.actionBy = adminId;
        }
        this.apiMainService.createOrderFromPollObj(this.orderInput).then(() => {
          this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', { reload: true, _id: this.order._id });
        }, (err) => {
          console.log(err)
        });
      },
      context: this
    });
  }

  totalDeliveryCharge: number = 0;

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
        // if (order.pollStatus === 'active') {
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
        // }
      });

      this.showCreateBtn = isAnyActive;
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'md', scrollable: true });
  }
}
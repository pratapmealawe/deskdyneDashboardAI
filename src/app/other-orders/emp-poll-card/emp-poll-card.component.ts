import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-emp-poll-card',
  templateUrl: './emp-poll-card.component.html',
  styleUrls: ['./emp-poll-card.component.scss']
})
export class EmpPollCardComponent {
  @ViewChild("showEmployeeList") showEmployeeList: any;
  @Input() orderInput: any;
  @Input() day: any;
  showless: boolean = true;
  order: any;
  editMode: boolean = false;
  showOrderDetails: boolean = true;
  showPOCDetails: boolean = false;
  showKitchenDetails: boolean = false;
  showPaymentDetails: boolean = false;
  showStatusHistory: boolean = false;
  showOrgDetails: boolean = false;
  showCreateBtn: any = false;

  constructor(private apiMainService: ApiMainService, private sendDataToComponent: SendDataToComponent, private modalService: NgbModal,) { }

  ngOnInit() {
    this.checkCutoff(this.orderInput, this.day);
  }

  async createOrder() {
    try {
      await this.apiMainService.createOrderFromPollObj(this.order);
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', { reload: true, _id: this.order._id })
    } catch (error) {
      console.log(error)
    }
  }

  checkCutoff(order: any, day: any) {
    const item = order.itemList[0];
    if (day === 'today' && item.isSameDay) {
      const cutoffDate = new Date();
      const currDate = new Date();
      const endTime = item.cutOffTime.split(":")[0];
      const endTimeMin = parseInt(item.cutOffTime.split(":")[1]);
      cutoffDate.setHours(endTime, endTimeMin, 0, 0);
      if (currDate > cutoffDate) {
        this.showCreateBtn = true;
      }
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  showLess() {
    this.showless = true;
  }

  viewOrder(order: any) {
    this.order = order;
    this.showless = false;
  }
  openshowEmployeeList() {
    this.modalService.open(this.showEmployeeList, { ariaLabelledBy: 'modal-basic-title', size: 'md', backdrop: false, centered: true })
      .result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Model Dismissed`);
      });
  }

}

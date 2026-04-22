import { Component, Input } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';

@Component({
  selector: 'app-customer-past-orders',
  templateUrl: './customer-past-orders.component.html',
  styleUrls: ['./customer-past-orders.component.scss']
})
export class CustomerPastOrdersComponent {
  page = 1;
  nextOn = false;
  @Input() userObj: any;
  orderList: any = [];

  constructor(private apiMainService: ApiMainService) {}

  ngOnInit() {
  }

  async getOrderList() {
    try {
      let orderList =  await this.apiMainService.getCustomerPastOrders(this.userObj._id, this.page)
      if (orderList && orderList.length > 0) {
        this.orderList = [...this.orderList, ...orderList];
        this.nextOn = true;
      } else {
        this.nextOn = false;
      }
    } catch (error) {
    }
  }

  getMore() {
    this.page++;
    this.getOrderList();
  }
}

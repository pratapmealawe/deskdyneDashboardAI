import { Component, Input } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { OutletOrderCardComponent } from '../../../../orders/outlet-orders/outlet-order-card/outlet-order-card.component';

@Component({
  selector: 'app-customer-virtual-cafeteria-orders',
  templateUrl: './customer-virtual-cafeteria-orders.component.html',
  styleUrls: ['./customer-virtual-cafeteria-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, OutletOrderCardComponent]
})
export class CustomerVirtualCafeteriaOrdersComponent {
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

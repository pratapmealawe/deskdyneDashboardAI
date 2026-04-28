import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OutletOrderCardComponent } from '../outlet-orders/outlet-order-card/outlet-order-card.component';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    OutletOrderCardComponent
  ]
})
export class SearchOrderComponent {  
  searchObj: any = {
    orderNo: '',
    fromDate: undefined,
    toDate: undefined,
    orderStatus: [],
    customerName: '',
    customerPhoneNo: undefined,
    outletName: ''
  };
  fromDate: any;
  toDate: any;
  page = 1;
  nextOn = false;
  statusList: any = [];
  orderStatusMapper: any = orderStatusMapper;

  orderList: any = [];
  constructor(public router: Router, private apiMainService: ApiMainService, private toasterService: ToasterService) {
    for (const prop in this.orderStatusMapper) {
      this.statusList.push({ name: this.orderStatusMapper[prop], value: prop, selected: false })
    }
  }

  resetForm() {
    this.searchObj = {
      orderNo: '',
      fromDate: undefined,
      toDate: undefined,
      orderStatus: []
    };
    this.fromDate = undefined;
    this.toDate = undefined;
    this.statusList.forEach((status: any) => {
      status.selected = false;
    })
  }

  searchOrder() {
    if (this.fromDate) {
      if (this.toDate) {
        const fromDate = new Date(this.fromDate);
        const toDate = new Date(this.toDate);
        const timeDiff = toDate.getTime() - fromDate.getTime();
        if (timeDiff >= 0) {
          fromDate.setHours(0, 0, 0, 0);
          toDate.setHours(23, 59, 59, 999);
          this.searchObj.fromDate = fromDate;
          this.searchObj.toDate = toDate;
        } else {
          this.toasterService.error(101);
        }
      } else {
        this.toasterService.error(100);
      }
    }
    const orderStatus: any = [];
    this.statusList.forEach((status: any) => {
      if (status.selected) {
        orderStatus.push(status.value)
      }
    });
    this.searchObj.orderStatus = orderStatus;
    this.page = 1;
    this.orderList = [];
    this.getOrderList();
  }
  async getOrderList() {
    try {
      let orderList: any = [];
      orderList = await this.apiMainService.searchOutletOrderList(this.searchObj, this.page);
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

  goBack() {
    this.router.navigate(['/app/home/orders']);
  }

}

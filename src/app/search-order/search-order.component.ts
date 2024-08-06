import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss']
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
      console.log('error while searching orders ', error);
    }
  }


  getMore() {
    this.page++;
    this.getOrderList();
  }

  goBack() {
    this.router.navigate(['/home/orders']);
  }

}

import { Component, OnInit } from '@angular/core';
import { orderStatusMapper } from 'src/config/order-status.config';
import { OrgAdminDataService } from 'src/service/org-admin-data.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

interface filter {
  fromDate: string,
  toDate: string,
}

@Component({
  selector: 'app-org-orders',
  templateUrl: './org-orders.component.html',
  styleUrls: ['./org-orders.component.scss'],

})
export class OrgOrdersComponent implements OnInit {
  ogorderList: any[] = []
  orderList: any[] = []
  orderStatusMapper: any = orderStatusMapper;
  nextOn = false;
  page: number = 1;
  searchObj: filter = {
    fromDate: "",
    toDate: "",
  }
  constructor(private orgAdminData: OrgAdminDataService, private sendDataToComponent: SendDataToComponent) { }

  ngOnInit(): void {
    this.setInitialDate()
    this.getOrders()
  }

  setInitialDate() {
    const today = new Date()
    this.searchObj.fromDate = today.toISOString().split('T')[0];
    this.searchObj.toDate = today.toISOString().split('T')[0];
  }


  async getOrders() {
    await this.orgAdminData.getFilteredOrders(this.searchObj, this.page).then((data) => {
      this.orderList = data
      this.ogorderList = data
    })
  }

  getMore() {
    this.page++;
    this.getOrders();
  }

  clearFilter() {
    this.orderList = this.ogorderList
  }
}


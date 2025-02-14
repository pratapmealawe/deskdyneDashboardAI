import { Component, OnInit } from '@angular/core';
import { orderStatusMapper } from 'src/config/order-status.config';
import { OrgAdminDataService } from 'src/service/org-admin-data.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

interface Filter {
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-org-orders',
  templateUrl: './org-orders.component.html',
  styleUrls: ['./org-orders.component.scss'],
})
export class OrgOrdersComponent implements OnInit {
  orderList: any[] = [];
  filteredOrderList: any[] = [];
  orderStatusMapper: any = orderStatusMapper;
  nextOn = false;
  page: number = 1;
  searchObj: Filter = {
    fromDate: '',
    toDate: '',
  };

  constructor(
    private orgAdminData: OrgAdminDataService,
    private sendDataToComponent: SendDataToComponent,
    private searchService: SearchFilterService
  ) {}

  ngOnInit(): void {
    this.setInitialDate();
    this.getOrders();
  }

  setInitialDate() {
    const today = new Date();
    this.searchObj.fromDate = today.toISOString().split('T')[0];
    this.searchObj.toDate = today.toISOString().split('T')[0];
  }

  async getOrders() {
    try {
      const data = await this.orgAdminData.getFilteredOrders(
        this.searchObj,
        this.page
      );
      this.nextOn = data.length > 0;
      this.orderList = [...this.orderList, ...data];
      this.filteredOrderList = [...this.orderList];
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  }

  getMore() {
    this.page++;
    this.getOrders();
  }

  searchFilter(e: any) {
    const searchText = e.target.value;

    const config = {
      keys: ['order_id', 'customerId', 'customerName'],
    };

    this.filteredOrderList = this.searchService.searchData(
      this.orderList,
      config,
      searchText
    );
  }
}

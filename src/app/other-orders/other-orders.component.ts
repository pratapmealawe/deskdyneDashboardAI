import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-other-orders',
  templateUrl: './other-orders.component.html',
  styleUrls: ['./other-orders.component.scss']
})
export class OtherOrdersComponent implements OnInit {
  selectedTab: string = 'employeePoll';
  selectedSubTab: string = '';
  page = 1;
  day: any;
  lastPage = 1;
  pageLimit = 200;
  pageFirstEntry = 1;
  pageLastEntry = 1;
  paginationOver = false;
  filteredList: any[] = [];

  OrderTypeViewList = [
    {
      name: 'Employee Poll',
      path: 'employeePoll',
      subTabs: [
        { name: 'Today', path: 'today' },
        { name: 'Tomorrow', path: 'tomorrow' },
        { name: 'Day After Tomorrow', path: 'dayAfterTomorrow' },
      ],
    },
    {
      name: 'Admin Poll',
      path: 'adminPoll',
      subTabs: [
        { name: 'Placed', path: 'placed' },
        { name: 'Accepted', path: 'accepted' },
        { name: 'Preparing', path: 'preparing' },
        { name: 'Ready For Delivery', path: 'readyForDelivery' },
        { name: 'On the Way', path: 'onTheWay' },
        { name: 'Delivered', path: 'delivered' },
        { name: 'Cancelled', path: 'cancelled' },
      ],
    },
    {
      name: 'Bulk Order',
      path: 'bulkOrder',
      subTabs: [
        { name: 'Placed', path: 'placed' },
        { name: 'Accepted', path: 'accepted' },
        { name: 'Preparing', path: 'preparing' },
        { name: 'Ready For Delivery', path: 'readyForDelivery' },
        { name: 'On the Way', path: 'onTheWay' },
        { name: 'Delivered', path: 'delivered' },
        { name: 'Cancelled', path: 'cancelled' },
      ],
    },
  ];

  constructor(private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    this.inItFunc()
  }

  inItFunc() {
    this.selectedSubTab = this.OrderTypeViewList[0].subTabs[0].path;
    this.getEmployeePollList(this.selectedSubTab);
  }

  gotToTab(tab: string): void {
    this.selectedTab = tab;
    this.selectedSubTab = this.OrderTypeViewList.find(item => item.path === this.selectedTab)?.subTabs[0].path || '';
  }

  goToSubTab(subPath: string): void {    
    this.selectedSubTab = subPath;
    this.getEmployeePollList(this.selectedSubTab);
  }

  getSubTab(): any[] {
    const main = this.OrderTypeViewList.find(item => item.path === this.selectedTab);
    return main?.subTabs || [];
  }

  // Fetch Emp Poll
  async getEmployeePollList(day: any) {
    this.day = day;
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
    this.filteredList = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const after1Day = new Date((new Date()).setDate(currentDate.getDate() + 1)).setHours(0, 0, 0, 0);
    const after2Day = new Date((new Date()).setDate(currentDate.getDate() + 2)).setHours(0, 0, 0, 0);
    if (day === 'today') {
      const filteredList = await this.apiMainService.getCafeteriasPollingList({ deliveryStartDate: currentDate, deliveryEndDate: currentDate });
      if (filteredList && filteredList.length > 0) {
        console.log(filteredList)
        this.filteredList = filteredList;
      }
    }
    else if (day === 'tomorrow') {
      const filteredList = await this.apiMainService.getCafeteriasPollingList({ deliveryStartDate: after1Day, deliveryEndDate: after1Day });
      if (filteredList && filteredList.length > 0) {
        this.filteredList = filteredList;
      }
    }
    else {
      const filteredList = await this.apiMainService.getCafeteriasPollingList({ deliveryStartDate: after2Day, deliveryEndDate: after2Day });
      if (filteredList && filteredList.length > 0) {
        this.filteredList = filteredList;
      }
    }
  }

  //  Navigation
  previous(page: number) {
    page--;
    // const status = this.selectedStatus ? true : false;
    // const bulk = this.bulkSelectedStatus ? true : false;
    // const b2b = this.b2bSelectedStatus ? true : false;
    // this.getOrderStatusList(status ? this.selectedStatus : bulk ? this.bulkSelectedStatus : this.b2bSelectedStatus , page, b2b, bulk);
  }
  next(page: number) {
    // page++;
    // const status = this.selectedStatus ? true : false;
    // const bulk = this.bulkSelectedStatus ? true : false;
    // const b2b = this.b2bSelectedStatus ? true : false;
    // this.getOrderStatusList(status ? this.selectedStatus : bulk ? this.bulkSelectedStatus : this.b2bSelectedStatus , page, b2b, bulk);
  }

}

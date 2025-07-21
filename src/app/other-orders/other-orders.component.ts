import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-orders',
  templateUrl: './other-orders.component.html',
  styleUrls: ['./other-orders.component.scss']
})
export class OtherOrdersComponent implements OnInit {
  selectedTab: string = 'employeePoll';
  selectedSubTab: string = '';

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

  constructor() { }

  ngOnInit(): void {
    this.selectedSubTab = this.OrderTypeViewList[0].subTabs[0].path;
  }

  gotToTab(tab: string): void {
    this.selectedTab = tab;
    console.log(this.selectedTab);

    this.selectedSubTab = this.OrderTypeViewList.find(item => item.path === this.selectedTab)?.subTabs[0].path || '';
    
  }

  goToSubTab(subPath: string): void {
    this.selectedSubTab = subPath;
  }

  getSubTab(): any[] {
    const main = this.OrderTypeViewList.find(item => item.path === this.selectedTab);
    return main?.subTabs || [];
  }
}

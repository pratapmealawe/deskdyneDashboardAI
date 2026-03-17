import { Component, OnInit } from '@angular/core';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-other-orders',
  templateUrl: './other-orders.component.html',
  styleUrls: ['./other-orders.component.scss']
})
export class OtherOrdersComponent implements OnInit {
  orderTypeList = [
    { name: 'Admin Orders', path: 'adminOrders', icon: 'receipt_long' },
    { name: 'Bulk Orders', path: 'bulkOrders', icon: 'inventory_2' },
    { name: 'Employee Poll', path: 'employeePoll', icon: 'how_to_vote' },
    { name: 'Virtual Cafeteria', path: 'virtualCafeteria', icon: 'restaurant' }
  ];

  selectedTabIndex = 0;

  constructor(
    private sendDataToComponent: SendDataToComponent,
  ) { }

  ngOnInit(): void {
  }

  onCustomTabChange(index: number): void {
    this.selectedTabIndex = index;
  }

  refreshOrderList() {
    if (this.selectedTabIndex == 0) {
      this.sendDataToComponent.publish('UPDATE_DAILY_BULK_ORDER_PAGE', { reload: true });
    } else if (this.selectedTabIndex == 1) {
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', { reload: true });
    } else if (this.selectedTabIndex == 2) {
      this.sendDataToComponent.publish('UPDATE_EMPLOYEE_POLL_PAGE', { reload: true });
    } else if (this.selectedTabIndex == 3) {
      this.sendDataToComponent.publish('UPDATE_VIRTUAL_CAFETERIA_PAGE', { reload: true });
    }
    // Cross-component refresh logic can be added here if needed
  }
}

import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/service/policy.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { DailyBulkOrderComponent } from './daily-bulk-order/daily-bulk-order.component';
import { BulkOrderComponent } from './bulk-order/bulk-order.component';
import { EmployeePollComponent } from './emp-poll/emp-poll.component';
import { VirtualCafeteriaComponent } from './virtual-cafeteria/virtual-cafeteria.component';

@Component({
  selector: 'app-other-orders',
  templateUrl: './other-orders.component.html',
  styleUrls: ['./other-orders.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    DailyBulkOrderComponent,
    BulkOrderComponent,
    EmployeePollComponent,
    VirtualCafeteriaComponent
  ]
})
export class OtherOrdersComponent implements OnInit {
  orderTypeList = [
    { name: 'Admin Orders', path: 'adminOrders', icon: 'receipt_long', policyKey: 'otherAdminOrders' },
    { name: 'Bulk Orders', path: 'bulkOrders', icon: 'inventory_2', policyKey: 'otherBulkOrders' },
    { name: 'Employee Poll', path: 'employeePoll', icon: 'how_to_vote', policyKey: 'otherEmployeePoll' },
    { name: 'Virtual Cafeteria', path: 'virtualCafeteria', icon: 'restaurant', policyKey: 'otherVirtualCafeteria' }
  ];
  tabPolicy: any;
  selectedTabIndex = 0;

  constructor(
    private sendDataToComponent: SendDataToComponent,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    this.orderTypeList = this.policyService.filterTabsByPolicy(this.orderTypeList);
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

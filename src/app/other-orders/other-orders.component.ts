import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '@service/permission.service';
import { SendDataToComponent } from '@service/sendDataToComponent.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { DailyBulkOrderComponent } from './daily-bulk-order/daily-bulk-order.component';
import { BulkOrderComponent } from './bulk-order/bulk-order.component';
import { EmployeePollComponent } from './emp-poll/emp-poll.component';
import { VirtualCafeteriaComponent } from './virtual-cafeteria/virtual-cafeteria.component';
import { ConsumptionOrderComponent } from './consumption-order/consumption-order.component';

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
    VirtualCafeteriaComponent,
    ConsumptionOrderComponent
  ]
})
export class OtherOrdersComponent implements OnInit {
  orderTypeList = [
    { name: 'Admin Orders', path: 'adminOrders', icon: 'receipt_long', policyKey: 'otherAdminOrders' },
    { name: 'Bulk Orders', path: 'bulkOrders', icon: 'inventory_2', policyKey: 'otherBulkOrders' },
    { name: 'Employee Poll', path: 'employeePoll', icon: 'how_to_vote', policyKey: 'otherEmployeePoll' },
    { name: 'Virtual Cafeteria', path: 'virtualCafeteria', icon: 'restaurant', policyKey: 'otherVirtualCafeteria' },
    { name: 'Consumption Order', path: 'consumptionOrder', icon: 'shopping_bag', policyKey: 'otherConsumptionOrder' }
  ];
  selectedTabIndex = 0;

  constructor(
    private permissionsService: PermissionsService
  ) { }

  ngOnInit(): void {
    this.orderTypeList = this.permissionsService.filterTabsByPolicy(this.orderTypeList);
  }

  onCustomTabChange(index: number): void {
    this.selectedTabIndex = index;
  }
}


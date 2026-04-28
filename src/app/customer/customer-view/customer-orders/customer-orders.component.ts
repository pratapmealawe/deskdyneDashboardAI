import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CustomerOutletOrdersComponent } from './customer-outlet-orders/customer-outlet-orders.component';
import { CustomerVirtualCafeteriaOrdersComponent } from './customer-virtual-cafeteria-orders/customer-virtual-cafeteria-orders.component';
import { CustomerVirtualCafeteriaMealOrdersComponent } from './customer-virtual-cafeteria-meal-orders/customer-virtual-cafeteria-meal-orders.component';
import { CustomerBulkOrdersComponent } from './customer-bulk-orders/customer-bulk-orders.component';
import { CustomerAdminDailyOrdersComponent } from './customer-admin-daily-orders/customer-admin-daily-orders.component';
import { CustomerEmployeePollingComponent } from './customer-employee-polling/customer-employee-polling.component';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CustomerOutletOrdersComponent,
    CustomerVirtualCafeteriaOrdersComponent,
    CustomerVirtualCafeteriaMealOrdersComponent,
    CustomerBulkOrdersComponent,
    CustomerAdminDailyOrdersComponent,
    CustomerEmployeePollingComponent
  ]
})
export class CustomerOrdersComponent implements OnInit {
  userDetails: any;
  selectedSubTab: string = 'outlet';

  constructor() { }

  ngOnInit(): void {}

  selectSubTab(tab: string) {
    this.selectedSubTab = tab;
  }
}

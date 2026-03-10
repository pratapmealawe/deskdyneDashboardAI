import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { MaterialModule } from '../material.module';
import { BulkOrderCardComponent } from './bulk-order-card/bulk-order-card.component';
import { BulkOrderComponent } from './bulk-order/bulk-order.component';
import { DailyBulkCardComponent } from './daily-bulk-card/daily-bulk-card.component';
import { DailyBulkOrderComponent } from './daily-bulk-order/daily-bulk-order.component';
import { EmpPollCardComponent } from './emp-poll-card/emp-poll-card.component';
import { EmployeePollComponent } from './emp-poll/emp-poll.component';
import { OtherOrdersRoutingModule } from './other-orders-routing.module';
import { OtherOrdersComponent } from './other-orders.component';
import { VirtualCafeteriaComponent } from './virtual-cafeteria/virtual-cafeteria.component';
import { OrderSubscriptionPackageCardComponent } from './virtual-cafeteria/order-subscription-package-card/order-subscription-package-card.component';
import { OrderSubscriptionCardComponent } from './virtual-cafeteria/order-subscription-card/order-subscription-card.component';
@NgModule({
  declarations: [
    OtherOrdersComponent,
    EmpPollCardComponent,
    DailyBulkCardComponent,
    BulkOrderCardComponent,
    DailyBulkOrderComponent,
    BulkOrderComponent,
    EmployeePollComponent,
    VirtualCafeteriaComponent,
    OrderSubscriptionPackageCardComponent,
    OrderSubscriptionCardComponent,
  ],
  imports: [
    CommonModule,
    OtherOrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomPipeModule,
    MaterialModule
  ],
  exports: [
    OtherOrdersComponent,
    DailyBulkCardComponent
  ]
})
export class OtherOrdersModule { }

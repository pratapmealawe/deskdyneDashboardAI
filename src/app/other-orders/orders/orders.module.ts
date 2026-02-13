import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderCardModule } from '../order-card/order-card.module';
import { BulkOrderCardModule } from '../bulk-order-card/bulk-order-card.module';
import { OrderSubscriptionCardModule } from '../order-subscription-card/order-subscription-card.module';
import { OrderSubscriptionPackageCardModule } from '../order-subscription-package-card/order-subscription-package-card.module';
import { B2bOrderCardModule } from '../b2b-order-card/b2b-order-card.module';
import { FormsModule } from '@angular/forms';
import { EmpPollCardModule } from '../emp-poll-card/emp-poll-card.module';


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OrderCardModule,
    OrderSubscriptionCardModule,
    OrderSubscriptionPackageCardModule,
    BulkOrderCardModule,
    EmpPollCardModule,
    B2bOrderCardModule,
    FormsModule
  ]
})
export class OrdersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderCardModule } from '../order-card/order-card.module';
import { FormsModule } from '@angular/forms';
import { CommonOutletCafeSelectModule } from '../common-outlet-cafe-select/common-outlet-cafe-select.module';
import { MaterialModule } from '../material.module';
import { OrderFilterDialogModule } from '../common-components/order-filter-dialog/order-filter-dialog.module';


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OrderCardModule,
    FormsModule,
    CommonOutletCafeSelectModule,
    MaterialModule,
    OrderFilterDialogModule,
  ]
})
export class OrdersModule { }

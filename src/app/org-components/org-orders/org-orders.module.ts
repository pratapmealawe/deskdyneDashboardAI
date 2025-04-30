import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgOrdersRoutingModule } from './org-orders-routing.module';
import { OrderCardModule } from 'src/app/order-card/order-card.module';
import { OrgOrdersComponent } from './org-orders.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrgOrdersComponent],
  imports: [
    CommonModule,
    OrgOrdersRoutingModule,
    OrderCardModule,
    FormsModule
  ],
  exports: [OrgOrdersComponent]
})
export class OrgOrdersModule { }

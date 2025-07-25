import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherOrdersRoutingModule } from './other-orders-routing.module';
import { OtherOrdersComponent } from './other-orders.component';
import { EmpPollCardComponent } from './emp-poll-card/emp-poll-card.component';
import { DailyBulkCardComponent } from './daily-bulk-card/daily-bulk-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { BulkOrderCardComponent } from './bulk-order-card/bulk-order-card.component';


@NgModule({
  declarations: [
    OtherOrdersComponent,
    EmpPollCardComponent,
    DailyBulkCardComponent,
    BulkOrderCardComponent
  ],
  imports: [
    CommonModule,
    OtherOrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomPipeModule
  ]
})
export class OtherOrdersModule { }

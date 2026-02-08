import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherOrdersRoutingModule } from './other-orders-routing.module';
import { OtherOrdersComponent } from './other-orders.component';
import { EmpPollCardComponent } from './emp-poll-card/emp-poll-card.component';
import { EmployeeListDialogComponent } from './emp-poll-card/employee-list-dialog.component';
import { DailyBulkCardComponent } from './daily-bulk-card/daily-bulk-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { BulkOrderCardComponent } from './bulk-order-card/bulk-order-card.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    OtherOrdersComponent,
    EmpPollCardComponent,
    EmployeeListDialogComponent,
    DailyBulkCardComponent,
    BulkOrderCardComponent
  ],
  imports: [
    CommonModule,
    OtherOrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomPipeModule,
    MaterialModule
  ]
})
export class OtherOrdersModule { }

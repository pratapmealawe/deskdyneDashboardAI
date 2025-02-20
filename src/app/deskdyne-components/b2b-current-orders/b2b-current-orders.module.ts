import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2bCurrentOrdersRoutingModule } from './b2b-current-orders-routing.module';
import { B2bCurrentOrdersComponent } from './b2b-current-orders.component';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { EmpPollCardModule } from '../emp-poll-card/emp-poll-card.module';


@NgModule({
  declarations: [
    B2bCurrentOrdersComponent
  ],
  imports: [
    CommonModule,
    B2bCurrentOrdersRoutingModule,
    // B2bOrderCardModule,
    // B2bDailyBulkCardModule,
    CustomPipeModule,
    // EmpPollCardModule
  ]
})
export class B2bCurrentOrdersModule { }

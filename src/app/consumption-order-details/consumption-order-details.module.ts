import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumptionOrderDetailsRoutingModule } from './consumption-order-details-routing.module';
import { ConsumptionOrderDetailsComponent } from './consumption-order-details.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ConsumptionOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    ConsumptionOrderDetailsRoutingModule,
    FormsModule,
    MatButtonModule
  ]
})
export class ConsumptionOrderDetailsModule { }

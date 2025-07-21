import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherOrdersRoutingModule } from './other-orders-routing.module';
import { OtherOrdersComponent } from './other-orders.component';


@NgModule({
  declarations: [
    OtherOrdersComponent
  ],
  imports: [
    CommonModule,
    OtherOrdersRoutingModule
  ]
})
export class OtherOrdersModule { }

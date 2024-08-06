import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchOrderRoutingModule } from './search-order-routing.module';
import { SearchOrderComponent } from './search-order.component';
import { OrderCardModule } from '../order-card/order-card.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchOrderComponent
  ],
  imports: [
    CommonModule,
    SearchOrderRoutingModule,
    OrderCardModule,
    FormsModule
  ],
  exports:[
    SearchOrderComponent
  ]
})
export class SearchOrderModule { }

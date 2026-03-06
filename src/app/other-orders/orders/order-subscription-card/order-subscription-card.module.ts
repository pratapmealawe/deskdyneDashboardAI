import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSubscriptionCardComponent } from './order-subscription-card.component';



@NgModule({
  declarations: [
    OrderSubscriptionCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrderSubscriptionCardComponent
  ]
})
export class OrderSubscriptionCardModule { }

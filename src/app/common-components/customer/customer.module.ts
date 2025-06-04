import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { FormsModule } from '@angular/forms';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerPastOrdersComponent } from './customer-past-orders/customer-past-orders.component';
import { OrderCardComponent } from 'src/app/order-card/order-card.component';
import { OrderCardModule } from 'src/app/order-card/order-card.module';
import { CustomerPastMealOrdersComponent } from './customer-past-meal-orders/customer-past-meal-orders.component';
import { CustomerOutletOrdersComponent } from './customer-outlet-orders/customer-outlet-orders.component';
import { CustomerWalletComponent } from './customer-wallet/customer-wallet.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerViewComponent,
    CustomerDetailsComponent,
    CustomerPastOrdersComponent,
    CustomerPastMealOrdersComponent,
    CustomerOutletOrdersComponent,
    CustomerWalletComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    OrderCardModule
  ]
})
export class CustomerModule { }

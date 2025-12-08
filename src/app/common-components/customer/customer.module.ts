import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerPastOrdersComponent } from './customer-past-orders/customer-past-orders.component';
import { OrderCardComponent } from 'src/app/order-card/order-card.component';
import { OrderCardModule } from 'src/app/order-card/order-card.module';
import { CustomerPastMealOrdersComponent } from './customer-past-meal-orders/customer-past-meal-orders.component';
import { CustomerOutletOrdersComponent } from './customer-outlet-orders/customer-outlet-orders.component';
import { CustomerWalletComponent } from './customer-wallet/customer-wallet.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';


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
    ReactiveFormsModule,
    OrderCardModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ],
  exports: [
    CustomerComponent,
  ]
})
export class CustomerModule { }

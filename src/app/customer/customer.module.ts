import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerPastOrdersComponent } from './customer-past-orders/customer-past-orders.component';
import { CustomerPastMealOrdersComponent } from './customer-past-meal-orders/customer-past-meal-orders.component';
import { CustomerOutletOrdersComponent } from './customer-outlet-orders/customer-outlet-orders.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerWalletComponent } from './customer-wallet/customer-wallet.component';
import { WalletTransactionDialogComponent } from './customer-wallet/wallet-transaction-dialog/wallet-transaction-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { BulkWalletUploadDialogComponent } from './bulk-wallet-upload-dialog/bulk-wallet-upload-dialog.component';
import { CustomerCompanyWalletComponent } from './customer-company-wallet/customer-company-wallet.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrderSubscriptionPackageCardComponent } from '../orders/other-orders/virtual-cafeteria/order-subscription-package-card/order-subscription-package-card.component';
import { OutletOrderCardComponent } from '../orders/outlet-orders/outlet-order-card/outlet-order-card.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerViewComponent,
    CustomerDetailsComponent,
    CustomerPastOrdersComponent,
    CustomerPastMealOrdersComponent,
    CustomerOutletOrdersComponent,
    CustomerOrdersComponent,
    CustomerWalletComponent,
    WalletTransactionDialogComponent,
    BulkWalletUploadDialogComponent,
    CustomerCompanyWalletComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OutletOrderCardComponent,
    MaterialModule,
    HighchartsChartModule,
    OrderSubscriptionPackageCardComponent
  ],
  exports: [
    CustomerComponent,
  ]
})
export class CustomerModule { }

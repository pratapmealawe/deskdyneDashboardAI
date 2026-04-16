import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { OutletBillingComponent } from './outlet-billing/outlet-billing.component';
import { VcBillingComponent } from './vc-billing/vc-billing.component';
import { DailyBillingComponent } from './daily-billing/daily-billing.component';
import { BulkBillingComponent } from './bulk-billing/bulk-billing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";
import { DatewiseOrdersDialogComponent } from './datewise-orders-dialog/datewise-orders-dialog.component';
import { MaterialModule } from '../material.module';
import { WalletBillingComponent } from './wallet-billing/wallet-billing.component';
import { CompanyWalletBillingComponent } from './company-wallet-billing/company-wallet-billing.component';

@NgModule({
  declarations: [
    BillingComponent,
    OutletBillingComponent,
    VcBillingComponent,
    DailyBillingComponent,
    BulkBillingComponent,
    WalletBillingComponent,
    CompanyWalletBillingComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonOutletCafeSelectModule,
    DatewiseOrdersDialogComponent
  ],
  exports: [BillingComponent, DatewiseOrdersDialogComponent],
})
export class BillingModule { }

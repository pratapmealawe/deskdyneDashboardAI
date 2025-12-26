import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorPayoutRoutingModule } from './vendor-payout-routing.module';
import { VendorPayoutComponent } from './vendor-payout.component';
import { MaterialModule } from '../material.module';


import { WalletHistoryDialogComponent } from './wallet-history-dialog/wallet-history-dialog.component';
import { WalletTransactionHistoryModule } from '../common-components/wallet-transaction-history/wallet-transaction-history.module';

@NgModule({
  declarations: [
    VendorPayoutComponent,
    WalletHistoryDialogComponent
  ],
  imports: [
    CommonModule,
    VendorPayoutRoutingModule,
    MaterialModule,
    WalletTransactionHistoryModule
  ],
  exports: [VendorPayoutComponent]
})
export class VendorPayoutModule { }

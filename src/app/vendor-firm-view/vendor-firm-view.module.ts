import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorFirmViewRoutingModule } from './vendor-firm-view-routing.module';
import { VendorFirmViewComponent } from './vendor-firm-view.component';
import { VendorDetailsComponent } from '../common-components/vendor-details/vendor-details.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { LedgerDetailsComponent } from './ledger-details/ledger-details.component';
import { WalletTxnDialogComponent } from './wallet-txn-dialog/wallet-txn-dialog.component';

import { VendorReportModule } from "../vendor-report/vendor-report.module";
import { MaterialModule } from '../material.module';
import { VendorDailyReportModule } from "../vendor-daily-report/vendor-daily-report.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalletTransactionHistoryModule } from '../common-components/wallet-transaction-history/wallet-transaction-history.module';

@NgModule({
  declarations: [
    VendorFirmViewComponent,
    VendorDetailsComponent,
    WalletDetailsComponent,
    LedgerDetailsComponent,
    WalletTxnDialogComponent,
  ],
  imports: [
    CommonModule,
    VendorFirmViewRoutingModule,
    MaterialModule,
    VendorReportModule,
    VendorDailyReportModule,
    FormsModule,
    VendorDailyReportModule,
    FormsModule,
    ReactiveFormsModule,
    WalletTransactionHistoryModule
  ],
  exports: [VendorFirmViewComponent]
})
export class VendorFirmViewModule { }

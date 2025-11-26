import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorFirmViewRoutingModule } from './vendor-firm-view-routing.module';
import { VendorFirmViewComponent } from './vendor-firm-view.component';
import { VendorDetailsComponent } from '../common-components/vendor-details/vendor-details.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { LedgerDetailsComponent } from './ledger-details/ledger-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { WalletTxnDialogComponent } from './wallet-txn-dialog/wallet-txn-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { VendorReportModule } from "../vendor-report/vendor-report.module";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VendorDailyReportModule } from "../vendor-daily-report/vendor-daily-report.module";

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
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    VendorReportModule,
    VendorDailyReportModule
],
  exports: [VendorFirmViewComponent]
})
export class VendorFirmViewModule { }

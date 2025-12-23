import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletTransactionHistoryComponent } from './wallet-transaction-history.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        WalletTransactionHistoryComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    exports: [
        WalletTransactionHistoryComponent
    ]
})
export class WalletTransactionHistoryModule { }

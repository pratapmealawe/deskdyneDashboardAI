import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { WalletTransactionHistoryComponent } from '../../vendor-firm/vendor-firm-view/wallet-transaction-history/wallet-transaction-history.component';

@Component({
    selector: 'app-wallet-history-dialog',
    templateUrl: './wallet-history-dialog.component.html',
    styleUrls: ['./wallet-history-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, MaterialModule, WalletTransactionHistoryComponent]
})
export class WalletHistoryDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<WalletHistoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { vendorFirmInfo: any }
    ) { }

    close() {
        this.dialogRef.close();
    }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-wallet-history-dialog',
    templateUrl: './wallet-history-dialog.component.html',
    styleUrls: ['./wallet-history-dialog.component.scss']
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

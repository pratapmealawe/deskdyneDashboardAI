import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

export interface WalletTxnDialogData {
  vendorFirmId: string;
  kind: 'Credit' | 'Debit';
}

export interface WalletTxnDialogResult {
  success: boolean;
}


@Component({
  selector: 'app-wallet-txn-dialog',
  templateUrl: './wallet-txn-dialog.component.html',
  styleUrls: ['./wallet-txn-dialog.component.scss']
})
export class WalletTxnDialogComponent {
form: FormGroup;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WalletTxnDialogData,
    private dialogRef: MatDialogRef<WalletTxnDialogComponent, WalletTxnDialogResult>,
    private fb: FormBuilder,
    private api: ApiMainService
  ) {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      remark: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  onClose() {
    this.dialogRef.close({ success: false });
  }

  async onSubmit() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    const amt = Number(this.form.value.amount);
    const remark = String(this.form.value.remark || '').trim();

    try {
      // --- Adjust this to your API contract ---
      // Option A: single endpoint with type
      const payload = {
        vendorFirmId: this.data.vendorFirmId,
        transactionType: this.data.kind,           // 'Credit' | 'Debit'
        transaction_amount: +amt.toFixed(2),
        remark
      };
      
      await this.api.creditOrDebitVendorWallet(payload);
      this.dialogRef.close({ success: true });
    } catch (e) {
      console.error('Failed to save wallet transaction', e);
      this.dialogRef.close({ success: false });
    } finally {
      this.loading = false;
    }
  }
}

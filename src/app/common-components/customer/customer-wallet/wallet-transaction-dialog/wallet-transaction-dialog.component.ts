import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-wallet-transaction-dialog',
    templateUrl: './wallet-transaction-dialog.component.html',
    styleUrls: ['./wallet-transaction-dialog.component.scss']
})
export class WalletTransactionDialogComponent implements OnInit {
    form: FormGroup;
    actionType: 'add' | 'deduct';
    customerName: string;

    walletTypes = [
        { value: 'others', viewValue: 'Others' },
        { value: 'billing', viewValue: 'Billing' },
        { value: 'complimentary', viewValue: 'Complimentary' }
    ];

    constructor(
        private dialogRef: MatDialogRef<WalletTransactionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) {
        this.actionType = data.actionType;
        this.customerName = data.customerName;

        this.form = this.fb.group({
            amount: [null, [Validators.required, Validators.min(1)]],
            walletType: ['others', Validators.required],
            remark: ['', Validators.required]
        });
    }

    ngOnInit(): void {
    }

    submit() {
        if (this.form.valid) {
            this.dialogRef.close({
                ...this.form.value,
                success: true
            });
        } else {
            this.form.markAllAsTouched();
        }
    }

    close() {
        this.dialogRef.close();
    }
}

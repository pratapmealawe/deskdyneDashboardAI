import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { orderStatusMapper } from 'src/config/order-status.config';

export interface OrderFilterDialogData {
    // Current values
    filterOrderStatus: string;
    filterPgName: string;
    filterAppVersion: string;
    filterPlatform: string;
    filterIsPosOrder: string;
    // Available options
    uniqueOrderStatuses: string[];
    uniquePgNames: string[];
    uniqueAppVersions: string[];
    uniquePlatforms: string[];
    // Feature flags
    showStatusFilter?: boolean;
}

export interface OrderFilterDialogResult {
    filterOrderStatus: string;
    filterPgName: string;
    filterAppVersion: string;
    filterPlatform: string;
    filterIsPosOrder: string;
}

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-order-filter-dialog',
    templateUrl: './order-filter-dialog.component.html',
    styleUrls: ['./order-filter-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule]
})
export class OrderFilterDialogComponent {
    orderStatusMapper: any = orderStatusMapper;

    // Local copies for editing
    filterOrderStatus: string;
    filterPgName: string;
    filterAppVersion: string;
    filterPlatform: string;
    filterIsPosOrder: string;

    showStatusFilter: boolean;

    constructor(
        private dialogRef: MatDialogRef<OrderFilterDialogComponent, OrderFilterDialogResult>,
        @Inject(MAT_DIALOG_DATA) public data: OrderFilterDialogData
    ) {
        this.filterOrderStatus = data.filterOrderStatus || '';
        this.filterPgName = data.filterPgName || '';
        this.filterAppVersion = data.filterAppVersion || '';
        this.filterPlatform = data.filterPlatform || '';
        this.filterIsPosOrder = data.filterIsPosOrder || '';
        this.showStatusFilter = data.showStatusFilter !== false;
    }

    get activeCount(): number {
        let count = 0;
        if (this.filterOrderStatus) count++;
        if (this.filterPgName) count++;
        if (this.filterAppVersion) count++;
        if (this.filterPlatform) count++;
        if (this.filterIsPosOrder) count++;
        return count;
    }

    clearAll() {
        this.filterOrderStatus = '';
        this.filterPgName = '';
        this.filterAppVersion = '';
        this.filterPlatform = '';
        this.filterIsPosOrder = '';
    }

    apply() {
        this.dialogRef.close({
            filterOrderStatus: this.filterOrderStatus,
            filterPgName: this.filterPgName,
            filterAppVersion: this.filterAppVersion,
            filterPlatform: this.filterPlatform,
            filterIsPosOrder: this.filterIsPosOrder,
        });
    }

    cancel() {
        this.dialogRef.close();
    }
}

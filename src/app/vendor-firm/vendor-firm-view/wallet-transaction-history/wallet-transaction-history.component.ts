import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiMainService } from '@service/apiService/apiMain.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export interface VendorTransaction {
    _id?: string;
    transactionType: 'Debit' | 'Credit' | 'Transfer_SubSidy_To_Wallet' | 'Transfer_daily_To_Wallet' | 'Transfer_wallet_To_bank_manual' | 'Transfer_wallet_To_bank_auto' | 'Transfer_failed_refund' | string;
    transaction_amount: number;
    created_at: string | Date;
    updated_at?: string | Date;
    remark?: string;
    walletPreviousBalance?: number;
    status?: 'Initiated' | 'Pending' | 'Failed' | 'Review_With_Bank' | 'Success' | 'Refund' | string;
    payout_id?: string;
    fund_id?: string;
    ledgerId?: string;
    mode?: string;
    vendorFirmName?: string;
    vendorFirmPhoneNo?: string;
    vendorFirmEmail?: string;
    vendorFirmUniqueId?: string;
    vendorFirmId?: string;
    orderType?: 'bank' | 'outlet' | 'daily' | 'bulk' | string;
}

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-wallet-transaction-history',
    templateUrl: './wallet-transaction-history.component.html',
    styleUrls: ['./wallet-transaction-history.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ]
})
export class WalletTransactionHistoryComponent implements OnChanges, OnInit, OnDestroy {
    @Input() vendorFirmInfo: any;
    @Input() isDialog: boolean = false;

    transactionHistoryList: VendorTransaction[] = [];

    // Filters
    dateRange: { start: Date | null; end: Date | null } = { start: null, end: null };
    typeFilter: '' | 'Credit' | 'Debit' = '';

    // Paging
    pageIndex = 0;
    pageSize = 10;
    estimatedTotal = 0;
    paginationOver = false;

    // State
    loading = false;
    refreshInterval: any;

    constructor(private snackBar: MatSnackBar, private apiMainService: ApiMainService) { }

    ngOnChanges(changes: SimpleChanges): void {
        const today = new Date();
        this.dateRange = { start: today, end: today }
        if (changes['vendorFirmInfo'] && this.vendorFirmInfo) {
            this.loadPage(true);
        }

    }

    ngOnInit(): void {
        const today = new Date();
        this.dateRange = { start: today, end: today };
        if (this.vendorFirmInfo) {
            this.loadPage(true);
        }

    }

    ngOnDestroy(): void {
        if (this.refreshInterval) {
            clearTimeout(this.refreshInterval);
        }
    }

    // ——— Public UI handlers ———
    onDateRangeChange() {
    }

    applyFilters(reset = true) {
        this.loadPage(reset);
    }

    clearFilters() {
        this.dateRange = { start: null, end: null };
        this.typeFilter = '';
        this.loadPage(true);
    }

    onPageChange(e: PageEvent) {
        this.pageIndex = e.pageIndex;
        this.pageSize = e.pageSize;
        this.loadPage(false);
    }

    private buildQueryBody() {
        const { start, end } = this.dateRange;

        const toISTBoundISO = (d: Date, endOfDay = false) => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const time = endOfDay ? '23:59:59.999' : '00:00:00.000';
            return new Date(`${y}-${m}-${day}T${time}+05:30`).toISOString();
        };

        const fromDate = start ? toISTBoundISO(start, false) : undefined;
        const toDate = end ? toISTBoundISO(end, true) : undefined;

        const body: any = {
            vendorFirmId: this.isDialog ? this.vendorFirmInfo.vendorFirmId : this.vendorFirmInfo._id,
            page: this.pageIndex + 1,
            limit: this.pageSize,
        };

        if (fromDate) body.fromDate = fromDate;
        if (toDate) body.toDate = toDate;
        if (this.typeFilter) body.transactionType = this.typeFilter;

        return body;
    }

    public async loadPage(reset = false) {
        if (reset) {
            this.pageIndex = 0;
            this.paginationOver = false;
        }

        this.loading = true;
        try {
            const body = this.buildQueryBody();


            const response: any = await this.apiMainService.getVendorTransactionByFirmAndTypeAndDate(body);

            let rows: VendorTransaction[] = [];
            let totalFromApi: number | undefined;

            if (response && Array.isArray(response.data)) {
                rows = response.data;
                totalFromApi = Number(response.total ?? NaN);
            } else if (Array.isArray(response)) {
                // Fallback to old behavior (array only)
                rows = response;
            }

            this.transactionHistoryList = rows ?? [];

            // If server gave us a real total—use it; else estimate length for paginator UX
            if (Number.isFinite(totalFromApi)) {
                this.estimatedTotal = totalFromApi!;
                this.paginationOver = (this.pageIndex + 1) * this.pageSize >= this.estimatedTotal;
            } else {
                // Estimate when no total is available
                const got = this.transactionHistoryList.length;
                const hasMore = got === this.pageSize;
                this.estimatedTotal = (this.pageIndex * this.pageSize) + got + (hasMore ? this.pageSize : 0);
                this.paginationOver = !hasMore;
            }

            this.checkAndSetupAutoRefresh();
        } catch (err) {
            console.error('Failed to load transactions', err);
            this.transactionHistoryList = [];
            this.paginationOver = true;
            this.estimatedTotal = this.pageIndex * this.pageSize; // best-effort
        } finally {
            this.loading = false;
        }
    }

    private checkAndSetupAutoRefresh() {
        const hasPendingNeft = this.transactionHistoryList.some(tx =>
            tx.status?.toLowerCase() === 'pending' && (tx.mode?.toLowerCase() === 'neft' || tx.mode?.toLowerCase() === 'imps')
        );

        if (hasPendingNeft) {
            if (!this.refreshInterval) {
                // Use setTimeout instead of setInterval for cleaner async flow
                this.refreshInterval = setTimeout(async () => {
                    await this.checkPendingNeftTransactions();
                    // After checking, reload the page which will re-trigger this setup if still needed
                    this.refreshInterval = null; // Clear so loadPage can set it up again
                    this.loadPage(false);
                }, 60000); // 1 minute
            }
        } else {
            // Clean up if no longer pending
            if (this.refreshInterval) {
                clearTimeout(this.refreshInterval);
                this.refreshInterval = null;
            }
        }
    }

    async checkPendingNeftTransactions() {
        const pendingNeftTxns = this.transactionHistoryList.filter(tx =>
            tx.status?.toLowerCase() === 'pending' && (tx.mode?.toLowerCase() === 'neft' || tx.mode?.toLowerCase() === 'imps')
        );

        for (const tx of pendingNeftTxns) {
            if (tx.payout_id) {
                try {
                    const res = await this.apiMainService.checkJusPayPayoutStatus(tx.payout_id);
                } catch (err: any) {
                    console.error(`Error checking status for ${tx.payout_id}:`, err);
                }
            }
        }
    }

    // ——— Excel Export ———
    async exportWalletStatement() {
        try {
            // Reuse buildQueryBody but override limit to fetch 'all' (or reasonably large number)
            const body = this.buildQueryBody();
            body.limit = 10000; // Large explicit limit for export
            body.page = 1;

            const response: any = await this.apiMainService.getVendorTransactionByFirmAndTypeAndDate(body);

            let rows: VendorTransaction[] = [];
            if (response && Array.isArray(response.data)) {
                rows = response.data;
            } else if (Array.isArray(response)) {
                rows = response;
            }

            if (!rows || rows.length === 0) {
                this.snackBar.open('No data to export for current filters', 'OK', { duration: 3000 });
                return;
            }

            // Create Workbook
            const wb = new ExcelJS.Workbook();
            const ws = wb.addWorksheet('Wallet Statement');

            // Setup Headers
            const headers = [
                'Date',
                'Transaction ID',
                'Type',
                'Mode',
                'Amount',
                'Status',
                'Remark'
            ];

            // Styling helpers
            const headerRow = ws.addRow(headers);
            headerRow.eachCell((cell) => {
                cell.font = { bold: true };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEFEF' } };
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });

            // Widths
            ws.columns = [
                { width: 20 }, // Date
                { width: 30 }, // Txn ID
                { width: 25 }, // Type
                { width: 12 }, // Mode
                { width: 15 }, // Amount
                { width: 15 }, // Status
                { width: 40 }, // Remark
            ];

            // Add Data
            const curFmt = '₹#,##0.00';
            const dateFmt = 'dd-mmm-yyyy hh:mm AM/PM';

            rows.forEach(tx => {
                const rowData = [
                    new Date(tx.created_at),
                    tx._id || tx.payout_id || '-',
                    this.formatLabel(tx.transactionType),
                    tx.mode || '-',
                    Number(tx.transaction_amount || 0),
                    tx.status || 'Success',
                    tx.remark || ''
                ];
                const row = ws.addRow(rowData);

                // Formatting
                row.getCell(1).numFmt = dateFmt;
                row.getCell(5).numFmt = curFmt;

                row.eachCell({ includeEmpty: true }, (cell) => {
                    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                });
            });

            // Save
            const buf = await wb.xlsx.writeBuffer();
            const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const { start, end } = this.dateRange;
            const dLabel = start ? `${start.getDate()}_${start.getMonth() + 1}` : 'All';
            saveAs(blob, `Wallet_Statement_${dLabel}.xlsx`);

        } catch (error) {
            console.error('Export failed', error);
            this.snackBar.open('Failed to export Excel', 'OK', { duration: 3000 });
        }
    }

    // ——— Helpers ———
    getStatusColorClass(status: string | undefined): string {
        if (!status) return 'text-muted'; // Default
        switch (status) {
            case 'Success': return 'green';
            case 'Pending':
            case 'Initiated':
            case 'Review_With_Bank': return 'orange';
            case 'Failed': return 'red';
            case 'Refund': return 'primary2'; // Or a purple/info color if defined
            default: return 'text-muted';
        }
    }

    getTxnTypeColorClass(type: string | undefined): string {
        if (!type) return '';
        if (type === 'Credit' || type.includes('To_Wallet')) return 'green';
        if (type === 'Debit' || type.includes('To_bank')) return 'red';
        return 'primary2';
    }

    getStatusIcon(status: string | undefined): string {
        if (!status) return 'info';
        switch (status) {
            case 'Success': return 'check_circle';
            case 'Pending':
            case 'Initiated':
            case 'Review_With_Bank': return 'hourglass_empty';
            case 'Failed': return 'error';
            case 'Refund': return 'replay';
            default: return 'info';
        }
    }

    formatLabel(text: string | undefined): string {
        if (!text) return '';
        return text.replace(/_/g, ' ');
    }
}

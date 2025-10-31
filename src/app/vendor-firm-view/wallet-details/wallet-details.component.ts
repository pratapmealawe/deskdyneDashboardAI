import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { WalletTxnDialogComponent } from '../wallet-txn-dialog/wallet-txn-dialog.component';

// (Optional) type for better intellisense
interface VendorTransaction {
  _id?: string;
  transactionType: 'Credit' | 'Debit' | string;
  transaction_amount: number;
  created_at: string | Date;
  remark?: string;
}

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss']
})
export class WalletDetailsComponent implements OnChanges, OnInit {
  @Input() vendorFirmInfo: any;

  walletBalance: number = 0;
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

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog,private apiMainService: ApiMainService) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    const today = new Date();
    this.dateRange = { start: today, end: today };
    this.getWalletBalance();
    this.loadPage(true);
  }

    openTxnDialog(kind: 'Credit' | 'Debit') {
    const ref = this.dialog.open(
      WalletTxnDialogComponent,
      {
        width: '420px',
        disableClose: true,
        data: {
          vendorFirmId: this.vendorFirmInfo._id,
          kind
        }
      }
    );

    ref.afterClosed().subscribe(async (res) => {
      if (!res || !res.success) return;
      // Refresh balance + reload list (stay on current page)
      await this.getWalletBalance();
      this.loadPage(false);
      this.snackBar.open(`${kind}ed successfully`, 'OK', { duration: 2500 });
    });
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

  // ——— Data fetchers ———
  async getWalletBalance() {
    try {
      const wallet: any = await this.apiMainService.getVendorWallet(this.vendorFirmInfo._id);
      const bal = Number(wallet?.wallet_balance ?? 0);
      this.walletBalance = Number.isFinite(bal) ? +bal.toFixed(2) : 0;
    } catch (error) {
      console.log('error while fetching wallet');
    }
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
      vendorFirmId: this.vendorFirmInfo._id,
      page: this.pageIndex + 1,
      limit: this.pageSize,
    };

    if (fromDate) body.fromDate = fromDate;
    if (toDate) body.toDate = toDate;
    if (this.typeFilter) body.transactionType = this.typeFilter;

    return body;
  }

  private async loadPage(reset = false) {
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
    } catch (err) {
      console.error('Failed to load transactions', err);
      this.transactionHistoryList = [];
      this.paginationOver = true;
      this.estimatedTotal = this.pageIndex * this.pageSize; // best-effort
    } finally {
      this.loading = false;
    }
  }
}

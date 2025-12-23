import { Component, Input, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ledger-details',
  templateUrl: './ledger-details.component.html',
  styleUrls: ['./ledger-details.component.scss']
})
export class LedgerDetailsComponent implements OnInit {
  @Input() vendorFirmInfo: any;

  fromDate: string | null = null;
  toDate: string | null = null;

  /** Raw page items from API (unfiltered) */
  private pageItems: any[] = [];

  /** What the template renders after status filtering */
  displayedLedgers: any[] = [];

  /** Balance (current page after status filtering; only "New") */
  totalVendorLegersBalance = 0;
  totalNewCount = 0;

  /** Pagination state */
  page = 1;
  limit = 10;
  totalCount: number | null = null;    // null => unknown from server
  totalPages: number | null = null;
  hasNextPage = false;
  isLoading = false;

  /** Status filter (Material Select + Bootstrap layout) */
  selectedStatuses: Array<'New' | 'InProgress' | 'Closed'> = ['New'];

  searchOrderNo = '';

  constructor(private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    const todayISO = new Date().toISOString();
    this.fromDate = todayISO;
    this.toDate = todayISO;
    this.fetchPage(1);
    this.getVendorLedgerBalance();
  }

  async getVendorLedgerBalance() {
    // this.vendorFirmInfo._id
    try {
      const res = await this.apiMainService.getTotalVendorLedgerBalanceByFirm(this.vendorFirmInfo._id);
      console.log(res);

      this.totalVendorLegersBalance = res.totalBalance;
    } catch (err: any) {
      console.log(err);
    }
  }

  /**
   * Normalize backend variations to the UI statuses:
   * New | InProgress | Closed
   */
  normalizeStatus(s: any): 'New' | 'InProgress' | 'Closed' {
    const v = String(s || '').toLowerCase();
    if (v === 'closed') return 'Closed';
    if (v === 'pending' || v === 'inprogress' || v === 'in progress') return 'InProgress';
    return 'New';
  }

  /** Apply status filter on current page and recompute page-scope balance */
  private applyFilters() {
    const allowed = new Set(this.selectedStatuses);
    const searchStr = (this.searchOrderNo || '').trim().toLowerCase();

    const filtered = this.pageItems.filter(it => {
      const matchStatus = allowed.has(this.normalizeStatus(it.status));
      const matchSearch = !searchStr || String(it.orderNo || '').toLowerCase().includes(searchStr);
      return matchStatus && matchSearch;
    });

    this.displayedLedgers = filtered;
  }

  /** Fetch a page (supports common API shapes) */
  async fetchPage(page: number) {
    if (!this.vendorFirmInfo?._id) return;
    this.isLoading = true;

    try {
      const body: any = {
        vendorFirmId: this.vendorFirmInfo._id,
        fromDate: this.fromDate,
        toDate: this.toDate,
        page,
        limit: this.limit,
      };

      const res = await this.apiMainService.getVendorLedgerByFirmAndTypeAndDate(body);

      let items: any[] = [];
      let total: number | null = null;

      if (Array.isArray(res)) {
        items = res;
      } else if (res && Array.isArray(res.items)) {
        items = res.items;
        total = typeof res.total === 'number' ? res.total : null;
      } else if (res && Array.isArray(res.docs)) {
        items = res.docs;
        total = typeof res.totalDocs === 'number' ? res.totalDocs : null;
        if (typeof res.page === 'number') this.page = res.page;
        if (typeof res.limit === 'number') this.limit = res.limit;
      } else {
        items = res || [];
      }

      this.pageItems = items;
      this.page = page;

      this.totalCount = total;
      this.totalPages = (total && this.limit) ? Math.max(1, Math.ceil(total / this.limit)) : null;
      this.hasNextPage = total !== null ? (this.totalPages! > this.page) : (items.length === this.limit);

      // Apply status filter to fresh page
      this.applyFilters();

    } catch (error) {
      console.error('Error while fetching ledger', error);
      this.pageItems = [];
      this.displayedLedgers = [];
      this.totalVendorLegersBalance = 0;
      this.totalCount = null;
      this.totalPages = null;
      this.hasNextPage = false;
    } finally {
      this.isLoading = false;
    }
  }

  /** Material paginator -> backend page/limit */
  onPage(e: PageEvent) {
    const nextPage = e.pageIndex + 1;
    const nextSize = e.pageSize;

    // update page size if changed
    if (this.limit !== nextSize) this.limit = nextSize;

    // fetch requested page
    this.fetchPage(nextPage);
  }

  /** Material select changed */
  onStatusChanged() {
    if (this.selectedStatuses.length === 0) {
      // Keep at least one selected; default back to New
      this.selectedStatuses = ['New'];
    }

    // Client-side re-filter current page:
    this.applyFilters();
  }

  /** Search trigger */
  onSearch() {
    this.applyFilters();
  }

  /** Backward compatibility if called elsewhere */
  async getVendorLedger() {
    this.fetchPage(1);
  }

  /** Provide a robust length to Material paginator even if total is unknown */
  get paginatorLength(): number {
    if (this.totalCount !== null) return this.totalCount;
    // Approximate length so paginator enables "Next" when applicable
    return (this.page - 1) * this.limit + this.displayedLedgers.length + (this.hasNextPage ? 1 : 0);
  }

  // --- UI Helpers ---

  getBillingTypeColorClass(type: string | undefined): string {
    if (!type) return 'bg-secondary text-white';
    switch (type.toLowerCase()) {
      case 'ecommerce': return 'bg-info text-dark';
      case 'subscription': return 'bg-primary text-white';
      default: return 'bg-secondary text-white';
    }
  }

  getOrderTypeColorClass(type: string | undefined): string {
    if (!type) return 'bg-light text-dark border';
    switch (type.toLowerCase()) {
      case 'preorder': return 'bg-warning text-dark';
      case 'ondemand': return 'bg-success text-white';
      default: return 'bg-light text-dark border';
    }
  }

  getStatusColorClass(status: string | undefined): string {
    const s = this.normalizeStatus(status);
    switch (s) {
      case 'New': return 'bg-primary text-white';
      case 'InProgress': return 'bg-warning text-dark';
      case 'Closed': return 'bg-success text-white';
      default: return 'bg-secondary text-white';
    }
  }

  getStatusIcon(status: string | undefined): string {
    const s = this.normalizeStatus(status);
    switch (s) {
      case 'New': return 'bi-hourglass-split';
      case 'InProgress': return 'bi-arrow-repeat';
      case 'Closed': return 'bi-check-circle-fill';
      default: return 'bi-question-circle';
    }
  }

  getLedgerDisplayAmount(ledger: any): number {
    if (ledger.billingType === 'ecommerce') {
      return ledger.vendorLedgerAmt || 0;
    } else {
      return (ledger.vendorRevenueSharingLedgerAmt || 0) - (ledger.subsidyAmount || 0);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PageEvent } from '@angular/material/paginator';
import { VendorFirmViewService } from '../vendor-firm-view.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-vendor-firm-ledger-details',
  templateUrl: './vendor-firm-ledger-details.component.html',
  styleUrls: ['./vendor-firm-ledger-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class VendorFirmLedgerDetailsComponent implements OnInit {
  vendorFirmInfo: any;

  fromDate: string | null = null;
  toDate: string | null = null;

  /** Raw page items from API (all items) */
  allItems: any[] = [];

  /** Raw page items from API (unfiltered) - kept for compatibility if needed or removal */
  pageItems: any[] = [];

  /** What the template renders after status filtering */
  displayedLedgers: any[] = [];

  /** Balance (current page after status filtering; only "New") */
  totalVendorLegersBalance = 0;
  totalNewCount = 0;

  /** Pagination state */
  page = 1;
  limit = 10;
  totalCount: number | null = null;    // null => unknown
  totalPages: number | null = null;
  hasNextPage = false;
  isLoading = false;

  /** Status filter (Material Select + Bootstrap layout) */
  selectedStatuses: Array<'New' | 'InProgress' | 'Closed'> = ['New'];

  searchOrderNo = '';

  constructor(
    private apiMainService: ApiMainService,
    private vendorFirmViewService: VendorFirmViewService
  ) { }

  ngOnInit(): void {
    const todayISO = new Date().toISOString();
    this.fromDate = todayISO;
    this.toDate = todayISO;

    this.vendorFirmViewService.vendorFirm$.subscribe(vendor => {
      if (vendor) {
        this.vendorFirmInfo = vendor;
        this.fetchData();
        this.getVendorLedgerBalance();
      }
    });
  }

  async getVendorLedgerBalance() {
    // this.vendorFirmInfo._id
    try {
      const res = await this.apiMainService.getTotalVendorLedgerBalanceByFirm(this.vendorFirmInfo._id);

      this.totalVendorLegersBalance = res.totalBalance;
    } catch (err: any) {
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

  /** Apply status filter on all items and slice for current page */
  private applyFilters() {
    const allowed = new Set(this.selectedStatuses);
    const searchStr = (this.searchOrderNo || '').trim().toLowerCase();

    // 1. Filter all items
    const filtered = this.allItems.filter(it => {
      const matchStatus = allowed.has(this.normalizeStatus(it.status));
      const matchSearch = !searchStr || String(it.orderNo || '').toLowerCase().includes(searchStr);
      return matchStatus && matchSearch;
    });

    this.totalCount = filtered.length;
    this.totalPages = Math.ceil(this.totalCount / this.limit) || 1;

    // 2. Pagination Logic: Slice the filtered array
    const startIndex = (this.page - 1) * this.limit;
    const endIndex = startIndex + this.limit;

    this.displayedLedgers = filtered.slice(startIndex, endIndex);

    // Update local variables for compatibility if needed
    this.pageItems = this.displayedLedgers;

    this.hasNextPage = this.page < this.totalPages;
  }

  /** Fetch all data once */
  async fetchData() {
    if (!this.vendorFirmInfo?._id) return;
    this.isLoading = true;

    try {
      // Remove page/limit to get all data if API supports it, 
      // otherwise user might need to adjust API or loop. 
      // Assuming API returns all if page/limit ommitted or high limit.
      const body: any = {
        vendorFirmId: this.vendorFirmInfo._id,
        fromDate: this.fromDate,
        toDate: this.toDate,
      };

      const res = await this.apiMainService.getVendorLedgerByFirmAndTypeAndDate(body);

      let items: any[] = [];

      if (Array.isArray(res)) {
        items = res;
      } else if (res && Array.isArray(res.items)) {
        items = res.items;
      } else if (res && Array.isArray(res.docs)) {
        items = res.docs;
      } else {
        items = res || [];
      }

      this.allItems = items;

      // Reset to first page on new fetch
      this.page = 1;

      this.applyFilters();

    } catch (error) {
      console.error('Error while fetching ledger', error);
      this.allItems = [];
      this.displayedLedgers = [];
      this.pageItems = []; // clear compatibility
      this.totalCount = 0;
      this.totalPages = 0;
      this.hasNextPage = false;
    } finally {
      this.isLoading = false;
    }
  }

  /** Kept for backward compat name, but redirects to fetchData */
  fetchPage(page: number) {
    // If called with a specific page, we just set the page and re-apply filters if data exists
    if (this.allItems.length > 0) {
      this.page = page;
      this.applyFilters();
    } else {
      // If no data, fetch it (ignores page argument for fetching, but could set it)
      this.fetchData();
    }
  }

  /** Material paginator -> local page/limit update */
  onPage(e: PageEvent) {
    this.page = e.pageIndex + 1;
    this.limit = e.pageSize;
    this.applyFilters();
  }

  /** Material select changed */
  onStatusChanged() {
    if (this.selectedStatuses.length === 0) {
      this.selectedStatuses = ['New'];
    }
    this.page = 1; // Reset to first page on filter change
    this.applyFilters();
  }

  /** Search trigger */
  onSearch() {
    this.page = 1; // Reset to first page on search
    this.applyFilters();
  }

  /** Backward compatibility if called elsewhere */
  async getVendorLedger() {
    this.fetchData();
  }

  /** Provide a robust length to Material paginator */
  get paginatorLength(): number {
    return this.totalCount || 0;
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
      case 'New': return 'hourglass_empty';
      case 'InProgress': return 'cached'; // or 'sync'
      case 'Closed': return 'check_circle';
      default: return 'help_outline';
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

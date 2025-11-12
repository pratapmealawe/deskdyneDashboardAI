import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonSelectConfig } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import { PageEvent } from '@angular/material/paginator';

type DayGroup = {
  dateKey: string;       // "YYYY-MM-DD" in IST
  dateLabel: string;     // readable (e.g., "27 Oct 2025")
  orders: any[];
  totals: {
    count: number;
    subsidy: number;
    itemAmount: number;
    gross: number;       // (itemAmount - subsidy) if you need it
  };
};

interface SummaryRow {
  'Date (Label)': string;
  'Orders Count': number;
  'Item Amount (₹)': number;
  'Subsidy (₹)': number;
  'Gross (₹)': number;
}

interface DetailedRow {
  'Date (Label)': string;
  'Order No': string;
  Customer: string;
  Phone: string;
  'Item Amount (₹)': number;
  'Subsidy (₹)': number;
  'Gross (₹)': number;
  Status: string;
}

@Component({
  selector: 'app-outlet-billing',
  templateUrl: './outlet-billing.component.html',
  styleUrls: ['./outlet-billing.component.scss']
})
export class OutletBillingComponent implements OnInit {
  @Input() selectedOrg: any;
  public readonly Math = Math;

  orders: any[] = [];
  dateGroups: DayGroup[] = [];

  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: false,
    requireAll: true
  };

  filteredData: any;

  // (kept for your main table if you need it later)
  mainPageIndex = 0;
  mainPageSize = 5;
  mainPageSizeOptions = [5, 10, 25, 50, 100];

  // --- Date-group pagination state ---
  groupPageIndex = 0;
  groupPageSize = 5;
  groupPageSizeOptions = [3, 5, 10, 20, 50];

  private readonly IST_TZ = 'Asia/Kolkata';

  constructor(
    private apiMainService: ApiMainService,
    private excelService: ExcelService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  trackByDateKey(index: number, g: DayGroup): string {
    return g?.dateKey ?? index.toString();
  }

  // Slice for current page of date groups
  get pagedDateGroups(): DayGroup[] {
    const start = this.groupPageIndex * this.groupPageSize;
    return this.dateGroups.slice(start, start + this.groupPageSize);
  }

  onGroupPage(e: PageEvent) {
    this.groupPageIndex = e.pageIndex;
    this.groupPageSize = e.pageSize;
  }

  onMainPage(e: PageEvent) {
    this.mainPageIndex = e.pageIndex;
    this.mainPageSize = e.pageSize;
  }

  private resetAllPagers() {
    this.groupPageIndex = 0;
    this.mainPageIndex = 0;
  }

  filterSubmitted(e: any) {
    if (e.outlet_id) {
      this.filteredData = e;
      this.getOrders();
    }
  }

  async getOrders() {
    const body = {
      outletId: this.filteredData.outlet_id,
      fromDate: this.filteredData.date_from,
      toDate: this.filteredData.date_to,
    };
    this.fetchOutletOrders(body);
  }

  async fetchOutletOrders(body: any) {
    try {
      const res = await this.apiMainService.fetchCompletedOutletOrdersbysearchObj(body);
      this.orders = Array.isArray(res) ? res : [];
      console.log(this.orders);
      this.buildDatewiseGroups();
      this.resetAllPagers();
    } catch (err) {
      console.log('err', err);
      this.orders = [];
      this.dateGroups = [];
      this.resetAllPagers();
    }
  }

  // ---------- helpers (same as before) ----------
  getSubsidy(order: any): number {
    const byOrder = order?.subsidyAmount ?? order?.subsidy ?? order?.totalSubsidy ?? 0;
    if (byOrder) return Number(byOrder) || 0;
    const items = order?.itemList || order?.items || [];
    if (!Array.isArray(items) || items.length === 0) return 0;
    return items.reduce((acc: number, it: any) => {
      const s = it?.subsidyAmount ?? it?.companySubsidy ?? it?.subsidy ?? 0;
      return acc + (Number(s) || 0);
    }, 0);
  }

  getItemAmount(order: any): number {
    const byOrder = order?.itemAmount ?? order?.totalItemAmount ?? order?.amountBeforeSubsidy ?? order?.amount ?? 0;
    if (byOrder) return Number(byOrder) || 0;
    const items = order?.itemList || order?.items || [];
    if (!Array.isArray(items) || items.length === 0) return 0;
    return items.reduce((acc: number, it: any) => {
      const price = Number(it?.price || it?.rate || 0);
      const qty = Number(it?.count || it?.qty || 1);
      return acc + price * qty;
    }, 0);
  }

  getGross(order: any): number {
    const item = this.getItemAmount(order);
    const sub = this.getSubsidy(order);
    return item - sub;
  }

  istDateKey(d: Date | string): string {
    const date = d ? new Date(d) : new Date();
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: this.IST_TZ, year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(date);
  }

  istDateLabel(d: Date | string): string {
    const date = d ? new Date(d) : new Date();
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: this.IST_TZ, weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
    }).format(date);
  }

  buildDatewiseGroups(): void {
    const map = new Map<string, DayGroup>();
    for (const o of this.orders) {
      const rawDate = o?.orderDate ?? o?.createdOn ?? o?.created_at ?? new Date();
      const key = this.istDateKey(rawDate);
      if (!map.has(key)) {
        map.set(key, {
          dateKey: key,
          dateLabel: this.istDateLabel(rawDate),
          orders: [],
          totals: { count: 0, subsidy: 0, itemAmount: 0, gross: 0 }
        });
      }
      const g = map.get(key)!;
      g.orders.push(o);
      const subsidy = this.getSubsidy(o);
      const itemAmt = this.getItemAmount(o);
      g.totals.count += 1;
      g.totals.subsidy += subsidy;
      g.totals.itemAmount += itemAmt;
      g.totals.gross += (itemAmt - subsidy);
    }
    this.dateGroups = Array.from(map.values()).sort((a, b) => a.dateKey < b.dateKey ? 1 : -1);
  }

  // Totals across ALL dates
get grandTotals() {
  const init = { count: 0, item: 0, subsidy: 0, gross: 0 };
  return this.dateGroups.reduce((acc, g) => {
    acc.count   += g.totals.count;
    acc.item    += g.totals.itemAmount;
    acc.subsidy += g.totals.subsidy;
    acc.gross   += g.totals.gross;
    return acc;
  }, init);
}

// Totals for CURRENT PAGE (optional: show/hide in UI)
get pageTotals() {
  const init = { count: 0, item: 0, subsidy: 0, gross: 0 };
  return this.pagedDateGroups.reduce((acc, g) => {
    acc.count   += g.totals.count;
    acc.item    += g.totals.itemAmount;
    acc.subsidy += g.totals.subsidy;
    acc.gross   += g.totals.gross;
    return acc;
  }, init);
}

  // ---------- Excel Exports ----------
  /** Export one row per date with totals */
  exportDatewiseSummary(): void {
    const rows: SummaryRow[] = this.dateGroups.map(g => ({
      'Date (Label)': g.dateLabel,
      'Orders Count': g.totals.count,
      'Item Amount (₹)': this.round2(g.totals.itemAmount),
      'Subsidy (₹)': this.round2(g.totals.subsidy),
      'Gross (₹)': this.round2(g.totals.gross),
    }));

    const grand = this.dateGroups.reduce(
      (acc, g) => ({
        count: acc.count + g.totals.count,
        item: acc.item + g.totals.itemAmount,
        subsidy: acc.subsidy + g.totals.subsidy,
        gross: acc.gross + g.totals.gross,
      }),
      { count: 0, item: 0, subsidy: 0, gross: 0 }
    );

    rows.push({
      'Date (Label)': 'TOTAL',
      'Orders Count': grand.count,
      'Item Amount (₹)': this.round2(grand.item),
      'Subsidy (₹)': this.round2(grand.subsidy),
      'Gross (₹)': this.round2(grand.gross),
    });

    if ((this.excelService as any).download) {
      (this.excelService as any).download(rows, 'Outlet_Billing_Datewise_Summary');
    }
  }

  /** Export order-level rows (with date attached) */
  exportDatewiseDetailed(): void {
    const rows: DetailedRow[] = [];
    let totalOrders = 0, totalItem = 0, totalSubsidy = 0, totalGross = 0;

    for (const g of this.dateGroups) {
      for (const o of g.orders) {
        const itemAmt = this.getItemAmount(o);
        const subsidy = this.getSubsidy(o);
        const gross = itemAmt - subsidy;

        rows.push({
          'Date (Label)': g.dateLabel,
          'Order No': String(o.orderNo || o._id || ''),
          Customer: o.customerName || '',
          Phone: o.customerPhoneNo || '',
          'Item Amount (₹)': this.round2(itemAmt),
          'Subsidy (₹)': this.round2(subsidy),
          'Gross (₹)': this.round2(gross),
          Status: o.orderstatus || o.status || '',
        });

        totalOrders += 1;
        totalItem += itemAmt;
        totalSubsidy += subsidy;
        totalGross += gross;
      }
    }

    rows.push({
      'Date (Label)': 'TOTAL',
      'Order No': `${totalOrders} orders`,
      Customer: '',
      Phone: '',
      'Item Amount (₹)': this.round2(totalItem),
      'Subsidy (₹)': this.round2(totalSubsidy),
      'Gross (₹)': this.round2(totalGross),
      Status: '',
    });

    if ((this.excelService as any).download) {
      (this.excelService as any).download(rows, 'Outlet_Billing_Datewise_Detailed');
    }
  }

  private round2(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }
}

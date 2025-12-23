import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

export interface DatewiseDialogData {
  byDate: {
    [dateKey: string]: {
      totalVendorAmt: number;
      totalItemAmount: number;
      totalSubsidy: number;
      totalItemAmountAfterGst: number;
      vendorCommissionAmount: number;
      vendorCommissionGstAmount: number;
      vendorLedgerAmtBeforeCommissionGst: number;
      vendorLedgerAmtBeforeTdsTcs: number;
      tcsAmount: number;
      tdsAmount: number;
      revenueSharingTdsAmount: number;
      vendorRevenueSharingLedgerAmt: number;
      count: number;
      orders: any[];
    };
  };
  toISTDateKey: (d: Date | string) => string;
  minDate?: Date;
  maxDate?: Date;
  initialKey?: string;
  isEcommerce?: boolean;
}

export interface DatewiseDialogResult {
  dateKey: string;
  records: any[];
}

@Component({
  selector: 'app-datewise-orders-dialog',
  templateUrl: './datewise-orders-dialog.component.html',
  styleUrls: ['./datewise-orders-dialog.component.scss']
})
export class DatewiseOrdersDialogComponent implements OnInit {
  selectedDate: Date | null = null;
  dateKey: string | null = null;
  snapshot: DatewiseDialogData['byDate'][string] | null = null;
  records: any[] = [];

  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 50];

  get pagedRecords(): any[] {
    const start = this.pageIndex * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DatewiseDialogData,
    private ref: MatDialogRef<DatewiseOrdersDialogComponent, DatewiseDialogResult>
  ) { }

  ngOnInit(): void {
    // If a valid initialKey exists, use it. Otherwise default to "today" (clamped).
    const key = this.data.initialKey;

    if (key && this.data.byDate[key]) {
      this.dateKey = key;
      this.snapshot = this.data.byDate[key];
      this.records = this.snapshot?.orders || [];
      this.selectedDate = new Date(key); // reflect in picker
      this.resetPager();
      return; // prevent double render
    }

    const picked = this.clampToRange(new Date(), this.data.minDate, this.data.maxDate);
    this.selectedDate = picked;
    this.onDateChange(picked); // sets dateKey/snapshot/records + resets pager
  }

  private clampToRange(d: Date, min?: Date, max?: Date): Date {
    const t = d.getTime();
    const lo = min ? min.getTime() : -Infinity;
    const hi = max ? max.getTime() : Infinity;
    const clamped = Math.min(Math.max(t, lo), hi);
    return new Date(clamped);
  }

  onDateChange(d: Date | null) {
    this.selectedDate = d;
    if (!d) {
      this.dateKey = null;
      this.snapshot = null;
      this.records = [];
      this.resetPager();
      return;
    }
    const key = this.data.toISTDateKey(d);
    this.dateKey = key;
    this.snapshot = this.data.byDate[key] || null;
    this.records = this.snapshot?.orders || [];
    this.resetPager();
  }
  today() {
    const t = new Date();
    this.onDateChange(t);
    this.selectedDate = t;
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  resetPager() {
    this.pageIndex = 0;
    // keep last chosen pageSize; comment next line if you want to force default size
    // this.pageSize = 10;
  }

  trackByOrderNo = (_: number, r: any) => r?.orderNo ?? r?._id ?? _;

  close() { this.ref.close(); }

  confirm() {
    if (!this.dateKey) return;
    this.ref.close({ dateKey: this.dateKey, records: this.records });
  }

}

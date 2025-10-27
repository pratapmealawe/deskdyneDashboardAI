import { Component, Input } from '@angular/core';
import { DatewiseDialogData, DatewiseDialogResult, DatewiseOrdersDialogComponent } from '../billing/datewise-orders-dialog/datewise-orders-dialog.component';
import { KeyValue } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonSelectConfig, SubmitPayload } from '../common-outlet-cafe-select/common-outlet-cafe-select.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vendor-report',
  templateUrl: './vendor-report.component.html',
  styleUrls: ['./vendor-report.component.scss']
})
export class VendorReportComponent {
  @Input() vendorFirmInfo: any
  @Input() selectedOrg: any
  public readonly Math = Math;

  orders: any[] = [];

  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: false,
    maxDate: new Date(),
    requireAll: true
  };

  filteredData: any

  // ---- Totals (extended) ----
  vendorTotals = {
    totalVendorAmt: 0,
    totalItemAmount: 0,
    totalSubsidy: 0,
    totalItemAmountAfterGst: 0,
    vendorCommissionAmount: 0,
    vendorCommissionGstAmount: 0,
    vendorLedgerAmtBeforeCommissionGst: 0,
    vendorLedgerAmtBeforeTdsTcs: 0,
    tcsAmount: 0,
    tdsAmount: 0,
    count: 0,
  };

  byDate: {
    [date: string]: {
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
      count: number;
      orders: any[];
    };
  } = {};

  orderWise: Array<{
    orderNo: number;
    tokenNo?: number;
    orderDateIST: string;
    customerName?: string;

    // money fields (per order)
    itemAmount: number;
    subsidyAmount: number;
    totalItemAmountAfterGst: number;
    vendorCommissionAmount: number;
    vendorCommissionGstAmount: number;
    vendorLedgerAmtBeforeCommissionGst: number;
    vendorLedgerAmtBeforeTdsTcs: number;
    tcsAmount: number;
    tdsAmount: number;
    vendorLedgerAmt: number;

    // rate fields (kept per-order only; not summed)
    tcsRatePct?: number;
    tdsRatePct?: number;
    vendorCommissionPercentage?: number;
    vendorCommissionGstPercentage?: number;
  }> = [];

  trackByOrder = (_: number, r: any) => r.orderNo ?? r._id ?? _;

  // --- Main table pagination state ---
  mainPageIndex = 0;
  mainPageSize = 5;
  mainPageSizeOptions = [5, 10, 25, 50, 100];

  // Select Outlet
  loadingOutlets = false;
  outletList: any[] = []
  selected = {
    outletId: '' as string,
  };
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;

  get pagedOrderWise() {
    const start = this.mainPageIndex * this.mainPageSize;
    return this.orderWise.slice(start, start + this.mainPageSize);
  }

  constructor(private apiMainService: ApiMainService, private excelService: ExcelService, private dialog: MatDialog, fb: FormBuilder) {
    this.dateForm = fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    this.loadingOutlets = true

    this.outletList = this.vendorFirmInfo.outletList || []

    this.outletList.length > 0 ? this.loadingOutlets = false : this.loadingOutlets = true
    console.log(this.vendorFirmInfo);
  }

  onOutletChange(outletId: string): void {
    this.selected.outletId = outletId;
  }


  onMainPage(e: PageEvent) {
    this.mainPageIndex = e.pageIndex;
    this.mainPageSize = e.pageSize;
  }

  // Reset pager whenever you rebuild data
  private resetMainPager() {
    this.mainPageIndex = 0;
    // keep last chosen page size (comment next line if you want to force back to default)
    // this.mainPageSize = 10;
  }

  filterSubmitted(e: any) {
    console.log(e);
    if (e.outlet_id) {
      this.filteredData = e
      this.getOrders()
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
      console.log(res);
      this.orders = res || [];
      this.buildSummaries();
    } catch (err: any) {
      console.log("err", err);
    }
  }

  compareDateDesc = (a: KeyValue<string, any>, b: KeyValue<string, any>) =>
    a.key < b.key ? 1 : a.key > b.key ? -1 : 0;

  private toISTDateKey(d: string | Date): string {
    const dt = typeof d === 'string' ? new Date(d) : d;
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dt);
  }

  private n(v: any): number { return Number(v) || 0; }

  // ---- Call this right after you set this.orders = res ----
  private buildSummaries(): void {
    // reset
    this.vendorTotals = {
      totalVendorAmt: 0,
      totalItemAmount: 0,
      totalSubsidy: 0,
      totalItemAmountAfterGst: 0,
      vendorCommissionAmount: 0,
      vendorCommissionGstAmount: 0,
      vendorLedgerAmtBeforeCommissionGst: 0,
      vendorLedgerAmtBeforeTdsTcs: 0,
      tcsAmount: 0,
      tdsAmount: 0,
      count: 0,
    };
    this.byDate = {};
    this.orderWise = [];

    for (const o of this.orders || []) {
      if (o.orderstatus === "completed") {
        const vAmt = this.n(o.vendorLedgerAmt);
        const itemAmt = this.n(o.itemAmount);
        const subsidy = this.n(o.subsidyAmount);
        const afterGst = this.n(o.totalItemAmountAfterGst);
        const comm = this.n(o.vendorCommissionAmount);
        const commGst = this.n(o.vendorCommissionGstAmount);
        const beforeCommGst = this.n(o.vendorLedgerAmtBeforeCommissionGst);
        const beforeTdsTcs = this.n(o.vendorLedgerAmtBeforeTdsTcs);
        const tcsAmt = this.n(o.tcsAmount);
        const tdsAmt = this.n(o.tdsAmount);

        // overall
        this.vendorTotals.totalVendorAmt += vAmt;
        this.vendorTotals.totalItemAmount += itemAmt;
        this.vendorTotals.totalSubsidy += subsidy;
        this.vendorTotals.totalItemAmountAfterGst += afterGst;
        this.vendorTotals.vendorCommissionAmount += comm;
        this.vendorTotals.vendorCommissionGstAmount += commGst;
        this.vendorTotals.vendorLedgerAmtBeforeCommissionGst += beforeCommGst;
        this.vendorTotals.vendorLedgerAmtBeforeTdsTcs += beforeTdsTcs;
        this.vendorTotals.tcsAmount += tcsAmt;
        this.vendorTotals.tdsAmount += tdsAmt;
        this.vendorTotals.count += 1;

        // date-wise (IST)
        const key = this.toISTDateKey(o.orderDate);
        if (!this.byDate[key]) {
          this.byDate[key] = {
            totalVendorAmt: 0,
            totalItemAmount: 0,
            totalSubsidy: 0,
            totalItemAmountAfterGst: 0,
            vendorCommissionAmount: 0,
            vendorCommissionGstAmount: 0,
            vendorLedgerAmtBeforeCommissionGst: 0,
            vendorLedgerAmtBeforeTdsTcs: 0,
            tcsAmount: 0,
            tdsAmount: 0,
            count: 0,
            orders: [],
          };
        }
        const b = this.byDate[key];
        b.totalVendorAmt += vAmt;
        b.totalItemAmount += itemAmt;
        b.totalSubsidy += subsidy;
        b.totalItemAmountAfterGst += afterGst;
        b.vendorCommissionAmount += comm;
        b.vendorCommissionGstAmount += commGst;
        b.vendorLedgerAmtBeforeCommissionGst += beforeCommGst;
        b.vendorLedgerAmtBeforeTdsTcs += beforeTdsTcs;
        b.tcsAmount += tcsAmt;
        b.tdsAmount += tdsAmt;
        b.count += 1;
        b.orders.push(o);

        // per-order row (no outlet fields)
        this.orderWise.push({
          orderNo: o.orderNo,
          tokenNo: o.tokenNo,
          orderDateIST: key,
          customerName: o.customerName,

          itemAmount: itemAmt,
          subsidyAmount: subsidy,
          totalItemAmountAfterGst: afterGst,
          vendorCommissionAmount: comm,
          vendorCommissionGstAmount: commGst,
          vendorLedgerAmtBeforeCommissionGst: beforeCommGst,
          vendorLedgerAmtBeforeTdsTcs: beforeTdsTcs,
          tcsAmount: tcsAmt,
          tdsAmount: tdsAmt,
          vendorLedgerAmt: vAmt,

          tcsRatePct: this.n(o.tcsRatePct),
          tdsRatePct: this.n(o.tdsRatePct),
          vendorCommissionPercentage: this.n(o.vendorCommissionPercentage),
          vendorCommissionGstPercentage: this.n(o.vendorCommissionGstPercentage),
        });
      }
    }

    // sort
    this.orderWise.sort((a, b) => {
      if (a.orderDateIST !== b.orderDateIST) return a.orderDateIST < b.orderDateIST ? 1 : -1;
      return (a.orderNo || 0) - (b.orderNo || 0);
    });

    this.resetMainPager();
  }

  get availableDateKeys(): string[] {
    return Object.keys(this.byDate || {}).sort().reverse(); // latest first
  }

  openDatewiseModal(): void {
    // Prefer limiting the datepicker between the selected filter range if you have it
    const minDate = this.filteredData?.date_from ? new Date(this.filteredData.date_from) : undefined;
    const maxDate = this.filteredData?.date_to ? new Date(this.filteredData.date_to) : this.headerConfig.maxDate;

    const ref = this.dialog.open<DatewiseOrdersDialogComponent, DatewiseDialogData, DatewiseDialogResult>(
      DatewiseOrdersDialogComponent,
      {
        width: '900px',
        maxHeight: '85vh',
        autoFocus: false,
        data: {
          byDate: this.byDate,
          toISTDateKey: (d: Date | string) => this.toISTDateKey(d),
          minDate,
          maxDate,
          // optional: preselect the most recent date that has data
          initialKey: this.availableDateKeys[0] || undefined
        }
      }
    );

    // (Optional) Handle result if you need to react outside the dialog
    ref.afterClosed().subscribe(res => {
      if (!res) return;
      // res.dateKey has the selected yyyy-mm-dd (IST)
      // res.records is the array of orders of that date
      // Example: console.log(res);
    });
  }

  // --- (Optional) Excel export for the whole period ---
  exportAllToExcel() {
    // Map a flat sheet from orderWise; tweak headers as you like
    const rows = this.orderWise.map(r => ({
      Date: r.orderDateIST,
      OrderNo: r.orderNo,
      Token: r.tokenNo ?? '',
      Customer: r.customerName ?? '',
      Item: r.itemAmount,
      Subsidy: r.subsidyAmount,
      AfterGST: r.totalItemAmountAfterGst,
      Commission: r.vendorCommissionAmount,
      CommissionGST: r.vendorCommissionGstAmount,
      BeforeCommissionGST: r.vendorLedgerAmtBeforeCommissionGst,
      BeforeTDSTCS: r.vendorLedgerAmtBeforeTdsTcs,
      TCS: r.tcsAmount,
      TDS: r.tdsAmount,
      VendorAmount: r.vendorLedgerAmt,
    }));

    this.excelService.download(rows, 'Outlet-Billing');
  }

  get canSubmit(): boolean {
    if (!this.selected.outletId) return false;
    return true;
  }

  onSubmit(): void {
    if (!this.canSubmit) return;
    const dateFrom: Date | null = this.dateForm.get('dateFrom')?.value || null;
    const dateTo: Date | null = this.dateForm.get('dateTo')?.value || null;

    const body = {
      outletId: this.selected.outletId,
      fromDate: dateFrom,
      toDate: dateTo
    }

    console.log(body);
    this.fetchOutletOrders(body);
  }
}

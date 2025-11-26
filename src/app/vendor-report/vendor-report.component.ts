import { Component, Input } from '@angular/core';
import { DatewiseDialogData, DatewiseDialogResult, DatewiseOrdersDialogComponent } from '../billing/datewise-orders-dialog/datewise-orders-dialog.component';
import { KeyValue } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonSelectConfig, SubmitPayload } from '../common-outlet-cafe-select/common-outlet-cafe-select.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemBreakdownComponent } from './item-breakdown/item-breakdown.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
      totalGstAmt: number; // <- sum of gstamt

      // declared percentage fields (uniform per date or "mixed")
      itemGstRatePct: number | null | undefined;
      tcsRatePct: number | null | undefined;
      tdsRatePct: number | null | undefined;
      vendorCommissionPercentage: number | null | undefined;
      vendorCommissionGstPercentage: number | null | undefined;

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

  constructor(private apiMainService: ApiMainService, private http: HttpClient, private excelService: ExcelService, private dialog: MatDialog, fb: FormBuilder) {
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

  private async assetToBase64(url: string): Promise<string | undefined> {
    try {
      const blob = await firstValueFrom(this.http.get(url, { responseType: 'blob' }));
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      return undefined;
    }
  }

  async openItemBreakdownModal() {
    const orders = (this.orders || []).filter(o => o?.orderstatus === 'completed');

    const rangeLabel = this.buildRangeLabel(
      this.dateForm.get('dateFrom')?.value,
      this.dateForm.get('dateTo')?.value
    );
    const selectedOutlet = this.outletList.find((i: any) => i.outletId === this.selected.outletId) || {};
    const orgName = selectedOutlet.organizationDetails?.organization_name ?? '-';
    const cafeName = selectedOutlet.cafeteriaDetails?.cafeteria_name ?? '-';
    const counterName = selectedOutlet.outletName ?? '-';
    const orgCafe = `${orgName} - ${cafeName}`;

    // ✅ Use runtime path:
    const imageUrl = 'assets/images/deskdyneLogoblue.png';
    const logoBase64 = await this.assetToBase64(imageUrl);

    this.dialog.open(ItemBreakdownComponent, {
      width: '960px',
      maxHeight: '85vh',
      autoFocus: false,
      data: {
        rangeLabel,    // <- show this on top
        orders,
        header: {
          cafeteriaName: orgCafe,
          counterName,
          gstNumber: this.vendorFirmInfo?.compliance?.gstNumber || '00000000000',
          fssaiNumber: this.vendorFirmInfo?.compliance?.fssaiNo || '00000000000000',
          createdBetween: rangeLabel,
          logoBase64,
        },
      },
    });
  }

  private buildRangeLabel(from?: Date | null, to?: Date | null): string {
    const fmt = (d?: Date | null) =>
      d ? new Intl.DateTimeFormat('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata'
      }).format(d) : '';
    const a = fmt(from);
    const b = fmt(to);
    if (a && b) return `${a} – ${b}`;
    if (a) return `${a}`;
    if (b) return `${b}`;
    return 'All Selected Dates';
  }

  get hasData(): boolean {
    return (this.orderWise?.length ?? 0) > 0;
  }

  compareDateDesc = (a: KeyValue<string, any>, b: KeyValue<string, any>) =>
    a.key < b.key ? 1 : a.key > b.key ? -1 : 0;

  // Replace your current toISTDateKey with this:
  private toISTDateKey(d: string | Date): string {
    const tz = 'Asia/Kolkata';
    let dt: Date;

    if (typeof d === 'string') {
      // If it's a plain date (no time), interpret it as IST 00:00.
      const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) {
        const [, y, mo, da] = m;
        // Build a UTC instant that corresponds to 00:00 IST (UTC+05:30)
        const utcMs = Date.UTC(+y, +mo - 1, +da, -5, -30);
        dt = new Date(utcMs);
      } else {
        // Full ISO with timezone? Trust it.
        dt = new Date(d);
      }
    } else {
      dt = d;
    }

    return new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dt);
  }

  // Add this helper:
  private excelDateFromISTKey(key: string): Date {
    // key is "yyyy-mm-dd" (already an IST calendar day)
    const [y, m, d] = key.split('-').map(Number);
    // Use UTC *noon* to avoid Excel timezone rollovers on any OS/locale.
    return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
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

    // helper to keep a date-level % field uniform (else mark Mixed => null)
    const keepUniform = (cur: number | null | undefined, next: any): number | null => {
      const v = (next == null ? null : Number(next));
      if (cur === undefined) return v;       // first value for the date
      if (cur === null) return null;         // already mixed
      return (v === cur) ? cur : null;       // if different -> mixed
    };

    for (const o of this.orders || []) {
      if (o.orderstatus !== "completed") continue;

      const vAmt = this.n(o.vendorLedgerAmt);
      const itemAmt = this.n(o.itemAmount);
      const subsidy = this.n(o.subsidyAmount);
      const baseAmt = this.n(o.totalItemAmountAfterGst);
      const comm = this.n(o.vendorCommissionAmount);
      const commGst = this.n(o.vendorCommissionGstAmount);
      const beforeCommGst = this.n(o.vendorLedgerAmtBeforeCommissionGst);
      const beforeTdsTcs = this.n(o.vendorLedgerAmtBeforeTdsTcs);
      const tcsAmt = this.n(o.tcsAmount);
      const tdsAmt = this.n(o.tdsAmount);
      const gstAmt = this.n(o.gstamt);

      // overall
      this.vendorTotals.totalVendorAmt += vAmt;
      this.vendorTotals.totalItemAmount += itemAmt;
      this.vendorTotals.totalSubsidy += subsidy;
      this.vendorTotals.totalItemAmountAfterGst += baseAmt;
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
          totalGstAmt: 0,

          itemGstRatePct: undefined,
          tcsRatePct: undefined,
          tdsRatePct: undefined,
          vendorCommissionPercentage: undefined,
          vendorCommissionGstPercentage: undefined,

          count: 0,
          orders: [],
        };
      }
      const b = this.byDate[key];

      b.totalVendorAmt += vAmt;
      b.totalItemAmount += itemAmt;
      b.totalSubsidy += subsidy;
      b.totalItemAmountAfterGst += baseAmt;
      b.vendorCommissionAmount += comm;
      b.vendorCommissionGstAmount += commGst;
      b.vendorLedgerAmtBeforeCommissionGst += beforeCommGst;
      b.vendorLedgerAmtBeforeTdsTcs += beforeTdsTcs;
      b.tcsAmount += tcsAmt;
      b.tdsAmount += tdsAmt;
      b.totalGstAmt += gstAmt;

      // keep rates uniform, else mark Mixed (null)
      b.itemGstRatePct = keepUniform(b.itemGstRatePct, o.itemGstRatePct);
      b.tcsRatePct = keepUniform(b.tcsRatePct, o.tcsRatePct);
      b.tdsRatePct = keepUniform(b.tdsRatePct, o.tdsRatePct);
      b.vendorCommissionPercentage = keepUniform(b.vendorCommissionPercentage, o.vendorCommissionPercentage);
      b.vendorCommissionGstPercentage = keepUniform(b.vendorCommissionGstPercentage, o.vendorCommissionGstPercentage);

      b.count += 1;
      b.orders.push(o);

      // per-order row (kept as-is if you still show order table elsewhere)
      this.orderWise.push({
        orderNo: o.orderNo,
        tokenNo: o.tokenNo,
        orderDateIST: key,
        customerName: o.customerName,
        itemAmount: itemAmt,
        subsidyAmount: subsidy,
        totalItemAmountAfterGst: baseAmt,
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

    // sort orders for your table
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
    const maxDate = this.filteredData?.date_to ? new Date(this.filteredData.date_to) : undefined;

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
  async exportDatewiseSummaryExcel() {
    if (!this.byDate || !Object.keys(this.byDate).length) return;

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Datewise Summary');

    const currencyFmt = '₹#,##0.00';
    const dateFmt = 'dd-mmm-yy';

    // Resolve outlet and range safely
    const outlet =
      this.outletList.find((item: any) => item.outletId === this.selected.outletId) ||
      { outletName: 'Outlet' };
    const rangeLabel = this.buildRangeLabel(
      this.dateForm.get('dateFrom')?.value,
      this.dateForm.get('dateTo')?.value
    );

    // Title (exactly 15 columns -> A..O)
    ws.mergeCells('A1:O1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `Outlet Billing — ${outlet.outletName}`;
    titleCell.font = { bold: true, size: 13 };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // Header — 15 columns (A..O)
    const headers = [
      'Date',                               // A
      'Orders',                             // B
      'Value (Gross)',                      // C  sum totalItemAmount
      'GST(5%) Value',                      // D  sum totalGstAmt
      'Value (GROSS - GST)',                // E  sum totalItemAmountAfterGst
      'Commission',                         // F  sum vendorCommissionAmount
      'Commission GST (18%)',               // G  sum vendorCommissionGstAmount
      'Net Commission',                     // H  sum (commission + commission GST)
      'Net Value (value - Net Commission)', // I  sum vendorLedgerAmtBeforeTdsTcs
      'TCS (5%)',                           // J  sum tcsAmount
      'TDS (1%)',                           // K  sum tdsAmount
      'Vendor Amount (Net Value - TCS -TDS )', // L  sum totalVendorAmt
      'Subsidy Balance',                    // M  sum totalSubsidy
      'Final Vendor Payout',                // N  sum (totalVendorAmt - totalSubsidy)
      'Wallet Status',                      // O  (blank/NA per date)
    ];
    const headerRow = ws.addRow(headers);
    headerRow.eachCell((c: any) => {
      c.font = { bold: true };
      c.alignment = { vertical: 'middle', horizontal: 'center' };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEFEF' } };
      c.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    ws.getRow(2).height = 22;

    // Column widths — 15 entries (A..O)
    const widths = [14, 10, 18, 18, 20, 16, 22, 18, 32, 16, 16, 34, 18, 20, 16];
    widths.forEach((w, i) => ws.getColumn(i + 1).width = w);

    const dateKeys = this.availableDateKeys;

    // Grand totals (amounts only)
    const totals = {
      count: 0,
      gross: 0,
      gst: 0,
      base: 0,
      comm: 0,
      commGst: 0,
      netComm: 0,          // comm + commGst
      netValue: 0,         // before TDS/TCS
      tcs: 0,
      tds: 0,
      vendor: 0,
      subsidy: 0,
      finalPayout: 0,      // vendor - subsidy
    };

    // Data rows start at row 3
    for (const key of dateKeys) {
      const g = this.byDate[key];
      if (!g || g.count === 0) continue;

      const gross = this.n(g.totalItemAmount);
      const gst = this.n(g.totalGstAmt);
      const base = this.n(g.totalItemAmountAfterGst);
      const commission = this.n(g.vendorCommissionAmount);
      const commissionGst = g.vendorCommissionGstAmount;
      const netCommission = commission + commissionGst;
      const netValue = this.n(g.vendorLedgerAmtBeforeTdsTcs);
      const tcs = this.n(g.tcsAmount);
      const tds = this.n(g.tdsAmount);
      const vendorAmt = this.n(g.totalVendorAmt);
      const subsidy = this.n(g.totalSubsidy);
      const finalPayout = vendorAmt - subsidy;
      const walletStatus: string = ''; // no per-date status in data; leave blank or set as needed

      // Date key "yyyy-mm-dd" -> real Date for Excel
      const excelDate = this.excelDateFromISTKey(key);

      const row = ws.addRow([
        excelDate,        // A Date
        g.count,          // B Orders
        gross,            // C Value (Gross)
        gst,              // D GST(5%) Value
        base,             // E Value (GROSS - GST)
        commission,       // F Commission
        commissionGst,    // G Commission GST (18%)
        netCommission,    // H Net Commission
        netValue,         // I Net Value
        tcs,              // J TCS
        tds,              // K TDS
        vendorAmt,        // L Vendor Amount
        subsidy,          // M Subsidy Balance
        finalPayout,      // N Final Vendor Payout
        walletStatus,     // O Wallet Status
      ]);

      // Formats & alignment
      row.getCell(1).numFmt = dateFmt;
      row.getCell(1).alignment = { horizontal: 'center' };
      row.getCell(2).alignment = { horizontal: 'center' };

      // Money columns: C..N (3..14)
      for (let ci = 3; ci <= 14; ci++) {
        const c = row.getCell(ci);
        c.numFmt = currencyFmt;
        c.alignment = { horizontal: 'right' };
      }
      // Wallet Status align center
      row.getCell(15).alignment = { horizontal: 'center' };

      row.eachCell((c: any) => {
        c.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });

      // Totals
      totals.count += g.count;
      totals.gross += gross;
      totals.gst += gst;
      totals.base += base;
      totals.comm += commission;
      totals.commGst += commissionGst;
      totals.netComm += netCommission;
      totals.netValue += netValue;
      totals.tcs += tcs;
      totals.tds += tds;
      totals.vendor += vendorAmt;
      totals.subsidy += subsidy;
      totals.finalPayout += finalPayout;
    }

    // Spacer + GRAND TOTAL (align to headers)
    ws.addRow([]);
    const gtRow = ws.addRow([
      'GRAND TOTAL',         // A
      totals.count,          // B Orders
      totals.gross,          // C Value (Gross)
      totals.gst,            // D GST(5%) Value
      totals.base,           // E Value (GROSS - GST)
      totals.comm,           // F Commission
      totals.commGst,        // G Commission GST
      totals.netComm,        // H Net Commission
      totals.netValue,       // I Net Value
      totals.tcs,            // J TCS
      totals.tds,            // K TDS
      totals.vendor,         // L Vendor Amount
      totals.subsidy,        // M Subsidy Balance
      totals.finalPayout,    // N Final Vendor Payout
      '',                    // O Wallet Status (blank)
    ]);

    gtRow.font = { bold: true };
    gtRow.getCell(1).alignment = { horizontal: 'center' };
    gtRow.getCell(2).alignment = { horizontal: 'center' };
    for (let ci = 3; ci <= 14; ci++) gtRow.getCell(ci).numFmt = currencyFmt;
    gtRow.getCell(15).alignment = { horizontal: 'center' };
    gtRow.eachCell((c) => {
      c.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    // DO NOT freeze header (per your instruction)

    // Save (sanitize filename)
    const buf = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const safeRange = rangeLabel.replace(/[\\/:*?"<>|]/g, '–');
    const fileName = `${outlet.outletName}-Outlet-Billing-${safeRange}.xlsx`;
    saveAs(blob, fileName);
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

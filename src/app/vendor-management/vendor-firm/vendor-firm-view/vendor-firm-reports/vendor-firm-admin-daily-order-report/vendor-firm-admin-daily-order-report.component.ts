import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { VendorFirmViewService } from '../../vendor-firm-view.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface VendorTotals {
  count: number;
  orderAmount: number;
  totalVendorAmt: number;
}

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-firm-admin-daily-order-report',
  templateUrl: './vendor-firm-admin-daily-order-report.component.html',
  styleUrls: ['./vendor-firm-admin-daily-order-report.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class VendorFirmAdminDailyOrderReportComponent implements OnInit {
  vendorFirmInfo: any;
  @Input() filteredData: any; // parent should set outlet_id at least (if needed later)

  public readonly Math = Math;

  orders: any[] = [];
  orderWise: Array<{
    orderNo: number;
    orderDateIST: string;
    customerName?: string;
    orderAmount: number;
    vendorLedgerAmt: number;
  }> = [];

  vendorTotals: VendorTotals = {
    count: 0,
    orderAmount: 0,
    totalVendorAmt: 0
  };

  // --- Main table pagination state ---
  mainPageIndex = 0;
  mainPageSize = 5;
  mainPageSizeOptions = [5, 10, 25, 50, 100];

  // Date range form
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;

  vendorFirm: any;

  constructor(
    private apiMainService: ApiMainService,
    private http: HttpClient,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private vendorFirmViewService: VendorFirmViewService
  ) {
    this.dateForm = this.fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    this.vendorFirmViewService.vendorFirm$.subscribe(vendor => {
      if (vendor) {
        this.vendorFirm = vendor;
        this.vendorFirmInfo = vendor;
      }
    });
  }

  // ====== GETTERS used in template ======

  get pagedOrderWise() {
    const start = this.mainPageIndex * this.mainPageSize;
    return this.orderWise.slice(start, start + this.mainPageSize);
  }

  get hasData(): boolean {
    return this.orderWise.length > 0;
  }

  get canSubmit(): boolean {
    const { dateFrom, dateTo } = this.dateForm.value;
    // you are using vendorFirmId from LS, so at least check that exists + dates
    return !!(this.vendorFirm?._id && dateFrom && dateTo);
  }

  // ====== UI events ======

  trackByOrder = (_: number, r: any) => r.orderNo ?? r._id ?? _;

  onMainPage(event: any) {
    this.mainPageIndex = event.pageIndex;
    this.mainPageSize = event.pageSize;
  }

  onSubmit() {
    if (!this.canSubmit) return;

    const { dateFrom, dateTo } = this.dateForm.value;

    this.filteredData = {
      ...(this.filteredData || {}),
      date_from: dateFrom ? dateFrom.toISOString() : null,
      date_to: dateTo ? dateTo.toISOString() : null,
    };

    this.getOrders();
  }

  // ====== API calls ======

  async getOrders() {
    if (!this.vendorFirm?._id) {
      console.warn('Missing vendorFirm._id');
      return;
    }

    const body = {
      vendorFirmId: this.vendorFirm._id,
      fromDate: this.filteredData?.date_from,
      toDate: this.filteredData?.date_to,
    };

    await this.fetchDailyBulkOrders(body);
  }

  async fetchDailyBulkOrders(body: any) {
    try {
      const res = await this.apiMainService.fetchDailyBulkOrdersbysearchObj(body);
      this.orders = Array.isArray(res) ? res : [];
      this.buildSummaries();
    } catch (err: any) {
      this.orders = [];
      this.orderWise = [];
      this.vendorTotals = { count: 0, orderAmount: 0, totalVendorAmt: 0 };
    }
  }

  // ====== Data processing (minimal) ======

  private buildSummaries() {
    this.orderWise = this.orders.map((o: any) => {
      const orderDateRaw = o.orderDate?.$date || o.orderDate || o.createdAt || null;

      // Determine customer name with fallback
      let customerName = '';
      if (o.pocDetails?.pocName) {
        customerName = o.pocDetails.pocName;
      } else {
        customerName = o.customerName || o.pocName || o.orgName || '';
      }

      return {
        orderNo: Number(o.orderNo) || 0,
        orderDateIST: this.formatToIST(orderDateRaw),
        customerName: customerName,
        orderAmount: Number(o.orderAmount) || 0,
        vendorLedgerAmt: Number(o.vendorLedgerAmt) || Number(o.amount) || 0, // Fallback to total amount if ledger not set
      };
    });

    this.vendorTotals = this.orderWise.reduce(
      (acc, r) => {
        acc.count += 1;
        acc.orderAmount += r.orderAmount;
        acc.totalVendorAmt += r.vendorLedgerAmt;
        return acc;
      },
      { count: 0, orderAmount: 0, totalVendorAmt: 0 } as VendorTotals
    );

    this.mainPageIndex = 0;
  }

  private formatToIST(dateInput: any): string {
    if (!dateInput) return '';

    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';

    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }


  private buildRangeLabel(from?: Date | null, to?: Date | null): string {
    if (!from && !to) return 'All Dates';

    const fmt = (d: Date | null | undefined) =>
      d
        ? d.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        : '';

    if (from && to) return `${fmt(from)} to ${fmt(to)}`;
    if (from) return `From ${fmt(from)}`;
    if (to) return `Till ${fmt(to)}`;
    return 'All Dates';
  }


  async exportDatewiseSummaryExcel() {
    if (!this.hasData) return;

    // ===== Build DATEWISE summary from orderWise =====
    type DateGroup = {
      dateLabel: string;
      count: number;
      orderAmount: number;
      vendorAmt: number;
    };

    const byDateMap = new Map<string, DateGroup>();

    for (const r of this.orderWise) {
      const key = r.orderDateIST || 'Unknown Date';

      if (!byDateMap.has(key)) {
        byDateMap.set(key, {
          dateLabel: key,
          count: 0,
          orderAmount: 0,
          vendorAmt: 0,
        });
      }

      const g = byDateMap.get(key)!;
      g.count += 1;
      g.orderAmount += Number(r.orderAmount) || 0;
      g.vendorAmt += Number(r.vendorLedgerAmt) || 0;
    }

    // Convert to array & sort by actual date (if possible)
    const groups: DateGroup[] = Array.from(byDateMap.values()).sort((a, b) => {
      const da = new Date(a.dateLabel);
      const db = new Date(b.dateLabel);
      const na = isNaN(da.getTime()) ? 0 : da.getTime();
      const nb = isNaN(db.getTime()) ? 0 : db.getTime();
      return na - nb;
    });

    // ===== ExcelJS workbook =====
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Datewise Summary');

    const currencyFmt = '₹#,##0.00';

    // Resolve vendor name + date range
    const vendorName =
      this.vendorFirm?.vendorFirmName ||
      this.vendorFirm?.name ||
      'Vendor Firm';

    const from = this.dateForm.get('dateFrom')?.value || null;
    const to = this.dateForm.get('dateTo')?.value || null;
    const rangeLabel = this.buildRangeLabel(from, to);

    // ===== Title row (merge A1:D1) =====
    ws.mergeCells('A1:D1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `Vendor Datewise Summary — ${vendorName} (${rangeLabel})`;
    titleCell.font = { bold: true, size: 13 };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // ===== Header row (A2:D2) =====
    const headers = [
      'Date',                // A
      'Orders',              // B
      'Total Order Amount',  // C
      'Total Vendor Amount', // D
    ];

    const headerRow = ws.addRow(headers);
    headerRow.eachCell((c: any) => {
      c.font = { bold: true };
      c.alignment = { vertical: 'middle', horizontal: 'center' };
      c.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEFEFEF' },
      };
      c.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    ws.getRow(2).height = 22;

    // Column widths
    const widths = [18, 10, 22, 22];
    widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));

    // ===== Data rows (start from row 3) =====
    let totalCount = 0;
    let totalOrderAmount = 0;
    let totalVendorAmt = 0;

    for (const g of groups) {
      const row = ws.addRow([
        g.dateLabel,       // Date as string (already IST formatted)
        g.count,           // Orders
        g.orderAmount,     // Total Order Amount
        g.vendorAmt,       // Total Vendor Amount
      ]);

      // Alignments
      row.getCell(1).alignment = { horizontal: 'center' }; // Date
      row.getCell(2).alignment = { horizontal: 'center' }; // Orders

      // Currency columns: C, D
      row.getCell(3).numFmt = currencyFmt;
      row.getCell(4).numFmt = currencyFmt;
      row.getCell(3).alignment = { horizontal: 'right' };
      row.getCell(4).alignment = { horizontal: 'right' };

      // Borders
      row.eachCell((c: any) => {
        c.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      // Grand totals
      totalCount += g.count;
      totalOrderAmount += g.orderAmount;
      totalVendorAmt += g.vendorAmt;
    }

    // ===== GRAND TOTAL row =====
    ws.addRow([]); // spacer

    const gtRow = ws.addRow([
      'GRAND TOTAL',         // A
      totalCount,            // B Orders
      totalOrderAmount,      // C Total Order Amount
      totalVendorAmt,        // D Total Vendor Amount
    ]);

    gtRow.font = { bold: true };
    gtRow.getCell(1).alignment = { horizontal: 'center' };
    gtRow.getCell(2).alignment = { horizontal: 'center' };

    gtRow.getCell(3).numFmt = currencyFmt;
    gtRow.getCell(4).numFmt = currencyFmt;
    gtRow.getCell(3).alignment = { horizontal: 'right' };
    gtRow.getCell(4).alignment = { horizontal: 'right' };

    gtRow.eachCell((c: any) => {
      c.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // ===== Save file =====
    const buf = await wb.xlsx.writeBuffer();
    const safeVendor = String(vendorName || 'Vendor')
      .replace(/[\\/:*?"<>|]/g, '–')
      .trim();
    const safeRange = rangeLabel.replace(/[\\/:*?"<>|]/g, '–');

    const fileName = `${safeVendor}-Vendor-Datewise-Summary-${safeRange}.xlsx`;
    const blob = new Blob([buf], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName);
  }

  async exportItemwiseSummaryExcel() {
    if (!this.orders || !this.orders.length) return;

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Itemwise Summary');

    const currencyFmt = '₹#,##0.00';

    // For title + filename only
    const vendorName =
      this.vendorFirm?.vendorFirmName ||
      this.vendorFirm?.name ||
      'Vendor Firm';

    const from = this.dateForm.get('dateFrom')?.value || null;
    const to = this.dateForm.get('dateTo')?.value || null;
    const rangeLabel = this.buildRangeLabel(from, to);

    // ===== Title row (merge A1:D1) =====
    ws.mergeCells('A1:D1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `Vendor Itemwise Summary — ${vendorName} (${rangeLabel})`;
    titleCell.font = { bold: true, size: 13 };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // ===== Headers (ONLY 4 COLUMNS) =====
    const headers = [
      'Item Name',             // A
      'Meal Price',            // B
      'Count',                 // C
      'Pay Amount To Kitchen', // D
    ];

    const headerRow = ws.addRow(headers);
    headerRow.eachCell((c: any) => {
      c.font = { bold: true };
      c.alignment = { vertical: 'middle', horizontal: 'center' };
      c.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEFEFEF' },
      };
      c.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    ws.getRow(2).height = 22;

    // Column widths
    const widths = [30, 16, 10, 22];
    widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));

    // ===== Totals =====
    let totalQty = 0;
    let totalPayToKitchenAmount = 0; // sum of (count * payAmtToKitchen)

    // ===== Data rows =====
    for (const o of this.orders) {
      const items = Array.isArray(o.itemList) ? o.itemList : [];

      for (const it of items) {
        const itemName =
          it.itemName ||
          it.mealConfigName ||
          it.deliveredItem ||
          it.mealName ||
          '';

        const mealPrice = Number(it.mealPrice) || 0;
        const qty = Number(it.count) || 0;
        const payToKitchen = (it.payAmtToKitchen !== undefined) ? Number(it.payAmtToKitchen) : 0;

        totalQty += qty;
        totalPayToKitchenAmount += qty * payToKitchen;

        const row = ws.addRow([
          itemName,       // A
          mealPrice,      // B
          qty,            // C
          payToKitchen,   // D
        ]);

        // Alignments
        row.getCell(1).alignment = { horizontal: 'left' };    // Item Name
        row.getCell(2).alignment = { horizontal: 'right' };   // Meal Price
        row.getCell(3).alignment = { horizontal: 'center' };  // Count
        row.getCell(4).alignment = { horizontal: 'right' };   // Pay to Kitchen

        // Number formats
        row.getCell(2).numFmt = currencyFmt; // Meal Price
        row.getCell(4).numFmt = currencyFmt; // Pay Amount To Kitchen

        // Borders
        row.eachCell((c: any) => {
          c.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      }
    }

    // ===== GRAND TOTAL row (same 4 columns) =====
    ws.addRow([]); // spacer

    const gtRow = ws.addRow([
      'GRAND TOTAL',          // A
      '',                     // B (no total mealPrice)
      totalQty,               // C total count
      totalPayToKitchenAmount // D total pay amount to kitchen (qty * pay)
    ]);

    gtRow.font = { bold: true };
    gtRow.getCell(1).alignment = { horizontal: 'center' };
    gtRow.getCell(3).alignment = { horizontal: 'center' };
    gtRow.getCell(4).alignment = { horizontal: 'right' };

    gtRow.getCell(4).numFmt = currencyFmt;

    gtRow.eachCell((c: any) => {
      c.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // ===== Save file =====
    const buf = await wb.xlsx.writeBuffer();
    const safeVendor = String(vendorName || 'Vendor')
      .replace(/[\\/:*?"<>|]/g, '–')
      .trim();
    const safeRange = rangeLabel.replace(/[\\/:*?"<>|]/g, '–');

    const fileName = `${safeVendor}-Itemwise-Minimal-${safeRange}.xlsx`;
    const blob = new Blob([buf], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface VendorTotals {
  count: number;
  orderAmount: number;
  totalVendorAmt: number;
}


@Component({
  selector: 'app-bulk-order-report',
  templateUrl: './bulk-order-report.component.html',
  styleUrls: ['./bulk-order-report.component.scss']
})
export class BulkOrderReportComponent implements OnInit {

  @Input() vendorFirmInfo: any;
  @Input() filteredData: any;
  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;
  public readonly Math = Math;
  orders: any[] = [];
  vendorFirm: any;
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
  mainPageIndex = 0;
  mainPageSize = 5;
  mainPageSizeOptions = [5, 10, 25, 50, 100];

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService,
    private apiMainService: ApiMainService
  ) {
    this.dateForm = this.fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    const vendorFirm = this.localStorageService.getCacheData('VENDOR_FIRM_EDIT');
    this.vendorFirm = vendorFirm;
  }

  get pagedOrderWise() {
    const start = this.mainPageIndex * this.mainPageSize;
    return this.orderWise?.slice(start, start + this.mainPageSize);
  }

  get hasData(): boolean {
    return this.orderWise?.length > 0;
  }

  get canSubmit(): boolean {
    const { dateFrom, dateTo } = this.dateForm.value;
    return !!(this.vendorFirm?._id && dateFrom && dateTo);
  }

  trackByOrder = (_: number, r: any) => r.orderNo ?? r._id ?? _;

  onSubmit() {
    if (!this.canSubmit) return;

    const { dateFrom, dateTo } = this.dateForm.value;

    this.filteredData = {
      ...(this.filteredData || {}),
      date_from: dateFrom ? dateFrom.toISOString() : null,
      date_to: dateTo ? dateTo.toISOString() : null,
    };
    this.fetchBulkOrders();
  }

  async fetchBulkOrders() {
    try {
      const body = {
        vendorFirmId: this.vendorFirm?._id,
        fromDate: this.filteredData?.date_from,
        toDate: this.filteredData?.date_to,
      };
      const res = await this.apiMainService.fetchBulkOrdersbyfilter(body);
      if (res) {
        this.orders = res.orders;
        this.orderWise = res.orderWise;
        this.vendorTotals = res.vendorTotals;
      } else {
        this.orders = [];
        this.orderWise = [];
        this.vendorTotals = { count: 0, orderAmount: 0, totalVendorAmt: 0 };
      }
    } catch (e) {
      console.error("Error while fetching bulk orders", e);
    }
  }

  onMainPage(event: any) {
    this.mainPageIndex = event.pageIndex;
    this.mainPageSize = event.pageSize;
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

    const vendorName =
      this.vendorFirm?.vendorFirmName ||
      this.vendorFirm?.name ||
      'Vendor Firm';

    const from = this.dateForm.get('dateFrom')?.value || null;
    const to = this.dateForm.get('dateTo')?.value || null;
    const rangeLabel = this.buildRangeLabel(from, to);

    // ===== Title row (merge A1:B1) =====
    ws.mergeCells('A1:B1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `Vendor Itemwise Summary — ${vendorName} (${rangeLabel})`;
    titleCell.font = { bold: true, size: 13 };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // ===== Headers (ONLY 2 COLUMNS) =====
    const headers = [
      'Item Name', // A
      'Count',     // B
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
    const widths = [35, 15];
    widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));

    // ===== Totals =====
    let totalQty = 0;

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

        const qty = Number(it.count) || 0;
        totalQty += qty;

        const row = ws.addRow([
          itemName, // A
          qty,      // B
        ]);

        row.getCell(1).alignment = { horizontal: 'left' };
        row.getCell(2).alignment = { horizontal: 'center' };

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

    // ===== GRAND TOTAL row =====
    ws.addRow([]); // spacer

    const gtRow = ws.addRow([
      'GRAND TOTAL',
      totalQty,
    ]);

    gtRow.font = { bold: true };
    gtRow.getCell(1).alignment = { horizontal: 'center' };
    gtRow.getCell(2).alignment = { horizontal: 'center' };

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

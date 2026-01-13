import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonSelectConfig } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

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
      acc.count += g.totals.count;
      acc.item += g.totals.itemAmount;
      acc.subsidy += g.totals.subsidy;
      acc.gross += g.totals.gross;
      return acc;
    }, init);
  }

  // Totals for CURRENT PAGE (optional: show/hide in UI)
  get pageTotals() {
    const init = { count: 0, item: 0, subsidy: 0, gross: 0 };
    return this.pagedDateGroups.reduce((acc, g) => {
      acc.count += g.totals.count;
      acc.item += g.totals.itemAmount;
      acc.subsidy += g.totals.subsidy;
      acc.gross += g.totals.gross;
      return acc;
    }, init);
  }

  // ---------- Excel Exports ----------
  private async createExcelWorkbook(): Promise<ExcelJS.Workbook> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Deskdyne';
    workbook.created = new Date();
    return workbook;
  }

  private async saveExcelFile(workbook: ExcelJS.Workbook, fileName: string) {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.xlsx`);
  }

  async exportDatewiseSummary() {
    const workbook = await this.createExcelWorkbook();
    const worksheet = workbook.addWorksheet('Datewise Summary');

    // Headers
    worksheet.columns = [
      { header: 'Date', key: 'date', width: 25 },
      { header: 'Orders Count', key: 'count', width: 15 },
      { header: 'Item Amount (₹)', key: 'item', width: 20 },
      { header: 'Subsidy (₹)', key: 'subsidy', width: 20 },
      { header: 'Gross (₹)', key: 'gross', width: 20 },
    ];

    // Styling Header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: 'center' };

    // Data
    this.dateGroups.forEach(g => {
      worksheet.addRow({
        date: g.dateLabel,
        count: g.totals.count,
        item: this.round2(g.totals.itemAmount),
        subsidy: this.round2(g.totals.subsidy),
        gross: this.round2(g.totals.gross)
      });
    });

    // Grand Total
    const grand = this.grandTotals;
    const totalRow = worksheet.addRow({
      date: 'TOTAL',
      count: grand.count,
      item: this.round2(grand.item),
      subsidy: this.round2(grand.subsidy),
      gross: this.round2(grand.gross)
    });
    totalRow.font = { bold: true };

    await this.saveExcelFile(workbook, `Outlet_Billing_Summary_${new Date().getTime()}`);
  }

  async exportDatewiseDetailed() {
    const workbook = await this.createExcelWorkbook();
    const worksheet = workbook.addWorksheet('Detailed Report');

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Order No', key: 'orderNo', width: 25 },
      { header: 'Customer', key: 'customer', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Item Amount (₹)', key: 'item', width: 15 },
      { header: 'Subsidy (₹)', key: 'subsidy', width: 15 },
      { header: 'Gross (₹)', key: 'gross', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    worksheet.getRow(1).font = { bold: true };

    for (const g of this.dateGroups) {
      for (const o of g.orders) {
        worksheet.addRow({
          date: g.dateLabel,
          orderNo: o.orderNo || o._id,
          customer: o.customerName || '',
          phone: o.customerPhoneNo || '',
          item: this.round2(this.getItemAmount(o)),
          subsidy: this.round2(this.getSubsidy(o)),
          gross: this.round2(this.getGross(o)),
          status: o.orderstatus || o.status || ''
        });
      }
    }

    await this.saveExcelFile(workbook, `Outlet_Billing_Detailed_${new Date().getTime()}`);
  }

  // ---------- PDF Export ----------
  exportPdf() {
    const docDefinition: any = {
      content: [
        { text: 'Outlet Billing Report', style: 'header' },
        { text: `Generated on: ${new Date().toLocaleString()}`, style: 'subheader' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              // Header
              [
                { text: 'Date', style: 'tableHeader' },
                { text: 'Orders', style: 'tableHeader', alignment: 'center' },
                { text: 'Item Amt (₹)', style: 'tableHeader', alignment: 'right' },
                { text: 'Subsidy (₹)', style: 'tableHeader', alignment: 'right' },
                { text: 'Gross (₹)', style: 'tableHeader', alignment: 'right' }
              ],
              // Body
              ...this.dateGroups.map(g => [
                g.dateLabel,
                { text: g.totals.count.toString(), alignment: 'center' },
                { text: this.round2(g.totals.itemAmount).toFixed(2), alignment: 'right' },
                { text: this.round2(g.totals.subsidy).toFixed(2), alignment: 'right' },
                { text: this.round2(g.totals.gross).toFixed(2), alignment: 'right' }
              ]),
              // Footer (Grand Total)
              [
                { text: 'TOTAL', style: 'tableHeader', bold: true },
                { text: this.grandTotals.count.toString(), alignment: 'center', bold: true },
                { text: this.grandTotals.item.toFixed(2), alignment: 'right', bold: true },
                { text: this.grandTotals.subsidy.toFixed(2), alignment: 'right', bold: true },
                { text: this.grandTotals.gross.toFixed(2), alignment: 'right', bold: true }
              ]
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 10, italics: true, margin: [0, 0, 0, 10] },
        tableHeader: { bold: true, fontSize: 12, color: 'black', fillColor: '#f0f0f0' }
      }
    };

    pdfMake.createPdf(docDefinition).download(`Outlet_Billing_Report_${new Date().getTime()}.pdf`);
  }

  private round2(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }
}


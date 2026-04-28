import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonSelectConfig } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ApiMainService } from '@service/apiService/apiMain.service';
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
    credits: number;
    debits: number;
  };
};

interface SummaryRow {
  'Date (Label)': string;
  'Transactions Count': number;
  'Credits (₹)': number;
  'Debits (₹)': number;
}

interface DetailedRow {
  'Date (Label)': string;
  'Transaction ID': string;
  'Employee ID': string;
  'Type': string;
  'Amount (₹)': number;
  'Status': string;
}

@Component({
  selector: 'app-company-wallet-billing',
  templateUrl: './company-wallet-billing.component.html',
  styleUrls: ['./company-wallet-billing.component.scss']
})
export class CompanyWalletBillingComponent implements OnInit {
  @Input() selectedOrg: any;
  public readonly Math = Math;

  orders: any[] = [];
  dateGroups: DayGroup[] = [];

  headerConfig: CommonSelectConfig = {
    mode: 'cafeteria', // Changed to 'cafeteria' to hide outlet dropdown
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
    if (e.org_id) { // Changed to org_id
      this.filteredData = e;
      this.getOrders();
    }
  }

  async getOrders() {
    const body = {
      orgId: this.filteredData.org_id,
      startDate: this.filteredData.date_from,
      endDate: this.filteredData.date_to,
      // walletType: 'billing',
    };
    this.getCompanyOrganizationTransactionHistory(body);
  }

  async getCompanyOrganizationTransactionHistory(body: any) {
    try {
      const res: any = await this.apiMainService.getCompanyOrganizationTransactionHistory(body);
      this.orders = Array.isArray(res) ? res : [];
      this.buildDatewiseGroups();
      this.resetAllPagers();
    } catch (err) {
      this.orders = [];
      this.dateGroups = [];
      this.resetAllPagers();
    }
  }

  getTxnAmount(txn: any): number {
    if (txn.transactionType === 'CREDIT') {
      return Number(txn.cashbackPoints || 0);
    } else {
      return Number(txn.usedAmount || 0);
    }
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
      const rawDate = o?.createdAt ?? new Date(); // Using createdAt from wallet transaction
      const key = this.istDateKey(rawDate);
      if (!map.has(key)) {
        map.set(key, {
          dateKey: key,
          dateLabel: this.istDateLabel(rawDate),
          orders: [],
          totals: { count: 0, credits: 0, debits: 0 }
        });
      }
      const g = map.get(key)!;
      g.orders.push(o);

      const amount = this.getTxnAmount(o);
      g.totals.count += 1;

      if (o.transactionType === 'CREDIT') {
        g.totals.credits += amount;
      } else {
        g.totals.debits += amount;
      }
    }
    this.dateGroups = Array.from(map.values()).sort((a, b) => a.dateKey < b.dateKey ? 1 : -1);
  }

  // Totals across ALL dates
  get grandTotals() {
    const init = { count: 0, credits: 0, debits: 0 };
    return this.dateGroups.reduce((acc, g) => {
      acc.count += g.totals.count;
      acc.credits += g.totals.credits;
      acc.debits += g.totals.debits;
      return acc;
    }, init);
  }

  // Totals for CURRENT PAGE (optional: show/hide in UI)
  get pageTotals() {
    const init = { count: 0, credits: 0, debits: 0 };
    return this.pagedDateGroups.reduce((acc, g) => {
      acc.count += g.totals.count;
      acc.credits += g.totals.credits;
      acc.debits += g.totals.debits;
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
      { header: 'Txns Count', key: 'count', width: 15 },
      { header: 'Credits (₹)', key: 'credits', width: 20 },
      { header: 'Debits (₹)', key: 'debits', width: 20 },
    ];

    // Styling Header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: 'center' };

    // Data
    this.dateGroups.forEach(g => {
      worksheet.addRow({
        date: g.dateLabel,
        count: g.totals.count,
        credits: this.round2(g.totals.credits),
        debits: this.round2(g.totals.debits)
      });
    });

    // Grand Total
    const grand = this.grandTotals;
    const totalRow = worksheet.addRow({
      date: 'TOTAL',
      count: grand.count,
      credits: this.round2(grand.credits),
      debits: this.round2(grand.debits)
    });
    totalRow.font = { bold: true };

    await this.saveExcelFile(workbook, `Wallet_Billing_Summary_${new Date().getTime()}`);
  }

  async exportDatewiseDetailed() {
    const workbook = await this.createExcelWorkbook();
    const worksheet = workbook.addWorksheet('Detailed Report');

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Transaction ID', key: 'txnId', width: 25 },
      { header: 'Employee ID', key: 'empId', width: 15 },
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Amount (₹)', key: 'amount', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Wallet', key: 'wallet', width: 15 },
    ];

    worksheet.getRow(1).font = { bold: true };

    for (const g of this.dateGroups) {
      for (const o of g.orders) {
        worksheet.addRow({
          date: g.dateLabel,
          txnId: o._id,
          empId: o.employeeId || '',
          type: o.transactionType || '',
          amount: this.round2(this.getTxnAmount(o)),
          status: o.status || '',
          wallet: o.walletType || ''
        });
      }
    }

    await this.saveExcelFile(workbook, `Wallet_Billing_Detailed_${new Date().getTime()}`);
  }

  // ---------- PDF Export ----------
  exportPdf() {
    const docDefinition: any = {
      content: [
        { text: 'Company Wallet Billing Report', style: 'header' },
        { text: `Generated on: ${new Date().toLocaleString()}`, style: 'subheader' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              // Header
              [
                { text: 'Date', style: 'tableHeader' },
                { text: 'Txns', style: 'tableHeader', alignment: 'center' },
                { text: 'Credits (₹)', style: 'tableHeader', alignment: 'right' },
                { text: 'Debits (₹)', style: 'tableHeader', alignment: 'right' }
              ],
              // Body
              ...this.dateGroups.map(g => [
                g.dateLabel,
                { text: g.totals.count.toString(), alignment: 'center' },
                { text: this.round2(g.totals.credits).toFixed(2), alignment: 'right' },
                { text: this.round2(g.totals.debits).toFixed(2), alignment: 'right' }
              ]),
              // Footer (Grand Total)
              [
                { text: 'TOTAL', style: 'tableHeader', bold: true },
                { text: this.grandTotals.count.toString(), alignment: 'center', bold: true },
                { text: this.grandTotals.credits.toFixed(2), alignment: 'right', bold: true },
                { text: this.grandTotals.debits.toFixed(2), alignment: 'right', bold: true }
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

    pdfMake.createPdf(docDefinition).download(`Wallet_Billing_Report_${new Date().getTime()}.pdf`);
  }

  private round2(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }
}

import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs ?? {};

interface Filter {
  orgId: string;
  fromDate?: Date | null;
  toDate?: Date | null;
}

interface Transaction {
  orderDateIST: string; // The formatted string "DD-MM-YYYY, hh:mm:ss" used for display
  rawDate: Date; // The actual Date object for sorting/grouping
  customerName: string;
  phoneNo: string;
  walletType: string;
  transactionType: string;
  amount: number;
  remark: string;
  status: string;
  location?: string;
}



@Component({
  selector: 'app-wallet-billing',
  templateUrl: './wallet-billing.component.html',
  styleUrls: ['./wallet-billing.component.scss']
})
export class WalletBillingComponent {
  @Input() selectedOrg: any;
  public readonly Math = Math;
  filterObj: Filter = {
    orgId: ''
  };

  orglist: any[] = [];
  orgDetails: any = {};
  orgAdmin: any;
  isDisabled: boolean = false;
  isOrgAdmin: boolean = false;

  dateForm: FormGroup<{
    dateFrom: FormControl<Date | null>;
    dateTo: FormControl<Date | null>;
  }>;

  // Transaction Data
  allTransactions: Transaction[] = [];
  pagedTransactions: Transaction[] = [];

  // Paginator
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 20, 50, 100];

  private readonly IST_TZ = 'Asia/Kolkata';

  constructor(private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
    private dialog: MatDialog,
    private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      dateFrom: new FormControl<Date | null>(null),
      dateTo: new FormControl<Date | null>(null),
    });
  }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitialData();
    }
  }

  async getOrgList() {
    try {
      const data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        { countOnly: false },
        1
      );
      this.orglist = data || [];
      this.setInitialData();
    } catch (error) {
      console.error(error);
    }
  }

  // ---------- Logic ----------

  setInitialData() {
    if (this.selectedOrg) {
      this.filterObj.orgId = this.selectedOrg._id;
      this.isDisabled = true;
    }
    if (this.orgAdmin?.role === 'ORGADMIN') {
      this.isOrgAdmin = true;
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
    }
  }

  setOrgDetails() {
    this.orgDetails = this.orglist.find(
      (org: any) => org._id === this.filterObj?.orgId
    );
  }

  submitFilter() {
    if (!this.filterObj.orgId) return;
    this.filterObj.fromDate = this.dateForm.get('dateFrom')?.value;
    this.filterObj.toDate = this.dateForm.get('dateTo')?.value;
    this.getCustomerProfileList();
  }

  async getCustomerProfileList() {
    try {
      const res = await this.apiMainService.getCustomerWalletListByOrgId(this.filterObj);
      this.parseResponse(res);
    } catch (err: any) {
      console.log(err);
      this.allTransactions = [];
      this.pagedTransactions = [];
    }
  }

  parseResponse(data: any[]) {
    this.allTransactions = [];
    if (!data || !Array.isArray(data)) return;

    data.forEach(customer => {
      const commonDetails = {
        customerName: customer.userName || customer.email || 'Unknown',
        phoneNo: customer.phoneNo || '-',
        location: customer.location || '-'
      };

      if (customer.transactions && Array.isArray(customer.transactions)) {
        customer.transactions.forEach((txn: any) => {
          this.allTransactions.push({
            ...commonDetails,
            rawDate: new Date(txn.created_at),
            orderDateIST: this.formatDate(txn.created_at),
            walletType: txn.walletType,
            transactionType: txn.transactionType,
            amount: txn.transaction_points,
            remark: txn.remark,
            status: txn.status
          });
        });
      }
    });

    // Sort by date desc
    this.allTransactions.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

    this.pageIndex = 0;
    this.updatePagedData();
  }

  updatePagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedTransactions = this.allTransactions.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  get grandTotals() {
    const init = { credit: 0, debit: 0, net: 0, count: 0 };
    return this.allTransactions.reduce((acc, t) => {
      acc.count++;
      if (t.transactionType === 'Credit') {
        acc.credit += t.amount;
      } else if (t.transactionType === 'Debit') {
        acc.debit += t.amount;
      }
      acc.net = acc.credit - acc.debit;
      return acc;
    }, init);
  }

  // ---------- Helpers ----------



  private formatDate(dateString: string): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  private round2(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  // ---------- Export Logic ----------

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

  async exportSummaryExcel() {
    // Summary now implies just the grand totals or maybe a monthly summary?
    // User said "General is fine", so maybe Detailed is enough, but I'll keep Summary as a single row or just Monthly summary?
    // Let's make "Summary" just the Grand Totals for now to simplify, or maybe group by Month/Year if useful.
    // For now, I will export the Grand Total row only as "Summary" since Date-wise is removed.

    const workbook = await this.createExcelWorkbook();
    const worksheet = workbook.addWorksheet('Wallet Summary');

    worksheet.columns = [
      { header: 'Metric', key: 'metric', width: 25 },
      { header: 'Value', key: 'value', width: 25 },
    ];

    worksheet.getRow(1).font = { bold: true };

    const grand = this.grandTotals;
    worksheet.addRow({ metric: 'Total Transactions', value: grand.count });
    worksheet.addRow({ metric: 'Total Credit', value: this.round2(grand.credit) });
    worksheet.addRow({ metric: 'Total Debit', value: this.round2(grand.debit) });
    worksheet.addRow({ metric: 'Net Points', value: this.round2(grand.net) });

    await this.saveExcelFile(workbook, `Wallet_Summary_${new Date().getTime()}`);
  }

  async exportDetailedExcel() {
    const workbook = await this.createExcelWorkbook();
    const worksheet = workbook.addWorksheet('Detailed Wallet Report');

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 25 },
      { header: 'Customer', key: 'customer', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Type', key: 'type', width: 10 },
      { header: 'Wallet', key: 'wallet', width: 15 },
      { header: 'Points', key: 'amount', width: 15 },
      { header: 'Remark', key: 'remark', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    worksheet.getRow(1).font = { bold: true };

    for (const t of this.allTransactions) {
      worksheet.addRow({
        date: t.orderDateIST,
        customer: t.customerName,
        phone: t.phoneNo,
        type: t.transactionType,
        wallet: t.walletType,
        amount: this.round2(t.amount),
        remark: t.remark,
        status: t.status
      });
    }

    await this.saveExcelFile(workbook, `Wallet_Detailed_${new Date().getTime()}`);
  }

  exportPdf() {
    const docDefinition: any = {
      content: [
        { text: 'Wallet Billing Report', style: 'header' },
        { text: `Generated on: ${new Date().toLocaleString()}`, style: 'subheader' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Date', style: 'tableHeader' },
                { text: 'Customer', style: 'tableHeader' },
                { text: 'Type', style: 'tableHeader' },
                { text: 'Points', style: 'tableHeader', alignment: 'right' },
                { text: 'Remark', style: 'tableHeader' },
                { text: 'Status', style: 'tableHeader' }
              ],
              ...this.allTransactions.map(t => [
                { text: t.orderDateIST, fontSize: 9 },
                { text: t.customerName, fontSize: 9 },
                { text: t.transactionType, fontSize: 9 },
                { text: this.round2(t.amount).toFixed(2), alignment: 'right', fontSize: 9 },
                { text: t.remark || '-', fontSize: 9 },
                { text: t.status, fontSize: 9 }
              ]),
              [
                { text: 'TOTAL', style: 'tableHeader', bold: true, colSpan: 3 },
                {},
                {},
                { text: this.grandTotals.net.toFixed(2), alignment: 'right', bold: true },
                { text: '', colSpan: 2 },
                {}
              ]
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 10, italics: true, margin: [0, 0, 0, 10] },
        tableHeader: { bold: true, fontSize: 10, color: 'black', fillColor: '#f0f0f0' }
      }
    };

    pdfMake.createPdf(docDefinition).download(`Wallet_Report_${new Date().getTime()}.pdf`);
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PolicyService } from '@service/policy.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletTransactionDialogComponent } from './wallet-transaction-dialog/wallet-transaction-dialog.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-customer-wallet',
  templateUrl: './customer-wallet.component.html',
  styleUrls: ['./customer-wallet.component.scss']
})
export class CustomerWalletComponent implements OnInit {
  @Input() userObj: any;
  walletDetails: any;

  // Pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex = 0;
  pageSize = 10;
  estimatedTotal = 0;
  walletList: any = [];
  allTransactions: any[] = [];
  filteredTransactions: any[] = [];

  // Filter
  selectedWalletType: string = 'all';
  walletTypeFilterList = [
    { value: 'all', viewValue: 'All' },
    { value: 'billing', viewValue: 'Billing' },
    { value: 'complimentary', viewValue: 'Complimentary' },
    { value: 'others', viewValue: 'Others' }
  ];

  // Date Range
  dateRange: { start: Date | null; end: Date | null } = { start: null, end: null };
  maxDate = new Date();
  isLoading = false;

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Initialize with current date
    const today = new Date();
    this.dateRange = { start: today, end: today };

    this.getWalletBalance();
    this.getWalletList();
  }

  async getWalletBalance() {
    try {
      this.walletDetails = await this.apiMainService.getWalletBalance(this.userObj._id);
    } catch (e) {
      console.error(e);
    }
  }

  openTransactionDialog(actionType: 'add' | 'deduct') {
    const dialogRef = this.dialog.open(WalletTransactionDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {
        actionType,
        customerName: this.userObj.userName
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.success) {
        await this.processTransaction(actionType, result);
      }
    });
  }

  async processTransaction(type: 'add' | 'deduct', data: any) {
    const walletObj = {
      customerId: this.userObj._id,
      customerName: this.userObj.userName,
      walletType: data.walletType,
      rewardsPoints: data.amount,
      remark: data.remark
    };

    try {
      if (type === 'add') {
        await this.apiMainService.depositeInWallet(this.userObj._id, walletObj);
      } else {
        await this.apiMainService.withdrawFromWallet(this.userObj._id, walletObj);
      }
      this.snackBar.open(`Money ${type === 'add' ? 'Added' : 'Deducted'} Successfully`, 'OK', { duration: 3000 });
      this.getWalletBalance();
      this.getWalletList();
    } catch (error) {
      console.error(error);
      this.snackBar.open('Transaction Failed', 'OK', { duration: 3000 });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateView();
  }

  onFilterChange() {
    this.pageIndex = 0;
    if (this.paginator) this.paginator.firstPage();
    this.updateView();
  }

  applyDateFilter() {
    this.pageIndex = 0;
    if (this.paginator) this.paginator.firstPage();
    this.getWalletList();
  }

  clearDateFilter() {
    const today = new Date();
    this.dateRange = { start: today, end: today };
    this.getWalletList();
  }

  private formatDateForApi(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async getWalletList() {
    if (!this.dateRange.start || !this.dateRange.end) {
      this.snackBar.open('Please select a date range', 'OK', { duration: 3000 });
      return;
    }

    try {
      this.isLoading = true;
      const fromDate = this.formatDateForApi(this.dateRange.start);
      const toDate = this.formatDateForApi(this.dateRange.end);

      const res: any = await this.apiMainService.getUserTransactionHistoryByFromDate(
        this.userObj._id,
        fromDate,
        toDate
      );

      if (res) {
        this.allTransactions = Array.isArray(res) ? res : (res.data || []);
        this.updateView();
      }
    } catch (error) {
      console.error('Error loading wallet list', error);
      this.allTransactions = [];
      this.updateView();
    } finally {
      this.isLoading = false;
    }
  }

  updateView() {
    // 1. Filter by wallet type
    let temp = this.allTransactions;
    if (this.selectedWalletType !== 'all') {
      temp = temp.filter(tx => tx.walletType?.toLowerCase() === this.selectedWalletType.toLowerCase());
    }
    this.filteredTransactions = temp;
    this.estimatedTotal = this.filteredTransactions.length;

    // 2. Paginate
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.walletList = this.filteredTransactions.slice(start, end);
  }

  // Excel Export
  async exportToExcel() {
    if (!this.filteredTransactions || this.filteredTransactions.length === 0) {
      this.snackBar.open('No data to export', 'OK', { duration: 3000 });
      return;
    }

    try {
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('Wallet History');

      // Headers
      const headers = ['Date', 'Transaction Type', 'Wallet Type', 'Amount', 'Remark'];
      const headerRow = ws.addRow(headers);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEFEF' } };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });

      // Column widths
      ws.columns = [
        { width: 20 },
        { width: 18 },
        { width: 15 },
        { width: 15 },
        { width: 40 }
      ];

      // Data
      const curFmt = '₹#,##0.00';
      const dateFmt = 'dd-mmm-yyyy hh:mm AM/PM';
      let totalAmount = 0;
      let creditTotal = 0;
      let debitTotal = 0;

      this.filteredTransactions.forEach(tx => {
        const amount = Number(tx.transaction_points || 0);
        totalAmount += amount;

        // Track credit/debit totals
        const txType = (tx.transactionType || '').toLowerCase();
        const isCredit = txType.includes('credit') || txType.includes('deposite') || txType.includes('add');
        if (isCredit) {
          creditTotal += amount;
        } else {
          debitTotal += amount;
        }

        const rowData = [
          new Date(tx.created_at),
          tx.transactionType || '-',
          tx.walletType || '-',
          amount,
          tx.remark || ''
        ];
        const row = ws.addRow(rowData);

        row.getCell(1).numFmt = dateFmt;
        row.getCell(4).numFmt = curFmt;

        // Light green background for credit rows
        if (isCredit) {
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          });
        } else {
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          });
        }
      });

      // Credit Total Row
      const creditRow = ws.addRow(['', '', 'Credit Total', creditTotal, '']);
      creditRow.getCell(3).font = { bold: true };
      creditRow.getCell(3).alignment = { horizontal: 'right' };
      creditRow.getCell(4).font = { bold: true };
      creditRow.getCell(4).numFmt = curFmt;
      creditRow.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4CAF50' } };
      creditRow.getCell(4).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      creditRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });

      // Debit Total Row
      const debitRow = ws.addRow(['', '', 'Debit Total', debitTotal, '']);
      debitRow.getCell(3).font = { bold: true };
      debitRow.getCell(3).alignment = { horizontal: 'right' };
      debitRow.getCell(4).font = { bold: true };
      debitRow.getCell(4).numFmt = curFmt;
      debitRow.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF44336' } };
      debitRow.getCell(4).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      debitRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });

      // Grand Total Row
      const totalRow = ws.addRow(['', '', 'Grand Total', totalAmount, '']);
      totalRow.getCell(3).font = { bold: true };
      totalRow.getCell(3).alignment = { horizontal: 'right' };
      totalRow.getCell(4).font = { bold: true };
      totalRow.getCell(4).numFmt = curFmt;
      totalRow.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD700' } };
      totalRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });

      // Save
      const buf = await wb.xlsx.writeBuffer();
      const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const userName = this.userObj?.userName?.replace(/\s+/g, '_') || 'Customer';
      const dateLabel = this.dateRange.start
        ? `${this.dateRange.start.getDate()}_${this.dateRange.start.getMonth() + 1}`
        : 'All';
      saveAs(blob, `Wallet_History_${userName}.xlsx`);

    } catch (error) {
      console.error('Export failed', error);
      this.snackBar.open('Failed to export Excel', 'OK', { duration: 3000 });
    }
  }

  // Helper for status styling
  getTxnTypeColorClass(type: string): string {
    if (!type) return '';
    if (type === 'credit' || type.toLowerCase().includes('credit') || type.includes('added')) return 'green';
    if (type === 'debit' || type.toLowerCase().includes('debit') || type.includes('deducted')) return 'red';
    return 'primary2';
  }

  getStatusColorClass(status: string | undefined): string {
    if (!status) return 'text-muted';
    switch (status.toLowerCase()) {
      case 'success': return 'green';
      case 'pending': return 'orange';
      case 'failed': return 'red';
      default: return 'text-muted';
    }
  }

  getWalletTypeColorClass(type: string): string {
    if (!type) return 'gray';
    switch (type.toLowerCase()) {
      case 'billing': return 'blue';
      case 'complimentary': return 'purple';
      case 'others': return 'gray';
      default: return 'gray';
    }
  }

  getTxnTypeChipColor(type: string | undefined): string {
    if (!type) return 'gray';
    const t = type.toLowerCase();
    if (t.includes('credit') || t.includes('deposite') || t.includes('add')) return 'green';
    if (t.includes('debit') || t.includes('withdraw') || t.includes('deduct')) return 'red';
    if (t.includes('refund')) return 'purple';
    if (t.includes('order')) return 'blue';
    return 'gray';
  }

  isCredit(type: string | undefined): boolean {
    if (!type) return false;
    const t = type.toLowerCase();
    return t.includes('credit') || t.includes('deposite') || t.includes('add');
  }
}

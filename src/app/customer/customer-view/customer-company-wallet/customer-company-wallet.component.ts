import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CustomerSharedService } from '../../customer-shared.service';

@Component({
  selector: 'app-customer-company-wallet',
  templateUrl: './customer-company-wallet.component.html',
  styleUrls: ['./customer-company-wallet.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class CustomerCompanyWalletComponent implements OnInit {
  @Input() userObj: any;
  walletDetails: any;
  walletList: any = [];
  allTransactions: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private apiMainService: ApiMainService,
    private snackBar: MatSnackBar,
    private customerSharedService: CustomerSharedService
  ) { }

  ngOnInit() {
    this.customerSharedService.userDetails$.subscribe(details => {
      if (details) {
        this.userObj = details;
        this.getWalletBalance();
        this.getWalletHistory();
      }
    });
  }

  async getWalletBalance() {
    try {
      const phoneNo = this.userObj.phoneNo;
      this.walletDetails = await this.apiMainService.getCompanyWalletByPhoneNo(phoneNo);
    } catch (e) {
      console.error(e);
    }
  }

  async getWalletHistory() {
    try {
      const phoneNo = this.userObj.phoneNo;
      const res: any = await this.apiMainService.getCompanyWalletTransactionHistoryByPhoneNo(phoneNo);
      if (res) {
        this.allTransactions = Array.isArray(res) ? res : (res.data || []);
        this.updateView();
      }
    } catch (e) {
      console.error(e);
    }
  }

  updateView() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.walletList = this.allTransactions.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateView();
  }

  async exportToExcel() {
    if (!this.allTransactions || this.allTransactions.length === 0) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Company Wallet History');

    // Headers
    worksheet.columns = [
      { header: 'Date', key: 'date', width: 25 },
      { header: 'Wallet', key: 'walletType', width: 15 },
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Amount (₹)', key: 'amount', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Remark', key: 'remark', width: 40 },
    ];

    // Styling Header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: 'center' };

    // Data
    this.allTransactions.forEach(tx => {
      const amount = tx.transactionType === 'CREDIT' ? tx.cashbackPoints : tx.usedAmount;
      worksheet.addRow({
        date: new Date(tx.createdAt).toLocaleString(),
        walletType: tx.walletType || '-',
        type: tx.transactionType || '-',
        amount: Number(amount) || 0,
        status: tx.status || '-',
        remark: tx.remark || '-'
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `Company_Wallet_History_${this.userObj.phoneNo}_${new Date().getTime()}.xlsx`;
    saveAs(blob, fileName);
  }

  getTxnTypeColorClass(type: string): string {
    if (!type) return '';
    if (type === 'credit' || type.toLowerCase().includes('credit') || type.includes('added')) return 'green';
    if (type === 'debit' || type.toLowerCase().includes('debit') || type.includes('deducted')) return 'red';
    return 'primary2';
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

  getWalletTypeColorClass(type: string): string {
    if (!type) return 'gray';
    switch (type.toLowerCase()) {
      case 'billing': return 'blue';
      case 'complimentary': return 'purple';
      case 'others': return 'gray';
      default: return 'gray';
    }
  }
}

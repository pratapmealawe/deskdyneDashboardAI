import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletTransactionDialogComponent } from './wallet-transaction-dialog/wallet-transaction-dialog.component';

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

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
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
      // Reset pagination to first page on new transaction
      this.getWalletList(); // Reload all data
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

  async getWalletList() {
    try {
      // Fetch all transactions (client-side pagination)
      const res: any = await this.apiMainService.userRewardsPointsHistory(this.userObj._id, 1, 1000); // Fetching large chunk

      if (res) {
        this.allTransactions = Array.isArray(res) ? res : (res.data || []);
        this.updateView();
      }
    } catch (error) {
      console.error('Error loading wallet list', error);
    }
  }

  updateView() {
    // 1. Filter
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

  // Helper for status styling (same as wallet-details)
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
}

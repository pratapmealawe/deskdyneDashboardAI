import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { PermissionsService } from '@service/permission.service';
import { SearchFilterService } from '@service/search-filter.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorFirmWalletTxnDialogComponent } from '../vendor-firm/vendor-firm-view/vendor-firm-wallet-details/vendor-firm-wallet-txn-dialog/vendor-firm-wallet-txn-dialog.component';
import { WalletHistoryDialogComponent } from './wallet-history-dialog/wallet-history-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-vendor-payout',
  templateUrl: './vendor-payout.component.html',
  styleUrls: ['./vendor-payout.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, WalletHistoryDialogComponent]
})
export class VendorPayoutComponent implements OnInit {
  searchControl = new FormControl('');
  pageSize: number = 5;
  pageIndex: number = 0;
  pagedVendorWallet: any[] = [];
  vendorWalletList: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private permissionsService: PermissionsService,
    private localStorageService: LocalStorageService,
    private confirmationModalService: ConfirmationModalService,
    private searchService: SearchFilterService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllVendorWallets()
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      const config = { keys: ['vendorFirmName'] };
      if (value) {
        const result = this.searchService.searchData(
          this.vendorWalletList,
          config,
          value ?? ''
        )
        this.pagedVendorWallet = [...result]
      } else {
        this.pagedVendorWallet = [...this.vendorWalletList]
        this.updateCard()
      }
    })
  }

  async getAllVendorWallets() {
    try {
      const res = await this.apiMainService.getAllVendorWallet();
      this.vendorWalletList = res || [];
      this.pageIndex = 0; // Reset page on refresh
      this.updateCard();
    } catch (error) {
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateCard();
  }

  updateCard() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedVendorWallet = this.vendorWalletList.slice(start, end);
  }

  openTxnDialog(vendor: any, kind: 'Credit' | 'Debit' | 'Transfer', transferSource?: 'wallet' | 'subsidy' | 'daily') {
    const ref = this.dialog.open(VendorFirmWalletTxnDialogComponent, {
      width: '420px',
      disableClose: true,
      data: {
        vendorFirmId: vendor.vendorFirmId || vendor._id, // Use correct ID field
        kind,
        transferSource,
        subsidyBalance: transferSource === 'subsidy' ? (vendor.subsidy_balance || 0) : undefined,
        dailyBalance: transferSource === 'daily' ? (vendor.daily_balance || 0) : undefined,
        walletBalance: transferSource === 'wallet' ? (vendor.wallet_balance || 0) : undefined,
      }
    });

    ref.afterClosed().subscribe(async (res) => {
      if (!res || !res.success) return;

      // Refresh list to show updated balances
      await this.getAllVendorWallets();

      const verb = kind === 'Transfer' ?
        (transferSource === 'wallet' ? 'Wallet balance transferred' :
          transferSource === 'daily' ? 'Daily balance transferred' : 'Subsidy transferred') :
        `${kind}ed`;
      this.snackBar.open(`${verb} successfully`, 'OK', { duration: 2500 });
    });
  }

  openVendorDetails(vendor: any) {
    // this.router.navigate(['/vendor-firm'], { queryParams: { vendorFirmId: vendor.vendorFirmId || vendor._id } });
  }

  openHistoryDialog(vendor: any) {
    this.dialog.open(WalletHistoryDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: { vendorFirmInfo: vendor }
    });
  }
}


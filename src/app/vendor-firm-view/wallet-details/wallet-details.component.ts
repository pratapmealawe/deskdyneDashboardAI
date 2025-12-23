import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { WalletTxnDialogComponent } from '../wallet-txn-dialog/wallet-txn-dialog.component';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss']
})
export class WalletDetailsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() vendorFirmInfo: any;

  walletBalance: number = 0;
  subsidyBalance: number = 0;
  dailyBalance: number = 0;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private apiMainService: ApiMainService) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.getWalletBalance();
  }

  ngOnDestroy(): void {
  }

  openTxnDialog(kind: 'Credit' | 'Debit' | 'Transfer', transferSource?: 'wallet' | 'subsidy' | 'daily') {
    const ref = this.dialog.open(WalletTxnDialogComponent, {
      width: '420px',
      disableClose: true,
      data: {
        vendorFirmId: this.vendorFirmInfo._id,
        kind,
        transferSource,
        subsidyBalance: transferSource === 'subsidy' ? this.subsidyBalance : undefined,
        dailyBalance: transferSource === 'daily' ? this.dailyBalance : undefined,
        walletBalance: transferSource === 'wallet' ? this.walletBalance : undefined,
      }
    });

    ref.afterClosed().subscribe(async (res) => {
      if (!res || !res.success) return;
      await this.getWalletBalance();
      // Reload logic is now handled by the child component on init/change, 
      // but since we are parent and child is separate, we might need a way to trigger refresh in child.
      // For now, simpler implementation: let child handle its own refresh if possible, or trigger it via ViewChild.
      // However, the cleanest way is often just to let the user refresh or use a shared service.
      // Given the prompt, the user didn't ask for explicit parent-child refresh coordination, but we can add if needed.
      // Actually, since we want "seamless", reloading parent data (balances) is sufficient here.
      // The child (history) might be stale.

      const verb = kind === 'Transfer' ? (transferSource === 'wallet' ? 'Wallet balance transferred' : transferSource === 'daily' ? 'Daily balance transferred' : 'Subsidy transferred') : `${kind}ed`;
      this.snackBar.open(`${verb} successfully`, 'OK', { duration: 2500 });

      // Force refresh of child component? Using a signal approach or just re-assigning input if that triggers ngOnChanges
      this.vendorFirmInfo = { ...this.vendorFirmInfo };
    });
  }

  // ——— Data fetchers ———
  async getWalletBalance() {
    try {
      const wallet: any = await this.apiMainService.getVendorWallet(this.vendorFirmInfo._id);
      const bal = Number(wallet?.wallet_balance ?? 0);
      this.walletBalance = Number.isFinite(bal) ? +bal.toFixed(2) : 0;
      const subBal = Number(wallet?.subsidy_balance ?? 0);
      this.subsidyBalance = Number.isFinite(subBal) ? +subBal.toFixed(2) : 0;
      const dailyBal = Number(wallet?.daily_balance ?? 0);
      this.dailyBalance = Number.isFinite(dailyBal) ? +dailyBal.toFixed(2) : 0;
    } catch (error) {
      console.log('error while fetching wallet');
    }
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss']
})
export class WalletDetailsComponent implements OnChanges, OnInit {
  @Input() vendorFirmInfo: any;
  walletBalance: any = 0;
  transactionHistoryList: any = [];
  paginationOver = false;

  constructor(private apiMainService: ApiMainService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.vendorFirmInfo);
  }

  ngOnInit(): void {
    this.getWalletBalance();
    this.getVendorTransactionHistory();
  }

  async getWalletBalance() {
    try {
      const wallet: any = await this.apiMainService.getVendorWallet(this.vendorFirmInfo._id);

      if (wallet && wallet.wallet_balance > 0) {
        this.walletBalance = parseFloat(wallet.wallet_balance).toFixed(2);
      }
    } catch (error) {
      console.log('error while fetching wallet')
    }
  }

  async getVendorTransactionHistory() {
    this.transactionHistoryList = []
    try {
      const transactionHistoryList = await this.apiMainService.vendorTransactionHistory(this.vendorFirmInfo._id);

      if (transactionHistoryList && transactionHistoryList.length > 0) {
        this.transactionHistoryList = [...this.transactionHistoryList, ...transactionHistoryList];
        console.log(this.transactionHistoryList);
      } else {
        this.paginationOver = true;
      }

    } catch (error) {
      this.paginationOver = true;
    }
  }

}

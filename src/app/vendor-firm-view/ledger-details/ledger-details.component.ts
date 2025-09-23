import { Component, Input, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-ledger-details',
  templateUrl: './ledger-details.component.html',
  styleUrls: ['./ledger-details.component.scss']
})
export class LedgerDetailsComponent implements OnInit {
  @Input() vendorFirmInfo: any;
  fromDate: string | null = null;
  toDate: string | null = null;
  vendorLegerList: any = [];
  totalVendorLegersBalance: any = 0;
  transactionHistoryList: any = [];
  constructor(private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    const today = new Date().toISOString();
    this.fromDate = today;
    this.toDate = today;
    this.getVendorLedger();
  }

  async getVendorLedger() {
    try {
      const body = {
        vendorFirmId: this.vendorFirmInfo._id,
        fromDate: this.fromDate,
        toDate: this.toDate
      }

      const ledgers = await this.apiMainService.getVendorLedgerByFirmAndTypeAndDate(body);
      if (ledgers && ledgers.length > 0) {
        this.vendorLegerList = ledgers;
        console.log(this.vendorLegerList);

        this.totalVendorLegersBalance = ledgers.filter((item: any) => item.status === 'New').reduce((sum: number, item: any) => sum + item.vendorLedgerAmt, 0);
        console.log(this.totalVendorLegersBalance);

      } else {
        this.vendorLegerList = []
      }
    } catch (error) {
      console.log('error while fetching ledger')
    }
  }
}

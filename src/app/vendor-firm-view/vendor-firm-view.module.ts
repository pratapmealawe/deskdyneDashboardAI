import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorFirmViewRoutingModule } from './vendor-firm-view-routing.module';
import { VendorFirmViewComponent } from './vendor-firm-view.component';
import { VendorDetailsComponent } from '../common-components/vendor-details/vendor-details.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { LedgerDetailsComponent } from './ledger-details/ledger-details.component';


@NgModule({
  declarations: [
    VendorFirmViewComponent,
    VendorDetailsComponent,
    WalletDetailsComponent,
    LedgerDetailsComponent
  ],
  imports: [
    CommonModule,
    VendorFirmViewRoutingModule
  ],
  exports: [VendorFirmViewComponent]
})
export class VendorFirmViewModule { }

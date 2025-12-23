import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorWalletDashboardRoutingModule } from './vendor-wallet-dashboard-routing.module';
import { VendorWalletDashboardComponent } from './vendor-wallet-dashboard.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    VendorWalletDashboardComponent
  ],
  imports: [
    CommonModule,
    VendorWalletDashboardRoutingModule,
    MaterialModule
  ]
})
export class VendorWalletDashboardModule { }

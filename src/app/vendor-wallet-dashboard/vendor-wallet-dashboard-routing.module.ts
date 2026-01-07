import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorWalletDashboardComponent } from './vendor-wallet-dashboard.component';

const routes: Routes = [
  { path: '', component: VendorWalletDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorWalletDashboardRoutingModule { }

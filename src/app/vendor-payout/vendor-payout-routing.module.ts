import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorPayoutComponent } from './vendor-payout.component';

const routes: Routes = [
  { path: '', component: VendorPayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorPayoutRoutingModule { }

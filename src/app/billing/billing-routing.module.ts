import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing.component';
import { OutletBillingComponent } from './outlet-billing/outlet-billing.component';

const routes: Routes = [
  {path: "", component: BillingComponent},
  {path: "outlet-billing", component: OutletBillingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }

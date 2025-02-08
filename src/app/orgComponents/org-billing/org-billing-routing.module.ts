import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgBillingComponent } from './org-billing.component';

const routes: Routes = [
  {
    path:'', 
    component:OrgBillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgBillingRoutingModule { }
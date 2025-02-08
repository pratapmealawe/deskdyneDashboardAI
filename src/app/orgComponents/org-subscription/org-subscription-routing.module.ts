import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgSubscriptionComponent } from './org-subscription.component';

const routes: Routes = [
  {
    path:'', 
    component:OrgSubscriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgSubscriptionRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgBulkOrderHistoryComponent } from './org-bulk-order-history.component';

const routes: Routes = [
  {
    path:'', 
    component:OrgBulkOrderHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgBulkOrderHistoryRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgManualOrdersComponent } from './org-manual-orders.component';

const routes: Routes = [
  {path: "", component: OrgManualOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgManualOrdersRoutingModule { }

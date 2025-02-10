import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgPreOrdersComponent } from './org-pre-orders.component';

const routes: Routes = [
  {path: "", component: OrgPreOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgPreOrdersRoutingModule { }

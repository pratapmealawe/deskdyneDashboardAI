import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgOrdersComponent } from './org-orders.component';

const routes: Routes = [
  {path: "", component: OrgOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgOrdersRoutingModule { }

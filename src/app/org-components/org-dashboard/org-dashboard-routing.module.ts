import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDashboardComponent } from './org-dashboard.component';

const routes: Routes = [
  {path: "", component:OrgDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgDashboardRoutingModule { }

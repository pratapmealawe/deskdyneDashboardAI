import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgReportsComponent } from './org-reports.component';

const routes: Routes = [
  {
    path:'', 
    component:OrgReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgReportsRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgIncidentManagementComponent } from './org-incident-management.component';

const routes: Routes = [
  {path: "", component: OrgIncidentManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgIncidentManagementRoutingModule { }

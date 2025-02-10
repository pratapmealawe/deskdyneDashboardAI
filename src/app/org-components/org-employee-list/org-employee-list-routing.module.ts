import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgEmployeeListComponent } from './org-employee-list.component';

const routes: Routes = [
  {path: "", component: OrgEmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgEmployeeListRoutingModule { }

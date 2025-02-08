import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgChecklistComponent } from './org-checklist.component';

const routes: Routes = [
  {
    path:'', 
    component:OrgChecklistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgChecklistRoutingModule { }
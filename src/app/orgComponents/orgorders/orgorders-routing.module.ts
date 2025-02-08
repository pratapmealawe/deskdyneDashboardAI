import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgordersComponent } from './orgorders.component';

const routes: Routes = [
  {
    path:'', 
    component:OrgordersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgordersRoutingModule { }

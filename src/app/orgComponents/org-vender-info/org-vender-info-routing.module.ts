import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgVendorInfoComponent } from './org-vender-info.component';

const routes: Routes = [
  {
    path:'', 
    component:OrgVendorInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgVendorInfoRoutingModule { }
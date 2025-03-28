import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgRegistryComponent } from './org-registry.component';

const routes: Routes = [
  {
    path:'', component:OrgRegistryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRegistryRoutingModule { }

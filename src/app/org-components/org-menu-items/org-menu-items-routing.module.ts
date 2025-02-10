import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgMenuItemsComponent } from './org-menu-items.component';

const routes: Routes = [
  {path: "", component: OrgMenuItemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgMenuItemsRoutingModule { }

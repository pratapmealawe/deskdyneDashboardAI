import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletMasterMenuComponent } from './outlet-master-menu.component';

const routes: Routes = [
  {path: "", component: OutletMasterMenuComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletMasterMenuRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletOrdersComponent } from './outlet-orders.component';

const routes: Routes = [
  { path: '', component: OutletOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletOrdersRoutingModule { }

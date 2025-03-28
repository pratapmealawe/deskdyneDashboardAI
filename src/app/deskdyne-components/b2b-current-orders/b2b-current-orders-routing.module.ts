import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2bCurrentOrdersComponent } from './b2b-current-orders.component';

const routes: Routes = [
  {
    path:'', component:B2bCurrentOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B2bCurrentOrdersRoutingModule { }

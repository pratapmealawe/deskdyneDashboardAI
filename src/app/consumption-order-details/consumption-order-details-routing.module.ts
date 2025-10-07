import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumptionOrderDetailsComponent } from './consumption-order-details.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumptionOrderDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumptionOrderDetailsRoutingModule { }

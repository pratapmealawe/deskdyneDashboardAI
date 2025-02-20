import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2bFoodItemComponent } from './b2b-food-item.component';

const routes: Routes = [{
  path:'', component:B2bFoodItemComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B2bFoodItemRoutingModule { }

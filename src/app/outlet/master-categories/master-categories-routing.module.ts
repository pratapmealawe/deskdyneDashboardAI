import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCategoriesComponent } from './master-categories.component';

const routes: Routes = [
  {
    path:'', component:MasterCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCategoriesRoutingModule { }

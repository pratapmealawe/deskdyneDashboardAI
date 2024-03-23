import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOutletComponent } from './add-outlet.component';

const routes: Routes = [
  {
    path:'', component:AddOutletComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddOutletRoutingModule { }

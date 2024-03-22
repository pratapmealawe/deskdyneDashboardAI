import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from './outlet.component';

const routes: Routes = [
  {
    path:'', component:OutletComponent
  },
  {
    path:'add-outlet', loadChildren:()=>import ('./add-outlet/add-outlet.module').then(m=>m.AddOutletModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitChecklistComponent } from './submit-checklist.component';

const routes: Routes = [
  {
    path:'',
    component:SubmitChecklistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitChecklistRoutingModule { }

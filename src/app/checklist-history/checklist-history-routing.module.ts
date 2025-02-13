import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistHistoryComponent } from './checklist-history.component';

const routes: Routes = [{
  path:'',
  component:ChecklistHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistHistoryRoutingModule { }

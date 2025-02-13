import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistQuestionComponent } from './checklist-question.component';

const routes: Routes = [
  {
    path:'', component:ChecklistQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistQuestionRoutingModule { }

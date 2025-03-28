import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggessionsFeedbacksComponent } from './suggessions-feedbacks.component';

const routes: Routes = [{
  path:'',
  component:SuggessionsFeedbacksComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggessionsFeedbacksRoutingModule { }

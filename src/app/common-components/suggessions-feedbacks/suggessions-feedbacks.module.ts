import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggessionsFeedbacksRoutingModule } from './suggessions-feedbacks-routing.module';
import { SuggessionsFeedbacksComponent } from './suggessions-feedbacks.component';


@NgModule({
  declarations: [SuggessionsFeedbacksComponent],
  imports: [
    CommonModule,
    SuggessionsFeedbacksRoutingModule
  ],
})
export class SuggessionsFeedbacksModule { }

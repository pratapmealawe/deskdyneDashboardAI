import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggessionsFeedbacksRoutingModule } from './suggessions-feedbacks-routing.module';
import { SuggessionsFeedbacksComponent } from './suggessions-feedbacks.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [SuggessionsFeedbacksComponent],
  imports: [
    CommonModule,
    SuggessionsFeedbacksRoutingModule,
    MaterialModule
  ],
})
export class SuggessionsFeedbacksModule { }

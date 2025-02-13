import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistQuestionRoutingModule } from './checklist-question-routing.module';
import { ChecklistQuestionComponent } from './checklist-question.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChecklistQuestionComponent
  ],
  imports: [
    CommonModule,
    ChecklistQuestionRoutingModule,
    FormsModule
  ]
})
export class ChecklistQuestionModule { }

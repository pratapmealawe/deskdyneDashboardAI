import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistQuestionRoutingModule } from './checklist-question-routing.module';
import { ChecklistQuestionComponent } from './checklist-question.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ChecklistQuestionDialogComponent } from './checklist-question-dialog/checklist-question-dialog.component';


@NgModule({
  declarations: [
    ChecklistQuestionComponent,
    ChecklistQuestionDialogComponent
  ],
  imports: [
    CommonModule,
    ChecklistQuestionRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ChecklistQuestionModule { }

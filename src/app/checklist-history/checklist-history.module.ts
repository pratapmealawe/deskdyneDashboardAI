import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistHistoryRoutingModule } from './checklist-history-routing.module';
import { ChecklistHistoryComponent } from './checklist-history.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChecklistHistoryComponent],
  imports: [
    CommonModule,
    ChecklistHistoryRoutingModule,
    FormsModule
  ]
})
export class ChecklistHistoryModule { }

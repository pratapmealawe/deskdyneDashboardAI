import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistHistoryRoutingModule } from './checklist-history-routing.module';
import { ChecklistHistoryComponent } from './checklist-history.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonOutletCafeSelectModule } from '../common-outlet-cafe-select/common-outlet-cafe-select.module';


@NgModule({
  declarations: [ChecklistHistoryComponent],
  imports: [
    CommonModule,
    ChecklistHistoryRoutingModule,
    MaterialModule,
    CommonOutletCafeSelectModule,
    FormsModule
  ]
})
export class ChecklistHistoryModule { }

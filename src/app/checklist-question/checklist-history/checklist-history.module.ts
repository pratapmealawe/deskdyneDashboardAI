import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistHistoryRoutingModule } from './checklist-history-routing.module';
import { ChecklistHistoryComponent } from './checklist-history.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonOutletCafeSelectComponent } from '../../common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';

@NgModule({
  declarations: [ChecklistHistoryComponent],
  imports: [
    CommonModule,
    ChecklistHistoryRoutingModule,
    MaterialModule,
    CommonOutletCafeSelectComponent,
    FormsModule
  ]
})
export class ChecklistHistoryModule { }

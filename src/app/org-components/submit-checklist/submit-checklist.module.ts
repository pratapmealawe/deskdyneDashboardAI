import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmitChecklistRoutingModule } from './submit-checklist-routing.module';
import { SubmitChecklistComponent } from './submit-checklist.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SubmitChecklistComponent],
  imports: [
    CommonModule,
    SubmitChecklistRoutingModule,
    FormsModule
  ]
})
export class SubmitChecklistModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmitChecklistRoutingModule } from './submit-checklist-routing.module';
import { SubmitChecklistComponent } from './submit-checklist.component';
import { FormsModule } from '@angular/forms';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [SubmitChecklistComponent],
  imports: [
    CommonModule,
    SubmitChecklistRoutingModule,
    FormsModule,
    MaterialModule,
    CommonOutletCafeSelectModule
]
})
export class SubmitChecklistModule { }

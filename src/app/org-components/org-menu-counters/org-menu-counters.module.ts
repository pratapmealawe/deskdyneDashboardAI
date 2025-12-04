import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgMenuCountersRoutingModule } from './org-menu-counters-routing.module';
import { OrgMenuCountersComponent } from './org-menu-counters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";
import { MaterialModule } from 'src/app/material.module';
import { A11yModule } from "@angular/cdk/a11y";

@NgModule({
  declarations: [OrgMenuCountersComponent],
  imports: [CommonModule, OrgMenuCountersRoutingModule, ReactiveFormsModule, FormsModule, MaterialModule, CommonOutletCafeSelectModule, A11yModule],
  exports: [OrgMenuCountersComponent]
})
export class OrgMenuCountersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgMenuCountersRoutingModule } from './org-menu-counters-routing.module';
import { OrgMenuCountersComponent } from './org-menu-counters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [OrgMenuCountersComponent],
  imports: [CommonModule, OrgMenuCountersRoutingModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  exports: [OrgMenuCountersComponent]
})
export class OrgMenuCountersModule {}

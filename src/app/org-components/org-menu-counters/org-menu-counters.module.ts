import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgMenuCountersRoutingModule } from './org-menu-counters-routing.module';
import { OrgMenuCountersComponent } from './org-menu-counters.component';

@NgModule({
  declarations: [OrgMenuCountersComponent],
  imports: [CommonModule, OrgMenuCountersRoutingModule],
  exports: [OrgMenuCountersComponent]
})
export class OrgMenuCountersModule {}

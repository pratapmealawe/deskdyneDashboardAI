import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgEmployeeListRoutingModule } from './org-employee-list-routing.module';
import { OrgEmployeeListComponent } from './org-employee-list.component';

@NgModule({
  declarations: [OrgEmployeeListComponent],
  imports: [CommonModule, OrgEmployeeListRoutingModule],
})
export class OrgEmployeeListModule {}

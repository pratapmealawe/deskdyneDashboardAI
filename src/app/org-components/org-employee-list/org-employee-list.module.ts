import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgEmployeeListRoutingModule } from './org-employee-list-routing.module';
import { OrgEmployeeListComponent } from './org-employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrgEmployeeListComponent],
  imports: [
    CommonModule,
    OrgEmployeeListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [OrgEmployeeListComponent]
})
export class OrgEmployeeListModule {}

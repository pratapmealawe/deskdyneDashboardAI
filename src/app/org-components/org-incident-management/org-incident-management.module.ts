import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgIncidentManagementRoutingModule } from './org-incident-management-routing.module';
import { OrgIncidentManagementComponent } from './org-incident-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrgIncidentManagementComponent],
  imports: [
    CommonModule,
    OrgIncidentManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OrgIncidentManagementModule {}

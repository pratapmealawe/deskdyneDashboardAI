import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgIncidentManagementRoutingModule } from './org-incident-management-routing.module';
import { OrgIncidentManagementComponent } from './org-incident-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommonOutletCafeSelectModule } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.module';

import { AddIncidentDialogComponent } from './add-incident-dialog/add-incident-dialog.component';

@NgModule({
  declarations: [OrgIncidentManagementComponent, AddIncidentDialogComponent],
  imports: [
    CommonModule,
    OrgIncidentManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonOutletCafeSelectModule
  ],
})
export class OrgIncidentManagementModule { }

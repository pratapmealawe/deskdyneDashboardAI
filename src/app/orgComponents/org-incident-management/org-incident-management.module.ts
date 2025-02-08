import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgIncidentManagementRoutingModule } from './org-incident-management-routing.module';
import { OrgIncidentManagementComponent } from './org-incident-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgIncidentManagementComponent
  ],
  imports: [
    CommonModule,
    OrgIncidentManagementRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgIncidentManagementModule { }

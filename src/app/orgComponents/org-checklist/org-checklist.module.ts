import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgChecklistRoutingModule } from './org-checklist-routing.module';
import { OrgChecklistComponent } from './org-checklist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgChecklistComponent
  ],
  imports: [
    CommonModule,
    OrgChecklistRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgReportsModule { }

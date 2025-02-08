import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgReportsRoutingModule } from './org-reports-routing.module';
import { OrgReportsComponent } from './org-reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgReportsComponent
  ],
  imports: [
    CommonModule,
    OrgReportsRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgReportsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgEmployeeListRoutingModule } from './org-employee-list-routing.module';
import { OrgEmployeeListComponent } from './org-employee-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrgEmployeeListComponent
  ],
  imports: [
    CommonModule,
    OrgEmployeeListRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgEmployeeListModule { }

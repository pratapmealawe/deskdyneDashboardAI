import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgBillingRoutingModule } from './org-billing-routing.module';
import { OrgBillingComponent } from './org-billing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgBillingComponent
  ],
  imports: [
    CommonModule,
    OrgBillingRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgBillingModule { }

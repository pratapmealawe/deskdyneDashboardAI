import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgBillingRoutingModule } from './org-billing-routing.module';
import { OrgBillingComponent } from './org-billing.component';


@NgModule({
  declarations: [OrgBillingComponent],
  imports: [
    CommonModule,
    OrgBillingRoutingModule
  ],
  exports: [OrgBillingComponent]
})
export class OrgBillingModule { }

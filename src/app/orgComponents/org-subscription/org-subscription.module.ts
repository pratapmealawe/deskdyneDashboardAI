import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgSubscriptionRoutingModule } from './org-subscription-routing.module';
import { OrgSubscriptionComponent } from './org-subscription.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgSubscriptionComponent
  ],
  imports: [
    CommonModule,
    OrgSubscriptionRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgordersModule { }

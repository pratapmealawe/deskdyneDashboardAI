import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgReviewsRoutingModule } from './org-reviews-routing.module'
import { OrgReviewsComponent } from './org-reviews.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgReviewsComponent
  ],
  imports: [
    CommonModule,
    OrgReviewsRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgReviewsModule { }

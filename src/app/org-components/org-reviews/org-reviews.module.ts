import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgReviewsRoutingModule } from './org-reviews-routing.module';
import { FormsModule } from '@angular/forms';
import { OrgReviewsComponent } from './org-reviews.component';


@NgModule({
  declarations: [OrgReviewsComponent],
  imports: [
    CommonModule,
    OrgReviewsRoutingModule,
    FormsModule
  ],
  exports: [OrgReviewsComponent]
})
export class OrgReviewsModule { }

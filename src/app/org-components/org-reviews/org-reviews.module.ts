import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgReviewsRoutingModule } from './org-reviews-routing.module';
import { FormsModule } from '@angular/forms';
import { OrgReviewsComponent } from './org-reviews.component';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [OrgReviewsComponent],
  imports: [
    CommonModule,
    OrgReviewsRoutingModule,
    FormsModule,
    HighchartsChartModule,
  ],
  exports: [OrgReviewsComponent]
})
export class OrgReviewsModule { }

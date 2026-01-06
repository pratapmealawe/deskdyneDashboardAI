import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgReviewsRoutingModule } from './org-reviews-routing.module';
import { FormsModule } from '@angular/forms';
import { OrgReviewsComponent } from './org-reviews.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";
import { MaterialModule } from "src/app/material.module";
import { OrgOrderModule } from './org-order/org-order.module';


@NgModule({
  declarations: [OrgReviewsComponent],
  imports: [
    CommonModule,
    OrgReviewsRoutingModule,
    FormsModule,
    HighchartsChartModule,
    CommonOutletCafeSelectModule,
    MaterialModule,
    OrgOrderModule
  ],
  exports: [OrgReviewsComponent]
})
export class OrgReviewsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgReviewsRoutingModule } from './org-reviews-routing.module';
import { FormsModule } from '@angular/forms';
import { OrgReviewsComponent } from './org-reviews.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";
import { MaterialModule } from "src/app/material.module";
import { OrgOrderComponent } from './org-order/org-order.component';


@NgModule({
  declarations: [OrgReviewsComponent, OrgOrderComponent],
  imports: [
    CommonModule,
    OrgReviewsRoutingModule,
    FormsModule,
    HighchartsChartModule,
    CommonOutletCafeSelectModule,
    MaterialModule
],
  exports: [OrgReviewsComponent]
})
export class OrgReviewsModule { }

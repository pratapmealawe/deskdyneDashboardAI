import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgBulkOrderHistoryRoutingModule } from './org-bulk-order-history-routing.module';
import { OrgBulkOrderHistoryComponent } from './org-bulk-order-history.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [OrgBulkOrderHistoryComponent],
  imports: [
    CommonModule,
    OrgBulkOrderHistoryRoutingModule,
    FormsModule,
        ReactiveFormsModule,
        HighchartsChartModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
  ],
  exports: [OrgBulkOrderHistoryComponent]
})
export class OrgBulkOrderHistoryModule { }

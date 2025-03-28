import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgDashboardRoutingModule } from './org-dashboard-routing.module';
import { OrgDashboardComponent } from './org-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrgDashboardComponent],
  imports: [
    CommonModule,
    OrgDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class OrgDashboardModule {}

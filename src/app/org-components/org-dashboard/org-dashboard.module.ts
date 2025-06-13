import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgDashboardRoutingModule } from './org-dashboard-routing.module';
import { OrgDashboardComponent } from './org-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
        MatOptionModule,
  ],
  providers: [    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  exports: [OrgDashboardComponent]
})
export class OrgDashboardModule { }

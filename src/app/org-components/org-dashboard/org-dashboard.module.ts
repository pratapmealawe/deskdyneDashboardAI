import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgDashboardRoutingModule } from './org-dashboard-routing.module';
import { OrgDashboardComponent } from './org-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { HyperpureDashboardComponent } from './hyperpure-dashboard/hyperpure-dashboard.component';
import { OrgDashboardFilterDialogComponent } from './main-dashboard/org-dashboard-filter-dialog/org-dashboard-filter-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [OrgDashboardComponent, MainDashboardComponent, HyperpureDashboardComponent, OrgDashboardFilterDialogComponent],
  imports: [
    CommonModule,
    OrgDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MaterialModule
  ],
  providers: [    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  exports: [OrgDashboardComponent]
})
export class OrgDashboardModule { }

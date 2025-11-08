import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgDashboardRoutingModule } from './org-dashboard-routing.module';
import { OrgDashboardComponent } from './org-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { HyperpureDashboardComponent } from './hyperpure-dashboard/hyperpure-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [OrgDashboardComponent, MainDashboardComponent, HyperpureDashboardComponent],
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
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPseudoCheckboxModule
  ],
  providers: [    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  exports: [OrgDashboardComponent]
})
export class OrgDashboardModule { }

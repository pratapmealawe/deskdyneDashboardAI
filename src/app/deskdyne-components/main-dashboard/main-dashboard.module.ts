import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { MainDashboardComponent } from './main-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HighchartsChartModule } from 'highcharts-angular';
import { MaterialModule } from 'src/app/material.module';
import { MainDashboardFilterDialogComponent } from './main-dashboard-filter-dialog/main-dashboard-filter-dialog.component';


@NgModule({
  declarations: [
    MainDashboardComponent,
    MainDashboardFilterDialogComponent
  ],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

  ]
})
export class MainDashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HighchartsChartModule } from 'highcharts-angular';

import { ExcelExportRoutingModule } from './excel-export-routing.module';
import { ExcelExportComponent } from './excel-export.component'
import { FormsModule } from '@angular/forms';
import { CommonOutletCafeSelectModule } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.module';
import { DailyAdminExcelExportModule } from '../daily-admin-excel-export/daily-admin-excel-export.module';


@NgModule({
  declarations: [ExcelExportComponent],
  imports: [
    CommonModule,
    ExcelExportRoutingModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    HighchartsChartModule,
    CommonOutletCafeSelectModule,
    DailyAdminExcelExportModule
  ],
  providers: [DatePipe]
})
export class ExcelExportModule { }

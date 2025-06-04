import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OutletExcelExportRoutingModule } from './outlet-excel-export-routing.module';
import { OutletExcelExportComponent } from './outlet-excel-export.component';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    OutletExcelExportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OutletExcelExportRoutingModule,
    HighchartsChartModule
  ],
  providers: [DatePipe]
})
export class OutletExcelExportModule { }

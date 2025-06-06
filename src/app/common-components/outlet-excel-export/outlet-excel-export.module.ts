import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OutletExcelExportRoutingModule } from './outlet-excel-export-routing.module';
import { OutletExcelExportComponent } from './outlet-excel-export.component';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrderCardModule } from 'src/app/order-card/order-card.module';


@NgModule({
  declarations: [
    OutletExcelExportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OutletExcelExportRoutingModule,
    HighchartsChartModule,
    OrderCardModule
  ],
  providers: [DatePipe]
})
export class OutletExcelExportModule { }

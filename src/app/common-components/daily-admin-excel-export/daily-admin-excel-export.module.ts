import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from "@angular/material/chips";
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonOutletCafeSelectModule } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.module';
import { MaterialModule } from "src/app/material.module";
import { OrderCardModule } from 'src/app/order-card/order-card.module';
import { OrderFilterDialogModule } from "../order-filter-dialog/order-filter-dialog.module";
import { OtherOrdersModule } from 'src/app/other-orders/other-orders.module';
import { DailyAdminExcelExportComponent } from './daily-admin-excel-export.component';
import { DailyAdminExcelExportRoutingModule } from './daily-admin-excel-export-routing.module';


@NgModule({
  declarations: [
    DailyAdminExcelExportComponent
  ],
  exports: [
    DailyAdminExcelExportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DailyAdminExcelExportRoutingModule,
    HighchartsChartModule,
    OrderCardModule,
    CommonOutletCafeSelectModule,
    MatChipsModule,
    MaterialModule,
    OrderFilterDialogModule,
    OtherOrdersModule
  ],
  providers: [DatePipe]
})
export class DailyAdminExcelExportModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OutletExcelExportRoutingModule } from './outlet-excel-export-routing.module';
import { OutletExcelExportComponent } from './outlet-excel-export.component';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrderCardModule } from 'src/app/order-card/order-card.module';
import { CommonOutletCafeSelectModule } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.module';
import { MatChipsModule } from "@angular/material/chips";
import { MaterialModule } from "src/app/material.module";
import { OrderFilterDialogModule } from "../order-filter-dialog/order-filter-dialog.module";
import { OrgOutletOrdersComponent } from "src/app/organization/manage-organization/bulk/org-outlet-orders/org-outlet-orders.component";


@NgModule({
  declarations: [
    OutletExcelExportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OutletExcelExportRoutingModule,
    HighchartsChartModule,
    OrderCardModule,
    CommonOutletCafeSelectModule,
    MatChipsModule,
    MaterialModule,
    OrderFilterDialogModule,
    OrgOutletOrdersComponent
  ],
  providers: [DatePipe]
})
export class OutletExcelExportModule { }

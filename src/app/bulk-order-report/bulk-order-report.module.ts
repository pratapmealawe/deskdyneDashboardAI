import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkOrderReportComponent } from './bulk-order-report/bulk-order-report.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    BulkOrderReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    BulkOrderReportComponent
  ]
})
export class BulkOrderReportModule { }

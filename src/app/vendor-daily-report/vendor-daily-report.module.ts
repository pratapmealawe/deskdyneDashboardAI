import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDailyReportRoutingModule } from './vendor-daily-report-routing.module';
import { VendorDailyReportComponent } from './vendor-daily-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    VendorDailyReportComponent
  ],
  imports: [
    CommonModule,
    VendorDailyReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatTabsModule,
  ],
  exports: [VendorDailyReportComponent]
})
export class VendorDailyReportModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorReportRoutingModule } from './vendor-report-routing.module';
import { VendorReportComponent } from './vendor-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonOutletCafeSelectModule } from '../common-outlet-cafe-select/common-outlet-cafe-select.module';
import { ItemBreakdownComponent } from './item-breakdown/item-breakdown.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    VendorReportComponent,
    ItemBreakdownComponent,
  ],
  imports: [
    CommonModule,
    VendorReportRoutingModule,
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
    CommonOutletCafeSelectModule
  ],
  exports: [VendorReportComponent]
})
export class VendorReportModule { }

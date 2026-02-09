import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ExcelExportRoutingModule } from './excel-export-routing.module';
import { ExcelExportComponent } from './excel-export.component'
import { FormsModule } from '@angular/forms';
import { CommonOutletCafeSelectModule } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.module';


@NgModule({
  declarations: [ExcelExportComponent],
  imports: [
    CommonModule,
    ExcelExportRoutingModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    CommonOutletCafeSelectModule
  ],
  providers: [DatePipe]
})
export class ExcelExportModule { }

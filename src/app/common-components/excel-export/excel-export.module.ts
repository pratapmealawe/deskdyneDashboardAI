import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ExcelExportRoutingModule } from './excel-export-routing.module';
import {ExcelExportComponent} from './excel-export.component'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExcelExportComponent],
  imports: [
    CommonModule,
    ExcelExportRoutingModule,
    FormsModule
  ],
  providers:[DatePipe]
})
export class ExcelExportModule { }

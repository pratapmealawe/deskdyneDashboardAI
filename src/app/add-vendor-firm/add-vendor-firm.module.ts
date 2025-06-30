import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddVendorFirmRoutingModule } from './add-vendor-firm-routing.module';
import { AddVendorFirmComponent } from './add-vendor-firm.component';
import { VendorComplianceComponent } from './vendor-compliance/vendor-compliance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfuploadComponent } from '../pdfupload/pdfupload.component';


@NgModule({
  declarations: [
    AddVendorFirmComponent,
    VendorComplianceComponent
  ],
  imports: [
    CommonModule,
    AddVendorFirmRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PdfuploadComponent
  ]
})
export class AddVendorFirmModule { }

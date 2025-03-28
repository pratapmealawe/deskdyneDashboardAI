import { NgModule } from '@angular/core';
import { AddVendorCommponent } from './add-vendor.component';
import { AddVendorRoutingModule } from './add-vendor-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { VendorComplianceComponent} from './vendor-compliance/vendor-compliance.component';
import { PdfuploadComponent } from 'src/app/pdfupload/pdfupload.component';

@NgModule({
    declarations: [AddVendorCommponent,VendorComplianceComponent],
    imports: [AddVendorRoutingModule, ReactiveFormsModule, CommonModule,FormsModule,PdfuploadComponent],
})
export class AddVendorModule { }
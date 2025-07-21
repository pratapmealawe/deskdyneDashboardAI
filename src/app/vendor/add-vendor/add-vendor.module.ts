import { NgModule } from '@angular/core';
import { AddVendorCommponent } from './add-vendor.component';
import { AddVendorRoutingModule } from './add-vendor-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { VendorComplianceComponent} from './vendor-compliance/vendor-compliance.component';
import { PdfuploadComponent } from 'src/app/pdfupload/pdfupload.component';
import {MatRadioModule} from '@angular/material/radio';
import { SetGeolocationModule } from 'src/app/set-geolocation/set-geolocation.module';

@NgModule({
    declarations: [AddVendorCommponent,VendorComplianceComponent],
    imports: [AddVendorRoutingModule, ReactiveFormsModule, CommonModule,FormsModule,PdfuploadComponent, MatRadioModule, SetGeolocationModule],
})
export class AddVendorModule { }
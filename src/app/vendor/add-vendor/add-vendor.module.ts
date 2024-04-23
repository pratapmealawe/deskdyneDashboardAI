import { NgModule } from '@angular/core';
import { AddVendorCommponent } from './add-vendor.component';
import { AddVendorRoutingModule } from './add-vendor-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [AddVendorCommponent],
    imports: [AddVendorRoutingModule, ReactiveFormsModule, CommonModule,FormsModule]
})
export class AddVendorModule { }
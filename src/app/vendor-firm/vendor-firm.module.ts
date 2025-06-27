import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorFirmRoutingModule } from './vendor-firm-routing.module';
import { VendorFirmComponent } from './vendor-firm.component';


@NgModule({
  declarations: [
    VendorFirmComponent
  ],
  imports: [
    CommonModule,
    VendorFirmRoutingModule
  ]
})
export class VendorFirmModule { }

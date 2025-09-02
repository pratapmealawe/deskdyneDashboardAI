import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorFirmRoutingModule } from './vendor-firm-routing.module';
import { VendorFirmComponent } from './vendor-firm.component';
import { VendorFirmViewModule } from '../vendor-firm-view/vendor-firm-view.module';


@NgModule({
  declarations: [
    VendorFirmComponent
  ],
  imports: [
    CommonModule,
    VendorFirmRoutingModule,
    VendorFirmViewModule
  ]
})
export class VendorFirmModule { }

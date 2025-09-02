import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorFirmViewRoutingModule } from './vendor-firm-view-routing.module';
import { VendorFirmViewComponent } from './vendor-firm-view.component';
import { VendorDetailsComponent } from '../common-components/vendor-details/vendor-details.component';


@NgModule({
  declarations: [
    VendorFirmViewComponent,
    VendorDetailsComponent
  ],
  imports: [
    CommonModule,
    VendorFirmViewRoutingModule
  ],
  exports: [VendorFirmViewComponent]
})
export class VendorFirmViewModule { }

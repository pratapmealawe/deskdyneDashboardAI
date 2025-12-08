import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgVendorInfoRoutingModule } from './org-vendor-info-routing.module';
import { OrgVendorInfoComponent } from './org-vendor-info.component';
import { AddVendorFirmModule } from 'src/app/add-vendor-firm/add-vendor-firm.module';
import { MaterialModule } from "src/app/material.module";
@NgModule({
  declarations: [OrgVendorInfoComponent],
  imports: [CommonModule, OrgVendorInfoRoutingModule, AddVendorFirmModule, MaterialModule],
  exports: [OrgVendorInfoComponent]
})
export class OrgVendorInfoModule { }

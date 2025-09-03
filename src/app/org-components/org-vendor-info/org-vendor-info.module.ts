import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgVendorInfoRoutingModule } from './org-vendor-info-routing.module';
import { OrgVendorInfoComponent } from './org-vendor-info.component';
import { VendorComplianceComponent } from '../../add-vendor-firm/vendor-compliance/vendor-compliance.component'
import { AddVendorFirmModule } from 'src/app/add-vendor-firm/add-vendor-firm.module';
@NgModule({
  declarations: [OrgVendorInfoComponent],
  imports: [CommonModule, OrgVendorInfoRoutingModule, AddVendorFirmModule],
  exports: [OrgVendorInfoComponent]
})
export class OrgVendorInfoModule { }

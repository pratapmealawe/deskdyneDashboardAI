import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgVendorInfoRoutingModule } from './org-vendor-info-routing.module';
import { OrgVendorInfoComponent } from './org-vendor-info.component';

@NgModule({
  declarations: [OrgVendorInfoComponent],
  imports: [CommonModule, OrgVendorInfoRoutingModule],
  exports: [OrgVendorInfoComponent]
})
export class OrgVendorInfoModule {}

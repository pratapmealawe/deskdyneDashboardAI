import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgVendorInfoRoutingModule } from './org-vender-info-routing.module';
import { OrgVendorInfoComponent } from './org-vender-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgVendorInfoComponent
  ],
  imports: [
    CommonModule,
    OrgVendorInfoRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgVendorInfoModule { }

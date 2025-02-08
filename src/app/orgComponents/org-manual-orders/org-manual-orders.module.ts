import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgManualOrdersRoutingModule } from './org-manual-orders-routing.module';
import { OrgManualOrdersComponent } from './org-manual-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgManualOrdersComponent
  ],
  imports: [
    CommonModule,
    OrgManualOrdersRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgManualOrdersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgBulkOrderHistoryRoutingModule } from './org-bulk-order-history-routing.module';
import { OrgBulkOrderHistoryComponent } from './org-bulk-order-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrgBulkOrderHistoryComponent
  ],
  imports: [
    CommonModule,
    OrgBulkOrderHistoryRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
  ]
})
export class OrgBulkOrderHistoryModule { }

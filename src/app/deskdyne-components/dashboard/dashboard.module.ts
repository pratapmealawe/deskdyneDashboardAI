import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { OrgDashboardModule } from 'src/app/org-components/org-dashboard/org-dashboard.module';
import { OrgMenuItemsModule } from 'src/app/org-components/org-menu-items/org-menu-items.module';
import { OrgOrdersModule } from 'src/app/org-components/org-orders/org-orders.module';
import { OrgReviewsModule } from 'src/app/org-components/org-reviews/org-reviews.module';
import { OrgVendorInfoModule } from 'src/app/org-components/org-vendor-info/org-vendor-info.module';
import { OrgMenuCountersModule } from 'src/app/org-components/org-menu-counters/org-menu-counters.module';
import { OrgEmployeeListModule } from 'src/app/org-components/org-employee-list/org-employee-list.module';
import { OrgBulkOrderHistoryModule } from 'src/app/org-components/org-bulk-order-history/org-bulk-order-history.module';
import { OrgBillingModule } from 'src/app/org-components/org-billing/org-billing.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    HighchartsChartModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    OrgDashboardModule,
    OrgMenuItemsModule,
    OrgOrdersModule,
    OrgReviewsModule,
    OrgVendorInfoModule,
    OrgMenuCountersModule,
    OrgEmployeeListModule,
    OrgBulkOrderHistoryModule,
    OrgBillingModule
  ]
})
export class DashboardModule { }

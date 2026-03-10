import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { HighchartsChartModule } from 'highcharts-angular';
import { BillingModule } from 'src/app/billing/billing.module';
import { CustomerModule } from 'src/app/common-components/customer/customer.module';
import { AuditReportModule } from 'src/app/org-components/audit-report/audit-report.module';
import { OrgBulkOrderHistoryModule } from 'src/app/org-components/org-bulk-order-history/org-bulk-order-history.module';
import { OrgDashboardModule } from 'src/app/org-components/org-dashboard/org-dashboard.module';
import { OrgEmployeeListModule } from 'src/app/org-components/org-employee-list/org-employee-list.module';
import { OrgMenuCountersModule } from 'src/app/org-components/org-menu-counters/org-menu-counters.module';
import { OrgMenuItemsModule } from 'src/app/org-components/org-menu-items/org-menu-items.module';
import { OrgOrdersModule } from 'src/app/org-components/org-orders/org-orders.module';
import { OrgReviewsModule } from 'src/app/org-components/org-reviews/org-reviews.module';
import { OrgVendorInfoModule } from 'src/app/org-components/org-vendor-info/org-vendor-info.module';
import { OtherOrdersModule } from 'src/app/other-orders/other-orders.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


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
    MatIconModule,
    MatProgressSpinnerModule,
    OrgDashboardModule,
    OrgMenuItemsModule,
    OrgOrdersModule,
    OrgReviewsModule,
    OrgVendorInfoModule,
    OrgMenuCountersModule,
    OrgEmployeeListModule,
    OrgBulkOrderHistoryModule,
    BillingModule,
    AuditReportModule,
    CustomerModule,
    OtherOrdersModule
  ]
})
export class DashboardModule { }

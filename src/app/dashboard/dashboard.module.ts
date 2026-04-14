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
import { MainDashboardComponent } from 'src/app/organization-dashboard/main-dashboard/main-dashboard.component';
import { OrgMenuItemsComponent } from 'src/app/organization-dashboard/org-menu-items/org-menu-items.component';
import { OrgOutletOrdersComponent } from 'src/app/organization-dashboard/org-outlet-orders/org-outlet-orders.component';
import { OrgReviewsComponent } from 'src/app/organization-dashboard/org-reviews/org-reviews.component';
import { OrgVendorInfoComponent } from 'src/app/organization-dashboard/org-vendor-info/org-vendor-info.component';
import { OrgMenuCountersComponent } from 'src/app/organization-dashboard/org-menu-counters/org-menu-counters.component';
import { OrgEmployeeListComponent } from 'src/app/organization-dashboard/org-employee-list/org-employee-list.component';
import { OrgBulkOrderHistoryComponent } from 'src/app/organization-dashboard/org-bulk-order-history/org-bulk-order-history.component';
import { AuditReportComponent } from 'src/app/organization-dashboard/audit-report/audit-report.component';
import { OrgEmpPollComponent } from 'src/app/organization-dashboard/org-emp-poll/org-emp-poll.component';
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
    
    // Organization Dashboard Standalone Components
    MainDashboardComponent,
    OrgMenuItemsComponent,
    OrgOutletOrdersComponent,
    OrgReviewsComponent,
    OrgVendorInfoComponent,
    OrgMenuCountersComponent,
    OrgEmployeeListComponent,
    OrgBulkOrderHistoryComponent,
    AuditReportComponent,
    OrgEmpPollComponent,
    
    // Shared Shared Components
    BillingModule,
    CustomerModule,
    OtherOrdersModule
  ]
})
export class DashboardModule { }

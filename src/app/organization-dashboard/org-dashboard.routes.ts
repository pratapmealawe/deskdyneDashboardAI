import { Routes } from '@angular/router';
import { OrgDashboardComponent } from './org-dashboard.component';

export const ORG_DASHBOARD_ROUTES: Routes = [
  {
    path: "", component: OrgDashboardComponent,
    children: [
      { path: 'home', loadComponent: () => import('../home/home.component').then(m => m.HomeComponent) },
      { path: 'orgDashboard', loadComponent: () => import('./main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent) },
      { path: 'hyperpureDashboard', loadComponent: () => import('./hyperpure-dashboard/hyperpure-dashboard.component').then(m => m.HyperpureDashboardComponent) },
      { path: 'consumptionOrders', loadComponent: () => import('./org-consumption-order/org-consumption-order.component').then(m => m.OrgConsumptionOrderComponent) },
      { path: 'orgMenuItems', loadComponent: () => import('./org-menu-items/org-menu-items.component').then(m => m.OrgMenuItemsComponent) },
      { path: 'currentoutletOrder', loadComponent: () => import('../orders/outlet-orders/outlet-orders.component').then(m => m.OutletOrdersComponent) },


      { path: 'orgOrders', loadComponent: () => import('./org-outlet-orders/org-outlet-orders.component').then(m => m.OrgOutletOrdersComponent) },
      { path: 'orgPreOrders', loadComponent: () => import('./org-pre-orders/org-pre-orders.component').then(m => m.OrgPreOrdersComponent) },
      { path: 'orgSubcription', loadComponent: () => import('./org-subscription/org-subscription.component').then(m => m.OrgSubscriptionComponent) },
      { path: 'orgReviews', loadComponent: () => import('./org-reviews/org-reviews.component').then(m => m.OrgReviewsComponent) },
      { path: 'orgReports', loadComponent: () => import('./org-reports/org-reports.component').then(m => m.OrgReportsComponent) },
      { path: 'orgVendorInfo', loadComponent: () => import('./org-vendor-info/org-vendor-info.component').then(m => m.OrgVendorInfoComponent) },
      { path: 'orgMenuCounters', loadComponent: () => import('./org-menu-counters/org-menu-counters.component').then(m => m.OrgMenuCountersComponent) },
      { path: 'orgIncidentManagement', loadComponent: () => import('./org-incident-management/org-incident-management.component').then(m => m.OrgIncidentManagementComponent) },
      { path: 'auditReport', loadComponent: () => import('./audit-report/audit-report.component').then(m => m.AuditReportComponent) },
      { path: 'orgChecklist', loadChildren: () => import('../checklist-question/checklist-history/checklist-history.module').then(m => m.ChecklistHistoryModule) },
      { path: 'orgEmployeeList', loadComponent: () => import('./org-employee-list/org-employee-list.component').then(m => m.OrgEmployeeListComponent) },
      { path: 'orgBulkOrderHistory', loadComponent: () => import('./org-bulk-order-history/org-bulk-order-history.component').then(m => m.OrgBulkOrderHistoryComponent) },
      { path: 'orgManualOrders', loadComponent: () => import('./org-manual-orders/org-manual-orders.component').then(m => m.OrgManualOrdersComponent) },
      { path: 'orgBilling', loadComponent: () => import('./org-billing/org-billing.component').then(m => m.OrgBillingComponent) },
      { path: 'orgSalaryDeduction', loadComponent: () => import('./org-salary-deduction/org-salary-deduction.component').then(m => m.OrgSalaryDeductionComponent) },
      { path: 'submitChecklist', loadComponent: () => import('./org-checklist/org-checklist.component').then(m => m.OrgChecklistComponent) },
      { path: 'orgAdminDailyOrder', loadComponent: () => import('./org-admin-daily-order/org-admin-daily-order.component').then(m => m.OrgAdminDailyOrderComponent) },
      { path: 'customer', loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule) },
      { path: 'billing', loadChildren: () => import('../billing/billing.module').then(m => m.BillingModule) },
      { path: 'orgEmpPoll', loadComponent: () => import('./org-emp-poll/org-emp-poll.component').then(m => m.OrgEmpPollComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

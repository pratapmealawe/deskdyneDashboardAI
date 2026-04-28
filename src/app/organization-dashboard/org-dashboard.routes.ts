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
      { path: 'orgIncidentManagement', loadComponent: () => import('../incident-management/incident-management.component').then(m => m.IncidentManagementComponent) },
      { path: 'auditReport', loadComponent: () => import('./audit-report/audit-report.component').then(m => m.AuditReportComponent) },
      { path: 'orgChecklist', loadComponent: () => import('../checklists/checklist-history/checklist-history.component').then(m => m.ChecklistHistoryComponent) },
      { path: 'orgEmployeeList', loadComponent: () => import('./org-employee-list/org-employee-list.component').then(m => m.OrgEmployeeListComponent) },
      { path: 'orgBulkOrderHistory', loadComponent: () => import('./org-bulk-order-history/org-bulk-order-history.component').then(m => m.OrgBulkOrderHistoryComponent) },
      { path: 'orgManualOrders', loadComponent: () => import('./org-manual-orders/org-manual-orders.component').then(m => m.OrgManualOrdersComponent) },
      { path: 'orgBilling', loadComponent: () => import('./org-billing/org-billing.component').then(m => m.OrgBillingComponent) },
      { path: 'orgSalaryDeduction', loadComponent: () => import('./org-salary-deduction/org-salary-deduction.component').then(m => m.OrgSalaryDeductionComponent) },
      { path: 'submitChecklist', loadComponent: () => import('./org-checklist/org-checklist.component').then(m => m.OrgChecklistComponent) },
      { path: 'orgAdminDailyOrder', loadComponent: () => import('./org-admin-daily-order/org-admin-daily-order.component').then(m => m.OrgAdminDailyOrderComponent) },
      {
        path: 'customer',
        loadComponent: () => import('../customer/customer.component').then(m => m.CustomerComponent),
        children: [
          {
            path: ':id',
            loadComponent: () => import('../customer/customer-view/customer-view.component').then(m => m.CustomerViewComponent),
            children: [
              { path: 'details', loadComponent: () => import('../customer/customer-view/customer-details/customer-details.component').then(m => m.CustomerDetailsComponent) },
              { path: 'wallet', loadComponent: () => import('../customer/customer-view/customer-wallet/customer-wallet.component').then(m => m.CustomerWalletComponent) },
              { path: 'company-wallet', loadComponent: () => import('../customer/customer-view/customer-company-wallet/customer-company-wallet.component').then(m => m.CustomerCompanyWalletComponent) },
              { path: 'orders', loadComponent: () => import('../customer/customer-view/customer-orders/customer-orders.component').then(m => m.CustomerOrdersComponent) },
              { path: 'review', loadComponent: () => import('../customer/customer-view/customer-review/customer-review.component').then(m => m.CustomerReviewComponent) },
              { path: 'feedback', loadComponent: () => import('../customer/customer-view/customer-feedback/customer-feedback.component').then(m => m.CustomerFeedbackComponent) },
              { path: '', redirectTo: 'details', pathMatch: 'full' }
            ]
          }
        ]
      },
      { path: 'billing', loadChildren: () => import('../billing/billing.module').then(m => m.BillingModule) },
      { path: 'orgEmpPoll', loadComponent: () => import('./org-emp-poll/org-emp-poll.component').then(m => m.OrgEmpPollComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

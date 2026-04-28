import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { accessGuard } from 'src/guards/access.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { OrgLayoutComponent } from './layout/org-layout/org-layout.component';

const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },


  // General App Layout
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [accessGuard],
    children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
          { path: 'main', loadComponent: () => import('./organization-dashboard/main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent) },
          { path: 'admin-orders', loadComponent: () => import('./orders/other-orders/other-orders.component').then(m => m.OtherOrdersComponent) },
          { path: 'menu-items', loadComponent: () => import('./organization-dashboard/org-menu-items/org-menu-items.component').then(m => m.OrgMenuItemsComponent) },
          { path: 'orders', loadComponent: () => import('./organization-dashboard/org-outlet-orders/org-outlet-orders.component').then(m => m.OrgOutletOrdersComponent) },
          { path: 'reviews', loadComponent: () => import('./organization-dashboard/org-reviews/org-reviews.component').then(m => m.OrgReviewsComponent) },
          { path: 'users', loadComponent: () => import('./customer/customer.component').then(m => m.CustomerComponent) },
          { path: 'vendor-info', loadComponent: () => import('./organization-dashboard/org-vendor-info/org-vendor-info.component').then(m => m.OrgVendorInfoComponent) },
          { path: 'menu-counters', loadComponent: () => import('./organization-dashboard/org-menu-counters/org-menu-counters.component').then(m => m.OrgMenuCountersComponent) },
          { path: 'audit-reports', loadComponent: () => import('./organization-dashboard/audit-report/audit-report.component').then(m => m.AuditReportComponent) },
          { path: 'emp-poll', loadComponent: () => import('./organization-dashboard/org-emp-poll/org-emp-poll.component').then(m => m.OrgEmpPollComponent) },
          { path: '', redirectTo: 'main', pathMatch: 'full' }
        ]
      },
      { path: 'organization-dashboard', loadComponent: () => import('./main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent) },
      { path: 'orders-dashboard', loadComponent: () => import('./orders-dashboard/orders-dashboard.component').then(m => m.OrdersDashboardComponent) },
      {
        path: 'organization',
        loadComponent: () => import('./organization/organization.component').then(m => m.OrganizationComponent),
        children: [
          {
            path: ':id', loadComponent: () => import('./organization/manage-organization/manage-organization.component').then(m => m.ManageOrganizationComponent),
            children: [
              { path: 'details', loadComponent: () => import('./organization/manage-organization/organization-details/organization-details.component').then(m => m.OrganizationDetailsComponent) },
              { path: 'compliance', loadComponent: () => import('./organization/manage-organization/organization-compliance/organization-compliance.component').then(m => m.OrgComplianceComponent) },
              { path: 'bulk-menu', loadComponent: () => import('./organization/manage-organization/bulk/bulk.component').then(m => m.BulkComponent) },
              { path: 'virtual-cafeteria', loadComponent: () => import('./organization/manage-organization/virtual-cafeteria/virtual-cafeteria.component').then(m => m.VirtualCafeteriaComponent) },
              { path: 'admin-daily-order', loadComponent: () => import('./organization/manage-organization/admin-daily-order/admin-daily-order.component').then(m => m.AdminDailyOrderComponent) },
              { path: 'employees', loadComponent: () => import('./organization/manage-organization/employee-list/employee-list.component').then(m => m.EmployeeListComponent) },
              { path: 'consumption-order', loadComponent: () => import('./organization/manage-organization/consumption-order/consumption-order.component').then(m => m.ConsumptionOrderComponent) },
              { path: 'outlet-employees', loadComponent: () => import('./organization/manage-organization/outlet-employee/outlet-employee.component').then(m => m.OutletEmployeeComponent) },
              { path: 'company-wallet', loadComponent: () => import('./organization/manage-organization/company-wallet/company-wallet.component').then(m => m.CompanyWalletComponent) },
              // { path: 'qr-employees', loadComponent: () => import('./organization/manage-organization/qr-employee/qr-employee.component').then(m => m.QrEmployeeComponent) },
              // { path: 'guest-employees', loadComponent: () => import('./organization/manage-organization/guest-employee-list/guest-employee-list.component').then(m => m.GuestEmployeeListComponent) },
              { path: '', redirectTo: 'details', pathMatch: 'full' }
            ]
          }
        ]
      },
      { path: 'add-organization', loadComponent: () => import('./organization/add-organization/add-organization.component').then(m => m.AddOrganizationComponent) },
      {
        path: 'outlet',
        loadComponent: () => import('./outlet/outlet.component').then(m => m.OutletComponent),
        children: [
          {
            path: ':id',
            loadComponent: () => import('./outlet/outlet-view/outlet-view.component').then(m => m.OutletViewComponent),
            children: [
              { path: 'outlet-details', loadComponent: () => import('./outlet/outlet-view/outlet-details/outlet-details.component').then(m => m.OutletDetailsComponent) },
              { path: 'outlet-menu', loadComponent: () => import('./outlet/outlet-view/outlet-menu/outlet-menu.component').then(m => m.OutletMenuComponent) },
              { path: 'outlet-qr-menu', loadComponent: () => import('./outlet/outlet-view/outlet-qr-menu/outlet-qr-menu.component').then(m => m.OutletQrMenuComponent) },
              { path: 'outlet-orders', loadComponent: () => import('./outlet/outlet-view/outlet-orders/outlet-orders.component').then(m => m.OutletOrdersComponent) },
              { path: 'outlet-feedback', loadComponent: () => import('./outlet/outlet-view/outlet-feedback/outlet-feedback.component').then(m => m.OutletFeedbackComponent) },
              { path: '', redirectTo: 'outlet-details', pathMatch: 'full' }
            ]
          }
        ]
      },
      { path: 'outlet-master-menu', loadComponent: () => import('./outlet-master-menu/outlet-master-menu.component').then(m => m.OutletMasterMenuComponent) },
      { path: 'event-popup', loadComponent: () => import('./event-popup/event-popup.component').then(m => m.EventPopupComponent) },
      {
        path: 'vendor-firm',
        loadComponent: () => import('./vendor-management/vendor-firm/vendor-firm.component').then(m => m.VendorFirmComponent),
        children: [
          {
            path: ':id',
            loadComponent: () => import('./vendor-management/vendor-firm/vendor-firm-view/vendor-firm-view.component').then(m => m.VendorFirmViewComponent),
            children: [
              { path: 'vendor-firm-details', loadComponent: () => import('./vendor-management/vendor-firm/vendor-firm-view/vendor-firm-details/vendor-firm-details.component').then(m => m.VendorFirmDetailsComponent) },
              { path: 'vendor-firm-reports', loadComponent: () => import('./vendor-management/vendor-firm/vendor-firm-view/vendor-firm-reports/vendor-firm-reports.component').then(m => m.VendorFirmReportsComponent) },
              { path: 'vendor-firm-wallet-details', loadComponent: () => import('./vendor-management/vendor-firm/vendor-firm-view/vendor-firm-wallet-details/vendor-firm-wallet-details.component').then(m => m.VendorFirmWalletDetailsComponent) },
              { path: 'vendor-firm-ledger-details', loadComponent: () => import('./vendor-management/vendor-firm/vendor-firm-view/vendor-firm-ledger-details/vendor-firm-ledger-details.component').then(m => m.VendorFirmLedgerDetailsComponent) },
              { path: 'wallet-transaction-history', loadComponent: () => import('./vendor-management/vendor-firm/vendor-firm-view/wallet-transaction-history/wallet-transaction-history.component').then(m => m.WalletTransactionHistoryComponent) },
              { path: 'vendor-firm-compliance', loadComponent: () => import('./vendor-management/vendor-firm/vendor-firm-view/vendor-firm-compliance/vendor-compliance.component').then(m => m.VendorComplianceComponent) },
              { path: '', redirectTo: 'vendor-firm-details', pathMatch: 'full' }
            ]
          }
        ]
      },
      { path: 'vendor', loadComponent: () => import('./vendor-management/vendor/vendor.component').then(m => m.VendorComponent) },
      { path: 'currentOutletOrder', loadComponent: () => import('./orders/outlet-orders/outlet-orders.component').then(m => m.OutletOrdersComponent) },
      { path: 'otherOrder', loadComponent: () => import('./orders/other-orders/other-orders.component').then(m => m.OtherOrdersComponent) },
      { path: 'searchOrder', loadComponent: () => import('./orders/search-order/search-order.component').then(m => m.SearchOrderComponent) },
      { path: 'sessionManagement', loadComponent: () => import('./session-management/session-management.component').then(m => m.SessionManagementComponent) },
      { path: 'notifications', loadComponent: () => import('./notification/notification.component').then(m => m.NotificationComponent) },
      { path: 'vendorWalletDashboard', loadComponent: () => import('./vendor-management/vendor-wallet-dashboard/vendor-wallet-dashboard.component').then(m => m.VendorWalletDashboardComponent) },
      { path: 'vendorPayout', loadComponent: () => import('./vendor-management/vendor-payout/vendor-payout.component').then(m => m.VendorPayoutComponent) },
      {
        path: 'customer',
        loadComponent: () => import('./customer/customer.component').then(m => m.CustomerComponent),
        children: [
          {
            path: ':id',
            loadComponent: () => import('./customer/customer-view/customer-view.component').then(m => m.CustomerViewComponent),
            children: [
              { path: 'details', loadComponent: () => import('./customer/customer-view/customer-details/customer-details.component').then(m => m.CustomerDetailsComponent) },
              { path: 'wallet', loadComponent: () => import('./customer/customer-view/customer-wallet/customer-wallet.component').then(m => m.CustomerWalletComponent) },
              { path: 'company-wallet', loadComponent: () => import('./customer/customer-view/customer-company-wallet/customer-company-wallet.component').then(m => m.CustomerCompanyWalletComponent) },
              { path: 'orders', loadComponent: () => import('./customer/customer-view/customer-orders/customer-orders.component').then(m => m.CustomerOrdersComponent) },
              { path: 'review', loadComponent: () => import('./customer/customer-view/customer-review/customer-review.component').then(m => m.CustomerReviewComponent) },
              { path: 'feedback', loadComponent: () => import('./customer/customer-view/customer-feedback/customer-feedback.component').then(m => m.CustomerFeedbackComponent) },
              { path: '', redirectTo: 'details', pathMatch: 'full' }
            ]
          }
        ]
      },
      { path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule) },
      { path: 'bulkMasterMenu', loadComponent: () => import('./bulk-master-menu/bulk-master-menu.component').then(m => m.BulkMasterMenuComponent) },
      { path: 'incidentManagement', loadComponent: () => import('./incident-management/incident-management.component').then(m => m.IncidentManagementComponent) },
      { path: 'viewChecklistQuestion', loadComponent: () => import('./checklists/checklists.component').then(m => m.ChecklistsComponent) },
      { path: 'checklistHistory', loadComponent: () => import('./checklists/checklist-history/checklist-history.component').then(m => m.ChecklistHistoryComponent) },
      { path: 'reviews', loadComponent: () => import('./review/review.component').then(m => m.ReviewComponent) },

      { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
      { path: 'rbac-management', loadComponent: () => import('./rbac-management/rbac-management.component').then(m => m.RbacManagementComponent) },
      { path: 'viewEnquiries', loadComponent: () => import('./enquiries/enquiries.component').then(m => m.EnquiriesComponent) },
      { path: 'feedbacks', loadComponent: () => import('./feedbacks/feedbacks.component').then(m => m.FeedbacksComponent) },

      { path: 'faq', loadChildren: () => import('./miscelleneous/faq/faq.module').then(m => m.FaqModule) },
      { path: 'configVariable', loadChildren: () => import('./miscelleneous/config-variable/config-variable.module').then(m => m.ConfigVariableModule) },
      { path: 'appVersionControl', loadChildren: () => import('./miscelleneous/app-version-control/app-version-control.module').then(m => m.AppVersionControlModule) },
      { path: 'configImages', loadChildren: () => import('./miscelleneous/config-images/config-images.module').then(m => m.ConfigImagesModule) },
      { path: 'configImagesGroup', loadChildren: () => import('./miscelleneous/config-images-group/config-images-group.module').then(m => m.ConfigImagesGroupModule) },


      { path: 'serverlogs', loadChildren: () => import('./miscelleneous/server-logs/server-logs.module').then(m => m.ServerLogsModule) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // Organization App Layout
  {
    path: 'orgapp',
    component: OrgLayoutComponent,
    canActivate: [accessGuard],
    children: [
      { path: '', loadChildren: () => import('./organization-dashboard/org-dashboard.routes').then(m => m.ORG_DASHBOARD_ROUTES) },
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
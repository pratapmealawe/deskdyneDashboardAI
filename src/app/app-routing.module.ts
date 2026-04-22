import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { accessGuard } from 'src/guards/access.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { OrgLayoutComponent } from './layout/org-layout/org-layout.component';

const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'guest', loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule) },


  // General App Layout
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [accessGuard],
    children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
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
              { path: 'qr-menu', loadComponent: () => import('./outlet/outlet-view/qr-menu/qr-menu.component').then(m => m.QrMenuComponent) },
              { path: 'outlet-orders', loadComponent: () => import('./outlet/outlet-view/outlet-orders/outlet-orders.component').then(m => m.OutletOrdersComponent) },
              { path: 'outlet-feedback', loadComponent: () => import('./outlet/outlet-view/outlet-feedback/outlet-feedback.component').then(m => m.OutletFeedbackComponent) },
              { path: '', redirectTo: 'outlet-details', pathMatch: 'full' }
            ]
          }
        ]
      },
      { path: 'outlet-master-menu', loadComponent: () => import('./outlet/outlet-master-menu/outlet-master-menu.component').then(m => m.OutletMasterMenuComponent) },
      { path: 'event-popup', loadComponent: () => import('./event-popup/event-popup.component').then(m => m.EventPopupComponent) },
      { path: 'vendor-firm', loadComponent: () => import('./vendor-firm/vendor-firm.component').then(m => m.VendorFirmComponent) },
      { path: 'vendor', loadComponent: () => import('./vendor/vendor.component').then(m => m.VendorComponent) },
      { path: 'currentOrder', loadComponent: () => import('./outlet-orders/outlet-orders.component').then(m => m.OutletOrdersComponent) },
      { path: 'outletExcelExport', loadComponent: () => import('./outlet-excel-export/outlet-excel-export.component').then(m => m.OutletExcelExportComponent) },
      { path: 'otherOrder', loadComponent: () => import('./other-orders/other-orders.component').then(m => m.OtherOrdersComponent) },
      { path: 'searchOrder', loadComponent: () => import('./search-order/search-order.component').then(m => m.SearchOrderComponent) },
      { path: 'sessionManagement', loadComponent: () => import('./session-management/session-management.component').then(m => m.SessionManagementComponent) },
      { path: 'notifications', loadComponent: () => import('./notification/notification.component').then(m => m.NotificationComponent) },
      { path: 'vendorWalletDashboard', loadComponent: () => import('./vendor-wallet-dashboard/vendor-wallet-dashboard.component').then(m => m.VendorWalletDashboardComponent) },
      { path: 'vendorPayout', loadComponent: () => import('./vendor-payout/vendor-payout.component').then(m => m.VendorPayoutComponent) },

      { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },

      { path: 'bulkMasterMenu', loadComponent: () => import('./bulk-master-menu/bulk-master-menu.component').then(m => m.BulkMasterMenuComponent) },
      { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
      { path: 'rbac-management', loadComponent: () => import('./rbac-management/rbac-management.component').then(m => m.RbacManagementComponent) },

      { path: 'faq', loadChildren: () => import('./miscelleneous/faq/faq.module').then(m => m.FaqModule) },
      { path: 'configVariable', loadChildren: () => import('./miscelleneous/config-variable/config-variable.module').then(m => m.ConfigVariableModule) },
      { path: 'appVersionControl', loadChildren: () => import('./miscelleneous/app-version-control/app-version-control.module').then(m => m.AppVersionControlModule) },
      { path: 'configImages', loadChildren: () => import('./miscelleneous/config-images/config-images.module').then(m => m.ConfigImagesModule) },
      { path: 'configImagesGroup', loadChildren: () => import('./miscelleneous/config-images-group/config-images-group.module').then(m => m.ConfigImagesGroupModule) },


      { path: 'serverlogs', loadChildren: () => import('./miscelleneous/server-logs/server-logs.module').then(m => m.ServerLogsModule) },
      { path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule) },
      { path: 'appFeedbacks', loadChildren: () => import('./suggessions-feedbacks/suggessions-feedbacks.module').then(m => m.SuggessionsFeedbacksModule) },
      { path: 'checklistHistory', loadComponent: () => import('./checklist-question/checklist-history/checklist-history.component').then(m => m.ChecklistHistoryComponent) },
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
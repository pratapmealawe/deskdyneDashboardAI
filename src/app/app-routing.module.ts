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
      { path: 'organization', loadComponent: () => import('./organization/organization.component').then(m => m.OrganizationComponent) },
      { path: 'add-organization', loadComponent: () => import('./organization/add-organization/add-organization.component').then(m => m.AddOrganizationComponent) },
      { path: 'outlet', loadComponent: () => import('./outlet/outlet.component').then(m => m.OutletComponent) },
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
      { path: 'policy', loadComponent: () => import('./policy/policy.component').then(m => m.PolicyComponent) },
      { path: 'addPolicy', loadComponent: () => import('./policy/add-policy/add-policy.component').then(m => m.AddPolicyComponent) },

      { path: 'addAdmin', loadChildren: () => import('./admin/add-admin/add-admin.module').then(m => m.AddAdminModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'faq', loadChildren: () => import('./miscelleneous/faq/faq.module').then(m => m.FaqModule) },
      { path: 'configVariable', loadChildren: () => import('./miscelleneous/config-variable/config-variable.module').then(m => m.ConfigVariableModule) },
      { path: 'appVersionControl', loadChildren: () => import('./miscelleneous/app-version-control/app-version-control.module').then(m => m.AppVersionControlModule) },
      { path: 'configImages', loadChildren: () => import('./miscelleneous/config-images/config-images.module').then(m => m.ConfigImagesModule) },
      { path: 'configImagesGroup', loadChildren: () => import('./miscelleneous/config-images-group/config-images-group.module').then(m => m.ConfigImagesGroupModule) },


      { path: 'auditReport', loadChildren: () => import('./consumption-order-details/consumption-order-details.module').then(m => m.ConsumptionOrderDetailsModule) },
      { path: 'serverlogs', loadChildren: () => import('./miscelleneous/server-logs/server-logs.module').then(m => m.ServerLogsModule) },
      { path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule) },
      { path: 'appFeedbacks', loadChildren: () => import('./suggessions-feedbacks/suggessions-feedbacks.module').then(m => m.SuggessionsFeedbacksModule) },
      { path: 'excelExport', loadChildren: () => import('./excel-export/excel-export.module').then(m => m.ExcelExportModule) },
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
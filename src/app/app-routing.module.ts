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
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'mainDashboard', loadChildren: () => import('./deskdyne-components/main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule) },
      { path: 'allOrders', loadChildren: () => import('./orders-dashboard/orders-dashboard.component').then(m => m.OrdersDashboardComponent) },
      { path: 'b2bSearchOrg', loadComponent: () => import('./organization/organization.component').then(m => m.OrganizationComponent) },
      { path: 'b2bAddorg', loadComponent: () => import('./organization/add-organization/add-organization.component').then(m => m.AddOrganizationComponent) },



      { path: 'outlet', loadComponent: () => import('./outlet/outlet.component').then(m => m.OutletComponent) },
      { path: 'addOutlet', loadComponent: () => import('./outlet/add-outlet/add-outlet.component').then(m => m.AddOutletComponent) },
      { path: 'eventPopup', loadChildren: () => import('./event-popup/event-popup.module').then(m => m.EventPopupModule) },
      { path: 'addEventPopup', loadChildren: () => import('./event-popup/add-event/add-event.module').then(m => m.AddEventModule) },
      { path: 'vendor', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule) },
      { path: 'searchVendor', loadChildren: () => import('./vendor/search-vendor/search-vendor.module').then(m => m.SearchVendorModule) },
      { path: 'addVendorFirm', loadChildren: () => import('./add-vendor-firm/add-vendor-firm.module').then(m => m.AddVendorFirmModule) },
      { path: 'searchVendorFirm', loadChildren: () => import('./vendor-firm/vendor-firm.module').then(m => m.VendorFirmModule) },
      { path: 'addVendor', loadChildren: () => import('./vendor/add-vendor/add-vendor.module').then(m => m.AddVendorModule) },
      { path: 'addAdmin', loadChildren: () => import('./deskdyne-components/add-admin/add-admin.module').then(m => m.AddAdminModule) },
      { path: 'admin', loadChildren: () => import('./deskdyne-components/admin/admin.module').then(m => m.AdminModule) },
      { path: 'faq', loadChildren: () => import('./miscelleneous/faq/faq.module').then(m => m.FaqModule) },
      { path: 'configVariable', loadChildren: () => import('./miscelleneous/config-variable/config-variable.module').then(m => m.ConfigVariableModule) },
      { path: 'appVersionControl', loadChildren: () => import('./miscelleneous/app-version-control/app-version-control.module').then(m => m.AppVersionControlModule) },
      { path: 'sessionManagement', loadChildren: () => import('./session-management/session-management.module').then(m => m.SessionManagementModule) },
      { path: 'configImages', loadChildren: () => import('./config-images/config-images.module').then(m => m.ConfigImagesModule) },
      { path: 'configImagesGroup', loadChildren: () => import('./config-images-group/config-images-group.module').then(m => m.ConfigImagesGroupModule) },
      { path: 'policy', loadChildren: () => import('./policy/policy/policy.module').then(m => m.PolicyModule) },
      { path: 'addPolicy', loadChildren: () => import('./policy/add-policy/add-policy.module').then(m => m.AddPolicyModule) },
      { path: 'currentOrder', loadChildren: () => import('./outlet-orders/outlet-orders.module').then(m => m.OutletOrdersModule) },
      { path: 'outletMasterMenu', loadComponent: () => import('./outlet/outlet-master-menu/outlet-master-menu.component').then(m => m.OutletMasterMenuComponent) },
      { path: 'searchOrder', loadChildren: () => import('./search-order/search-order.module').then(m => m.SearchOrderModule) },
      { path: 'customer', loadChildren: () => import('./common-components/customer/customer.module').then(m => m.CustomerModule) },
      { path: 'serverlogs', loadChildren: () => import('./server-logs/server-logs.module').then(m => m.ServerLogsModule) },
      { path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule) },
      { path: 'appFeedbacks', loadChildren: () => import('./common-components/suggessions-feedbacks/suggessions-feedbacks.module').then(m => m.SuggessionsFeedbacksModule) },
      { path: 'excelExport', loadChildren: () => import('./common-components/excel-export/excel-export.module').then(m => m.ExcelExportModule) },
      { path: 'outletExcelExport', loadChildren: () => import('./common-components/outlet-excel-export/outlet-excel-export.module').then(m => m.OutletExcelExportModule) },
      { path: 'viewChecklistQuestion', loadChildren: () => import('./deskdyne-components/checklist-question/checklist-question.module').then(m => m.ChecklistQuestionModule) },
      { path: 'checklistHistory', loadChildren: () => import('./checklist-history/checklist-history.module').then(m => m.ChecklistHistoryModule) },
      { path: 'foodItem', loadChildren: () => import('./deskdyne-components/b2b-food-item/b2b-food-item.module').then(m => m.B2bFoodItemModule) },
      { path: 'scheduledNotifications', loadChildren: () => import('./scheduled-notification/scheduled-notification.module').then(m => m.ScheduledNotificationModule) },
      { path: 'otherOrder', loadChildren: () => import('./other-orders/other-orders.module').then(m => m.OtherOrdersModule) },
      { path: 'pastOrder', loadChildren: () => import('./deskdyne-components/b2b-food-item/b2b-food-item.module').then(m => m.B2bFoodItemModule) },
      { path: 'viewEnquiries', loadChildren: () => import('./deskdyne-components/org-registry/org-registry.module').then(m => m.OrgRegistryModule) },
      { path: 'vendorPayout', loadChildren: () => import('./vendor-payout/vendor-payout.module').then(m => m.VendorPayoutModule) },
      { path: 'vendorWalletDashboard', loadChildren: () => import('./vendor-wallet-dashboard/vendor-wallet-dashboard.module').then(m => m.VendorWalletDashboardModule) },
      { path: 'dailyAdminExcelExport', loadChildren: () => import('./common-components/daily-admin-excel-export/daily-admin-excel-export.module').then(m => m.DailyAdminExcelExportModule) },
      { path: '', redirectTo: 'mainDashboard', pathMatch: 'full' }
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
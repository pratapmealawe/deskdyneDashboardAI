import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqModule } from './miscelleneous/faq/faq.module';
import { accessGuard } from 'src/guards/access.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { 
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'outlet', loadChildren: () => import('./outlet/outlet.module').then(m => m.OutletModule) 
  },
  {
    path: 'vendor', loadChildren:()=>import('./vendor/vendor.module').then(m=>m.VendorModule)
  },
  {
    path:'add-admin',loadChildren:()=>import('./add-admin/add-admin.module').then(m=>m.AddAdminModule)
  },
  {
    path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'faq',loadChildren:()=>import('./miscelleneous//faq/faq.module').then(m=>FaqModule)
  },
  {
    path:'configVariable',loadChildren:()=>import('./miscelleneous/config-variable/config-variable.module').then(m=>m.ConfigVariableModule)
  },
  {
    path:'appVersionControl',loadChildren:()=>import('./miscelleneous/app-version-control/app-version-control.module').then(m=>m.AppVersionControlModule)
  },
  {
    path:'policy',loadChildren:()=>import('./policy/policy/policy.module').then(m=>m.PolicyModule)
  },
  {
    path:'addPolicy',loadChildren:()=>import('./policy/add-policy/add-policy.module').then(m=>m.AddPolicyModule)
  },
  { path: 'currentOrder', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'searchOrder', loadChildren: () => import('./search-order/search-order.module').then(m => m.SearchOrderModule) },
  { path: 'B2B_add_org',  loadChildren: () => import('./add-organization/add-organization.module').then(m => m.AddOrganizationModule) },
  { path: 'B2B_search_org',  loadChildren: () => import('./search-organization/search-organization.module').then(m => m.SearchOrganizationModule) },
  { path: 'dashboard',  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'serverlogs', loadChildren: () => import('./server-logs/server-logs.module').then(m => m.ServerLogsModule) },

  //orgAdmin routes start
  { 
    path: 'orgDashboard',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-dashboard/org-dashboard.module').then(m => m.OrgDashboardModule) 
  },
  { 
    path: 'orgmenuitems',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/orgorders/orgorders.module').then(m => m.OrgordersModule) 
  },
  { 
    path: 'orgorders',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/orgorders/orgorders.module').then(m => m.OrgordersModule) 
  },
  { 
    path: 'orgpreorders',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/orgorders/orgorders.module').then(m => m.OrgordersModule) 
  },
  { 
    path: 'orgsubscription',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-subscription/org-subscription.module').then(m => m.OrgordersModule) 
  },
  { 
    path: 'orgreviews',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-reviews/org-reviews.module').then(m => m.OrgReviewsModule) 
  },
  { 
    path: 'orgreports',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-reports/org-reports.module').then(m => m.OrgReportsModule) 
  },
  { 
    path: 'orgincidentmanagement',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-incident-management/org-incident-management.module').then(m => m.OrgIncidentManagementModule) 
  },
  { 
    path: 'orgcheckList',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-checklist/org-checklist.module').then(m => m.OrgReportsModule) 
  },
  { 
    path: 'orgemployeelist',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-employee-list/org-employee-list.module').then(m => m.OrgEmployeeListModule) 
  },
  { 
    path: 'orgbulkorderhistory',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-bulk-order-history/org-bulk-order-history.module').then(m => m.OrgBulkOrderHistoryModule) 
  },
  { 
    path: 'orgbilling',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-billing/org-billing.module').then(m => m.OrgBillingModule) 
  },
  { 
    path: 'orgmanualorders',canActivate: [accessGuard], loadChildren: () => import('./orgComponents/org-manual-orders/org-manual-orders.module').then(m => m.OrgManualOrdersModule) 
  },

  //orgAdmin routes End
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

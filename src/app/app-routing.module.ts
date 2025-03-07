import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqModule } from './miscelleneous/faq/faq.module';
import { accessGuard } from 'src/guards/access.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'guest',
    loadChildren: () =>
      import('./guest/guest.module').then((m) => m.GuestModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'outlet',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./outlet/outlet.module').then((m) => m.OutletModule),
  },
  {
    path: 'vendor',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./vendor/vendor.module').then((m) => m.VendorModule),
  },
  {
    path: 'add-admin',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./deskdyne-components/add-admin/add-admin.module').then(
        (m) => m.AddAdminModule
      ),
  },
  {
    path: 'admin',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./deskdyne-components/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'faq',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./miscelleneous//faq/faq.module').then((m) => FaqModule),
  },
  {
    path: 'configVariable',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./miscelleneous/config-variable/config-variable.module').then(
        (m) => m.ConfigVariableModule
      ),
  },
  {
    path: 'appVersionControl',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './miscelleneous/app-version-control/app-version-control.module'
      ).then((m) => m.AppVersionControlModule),
  },
  {
    path: 'policy',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./policy/policy/policy.module').then((m) => m.PolicyModule),
  },
  {
    path: 'addPolicy',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./policy/add-policy/add-policy.module').then(
        (m) => m.AddPolicyModule
      ),
  },
  {
    path: 'currentOrder',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'searchOrder',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./search-order/search-order.module').then(
        (m) => m.SearchOrderModule
      ),
  },
  {
    path: 'B2B_add_org',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './deskdyne-components/add-organization/add-organization.module'
      ).then((m) => m.AddOrganizationModule),
  },
  {
    path: 'B2B_search_org',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './deskdyne-components/search-organization/search-organization.module'
      ).then((m) => m.SearchOrganizationModule),
  },
  {
    path: 'dashboard',

    loadChildren: () =>
      import('./deskdyne-components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'serverlogs',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./server-logs/server-logs.module').then(
        (m) => m.ServerLogsModule
      ),
  },

  //orgAdmin routes
  {
    path: 'org-dashboard',

    loadChildren: () =>
      import('./org-components/org-dashboard/org-dashboard.module').then(
        (m) => m.OrgDashboardModule
      ),
  },
  {
    path: 'org-menu-items',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/org-menu-items/org-menu-items.module').then(
        (m) => m.OrgMenuItemsModule
      ),
  },
  {
    path: 'org-orders',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/org-orders/org-orders.module').then(
        (m) => m.OrgOrdersModule
      ),
  },
  {
    path: 'org-pre-orders',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/org-pre-orders/org-pre-orders.module').then(
        (m) => m.OrgPreOrdersModule
      ),
  },
  {
    path: 'org-subcription',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/org-subscription/org-subscription.module').then(
        (m) => m.OrgSubscriptionModule
      ),
  },
  {
    path: 'org-reviews',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/org-reviews/org-reviews.module').then(
        (m) => m.OrgReviewsModule
      ),
  },
  {
    path: 'app-feedbacks',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './common-components/suggessions-feedbacks/suggessions-feedbacks.module'
      ).then((m) => m.SuggessionsFeedbacksModule),
  },
  {
    path: 'excel-export',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./common-components/excel-export/excel-export.module').then(
        (m) => m.ExcelExportModule
      ),
  },
  {
    path: 'org-reports',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/org-reports/org-reports.module').then(
        (m) => m.OrgReportsModule
      ),
  },
  {
    path: 'org-vendor-info',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/org-vendor-info/org-vendor-info.module').then(
        (m) => m.OrgVendorInfoModule
      ),
  },
  {
    path: 'org-menu-counters',
    canActivate: [accessGuard],
    loadChildren: () =>
      import(
        './org-components/org-menu-counters/org-menu-counters.module'
      ).then((m) => m.OrgMenuCountersModule),
  },
  {
    path: 'org-incident-management',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './org-components/org-incident-management/org-incident-management.module'
      ).then((m) => m.OrgIncidentManagementModule),
  },
  {
    path: 'org-checklist',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./checklist-history/checklist-history.module').then(
        (m) => m.ChecklistHistoryModule
      ),
  },
  {
    path: 'org-employee-list',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './org-components/org-employee-list/org-employee-list.module'
      ).then((m) => m.OrgEmployeeListModule),
  },
  {
    path: 'org-bulk-order-history',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './org-components/org-bulk-order-history/org-bulk-order-history.module'
      ).then((m) => m.OrgBulkOrderHistoryModule),
  },
  {
    path: 'org-manual-orders',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './org-components/org-manual-orders/org-manual-orders.module'
      ).then((m) => m.OrgManualOrdersModule),
  },
  {
    path: 'org-billing',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/org-billing/org-billing.module').then(
        (m) => m.OrgBillingModule
      ),
  },
  {
    path: 'view-checklist-question',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './deskdyne-components/checklist-question/checklist-question.module'
      ).then((m) => m.ChecklistQuestionModule),
  },
  {
    path: 'submit-checklist',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./org-components/submit-checklist/submit-checklist.module').then(
        (m) => m.SubmitChecklistModule
      ),
  },
  {
    path: 'checklistHistory',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./checklist-history/checklist-history.module').then(
        (m) => m.ChecklistHistoryModule
      ),
  },
  {
    path: 'food_item',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./deskdyne-components/b2b-food-item/b2b-food-item.module').then(
        (m) => m.B2bFoodItemModule
      ),
  },
  //deskdine routes
  {
    path: 'current_order',
    canActivate: [accessGuard],

    loadChildren: () =>
      import(
        './deskdyne-components/b2b-current-orders/b2b-current-orders.module'
      ).then((m) => m.B2bCurrentOrdersModule),
  },
  {
    path: 'past_order',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./deskdyne-components/b2b-food-item/b2b-food-item.module').then(
        (m) => m.B2bFoodItemModule
      ),
  },
  {
    path: 'viewEnquiries',
    canActivate: [accessGuard],

    loadChildren: () =>
      import('./deskdyne-components/org-registry/org-registry.module').then(
        (m) => m.OrgRegistryModule
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

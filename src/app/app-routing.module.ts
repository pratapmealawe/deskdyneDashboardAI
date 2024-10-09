import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqModule } from './miscelleneous/faq/faq.module';

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
  { path: 'serverlogs', loadChildren: () => import('./server-logs/server-logs.module').then(m => m.ServerLogsModule) },
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

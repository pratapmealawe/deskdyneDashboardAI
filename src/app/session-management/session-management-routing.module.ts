import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionManagementComponent } from './session-management.component';

const routes: Routes = [
  { path: '', component: SessionManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionManagementRoutingModule { }

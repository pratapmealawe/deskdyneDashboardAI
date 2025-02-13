import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgMenuCountersComponent } from './org-menu-counters.component';

const routes: Routes = [{ path: '', component: OrgMenuCountersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgMenuCountersRoutingModule {}

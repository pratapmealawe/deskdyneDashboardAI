import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgMenuCountersModule } from './org-menu-counters.module';

const routes: Routes = [
  {path: "", component: OrgMenuCountersModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgMenuCountersRoutingModule { }

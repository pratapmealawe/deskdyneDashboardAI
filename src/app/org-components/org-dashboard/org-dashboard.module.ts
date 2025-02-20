import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgDashboardRoutingModule } from './org-dashboard-routing.module';
import { OrgDashboardComponent } from './org-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [OrgDashboardComponent],
  imports: [CommonModule, OrgDashboardRoutingModule, HighchartsChartModule],
})
export class OrgDashboardModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgMenuItemsRoutingModule } from './org-menu-items-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrgMenuItemsComponent } from './org-menu-items.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrgMenuItemsComponent],
  imports: [
    CommonModule,
    OrgMenuItemsRoutingModule,
    HighchartsChartModule,
    FormsModule,
  ],
  exports: [OrgMenuItemsComponent]
})
export class OrgMenuItemsModule { }

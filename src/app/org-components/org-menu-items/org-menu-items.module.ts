import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgMenuItemsRoutingModule } from './org-menu-items-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrgMenuItemsComponent } from './org-menu-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";

@NgModule({
  declarations: [OrgMenuItemsComponent],
  imports: [
    CommonModule,
    OrgMenuItemsRoutingModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonOutletCafeSelectModule
],
  exports: [OrgMenuItemsComponent]
})
export class OrgMenuItemsModule { }

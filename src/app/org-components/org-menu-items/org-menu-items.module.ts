import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgMenuItemsRoutingModule } from './org-menu-items-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrgMenuItemsComponent } from './org-menu-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [OrgMenuItemsComponent],
  imports: [
    CommonModule,
    OrgMenuItemsRoutingModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [OrgMenuItemsComponent]
})
export class OrgMenuItemsModule { }

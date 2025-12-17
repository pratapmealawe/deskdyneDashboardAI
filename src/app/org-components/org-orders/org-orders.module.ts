import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgOrdersRoutingModule } from './org-orders-routing.module';
import { OrderCardModule } from 'src/app/order-card/order-card.module';
import { OrgOrdersComponent } from './org-orders.component';
import { FormsModule } from '@angular/forms';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";
import { MatChipsModule } from "@angular/material/chips";
import { MaterialModule } from "src/app/material.module";
import { OrganizationViewModule } from "src/app/organization-view/organization-view.module";
import { HighchartsChartModule } from "highcharts-angular";


@NgModule({
  declarations: [OrgOrdersComponent],
  imports: [
    CommonModule,
    OrgOrdersRoutingModule,
    OrderCardModule,
    FormsModule,
    CommonOutletCafeSelectModule,
    MatChipsModule,
    MaterialModule,
    OrganizationViewModule,
    HighchartsChartModule
],
  exports: [OrgOrdersComponent]
})
export class OrgOrdersModule { }

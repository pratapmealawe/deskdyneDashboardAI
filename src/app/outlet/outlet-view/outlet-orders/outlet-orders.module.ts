import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletOrdersComponent } from './outlet-orders.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderCardModule } from 'src/app/order-card/order-card.module';
import { MaterialModule } from 'src/app/material.module';
import { OrderFilterDialogModule } from 'src/app/common-components/order-filter-dialog/order-filter-dialog.module';



@NgModule({
  declarations: [
    OutletOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    OrderCardModule,
    MaterialModule,
    OrderFilterDialogModule,
  ],
  exports: [OutletOrdersComponent]
})
export class OutletOrdersModule { }

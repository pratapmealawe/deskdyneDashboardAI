import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletOrdersComponent } from './outlet-orders.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { OrderCardModule } from 'src/app/order-card/order-card.module';



@NgModule({
  declarations: [
    OutletOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    OrderCardModule
  ], 
  exports: [OutletOrdersComponent]
})
export class OutletOrdersModule { }

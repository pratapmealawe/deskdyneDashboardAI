import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchEventRoutingModule } from './search-event-routing.module';
import { SearchEventComponent } from './search-event/search-event.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { OutletViewModule } from "src/app/outlet/outlet-view/outlet-view.module";
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventMenuComponent } from './event-menu/event-menu.component';
import { EventOrdersComponent } from './event-orders/event-orders.component';
import { EventReviewsComponent } from './event-reviews/event-reviews.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventViewComponent } from './event-view/event-view.component';
import { HighchartsChartModule } from "highcharts-angular";



@NgModule({
  declarations: [
    SearchEventComponent,
    EventCardComponent,
    EventViewComponent,
    EventDetailsComponent,
    EventMenuComponent,
    EventOrdersComponent,
    EventReviewsComponent
  ],
  imports: [
    CommonModule,
    SearchEventRoutingModule,
    FormsModule,
    MaterialModule,
    OutletViewModule,
    HighchartsChartModule
]
})
export class SearchEventModule { }

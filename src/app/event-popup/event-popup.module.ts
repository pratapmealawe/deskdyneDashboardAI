import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventPopupRoutingModule } from './event-popup-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventPopupRoutingModule,
    FormsModule,
    MaterialModule,
  ]
})
export class EventPopupModule { }

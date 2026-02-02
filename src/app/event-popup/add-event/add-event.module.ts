import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEventRoutingModule } from './add-event-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    AddEventComponent
  ],
  imports: [
    CommonModule,
    AddEventRoutingModule,
    MaterialModule
  ]
})
export class AddEventModule { }

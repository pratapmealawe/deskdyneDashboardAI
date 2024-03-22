import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletRoutingModule } from './outlet-routing.module';
import { OutletComponent } from './outlet.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OutletComponent
  ],
  imports: [
    CommonModule,
    OutletRoutingModule,
    FormsModule
  ]
})
export class OutletModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletRoutingModule } from './outlet-routing.module';
import { OutletComponent } from './outlet.component';
import { FormsModule } from '@angular/forms';
import { OutletCardModule } from './outlet-card/outlet-card.module';
import { OutletViewModule } from './outlet-view/outlet-view.module';


@NgModule({
  declarations: [
    OutletComponent
  ],
  imports: [
    CommonModule,
    OutletRoutingModule,
    FormsModule,
    OutletCardModule,
    OutletViewModule
  ]
})
export class OutletModule { }

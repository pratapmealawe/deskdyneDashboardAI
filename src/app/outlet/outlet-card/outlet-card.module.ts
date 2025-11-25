import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletCardComponent } from './outlet-card.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    OutletCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    OutletCardComponent
  ]
})
export class OutletCardModule { }

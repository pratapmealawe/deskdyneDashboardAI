import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletCardComponent } from './outlet-card.component';



@NgModule({
  declarations: [
    OutletCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OutletCardComponent
  ]
})
export class OutletCardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B2bFoodItemCardComponent } from './b2b-food-item-card.component';
import {  MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    B2bFoodItemCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    B2bFoodItemCardComponent
  ]
})
export class B2bFoodItemCardModule { }

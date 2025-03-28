import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B2bFoodItemCardComponent } from './b2b-food-item-card.component';


@NgModule({
  declarations: [
    B2bFoodItemCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    B2bFoodItemCardComponent
  ]
})
export class B2bFoodItemCardModule { }

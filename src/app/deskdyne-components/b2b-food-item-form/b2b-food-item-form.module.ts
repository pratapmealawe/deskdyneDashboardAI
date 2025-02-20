import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B2bFoodItemFormComponent } from './b2b-food-item-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    B2bFoodItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    B2bFoodItemFormComponent
  ]
})
export class B2bFoodItemFormModule { }

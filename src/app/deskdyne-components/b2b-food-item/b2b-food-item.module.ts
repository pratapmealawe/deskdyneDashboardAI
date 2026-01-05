import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2bFoodItemRoutingModule } from './b2b-food-item-routing.module';
import { B2bFoodItemComponent } from './b2b-food-item.component';
import { B2bFoodItemCardModule } from '../b2b-food-item-card/b2b-food-item-card.module';
import { B2bFoodItemFormModule } from '../b2b-food-item-form/b2b-food-item-form.module';
import { FormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    B2bFoodItemComponent
  ],
  imports: [
    CommonModule,
    B2bFoodItemRoutingModule,
    B2bFoodItemCardModule,
    B2bFoodItemFormModule,
    FormsModule,
    CustomPipeModule,
    MaterialModule
  ],
  exports: [
    B2bFoodItemComponent
  ]
})
export class B2bFoodItemModule { }

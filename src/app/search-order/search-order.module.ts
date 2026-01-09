import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchOrderRoutingModule } from './search-order-routing.module';
import { SearchOrderComponent } from './search-order.component';
import { OrderCardModule } from '../order-card/order-card.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SearchOrderComponent
  ],
  imports: [
    CommonModule,
    SearchOrderRoutingModule,
    OrderCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    SearchOrderComponent
  ]
})
export class SearchOrderModule { }

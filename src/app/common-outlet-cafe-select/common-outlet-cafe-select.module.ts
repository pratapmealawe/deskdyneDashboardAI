import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonOutletCafeSelectRoutingModule } from './common-outlet-cafe-select-routing.module';
import { CommonOutletCafeSelectComponent } from './common-outlet-cafe-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    CommonOutletCafeSelectComponent
  ],
  imports: [
    CommonModule,
    CommonOutletCafeSelectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [CommonOutletCafeSelectComponent]
})
export class CommonOutletCafeSelectModule { }

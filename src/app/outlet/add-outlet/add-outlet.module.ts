import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOutletComponent } from './add-outlet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOutletRoutingModule } from './add-outlet-routing.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    AddOutletComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddOutletRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AddOutletModule { }

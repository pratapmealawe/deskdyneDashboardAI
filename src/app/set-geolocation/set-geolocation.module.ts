import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetGeolocationComponent } from './set-geolocation.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    SetGeolocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    SetGeolocationComponent
  ]
})
export class SetGeolocationModule { }

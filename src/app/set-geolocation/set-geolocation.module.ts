import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetGeolocationComponent } from './set-geolocation.component';


@NgModule({
  declarations: [
    SetGeolocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SetGeolocationComponent
  ]
})
export class SetGeolocationModule { }

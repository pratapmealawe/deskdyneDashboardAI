import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigImagesRoutingModule } from './config-images-routing.module';
import { ConfigImagesComponent } from './config-images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConfigImagesComponent
  ],
  imports: [
    CommonModule,
    ConfigImagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConfigImagesModule { }

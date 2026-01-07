import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ConfigImagesRoutingModule } from './config-images-routing.module';
import { ConfigImagesComponent } from './config-images.component';

@NgModule({
  declarations: [
    ConfigImagesComponent
  ],
  imports: [
    CommonModule,
    ConfigImagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ]
})
export class ConfigImagesModule { }

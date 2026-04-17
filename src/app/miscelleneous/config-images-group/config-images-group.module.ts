import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

import { ConfigImagesGroupRoutingModule } from './config-images-group-routing.module';
import { ConfigImagesGroupComponent } from './config-images-group.component';
import { AddUpdateConfigImagesGroupComponent } from './add-update-config-images-group/add-update-config-images-group.component';

@NgModule({
  declarations: [
    ConfigImagesGroupComponent,
    AddUpdateConfigImagesGroupComponent
  ],
  imports: [
    CommonModule,
    ConfigImagesGroupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ]
})
export class ConfigImagesGroupModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigImagesGroupRoutingModule } from './config-images-group-routing.module';
import { ConfigImagesGroupComponent } from './config-images-group.component';
import { FormsModule } from '@angular/forms';
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
  ]
})
export class ConfigImagesGroupModule { }

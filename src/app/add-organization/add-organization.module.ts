import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOrganizationRoutingModule } from './add-organization-routing.module';
import { AddOrganizationComponent } from './add-organization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetGeolocationModule } from '../set-geolocation/set-geolocation.module';


@NgModule({
  declarations: [
    AddOrganizationComponent
  ],
  imports: [
    CommonModule,
    AddOrganizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SetGeolocationModule
  ],
  exports:[
    AddOrganizationComponent
  ]
})
export class AddOrganizationModule { }

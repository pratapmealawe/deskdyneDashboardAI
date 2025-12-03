import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOrganizationRoutingModule } from './add-organization-routing.module';
import { AddOrganizationComponent } from './add-organization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetGeolocationModule } from '../../set-geolocation/set-geolocation.module';
import { MaterialModule } from 'src/app/material.module';
import { OnlyAlphaDirective, OnlyNumberDirective, AlphaNumericDirective } from 'src/shared/constants/input.directive';

@NgModule({
  declarations: [AddOrganizationComponent, OnlyAlphaDirective,
        OnlyNumberDirective,
        AlphaNumericDirective],
  imports: [
    CommonModule,
    AddOrganizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SetGeolocationModule,
    MaterialModule,
   
  ],
  exports: [AddOrganizationComponent],
})
export class AddOrganizationModule {}

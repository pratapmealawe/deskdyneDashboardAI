import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    PolicyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PolicyRoutingModule
  ]
})
export class PolicyModule { }

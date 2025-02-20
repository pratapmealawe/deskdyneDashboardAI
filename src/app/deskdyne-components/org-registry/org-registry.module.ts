import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgRegistryRoutingModule } from './org-registry-routing.module';
import { OrgRegistryComponent } from './org-registry.component';


@NgModule({
  declarations: [
    OrgRegistryComponent
  ],
  imports: [
    CommonModule,
    OrgRegistryRoutingModule
  ]
})
export class OrgRegistryModule { }

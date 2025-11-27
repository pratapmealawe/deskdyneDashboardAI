import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationCardComponent } from './organization-card.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    OrganizationCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    OrganizationCardComponent
  ]
})
export class OrganizationCardModule { }

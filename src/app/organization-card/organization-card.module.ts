import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationCardComponent } from './organization-card.component';



@NgModule({
  declarations: [
    OrganizationCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OrganizationCardComponent
  ]
})
export class OrganizationCardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPolicyRoutingModule } from './add-policy-routing.module';
import { AddPolicyComponent } from './add-policy.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddPolicyComponent
  ],
  imports: [
    CommonModule,
    AddPolicyRoutingModule,
    FormsModule
  ]
})
export class AddPolicyModule { }

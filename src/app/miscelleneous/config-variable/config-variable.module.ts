import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigVariableRoutingModule } from './config-variable-routing.module';
import { ConfigVariableComponent } from './config-variable.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConfigVariableComponent
  ],
  imports: [
    CommonModule,
    ConfigVariableRoutingModule,
    FormsModule
  ]
})
export class ConfigVariableModule { }

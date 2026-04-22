import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';

import { ConfigVariableRoutingModule } from './config-variable-routing.module';
import { ConfigVariableComponent } from './config-variable.component';

@NgModule({
  declarations: [
    ConfigVariableComponent
  ],
  imports: [
    CommonModule,
    ConfigVariableRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatRadioModule
  ]
})
export class ConfigVariableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppVersionControlRoutingModule } from './app-version-control-routing.module';
import { AppVersionControlComponent } from './app-version-control.component';

@NgModule({
  declarations: [
    AppVersionControlComponent
  ],
  imports: [
    CommonModule,
    AppVersionControlRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ]
})
export class AppVersionControlModule { }

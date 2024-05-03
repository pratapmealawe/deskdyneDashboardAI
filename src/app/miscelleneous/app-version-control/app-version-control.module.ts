import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppVersionControlRoutingModule } from './app-version-control-routing.module';
import { AppVersionControlComponent } from './app-version-control.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppVersionControlComponent
  ],
  imports: [
    CommonModule,
    AppVersionControlRoutingModule,
    FormsModule
  ]
})
export class AppVersionControlModule { }

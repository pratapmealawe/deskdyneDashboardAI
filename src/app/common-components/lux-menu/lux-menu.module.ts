import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LuxMenuRoutingModule } from './lux-menu-routing.module';
import { LuxMenuComponent } from './lux-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';


@NgModule({
  declarations: [
    LuxMenuComponent
  ],
  imports: [
    CommonModule,
    LuxMenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomPipeModule
  ],
  exports: [LuxMenuComponent]
})
export class LuxMenuModule { }

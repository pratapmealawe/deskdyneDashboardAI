import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweetMenuRoutingModule } from './sweet-menu-routing.module';
import { SweetMenuComponent } from './sweet-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';


@NgModule({
  declarations: [
    SweetMenuComponent
  ],
  imports: [
    CommonModule,
    SweetMenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomPipeModule
  ],
  exports: [SweetMenuComponent]
})
export class SweetMenuModule { }

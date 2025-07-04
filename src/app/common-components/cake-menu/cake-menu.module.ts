import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CakeMenuRoutingModule } from './cake-menu-routing.module';
import { CakeMenuComponent } from './cake-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';


@NgModule({
  declarations: [
    CakeMenuComponent
  ],
  imports: [
    CommonModule,
    CakeMenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomPipeModule
  ],
  exports: [CakeMenuComponent]
})
export class CakeMenuModule { }

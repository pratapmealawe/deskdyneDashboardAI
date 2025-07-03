import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletMasterMenuRoutingModule } from './outlet-master-menu-routing.module';
import { OutletMasterMenuComponent } from './outlet-master-menu.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletViewModule } from '../outlet/outlet-view/outlet-view.module';


@NgModule({
  declarations: [
    OutletMasterMenuComponent,
  ],
  imports: [
    CommonModule,
    OutletMasterMenuRoutingModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    OutletViewModule
  ]
})
export class OutletMasterMenuModule { }

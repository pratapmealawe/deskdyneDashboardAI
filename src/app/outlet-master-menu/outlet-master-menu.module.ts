import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletMasterMenuRoutingModule } from './outlet-master-menu-routing.module';
import { OutletMasterMenuComponent } from './outlet-master-menu.component';
import { ComboPopupComponent } from '../outlet/outlet-view/combo-popup/combo-popup.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OutletMasterMenuComponent
  ],
  imports: [
    CommonModule,
    OutletMasterMenuRoutingModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OutletMasterMenuModule { }

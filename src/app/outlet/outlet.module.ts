import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletRoutingModule } from './outlet-routing.module';
import { OutletComponent } from './outlet.component';
import { FormsModule } from '@angular/forms';
import { OutletCardModule } from './outlet-card/outlet-card.module';
import { OutletViewModule } from './outlet-view/outlet-view.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../material.module';
import { DeletedOutletsDialogComponent } from './deleted-outlets-dialog/deleted-outlets-dialog.component';

@NgModule({
  declarations: [OutletComponent, DeletedOutletsDialogComponent],
  imports: [
    CommonModule,
    OutletRoutingModule,
    FormsModule,
    OutletCardModule,
    OutletViewModule,
    MaterialModule
  ],
})
export class OutletModule { }


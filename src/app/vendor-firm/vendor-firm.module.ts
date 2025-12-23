import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorFirmRoutingModule } from './vendor-firm-routing.module';
import { VendorFirmComponent } from './vendor-firm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../material.module';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { VendorFirmViewModule } from '../vendor-firm-view/vendor-firm-view.module';


@NgModule({
  declarations: [
    VendorFirmComponent
  ],
  imports: [
    CommonModule,
    VendorFirmRoutingModule,
    VendorFirmViewModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule,
    MaterialModule,
    DirectivesModule
  ]
})
export class VendorFirmModule { }

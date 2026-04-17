import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumptionOrderDetailsRoutingModule } from './consumption-order-details-routing.module';
import { ConsumptionOrderDetailsComponent } from './consumption-order-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonOutletCafeSelectComponent } from "../common-components/common-outlet-cafe-select/common-outlet-cafe-select.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { CancelReasonDialogComponent } from './cancel-reason-dialog/cancel-reason-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ConsumptionOrderDetailsComponent,
    CancelReasonDialogComponent
  ],
  imports: [
    CommonModule,
    ConsumptionOrderDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    CommonOutletCafeSelectComponent
  ]
})
export class ConsumptionOrderDetailsModule { }

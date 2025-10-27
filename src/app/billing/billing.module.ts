import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { OutletBillingComponent } from './outlet-billing/outlet-billing.component';
import { VcBillingComponent } from './vc-billing/vc-billing.component';
import { DailyBillingComponent } from './daily-billing/daily-billing.component';
import { BulkBillingComponent } from './bulk-billing/bulk-billing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonOutletCafeSelectModule } from "src/app/common-outlet-cafe-select/common-outlet-cafe-select.module";
import { DatewiseOrdersDialogComponent } from './datewise-orders-dialog/datewise-orders-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    BillingComponent,
    OutletBillingComponent,
    VcBillingComponent,
    DailyBillingComponent,
    BulkBillingComponent,
    DatewiseOrdersDialogComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatExpansionModule,
    CommonOutletCafeSelectModule
  ],
  exports: [BillingComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class BillingModule { }

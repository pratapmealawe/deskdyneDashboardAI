import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherOrdersRoutingModule } from './other-orders-routing.module';
import { OtherOrdersComponent } from './other-orders.component';
import { EmpPollCardComponent } from './emp-poll-card/emp-poll-card.component';
import { DailyBulkCardComponent } from './daily-bulk-card/daily-bulk-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { BulkOrderCardComponent } from './bulk-order-card/bulk-order-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    OtherOrdersComponent,
    EmpPollCardComponent,
    DailyBulkCardComponent,
    BulkOrderCardComponent
  ],
  imports: [
    CommonModule,
    OtherOrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomPipeModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatRadioModule,
  ]
})
export class OtherOrdersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggessionsFeedbacksRoutingModule } from './suggessions-feedbacks-routing.module';
import { SuggessionsFeedbacksComponent } from './suggessions-feedbacks.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [SuggessionsFeedbacksComponent],
  imports: [
    CommonModule,
    SuggessionsFeedbacksRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
})
export class SuggessionsFeedbacksModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOutletComponent } from './add-outlet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOutletRoutingModule } from './add-outlet-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AddOutletComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddOutletRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatDividerModule,
  ]
})
export class AddOutletModule { }

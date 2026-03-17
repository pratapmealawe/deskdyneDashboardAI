import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupForceLogoutComponent } from './group-force-logout/group-force-logout.component';
import { SessionManagementRoutingModule } from './session-management-routing.module';
import { SessionManagementComponent } from './session-management.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    SessionManagementComponent,
    GroupForceLogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SessionManagementRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class SessionManagementModule { }

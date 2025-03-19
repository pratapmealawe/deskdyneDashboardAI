import { NgModule } from '@angular/core';
import { AddAdminComponent } from './add-admin.component';
import { AddAdminRoutingModule } from './add-admin-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  imports: [
    AddAdminRoutingModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
  ],
  declarations: [AddAdminComponent],
  exports: [],
})
export class AddAdminModule {}

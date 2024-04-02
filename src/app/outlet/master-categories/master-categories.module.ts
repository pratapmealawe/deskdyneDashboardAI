import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterCategoriesRoutingModule } from './master-categories-routing.module';
import { MasterCategoriesComponent } from './master-categories.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MasterCategoriesComponent
  ],
  imports: [
    CommonModule,
    MasterCategoriesRoutingModule,
    FormsModule
  ]
})
export class MasterCategoriesModule { }

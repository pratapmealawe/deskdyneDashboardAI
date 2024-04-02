import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletViewComponent } from './outlet-view.component';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { OutletCategoriesComponent } from './outlet-categories/outlet-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletMenuComponent } from './outlet-menu/outlet-menu.component';



@NgModule({
  declarations: [
    OutletViewComponent,
    OutletDetailsComponent,
    OutletCategoriesComponent,
    OutletMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    OutletViewComponent
  ]
})
export class OutletViewModule { }

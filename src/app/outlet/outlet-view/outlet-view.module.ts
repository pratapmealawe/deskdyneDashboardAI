import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletViewComponent } from './outlet-view.component';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { OutletCategoriesComponent } from './outlet-categories/outlet-categories.component';



@NgModule({
  declarations: [
    OutletViewComponent,
    OutletDetailsComponent,
    OutletCategoriesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OutletViewComponent
  ]
})
export class OutletViewModule { }

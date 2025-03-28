import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletViewComponent } from './outlet-view.component';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { OutletCategoriesComponent } from './outlet-categories/outlet-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletMenuComponent } from './outlet-menu/outlet-menu.component';
import { OutletFeedbackComponent } from './outlet-feedback/outlet-feedback.component';
import { OutletComplianceComponent} from './outlet-compliance/outlet-compliance.component';
// import { PdfuploadComponent} from '../../pdfupload/pdfupload.component';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { ComboPopupComponent } from './combo-popup/combo-popup.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    OutletViewComponent,
    OutletDetailsComponent,
    OutletCategoriesComponent,
    OutletMenuComponent,
    OutletFeedbackComponent,
    OutletComplianceComponent,
    ComboPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomPipeModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports:[
    OutletViewComponent
  ]
})
export class OutletViewModule { }

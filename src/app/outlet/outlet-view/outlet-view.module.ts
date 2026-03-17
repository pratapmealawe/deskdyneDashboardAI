import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletViewComponent } from './outlet-view.component';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { OutletCategoriesComponent } from './outlet-categories/outlet-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletMenuComponent } from './outlet-menu/outlet-menu.component';
import { OutletFeedbackComponent } from './outlet-feedback/outlet-feedback.component';
import { OutletComplianceComponent } from './outlet-compliance/outlet-compliance.component';
// import { PdfuploadComponent} from '../../pdfupload/pdfupload.component';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { ComboPopupComponent } from './combo-popup/combo-popup.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { OutletVendorComponent } from './outlet-vendor/outlet-vendor.component';
import { OutletOrdersModule } from './outlet-orders/outlet-orders.module';
import { OutletOrdersComponent } from './outlet-orders/outlet-orders.component';
import { MaterialModule } from 'src/app/material.module';
import { QrMenuComponent } from './qr-menu/qr-menu.component';
import { OrgOrderModule } from 'src/app/org-components/org-reviews/org-order/org-order.module';
import { BulkMenuUploadDialogComponent } from './bulk-menu-upload-dialog/bulk-menu-upload-dialog.component';

@NgModule({
  declarations: [
    OutletViewComponent,
    OutletDetailsComponent,
    OutletCategoriesComponent,
    OutletMenuComponent,
    OutletFeedbackComponent,
    OutletComplianceComponent,
    ComboPopupComponent,
    OutletVendorComponent,
    QrMenuComponent,
    BulkMenuUploadDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomPipeModule,
    MaterialModule,
    OutletOrdersModule,
    OrgOrderModule
  ],
  exports: [OutletViewComponent, ComboPopupComponent],
})
export class OutletViewModule { }

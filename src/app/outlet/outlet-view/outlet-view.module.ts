import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletCategoriesComponent } from './outlet-categories/outlet-categories.component';
import { OutletComplianceComponent } from './outlet-compliance/outlet-compliance.component';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { OutletFeedbackComponent } from './outlet-feedback/outlet-feedback.component';
import { OutletMenuComponent } from './outlet-menu/outlet-menu.component';
import { OutletViewComponent } from './outlet-view.component';
import { MaterialModule } from 'src/app/material.module';
import { OrgOrderComponent } from 'src/app/organization-dashboard/org-reviews/org-order/org-order.component';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { BulkMenuUploadDialogComponent } from './bulk-menu-upload-dialog/bulk-menu-upload-dialog.component';
import { ComboPopupComponent } from './combo-popup/combo-popup.component';
import { AddOutletMenuComponent } from './outlet-menu/add-outlet-menu/add-outlet-menu.component';
import { MasterMenuDialogComponent } from './outlet-menu/master-menu-dialog/master-menu-dialog.component';
import { CopyOutletMenuComponent } from './outlet-menu/copy-outlet-menu/copy-outlet-menu.component';
import { OutletOrdersModule } from './outlet-orders/outlet-orders.module';
import { OutletVendorComponent } from './outlet-vendor/outlet-vendor.component';
import { QrMenuComponent } from './qr-menu/qr-menu.component';

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
    AddOutletMenuComponent,
    MasterMenuDialogComponent,
    CopyOutletMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomPipeModule,
    MaterialModule,
    OutletOrdersModule,
    OrgOrderComponent
  ],
  exports: [OutletViewComponent, ComboPopupComponent],
})
export class OutletViewModule { }

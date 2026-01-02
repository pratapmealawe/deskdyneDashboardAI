import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { CakeMenuComponent } from '../common-components/cake-menu/cake-menu.component';
import { ConsumptionOrderComponent } from '../common-components/consumption-order/consumption-order.component';
import { DailyOrderMenuComponent } from '../common-components/daily-order-menu/daily-order-menu.component';
import { EmployeeListComponent } from '../common-components/employee-list/employee-list.component';
import { EmployeeWalletComponent } from '../common-components/employee-wallet/employee-wallet.component';
import { GuestEmployeeListComponent } from '../common-components/guest-employee-list/guest-employee-list.component';
import { LuxMenuComponent } from '../common-components/lux-menu/lux-menu.component';
import { MealaweOutletComponent } from '../common-components/mealawe-outlet/mealawe-outlet.component';
import { OrgBulkMenuComponent } from '../common-components/org-bulk-menu/org-bulk-menu.component';
import { OrgBulkSnackboxMenuComponent } from '../common-components/org-bulk-snackbox-menu/org-bulk-snackbox-menu.component';
import { OrgCustomizedSnackboxMenuComponent } from '../common-components/org-customized-snackbox-menu/org-customized-snackbox-menu.component';
import { OrgDetailsComponent } from '../common-components/org-details/org-details.component';
import { OrgIndividualMenuComponent } from '../common-components/org-individual-menu/org-individual-menu.component';
import { OrgIndividualSnackboxMenuComponent } from '../common-components/org-individual-snackbox-menu/org-individual-snackbox-menu.component';
import { OrgOutletOrdersComponent } from '../common-components/org-outlet-orders/org-outlet-orders.component';
import { OrgPredefinedSnackboxMenuComponent } from '../common-components/org-predefined-snackbox-menu/org-predefined-snackbox-menu.component';
import { OutletEmployeeComponent } from '../common-components/outlet-employee/outlet-employee.component';
import { QrEmployeeComponent } from '../common-components/qr-employee/qr-employee.component';
import { SweetMenuComponent } from '../common-components/sweet-menu/sweet-menu.component';
import { VcEmployeeComponent } from '../common-components/vc-employee/vc-employee.component';
import { MaterialModule } from '../material.module';
import { PdfuploadComponent } from '../pdfupload/pdfupload.component';
import { OrgComplianceComponent } from './organization-compliance/organization-compliance.component';
import { OrganizationViewComponent } from './organization-view.component';

@NgModule({
  declarations: [
    OrganizationViewComponent,
    OrgDetailsComponent,
    GuestEmployeeListComponent,
    OrgBulkMenuComponent,
    OrgIndividualMenuComponent,
    OrgBulkSnackboxMenuComponent,
    OrgIndividualSnackboxMenuComponent,
    OrgPredefinedSnackboxMenuComponent,
    OrgCustomizedSnackboxMenuComponent,
    OrgOutletOrdersComponent,
    EmployeeListComponent,
    DailyOrderMenuComponent,
    OrgComplianceComponent,
    OutletEmployeeComponent,
    VcEmployeeComponent,
    EmployeeWalletComponent,
    ConsumptionOrderComponent,
    CakeMenuComponent,
    SweetMenuComponent,
    LuxMenuComponent,
    MealaweOutletComponent,
    QrEmployeeComponent
  ],
  imports: [
    CommonModule,
    CustomPipeModule,
    FormsModule,
    ReactiveFormsModule,
    PdfuploadComponent,
    MaterialModule,
    DragDropModule,
    QRCodeModule,
    DirectivesModule
  ],
  exports: [OrganizationViewComponent, OrgOutletOrdersComponent],
})
export class OrganizationViewModule { }

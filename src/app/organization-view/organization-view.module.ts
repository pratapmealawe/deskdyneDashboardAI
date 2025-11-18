import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { B2bWeeklyMenuComponent } from '../common-components/b2b-weekly-menu/b2b-weekly-menu.component';
import { CakeMenuModule } from '../common-components/cake-menu/cake-menu.module';
import { ConsumptionOrderComponent } from '../common-components/consumption-order/consumption-order.component';
import { EmployeeListComponent } from '../common-components/employee-list/employee-list.component';
import { EmployeeWalletComponent } from '../common-components/employee-wallet/employee-wallet.component';
import { GuestEmployeeListComponent } from '../common-components/guest-employee-list/guest-employee-list.component';
import { LuxMenuModule } from '../common-components/lux-menu/lux-menu.module';
import { MealaweOutletComponent } from '../common-components/mealawe-outlet/mealawe-outlet.component';
import { OrgBulkMenuComponent } from '../common-components/org-bulk-menu/org-bulk-menu.component';
import { OrgBulkSnackboxMenuComponent } from '../common-components/org-bulk-snackbox-menu/org-bulk-snackbox-menu.component';
import { OrgCustomizedSnackboxMenuComponent } from '../common-components/org-customized-snackbox-menu/org-customized-snackbox-menu.component';
import { OrgDetailsComponent } from '../common-components/org-details/org-details.component';
import { OrgIndividualMenuComponent } from '../common-components/org-individual-menu/org-individual-menu.component';
import { OrgIndividualSnackboxMenuComponent } from '../common-components/org-individual-snackbox-menu/org-individual-snackbox-menu.component';
import { OrgPredefinedSnackboxMenuComponent } from '../common-components/org-predefined-snackbox-menu/org-predefined-snackbox-menu.component';
import { OutletEmployeeComponent } from '../common-components/outlet-employee/outlet-employee.component';
import { SweetMenuModule } from '../common-components/sweet-menu/sweet-menu.module';
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
    EmployeeListComponent,
    B2bWeeklyMenuComponent,
    OrgComplianceComponent,
    OutletEmployeeComponent,
    VcEmployeeComponent,
    EmployeeWalletComponent,
    ConsumptionOrderComponent,
    MealaweOutletComponent,
  ],
  imports: [
    CommonModule,
    CustomPipeModule,
    FormsModule,
    ReactiveFormsModule,
    PdfuploadComponent,
    CakeMenuModule,
    SweetMenuModule,
    LuxMenuModule,
    MaterialModule,
    DragDropModule
  ],
  exports: [OrganizationViewComponent],
})
export class OrganizationViewModule { }

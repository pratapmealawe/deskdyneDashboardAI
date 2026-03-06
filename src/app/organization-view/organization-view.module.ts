import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { CakeMenuComponent } from '../common-components/cake-menu/cake-menu.component';
import { CompanyWalletComponent } from '../common-components/company-wallet/company-wallet.component';
import { ConsumptionOrderComponent } from '../common-components/consumption-order/consumption-order.component';
import { DailyOrderMenuComponent } from '../common-components/daily-order-menu/daily-order-menu.component';
import { EmployeeListComponent } from '../common-components/employee-list/employee-list.component';
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
import { OrganizationAddVendorComponent } from './organization-add-vendor/organization-add-vendor.component';
import { OrganizationCopyBulkMenuComponent } from './organization-copy-bulk-menu/organization-copy-bulk-menu.component';
import { PantryMenuComponent } from '../common-components/pantry-menu/pantry-menu.component';
import { EmployeeBulkMealMenuComponent } from '../common-components/employee-bulk-meal-menu/employee-bulk-meal-menu.component';
import { EmployeeBulkSnackMenuComponent } from '../common-components/employee-bulk-snack-menu/employee-bulk-snack-menu.component';
import { EmployeeCakeMenuComponent } from '../common-components/employee-cake-menu/employee-cake-menu.component';
import { EmployeeCustomizedFoodboxMenuComponent } from '../common-components/employee-customized-foodbox-menu/employee-customized-foodbox-menu.component';
import { EmployeeIndividualMealMenuComponent } from '../common-components/employee-individual-meal-menu/employee-individual-meal-menu.component';
import { EmployeeIndividualSnackMenuComponent } from '../common-components/employee-individual-snack-menu/employee-individual-snack-menu.component';
import { EmployeeLuxMenuComponent } from '../common-components/employee-lux-menu/employee-lux-menu.component';
import { EmployeePredefinedFoodboxMenuComponent } from '../common-components/employee-predefined-foodbox-menu/employee-predefined-foodbox-menu.component';
import { EmployeeSweetMenuComponent } from '../common-components/employee-sweet-menu/employee-sweet-menu.component';
import { EmployeePantryMenuComponent } from '../common-components/employee-pantry-menu/employee-pantry-menu.component';
import { EmployeeSelectCafeteriaComponent } from '../common-components/employee-select-cafeteria/employee-select-cafeteria.component';
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
    ConsumptionOrderComponent,
    CakeMenuComponent,
    SweetMenuComponent,
    LuxMenuComponent,
    PantryMenuComponent,
    MealaweOutletComponent,
    QrEmployeeComponent,
    OrganizationAddVendorComponent,
    OrganizationCopyBulkMenuComponent,
    EmployeeBulkMealMenuComponent,
    EmployeeBulkSnackMenuComponent,
    EmployeeCakeMenuComponent,
    EmployeeCustomizedFoodboxMenuComponent,
    EmployeeIndividualMealMenuComponent,
    EmployeeIndividualSnackMenuComponent,
    EmployeeLuxMenuComponent,
    EmployeePredefinedFoodboxMenuComponent,
    EmployeeSweetMenuComponent,
    EmployeePantryMenuComponent,
    EmployeeSelectCafeteriaComponent,
    CompanyWalletComponent
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
    QRCodeModule,
    DirectivesModule,
  ],
  exports: [OrganizationViewComponent, OrgOutletOrdersComponent, EmployeeSelectCafeteriaComponent],
})
export class OrganizationViewModule { }

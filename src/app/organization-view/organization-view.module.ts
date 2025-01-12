import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationViewComponent } from './organization-view.component';
// import { OrgBulkMenuComponent } from '../org-bulk-menu/org-bulk-menu.component';
// import { OrgIndividualMenuComponent } from '../org-individual-menu/org-individual-menu.component';
// import { OrgDetailsComponent } from '../org-details/org-details.component';
import { CustomPipeModule } from 'src/pipes/pipe.module';
// import { OrgBulkSnackboxMenuComponent } from '../org-bulk-snackbox-menu/org-bulk-snackbox-menu.component';
// import { OrgIndividualSnackboxMenuComponent } from '../org-individual-snackbox-menu/org-individual-snackbox-menu.component';
// import { OrgPredefinedSnackboxMenuComponent } from '../org-predefined-snackbox-menu/org-predefined-snackbox-menu.component';
// import { OrgCustomizedSnackboxMenuComponent } from '../org-customized-snackbox-menu/org-customized-snackbox-menu.component';
// import { MealAweOutletComponent } from '../meal-awe-outlet/meal-awe-outlet.component';
// import { EmployeeListComponent } from '../employee-list/employee-list.component';
// import { GuestEmployeeListComponent } from '../guest-employee-list/guest-employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import { B2bWeeklyMenuComponent } from '../b2b-weekly-menu/b2b-weekly-menu.component';
import { OrgComplianceComponent} from './organization-compliance/organization-compliance.component';
// import { PdfuploadComponent} from '../pdfupload/pdfupload.component';


@NgModule({
  declarations: [
    OrganizationViewComponent,
    // OrgDetailsComponent,
    // OrgBulkMenuComponent,
    // OrgIndividualMenuComponent,
    // OrgBulkSnackboxMenuComponent,
    // OrgIndividualSnackboxMenuComponent,
    // OrgPredefinedSnackboxMenuComponent,
    // OrgCustomizedSnackboxMenuComponent,
    // MealAweOutletComponent,
    // EmployeeListComponent,
    // GuestEmployeeListComponent,
    // B2bWeeklyMenuComponent,
    // PdfuploadComponent,
    OrgComplianceComponent
  ],
  imports: [
    CommonModule,
    CustomPipeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    OrganizationViewComponent
  ]
})
export class OrganizationViewModule { }

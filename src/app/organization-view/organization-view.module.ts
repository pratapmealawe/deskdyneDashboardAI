import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationViewComponent } from './organization-view.component';
import { OrgBulkMenuComponent } from '../common-components/org-bulk-menu/org-bulk-menu.component';
import { OrgIndividualMenuComponent } from '../common-components/org-individual-menu/org-individual-menu.component';
import { OrgDetailsComponent } from '../common-components/org-details/org-details.component';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { OrgBulkSnackboxMenuComponent } from '../common-components/org-bulk-snackbox-menu/org-bulk-snackbox-menu.component';
import { OrgIndividualSnackboxMenuComponent } from '../common-components/org-individual-snackbox-menu/org-individual-snackbox-menu.component';
import { OrgPredefinedSnackboxMenuComponent } from '../common-components/org-predefined-snackbox-menu/org-predefined-snackbox-menu.component';
import { OrgCustomizedSnackboxMenuComponent } from '../common-components/org-customized-snackbox-menu/org-customized-snackbox-menu.component';
import { MealAweOutletComponent } from '../common-components/meal-awe-outlet/meal-awe-outlet.component';
import { EmployeeListComponent } from '../common-components/employee-list/employee-list.component';
import { GuestEmployeeListComponent } from '../common-components/guest-employee-list/guest-employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { B2bWeeklyMenuComponent } from '../common-components/b2b-weekly-menu/b2b-weekly-menu.component';
import { OrgComplianceComponent} from './organization-compliance/organization-compliance.component';
import { PdfuploadComponent} from '../pdfupload/pdfupload.component';


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
    MealAweOutletComponent,
     EmployeeListComponent,
    B2bWeeklyMenuComponent,
    OrgComplianceComponent,
  ],
  imports: [
    CommonModule,
    CustomPipeModule,
    FormsModule,
    ReactiveFormsModule,
    PdfuploadComponent
  ],
  exports:[
    OrganizationViewComponent
  ]
})
export class OrganizationViewModule { }

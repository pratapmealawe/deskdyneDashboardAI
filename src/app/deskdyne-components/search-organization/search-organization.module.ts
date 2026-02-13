import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchOrganizationComponent } from './search-organization.component';
import { SearchOrganizationRoutingModule } from './search-organization-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationCardModule } from '../../organization-card/organization-card.module';
import { OrganizationViewModule } from 'src/app/organization-view/organization-view.module';
import { MaterialModule } from 'src/app/material.module';
import { DeletedOrgsDialogComponent } from './deleted-orgs-dialog/deleted-orgs-dialog.component';

@NgModule({
  declarations: [SearchOrganizationComponent, DeletedOrgsDialogComponent],
  imports: [
    CommonModule,
    SearchOrganizationRoutingModule,
    OrganizationCardModule,
    OrganizationViewModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [SearchOrganizationComponent],
})
export class SearchOrganizationModule { }


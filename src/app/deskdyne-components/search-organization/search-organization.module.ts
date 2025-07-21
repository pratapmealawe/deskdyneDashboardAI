import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchOrganizationComponent } from './search-organization.component';
import { SearchOrganizationRoutingModule } from './search-organization-routing.module';
import { FormsModule } from '@angular/forms';
import { OrganizationCardModule } from '../../organization-card/organization-card.module';
import { OrganizationViewModule } from 'src/app/organization-view/organization-view.module';

@NgModule({
  declarations: [SearchOrganizationComponent],
  imports: [
    CommonModule,
    SearchOrganizationRoutingModule,
    OrganizationCardModule,
    OrganizationViewModule,
    FormsModule,
  ],
  exports: [SearchOrganizationComponent],
})
export class SearchOrganizationModule { }

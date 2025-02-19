import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchOrganizationComponent } from './search-organization.component';

const routes: Routes = [
  {
    path:'', component:SearchOrganizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchOrganizationRoutingModule { }

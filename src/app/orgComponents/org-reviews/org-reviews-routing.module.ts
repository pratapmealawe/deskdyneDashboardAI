import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgReviewsComponent } from './org-reviews.component';

const routes: Routes = [
  {
    path:'', 
    component:OrgReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgReviewsRoutingModule { }

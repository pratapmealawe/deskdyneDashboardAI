import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchEventComponent } from './search-event/search-event.component';

const routes: Routes = [
  { path: "", component: SearchEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchEventRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppVersionControlComponent } from './app-version-control.component';

const routes: Routes = [
  {
    path:'', component:AppVersionControlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppVersionControlRoutingModule { }

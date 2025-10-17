import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigImagesGroupComponent } from './config-images-group.component';

const routes: Routes = [
  {path: "", component: ConfigImagesGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigImagesGroupRoutingModule { }

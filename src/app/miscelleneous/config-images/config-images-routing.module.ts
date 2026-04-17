import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigImagesComponent } from './config-images.component';

const routes: Routes = [
  {path: "", component: ConfigImagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigImagesRoutingModule { }

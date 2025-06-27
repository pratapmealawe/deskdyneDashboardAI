import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVendorFirmComponent } from './add-vendor-firm.component';

const routes: Routes = [
  {path: "", component: AddVendorFirmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddVendorFirmRoutingModule { }

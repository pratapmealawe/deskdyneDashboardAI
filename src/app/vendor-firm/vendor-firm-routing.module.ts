import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorFirmComponent } from './vendor-firm.component';

const routes: Routes = [
  {path: "", component: VendorFirmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorFirmRoutingModule { }

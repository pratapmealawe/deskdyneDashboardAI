import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorReportComponent } from './vendor-report.component';

const routes: Routes = [
  { path: '', component: VendorReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorReportRoutingModule { }

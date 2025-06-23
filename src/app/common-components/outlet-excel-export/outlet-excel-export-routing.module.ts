import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletExcelExportComponent } from './outlet-excel-export.component';

const routes: Routes = [
  {path: "", component: OutletExcelExportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletExcelExportRoutingModule { }

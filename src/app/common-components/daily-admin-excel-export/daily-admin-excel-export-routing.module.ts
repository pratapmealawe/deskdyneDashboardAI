import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyAdminExcelExportComponent } from './daily-admin-excel-export.component';

const routes: Routes = [
  { path: "", component: DailyAdminExcelExportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyAdminExcelExportRoutingModule { }

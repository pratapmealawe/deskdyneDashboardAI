import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcelExportComponent } from './excel-export.component';

const routes: Routes = [{
  path:'',
  component:ExcelExportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcelExportRoutingModule { }

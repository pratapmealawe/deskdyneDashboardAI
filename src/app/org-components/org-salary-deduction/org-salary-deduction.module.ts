import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgSalaryDeductionComponent } from './org-salary-deduction.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonOutletCafeSelectModule } from '../../common-outlet-cafe-select/common-outlet-cafe-select.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: OrgSalaryDeductionComponent }
];

@NgModule({
  declarations: [OrgSalaryDeductionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonOutletCafeSelectModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class OrgSalaryDeductionModule { }

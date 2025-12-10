import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditReportRoutingModule } from './audit-report-routing.module';
import { AuditReportComponent } from './audit-report.component';
import { MaterialModule } from 'src/app/material.module';
import { AddAuditReportDialogComponent } from './add-audit-report-dialog/add-audit-report-dialog.component';
import { PdfPreviewDialogComponent } from './pdf-preview-dialog/pdf-preview-dialog.component';

@NgModule({
  declarations: [
    AuditReportComponent,
    AddAuditReportDialogComponent,
    PdfPreviewDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuditReportRoutingModule
  ],
  exports: [
    AuditReportComponent
  ]
})
export class AuditReportModule { }

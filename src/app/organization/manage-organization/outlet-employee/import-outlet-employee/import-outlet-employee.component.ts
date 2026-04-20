import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-import-outlet-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatDialogModule],
  templateUrl: './import-outlet-employee.component.html',
  styleUrls: ['./import-outlet-employee.component.scss']
})
export class ImportOutletEmployeeComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  employeeList: any[] = [];
  isLoading = false;
  fileName: string | null = null;
  dragOver = false;
  currentStep: 'select' | 'preview' = 'select';

  constructor(
    private api: ApiMainService,
    private toaster: ToasterService,
    private dialogRef: MatDialogRef<ImportOutletEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orgObj: any, selectedCafeteria: any }
  ) { }

  ngOnInit(): void {
  }

  async downloadTemplate() {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Outlet Employee Template');

      worksheet.columns = [
        { header: 'Employee ID', key: 'id', width: 15 },
        { header: 'Employee Name', key: 'name', width: 25 },
        { header: 'Phone No', key: 'phone', width: 20 },
        { header: 'Email', key: 'email', width: 30 }
      ];

      // Styling header
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0E49B5' }
      };

      // sample data
      worksheet.addRow({ id: 'EMP001', name: 'John Doe', phone: '9876543210', email: 'john@example.com' });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Outlet_Staff_Template_${this.data.selectedCafeteria?.cafeteria_name || 'Outlet'}.xlsx`);

      this.toaster.success('Import template downloaded');
    } catch (error) {
      console.error('Template download error:', error);
      this.toaster.error('Failed to download template');
    }
  }

  async onFileChange(evt: any) {
    const target: HTMLInputElement = evt.target;
    if (target.files && target.files.length > 0) {
      await this.processFile(target.files[0]);
    }
  }

  async processFile(file: File) {
    this.isLoading = true;
    this.fileName = file.name;

    try {
      const data: any[] = await this.readExcel(file);
      if (data && data.length > 0) {
        const parsedStaff: any[] = [];

        data.forEach((row: any, index: number) => {
          // Skip header (Row 1)
          if (index === 0) return;

          const empId = (row[0] || '').toString().trim();
          const name = (row[1] || '').toString().trim();
          const ph = (row[2] || '').toString().trim();
          const mail = (row[3] || '').toString().trim();

          if (!empId && !name && !ph && !mail) return;

          parsedStaff.push({
            employeeName: name,
            employeeId: empId,
            employeePhoneNo: ph,
            employeeEmail: mail,
            organization_name: this.data.orgObj.organization_name,
            organization_id: this.data.orgObj._id,
            cafeteria_name: this.data.selectedCafeteria.cafeteria_name,
            cafeteria_id: this.data.selectedCafeteria.cafeteria_id
          });
        });

        if (parsedStaff.length > 0) {
          this.employeeList = parsedStaff;
          this.currentStep = 'preview';
          this.toaster.success(`${parsedStaff.length} records parsed successfully.`);
        } else {
          this.toaster.warning('No valid staff records found.');
        }
      }
    } catch (error) {
      console.error('Excel processing error:', error);
      this.toaster.error('Failed to process Excel file.');
    } finally {
      this.isLoading = false;
      if (this.fileInput) this.fileInput.nativeElement.value = '';
    }
  }

  async readExcel(file: File): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.getWorksheet(1);
    const data: any[] = [];
    worksheet?.eachRow({ includeEmpty: true }, (row) => {
      const values = Array.isArray(row.values) ? row.values.slice(1) : [];
      data.push(values);
    });
    return data;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer?.files.length === 1) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  resetImport() {
    this.currentStep = 'select';
    this.employeeList = [];
    this.fileName = null;
  }

  async onSubmit() {
    if (this.employeeList.length === 0) return;

    this.isLoading = true;
    try {
      await this.api.addOutletEmployeeList(this.employeeList);
      this.toaster.success('Staff records imported successfully.');
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Import error:', error);
      this.toaster.error('Failed to import staff list.');
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}

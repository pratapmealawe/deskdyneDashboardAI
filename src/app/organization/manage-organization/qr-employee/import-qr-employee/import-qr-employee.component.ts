import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-import-qr-employee',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatDialogModule],
  templateUrl: './import-qr-employee.component.html',
  styleUrls: ['./import-qr-employee.component.scss']
})
export class ImportQrEmployeeComponent {
  isDragging = false;
  fileName: string | null = null;
  parsedEmployees: any[] = [];
  isProcessing = false;

  constructor(
    public dialogRef: MatDialogRef<ImportQrEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toasterService: ToasterService
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  async handleFile(file: File) {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      this.toasterService.error('Please upload a valid Excel file');
      return;
    }

    this.fileName = file.name;
    this.isProcessing = true;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0];

      const employees: any[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header

        const id = row.getCell(1).value?.toString().trim();
        const name = row.getCell(2).value?.toString().trim();
        const phone = row.getCell(3).value?.toString().trim();
        let email = '';
        const emailCell = row.getCell(4).value;
        if (emailCell && typeof emailCell === 'object' && 'text' in emailCell) {
          email = (emailCell as any).text?.toString().trim() || '';
        } else {
          email = emailCell?.toString().trim() || '';
        }

        if (id || name || phone || email) {
          employees.push({
            employeeId: id,
            employeeName: name,
            employeePhoneNo: phone,
            employeeEmail: email
          });
        }
      });

      this.parsedEmployees = employees;
      this.toasterService.success(`Successfully parsed ${employees.length} records`);
    } catch (error) {
      console.error(error);
      this.toasterService.error('Failed to parse Excel file');
    } finally {
      this.isProcessing = false;
    }
  }

  downloadTemplate() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('QR Employees Template');
    worksheet.addRow(['Employee ID', 'Employee Name', 'Phone No', 'Email']);
    worksheet.getRow(1).font = { bold: true };
    worksheet.columns = [
      { key: 'employeeId', width: 15 },
      { key: 'employeeName', width: 25 },
      { key: 'employeePhoneNo', width: 15 },
      { key: 'employeeEmail', width: 30 }
    ];

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'qr_employees_template.xlsx');
    });
  }

  import() {
    if (this.parsedEmployees.length > 0) {
      this.dialogRef.close(this.parsedEmployees);
    }
  }

  close() {
    this.dialogRef.close();
  }
}

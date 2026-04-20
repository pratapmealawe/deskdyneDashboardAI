import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../material.module';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-import-virtual-cafeteria-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './import-virtual-cafeteria-employee.component.html',
  styleUrls: ['./import-virtual-cafeteria-employee.component.scss']
})
export class ImportVirtualCafeteriaEmployeeComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  employeeList: any[] = [];
  isLoading = false;
  fileName: string | null = null;
  dragOver = false;
  currentStep: 'select' | 'preview' = 'select';

  constructor(
    private api: ApiMainService,
    private toaster: ToasterService,
    private dialogRef: MatDialogRef<ImportVirtualCafeteriaEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orgObj: any, selectedCafeteria?: any }
  ) { }

  ngOnInit(): void {
  }

  async downloadTemplate() {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Employee Template');

      worksheet.columns = [
        { header: 'Emp Name', key: 'name', width: 25 },
        { header: 'Emp Id', key: 'id', width: 15 },
        { header: 'Emp Ph No', key: 'phone', width: 20 },
        { header: 'Emp Email', key: 'email', width: 30 }
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      worksheet.addRow({
        name: 'John Doe',
        id: 'EMP123',
        phone: '9876543210',
        email: 'john@example.com'
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Virtual_Cafeteria_Employee_Template.xlsx`);

      this.toaster.success('Import template downloaded');
    } catch (error) {
      console.error('Template download error:', error);
      this.toaster.error('Failed to download template');
    }
  }

  async onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) return;
    await this.processFile(target.files[0]);
  }

  async processFile(file: File) {
    this.isLoading = true;
    this.fileName = file.name;

    try {
      let data: any = await this.uploadExcel(file);
      if (data && data.length > 0) {
        const excelEmployees: any[] = [];

        data.forEach((elm: any) => {
          if (elm[0] && elm[0] !== 'Emp Name' && elm[0] !== 'Employee Name') {
            excelEmployees.push({
              employeeName: elm[0] || '',
              employeeId: elm[1] || '',
              employeePhoneNo: elm[2] || '',
              employeeEmail: elm[3] || '',
              organization_name: this.data.orgObj.organization_name,
              organization_id: this.data.orgObj._id,
              cafeteria_id: this.data.selectedCafeteria?.cafeteria_id || '',
              cafeteria_name: this.data.selectedCafeteria?.cafeteria_name || ''
            });
          }
        });

        if (excelEmployees.length > 0) {
          this.employeeList = excelEmployees;
          this.currentStep = 'preview';
          this.toaster.success(`${excelEmployees.length} records parsed.`);
        } else {
          this.toaster.warning('No valid employee records found.');
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
      const res = await this.api.addVcEmployeeList(this.employeeList);
      this.toaster.success('Employees imported successful.');
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error('Import error:', error);
      const errorArr = error?.error?.msg?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
        this.toaster.error(`Failed to import ${errorArr.length} duplicate records.`);
      } else {
        this.toaster.error('Failed to import employee list.');
      }
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  async uploadExcel(file: File): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.getWorksheet(1);
    const data: any[] = [];
    worksheet?.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      const values = Array.isArray(row.values) ? row.values.slice(1) : [];
      data.push(values);
    });
    return data;
  }
}

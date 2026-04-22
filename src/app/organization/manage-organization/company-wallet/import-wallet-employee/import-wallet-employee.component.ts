import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-import-wallet-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './import-wallet-employee.component.html',
  styleUrls: ['./import-wallet-employee.component.scss']
})
export class ImportWalletEmployeeComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  employeeList: any[] = [];
  isLoading = false;
  fileName: string | null = null;
  dragOver = false;
  currentStep: 'select' | 'preview' = 'select';

  constructor(
    private api: ApiMainService,
    private toaster: ToasterService,
    private dialogRef: MatDialogRef<ImportWalletEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orgObj: any, selectedCafeteria?: any }
  ) { }

  ngOnInit(): void {
  }

  async downloadTemplate() {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Wallet Employee Template');

      worksheet.columns = [
        { header: 'Emp Name', key: 'name', width: 25 },
        { header: 'Emp Id', key: 'id', width: 15 },
        { header: 'Emp Ph No', key: 'phone', width: 20 },
        { header: 'Emp Email', key: 'email', width: 30 }
      ];

      // Styling header
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      // Adding Sample Data
      worksheet.addRow({
        name: 'John Doe',
        id: 'EMP123',
        phone: '9876543210',
        email: 'john@example.com'
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Wallet_Import_Template_${this.data.orgObj?.organization_name || 'Org'}.xlsx`);

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
          // Skip header or empty rows
          if (elm[0] && elm[0] !== 'Emp Name' && elm[0] !== 'Employee Name') {
            excelEmployees.push({
              employeeName: elm[0] || '',
              employeeId: elm[1] || '',
              employeePhoneNo: Number(elm[2]) || '',
              employeeEmail: elm[3] || '',
              organization_name: this.data.orgObj.organization_name,
              organization_id: this.data.orgObj._id,
              // Map to selected cafeteria
              cafeteriaId: this.data.selectedCafeteria?.cafeteria_id,
              cafeteria_id: this.data.selectedCafeteria?.cafeteria_id,
              cafeteriaName: this.data.selectedCafeteria?.cafeteria_name,
              cafeteria_name: this.data.selectedCafeteria?.cafeteria_name,
            });
          }
        });

        if (excelEmployees.length > 0) {
          this.employeeList = excelEmployees;
          this.currentStep = 'preview';
          this.toaster.success(`${excelEmployees.length} records parsed.`);
        } else {
          this.toaster.warning('No valid wallet employee records found.');
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
      const res: any = await this.api.bulkUpdateCompanyWalletCafeteriaDetails(this.employeeList);
      if (res) {
          if (res.skippedEmployees?.length > 0) {
              const skipCount = res.skippedEmployees.length;
              const insertCount = (res.insertedEmployees?.length || 0) + (res.cafeteriaUpdated?.length || 0);
              
              if (insertCount > 0) {
                  this.toaster.info(`${insertCount} records imported, ${skipCount} skipped.`);
              } else {
                  this.handleSkipError(res.skippedEmployees[0], skipCount);
              }
          } else {
              this.toaster.success(`${this.employeeList.length} wallet records imported successfully.`);
          }
          this.dialogRef.close(true);
      }
    } catch (error: any) {
      console.error('Import error:', error);
      const errorArr = error?.error?.msg?.skippedEmployees || error?.error?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
          this.handleSkipError(errorArr[0], errorArr.length);
      } else {
          this.toaster.error('Failed to import wallet employee list.');
      }
    } finally {
      this.isLoading = false;
    }
  }

  private handleSkipError(skip: any, totalSkips: number): void {
      let message = '';
      if (skip.skipCode === 'DUPLICATE_CAFETERIA') {
          message = totalSkips > 1 ? `${totalSkips} records already exist in selected cafeterias` : 'Employee already exists in selected cafeterias';
          this.toaster.warning(message);
      } else if (skip.skipCode === 'DIFFERENT_ORG') {
          const orgName = skip.existingOrgName || 'another organization';
          message = totalSkips > 1 ? `${totalSkips} records are already registered with other organizations` : `Employee is already registered with ${orgName}`;
          this.toaster.error(message);
      } else {
          this.toaster.error(skip.message || `Failed to process ${totalSkips} records`);
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

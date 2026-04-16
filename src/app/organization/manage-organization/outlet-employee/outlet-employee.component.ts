import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { AddOutletEmployeeComponent } from './add-outlet-employee/add-outlet-employee.component';
import { BulkAddOutletEmployeeComponent } from './bulk-add-outlet-employee/bulk-add-outlet-employee.component';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-outlet-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './outlet-employee.component.html',
  styleUrls: ['./outlet-employee.component.scss']
})
export class OutletEmployeeComponent implements OnInit {
  @Input() orgObj: any;
  employeeList: any[] = [];
  selectedCafeteria: any;
  selectedCafeteriaName: string | null = null;
  selectedCafeteriaId: string | null = null;
  loading = false;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  searchTerm: string = '';
  fileName: string | null = null;

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.initCafeteriaDefaults();
  }

  private initCafeteriaDefaults(): void {
    if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
      this.getEmployeeListByCafeId();
    }
  }

  // ---------- CAFETERIA ----------

  onCafeteriaChange(): void {
    if (!this.selectedCafeteria) return;
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    this.getEmployeeListByCafeId();
    this.resetPagination();
  }

  selectCafeteria(cafeteria: any): void {
    this.selectedCafeteria = cafeteria;
    this.selectedCafeteriaName = cafeteria.cafeteria_name;
    this.selectedCafeteriaId = cafeteria.cafeteria_id;
    this.getEmployeeListByCafeId();
    this.resetPagination();
  }

  getInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  // ---------- API ----------

  async getEmployeeListByCafeId(): Promise<void> {
    if (!this.orgObj?._id || !this.selectedCafeteriaId) return;
    try {
      this.loading = true;
      this.employeeList = await this.apiMainService.getOutletEmployeeListByCafeteriaId(this.selectedCafeteriaId) || [];
      this.resetPagination();
    } catch (error) {
      console.error(error);
      this.toasterService.error('Failed to fetch employees');
    } finally {
      this.loading = false;
    }
  }

  // ---------- ACTIONS ----------

  addManualEmployee(): void {
    if (!this.selectedCafeteria) {
      this.toasterService.warning('Please select a cafeteria first');
      return;
    }
    this.openAddEditDialog();
  }

  editEmployee(employee: any): void {
    this.openAddEditDialog(employee);
  }

  openAddEditDialog(employee: any = null): void {
    const dialogRef = this.dialog.open(AddOutletEmployeeComponent, {
      width: '500px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria,
        employee: employee
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployeeListByCafeId();
      }
    });
  }

  addMultipleEmployee(): void {
    if (!this.selectedCafeteria) {
      this.toasterService.warning('Please select a cafeteria first');
      return;
    }
    this.openBulkAddDialog();
  }

  openBulkAddDialog(employees: any[] = []): void {
    const dialogRef = this.dialog.open(BulkAddOutletEmployeeComponent, {
      width: '95vw',
      maxWidth: '1200px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria,
        employees: employees
      },
      panelClass: 'full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployeeListByCafeId();
      }
      this.fileName = null;
    });
  }

  // ---------- DELETE ----------

  deleteEmployee(employee: any): void {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete ${employee.employeeName}?`,
      callback: () => this.confirmDelete(employee._id),
      context: this
    });
  }

  async confirmDelete(id: string): Promise<void> {
    try {
      await this.apiMainService.deleteOutletEmployee(id);
      this.toasterService.success('Employee deleted');
      this.getEmployeeListByCafeId();
    } catch (error) {
      console.error(error);
      this.toasterService.error('Failed to delete employee');
    }
  }

  // ---------- FILTER / PAGINATION ----------

  get filteredEmployees(): any[] {
    let list = this.employeeList || [];
    if (this.selectedCafeteriaId) {
      list = list.filter((emp) => emp.cafeteria_id === this.selectedCafeteriaId);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter((emp) =>
        emp.employeeName?.toLowerCase().includes(term) ||
        emp.employeeId?.toLowerCase().includes(term) ||
        emp.employeePhoneNo?.toString().includes(this.searchTerm) ||
        emp.employeeEmail?.toLowerCase().includes(term)
      );
    }
    return list;
  }

  private resetPagination(): void {
    this.pageIndex = 0;
  }

  get pagedEmployees(): any[] {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredEmployees.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  // ---------- EXCEL HELPERS ----------

  clearFile(): void {
    this.fileName = null;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.processFile(file);
    }
  }

  async processFile(file: File): Promise<void> {
    this.fileName = file.name;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0];

      let parsedEmployees: any[] = [];

      worksheet.eachRow((row: any, rowNumber: number) => {
        if (rowNumber === 1) return;

        const idCell = row.getCell(1).value;
        const nameCell = row.getCell(2).value;
        const phoneCell = row.getCell(3).value;
        const emailCell = row.getCell(4).value;

        const employeeId = (idCell || '').toString().trim();
        const employeeName = (nameCell || '').toString().trim();
        const phone = (phoneCell || '').toString().trim();
        let email = '';
        if (emailCell && typeof emailCell === 'object' && 'text' in emailCell) {
          email = (emailCell as any).text?.toString().trim() || '';
        } else {
          email = (emailCell || '').toString().trim();
        }

        if (!employeeId && !employeeName && !phone && !email) return;

        parsedEmployees.push({
          organization_name: this.orgObj.organization_name,
          organization_id: this.orgObj._id,
          cafeteria_name: this.selectedCafeteria.cafeteria_name,
          cafeteria_id: this.selectedCafeteria.cafeteria_id,
          employeeId,
          employeeName,
          employeePhoneNo: phone,
          employeeEmail: email
        });
      });

      if (parsedEmployees.length > 0) {
        this.openBulkAddDialog(parsedEmployees);
      } else {
        this.toasterService.warning('No valid employees found in Excel');
        this.fileName = null;
      }
    } catch (err) {
      console.error('Error reading Excel file', err);
      this.toasterService.error('Failed to read Excel file');
      this.fileName = null;
    }
  }

  async downloadExcelTemplate(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Employees Template');

    worksheet.addRow(['Employee ID', 'Employee Name', 'Phone No', 'Email']);

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.columns = [
      { key: 'employeeId', width: 15 },
      { key: 'employeeName', width: 25 },
      { key: 'employeePhoneNo', width: 15 },
      { key: 'employeeEmail', width: 30 }
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'outlet_employees_template.xlsx');
  }
}



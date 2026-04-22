import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OrganizationSharedService } from '../../organization-shared.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { AddOutletEmployeeComponent } from './add-outlet-employee/add-outlet-employee.component';
import { BulkAddOutletEmployeeComponent } from './bulk-add-outlet-employee/bulk-add-outlet-employee.component';
import { ImportOutletEmployeeComponent } from './import-outlet-employee/import-outlet-employee.component';
import { CafeteriaSelectorComponent } from '../cafeteria-selector/cafeteria-selector.component';

@Component({
  selector: 'app-outlet-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CafeteriaSelectorComponent
  ],
  templateUrl: './outlet-employee.component.html',
  styleUrls: ['./outlet-employee.component.scss']
})
export class OutletEmployeeComponent implements OnInit {
  orgObj: any;
  employeeList: any[] = [];
  selectedCafeteria: any = null;
  selectedCafeteriaId: string | null = null;
  loading = false;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];
  searchTerm: string = '';
  private orgSub: Subscription | undefined;
  constructor(
    private api: ApiMainService,
    private dialog: MatDialog,
    private confirmationModal: ConfirmationModalService,
    private toaster: ToasterService,
    private orgSharedService: OrganizationSharedService
  ) { }

  ngOnInit(): void {
    if (this.orgObj) {
      this.initializeComponent();
    } else {
      this.orgSub = this.orgSharedService.organization$.subscribe(org => {
        if (org) {
          this.orgObj = org;
          this.initializeComponent();
        }
      });
    }
  }

  initializeComponent(): void {
    if (this.orgObj?.cafeteriaList?.length > 0) {
      this.selectCafeteria(this.orgObj.cafeteriaList[0]);
    }
  }

  ngOnDestroy() {
    if (this.orgSub) {
      this.orgSub.unsubscribe();
    }
  }

  selectCafeteria(cafeteria: any): void {
    this.selectedCafeteria = cafeteria;
    this.selectedCafeteriaId = cafeteria.cafeteria_id;
    this.refreshEmployeeList();
  }

  async refreshEmployeeList() {
    if (!this.selectedCafeteriaId) return;
    try {
      this.loading = true;
      const res = await this.api.getOutletEmployeeListByCafeteriaId(this.selectedCafeteriaId);
      this.employeeList = res || [];
      this.pageIndex = 0;
    } catch (error) {
      console.error(error);
      this.toaster.error('Failed to fetch employees');
    } finally {
      this.loading = false;
    }
  }

  getInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  // ---------- ACTIONS ----------

  addManualEmployee(): void {
    if (!this.selectedCafeteria) {
      this.toaster.warning('Please select an outlet first');
      return;
    }
    const dialogRef = this.dialog.open(AddOutletEmployeeComponent, {
      width: '500px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.refreshEmployeeList();
    });
  }

  editEmployee(employee: any): void {
    const dialogRef = this.dialog.open(AddOutletEmployeeComponent, {
      width: '500px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria,
        employee: employee
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.refreshEmployeeList();
    });
  }

  addMultipleEmployee(): void {
    if (!this.selectedCafeteria) {
      this.toaster.warning('Please select an outlet first');
      return;
    }
    const dialogRef = this.dialog.open(BulkAddOutletEmployeeComponent, {
      width: '90vw',
      maxWidth: '1200px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.refreshEmployeeList();
    });
  }

  openImportDialog(): void {
    if (!this.selectedCafeteria) {
      this.toaster.warning('Please select an outlet first');
      return;
    }

    const dialogRef = this.dialog.open(ImportOutletEmployeeComponent, {
      width: '740px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria
      },
      panelClass: 'premium-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.refreshEmployeeList();
    });
  }

  deleteEmployee(employee: any): void {
    this.confirmationModal.modal({
      msg: `Are you sure you want to remove ${employee.employeeName} from this outlet?`,
      callback: () => this.confirmDeleteEmployee(employee),
      context: this
    });
  }

  async confirmDeleteEmployee(employee: any): Promise<void> {
    try {
      await this.api.deleteOutletEmployee(employee._id);
      this.toaster.success('Employee removed');
      await this.refreshEmployeeList();
    } catch (err) {
      console.error(err);
      this.toaster.error('Failed to remove employee');
    }
  }

  exportEmployees(): void {
    const list = this.filteredEmployees;
    if (!list || list.length === 0) {
      this.toaster.error('No staff records found to export');
      return;
    }
    this.generateEmployeesExcel(list);
  }

  private async generateEmployeesExcel(data: any[]): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'DeskDyne Dashboard';
      workbook.created = new Date();

      const worksheet = workbook.addWorksheet('Staff List', {
        views: [{ state: 'frozen', ySplit: 2 }]
      });

      // Title Row
      worksheet.mergeCells('A1:E1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = `STAFF LIST - ${this.selectedCafeteria?.cafeteria_name || 'Outlet'}`;
      titleCell.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0E49B5' } };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

      // Column Headers
      const headers = [
        { header: 'EMPLOYEE ID', key: 'employeeId', width: 20 },
        { header: 'NAME', key: 'employeeName', width: 30 },
        { header: 'PHONE NO', key: 'employeePhoneNo', width: 20 },
        { header: 'EMAIL', key: 'employeeEmail', width: 35 },
        { header: 'OUTLET', key: 'cafeteria', width: 30 }
      ];

      worksheet.columns = headers;

      const headerRow = worksheet.getRow(2);
      headerRow.height = 25;
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '2563EB' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });

      // Add Data
      data.forEach((emp, index) => {
        const row = worksheet.addRow({
          employeeId: emp.employeeId || 'N/A',
          employeeName: emp.employeeName || 'N/A',
          employeePhoneNo: emp.employeePhoneNo || 'N/A',
          employeeEmail: emp.employeeEmail || 'N/A',
          cafeteria: this.selectedCafeteria?.cafeteria_name || 'N/A'
        });

        if (index % 2 === 0) {
          row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
        }

        row.eachCell((cell) => {
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
          cell.border = {
            top: { style: 'thin', color: { argb: 'E2E8F0' } },
            left: { style: 'thin', color: { argb: 'E2E8F0' } },
            bottom: { style: 'thin', color: { argb: 'E2E8F0' } },
            right: { style: 'thin', color: { argb: 'E2E8F0' } }
          };
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Staff_List_${this.selectedCafeteria?.cafeteria_name || 'Outlet'}.xlsx`);
      this.toaster.success('Export successful');
    } catch (error) {
      console.error('Export error:', error);
      this.toaster.error('Failed to export list');
    }
  }

  // ---------- FILTER & PAGINATION ----------

  get filteredEmployees(): any[] {
    let list = this.employeeList || [];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(emp =>
        emp.employeeName?.toLowerCase().includes(term) ||
        emp.employeeId?.toLowerCase().includes(term) ||
        emp.employeePhoneNo?.toString().includes(term) ||
        emp.employeeEmail?.toLowerCase().includes(term)
      );
    }
    return list;
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
}

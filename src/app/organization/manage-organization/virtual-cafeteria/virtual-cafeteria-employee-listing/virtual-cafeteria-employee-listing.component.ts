import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { AddEditVirtualCafeteriaEmployeeComponent } from './add-edit-virtual-cafeteria-employee/add-edit-virtual-cafeteria-employee.component';
import { ImportVirtualCafeteriaEmployeeComponent } from './import-virtual-cafeteria-employee/import-virtual-cafeteria-employee.component';
import { AddEditMultipleVirtualCafeteriaEmployeeComponent } from './add-edit-multiple-virtual-cafeteria-employee/add-edit-multiple-virtual-cafeteria-employee.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-virtual-cafeteria-employee-listing',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialModule, 
    AddEditVirtualCafeteriaEmployeeComponent, 
    ImportVirtualCafeteriaEmployeeComponent,
    AddEditMultipleVirtualCafeteriaEmployeeComponent
  ],
  templateUrl: './virtual-cafeteria-employee-listing.component.html',
  styleUrls: ['./virtual-cafeteria-employee-listing.component.scss']
})
export class VirtualCafeteriaEmployeeListingComponent implements OnInit, OnChanges {
  @Input() orgObj: any;
  @Input() selectedCafeteria: any;
  employeeList: any[] = [];
  filteredEmployeeList: any[] = [];
  isLoading = false;

  constructor(
    private api: ApiMainService,
    private dialog: MatDialog,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getEmployeeListByOrgId();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCafeteria']) {
      this.filterEmployees();
    }
  }

  filterEmployees() {
    if (!this.selectedCafeteria || !this.selectedCafeteria.cafeteria_id) {
      this.filteredEmployeeList = this.employeeList;
    } else {
      this.filteredEmployeeList = this.employeeList.filter(emp => emp.cafeteria_id === this.selectedCafeteria.cafeteria_id);
    }
  }

  async getEmployeeListByOrgId() {
    this.isLoading = true;
    try {
      this.employeeList = await this.api.vcEmployeeByOrgId(this.orgObj._id);
      this.filterEmployees();
    } catch (error) {
      console.error('Error fetching employee list:', error);
      this.toaster.error('Failed to load employee list');
    } finally {
      this.isLoading = false;
    }
  }

  addSingleEmployee() {
    const dialogRef = this.dialog.open(AddEditVirtualCafeteriaEmployeeComponent, {
      width: '600px',
      data: { orgObj: this.orgObj, selectedCafeteria: this.selectedCafeteria }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getEmployeeListByOrgId();
    });
  }

  editEmployee(employee: any) {
    const dialogRef = this.dialog.open(AddEditVirtualCafeteriaEmployeeComponent, {
      width: '600px',
      data: { orgObj: this.orgObj, employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getEmployeeListByOrgId();
    });
  }

  addMultipleManual() {
    const dialogRef = this.dialog.open(AddEditMultipleVirtualCafeteriaEmployeeComponent, {
      width: '950px',
      data: { orgObj: this.orgObj, selectedCafeteria: this.selectedCafeteria }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getEmployeeListByOrgId();
    });
  }

  addExcelImport() {
    const dialogRef = this.dialog.open(ImportVirtualCafeteriaEmployeeComponent, {
      width: '850px',
      data: { orgObj: this.orgObj, selectedCafeteria: this.selectedCafeteria }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getEmployeeListByOrgId();
    });
  }

  async deleteEmployee(employee: any) {
    if (confirm(`Are you sure you want to delete employee: ${employee.employeeName}?`)) {
      try {
        await this.api.deleteVcEmployee(employee._id);
        this.toaster.success('Employee deleted successfully');
        this.getEmployeeListByOrgId();
      } catch (error) {
        console.error('Error deleting employee:', error);
        this.toaster.error('Failed to delete employee');
      }
    }
  }

  async exportToExcel() {
    if (this.employeeList.length === 0) {
      this.toaster.warning('No employees to export');
      return;
    }

    this.isLoading = true;
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Employee List');

      worksheet.columns = [
        { header: 'Employee ID', key: 'id', width: 20 },
        { header: 'Employee Name', key: 'name', width: 30 },
        { header: 'Phone Number', key: 'phone', width: 20 },
        { header: 'Email Address', key: 'email', width: 35 },
        { header: 'Cafeteria', key: 'cafe', width: 25 },
        { header: 'Organization', key: 'org', width: 30 }
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      this.employeeList.forEach(emp => {
        worksheet.addRow({
          id: emp.employeeId,
          name: emp.employeeName,
          phone: emp.employeePhoneNo,
          email: emp.employeeEmail,
          cafe: emp.cafeteria_name || 'Default',
          org: this.orgObj.organization_name
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Employees_${this.orgObj.organization_name}_${new Date().toLocaleDateString()}.xlsx`);

      this.toaster.success('Excel file exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      this.toaster.error('Failed to export Excel file');
    } finally {
      this.isLoading = false;
    }
  }
}


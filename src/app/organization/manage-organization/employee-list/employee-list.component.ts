import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { OrganizationSharedService } from '../../organization-shared.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from "src/app/material.module";
import { ApiMainService } from "@service/apiService/apiMain.service";
import { ConfirmationModalService } from "@service/confirmation-modal.service";
import { ToasterService } from "@service/toaster.service";
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { BulkAddEmployeeComponent } from './bulk-add-employee/bulk-add-employee.component';
import { ImportEmployeeComponent } from './import-employee/import-employee.component';
import { CafeteriaSelectorComponent } from '../cafeteria-selector/cafeteria-selector.component';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [CommonModule, FormsModule, MaterialModule, CafeteriaSelectorComponent],
    templateUrl: 'employee-list.component.html',
    styleUrls: ['employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
    employeeList: any[] = [];
    orgObj: any;
    selectedCafeterias: { cafeteria_id: string; cafeteria_name: string }[] = [];
    selectedCafeteriaIds: string[] = [];
    cafeObj: { cafeteria_id: string; cafeteria_name: string }[] = [];
    searchTerm: string = '';
    private orgSub: Subscription | undefined;

    constructor(
        private apiMainService: ApiMainService,
        private dialog: MatDialog,
        private toaster: ToasterService,
        private confirmationModalService: ConfirmationModalService,
        private orgSharedService: OrganizationSharedService
    ) { }

    ngOnInit() {
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

    initializeComponent() {
        if (this.orgObj?.cafeteriaList?.length > 0) {
            this.selectCafeteria(this.orgObj.cafeteriaList[0]);
        }
    }

    ngOnDestroy() {
        if (this.orgSub) {
            this.orgSub.unsubscribe();
        }
    }

    // Generate initials for avatar
    getInitials(name: string | undefined): string {
        if (!name) return '?';
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    // Select cafeteria
    async selectCafeteria(cafeteria: any) {
        const index = this.selectedCafeterias.findIndex(
            c => c.cafeteria_id === cafeteria.cafeteria_id
        );

        if (index === -1) {
            this.selectedCafeterias.push({
                cafeteria_id: cafeteria.cafeteria_id,
                cafeteria_name: cafeteria.cafeteria_name
            });
            this.selectedCafeteriaIds.push(cafeteria.cafeteria_id);
        } else {
            this.selectedCafeterias.splice(index, 1);
            this.selectedCafeteriaIds.splice(index, 1);
        }

        this.cafeObj = [...this.selectedCafeterias];
        await this.getEmployeelistByCafeteriaId();
    }

    isCafeteriaSelected(cafeteriaId: string): boolean {
        return this.selectedCafeteriaIds.includes(cafeteriaId);
    }

    getCafeteriaEmployees(): any[] {
        if (!this.employeeList || !this.selectedCafeteriaIds.length) return [];
        return this.employeeList.filter(emp =>
            emp.cafeteria_list?.some((c: any) =>
                this.selectedCafeteriaIds.includes(c.cafeteria_id)
            )
        );
    }

    getEmployeeCafeteriaNames(employee: any): string {
        if (!employee?.cafeteria_list?.length) return 'N/A';
        return employee.cafeteria_list
            .map((c: any) => c.cafeteria_name)
            .join(', ');
    }

    getFilteredEmployees(): any[] {
        if (!this.employeeList) return [];

        return this.employeeList.filter(emp => {
            const matchesCafeteria = emp.cafeteria_list?.some((c: any) =>
                this.selectedCafeteriaIds.includes(c.cafeteria_id)
            );
            const matchesSearch = !this.searchTerm ||
                emp.employeeName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                emp.employeeId?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                emp.employeePhoneNo?.toString().includes(this.searchTerm) ||
                emp.employeeEmail?.toLowerCase().includes(this.searchTerm.toLowerCase());
            return matchesCafeteria && matchesSearch;
        });
    }

    async getEmployeelistByCafeteriaId() {
        try {
            if (!this.selectedCafeteriaIds.length) {
                this.employeeList = [];
                return;
            }
            this.employeeList = await this.apiMainService.getEmployeelistByCafeteriaIds({
                cafeteriaIds: this.selectedCafeteriaIds
            }) || [];
        } catch (error) {
            console.error(error);
        }
    }

    // UPDATED IMPORT LOGIC
    openImportDialog() {
        const dialogRef = this.dialog.open(ImportEmployeeComponent, {
            width: '800px',
            data: {
                orgObj: this.orgObj,
                selectedCafeterias: this.cafeObj
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getEmployeelistByCafeteriaId();
        });
    }

    addIndividualEmployee() {
        const dialogRef = this.dialog.open(AddEmployeeComponent, {
            width: '600px',
            data: {
                orgObj: this.orgObj,
                selectedCafeterias: this.cafeObj
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getEmployeelistByCafeteriaId();
        });
    }

    addMultipleEmployee() {
        const dialogRef = this.dialog.open(BulkAddEmployeeComponent, {
            width: '90vw',
            maxWidth: '1200px',
            data: {
                orgObj: this.orgObj,
                selectedCafeterias: this.cafeObj,
                employees: []
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getEmployeelistByCafeteriaId();
        });
    }

    editEmployee(employee: any) {
        const dialogRef = this.dialog.open(AddEmployeeComponent, {
            width: 'auto',
            maxWidth: '600px',
            data: {
                orgObj: this.orgObj,
                employee: employee
            },
            panelClass: 'modern-dialog'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) this.getEmployeelistByCafeteriaId();
        });
    }

    deleteEmployee(employee: any) {
        this.confirmationModalService.modal({
            msg: `Are you sure you want to delete ${employee.employeeName}?`,
            callback: () => this.confirmDeleteEmployee(employee),
            context: this
        });
    }

    async confirmDeleteEmployee(employee: any) {
        try {
            await this.apiMainService.deleteEmployee(employee._id);
            this.toaster.success('Employee deleted successfully');
            this.getEmployeelistByCafeteriaId();
        } catch (error) {
            console.error(error);
            this.toaster.error('Failed to delete employee');
        }
    }

    exportEmployees() {
        const employees = this.getFilteredEmployees();
        if (!employees || employees.length === 0) {
            this.toaster.error('No employees to export');
            return;
        }
        this.generateEmployeesExcel(employees);
    }

    private async generateEmployeesExcel(data: any[]): Promise<void> {
        try {
            const workbook = new ExcelJS.Workbook();
            workbook.creator = 'DeskDyne Dashboard';
            workbook.created = new Date();

            const worksheet = workbook.addWorksheet('Employee List', {
                views: [{ state: 'frozen', ySplit: 2 }]
            });

            // Title Row
            worksheet.mergeCells('A1:E1');
            const titleCell = worksheet.getCell('A1');
            titleCell.value = `EMPLOYEE LIST - ${this.orgObj?.organization_name || 'Organization'}`;
            titleCell.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
            titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0E49B5' } };
            titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

            // Column Headers
            const headers = [
                { header: 'EMPLOYEE ID', key: 'employeeId', width: 20 },
                { header: 'NAME', key: 'employeeName', width: 30 },
                { header: 'PHONE NO', key: 'employeePhoneNo', width: 20 },
                { header: 'EMAIL', key: 'employeeEmail', width: 35 },
                { header: 'CAFETERIAS', key: 'cafeterias', width: 40 }
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
                    cafeterias: this.getEmployeeCafeteriaNames(emp)
                });

                // Alternating row colors
                if (index % 2 === 0) {
                    row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
                }

                row.eachCell((cell) => {
                    cell.alignment = { vertical: 'middle' };
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'E2E8F0' } },
                        left: { style: 'thin', color: { argb: 'E2E8F0' } },
                        bottom: { style: 'thin', color: { argb: 'E2E8F0' } },
                        right: { style: 'thin', color: { argb: 'E2E8F0' } }
                    };
                });
            });

            // Generate Buffer and Save
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `Employee_List_${new Date().getTime()}.xlsx`);
            this.toaster.success('Employee list exported successfully');
        } catch (error) {
            console.error('Export error:', error);
            this.toaster.error('Failed to export employee list');
        }
    }
}

import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ApiMainService } from "src/service/apiService/apiMain.service";
import { ExcelService } from "src/service/excel.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "src/app/material.module";
import { ConfirmationModalService } from "src/service/confirmation-modal.service";
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { BulkAddEmployeeComponent } from './bulk-add-employee/bulk-add-employee.component';
import { ToasterService } from "src/service/toaster.service";

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [CommonModule, FormsModule, MaterialModule],
    templateUrl: 'employee-list.component.html',
    styleUrls: ['employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
    employeeList: any[] = [];
    @Input() orgObj: any;
    confirmDelete: boolean = false;
    selectedCafeterias: { cafeteria_id: string; cafeteria_name: string }[] = [];
    selectedCafeteriaIds: string[] = [];
    cafeObj: { cafeteria_id: string; cafeteria_name: string }[] = [];
    deletedEmployee: any;
    showError: boolean = false;
    fileName: any;
    searchTerm: string = '';
    editingEmployee: any;

    constructor(
        private apiMainService: ApiMainService,
        private excelService: ExcelService,
        private toasterService: ToasterService,
        private dialog: MatDialog,
        private confirmationModalService: ConfirmationModalService
    ) { }

    ngOnInit() {
        if (this.orgObj?.cafeteriaList?.length > 0) {
            this.selectCafeteria(this.orgObj.cafeteriaList[0]);
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

    // Check if cafeteria pill is active
    isCafeteriaSelected(cafeteriaId: string): boolean {
        return this.selectedCafeteriaIds.includes(cafeteriaId);
    }

    // Get employees belonging to any selected cafeteria
    getCafeteriaEmployees(): any[] {
        if (!this.employeeList || !this.selectedCafeteriaIds.length) return [];
        return this.employeeList.filter(emp =>
            emp.cafeteria_list?.some((c: any) =>
                this.selectedCafeteriaIds.includes(c.cafeteria_id)
            )
        );
    }

    // Get cafeteria name(s) for an employee to display on card
    getEmployeeCafeteriaNames(employee: any): string {
        if (!employee?.cafeteria_list?.length) return 'N/A';
        return employee.cafeteria_list
            .map((c: any) => c.cafeteria_name)
            .join(', ');
    }

    // Filtered employees (cafeteria + search)
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

    async downloadTemplate() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employee Template');

        worksheet.columns = [
            { header: 'Employee ID', key: 'empId', width: 15 },
            { header: 'Employee Name', key: 'empName', width: 25 },
            { header: 'Phone No', key: 'empPhNo', width: 15 },
            { header: 'Email', key: 'empEmail', width: 30 }
        ];

        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '4F46E5' }
        };
        headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
        headerRow.height = 25;

        worksheet.addRow({
            empId: 'EMP001',
            empName: 'John Doe',
            empPhNo: '9876543210',
            empEmail: 'john.doe@company.com'
        });

        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `employee_template_${this.orgObj?.organization_name || 'org'}.xlsx`);
    }

    clearFile() {
        this.fileName = null;
    }

    onFileDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.processFile(files[0]);
        }
    }

    async processFile(file: File) {
        try {
            const data: any = await this.excelService.upload(file);
            this.fileName = file.name;

            let parsedEmployees: any[] = [];
            if (data?.length > 0) {
                data.forEach((elm: any) => {
                    if (elm[0] && elm[0] !== 'Employee ID' && elm[0] !== '') {
                        parsedEmployees.push({
                            organization_name: this.orgObj.organization_name,
                            organization_id: this.orgObj._id,
                            employeeId: elm[0],
                            employeeName: elm[1],
                            employeePhoneNo: elm[2],
                            employeeEmail: elm[3],
                            cafeteria_list: [...this.cafeObj]
                        });
                    }
                });
            }

            if (parsedEmployees.length > 0) {
                this.openBulkAddDialog(parsedEmployees);
            }
        } catch (error) {
            console.error(error);
            this.toasterService.error('Failed to process file');
        }
    }

    openBulkAddDialog(existingEmployees: any[] = []) {
        const dialogRef = this.dialog.open(BulkAddEmployeeComponent, {
            width: '95vw',
            maxWidth: '1200px',
            data: {
                orgObj: this.orgObj,
                selectedCafeterias: this.cafeObj,
                employees: existingEmployees
            },
            panelClass: 'full-screen-dialog'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getEmployeelistByCafeteriaId();
            }
            this.fileName = null;
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

    addMultipleEmployee() {
        if (!this.selectedCafeteriaIds.length) {
            this.toasterService.warning('Please select a cafeteria first');
            return;
        }
        this.openBulkAddDialog();
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
            if (result) {
                this.getEmployeelistByCafeteriaId();
            }
        });
    }

    addIndividualEmployee() {
        const dialogRef = this.dialog.open(AddEmployeeComponent, {
            width: 'auto',
            maxWidth: '600px',
            data: {
                orgObj: this.orgObj
            },
            panelClass: 'modern-dialog'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getEmployeelistByCafeteriaId();
            }
        });
    }

    deleteEmployee(employee: any) {
        this.deletedEmployee = employee;
        this.confirmationModalService.modal({
            msg: `Are you sure you want to delete ${employee.employeeName}?`,
            callback: this.confirmDeleteEmployee,
            context: this
        });
    }

    async confirmDeleteEmployee() {
        try {
            await this.apiMainService.deleteEmployee(this.deletedEmployee._id);
            this.toasterService.success('Employee deleted successfully');
            this.getEmployeelistByCafeteriaId();
        } catch (error) {
            console.error(error);
            this.toasterService.error('Failed to delete employee');
        }
    }

    deleteAllEmployees() {
        this.confirmationModalService.modal({
            msg: `Are you sure you want to delete all ${this.getCafeteriaEmployees().length} employees from ${this.getSelectedCafeteriaNames()}?`,
            callback: this.confirmDeleteAllEmployees,
            context: this
        });
    }

    async confirmDeleteAllEmployees() {
        const ids = this.getCafeteriaEmployees().map((emp: any) => emp._id);
        try {
            await this.apiMainService.deleteMultipleEmployee(ids);
            this.toasterService.success('All employees deleted successfully');
            this.getEmployeelistByCafeteriaId();
        } catch (error) {
            console.error(error);
            this.toasterService.error('Failed to delete employees');
        }
    }

    async onFileChange(evt: any) {
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) {
            this.toasterService.error('Please select only one file');
            return;
        }
        await this.processFile(target.files[0]);
    }

    getSelectedCafeteriaNames() {
        return this.cafeObj.map((cafe: any) => cafe.cafeteria_name);
    }
}

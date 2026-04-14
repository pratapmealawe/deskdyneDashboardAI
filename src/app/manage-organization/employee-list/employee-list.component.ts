import { Component, Input, ViewChild, TemplateRef } from "@angular/core";
import { ApiMainService } from "src/service/apiService/apiMain.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ExcelService } from "src/service/excel.service";
import { ToasterService } from 'src/service/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
    templateUrl: 'employee-list.component.html',
    styleUrls: ['employee-list.component.scss']
})
export class EmployeeListComponent {
    employeeList: any[] = [];
    @ViewChild("editDialog") editDialog!: TemplateRef<any>;
    @ViewChild("deleteDialog") deleteDialog!: TemplateRef<any>;
    @ViewChild("deleteAllDialog") deleteAllDialog!: TemplateRef<any>;
    @Input() orgObj: any;
    empId: any;
    form!: FormGroup;
    showMultipleEmployeeForm = false;
    addMultipleEmploeeList: any[] = [];
    disableSubmit: any = false;
    showRemoveForm = false;
    showAddMoreForm = true;
    employeeObj: any;
    confirmDelete: boolean = false;
    deleteEmployeeName: any = '';
    selectedCafeterias: { cafeteria_id: string; cafeteria_name: string }[] = [];
    selectedCafeteriaIds: string[] = [];
    cafeObj: { cafeteria_id: string; cafeteria_name: string }[] = [];
    deletedEmployee: any;
    showError: boolean = false;
    fileName: any;
    searchQuery: string = '';
    editingEmployee: any;

    constructor(
        private apiMainService: ApiMainService,
        private excelService: ExcelService,
        private fb: FormBuilder,
        private toasterService: ToasterService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.initForm();
        this.initEmployeeObj();

        if (this.orgObj?.cafeteriaList?.length > 0) {
            this.selectCafeteria(this.orgObj.cafeteriaList[0]);
        }
    }

    initForm() {
        this.form = this.fb.group({
            organization_name: this.orgObj?.organization_name,
            organization_id: this.orgObj?._id,
            employeeName: ['', Validators.required],
            employeeId: [''],
            employeePhoneNo: ['', Validators.required],
            employeeEmail: ['', Validators.required],
        });
    }

    initEmployeeObj() {
        this.employeeObj = {
            organization_name: this.orgObj?.organization_name,
            organization_id: this.orgObj?._id,
            employeeName: '',
            employeeId: '',
            employeePhoneNo: '',
            employeeEmail: '',
        };
    }

    // ðŸ‘‰ Generate initials for avatar
    getInitials(name: string | undefined): string {
        if (!name) return '?';
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    // ðŸ‘‰ Select cafeteria
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
            const matchesSearch = !this.searchQuery ||
                emp.employeeName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                emp.employeeId?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                emp.employeePhoneNo?.toString().includes(this.searchQuery) ||
                emp.employeeEmail?.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesCafeteria && matchesSearch;
        });
    }

    async downloadTemplate() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employee Template');

        // Define columns with headers
        worksheet.columns = [
            { header: 'Employee ID', key: 'empId', width: 15 },
            { header: 'Employee Name', key: 'empName', width: 25 },
            { header: 'Phone No', key: 'empPhNo', width: 15 },
            { header: 'Email', key: 'empEmail', width: 30 }
        ];

        // Style header row
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '4F46E5' }
        };
        headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
        headerRow.height = 25;

        // Add sample data row
        worksheet.addRow({
            empId: 'EMP001',
            empName: 'John Doe',
            empPhNo: '9876543210',
            empEmail: 'john.doe@company.com'
        });

        // Add borders to all cells
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        // Generate and download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `employee_template_${this.orgObj?.organization_name || 'org'}.xlsx`);
    }

    // ðŸ‘‰ Clear uploaded file
    clearFile() {
        this.fileName = null;
        this.showMultipleEmployeeForm = false;
        this.addMultipleEmploeeList = [];
    }

    // ðŸ‘‰ Handle file drop
    onFileDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.processFile(files[0]);
        }
    }

    // ðŸ‘‰ Process uploaded file
    async processFile(file: File) {
        try {
            const data: any = await this.excelService.upload(file);
            this.fileName = file.name;

            if (data?.length > 0) {
                this.addMultipleEmploeeList = [];
                data.forEach((elm: any) => {
                    if (elm[0] && elm[0] !== 'Employee ID' && elm[0] !== '') {
                        this.addMultipleEmploeeList.push({
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
            this.showMultipleEmployeeForm = true;
            this.showRemoveForm = true;
            this.showAddMoreForm = false;
        } catch (error) {
            console.error(error);
            this.toasterService.error('Failed to process file');
        }
    }

    // Fetch employees by selected cafeteriaIDs
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

    // Add new row to manual entry â€” cafeteria_list as array
    addMoreEmployee() {
        this.addMultipleEmploeeList.push({
            ...this.employeeObj,
            cafeteria_list: [...this.cafeObj]
        });
        this.showRemoveForm = true;
        this.showAddMoreForm = false;
    }

    // Init manual entry form â€” cafeteria_list as array
    addMultipleEmployee() {
        if (!this.selectedCafeteriaIds.length) {
            this.toasterService.warning('Please select a cafeteria first');
            return;
        }
        this.addMultipleEmploeeList = [{
            ...this.employeeObj,
            cafeteria_list: [...this.cafeObj]
        }];
        this.showMultipleEmployeeForm = true;
    }

    removeEmployeeForm(index: number) {
        this.addMultipleEmploeeList.splice(index, 1);
        if (this.addMultipleEmploeeList.length === 1) {
            this.showRemoveForm = false;
            this.showAddMoreForm = true;
        }
    }

    async submitMultipleEmployee() {
        const hasInvalid = this.addMultipleEmploeeList.some(emp =>
            !emp.employeeName || !emp.employeePhoneNo || !emp.employeeEmail
        );

        if (hasInvalid) {
            this.toasterService.warning('Please fill all required fields');
            return;
        }

        try {
            const payload = this.addMultipleEmploeeList.map(el => ({
                ...el,
                cafeteria_list: el.cafeteria_list?.length ? el.cafeteria_list : [...this.cafeObj]
            }));

            const res = await this.apiMainService.addEmployeeList(payload);
            this.handleAddEmployeeListResult(res);

        } catch (error: any) {
            // Result is partial â€” some skipped, some inserted/updated
            const result = error?.error?.result || error?.result;
            if (result) {
                this.handleAddEmployeeListResult(result);
            } else {
                this.toasterService.error('Failed to add employees');
                console.error(error);
            }
        }

        await this.getEmployeelistByCafeteriaId();
        this.cancelMultipleEmployee();
    }

    handleAddEmployeeListResult(result: any) {
        // New employees created
        if (result?.insertedEmployees?.length > 0) {
            this.toasterService.success(
                `${result.insertedEmployees.length} new employees added successfully`
            );
        }

        // Existing employees updated with new cafeterias
        if (result?.cafeteriaUpdated?.length > 0) {
            result.cafeteriaUpdated.forEach((entry: any) => {
                const names = entry.addedCafeterias.map((c: any) => c.cafeteria_name).join(', ');
                this.toasterService.info(
                    `${entry.employee.employeeName} added to cafeteria: ${names}`
                );
            });
        }

        // Skipped employees
        if (result?.skippedEmployees?.length > 0) {
            result.skippedEmployees.forEach((emp: any) => {
                if (emp.skipCode === 'DIFFERENT_ORG') {
                    this.toasterService.error(
                        `${emp.employeeName} skipped â€” belongs to a different organization`
                    );
                } else if (emp.skipCode === 'DUPLICATE_CAFETERIA') {
                    this.toasterService.warning(
                        `${emp.employeeName} skipped â€” already linked to all selected cafeterias`
                    );
                }
            });
        }
    }

    editEmployee(employee: any) {
        this.empId = employee._id;
        this.editingEmployee = employee;
        this.form.patchValue({
            employeeName: employee.employeeName,
            employeeId: employee.employeeId,
            employeePhoneNo: employee.employeePhoneNo,
            employeeEmail: employee.employeeEmail
        });
        this.dialog.open(this.editDialog);
    }

    async updateEmployeeAndClose() {
        try {
            // No cafeteria_list here â€” edit dialog only updates basic info
            // If cafeteria_list is undefined/null, DAO preserves existing cafeteria_list
            const payload: any = {
                ...this.form.value
            };

            const res = await this.apiMainService.updateEmployee(this.empId, payload);

            if (res?._id) {
                this.toasterService.success('Employee updated successfully');
                await this.getEmployeelistByCafeteriaId();
            }
        } catch (error: any) {
            const status = error?.status || error?.statusCode;
            const message = error?.error?.message || error?.message || '';

            // Handling all error cases from as per DAO
            if (status === 404) {
                this.toasterService.error('Employee not found');
            } else if (status === 409) {
                if (message.toLowerCase().includes('cafeteria')) {
                    this.toasterService.error('Employee is already linked to this cafeteria');
                } else if (message.toLowerCase().includes('phone') || message.toLowerCase().includes('organization')) {
                    this.toasterService.error('Phone number already exists in the target organization');
                } else {
                    this.toasterService.error('Conflict: ' + message);
                }
            } else {
                this.toasterService.error('Failed to update employee');
            }
            console.error(error);
            this.toasterService.error('Failed to update employee');
        }
        this.dialog.closeAll();
    }

    deleteEmployee(employee: any) {
        this.deleteEmployeeName = employee.employeeName;
        this.deletedEmployee = employee;
        this.dialog.open(this.deleteDialog);
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
        this.dialog.closeAll();
    }

    deleteAllEmployees() {
        this.dialog.open(this.deleteAllDialog);
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
        this.dialog.closeAll();
    }

    async onFileChange(evt: any) {
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) {
            this.toasterService.error('Please select only one file');
            return;
        }
        await this.processFile(target.files[0]);
    }

    cancelMultipleEmployee() {
        this.showMultipleEmployeeForm = false;
        this.showAddMoreForm = true;
        this.showRemoveForm = false;
        this.fileName = null;
        this.addMultipleEmploeeList = [];
    }
    
    getSelectedCafeteriaNames() {
        return this.cafeObj.map((cafe: any) => cafe.cafeteria_name);
    }
}

import { Component, Input, ViewChild, TemplateRef } from "@angular/core";
import { ApiMainService } from "src/service/apiService/apiMain.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ExcelService } from "src/service/excel.service";
import { ToasterService } from 'src/service/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-employee-list',
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
    selectedCafeteria: any;
    selectedCafeteriaName: any;
    selectedCafeteriaId: any;
    deletedEmployee: any;
    showError: boolean = false;
    fileName: any;
    searchQuery: string = '';

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

    // 👉 Generate initials for avatar
    getInitials(name: string | undefined): string {
        if (!name) return '?';
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    // 👉 Select cafeteria
    async selectCafeteria(cafeteria: any) {
        this.selectedCafeteria = cafeteria;
        this.selectedCafeteriaName = cafeteria.cafeteria_name;
        this.selectedCafeteriaId = cafeteria.cafeteria_id;
        await this.getEmployeelistByCafeteriaId();
    }

    // 👉 Get employees filtered by cafeteria only (no search filter)
    getCafeteriaEmployees(): any[] {
        if (!this.employeeList) return [];
        return this.employeeList.filter(emp => emp.cafeteria_id === this.selectedCafeteriaId);
    }

    // 👉 Get filtered employees by cafeteria and search
    getFilteredEmployees(): any[] {
        if (!this.employeeList) return [];

        return this.employeeList.filter(emp => {
            const matchesCafeteria = emp.cafeteria_id === this.selectedCafeteriaId;
            const matchesSearch = !this.searchQuery ||
                emp.employeeName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                emp.employeeId?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                emp.employeePhoneNo?.toString().includes(this.searchQuery) ||
                emp.employeeEmail?.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesCafeteria && matchesSearch;
        });
    }

    // 👉 Download Excel template using ExcelJS
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

    // 👉 Clear uploaded file
    clearFile() {
        this.fileName = null;
        this.showMultipleEmployeeForm = false;
        this.addMultipleEmploeeList = [];
    }

    // 👉 Handle file drop
    onFileDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.processFile(files[0]);
        }
    }

    // 👉 Process uploaded file
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
                            cafeteria_name: this.selectedCafeteriaName,
                            cafeteria_id: this.selectedCafeteriaId
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

    async getEmployeelistByCafeteriaId() {
        try {
            this.employeeList = await this.apiMainService.getEmployeelistByCafeteriaId(this.selectedCafeteriaId) || [];
        } catch (error) {
            console.error(error);
        }
    }

    addMoreEmployee() {
        this.addMultipleEmploeeList.push({
            ...this.employeeObj,
            cafeteria_name: this.selectedCafeteriaName,
            cafeteria_id: this.selectedCafeteriaId
        });
        this.showRemoveForm = true;
        this.showAddMoreForm = false;
    }

    addMultipleEmployee() {
        if (!this.selectedCafeteria) {
            this.toasterService.warning('Please select a cafeteria first');
            return;
        }
        this.addMultipleEmploeeList = [{
            ...this.employeeObj,
            cafeteria_name: this.selectedCafeteriaName,
            cafeteria_id: this.selectedCafeteriaId
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
            this.addMultipleEmploeeList.forEach(el => {
                el.cafeteria_name = this.selectedCafeteriaName;
                el.cafeteria_id = this.selectedCafeteriaId;
            });

            const res = await this.apiMainService.addEmployeeList([...this.addMultipleEmploeeList]);
            if (res?.length > 0) {
                this.toasterService.success('Employees added successfully');
            }
        } catch (error: any) {
            const errorArr = error?.error?.msg?.skippedEmployees;
            if (Array.isArray(errorArr) && errorArr.length > 0) {
                errorArr.forEach(emp => {
                    this.toasterService.warning(`Duplicate entry: ${emp.employeeName} - ${emp.employeePhoneNo}`);
                });
            }
        }

        this.getEmployeelistByCafeteriaId();
        this.cancelMultipleEmployee();
    }

    editEmployee(employee: any) {
        this.empId = employee._id;
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
            const res = await this.apiMainService.updateEmployee(this.empId, this.form.value);
            if (res?._id) {
                this.toasterService.success('Employee updated successfully');
                this.getEmployeelistByCafeteriaId();
            }
        } catch (error) {
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
}
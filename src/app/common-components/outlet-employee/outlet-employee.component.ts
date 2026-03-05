import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-outlet-employee',
  templateUrl: './outlet-employee.component.html',
  styleUrls: ['./outlet-employee.component.scss']
})
export class OutletEmployeeComponent implements OnInit {
  @Input() orgObj: any;

  // ViewChildren for Dialog Templates if we keep them inline
  @ViewChild('addEditDialog') addEditDialog!: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  employeeList: any[] = [];

  selectedCafeteria: any;
  selectedCafeteriaName: string | null = null;
  selectedCafeteriaId: string | null = null;

  showMultipleEmployeeForm = false;
  bulkForm!: FormGroup;
  disableSubmit = false;

  loading = false;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];

  // Dialog related
  dialogForm!: FormGroup;
  currentDialogRef: any;
  isEditMode = false;
  currentEmployeeId: string | null = null;
  employeeToDelete: any = null;
  searchTerm: string = '';

  constructor(
    private apiMainService: ApiMainService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initBulkForm();
    this.initDialogForm();
    this.initCafeteriaDefaults();
    console.log(this.orgObj);

  }

  // ---------- INIT ----------

  private initBulkForm(): void {
    this.bulkForm = this.fb.group({
      employees: this.fb.array([])
    });
    this.addBulkRow(); // start with 1 row
  }

  get employeesFA(): FormArray {
    return this.bulkForm.get('employees') as FormArray;
  }

  private createBulkEmployeeGroup(): FormGroup {
    return this.fb.group({
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
      employeePhoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      employeeEmail: ['', [Validators.required, Validators.email]]
    });
  }

  private initDialogForm(): void {
    this.dialogForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
      employeePhoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      employeeEmail: ['', [Validators.required, Validators.email]]
    });
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

  // 👉 Select cafeteria (for pill buttons)
  selectCafeteria(cafeteria: any): void {
    this.selectedCafeteria = cafeteria;
    this.selectedCafeteriaName = cafeteria.cafeteria_name;
    this.selectedCafeteriaId = cafeteria.cafeteria_id;
    this.getEmployeeListByCafeId()
    this.resetPagination();
  }

  // 👉 Get initials for avatar
  getInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  // ---------- API ----------

  async getEmployeeListByCafeId(): Promise<void> {
    if (!this.orgObj?._id) return;
    try {
      this.loading = true;
      // Using existing API call for outlet employees
      this.employeeList = await this.apiMainService.getOutletEmployeeListByCafeteriaId(this.selectedCafeteriaId) || [];
      this.resetPagination();
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed to fetch employees', 'Close', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }

  // ---------- ADD / EDIT (SINGLE) USING MATERIAL DIALOG ----------

  openAddDialog(): void {
    if (!this.selectedCafeteria) {
      this.snackBar.open('Please select a cafeteria first', 'Close', { duration: 2500 });
      return;
    }
    this.isEditMode = false;
    this.currentEmployeeId = null;
    this.dialogForm.reset();

    this.currentDialogRef = this.dialog.open(this.addEditDialog, {
      width: '500px',
      autoFocus: true
    });
  }

  openEditDialog(employee: any): void {
    this.isEditMode = true;
    this.currentEmployeeId = employee._id;
    this.dialogForm.patchValue({
      employeeName: employee.employeeName,
      employeeId: employee.employeeId,
      employeePhoneNo: employee.employeePhoneNo,
      employeeEmail: employee.employeeEmail
    });

    this.currentDialogRef = this.dialog.open(this.addEditDialog, {
      width: '500px',
      autoFocus: true
    });
  }

  async saveEmployee(): Promise<void> {
    if (this.dialogForm.invalid) {
      this.dialogForm.markAllAsTouched();
      return;
    }

    const formVal = this.dialogForm.value;
    const payload = {
      ...formVal,
      organization_name: this.orgObj.organization_name,
      organization_id: this.orgObj._id,
      cafeteria_name: this.selectedCafeteriaName,
      cafeteria_id: this.selectedCafeteriaId
    };

    try {
      if (this.isEditMode && this.currentEmployeeId) {
        const res = await this.apiMainService.updateOutletEmployee(this.currentEmployeeId, payload);
        if (res && res._id) {
          this.snackBar.open('Employee updated successfully', 'Close', { duration: 2500 });
        }
      } else {
        // For Add, we use the list API generally or single if available. 
        // Original uses addOutletEmployeeList for bulk.
        // We can use the same bulk API for single add properly wrapped.
        const listPayload = [payload];
        const res = await this.apiMainService.addOutletEmployeeList(listPayload);
        if (res && res.length > 0) {
          this.snackBar.open('Employee added successfully', 'Close', { duration: 2500 });
        }
      }
      this.currentDialogRef.close();
      this.getEmployeeListByCafeId();
    } catch (error: any) {
      console.error(error);
      this.snackBar.open('Failed to save employee', 'Close', { duration: 3000 });
    }
  }

  // ---------- DELETE ----------

  deleteEmployee(employee: any): void {
    this.employeeToDelete = employee;
    this.currentDialogRef = this.dialog.open(this.deleteDialog, {
      width: '400px',
      autoFocus: false
    });
  }

  async confirmDelete(): Promise<void> {
    if (!this.employeeToDelete) return;
    try {
      await this.apiMainService.deleteOutletEmployee(this.employeeToDelete._id);
      this.snackBar.open('Employee deleted', 'Close', { duration: 2500 });
      this.getEmployeeListByCafeId();
      this.currentDialogRef.close();
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed to delete employee', 'Close', { duration: 3000 });
    }
  }

  // ---------- BULK ADD ----------

  showBulkForm(): void {
    if (!this.selectedCafeteria) {
      this.snackBar.open('Please select a cafeteria first', 'Close', { duration: 2500 });
      return;
    }
    this.showMultipleEmployeeForm = true;
  }

  hideBulkForm(): void {
    this.showMultipleEmployeeForm = false;
    this.bulkForm.reset();
    this.employeesFA.clear();
    this.addBulkRow();
    this.disableSubmit = false;
  }

  addBulkRow(): void {
    this.employeesFA.push(this.createBulkEmployeeGroup());
  }

  removeBulkRow(index: number): void {
    if (this.employeesFA.length === 1) return;
    this.employeesFA.removeAt(index);
  }

  async submitMultipleEmployee(): Promise<void> {
    this.disableSubmit = false;

    this.bulkForm.markAllAsTouched();
    if (this.bulkForm.invalid) {
      this.disableSubmit = true;
      return;
    }

    if (!this.selectedCafeteriaId || !this.selectedCafeteriaName) {
      this.snackBar.open('Cafeteria info missing', 'Close', { duration: 2500 });
      return;
    }

    const employeesPayload: any[] = [];

    for (const emp of this.employeesFA.value) {
      employeesPayload.push({
        organization_name: this.orgObj.organization_name,
        organization_id: this.orgObj._id,
        cafeteria_name: this.selectedCafeteriaName,
        cafeteria_id: this.selectedCafeteriaId,
        employeeName: emp.employeeName,
        employeeId: emp.employeeId,
        employeePhoneNo: emp.employeePhoneNo,
        employeeEmail: emp.employeeEmail
      });
    }

    try {
      const res = await this.apiMainService.addOutletEmployeeList(employeesPayload);
      if (res && res.length > 0) {
        this.snackBar.open('Employees added successfully', 'Close', { duration: 2500 });
        this.getEmployeeListByCafeId();
        this.hideBulkForm();
      }
    } catch (error: any) {
      console.error(error);
      const errorArr = error?.error?.msg?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
        errorArr.forEach((emp: any) => {
          alert(`Duplicate Entry For ${emp.employeeName}: ${emp.employeePhoneNo}`);
        });
      } else {
        this.snackBar.open('Failed to add employees', 'Close', { duration: 3000 });
      }
    }
  }

  // ---------- FILTERED EMPLOYEES FOR SELECTED CAFETERIA ----------

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

  async downloadExcelTemplate(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Employees Template');

    // Header row
    worksheet.addRow(['Employee ID', 'Employee Name', 'Phone No', 'Email']);

    // Style header
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
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'outlet_employees_template.xlsx');
  }

  async onExcelUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0];

      // Clear existing rows
      this.employeesFA.clear();

      worksheet.eachRow((row, rowNumber) => {
        // Skip header
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
          // ExcelJS hyperlink cell -> { text, hyperlink }
          email = (emailCell as any).text?.toString().trim() || '';
        } else {
          email = (emailCell || '').toString().trim();
        }

        // Skip completely empty rows
        if (!employeeId && !employeeName && !phone && !email) return;

        const group = this.createBulkEmployeeGroup();
        group.patchValue({
          employeeId,
          employeeName,
          employeePhoneNo: phone,
          employeeEmail: email
        });

        this.employeesFA.push(group);
      });

      if (this.employeesFA.length === 0) {
        // if nothing parsed, keep at least one empty row
        this.addBulkRow();
        this.snackBar.open('No valid rows found in Excel', 'Close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Excel imported successfully', 'Close', {
          duration: 2500
        });
      }
    } catch (err) {
      console.error('Error reading Excel file', err);
      this.snackBar.open('Failed to read Excel file', 'Close', {
        duration: 3000
      });
    } finally {
      (event.target as HTMLInputElement).value = '';
    }
  }
}

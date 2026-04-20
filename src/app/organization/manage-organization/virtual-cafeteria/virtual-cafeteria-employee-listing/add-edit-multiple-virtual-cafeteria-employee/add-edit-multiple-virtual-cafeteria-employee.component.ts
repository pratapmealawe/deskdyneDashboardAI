import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../material.module';

@Component({
  selector: 'app-add-edit-multiple-virtual-cafeteria-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './add-edit-multiple-virtual-cafeteria-employee.component.html',
  styleUrls: ['./add-edit-multiple-virtual-cafeteria-employee.component.scss']
})
export class AddEditMultipleVirtualCafeteriaEmployeeComponent implements OnInit {
  employeeList: any[] = [];
  isLoading = false;

  constructor(
    private api: ApiMainService,
    private toaster: ToasterService,
    private dialogRef: MatDialogRef<AddEditMultipleVirtualCafeteriaEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orgObj: any, selectedCafeteria?: any }
  ) { }

  ngOnInit(): void {
    // Start with 2 empty rows
    this.addMoreEmployee();
    this.addMoreEmployee();
  }

  addMoreEmployee() {
    this.employeeList.push({
      employeeName: '',
      employeeId: '',
      employeePhoneNo: '',
      employeeEmail: '',
      organization_name: this.data.orgObj.organization_name,
      organization_id: this.data.orgObj._id,
      cafeteria_id: this.data.selectedCafeteria?.cafeteria_id || '',
      cafeteria_name: this.data.selectedCafeteria?.cafeteria_name || ''
    });
  }

  removeEmployee(index: number) {
    this.employeeList.splice(index, 1);
    if (this.employeeList.length === 0) {
      this.addMoreEmployee();
    }
  }

  async onSubmit() {
    const validEmployees = this.employeeList.filter(emp =>
      emp.employeeName.trim() || emp.employeeId.trim() || emp.employeePhoneNo.trim() || emp.employeeEmail.trim()
    );

    if (validEmployees.length === 0) {
      this.toaster.warning('Please enter at least one employee record.');
      return;
    }

    const incomplete = validEmployees.some(emp =>
      !emp.employeeName.trim() || !emp.employeeId.trim() || !emp.employeePhoneNo.trim() || !emp.employeeEmail.trim()
    );

    if (incomplete) {
      this.toaster.error('Please complete all fields for the added records.');
      return;
    }

    this.isLoading = true;
    try {
      await this.api.addVcEmployeeList(validEmployees);
      this.toaster.success('Bulk employee addition successful.');
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error('Bulk save error:', error);
      const errorArr = error?.error?.msg?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
        this.toaster.error(`Failed to save ${errorArr.length} records. Possible duplicates found.`);
      } else {
        this.toaster.error('Failed to save employee list.');
      }
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}

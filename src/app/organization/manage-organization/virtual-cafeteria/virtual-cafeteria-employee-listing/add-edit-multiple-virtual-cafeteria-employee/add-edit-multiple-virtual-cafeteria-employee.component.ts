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
  isSubmitting: boolean = false;

  constructor(
    private api: ApiMainService,
    private toaster: ToasterService,
    private dialogRef: MatDialogRef<AddEditMultipleVirtualCafeteriaEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orgObj: any, selectedCafeteria?: any }
  ) { }

  ngOnInit(): void {
    // Start with 2 empty rows
    this.addRow();
    this.addRow();
  }

  addRow() {
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

  removeRow(index: number) {
    if (this.employeeList.length > 1) {
      this.employeeList.splice(index, 1);
    }
  }

  isRowValid(emp: any): boolean {
    return !!(emp.employeeName && emp.employeePhoneNo && emp.employeeEmail);
  }

  async submitBulk() {
    const validEmployees = this.employeeList.filter(emp => this.isRowValid(emp));

    if (validEmployees.length === 0) {
      this.toaster.warning('Please enter details for at least one employee');
      return;
    }

    this.isSubmitting = true;
    try {
      await this.api.addVirtualCafeteriaEmployeeList(validEmployees);
      this.toaster.success(`Successfully registered ${validEmployees.length} employees`);
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error('Error saving employees:', error);
      const errorMsg = error?.error?.msg || 'Failed to save employees';
      this.toaster.error(errorMsg);
    } finally {
      this.isSubmitting = false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}

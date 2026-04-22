import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../material.module';

@Component({
  selector: 'app-add-edit-virtual-cafeteria-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-edit-virtual-cafeteria-employee.component.html',
  styleUrls: ['./add-edit-virtual-cafeteria-employee.component.scss']
})
export class AddEditVirtualCafeteriaEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiMainService,
    private toaster: ToasterService,
    private dialogRef: MatDialogRef<AddEditVirtualCafeteriaEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      orgObj: any,
      selectedCafeteria?: any,
      employee?: any
    }
  ) {
    this.isEditMode = !!data.employee;
    this.employeeForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      employeePhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      employeeEmail: ['', [Validators.required, Validators.email]],
      organization_name: [data.orgObj.organization_name],
      organization_id: [data.orgObj._id],
      cafeteria_id: [data.selectedCafeteria?.cafeteria_id || ''],
      cafeteria_name: [data.selectedCafeteria?.cafeteria_name || '']
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.employee) {
      this.employeeForm.patchValue({
        employeeName: this.data.employee.employeeName,
        employeeId: this.data.employee.employeeId,
        employeePhoneNo: this.data.employee.employeePhoneNo,
        employeeEmail: this.data.employee.employeeEmail
      });
    }
  }

  async onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    try {
      const payload = this.employeeForm.value;
      let response;

      if (this.isEditMode) {
        response = await this.api.updateVirtualCafeteriaEmployee(this.data.employee._id, payload);
        this.toaster.success('Employee updated successfully');
      } else {
        response = await this.api.addVirtualCafeteriaEmployee(payload);
        this.toaster.success('Employee added successfully');
      }

      this.dialogRef.close(true);
    } catch (error: any) {
      console.error('Error saving employee:', error);
      const errorMsg = error?.error?.msg || 'Failed to save employee';
      this.toaster.error(errorMsg);
    } finally {
      this.isSubmitting = false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  orgObj: any;
  employee: any;
  availableCafeterias: any[] = [];
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orgObj = data.orgObj;
    this.employee = data.employee;
    this.availableCafeterias = data.orgObj?.cafeteriaList || [];
    this.isEditMode = !!data.employee;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.isEditMode) {
      this.patchForm();
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      employeeName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      employeeId: ['', [Validators.maxLength(10)]],
      employeePhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      employeeEmail: ['', [Validators.required, Validators.email]],
      cafeteria_list: [[], [Validators.required]]
    });
  }

  patchForm(): void {
    const selectedCafeteriaIds = this.employee.cafeteria_list?.map((c: any) => c.cafeteria_id) || [];
    if (selectedCafeteriaIds.length === 0 && this.employee.cafeteria_id) {
      selectedCafeteriaIds.push(this.employee.cafeteria_id);
    }

    this.form.patchValue({
      employeeName: this.employee.employeeName,
      employeeId: this.employee.employeeId,
      employeePhoneNo: this.employee.employeePhoneNo,
      employeeEmail: this.employee.employeeEmail,
      cafeteria_list: selectedCafeteriaIds
    });
  }

  compareCafeteria(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }

  async saveEmployee(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    try {
      const formValue = this.form.value;

      const selectedCafeteriaObjects = this.availableCafeterias
        .filter(c => formValue.cafeteria_list.includes(c.cafeteria_id))
        .map(c => ({
          cafeteria_id: c.cafeteria_id,
          cafeteria_name: c.cafeteria_name
        }));

      const payload = {
        ...formValue,
        organization_name: this.orgObj.organization_name,
        organization_id: this.orgObj._id,
        cafeteria_list: selectedCafeteriaObjects
      };
      console.log("payload", payload);
      let res;
      if (this.isEditMode) {
        res = await this.apiMainService.updateEmployee(this.employee._id, payload);
        if (res?.skippedEmployees?.length > 0) {
          this.handleSkipError(res.skippedEmployees[0]);
          return;
        }
        this.toasterService.success('Employee updated successfully');
      } else {
        res = await this.apiMainService.addEmployeeList([payload]);
        // Handle complex response from bulk add logic
        if (res?.insertedEmployees?.length > 0) {
          this.toasterService.success('Employee added successfully');
        } else if (res?.skippedEmployees?.length > 0) {
          this.handleSkipError(res.skippedEmployees[0]);
          return;
        }
      }

      this.dialogRef.close(true);
    } catch (error: any) {
      console.error(error);
      const skippedEmployees = error?.error?.skippedEmployees || error?.error?.msg?.skippedEmployees;
      if (Array.isArray(skippedEmployees) && skippedEmployees.length > 0) {
        this.handleSkipError(skippedEmployees[0]);
      } else {
        const message = error?.error?.message || error?.error?.msg || error?.message || 'Failed to save employee';
        this.toasterService.error(message);
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  private handleSkipError(skip: any): void {
    if (skip.skipCode === 'DUPLICATE_CAFETERIA') {
      this.toasterService.warning('Employee already exists in selected cafeterias');
    } else if (skip.skipCode === 'DIFFERENT_ORG') {
      const orgName = skip.existingOrgName || 'another organization';
      this.toasterService.error(`Employee is already registered with ${orgName}`);
    } else {
      this.toasterService.error(skip.message || 'Failed to save employee: ' + (skip.skipCode || 'Unknown error'));
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

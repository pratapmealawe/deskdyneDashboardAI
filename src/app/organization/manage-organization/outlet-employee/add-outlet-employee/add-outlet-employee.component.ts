import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-add-outlet-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, MatDialogModule],
  templateUrl: './add-outlet-employee.component.html',
  styleUrls: ['./add-outlet-employee.component.scss']
})
export class AddOutletEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;
  orgObj: any;
  selectedCafeteria: any;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<AddOutletEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orgObj = data.orgObj;
    this.selectedCafeteria = data.selectedCafeteria;
    this.isEditMode = !!data.employee;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.isEditMode) {
      this.employeeForm.patchValue(this.data.employee);
    }
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', [Validators.required, Validators.minLength(3)]],
      employeeId: ['', Validators.required],
      employeePhoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      employeeEmail: ['', [Validators.required, Validators.email]]
    });
  }

  async saveEmployee(): Promise<void> {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formVal = this.employeeForm.value;
    const payload = {
      ...formVal,
      organization_name: this.orgObj.organization_name,
      organization_id: this.orgObj._id,
      cafeteria_name: this.selectedCafeteria.cafeteria_name,
      cafeteria_id: this.selectedCafeteria.cafeteria_id
    };

    try {
      if (this.isEditMode) {
        const res: any = await this.apiMainService.updateOutletEmployee(this.data.employee._id, payload);
        if (res?.skippedEmployees?.length > 0) {
          this.handleSkipError(res.skippedEmployees[0]);
          return;
        }
        this.toasterService.success('Employee updated successfully');
      } else {
        const res: any = await this.apiMainService.addOutletEmployeeList([payload]);
        // Handle potential success with skips (some APIs return success even if some are skipped)
        if (res?.insertedCount > 0) {
          this.toasterService.success('Employee added successfully');
        } else if (res?.skippedEmployees?.length > 0) {
          this.handleSkipError(res.skippedEmployees[0]);
          return; // Don't close dialog on skip
        } else {
          this.toasterService.success('Employee added successfully');
        }
      }
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error('Save error:', error);
      const skippedEmployees = error?.error?.skippedEmployees || error?.error?.msg?.skippedEmployees;
      
      if (Array.isArray(skippedEmployees) && skippedEmployees.length > 0) {
        this.handleSkipError(skippedEmployees[0]);
      } else {
        this.toasterService.error(error?.error?.msg || error?.error?.message || 'Failed to save employee');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  private handleSkipError(skip: any): void {
    if (skip.skipCode === 'DUPLICATE_CAFETERIA') {
      this.toasterService.warning('This staff is already registered in this outlet');
    } else if (skip.skipCode === 'DIFFERENT_ORG') {
      const orgName = skip.existingOrgName || 'another organization';
      this.toasterService.error(`This staff is already registered with ${orgName}`);
    } else {
      this.toasterService.error(skip.message || 'Staff record already exists or is invalid');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

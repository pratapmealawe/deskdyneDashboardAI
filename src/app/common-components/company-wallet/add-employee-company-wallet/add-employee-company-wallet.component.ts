import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-add-employee-company-wallet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './add-employee-company-wallet.component.html',
  styleUrls: ['./add-employee-company-wallet.component.scss']
})
export class AddEmployeeCompanyWalletComponent implements OnInit {
  employeeForm: FormGroup;
  cafeteriaList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    public dialogRef: MatDialogRef<AddEmployeeCompanyWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      cafeteria: ['', [Validators.required]] // Will hold the full cafeteria object
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.cafeteriaList) {
      this.cafeteriaList = this.data.cafeteriaList;
    }
    
    // If editing, patch values (data.employee would be passed)
    if (this.data.employee) {
      this.employeeForm.patchValue({
        employeeName: this.data.employee.employeeName,
        employeeId: this.data.employee.employeeId,
        employeeEmail: this.data.employee.employeeEmail,
        employeePhoneNo: this.data.employee.employeePhoneNo,
        // Find and select the correct cafeteria based on ID or Name
        cafeteria: this.cafeteriaList.find(c => c.cafeteria_id === this.data.employee.cafeteria_id)
      });
    } else if (this.data.selectedCafeteria) {
       // Pre-select cafeteria if passed
       this.employeeForm.patchValue({
         cafeteria: this.data.selectedCafeteria
       });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formVal = this.employeeForm.value;
      const selectedCafeteria = formVal.cafeteria;

      const payload = {
        organization_id: this.data.orgObj?._id || this.data.organization_id,
        organization_name: this.data.orgObj?.organization_name || this.data.organization_name,
        cafeteriaId: selectedCafeteria.cafeteria_id || selectedCafeteria._id,
        cafeteriaName: selectedCafeteria.cafeteria_name,
        employeePhoneNo: Number(formVal.employeePhoneNo),
        employeeEmail: formVal.employeeEmail,
        employeeId: formVal.employeeId,
        employeeName: formVal.employeeName
      };

      // Assuming a generic API call structure, adjust endpoint as needed
      this.apiMainService.updateCompanyWalletCafeteriaDetails(payload).then((res: any) => {
        if (res) {
          this.dialogRef.close(true); // Return success
        }
      }).catch((err: any) => {
        console.error('Error updating wallet:', err);
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

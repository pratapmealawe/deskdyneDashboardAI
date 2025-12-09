import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

export interface QrEmployeeDialogData {
  mode: 'add' | 'edit';
  orgObj: any;
  cafeteria: any;
  employee?: any;
}

@Component({
  selector: 'app-qr-employee-dialog',
  templateUrl: './qr-employee-dialog.component.html',
  styleUrls: ['./qr-employee-dialog.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule
  ]
})
export class QrEmployeeDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<QrEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QrEmployeeDialogData,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const emp = this.data.employee || {};

    this.form = this.fb.group({
      employeeName: [emp.employeeName || '', Validators.required],
      employeeId: [emp.employeeId || '', Validators.required],
      employeePhoneNo: [
        emp.employeePhoneNo || '',
        [Validators.required, Validators.pattern(/^\d{10}$/)]
      ],
      employeeEmail: [
        emp.employeeEmail || '',
        [Validators.required, Validators.email]
      ]
    });

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const result = {
      organization_name: this.data.orgObj.organization_name,
      organization_id: this.data.orgObj._id,
      cafeteria_name: this.data.cafeteria?.cafeteria_name,
      cafeteria_id: this.data.cafeteria?.cafeteria_id,
      employeeName: v.employeeName,
      employeeId: v.employeeId,
      employeePhoneNo: v.employeePhoneNo,
      employeeEmail: v.employeeEmail,
      qrCode: ""
    };

    this.dialogRef.close(result);
  }
}

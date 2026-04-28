import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-bulk-add-qr-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatDialogModule],
  templateUrl: './bulk-add-qr-employee.component.html',
  styleUrls: ['./bulk-add-qr-employee.component.scss']
})
export class BulkAddQrEmployeeComponent implements OnInit {
  employeeList: any[] = [];
  orgObj: any;
  cafeteria: any;
  isSubmitting: boolean = false;

  constructor(
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<BulkAddQrEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orgObj = data.orgObj;
    this.cafeteria = data.cafeteria;
  }

  ngOnInit(): void {
    if (this.data.employees && this.data.employees.length > 0) {
      this.employeeList = JSON.parse(JSON.stringify(this.data.employees));
    } else {
      this.addRow();
    }
  }

  addRow(): void {
    this.employeeList.push({
      organization_name: this.orgObj.organization_name,
      organization_id: this.orgObj._id,
      cafeteria_name: this.cafeteria.cafeteria_name,
      cafeteria_id: this.cafeteria.cafeteria_id,
      employeeId: '',
      employeeName: '',
      employeePhoneNo: '',
      employeeEmail: '',
      qrCode: ''
    });
  }

  removeRow(index: number): void {
    this.employeeList.splice(index, 1);
    if (this.employeeList.length === 0) {
      this.addRow();
    }
  }

  isRowValid(emp: any): boolean {
    return !!emp.employeeName && !!emp.employeePhoneNo && !!emp.employeeEmail;
  }

  async submitBulk(): Promise<void> {
    const validEmployees = this.employeeList.filter(emp => this.isRowValid(emp));

    if (validEmployees.length === 0) {
      this.toasterService.warning('Please fill at least one complete employee record');
      return;
    }

    this.isSubmitting = true;
    try {
      const res = await this.apiMainService.addQrEmployeeList(validEmployees);
      this.toasterService.success(`${validEmployees.length} QR employees added successfully`);
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error(error);
      const errorArr = error?.error?.msg?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
          errorArr.forEach((emp: any) => {
            this.toasterService.error(`Duplicate Entry For ${emp.employeeName}: ${emp.employeePhoneNo}`);
          });
      } else {
        this.toasterService.error('Failed to add QR employees');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

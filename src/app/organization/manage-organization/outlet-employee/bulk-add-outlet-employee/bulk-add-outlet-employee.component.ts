import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-bulk-add-outlet-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatDialogModule],
  templateUrl: './bulk-add-outlet-employee.component.html',
  styleUrls: ['./bulk-add-outlet-employee.component.scss']
})
export class BulkAddOutletEmployeeComponent implements OnInit {
  employeeList: any[] = [];
  orgObj: any;
  selectedCafeteria: any;
  isSubmitting: boolean = false;

  constructor(
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<BulkAddOutletEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orgObj = data.orgObj;
    this.selectedCafeteria = data.selectedCafeteria;
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
      cafeteria_name: this.selectedCafeteria.cafeteria_name,
      cafeteria_id: this.selectedCafeteria.cafeteria_id,
      employeeId: '',
      employeeName: '',
      employeePhoneNo: '',
      employeeEmail: ''
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
      const res: any = await this.apiMainService.addOutletEmployeeList(validEmployees);
      
      if (res?.insertedCount > 0 || (Array.isArray(res) && res.length > 0)) {
        const count = res.insertedCount || res.length;
        this.toasterService.success(`${count} staff added successfully`);
      } else if (!res?.skippedEmployees?.length) {
        this.toasterService.success('Staff added successfully');
      }

      if (res?.skippedEmployees?.length > 0) {
        this.handleSkippedRecords(res.skippedEmployees);
      }
      
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error('Bulk add error:', error);
      const skippedEmployees = error?.error?.skippedEmployees || error?.error?.msg?.skippedEmployees;
      
      if (Array.isArray(skippedEmployees) && skippedEmployees.length > 0) {
        this.handleSkippedRecords(skippedEmployees);
        this.dialogRef.close(true);
      } else {
        this.toasterService.error(error?.error?.msg || error?.error?.message || 'Failed to add employees');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  private handleSkippedRecords(skippedEmployees: any[]): void {
    const dups = skippedEmployees.filter((e: any) => e.skipCode === 'DUPLICATE_CAFETERIA').length;
    const diffOrg = skippedEmployees.filter((e: any) => e.skipCode === 'DIFFERENT_ORG').length;
    
    let msg = '';
    if (dups > 0) msg += `${dups} staff already in outlet. `;
    if (diffOrg > 0) msg += `${diffOrg} belong to another organization. `;
    
    if (msg === '') {
      this.toasterService.warning(`${skippedEmployees.length} records skipped (duplicates or data issues)`);
    } else {
      this.toasterService.warning(msg.trim());
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

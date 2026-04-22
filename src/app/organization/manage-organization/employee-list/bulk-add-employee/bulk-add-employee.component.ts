import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-bulk-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatDialogModule],
  templateUrl: './bulk-add-employee.component.html',
  styleUrls: ['./bulk-add-employee.component.scss']
})
export class BulkAddEmployeeComponent implements OnInit {
  employeeList: any[] = [];
  orgObj: any;
  availableCafeterias: any[] = [];
  globalCafeteriaIds: string[] = [];
  isSubmitting: boolean = false;

  constructor(
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<BulkAddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orgObj = data.orgObj;
    this.availableCafeterias = data.orgObj?.cafeteriaList || [];
    // Initialize global selection from passed data if any
    if (data.selectedCafeterias) {
      this.globalCafeteriaIds = data.selectedCafeterias.map((c: any) => c.cafeteria_id);
    }
  }

  ngOnInit(): void {
    if (this.data.employees && this.data.employees.length > 0) {
      this.employeeList = JSON.parse(JSON.stringify(this.data.employees));
    } else {
      this.addRow();
    }
  }

  compareCafeteria(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }

  onGlobalCafeteriaChange(): void {
    // Update all existing rows with the new global selection
    const selectedCafeteriaObjects = this.availableCafeterias
      .filter(c => this.globalCafeteriaIds.includes(c.cafeteria_id))
      .map(c => ({
        cafeteria_id: c.cafeteria_id,
        cafeteria_name: c.cafeteria_name
      }));

    this.employeeList.forEach(emp => {
      emp.cafeteria_list = [...selectedCafeteriaObjects];
    });
  }

  addRow(): void {
    const selectedCafeteriaObjects = this.availableCafeterias
      .filter(c => this.globalCafeteriaIds.includes(c.cafeteria_id))
      .map(c => ({
        cafeteria_id: c.cafeteria_id,
        cafeteria_name: c.cafeteria_name
      }));

    this.employeeList.push({
      organization_name: this.orgObj.organization_name,
      organization_id: this.orgObj._id,
      employeeId: '',
      employeeName: '',
      employeePhoneNo: '',
      employeeEmail: '',
      cafeteria_list: selectedCafeteriaObjects
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
      const res = await this.apiMainService.addEmployeeList(validEmployees);
      this.handleAddEmployeeListResult(res);
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error(error);
      const result = error?.error?.result || error?.result;
      if (result) {
        this.handleAddEmployeeListResult(result);
        this.dialogRef.close(true);
      } else {
        this.toasterService.error('Failed to add employees');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  handleAddEmployeeListResult(result: any) {
    if (result?.insertedEmployees?.length > 0) {
      this.toasterService.success(`${result.insertedEmployees.length} new employees added successfully`);
    }

    if (result?.cafeteriaUpdated?.length > 0) {
      this.toasterService.info(`${result.cafeteriaUpdated.length} employees updated with new cafeterias`);
    }

    if (result?.skippedEmployees?.length > 0) {
      const dups = result.skippedEmployees.filter((e: any) => e.skipCode === 'DUPLICATE_CAFETERIA').length;
      if (dups > 0) {
        this.toasterService.warning(`${dups} records skipped: already exist in selected cafeterias`);
      }

      const diffOrgEmployees = result.skippedEmployees.filter((e: any) => e.skipCode === 'DIFFERENT_ORG');
      if (diffOrgEmployees.length > 0) {
        const orgNames = [...new Set(diffOrgEmployees.map((e: any) => e.existingOrgName))].filter(Boolean);
        if (orgNames.length === 1) {
          this.toasterService.error(`${diffOrgEmployees.length} records skipped: already registered with ${orgNames[0]}`);
        } else {
          this.toasterService.error(`${diffOrgEmployees.length} records skipped: already registered with other organizations`);
        }
      }

      const others = result.skippedEmployees.filter((e: any) => 
        e.skipCode !== 'DUPLICATE_CAFETERIA' && e.skipCode !== 'DIFFERENT_ORG'
      );
      if (others.length > 0) {
        this.toasterService.error(`${others.length} records skipped due to other errors`);
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

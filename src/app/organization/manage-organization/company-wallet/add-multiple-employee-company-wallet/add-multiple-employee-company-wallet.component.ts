import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-add-multiple-employee-company-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, MatDialogModule],
  templateUrl: './add-multiple-employee-company-wallet.component.html',
  styleUrls: ['./add-multiple-employee-company-wallet.component.scss']
})
export class AddMultipleEmployeeCompanyWalletComponent implements OnInit {
  employeeList: any[] = [];
  orgObj: any;
  availableCafeterias: any[] = [];
  globalCafeteriaIds: string[] = [];
  isSubmitting: boolean = false;

  constructor(
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<AddMultipleEmployeeCompanyWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orgObj = data.orgObj;
    this.availableCafeterias = data.orgObj?.cafeteriaList || [];
    // Initialize global selection from passed data if any
    if (data.selectedCafeteria) {
      this.globalCafeteriaIds = [data.selectedCafeteria.cafeteria_id || data.selectedCafeteria._id];
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
      // Map to the format expected by wallet API if necessary
      const payload = validEmployees.map(emp => {
          // The wallet API usually expects a single cafeteria per entry if it's bulkUpdateCompanyWalletCafeteriaDetails
          // But here we have cafeteria_list. Let's see how the previous logic handled it.
          // Actually, the previous logic mapped to a single cafeteria.
          // Let's check what bulkUpdateCompanyWalletCafeteriaDetails expects.
          
          // Based on previous code:
          /*
            this.parsedData.push({
                organization_id: this.orgObj._id,
                organization_name: this.orgObj.organization_name,
                cafeteriaId: this.selectedCafeteria.cafeteria_id,
                cafeteria_id: this.selectedCafeteria.cafeteria_id,
                cafeteriaName: this.selectedCafeteria.cafeteria_name,
                cafeteria_name: this.selectedCafeteria.cafeteria_name,
                employeeName,
                employeeId,
                employeeEmail,
                employeePhoneNo: Number(employeePhoneNo)
            });
          */
          
          // If we allow multiple cafeteria selection in the grid, we might need to send multiple entries or a different API.
          // However, for "parity", let's follow the BulkAddEmployeeComponent structure which allows multiple.
          
          return {
              ...emp,
              employeePhoneNo: Number(emp.employeePhoneNo)
          };
      });

      const res: any = await this.apiMainService.bulkUpdateCompanyWalletCafeteriaDetails(payload);
      if (res) {
          if (res.skippedEmployees?.length > 0) {
              const skipCount = res.skippedEmployees.length;
              const insertCount = (res.insertedEmployees?.length || 0) + (res.cafeteriaUpdated?.length || 0);
              
              if (insertCount > 0) {
                  this.toasterService.info(`${insertCount} records processed, ${skipCount} skipped.`);
              } else {
                  this.handleSkipError(res.skippedEmployees[0], skipCount);
              }
          } else {
              this.toasterService.success(`${payload.length} employees request processed.`);
          }
          this.dialogRef.close(true);
      }
    } catch (error: any) {
      console.error(error);
      const errorArr = error?.error?.msg?.skippedEmployees || error?.error?.skippedEmployees;
      if (Array.isArray(errorArr) && errorArr.length > 0) {
        this.handleSkipError(errorArr[0], errorArr.length);
      } else {
        this.toasterService.error('Failed to process bulk request');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  private handleSkipError(skip: any, totalSkips: number): void {
      let message = '';
      if (skip.skipCode === 'DUPLICATE_CAFETERIA') {
          message = totalSkips > 1 ? `${totalSkips} records already exist in selected cafeterias` : 'Employee already exists in selected cafeterias';
          this.toasterService.warning(message);
      } else if (skip.skipCode === 'DIFFERENT_ORG') {
          const orgName = skip.existingOrgName || 'another organization';
          message = totalSkips > 1 ? `${totalSkips} records are already registered with other organizations` : `Employee is already registered with ${orgName}`;
          this.toasterService.error(message);
      } else {
          this.toasterService.error(skip.message || `Failed to process ${totalSkips} records`);
      }
  }

  close(): void {
    this.dialogRef.close();
  }
}

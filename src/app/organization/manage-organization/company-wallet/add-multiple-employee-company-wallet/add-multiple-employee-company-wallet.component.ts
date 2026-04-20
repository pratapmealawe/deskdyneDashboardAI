import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ApiMainService } from '@service/apiService/apiMain.service';

@Component({
    selector: 'app-add-multiple-employee-company-wallet',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule
    ],
    templateUrl: './add-multiple-employee-company-wallet.component.html',
    styleUrls: ['./add-multiple-employee-company-wallet.component.scss']
})
export class AddMultipleEmployeeCompanyWalletComponent {
    orgObj: any;
    selectedCafeteria: any;
    isUploading = false;
    fileName: string = '';
    parsedData: any[] = [];
    isValidFile = false;
    errorMessage: string = '';

    constructor(
        public dialogRef: MatDialogRef<AddMultipleEmployeeCompanyWalletComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { orgObj: any, selectedCafeteria: any },
        private snackBar: MatSnackBar,
        private apiMainService: ApiMainService
    ) {
        this.orgObj = this.data.orgObj;
        this.selectedCafeteria = this.data.selectedCafeteria;
    }

    downloadTemplate() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employee Template');

        // Headers
        worksheet.columns = [
            { header: 'Employee Name', key: 'employeeName', width: 25 },
            { header: 'Employee ID', key: 'employeeId', width: 15 },
            { header: 'Email', key: 'employeeEmail', width: 30 },
            { header: 'Phone Number', key: 'employeePhoneNo', width: 20 },
        ];

        // Example Row
        worksheet.addRow({
            employeeName: 'John Doe',
            employeeId: 'EMP001',
            employeeEmail: 'john.doe@example.com',
            employeePhoneNo: '9876543210'
        });

        // Styling
        worksheet.getRow(1).font = { bold: true };

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'Employee_Upload_Template.xlsx');
        });
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (!file) {
            this.resetFile();
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.setError('File size exceeds 5MB limit.');
            return;
        }

        this.fileName = file.name;
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (fileExtension === 'csv') {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const text = e.target.result;
                this.processCSV(text);
            };
            reader.onerror = () => this.setError('Error reading CSV file.');
            reader.readAsText(file);
        } else {
            const reader = new FileReader();
            reader.onload = async (e: any) => {
                try {
                    const buffer = e.target.result;
                    const workbook = new ExcelJS.Workbook();
                    await workbook.xlsx.load(buffer);
                    const worksheet = workbook.getWorksheet(1);
                    if (!worksheet) {
                        this.setError('Invalid Excel file: No worksheet found.');
                        return;
                    }
                    this.processWorksheet(worksheet);
                } catch (err) {
                    console.error('File parsing error:', err);
                    this.setError('Failed to parse Excel file.');
                }
            };
            reader.onerror = () => this.setError('Error reading file.');
            reader.readAsArrayBuffer(file);
        }
    }

    processCSV(text: string) {
        try {
            const rows = text.split(/\r\n|\n/);
            const dataRows = rows.filter(row => row.trim().length > 0);

            // Assuming first row is header
            if (dataRows.length < 2) {
                this.setError('No data found in CSV file.');
                return;
            }

            this.parsedData = [];
            const errors: string[] = [];
            const seenIds = new Set();
            const seenEmails = new Set();

            // Start from index 1 to skip header
            for (let i = 1; i < dataRows.length; i++) {
                const row = dataRows[i];
                // Simple CSV split, handling simple comma separation. 
                // For robust detailed CSV (quoted fields etc), a lib is better, but simple split matches standard template.
                const cols = row.split(',').map(c => c.trim());

                // Map columns based on template order: Name, ID, Email, Phone
                // If template columns change, this needs update.
                // Creating a virtual row object to reuse validation logic would offer best reuse, 
                // but for now I'll just map manually to avoid complex refactor.

                const employeeName = cols[0];
                const employeeId = cols[1];
                const employeeEmail = cols[2]?.toLowerCase();
                const rawPhone = cols[3];
                const employeePhoneNo = rawPhone ? rawPhone.replace(/[^0-9]/g, '') : '';

                this.validateAndAddRow(i + 1, employeeName, employeeId, employeeEmail, employeePhoneNo, errors, seenIds, seenEmails);
            }
            this.finalizeProcessing(errors);

        } catch (err) {
            console.error('CSV Parsing Error', err);
            this.setError('Failed to parse CSV file.');
        }
    }

    processWorksheet(worksheet: ExcelJS.Worksheet) {
        this.parsedData = [];
        const errors: string[] = [];
        const seenIds = new Set();
        const seenEmails = new Set();

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // Skip header

            const employeeName = row.getCell(1).value?.toString()?.trim();
            const employeeId = row.getCell(2).value?.toString()?.trim();
            const employeeEmail = row.getCell(3).value?.toString()?.trim()?.toLowerCase();
            const rawPhone = row.getCell(4).value;
            const employeePhoneNo = rawPhone ? rawPhone.toString().replace(/[^0-9]/g, '') : '';

            this.validateAndAddRow(rowNumber, employeeName, employeeId, employeeEmail, employeePhoneNo, errors, seenIds, seenEmails);
        });

        this.finalizeProcessing(errors);
    }

    validateAndAddRow(rowNumber: number, employeeName: any, employeeId: any, employeeEmail: any, employeePhoneNo: any, errors: string[], seenIds: Set<any>, seenEmails: Set<any>) {
        if (!employeeName) errors.push(`Row ${rowNumber}: Missing Employee Name.`);
        if (!employeeId) errors.push(`Row ${rowNumber}: Missing Employee ID.`);

        if (!employeeEmail) {
            errors.push(`Row ${rowNumber}: Missing Email.`);
        } else if (!this.isValidEmail(employeeEmail)) {
            errors.push(`Row ${rowNumber}: Invalid Email '${employeeEmail}'.`);
        }

        if (!employeePhoneNo || employeePhoneNo.length !== 10) {
            errors.push(`Row ${rowNumber}: Invalid Phone '${employeePhoneNo}'. Must be 10 digits.`);
        }

        if (employeeId && seenIds.has(employeeId)) {
            errors.push(`Row ${rowNumber}: Duplicate Employee ID '${employeeId}' in file.`);
        }
        if (employeeId) seenIds.add(employeeId);

        if (employeeEmail && seenEmails.has(employeeEmail)) {
            errors.push(`Row ${rowNumber}: Duplicate Email '${employeeEmail}' in file.`);
        }
        if (employeeEmail) seenEmails.add(employeeEmail);

        if (errors.length === 0) {
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
        }
    }

    finalizeProcessing(errors: string[]) {
        if (errors.length > 0) {
            const showErrors = errors.slice(0, 5).join('\n');
            const moreErrors = errors.length > 5 ? `\n...and ${errors.length - 5} more errors.` : '';
            this.setError(`Validation Failed:\n${showErrors}${moreErrors}`);
        } else if (this.parsedData.length === 0) {
            this.setError('No valid data found in file.');
        } else {
            this.isValidFile = true;
            this.errorMessage = '';
        }
    }

    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    resetFile() {
        this.fileName = '';
        this.parsedData = [];
        this.isValidFile = false;
        this.errorMessage = '';
    }

    setError(msg: string) {
        this.errorMessage = msg;
        this.isValidFile = false;
        this.parsedData = [];
    }

    async upload() {
        if (!this.isValidFile || this.parsedData.length === 0) return;

        this.isUploading = true;
        try {
            // Use bulkUpdateCompanyWalletCafeteriaDetails as requested
            const res: any = await this.apiMainService.bulkUpdateCompanyWalletCafeteriaDetails(this.parsedData);

            if (res) {
                this.snackBar.open(`${this.parsedData.length} employees request processed.`, 'OK', { duration: 3000 });
                this.dialogRef.close(true);
            } else {
                this.snackBar.open('Upload completed with potential warnings.', 'OK', { duration: 3000 });
                this.dialogRef.close(true);
            }

        } catch (error: any) {
            console.error('Bulk upload error', error);
            const errorArr = error?.error?.msg?.skippedEmployees;

            if (Array.isArray(errorArr) && errorArr.length > 0) {
                const failedCount = errorArr.length;
                this.setError(`Upload failed for ${failedCount} employees (Duplicates or Errors).\nCheck console or try again with corrected data.`);
                // Optionally show specifics
            } else {
                this.snackBar.open('An error occurred during upload', 'OK', { duration: 3000 });
            }
        } finally {
            this.isUploading = false;
        }
    }

    close() {
        this.dialogRef.close();
    }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ApiMainService } from '@service/apiService/apiMain.service';

@Component({
    selector: 'app-bulk-wallet-upload-dialog',
    templateUrl: './bulk-wallet-upload-dialog.component.html',
    styleUrls: ['./bulk-wallet-upload-dialog.component.scss']
})
export class BulkWalletUploadDialogComponent {
    orgId: string = '';
    customerList: any[] = [];
    isUploading = false;
    fileName: string = '';
    parsedData: any[] = [];
    isValidFile = false;
    errorMessage: string = '';

    constructor(
        public dialogRef: MatDialogRef<BulkWalletUploadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { orgId: string, customerList: any[] },
        private snackBar: MatSnackBar,
        private apiMainService: ApiMainService
    ) {
        this.orgId = this.data.orgId;
        this.customerList = this.data.customerList;

    }

    downloadTemplate() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Bulk Wallet Template');

        // Headers
        worksheet.columns = [
            { header: 'Mobile Number', key: 'phoneNo', width: 20 },
            { header: 'Wallet Type', key: 'walletType', width: 20 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Remark', key: 'remark', width: 30 }
        ];

        // Example Row
        worksheet.addRow({ phoneNo: '9876543210', walletType: 'billing', amount: 100, remark: 'Bonus' });
        worksheet.addRow({ phoneNo: '9876543211', walletType: 'complimentary', amount: 50, remark: 'Gift' });

        // Add validation instructions as comment or just styling
        worksheet.getRow(1).font = { bold: true };

        // Data Validation for Wallet Type (Note: ExcelJS supports simple data validation)
        // This is optional but helpful
        (worksheet.getColumn(2) as any).dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['"billing,complimentary,others"']
        };

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'Bulk_Wallet_Upload_Template.xlsx');
        });
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (!file) {
            this.resetFile();
            return;
        }

        // Validate file size (e.g., max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.setError('File size exceeds 5MB limit.');
            return;
        }

        this.fileName = file.name;
        const reader = new FileReader();

        reader.onload = async (e: any) => {
            try {
                const buffer = e.target.result;
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(buffer);
                const worksheet = workbook.getWorksheet(1); // Get first sheet

                if (!worksheet) {
                    this.setError('Invalid Excel file: No worksheet found.');
                    return;
                }

                this.parsedData = [];
                const errors: string[] = [];

                // Iterate rows, skip header
                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return; // Skip header

                    const phoneNo = row.getCell(1).value?.toString()?.trim();
                    let walletType = row.getCell(2).value?.toString()?.toLowerCase()?.trim();
                    const amount = Number(row.getCell(3).value);
                    const remark = row.getCell(4).value?.toString()?.trim() || '';

                    // Validate row data
                    if (!phoneNo) {
                        errors.push(`Row ${rowNumber}: Missing Phone Number.`);
                    } else {
                        const userExists = this.customerList.find(u => u.phoneNo === phoneNo);
                        if (!userExists) {
                            errors.push(`Row ${rowNumber}: User with phone '${phoneNo}' not found.`);
                        }
                    }

                    if (!walletType || !['billing', 'complimentary', 'others'].includes(walletType)) {
                        errors.push(`Row ${rowNumber}: Invalid Wallet Type '${walletType}'. Must be billing, complimentary, or others.`);
                    }

                    if (isNaN(amount) || amount <= 0) {
                        errors.push(`Row ${rowNumber}: Invalid Amount '${amount}'. Must be greater than 0.`);
                    }

                    if (errors.length === 0) {
                        this.parsedData.push({ phoneNo, walletType, amount, remark });
                    }
                });

                if (errors.length > 0) {
                    // Show top 5 errors to avoid flooding
                    const showErrors = errors.slice(0, 5).join('\n');
                    const moreErrors = errors.length > 5 ? `\n...and ${errors.length - 5} more errors.` : '';
                    this.setError(`Validation Failed:\n${showErrors}${moreErrors}`);
                } else if (this.parsedData.length === 0) {
                    this.setError('No valid data found in file.');
                } else {
                    this.isValidFile = true;
                    this.errorMessage = '';
                }

            } catch (err) {
                console.error('File parsing error:', err);
                this.setError('Failed to parse Excel file. Please ensure it is a valid .xlsx file.');
            }
        };

        reader.onerror = () => {
            this.setError('Error reading file.');
        };

        reader.readAsArrayBuffer(file);
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
            const res: any = await this.apiMainService.addBulkWalletBalance(this.parsedData);

            if (res && res.success) {
                this.snackBar.open(`${res.message || 'Bulk wallet update successful'}`, 'OK', { duration: 3000 });
                this.dialogRef.close(true);
            } else {
                this.snackBar.open(res?.message || 'Bulk upload failed', 'OK', { duration: 3000 });
            }
        } catch (error) {
            console.error('Bulk upload error', error);
            this.snackBar.open('An error occurred during upload', 'OK', { duration: 3000 });
        } finally {
            this.isUploading = false;
        }
    }

    close() {
        this.dialogRef.close();
    }
}

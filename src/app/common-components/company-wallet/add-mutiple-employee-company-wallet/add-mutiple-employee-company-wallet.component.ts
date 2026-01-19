import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-mutiple-employee-company-wallet',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './add-mutiple-employee-company-wallet.component.html',
  styleUrls: ['./add-mutiple-employee-company-wallet.component.scss']
})
export class AddMutipleEmployeeCompanyWalletComponent {
  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<AddMutipleEmployeeCompanyWalletComponent>) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  removeFile(event: Event) {
    event.stopPropagation(); // Prevent re-triggering file input click
    this.selectedFile = null;
    // Reset input value if needed via ViewChild, but simpler to just clear state here for basic usage
  }

  downloadSample() {
    // Logic to download sample file
    // const link = document.createElement('a');
    // link.href = 'assets/sample_employee_upload.xlsx';
    // link.download = 'sample_employee_upload.xlsx';
    // link.click();
    console.log('Download sample clicked');
  }

  onUpload() {
    if (this.selectedFile) {
      this.dialogRef.close(this.selectedFile);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

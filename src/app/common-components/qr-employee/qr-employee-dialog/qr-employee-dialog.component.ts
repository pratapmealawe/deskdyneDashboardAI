import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
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
    QRCodeModule,
    CommonModule
  ]
})
export class QrEmployeeDialogComponent implements OnInit {
  form!: FormGroup;
  qrData = '';
  qrPngBase64 = '';

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

    this.updateQrData();

    this.form.valueChanges.subscribe(() => {
      this.updateQrData();
    });
  }

  private updateQrData(): void {
    const v = this.form.value;

    const payload = {
      organization_id: this.data.orgObj._id,
      organization_name: this.data.orgObj.organization_name,
      cafeteria_id: this.data.cafeteria?.cafeteria_id,
      cafeteria_name: this.data.cafeteria?.cafeteria_name,
      employeeId: v.employeeId,
      employeeName: v.employeeName,
      employeePhoneNo: v.employeePhoneNo,
      employeeEmail: v.employeeEmail
    };

    this.qrData = JSON.stringify(payload);
  }

  onCodeURL(url: string | SafeUrl): void {
    // url is SafeUrl with "changingThisBreaksApplicationSecurity"
    const raw: any = url as any;

    // Get the actual blob URL string
    const blobUrl =
      raw?.changingThisBreaksApplicationSecurity ||
      (raw as string);

    if (!blobUrl) {
      console.warn('No blob URL from qrCodeURL');
      return;
    }

    // Convert blob URL -> DataURL (base64)
    fetch(blobUrl)
      .then(res => res.blob())
      .then(
        blob =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob); // "data:image/png;base64,..."
          })
      )
      .then(dataUrl => {
        // const parts = dataUrl.split(',');
        // this.qrPngBase64 = parts[1] || ''; // store only base64
        this.qrPngBase64 = dataUrl; // store full data URL
        console.log('QR PNG base64:', dataUrl);

      })
      .catch(err => {
        console.error('Error converting QR blob to base64', err);
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
      // send QR string to backend as per schema
      qrCode: this.qrPngBase64
    };

    this.dialogRef.close(result);
  }
}

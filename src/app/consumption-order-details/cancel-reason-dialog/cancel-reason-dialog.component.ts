import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface CancelReasonDialogData {
  title: string;
  placeholder?: string;
}
export interface CancelReasonDialogResult {
  reason: string;
}

@Component({
  selector: 'app-cancel-reason-dialog',
  templateUrl: './cancel-reason-dialog.component.html',
  styles: [`
    .w-100 { width: 100%; }
    .muted { color: #6c757d; font-size: 12px; }
  `]
})
export class CancelReasonDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<CancelReasonDialogComponent, CancelReasonDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: CancelReasonDialogData
  ) {
    this.form = this.fb.group({
      reason: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.ref.close({ reason: this.form.value.reason });
  }

  close() {
    this.ref.close();
  }
}

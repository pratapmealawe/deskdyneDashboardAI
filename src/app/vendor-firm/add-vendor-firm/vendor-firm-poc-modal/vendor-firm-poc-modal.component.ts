import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-vendor-firm-poc-modal',
  templateUrl: './vendor-firm-poc-modal.component.html',
  styleUrls: ['./vendor-firm-poc-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VendorFirmPocModalComponent implements OnInit {
  pocForm: FormGroup;
  isEdit = false;
  pocBtn = 'Save POC';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VendorFirmPocModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pocForm = this.fb.group({
      poc_id: [''],
      poc_name: ['', [Validators.required]],
      poc_phoneNo: ['', [Validators.required]],
      poc_email: ['', [Validators.required]],
      poc_location: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.poc) {
      this.isEdit = true;
      this.pocBtn = 'Update POC';
      this.pocForm.patchValue(this.data.poc);
    }
  }

  submitPocDetails() {
    if (this.pocForm.valid) {
      this.dialogRef.close(this.pocForm.value);
    }
  }

  hasSubError(controlName: string, error: string) {
    const c = this.pocForm.get(controlName);
    return c?.hasError(error) && (c.touched || c.dirty);
  }
}

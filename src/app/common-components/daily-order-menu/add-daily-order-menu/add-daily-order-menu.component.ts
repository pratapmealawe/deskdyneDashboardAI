import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-add-daily-order-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './add-daily-order-menu.component.html',
  styleUrls: ['./add-daily-order-menu.component.scss']
})
export class AddDailyOrderMenuComponent implements OnInit {
  deliveryForm: FormGroup = new FormGroup({
    selectedMealType: new FormControl('Breakfast', Validators.required),
    deliveryMOQ: new FormControl('', [Validators.required, Validators.min(1)]),
    deliveryCharge: new FormControl('', [Validators.required, Validators.min(0)]),
    deliveryTimeFrom: new FormControl('', Validators.required),
    deliveryTimeTo: new FormControl('', Validators.required),
    cutOffTime: new FormControl('', Validators.required),
    isSameDay: new FormControl(false)
  });

  constructor(
    private dialogRef: MatDialogRef<AddDailyOrderMenuComponent>,
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.mealType) {
      this.deliveryForm.patchValue(this.data.mealType);
    }
  }

  saveChanges() {
    if (this.deliveryForm.valid) {
      const payload = {
        organization_name: this.data.organization_name,
        organizationId: this.data.organizationId,
        cafeteriaId: this.data.cafeteriaId,
        cafeteriaName: this.data.cafeteriaName,
        mealType: this.deliveryForm.getRawValue(),

      }
      if (this.data.mealType) {
        this.apiMainService.updateMealType(payload).then((res: any) => {
          this.dialogRef.close(res);
          this.toaster.success('Meal type updated successfully');
        }).catch((err: any) => {
          console.log(err);
          this.toaster.error('Failed to update meal type');
        });
      } else {
        this.apiMainService.dailyOrderMenuAdd(payload).then((res: any) => {
          this.dialogRef.close(res);
          this.toaster.success('Meal type added successfully');
        }).catch((err: any) => {
          console.log(err);
          this.toaster.error('Failed to add meal type');
        });
      }
    } else {
      this.deliveryForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}

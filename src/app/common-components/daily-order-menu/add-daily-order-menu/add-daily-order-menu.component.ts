import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ToasterService } from 'src/service/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';

export const timeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const group = control as FormGroup;
  const fromCtrl = group.get('deliveryTimeFrom');
  const toCtrl = group.get('deliveryTimeTo');
  const cutOffCtrl = group.get('cutOffTime');

  const from = fromCtrl?.value;
  const to = toCtrl?.value;
  const cutOff = cutOffCtrl?.value;

  if (from && to && from >= to) {
    toCtrl?.setErrors({ ...toCtrl.errors, invalidRange: true });
  } else {
    if (toCtrl?.hasError('invalidRange')) {
      const { invalidRange, ...errors } = toCtrl.errors as ValidationErrors;
      toCtrl.setErrors(Object.keys(errors).length ? errors : null);
    }
  }

  if (from && cutOff && cutOff >= from) {
    cutOffCtrl?.setErrors({ ...cutOffCtrl.errors, invalidCutOff: true });
  } else {
    if (cutOffCtrl?.hasError('invalidCutOff')) {
      const { invalidCutOff, ...errors } = cutOffCtrl.errors as ValidationErrors;
      cutOffCtrl.setErrors(Object.keys(errors).length ? errors : null);
    }
  }
  return null;
};

@Component({
  selector: 'app-add-daily-order-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, DirectivesModule],
  templateUrl: './add-daily-order-menu.component.html',
  styleUrls: ['./add-daily-order-menu.component.scss']
})
export class AddDailyOrderMenuComponent implements OnInit {
  deliveryForm: FormGroup = new FormGroup({
    selectedMealType: new FormControl('Breakfast', Validators.required),
    deliveryMOQ: new FormControl('', [Validators.required, Validators.min(1)]),
    deliveryCharge: new FormControl('', [Validators.min(0)]),
    deliveryTimeFrom: new FormControl('12:00', Validators.required),
    deliveryTimeTo: new FormControl('12:00', Validators.required),
    cutOffTime: new FormControl('12:00', Validators.required),
    isSameDay: new FormControl(false)
  }, { validators: timeValidator });

  constructor(
    private dialogRef: MatDialogRef<AddDailyOrderMenuComponent>,
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data, 'data');
    if (this.data.mealType) {
      this.deliveryForm.patchValue(this.data.mealType);
    }
  }

  saveChanges() {
    if (this.deliveryForm.valid) {
      const rawValue = this.deliveryForm.getRawValue();
      const payload = {
        organization_nacomme: this.data.organization_name,
        organizationId: this.data.organizationId,
        cafeteriaId: this.data.cafeteriaId,
        cafeteriaName: this.data.cafeteriaName,
        mealType: rawValue,
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

  formatTime(time: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${minutes} ${ampm}`;
  }
}

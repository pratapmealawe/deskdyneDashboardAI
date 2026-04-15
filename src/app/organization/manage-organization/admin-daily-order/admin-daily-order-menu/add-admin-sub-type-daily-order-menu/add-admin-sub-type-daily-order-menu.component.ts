import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ToasterService } from 'src/service/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-add-admin-sub-type-daily-order-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-admin-sub-type-daily-order-menu.component.html',
  styleUrls: ['./add-admin-sub-type-daily-order-menu.component.scss']
})
export class AddAdminSubTypeDailyOrderMenuComponent implements OnInit {
  menuForm: FormGroup = new FormGroup({
    itemName: new FormControl('', Validators.required),
    mealPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
    payAmtToKitchen: new FormControl(null, [Validators.required, Validators.min(0)]),
    isSameDay: new FormControl(false),
    days: new FormArray([])
  }, { validators: this.priceValidator });
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private dialogRef: MatDialogRef<AddAdminSubTypeDailyOrderMenuComponent>,
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.mealConfigData) {
      const data = this.data.mealConfigData;
      // Patch top-level fields
      this.menuForm.patchValue({
        itemName: data.itemName,
        mealPrice: data.mealPrice,
        payAmtToKitchen: data.payAmtToKitchen,
        isSameDay: data.isSameDay
      });

      // Populate days FormArray from weeklyMenu
      if (data.weeklyMenu && Array.isArray(data.weeklyMenu)) {
        data.weeklyMenu.forEach((item: any) => {
          const isNotApplicable = item.notApplicable || false;
          const dayGroup = new FormGroup({
            itemDay: new FormControl(item.itemDay, Validators.required),
            itemName: new FormControl({ value: item.itemName, disabled: !isNotApplicable }, isNotApplicable ? Validators.required : []),
            itemDescription: new FormControl({ value: item.itemDescription, disabled: !isNotApplicable }, isNotApplicable ? Validators.required : []),
            notApplicable: new FormControl(isNotApplicable)
          });
          this.setupDayValidatorSubscription(dayGroup);
          this.days.push(dayGroup);
        });
      } else {
        // Fallback if weeklyMenu is missing in edit mode (unlikely but safe)
        this.daysOfWeek.forEach(day => {
          this.days.push(this.createDay(day));
        });
      }
    } else {
      // Add Mode: Initialize with empty days
      this.daysOfWeek.forEach(day => {
        this.days.push(this.createDay(day));
      });
    }
  }

  get days(): FormArray {
    return this.menuForm.get('days') as FormArray;
  }

  createDay(dayName: string, notApplicable: boolean = false): FormGroup {
    const dayGroup = new FormGroup({
      itemDay: new FormControl(dayName, Validators.required),
      itemName: new FormControl({ value: '', disabled: !notApplicable }, notApplicable ? Validators.required : []),
      itemDescription: new FormControl({ value: '', disabled: !notApplicable }, notApplicable ? Validators.required : []),
      notApplicable: new FormControl(notApplicable)
    });

    this.setupDayValidatorSubscription(dayGroup);
    return dayGroup;
  }

  private setupDayValidatorSubscription(dayGroup: FormGroup): void {
    dayGroup.get('notApplicable')?.valueChanges.subscribe((isNotApplicable: boolean) => {
      const itemNameCtrl = dayGroup.get('itemName');
      const itemDescCtrl = dayGroup.get('itemDescription');

      if (isNotApplicable) {
        // day IS applicable
        itemNameCtrl?.enable();
        itemDescCtrl?.enable();
        itemNameCtrl?.setValidators(Validators.required);
        itemDescCtrl?.setValidators(Validators.required);
      } else {
        // day NOT applicable
        itemNameCtrl?.disable();
        itemDescCtrl?.disable();
        itemNameCtrl?.clearValidators();
        itemDescCtrl?.clearValidators();
      }

      itemNameCtrl?.updateValueAndValidity();
      itemDescCtrl?.updateValueAndValidity();
    });
  }


  priceValidator(control: any): { [key: string]: boolean } | null {
    const mealPrice = control.get('mealPrice')?.value;
    const payAmtToKitchen = control.get('payAmtToKitchen')?.value;
    if (mealPrice !== null && payAmtToKitchen !== null && mealPrice <= payAmtToKitchen) {
      return { 'priceInvalid': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      const { itemName, mealPrice, payAmtToKitchen, isSameDay, days } = this.menuForm.getRawValue();
      let payload = {
        cafeteriaId: this.data.cafeteriaId,
        selectedMealType: this.data.selectedMealType,
        mealConfigId: null,
        mealConfigData: {
          itemName,
          mealPrice,
          payAmtToKitchen,
          isSameDay,
          weeklyMenu: days
        }
      };
      if (this.data.mealConfigId) {
        payload.mealConfigId = this.data.mealConfigId;
        this.apiMainService.updateMealConfig(payload).then((res: any) => {
          this.toaster.success('Weekly Menu Updated Successfully');
          this.dialogRef.close();
        }).catch((error: any) => {
          this.toaster.error(error.error.message);
        });
      } else {
        this.apiMainService.addMealConfig(payload).then((res: any) => {
          this.toaster.success('Weekly Menu Added Successfully');
          this.dialogRef.close();
        }).catch((error: any) => {
          this.toaster.error(error.error.message);
        });
      }
    } else {
      this.menuForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}

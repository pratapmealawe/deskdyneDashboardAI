import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-add-sub-type-daily-order-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-sub-type-daily-order-menu.component.html',
  styleUrls: ['./add-sub-type-daily-order-menu.component.scss']
})
export class AddSubTypeDailyOrderMenuComponent implements OnInit {
  menuForm: FormGroup = new FormGroup({
    itemName: new FormControl('', Validators.required),
    mealPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
    payAmtToKitchen: new FormControl(null, [Validators.required, Validators.min(0)]),
    days: new FormArray([])
  });
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private dialogRef: MatDialogRef<AddSubTypeDailyOrderMenuComponent>,
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
        payAmtToKitchen: data.payAmtToKitchen
      });

      // Populate days FormArray from weeklyMenu
      if (data.weeklyMenu && Array.isArray(data.weeklyMenu)) {
        data.weeklyMenu.forEach((item: any) => {
          const dayGroup = new FormGroup({
            itemDay: new FormControl(item.itemDay, Validators.required),
            itemName: new FormControl(item.itemName, Validators.required),
            itemDescription: new FormControl(item.itemDescription, Validators.required),
            notApplicable: new FormControl(item.notApplicable || false)
          });
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

  createDay(dayName: string): FormGroup {
    return new FormGroup({
      itemDay: new FormControl(dayName, Validators.required),
      itemName: new FormControl('', Validators.required),
      itemDescription: new FormControl('', Validators.required),
      notApplicable: new FormControl(false)
    });
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      const formValue = this.menuForm.getRawValue();
      let payload = {
        cafeteriaId: this.data.cafeteriaId,
        selectedMealType: this.data.selectedMealType,
        mealConfigId: null,
        mealConfigData: {
          itemName: formValue.itemName,
          mealPrice: formValue.mealPrice,
          payAmtToKitchen: formValue.payAmtToKitchen,
          weeklyMenu: formValue.days
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

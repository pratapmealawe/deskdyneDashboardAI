import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-add-consumption-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, MatDialogModule],
  templateUrl: './add-consumption-order.component.html',
  styleUrls: ['./add-consumption-order.component.scss']
})
export class AddConsumptionOrderComponent implements OnInit {
  isEditMode = false;
  isSubmitting = false;
  itemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<AddConsumptionOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.mealItem;
    this.initForm();
  }

  ngOnInit(): void { }

  private initForm(): void {
    const item = this.data.mealItem || {};
    this.itemForm = this.fb.group({
      itemName: [item.itemName || '', [Validators.required]],
      mealPrice: [item.mealPrice || '', [Validators.required]],
      minGuarantees: [item.minGuarantees || 0, [Validators.required]],
      selctedmealtype: [item.selctedmealtype || '']
    });
  }

  async save(): Promise<void> {
    if (this.itemForm.invalid) return;

    this.isSubmitting = true;
    try {
      if (this.isEditMode) {
        const payload = { ...this.itemForm.value, _id: this.data.mealItem._id };
        await this.apiMainService.updateConsumptionMenu(
          this.data.orgObj._id,
          this.data.mealItem.cafeteria_orignal_id,
          payload
        );
        this.toaster.success('Item updated successfully');
      } else {
        const payload = {
          organization_name: this.data.orgObj.organization_name,
          organization_id: this.data.orgObj._id,
          cafeteria_name: this.data.selectedCafeteria.cafeteria_name,
          cafeteria_id: this.data.selectedCafeteria.cafeteria_id,
          cafeteria_orignal_id: this.data.selectedCafeteria._id,
          mealTypeList: [this.itemForm.value] // Single item wrapped in array for bulk API
        };
        await this.apiMainService.addConsumptionOrderList(payload);
        this.toaster.success('Item added successfully');
      }
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error('Save error:', error);
      this.toaster.error(error?.error?.msg || 'Failed to save menu item');
    } finally {
      this.isSubmitting = false;
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { categoryList } from 'src/config/food-category.config';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-outlet-qr-menu',
  templateUrl: './add-outlet-qr-menu.component.html',
  styleUrls: ['./add-outlet-qr-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddOutletQrMenuComponent implements OnInit {
  form!: FormGroup;
  categoryList = categoryList;
  showUpdateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddOutletQrMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { outletObj: any, item?: any, group?: any }
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.setupMealTypeAutoTime();
    
    if (this.data.item) {
      this.showUpdateBtn = true;
      this.patchFormValue(this.data.item);
    } else if (this.data.group) {
      // If adding from a specific meal group
      this.form.patchValue({
        mealType: this.data.group.mealType,
        acceptOrderFrom: this.data.group.acceptOrderFrom,
        acceptOrderTill: this.data.group.acceptOrderTill
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      itemName: ['', [Validators.required, Validators.maxLength(80)]],
      mealType: ['', [Validators.required]],
      acceptOrderFrom: ['', [Validators.required]],
      acceptOrderTill: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      subsidy: [0, [Validators.min(0)]],
      maxQuantity: [1, [Validators.min(1)]],
      category: ['', Validators.required],
      itemType: ['Veg', Validators.required],
      precedence: [0, [Validators.min(0)]],
      isActive: [false],
      description: ['', [Validators.maxLength(200)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  setupMealTypeAutoTime() {
    this.form.get('mealType')?.valueChanges.subscribe((mealType) => {
      const mealConfig = this.data.outletObj?.mealTiming?.find(
        (m: any) => m.mealType === mealType
      );

      if (mealConfig) {
        this.form.patchValue(
          {
            acceptOrderFrom: mealConfig.acceptOrderFrom || '',
            acceptOrderTill: mealConfig.acceptOrderTill || '',
          },
          { emitEvent: false }
        );
      } else {
        this.form.patchValue(
          {
            acceptOrderFrom: '',
            acceptOrderTill: '',
          },
          { emitEvent: false }
        );
      }
    });
  }

  patchFormValue(item: any) {
    this.form.patchValue({
      itemName: item.itemName,
      mealType: item.mealType,
      acceptOrderFrom: item.acceptOrderFrom,
      acceptOrderTill: item.acceptOrderTill,
      price: item.price,
      subsidy: item.subsidy || 0,
      maxQuantity: item.maxQuantity || 1,
      category: item.category,
      itemType: item.itemType,
      precedence: item.precedence || 0,
      isActive: item.isActive,
      description: item.description,
    });
  }

  preventInvalidNumber(e: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(e.key)) e.preventDefault();
  }

  preventInvalidPaste(e: ClipboardEvent, type: 'integer' | 'decimal' = 'integer') {
    const text = e.clipboardData?.getData('text') ?? '';
    if (type === 'integer') {
      if (!/^[1-9]\d*$/.test(text)) e.preventDefault();
    } else {
      if (!/^\d+(\.\d+)?$/.test(text)) e.preventDefault();
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const result = {
      ...value,
      outletId: this.data.outletObj._id,
      outletName: this.data.outletObj.outletName,
      menuId: this.data.item ? this.data.item._id : undefined
    };

    this.dialogRef.close(result);
  }

  close() {
    this.dialogRef.close();
  }
}

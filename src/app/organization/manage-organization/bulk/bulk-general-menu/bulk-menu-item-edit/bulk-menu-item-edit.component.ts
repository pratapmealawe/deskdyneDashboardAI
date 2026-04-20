import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../material.module';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-bulk-menu-item-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './bulk-menu-item-edit.component.html',
  styleUrls: ['./bulk-menu-item-edit.component.scss']
})
export class BulkMenuItemEditComponent implements OnInit {
  item: any;
  imageUrl = environment.imageUrl;

  constructor(
    public dialogRef: MatDialogRef<BulkMenuItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    // Clone to avoid direct mutation
    this.item = JSON.parse(JSON.stringify(inputData.item));
  }

  ngOnInit(): void {}

  isValid(): boolean {
    if (!this.item.itemName) return false;
    if (this.item.slab1Price == null || this.item.slab2Price == null || this.item.slab3Price == null || this.item.slab4Price == null) return false;
    if (this.item.itemServingType === 'perQuantity' && (!this.item.servingQuantity || !this.item.servingQuantityUnit)) return false;
    return true;
  }

  onSave(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.item);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../material.module';

@Component({
  selector: 'app-bulk-menu-slab',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './bulk-menu-slab.component.html',
  styleUrls: ['./bulk-menu-slab.component.scss']
})
export class BulkMenuSlabComponent implements OnInit {
  // Local copy to avoid direct mutation until saved
  data: any;

  constructor(
    public dialogRef: MatDialogRef<BulkMenuSlabComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = JSON.parse(JSON.stringify(inputData));
  }

  ngOnInit(): void {}

  isValid(): boolean {
    // Basic validation: MOQ should be > 0 if provided, and limits should be progressive
    if (this.data.moq < 0) return false;
    
    // Check progressive limits if they exist
    const limits = [this.data.slabLimit1, this.data.slabLimit2, this.data.slabLimit3].filter(l => l != null && l !== '');
    for (let i = 0; i < limits.length - 1; i++) {
        if (Number(limits[i]) >= Number(limits[i+1])) return false;
    }
    
    return true;
  }

  onSave(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}

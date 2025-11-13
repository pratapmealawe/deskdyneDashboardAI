import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent {
 data: any[] = [];
  displayedColumns: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    // Expect an array of objects passed into the dialog
    if (Array.isArray(this.dialogData)) {
      this.data = this.dialogData;

      // Extract unique keys for table headers
      const allKeys = new Set<string>();
      this.data.forEach(obj => Object.keys(obj).forEach(k => allKeys.add(k)));
      this.displayedColumns = Array.from(allKeys);
    }
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }
}

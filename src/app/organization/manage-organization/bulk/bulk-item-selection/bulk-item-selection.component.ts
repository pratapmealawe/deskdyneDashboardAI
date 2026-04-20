import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { CustomPipeModule } from "@pipes/pipe.module";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-bulk-item-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, CustomPipeModule],
  templateUrl: './bulk-item-selection.component.html',
  styleUrls: ['./bulk-item-selection.component.scss']
})
export class BulkItemSelectionComponent implements OnInit {
  searchText = '';
  imageUrl = environment.imageUrl;
  foodItemList: any[] = [];
  selectedFoodItems: any[] = [];
  menuType: string = '';

  constructor(
    private api: ApiMainService,
    private dialogRef: MatDialogRef<BulkItemSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.menuType = data?.menuType || 'items';
  }

  ngOnInit(): void {
    this.getAllB2BFoodItemList();
  }

  async getAllB2BFoodItemList(): Promise<void> {
    try {
      this.foodItemList = await this.api.getAllB2BFooditems();
    } catch (e) {
      console.error('Error fetching food items:', e);
    }
  }

  toggleSelection(food: any): void {
    const index = this.selectedFoodItems.indexOf(food);
    if (index > -1) {
      this.selectedFoodItems.splice(index, 1);
    } else {
      this.selectedFoodItems.push(food);
    }
  }

  close(result?: string): void {
    if (result === 'add') {
      this.dialogRef.close(this.selectedFoodItems);
    } else {
      this.dialogRef.close();
    }
  }
}

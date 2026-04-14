import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';
import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-copy-outlet-menu',
  templateUrl: './copy-outlet-menu.component.html',
  styleUrls: ['./copy-outlet-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CopyOutletMenuComponent implements OnInit {
  displayImgUrl = environment.imageUrl;

  outletList: any[] = [];
  selectedOutlet: any = null;
  outletMenuList: any[] = [];
  filteredOutletMenuList: any[] = [];
  selectedMenuItems: any[] = [];
  searchTerm: string = '';

  constructor(
    private apiMainService: ApiMainService,
    private toastr: ToasterService,
    public dialogRef: MatDialogRef<CopyOutletMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { outletObj: any }
  ) { }

  ngOnInit(): void {
    this.fetchAllOutlets();
  }

  async fetchAllOutlets() {
    try {
      const res = await this.apiMainService.fetchAllOutlets();
      if (res) {
        // Filter out the current outlet
        this.outletList = res.filter((o: any) => o._id !== this.data.outletObj._id);
      }
    } catch (e) {
      console.error('error while fetching outlets', e);
      this.toastr.error('Failed to fetch outlets');
    }
  }

  async onOutletChange() {
    if (this.selectedOutlet) {
      try {
        const res = await this.apiMainService.getMenuItems(this.selectedOutlet._id);
        this.outletMenuList = res || [];
        this.applyFilter();
      } catch (e) {
        console.error('Error fetching menu items for selected outlet', e);
        this.toastr.error('Failed to fetch items');
      }
    } else {
      this.outletMenuList = [];
      this.filteredOutletMenuList = [];
    }
    this.selectedMenuItems = [];
  }

  applyFilter() {
    let temp = [...this.outletMenuList];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter((item: any) =>
        (item.itemName || '').toLowerCase().includes(term) ||
        (item.description || '').toLowerCase().includes(term)
      );
    }
    this.filteredOutletMenuList = temp;
  }

  onItemToggle(item: any) {
    const itemId = item._id?.toString();
    const index = this.selectedMenuItems.findIndex(i => i._id?.toString() === itemId);
    if (index === -1) {
      this.selectedMenuItems.push(item);
    } else {
      this.selectedMenuItems.splice(index, 1);
    }
  }

  isSelected(item: any): boolean {
    if (!item || !item._id) return false;
    const itemId = item._id.toString();
    return this.selectedMenuItems.some(i => i._id?.toString() === itemId);
  }

  async submit() {
    if (this.selectedMenuItems && this.selectedMenuItems.length > 0) {
      try {
        const itemsToSave = this.selectedMenuItems.map((item: any) => {
          // Destructure to remove top-level Mongoose/DB fields
          const { _id, __v, createdAt, updatedAt, $__, _doc, ...rest } = item;

          // Deeply sanitize nested arrays to remove internal Mongoose metadata
          const sanitizeList = (list: any[], fields: string[]) => {
            if (!list || !Array.isArray(list)) return [];
            return list.map((obj: any) => {
              const sanitized: any = {};
              fields.forEach(f => {
                if (obj[f] !== undefined) sanitized[f] = obj[f];
              });
              return sanitized;
            });
          };

          // Sanitize addOnsList
          if (rest.addOnsList) {
            rest.addOnsList = sanitizeList(rest.addOnsList, ['addOnImageUrl', 'addOnName', 'addOnPrice', 'addOnType']);
          }

          // Sanitize nutritionList
          if (rest.nutritionInfo?.nutritionList) {
            rest.nutritionInfo.nutritionList = sanitizeList(rest.nutritionInfo.nutritionList, ['nutritionId', 'nutritionName', 'nutritionValue', 'nutritionUnit']);
          }

          // Sanitize itemContains
          if (rest.itemContains) {
            rest.itemContains = sanitizeList(rest.itemContains, ['name', 'quantity', 'contentType']);
          }

          // Sanitize mealTimingInfo
          if (rest.mealTimingInfo) {
            rest.mealTimingInfo = sanitizeList(rest.mealTimingInfo, ['mealType', 'slug', 'acceptOrderFrom', 'acceptOrderTill']);
          }

          // Sanitize weeklyMenuDates
          if (rest.weeklyMenuDates) {
            rest.weeklyMenuDates = sanitizeList(rest.weeklyMenuDates, ['date']);
          }

          // Normalize enum fields 
          if (rest.discountType === null || rest.discountType === undefined) {
            rest.discountType = '';
          }
          if (rest.itemType === null || rest.itemType === undefined) {
            rest.itemType = 'Veg';
          }

          return { ...rest, outletId: this.data.outletObj._id };
        });

        const res = await this.apiMainService.bulkUploadOutletMenu(itemsToSave, this.data.outletObj._id);
        if (res) {
          this.toastr.success(`${this.selectedMenuItems.length} items copied successfully`);
          this.dialogRef.close(true);
        }
      } catch (error) {
        console.error('Error copying items from outlet:', error);
        this.toastr.error('Failed to copy items');
      }
    }
  }

}

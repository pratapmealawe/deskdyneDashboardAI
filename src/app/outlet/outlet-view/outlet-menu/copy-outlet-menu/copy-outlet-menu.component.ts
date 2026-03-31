import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-copy-outlet-menu',
  templateUrl: './copy-outlet-menu.component.html',
  styleUrls: ['./copy-outlet-menu.component.scss']
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
    const index = this.selectedMenuItems.findIndex(i => i._id === item._id);
    if (index === -1) {
      this.selectedMenuItems.push(item);
    } else {
      this.selectedMenuItems.splice(index, 1);
    }
  }

  isSelected(item: any): boolean {
    return this.selectedMenuItems.some(i => i._id === item._id);
  }

  submit() {
    // Transform selected items to match parent requirements
    const transformedItems = this.selectedMenuItems.map((each: any) => {
      return {
        ...each,
        mealTimingInfo: (each.mealTimingInfo || []).map(
          (info: any) => (typeof info === 'string' ? info : (info.mealType || info))
        ),
      };
    });
    this.dialogRef.close(transformedItems);
  }
}

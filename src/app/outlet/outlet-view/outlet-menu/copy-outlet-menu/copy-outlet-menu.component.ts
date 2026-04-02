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
          const { _id, __v, createdAt, updatedAt, ...rest } = item;
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

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';
import { environment } from 'src/environments/environment';
import { categoryList } from 'src/config/food-category.config';

@Component({
  selector: 'app-master-menu-dialog',
  templateUrl: './master-menu-dialog.component.html',
  styleUrls: ['./master-menu-dialog.component.scss']
})
export class MasterMenuDialogComponent implements OnInit {
  displayImgUrl = environment.imageUrl;
  categoryList = categoryList;

  filteredMasterMenuList: any[] = [];
  tempList: any[] = [];
  selectedItems: any[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private apiMainService: ApiMainService,
    private toastr: ToasterService,
    public dialogRef: MatDialogRef<MasterMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { outletObj: any }
  ) { }

  ngOnInit(): void {
    this.fetchOutletMasterMenus();
  }

  async fetchOutletMasterMenus() {
    try {
      const res = await this.apiMainService.getAllOutletMasterMenus();
      if (res) {
        this.filteredMasterMenuList = res;
        this.tempList = [...res];
      }
    } catch (e) {
      console.error('error while fetching outlet master menus', e);
      this.toastr.error('Failed to fetch master menu');
    }
  }

  applyMasterFilter() {
    let list = [...this.tempList];

    if (this.selectedCategory) {
      list = list.filter(item => item.category === this.selectedCategory);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(item =>
        (item.itemName || '').toLowerCase().includes(term) ||
        (item.description || '').toLowerCase().includes(term)
      );
    }

    this.filteredMasterMenuList = list;
  }

  onItemToggle(item: any) {
    const index = this.selectedItems.findIndex(i => i._id === item._id);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems.some(i => i._id === item._id);
  }

  submit() {
    this.dialogRef.close(this.selectedItems);
  }
}

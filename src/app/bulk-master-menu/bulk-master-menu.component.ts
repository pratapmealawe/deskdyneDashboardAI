import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PageEvent } from '@angular/material/paginator';
import { CustomPipeModule } from '@pipes/pipe.module';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { BulkMasterMenuCardComponent } from './bulk-master-menu-card/bulk-master-menu-card.component';
import { AddBulkMasterMenuComponent } from './add-bulk-master-menu/add-bulk-master-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { categoryList } from 'src/config/food-category.config';

@Component({
  selector: 'app-bulk-master-menu',
  templateUrl: './bulk-master-menu.component.html',
  styleUrls: ['./bulk-master-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CustomPipeModule,
    DirectivesModule,
    BulkMasterMenuCardComponent,
    AddBulkMasterMenuComponent
  ]
})
export class BulkMasterMenuComponent implements OnInit {
  
  allMenuItems: any[] = [];
  filteredMenuItems: any[] = [];
  masterMenuList: any[] = []; // for filtering
  
  displayImgUrl = environment.imageUrl;
  searchTerm: string = '';
  selectedCategoryFilter: string = '';
  categoryList = categoryList;
  groupedMenuList: any[] = [];
  showCard: boolean = false;

  // paginator config
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMenuItemsList();
  }

  async getMenuItemsList(): Promise<void> {
    try {
      const res: any = await this.apiMainService.getAllBulkMasterMenus();
      if (res) {
        this.allMenuItems = res;
        this.masterMenuList = res;
        this.applyFilter();
      }
    } catch (error) {
      console.error(error);
      this.allMenuItems = [];
      this.masterMenuList = [];
      this.applyFilter();
    }
  }

  applyFilter() {
    let temp = [...this.masterMenuList];

    // 1. Text Search
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter(item =>
        (item.itemName && item.itemName.toLowerCase().includes(term)) ||
        (item.itemDescription && item.itemDescription.toLowerCase().includes(term))
      );
    }

    // 2. Category Filter
    if (this.selectedCategoryFilter && this.selectedCategoryFilter !== 'all') {
      temp = temp.filter(item => item.category === this.selectedCategoryFilter);
    }

    // 3. Sort (if precedence exists, otherwise by name)
    this.filteredMenuItems = temp.sort((a: any, b: any) => {
      if (a.precedence != null && b.precedence != null) {
        return a.precedence - b.precedence;
      }
      return (a.itemName || '').localeCompare(b.itemName || '');
    });

    this.showCard = this.filteredMenuItems.length > 0;
    this.groupItemsByCategory();
  }

  groupItemsByCategory() {
    const grouped = this.filteredMenuItems.reduce((acc, item) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    this.groupedMenuList = Object.keys(grouped).map(category => ({
      category,
      items: grouped[category]
    }));
  }

  openAddEditDialog(editType: 'new' | 'edit', item?: any): void {
    const dialogRef = this.dialog.open(AddBulkMasterMenuComponent, {
      width: '950px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {
        editType: editType,
        editMenuItemObj: item || {}
      }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result !== 'cancel') {
        this.getMenuItemsList();
      }
    });
  }

  addMenuItem(): void {
    this.openAddEditDialog('new');
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}

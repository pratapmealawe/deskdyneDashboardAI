import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchFilterService } from '@service/search-filter.service';
import { CustomPipeModule } from '@pipes/pipe.module';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { BulkMasterMenuCardComponent } from './bulk-master-menu-card/bulk-master-menu-card.component';
import { AddBulkMasterMenuComponent } from './add-bulk-master-menu/add-bulk-master-menu.component';

import { MatDialog } from '@angular/material/dialog';

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
  // master + filtered + paged lists
  allMenuItems: any[] = [];
  filteredMenuItems: any[] = [];
  pagedMenuItems: any[] = [];

  searchText = '';
  
  // paginator config
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  get filteredLength(): number {
    return this.filteredMenuItems.length;
  }

  constructor(
    private apiMainService: ApiMainService,
    private searchService: SearchFilterService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMenuItemsList();
  }

  async getMenuItemsList(): Promise<void> {
    try {
      const menuItems: any = await this.apiMainService.getAllBulkMasterMenus();
      this.allMenuItems = menuItems || [];
      this.applySearchAndPagination();
    } catch (error) {
      console.error(error);
      this.allMenuItems = [];
      this.applySearchAndPagination();
    }
  }

  openAddEditDialog(editType: 'new' | 'edit', item?: any): void {
    const dialogRef = this.dialog.open(AddBulkMasterMenuComponent, {
      width: '800px',
      maxWidth: '95vw',
      disableClose: true,
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

  editMenuItem(item: any): void {
    this.openAddEditDialog('edit', item);
  }

  gotoPreviousState($event: any): void {
    if ($event !== 'cancel') {
      this.getMenuItemsList();
    }
  }

  async deleteMenuItem(item: any): Promise<void> {
    try {
      await this.apiMainService.deleteBulkMasterMenu(item._id);
      this.getMenuItemsList();
    } catch (error) {
    }
  }

  // ------------ SEARCH + PAGINATION ------------

  onSearchChange(value: string): void {
    this.searchText = value || '';
    this.pageIndex = 0; // reset to first page on new search
    this.applySearchAndPagination();
  }

  clearSearch(): void {
    this.searchText = '';
    this.pageIndex = 0;
    this.applySearchAndPagination();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  private applySearchAndPagination(): void {
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredMenuItems = this.searchService.searchData(
        this.allMenuItems,
        { keys: ['itemName'] },
        this.searchText.trim(),
      );
    } else {
      this.filteredMenuItems = [...this.allMenuItems];
    }

    this.updatePagedData();
  }

  private updatePagedData(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedMenuItems = this.filteredMenuItems.slice(start, end);
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchFilterService } from 'src/service/search-filter.service';

@Component({
  selector: 'app-b2b-food-item',
  templateUrl: './b2b-food-item.component.html',
  styleUrls: ['./b2b-food-item.component.scss'],
})
export class B2bFoodItemComponent implements OnInit {
  // master + filtered + paged lists
  allFoodItems: any[] = [];
  filteredFoodItems: any[] = [];
  pagedFoodItems: any[] = [];

  foodItemList: any[] = []; // kept if used somewhere else, but we work on allFoodItems
  editMode = false;
  editType: 'new' | 'edit' | '' = '';
  editfoodItemObj: any;
  searchText = '';
  btnPolicy: any;

  // paginator config
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  get filteredLength(): number {
    return this.filteredFoodItems.length;
  }

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private searchService: SearchFilterService 
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.getFooditemList();
  }

  async getFooditemList(): Promise<void> {
    try {
      const foodItemList: any = await this.apiMainService.getAllB2BFooditems();

      if (foodItemList && foodItemList.length > 0) {
        this.allFoodItems = foodItemList;
      } else {
        this.allFoodItems = [];
      }

      // keep old property if used anywhere else
      this.foodItemList = this.allFoodItems;

      this.applySearchAndPagination();
    } catch (error) {
      console.error(error);
      this.allFoodItems = [];
      this.filteredFoodItems = [];
      this.pagedFoodItems = [];
    }
  }

  addFooditem(): void {
    this.editMode = true;
    this.editType = 'new';
    this.editfoodItemObj = {};
  }

  editFoodItem($event: any): void {
    this.editMode = true;
    this.editType = 'edit';
    this.editfoodItemObj = $event;
  }

  gotoPreviousState($event: any): void {
    if ($event !== 'cancel') {
      this.getFooditemList();
    }
    this.resetForm();
    this.editMode = false;
    this.editType = '';
    this.editfoodItemObj = {};
  }

  async deleteFoodItem(item: any): Promise<void> {
    try {
      await this.apiMainService.deleteB2BFoodItem(item._id);
      this.getFooditemList();
    } catch (error) {
      console.log(error);
    }
  }

  resetForm(): void {
    // Keep here if you add form fields later
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
      this.filteredFoodItems = this.searchService.searchData(
        this.allFoodItems,
        { keys: ['itemName'] },
        this.searchText.trim(),
      );
    } else {
      this.filteredFoodItems = [...this.allFoodItems];
    }

    this.updatePagedData();
  }

  private updatePagedData(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedFoodItems = this.filteredFoodItems.slice(start, end);
  }
}

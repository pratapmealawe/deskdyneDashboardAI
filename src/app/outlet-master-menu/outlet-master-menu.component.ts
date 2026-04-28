import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { MaterialModule } from 'src/app/material.module';
import { categoryList, nutritionListOptions } from 'src/config/food-category.config';
import { AddOutletMasterMenuComponent } from './add-outlet-master-menu/add-outlet-master-menu.component';

@Component({
  selector: 'app-outlet-master-menu',
  templateUrl: './outlet-master-menu.component.html',
  styleUrls: ['./outlet-master-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OutletMasterMenuComponent implements OnInit {
  @Input() outletObj: any;
  categorySelected: boolean = false;
  // removed form property
  selectedCategory: any;
  subcategoryList: any = [];
  imageUrl: any;
  displayImgUrl = environment.imageUrl;
  showCard: any = false;
  menuList: any = [];
  menuId: any = 0;
  noImages: boolean = false;
  foodItem: any;
  activeStatus = false;
  menuInfo: any;
  eventInfo: any;
  filteredMenuList: any[] = []
  masterMenuList: any[] = [];
  searchTerm: string = '';
  selectedCategoryFilter: string = '';
  mealTimeList = [
    { "mealType": "Fullday", "acceptOrderFrom": "06:00", "acceptOrderTill": "23:00" },
    { "mealType": "Breakfast", "acceptOrderFrom": "07:00", "acceptOrderTill": "09:00" },
    { "mealType": "Lunch", "acceptOrderFrom": "11:00", "acceptOrderTill": "13:00" },
    { "mealType": "EveningSnacks", "acceptOrderFrom": "15:00", "acceptOrderTill": "17:00" },
    { "mealType": "Dinner", "acceptOrderFrom": "20:00", "acceptOrderTill": "22:00" }
  ];
  groupedMenuList: any;
  categoryList = categoryList;
  pageSize: number = 5;
  pageIndex: number = 0;
  nutritionListOptions = nutritionListOptions;
  energyTooltip = `
Nutrient Conversion Factors:
• Protein: 4 kcal/g
• Carbohydrates: 4 kcal/g
• Fat: 9 kcal/g
• Fiber: 2 kcal/g
`;
  constructor(
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchOutletMasterMenus();
  }

  init() {
    if (this.filteredMenuList && this.filteredMenuList.length > 0) {
      this.filteredMenuList = this.filteredMenuList.sort((a: any, b: any) => a.precedence - b.precedence)
      this.showCard = true;
    }

    // Keep a copy of full list
    if (!this.masterMenuList.length && this.filteredMenuList.length) {
      this.masterMenuList = [...this.filteredMenuList];
    }

    this.applyFilter();
  }

  applyFilter() {
    let temp = [...this.masterMenuList];

    // 1. Text Search
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter(item =>
        (item.itemName && item.itemName.toLowerCase().includes(term)) ||
        (item.description && item.description.toLowerCase().includes(term))
      );
    }

    // 2. Category Filter
    if (this.selectedCategoryFilter && this.selectedCategoryFilter !== 'all') {
      temp = temp.filter(item => item.category === this.selectedCategoryFilter);
    }

    // 3. Sort
    this.filteredMenuList = temp.sort((a: any, b: any) => a.precedence - b.precedence);

    this.showCard = this.filteredMenuList.length > 0;
    this.groupItemsByCategory();
  }

  groupItemsByCategory() {
    const grouped = this.filteredMenuList.reduce((acc, item) => {
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

  async fetchOutletMasterMenus() {
    try {
      const res = await this.apiMainService.getAllOutletMasterMenus();
      if (res) {
        this.filteredMenuList = res;
        this.masterMenuList = res; // Update master list too
        this.init();
      }
    }
    catch (e) {
      
    }
    return [];
  }

  resetValues() {
    this.menuId = '';
    this.imageUrl = '';
    this.noImages = false;
  }

  async edit(item: any, index: any) {
    const dialogRef = this.dialog.open(AddOutletMasterMenuComponent, {
      width: '950px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: { item, outletObj: this.outletObj }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.fetchOutletMasterMenus();
      }
    });
  }

  open() {
    const dialogRef = this.dialog.open(AddOutletMasterMenuComponent, {
      width: '950px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: { outletObj: this.outletObj }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.fetchOutletMasterMenus();
      }
    });
  }

  showPopup(item: any, i: any) {
    this.foodItem = item;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${item.itemName}`,
      callback: this.deleteFoodItem,
      context: this
    });
  }

  async deleteFoodItem() {
    const res: any = await this.apiMainService.deleteOutletMasterMenu(
      this.foodItem._id
    );
    if (res && res._id) {
      this.fetchOutletMasterMenus();
    }
    this.resetValues();
  }

  async changeMenuActivation() {
    const menu = this.menuInfo;
    const event = this.eventInfo;
    menu.isActive = event.checked;

    const menuObj = {
      isActive: event.checked,
    };

    try {
      const outletMastermenu = await this.apiMainService.changeMasterMenuActivation(
        menu._id,
        menuObj
      );
    } catch (error) {
      // Revert if API fails
      menu.isActive = !event.checked;
      event.source.checked = !event.checked;
    }
  }

  showPopupForItemActivation(menu: any, event: any) {
    this.menuInfo = menu;
    this.eventInfo = event;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to ${event.checked ? 'Enable' : 'Disable'} ${menu.itemName} Item`,
      callback: this.changeMenuActivation,
      context: this,
    });
  }

  // paginator logic 
  onPageChanges(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex
  }

  compareNutrition(o1: any, o2: any): boolean {
    if (!o1 || !o2) return o1 === o2;
    return o1.id === o2.id;
  }

  normalizeMealTiming(mealTimingInfo: any): string[] {
    if (!mealTimingInfo) return [];
    if (Array.isArray(mealTimingInfo)) return mealTimingInfo.map((m: any) => m?.mealType || m);
    if (typeof mealTimingInfo === 'string') return [mealTimingInfo];
    return [];
  }
}

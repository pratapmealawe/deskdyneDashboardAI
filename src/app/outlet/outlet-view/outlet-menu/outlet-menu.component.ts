import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { categoryList, nutritionListOptions } from 'src/config/food-category.config';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ToasterService } from 'src/service/toaster.service';
import { BulkMenuUploadDialogComponent } from '../bulk-menu-upload-dialog/bulk-menu-upload-dialog.component';
import { AddOutletMenuComponent } from './add-outlet-menu/add-outlet-menu.component';
import { CopyOutletMenuComponent } from './copy-outlet-menu/copy-outlet-menu.component';
import { MasterMenuDialogComponent } from './master-menu-dialog/master-menu-dialog.component';

@Component({
  selector: 'app-outlet-menu',
  templateUrl: './outlet-menu.component.html',
  styleUrls: ['./outlet-menu.component.scss'],
})
export class OutletMenuComponent implements OnInit, OnChanges {
  @Input() outletObj: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataToParent = new EventEmitter<string>();

  categoryList = categoryList;
  nutritionListOptions = nutritionListOptions;
  displayImgUrl = environment.imageUrl;
  showCard: boolean = false;
  selectedCategory: any;
  menuItems: any[] = [];
  foodItem: any;
  menuInfo: any;
  eventInfo: any;
  // main outlet menu lists
  filteredMenuList: any[] = [];
  groupedMenuList: any[] = [];
  // filters
  searchTermMenu: string = '';    // for outlet menu
  selectedCategoryFilter: string = '';
  selectedDateFilter: Date | null = null;
  // weekly menu dates
  selectedWeeklyDates: Date[] = [];
  today = new Date();

  constructor(
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private dialog: MatDialog,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
    if (this.outletObj?._id) {
      this.fetchMenuItems();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['outletObj']) {
      this.outletObj = changes['outletObj'].currentValue;
      if (this.outletObj?._id) {
        this.fetchMenuItems();
      }
    }
  }

  async fetchMenuItems() {
    try {
      const res = await this.apiMainService.getMenuItems(this.outletObj._id);
      this.menuItems = res || [];
      this.applyMenuFilters();
    } catch (e) {
      console.log('error while fetching menu items', e);
      this.menuItems = [];
      this.applyMenuFilters();
    }
  }


  applyMenuFilters() {
    if (!this.menuItems) {
      this.filteredMenuList = [];
      this.groupedMenuList = [];
      this.showCard = false;
      return;
    }

    let temp = this.menuItems.slice().sort((a: any, b: any) => a.precedence - b.precedence);

    if (this.selectedCategoryFilter) {
      temp = temp.filter((item: any) => item.category === this.selectedCategoryFilter);
    }

    if (this.searchTermMenu) {
      const term = this.searchTermMenu.toLowerCase();
      temp = temp.filter((item: any) =>
        (item.itemName || '').toLowerCase().includes(term) ||
        (item.description || '').toLowerCase().includes(term) ||
        (item.outletName || '').toLowerCase().includes(term)
      );
    }

    // if (this.outletObj?.isWeeklyMenu && this.selectedDateFilter) {
    //   temp = temp.filter((item: any) => (item.weeklyMenuDates || []).some((d: any) => this.isSameDay(new Date(d.date), this.selectedDateFilter!)));
    // }

    this.filteredMenuList = temp;
    this.showCard = this.filteredMenuList.length > 0;
    
    console.log('buildDateGroupedMenu',this.buildDateGroupedMenu(this.filteredMenuList))
    console.log('buildGroupedMenu',this.buildGroupedMenu(this.filteredMenuList))
    this.groupedMenuList = this.outletObj?.isWeeklyMenu ? this.buildDateGroupedMenu(this.filteredMenuList) : this.buildGroupedMenu(this.filteredMenuList);
  }

  private buildGroupedMenu(list: any[]) {
    const grouped = list.reduce((acc: any, item: any) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((category) => ({
      category,
      subGroups: [{ title: '', items: grouped[category] }]
    }));
  }

  private innerGroupBy(list: any[], key: string) {
    const grouped = list.reduce((acc: any, item: any) => {
      const val = item[key] || 'Uncategorized';
      if (!acc[val]) acc[val] = [];
      acc[val].push(item);
      return acc;
    }, {});
    return Object.keys(grouped).map(title => ({ title, items: grouped[title] }));
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  buildDateGroupedMenu(list: any[]) {
    const dateGroups: any = {};
    const unassigned: any[] = [];

    list.forEach(item => {
      if (!item.weeklyMenuDates || item.weeklyMenuDates.length === 0) {
        unassigned.push(item);
      } else {
        item.weeklyMenuDates.forEach((d: any) => {
          const dateStr = new Date(d.date).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          if (!dateGroups[dateStr]) {
            dateGroups[dateStr] = [];
          }
          if (!dateGroups[dateStr].find((i: any) => i._id === item._id)) {
            dateGroups[dateStr].push(item);
          }
        });
      }
    });

    const result = Object.keys(dateGroups).map(date => ({
      category: date,
      subGroups: this.innerGroupBy(dateGroups[date], 'category')
    }));

    if (unassigned.length > 0) {
      result.push({
        category: 'Unassigned / All Days',
        subGroups: this.innerGroupBy(unassigned, 'category')
      });
    }

    return result;
  }


  toggleDate(date: Date) {
    const index = this.selectedWeeklyDates.findIndex(d => this.isSameDay(d, date));
    if (index === -1) {
      this.selectedWeeklyDates.push(date);
    } else {
      this.selectedWeeklyDates.splice(index, 1);
    }
  }

  isDateSelected(date: Date): boolean {
    return this.selectedWeeklyDates.some(d => this.isSameDay(d, date));
  }

  weeklyDateClass = (date: Date): string => {
    return this.isDateSelected(date) ? 'selected-date' : '';
  };

  weeklyDateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    return true;
  };

  async edit(item: any) {
    this.open('update', item);
  }

  open(action: 'add' | 'update' = 'add', item?: any) {
    const dialogRef = this.dialog.open(AddOutletMenuComponent, {
      width: '85vw',
      maxWidth: '1200px',
      panelClass: 'modern-dialog',
      disableClose: true,
      data: { outletObj: this.outletObj, item: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchMenuItems();
      }
    });
  }

  compareSection(o1: any, o2: any): boolean {
    if (!o1 || !o2) {
      return o1 === o2;
    }
    if (o1._id && o2._id) return o1._id === o2._id;
    if (o1.sectionId && o2._id) return o1.sectionId === o2._id;
    if (o1._id && o2.sectionId) return o1._id === o2.sectionId;
    if (o1.sectionId && o2.sectionId) return o1.sectionId === o2.sectionId;
    return false;
  }

  async deleteFoodItem() {
    const res: any = await this.apiMainService.deleteOutletMenu(this.outletObj._id, this.foodItem._id);
    if (res) {
      this.fetchMenuItems();
      this.toastr.success('Menu item deleted successfully');
    }
    this.back.emit(true);
  }

  async changeMenuActivation() {
    const menu = this.menuInfo;
    const event = this.eventInfo;
    menu.isActive = event.checked;
    const menuObj = {
      isActive: event.checked,
    };
    const res = await this.apiMainService.changeMenuActivation(this.outletObj._id, menu._id, menuObj);
    if (res) {
      this.toastr.success(`Item ${event.checked ? 'Enabled' : 'Disabled'} successfully`);
    }
  }

  showPopup(item: any) {
    this.foodItem = item;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${item.itemName}`,
      callback: this.deleteFoodItem,
      context: this
    });
  }

  showPopupForItemActivation(menu: any, event: any) {
    this.menuInfo = menu;
    this.eventInfo = event;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to ${event.checked ? 'Enable' : 'Disable'} ${menu.itemName} Item`,
      callback: this.changeMenuActivation,
      cancelCallback: this.revertMenuActivation,
      context: this
    });
  }

  revertMenuActivation() {
    if (this.menuInfo && this.eventInfo) {
      const originalState = !this.eventInfo.checked;
      this.menuInfo.isActive = originalState;
      if (this.eventInfo.source) {
        this.eventInfo.source.checked = originalState;
      }
    }
  }

  resetValues() {
    this.searchTermMenu = '';
    this.selectedCategoryFilter = '';
    this.selectedDateFilter = null;
    this.applyMenuFilters();
  }

  openMenu() {
    const dialogRef = this.dialog.open(MasterMenuDialogComponent, {
      width: '90vw',
      maxWidth: '1200px',
      disableClose: false,
      data: { outletObj: this.outletObj }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.fetchMenuItems();
      }
    });
  }

  openOutlet() {
    const dialogRef = this.dialog.open(CopyOutletMenuComponent, {
      width: '90vw',
      maxWidth: '1200px',
      disableClose: false,
      data: { outletObj: this.outletObj }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.fetchMenuItems();
      }
    });
  }

  async excelExport() {
    if (!this.filteredMenuList || this.filteredMenuList.length === 0) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Menu');

    worksheet.columns = [
      { header: 'Item Name', key: 'itemName', width: 25 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Type', key: 'itemType', width: 10 },
      { header: 'Price (₹)', key: 'price', width: 15 },
      { header: 'Subsidy (₹)', key: 'subsidy', width: 15 }
    ];

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    this.filteredMenuList.forEach((item) => {
      worksheet.addRow({
        itemName: item.itemName,
        description: item.description || '',
        category: item.category,
        itemType: item.itemType,
        price: item.price || 0,
        subsidy: item.subsidy || 0
      });
    });

    const fileName =
      `outlet_menu_${this.outletObj?.outletName || 'outlet'}` +
      `_${new Date().toISOString().slice(0, 10)}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName);
  }

  compareNutrition(o1: any, o2: any): boolean {
    if (!o1 || !o2) return o1 === o2;
    return o1.id === o2.id;
  }

  openUploadExcelPopup() {
    const dialogRef = this.dialog.open(BulkMenuUploadDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        outletId: this.outletObj._id,
        outletObj: this.outletObj
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchMenuItems();
        this.toastr.success('Bulk upload successful');
      }
    });
  }
}

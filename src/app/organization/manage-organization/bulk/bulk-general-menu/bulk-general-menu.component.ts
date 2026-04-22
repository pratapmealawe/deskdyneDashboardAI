import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { CustomPipeModule } from "@pipes/pipe.module";
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ToasterService } from '@service/toaster.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { MaterialModule } from '../../../../material.module';
import { ImportBulkMenuComponent } from '../import-bulk-menu/import-bulk-menu.component';
import { BulkItemSelectionComponent } from './bulk-item-selection/bulk-item-selection.component';
import { AddEditBulkMenuItemComponent } from './add-edit-bulk-menu-item/add-edit-bulk-menu-item.component';
import { BulkMenuSlabComponent } from './bulk-menu-slab/bulk-menu-slab.component';
import { CopyBulkMenuComponent } from './copy-bulk-menu/copy-bulk-menu.component';
import { OrganizationAddVendorComponent } from './organization-add-vendor/organization-add-vendor.component';

interface Org {
  _id: string;
  organization_name: string;
}

interface CommonMenuItem {
  itemName: string;
  imageUrl: string;
  itemDescription?: string;
  itemFlavour?: string;
  itemType?: 'Veg' | 'NonVeg' | 'Jain';
  itemServingType?: 'perUnit' | 'perPerson' | 'perQuantity';
  servingQuantity?: number;
  servingQuantityUnit?: string;
  group?: string;
  packagingCost?: number;
  packagingDescription?: string;

  slab1Price: number;
  slab2Price: number;
  slab3Price: number;
  slab4Price: number;

  payAmtToKitchen: number;
  mainMenuItemId: string;
  edit?: boolean;
}

interface CommonMenuMeta {
  [key: string]: any;
  moq?: number;
  slabLimit1?: number;
  slabLimit2?: number;
  slabLimit3?: number;
  dateLimit1?: number;
  dateLimit2?: number;
  dateLimit3?: number;
  slab1DeliveryPrice?: number;
  slab2DeliveryPrice?: number;
  slab3DeliveryPrice?: number;
  slab4DeliveryPrice?: number;
  itemList?: CommonMenuItem[];
  vendorDetails?: any;
  isCategoryActive?: boolean;
}

@Component({
  selector: 'app-bulk-general-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, CustomPipeModule, ImportBulkMenuComponent, AddEditBulkMenuItemComponent],
  templateUrl: './bulk-general-menu.component.html',
  styleUrls: ['./bulk-general-menu.component.scss'],
})
export class BulkGeneralMenuComponent implements OnInit, OnChanges {
  @Input() orgObj!: Org;
  @Input() selectedCafeteria: any;
  @Input() mainTabIndex = 0;
  @Input() subTabIndex = 0;
  @Input() childTabIndex = 0;

  @Output() isVendorAssigned = new EventEmitter<boolean>();
  @Output() hasMenu = new EventEmitter<boolean>();

  bulkMenuList: CommonMenuItem[] = [];
  bulkMenuFetched: CommonMenuMeta = {};

  menuSearchText = '';
  imageUrl = environment.imageUrl;
  slabEditMode = false;
  changesMade = false;

  orgChoices: Org[] = [];

  orgViewList = [
    {
      name: 'Bulk Menu Section',
      path: 'bulkMenuSection',
      icon: 'restaurant_menu',
      subTabs: [
        {
          name: 'Meals',
          icon: 'restaurant',
          childTabs: [
            { name: 'Bulk Meals Menu', path: 'bulkMealsMenu', icon: 'groups' },
            { name: 'Individual Meals Menu', path: 'individualMealsMenu', icon: 'person' },
          ],
        },
        {
          name: 'Snacks',
          icon: 'cookie',
          childTabs: [
            { name: 'Bulk Snacks Menu', path: 'bulkSnacksMenu', icon: 'groups' },
            { name: 'Individual Snacks Menu', path: 'individualSnacksMenu', icon: 'person' },
          ],
        },
        {
          name: 'Foodbox',
          icon: 'inventory_2',
          childTabs: [
            { name: 'Pre-Defined Snack Box', path: 'predefinedSnackBoxMenu', icon: 'view_module' },
            { name: 'Customized Snack Box', path: 'customizedSnackBoxMenu', icon: 'tune' },
          ],
        },
        { name: 'Cake', path: 'cakeMenu', icon: 'cake' },
        { name: 'Sweet', path: 'sweetMenu', icon: 'icecream' },
        { name: 'Lux', path: 'luxMenu', icon: 'star' },
        { name: 'Pantry', path: 'pantryMenu', icon: 'kitchen' },
      ],
    },
    {
      name: 'Employee Bulk Menu',
      path: 'employeebulkmenu',
      icon: 'badge',
      subTabs: [
        {
          name: 'Meals',
          icon: 'restaurant',
          childTabs: [
            { name: 'Bulk Meals Menu', path: 'employeebulkMealsMenu', icon: 'groups' },
            { name: 'Individual Meals Menu', path: 'employeeindividualMealsMenu', icon: 'person' },
          ],
        },
        {
          name: 'Snacks',
          icon: 'cookie',
          childTabs: [
            { name: 'Bulk Snacks Menu', path: 'employeebulkSnacksMenu', icon: 'groups' },
            { name: 'Individual Snacks Menu', path: 'employeeindividualSnacksMenu', icon: 'person' },
          ],
        },
        {
          name: 'Foodbox',
          icon: 'inventory_2',
          childTabs: [
            { name: 'Pre-Defined Snack Box', path: 'employeepredefinedSnackBoxMenu', icon: 'view_module' },
            { name: 'Customized Snack Box', path: 'employeecustomizedSnackBoxMenu', icon: 'tune' },
          ],
        },
        { name: 'Cake', path: 'employeecakeMenu', icon: 'cake' },
        { name: 'Sweet', path: 'employeesweetMenu', icon: 'icecream' },
        { name: 'Lux', path: 'employeeluxMenu', icon: 'star' },
        { name: 'Pantry', path: 'employeepantryMenu', icon: 'kitchen' },
      ],
    },
  ];

  get selectedMain(): any {
    return this.orgViewList[this.mainTabIndex];
  }

  get selectedSub(): any {
    return this.selectedMain?.subTabs?.[this.subTabIndex];
  }

  get selectedChild(): any {
    return this.selectedSub?.childTabs?.[this.childTabIndex];
  }

  get isEmployeeMode(): boolean {
    return this.selectedMain?.path === 'employeebulkmenu';
  }

  get selectedBulkMenuPath() {
    const sub = this.selectedMain?.subTabs?.[this.subTabIndex];
    let child = sub?.childTabs?.[this.childTabIndex];

    if (child?.path === 'predefinedSnackBoxMenu' || child?.path === 'employeepredefinedSnackBoxMenu') {
      child = { ...child, path: this.isEmployeeMode ? 'employeepredefinedFoodBoxMenu' : 'predefinedFoodBoxMenu' };
    } else if (child?.path === 'customizedSnackBoxMenu' || child?.path === 'employeecustomizedSnackBoxMenu') {
      child = { ...child, path: this.isEmployeeMode ? 'employeecustomizedFoodBoxMenu' : 'customizedFoodBoxMenu' };
    }

    const childPath = child?.path ?? sub?.path;

    return {
      main: this.selectedMain?.path,
      sub: sub?.name?.toLowerCase(),
      subPath: sub?.path,
      child: child?.name,
      childPath
    };
  }

  getCurrentMenuType(): 'cake' | 'sweet' | 'lux' | 'pantry' | 'bulkMeals' | 'individualMeals' | 'bulkSnacks' | 'individualSnacks' | 'predefinedFoodbox' | 'customizedFoodbox' | '' {
    const path = this.selectedChild?.path || this.selectedSub?.path;
    if (!path) return '';

    const mapping: Record<string, any> = {
      cakeMenu: 'cake', sweetMenu: 'sweet', luxMenu: 'lux', pantryMenu: 'pantry',
      bulkMealsMenu: 'bulkMeals', individualMealsMenu: 'individualMeals',
      bulkSnacksMenu: 'bulkSnacks', individualSnacksMenu: 'individualSnacks',
      predefinedSnackBoxMenu: 'predefinedFoodbox', customizedSnackBoxMenu: 'customizedFoodbox',
      employeecakeMenu: 'cake', employeesweetMenu: 'sweet', employeeluxMenu: 'lux', employeepantryMenu: 'pantry',
      employeebulkMealsMenu: 'bulkMeals', employeeindividualMealsMenu: 'individualMeals',
      employeebulkSnacksMenu: 'bulkSnacks', employeeindividualSnacksMenu: 'individualSnacks',
      employeepredefinedSnackBoxMenu: 'predefinedFoodbox', employeecustomizedSnackBoxMenu: 'customizedFoodbox'
    };

    return mapping[path] || '';
  }

  slabFields = [
    { key: 'slab1Price' as const, label: 'Slab 1' },
    { key: 'slab2Price' as const, label: 'Slab 2' },
    { key: 'slab3Price' as const, label: 'Slab 3' },
    { key: 'slab4Price' as const, label: 'Slab 4' },
  ];

  constructor(
    private api: ApiMainService,
    private dialog: MatDialog,
    private toaster: ToasterService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
    this.fetchOrgChoices();
    this.getMenuItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCafeteria'] || changes['mainTabIndex'] || changes['subTabIndex'] || changes['childTabIndex']) {
      this.getMenuItems();
    }
  }

  getMenuConfig() {
    const menuType = this.getCurrentMenuType();
    const config: any = {
      cake: { category: 'cake', subCategory: this.isEmployeeMode ? 'employeecakeMenu' : 'cakeMenu' },
      sweet: { category: 'sweet', subCategory: this.isEmployeeMode ? 'employeesweetMenu' : 'sweetMenu' },
      lux: { category: 'lux', subCategory: this.isEmployeeMode ? 'employeeluxMenu' : 'luxMenu' },
      pantry: { category: 'pantry', subCategory: this.isEmployeeMode ? 'employeepantryMenu' : 'pantryMenu' },
      bulkMeals: { category: 'meals', subCategory: this.isEmployeeMode ? 'employeebulkMealsMenu' : 'bulkMealsMenu' },
      individualMeals: { category: 'meals', subCategory: this.isEmployeeMode ? 'employeeindividualMealsMenu' : 'individualMealsMenu' },
      bulkSnacks: { category: 'snacks', subCategory: this.isEmployeeMode ? 'employeebulkSnacksMenu' : 'bulkSnacksMenu' },
      individualSnacks: { category: 'snacks', subCategory: this.isEmployeeMode ? 'employeeindividualSnacksMenu' : 'individualSnacksMenu' },
      predefinedFoodbox: { category: 'foodbox', subCategory: this.isEmployeeMode ? 'employeepredefinedSnackBoxMenu' : 'predefinedSnackBoxMenu' },
      customizedFoodbox: { category: 'foodbox', subCategory: this.isEmployeeMode ? 'employeecustomizedSnackBoxMenu' : 'customizedSnackBoxMenu' }
    };
    return config[menuType as string] || { category: '', subCategory: '' };
  }

  async getMenuItems(): Promise<void> {
    if (!this.selectedCafeteria) return;
    this.hasMenu.emit(false);
    const config = this.getMenuConfig();
    try {
      const payload = {
        cafeId: this.selectedCafeteria.cafeteria_id || this.selectedCafeteria._id,
        mainCategory: config.category,
        subCategory: config.subCategory
      };
      const menuItems: any = await this.api.getCategoryBulkMenu(payload);
      if (menuItems) {
        this.bulkMenuFetched = menuItems || {};
        this.bulkMenuList = menuItems.itemList || [];
        this.isVendorAssigned.emit(!!menuItems.vendorDetails);
        this.hasMenu.emit(this.bulkMenuList.length > 0);
      } else {
        this.bulkMenuFetched = {};
        this.bulkMenuList = [];
        this.isVendorAssigned.emit(false);
        this.hasMenu.emit(false);
      }
    } catch (error) {
      console.error(`Error fetching menu:`, error);
      this.hasMenu.emit(false);
    }
  }

  get isCategoryActiveFlag(): boolean {
    return this.bulkMenuFetched?.isCategoryActive || false;
  }

  get isVendorAssignedFlag(): boolean {
    return !!this.bulkMenuFetched?.vendorDetails;
  }

  get isMenuAvailableFlag(): boolean {
    return this.bulkMenuList.length > 0;
  }

  async fetchOrgChoices(): Promise<void> {
    try {
      const orgChoices = await this.api.getOrgList();
      this.orgChoices = orgChoices || [];
    } catch (error) {
      console.error('Error fetching org list:', error);
    }
  }

  // ACTION ROW LOGIC
  openCategoryModal(): void {
    const action = this.isCategoryActiveFlag ? 'de-activate' : 'activate';
    const message = `Are you sure you want to ${action} this category?`;

    this.confirmationModalService.modal({
      msg: message,
      context: this,
      callback: () => {
        this.toggleActivation();
      }
    });
  }

  async toggleActivation(): Promise<void> {
    const config = this.getMenuConfig();
    const payload = {
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteria.cafeteria_id || this.selectedCafeteria._id,
      mainCategory: config.category,
      subCategory: config.subCategory
    };

    try {
      const res = await this.api.toggleBulkMenuCategoryStatus(payload);
      if (res) {
        this.toaster.success('Category status updated successfully');
        await this.getMenuItems();
      }
    } catch (err) {
      this.toaster.error('Failed to update category status');
    }
  }

  handleVendorAssignment(isChange: boolean): void {
    const config = this.getMenuConfig();
    const payload = {
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteria.cafeteria_id || this.selectedCafeteria._id,
      mainCategory: config.category,
      subCategory: config.subCategory,
      organization_name: this.orgObj.organization_name,
      cafeteriaName: this.selectedCafeteria.cafeteria_name,
      selectedBulkMenuPath: this.selectedBulkMenuPath.main,
      isChange
    };

    const dialogRef = this.dialog.open(OrganizationAddVendorComponent, {
      width: '800px',
      data: payload,
      autoFocus: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data?.vendorDetails) {
        this.getMenuItems();
      }
    });
  }

  assignVendor(): void {
    this.handleVendorAssignment(false);
  }

  changeVendor(): void {
    this.handleVendorAssignment(true);
  }

  copyMenu(): void {
    const payload = {
      orgChoices: this.orgChoices,
      currentOrgId: this.orgObj?._id,
      currentCafeId: this.selectedCafeteria?.cafeteria_id || this.selectedCafeteria?._id,
      currentMainCat: this.selectedBulkMenuPath.sub,
      currentSubCat: this.selectedBulkMenuPath.childPath
    };

    const dialogRef = this.dialog.open(CopyBulkMenuComponent, {
      width: '1000px',
      data: payload,
      autoFocus: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.performCopy(result);
      }
    });
  }

  private async performCopy(sourceData: any): Promise<void> {
    const payload = {
      sourceOrgId: sourceData.sourceOrgId,
      sourceCafeId: sourceData.sourceCafeId,
      targetOrgId: this.orgObj?._id,
      targetCafeId: this.selectedCafeteria?.cafeteria_id || this.selectedCafeteria?._id,
      mainCategory: sourceData.mainCategory,
      subCategory: sourceData.subCategory
    };

    try {
      const copyRes = await this.api.copyBulkMenu(payload);
      if (copyRes) {
        this.toaster.success('Menu items copied successfully');
        await this.getMenuItems();
      }
    } catch (err) {
      this.toaster.error('Failed to copy menu items');
    }
  }

  importMenu(): void {
    const dialogRef = this.dialog.open(ImportBulkMenuComponent, {
      width: '1000px',
      autoFocus: false,
      data: { menuType: this.getCurrentMenuType() }
    });

    dialogRef.afterClosed().subscribe((importedItems: any[]) => {
      if (importedItems && importedItems.length > 0) {
        this.prepareB2BMenuList(importedItems);
      }
    });
  }

  async exportMenu(): Promise<void> {
    try {
      const res: any = await this.api.getAllBulkMenus();
      if (res) {
        this.generateExcelFile(res);
      } else {
        this.toaster.error('No data to export menu');
      }
    } catch (err) {
      this.toaster.error('Error exporting menu');
    }
  }

  async generateExcelFile(menuData: any[]): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('B2B Menu Data');

    // Headers (simplified for internal migration, can be expanded if needed)
    worksheet.columns = [
      { header: 'CAFETERIA', key: 'cafeteriaName', width: 20 },
      { header: 'ORGANIZATION', key: 'organization', width: 25 },
      { header: 'MAIN CATEGORY', key: 'mainCategory', width: 15 },
      { header: 'SUB CATEGORY', key: 'subCategory', width: 15 },
      { header: 'ITEM NAME', key: 'itemName', width: 25 }
    ];

    menuData.forEach((menu) => {
      if (menu.itemList) {
        menu.itemList.forEach((item: any) => {
          worksheet.addRow({
            cafeteriaName: menu.cafeteriaName,
            organization: menu.organization_name,
            mainCategory: menu.mainCategory,
            subCategory: menu.subCategory,
            itemName: item.itemName
          });
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `B2B_Menu_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  editFoodItem(foodItem: CommonMenuItem, index: number): void {
    const dialogRef = this.dialog.open(AddEditBulkMenuItemComponent, {
      width: '750px',
      panelClass: 'item-edit-panel',
      data: { item: foodItem, menuType: this.getCurrentMenuType(), isEdit: true },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((updatedItem) => {
      if (updatedItem) {
        this.bulkMenuList[index] = { ...updatedItem };
        this.changesMade = true;
      }
    });
  }

  addItem(): void {
    const newItem: any = {
      itemName: '',
      imageUrl: '',
      itemDescription: '',
      itemType: 'Veg',
      itemServingType: 'perUnit',
      slab1Price: 0,
      slab2Price: 0,
      slab3Price: 0,
      slab4Price: 0,
      payAmtToKitchen: 0
    };

    const dialogRef = this.dialog.open(AddEditBulkMenuItemComponent, {
      width: '750px',
      panelClass: 'item-edit-panel',
      data: { item: newItem, menuType: this.getCurrentMenuType() },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bulkMenuList.push(result);
        this.changesMade = true;
      }
    });
  }

  onDeleteItem(index: number, foodItem: CommonMenuItem): void {
    if (!confirm(`Are you sure you want to delete ${foodItem.itemName}?`)) return;
    this.bulkMenuList.splice(index, 1);
    this.changesMade = true;
  }

  openSlabDialog(): void {
    const dialogRef = this.dialog.open(BulkMenuSlabComponent, {
      width: '700px',
      panelClass: 'slab-dialog-panel',
      data: this.bulkMenuFetched,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        this.bulkMenuFetched = { ...this.bulkMenuFetched, ...updatedData };
        this.changesMade = true;
      }
    });
  }

  toggleSlabEdit(): void {
    this.slabEditMode = !this.slabEditMode;
    this.changesMade = true;
  }

  openAddItemDialog(): void {
    this.dialog.open(BulkItemSelectionComponent, {
      width: '900px',
      autoFocus: false,
      data: { menuType: this.getCurrentMenuType() }
    }).afterClosed().subscribe((selectedItems: any[]) => {
      if (selectedItems && selectedItems.length > 0) {
        this.prepareB2BMenuList(selectedItems);
      }
    });
  }

  prepareB2BMenuList(selected: any[]): void {
    const newItems: CommonMenuItem[] = selected.map((fooditem) => ({
      itemName: fooditem.itemName,
      imageUrl: fooditem.imageUrl,
      itemDescription: fooditem.itemDescription,
      itemFlavour: fooditem.itemFlavour,
      itemType: fooditem.itemType,
      itemServingType: fooditem.itemServingType,
      slab1Price: fooditem.slab1Price || 0,
      slab2Price: fooditem.slab2Price || 0,
      slab3Price: fooditem.slab3Price || 0,
      slab4Price: fooditem.slab4Price || 0,
      payAmtToKitchen: fooditem.payAmtToKitchen || 0,
      mainMenuItemId: fooditem._id,
      servingQuantity: fooditem.servingQuantity,
      servingQuantityUnit: fooditem.servingQuantityUnit,
      group: fooditem.group,
      packagingCost: fooditem.packagingCost,
      packagingDescription: fooditem.packagingDescription,
    }));
    this.bulkMenuList = [...this.bulkMenuList, ...newItems];
    this.changesMade = true;
  }

  async saveMenu(): Promise<void> {
    const config = this.getMenuConfig();
    const bulkMenuObj = {
      organization_id: this.orgObj._id,
      organization_name: this.orgObj.organization_name,
      cafeteriaId: this.selectedCafeteria.cafeteria_id || this.selectedCafeteria._id,
      cafeteriaName: this.selectedCafeteria.cafeteria_name,
      mainCategory: config.category,
      subCategory: config.subCategory,
      ...this.bulkMenuFetched,
      itemList: [...this.bulkMenuList],
    };

    try {
      const res = await this.api.saveCategoryBulkMenu(bulkMenuObj);
      if (res) {
        this.hasMenu.emit(true);
        this.changesMade = false;
        this.slabEditMode = false;
        await this.getMenuItems();
      } else {
        this.hasMenu.emit(false);
      }
    } catch (error) {
      console.error(`Error saving menu:`, error);
    }
  }


  disableSave(): boolean {
    if (!this.bulkMenuList.length) return true;
    const menuType = this.getCurrentMenuType();
    return this.bulkMenuList.some((item) => {
      if (!item.itemName) return true;
      if (['sweet', 'lux', 'pantry'].includes(menuType) && !item.itemDescription) return true;
      if (item.slab1Price == null || item.slab2Price == null || item.slab3Price == null || item.slab4Price == null) return true;
      if (item.itemServingType === 'perQuantity' && (!item.servingQuantity || !item.servingQuantityUnit)) return true;
      return false;
    });
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { CustomPipeModule } from "@pipes/pipe.module";
import { BulkItemSelectionComponent } from '../bulk-item-selection/bulk-item-selection.component';
import { BulkMenuSlabComponent } from './bulk-menu-slab/bulk-menu-slab.component';
import { BulkMenuItemEditComponent } from './bulk-menu-item-edit/bulk-menu-item-edit.component';

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
}

@Component({
  selector: 'app-bulk-general-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, CustomPipeModule],
  templateUrl: './bulk-general-menu.component.html',
  styleUrls: ['./bulk-general-menu.component.scss'],
})
export class BulkGeneralMenuComponent implements OnInit, OnChanges {
  @Input() orgObj!: Org;
  @Input() selectedCafeteria: any;
  @Input() menuType: 'cake' | 'sweet' | 'lux' | 'pantry' | 'bulkMeals' | 'individualMeals' | 'bulkSnacks' | 'individualSnacks' | 'predefinedFoodbox' | 'customizedFoodbox' = 'cake';
  @Input() isEmployeeMode: boolean = false;

  @Output() isVendorAssigned = new EventEmitter<boolean>();
  @Output() hasMenu = new EventEmitter<boolean>();

  bulkMenuList: CommonMenuItem[] = [];
  bulkMenuFetched: CommonMenuMeta = {};

  menuSearchText = '';
  imageUrl = environment.imageUrl;
  slabEditMode = false;
  changesMade = false;

  orgChoices: Org[] = [];

  slabFields = [
    { key: 'slab1Price' as const, label: 'Slab 1' },
    { key: 'slab2Price' as const, label: 'Slab 2' },
    { key: 'slab3Price' as const, label: 'Slab 3' },
    { key: 'slab4Price' as const, label: 'Slab 4' },
  ];

  constructor(private api: ApiMainService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchOrgChoices();
    this.getMenuItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCafeteria'] || changes['menuType'] || changes['isEmployeeMode']) {
      this.getMenuItems();
    }
  }

  getMenuConfig() {
    const config: any = {
      cake: {
        org: { fetch: 'B2B_fetchCakeMenu', save: 'B2B_saveCakeMenu', copy: 'b2b_fetchBulkCakeMenu', category: 'cake', subCategory: 'cakeMenu' },
        employee: { fetch: 'getEmployeeCakeMenu', save: 'saveEmployeeCakeMenu', copy: 'b2b_fetchBulkCakeMenu', category: 'cake', subCategory: 'employeecakeMenu' }
      },
      sweet: {
        org: { fetch: 'B2B_fetchSweetMenu', save: 'B2B_saveSweetMenu', copy: 'b2b_fetchBulkSweetMenu', category: 'sweet', subCategory: 'sweetMenu' },
        employee: { fetch: 'getEmployeeSweetMenu', save: 'saveEmployeeSweetMenu', copy: 'b2b_fetchBulkSweetMenu', category: 'sweet', subCategory: 'employeesweetMenu' }
      },
      lux: {
        org: { fetch: 'B2B_fetchLuxMenu', save: 'B2B_saveLuxMenu', copy: 'b2b_fetchBulkLuxMenu', category: 'lux', subCategory: 'luxMenu' },
        employee: { fetch: 'getEmployeeLuxMenu', save: 'saveEmployeeLuxMenu', copy: 'b2b_fetchBulkLuxMenu', category: 'lux', subCategory: 'employeeluxMenu' }
      },
      pantry: {
        org: { fetch: 'B2B_fetchPantryMenu', save: 'B2B_savePantryMenu', copy: 'b2b_fetchBulkSweetMenu', category: 'pantry', subCategory: 'pantryMenu' },
        employee: { fetch: 'getEmployeePantryMenu', save: 'saveEmployeePantryMenu', copy: 'b2b_fetchBulkSweetMenu', category: 'pantry', subCategory: 'employeepantryMenu' }
      },
      bulkMeals: {
        org: { fetch: 'B2B_fetchBulkMealMenu', save: 'B2B_saveBulkMealMenu', copy: 'B2B_fetchBulkMenu', category: 'meals', subCategory: 'bulkMealsMenu' },
        employee: { fetch: 'getEmployeeBulkMealMenu', save: 'saveEmployeeBulkMealMenu', copy: 'B2B_fetchBulkMenu', category: 'meals', subCategory: 'employeebulkMealsMenu' }
      },
      individualMeals: {
        org: { fetch: 'B2B_fetchIndividualMealMenu', save: 'B2B_saveIndividualMealMenu', copy: 'B2B_fetchIndividualMenu', category: 'meals', subCategory: 'individualMealsMenu' },
        employee: { fetch: 'getEmployeeIndividualMealMenu', save: 'saveEmployeeIndividualMealMenu', copy: 'B2B_fetchIndividualMenu', category: 'meals', subCategory: 'employeeindividualMealsMenu' }
      },
      bulkSnacks: {
        org: { fetch: 'B2B_fetchBulkSnackMenu', save: 'B2B_saveBulkSnacksMenu', copy: 'B2B_fetchBulkSnacksMenu', category: 'snacks', subCategory: 'bulkSnacksMenu' },
        employee: { fetch: 'getEmployeeBulkSnackMenu', save: 'saveEmployeeBulkSnackMenu', copy: 'B2B_fetchBulkSnacksMenu', category: 'snacks', subCategory: 'employeebulkSnacksMenu' }
      },
      individualSnacks: {
        org: { fetch: 'B2B_fetchIndividualSnacksMenu', save: 'B2B_saveIndividualSnacksMenu', copy: 'B2B_fetchIndividualSnacksMenu', category: 'snacks', subCategory: 'individualSnacksMenu' },
        employee: { fetch: 'getEmployeeIndividualSnackMenu', save: 'saveEmployeeIndividualSnackMenu', copy: 'B2B_fetchIndividualSnacksMenu', category: 'snacks', subCategory: 'employeeindividualSnacksMenu' }
      },
      predefinedFoodbox: {
        org: { fetch: 'B2B_fetchPredefinedFoodBoxMenu', save: 'B2B_savePredefinedFoodBoxMenu', copy: 'b2b_predefinedSnackboxFetch', category: 'foodbox', subCategory: 'predefinedSnackBoxMenu' },
        employee: { fetch: 'getEmployeePredefinedFoodBoxMenu', save: 'saveEmployeePredefinedFoodBoxMenu', copy: 'b2b_predefinedSnackboxFetch', category: 'foodbox', subCategory: 'employeepredefinedSnackBoxMenu' }
      },
      customizedFoodbox: {
        org: { fetch: 'B2B_fetchCustomizedFoodBoxMenu', save: 'B2B_saveCustomizedFoodBoxMenu', copy: 'b2b_customizedSnackboxFetch', category: 'foodbox', subCategory: 'customizedSnackBoxMenu' },
        employee: { fetch: 'getEmployeeCustomizedFoodBoxMenu', save: 'saveEmployeeCustomizedFoodBoxMenu', copy: 'b2b_customizedSnackboxFetch', category: 'foodbox', subCategory: 'employeecustomizedSnackBoxMenu' }
      }
    };
    return config[this.menuType][this.isEmployeeMode ? 'employee' : 'org'];
  }

  async getMenuItems(): Promise<void> {
    if (!this.selectedCafeteria) return;
    this.hasMenu.emit(false);
    const config = this.getMenuConfig();
    try {
      const menuItems: any = await (this.api as any)[config.fetch](this.selectedCafeteria.cafeteria_id);
      if (menuItems) {
        this.isVendorAssigned.emit(!!menuItems.vendorDetails);
        this.bulkMenuFetched = menuItems || {};
        this.bulkMenuList = menuItems.itemList || [];
        if (this.bulkMenuList.length > 0) this.hasMenu.emit(true);
      } else {
        this.isVendorAssigned.emit(false);
        this.bulkMenuFetched = {};
        this.bulkMenuList = [];
        this.hasMenu.emit(false);
      }
    } catch (error) {
      console.error(`Error fetching ${this.menuType} menu:`, error);
      this.hasMenu.emit(false);
    }
  }

  async fetchOrgChoices(): Promise<void> {
    try {
      const orgChoices = await this.api.getOrgList();
      this.orgChoices = orgChoices || [];
    } catch (error) {
      console.error('Error fetching org list:', error);
    }
  }

  editFoodItem(foodItem: CommonMenuItem, index: number): void {
    const dialogRef = this.dialog.open(BulkMenuItemEditComponent, {
      width: '750px',
      panelClass: 'item-edit-panel',
      data: { item: foodItem, menuType: this.menuType },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((updatedItem) => {
      if (updatedItem) {
        this.bulkMenuList[index] = { ...updatedItem };
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
      data: { menuType: this.menuType }
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
      cafeteriaId: this.selectedCafeteria.cafeteria_id,
      cafeteriaName: this.selectedCafeteria.cafeteria_name,
      mainCategory: config.category,
      subCategory: config.subCategory,
      ...this.bulkMenuFetched,
      itemList: [...this.bulkMenuList],
    };

    try {
      const res = await (this.api as any)[config.save](bulkMenuObj);
      if (res) {
        this.hasMenu.emit(true);
        this.changesMade = false;
        this.slabEditMode = false;
        await this.getMenuItems();
      } else {
        this.hasMenu.emit(false);
      }
    } catch (error) {
      console.error(`Error saving ${this.menuType} menu:`, error);
    }
  }

  disableSave(): boolean {
    if (!this.bulkMenuList.length) return true;
    return this.bulkMenuList.some((item) => {
      if (!item.itemName) return true;
      if (['sweet', 'lux', 'pantry'].includes(this.menuType) && !item.itemDescription) return true;
      if (item.slab1Price == null || item.slab2Price == null || item.slab3Price == null || item.slab4Price == null) return true;
      if (item.itemServingType === 'perQuantity' && (!item.servingQuantity || !item.servingQuantityUnit)) return true;
      return false;
    });
  }
}

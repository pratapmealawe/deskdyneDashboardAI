import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';


interface Org {
  _id: string;
  organization_name: string;
}

interface SnackMenuItem {
  itemName: string;
  imageUrl: string;
  itemType: 'Veg' | 'NonVeg' | 'Jain';
  itemServingType: 'perUnit' | 'perPerson' | 'perQuantity';
  servingQuantity?: number;
  servingQuantityUnit?: string;

  slab1Price: number;
  slab2Price: number;
  slab3Price: number;
  slab4Price: number;

  payAmtToKitchen: number;
  mainMenuItemId: string;

  edit?: boolean;
}

interface SnackMenuMeta {
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
  itemList?: SnackMenuItem[];
  vendorDetails?: any;
}

@Component({
  selector: 'app-employee-customized-foodbox-menu',
  templateUrl: './employee-customized-foodbox-menu.component.html',
  styleUrls: ['./employee-customized-foodbox-menu.component.scss']
})
export class EmployeeCustomizedFoodboxMenuComponent implements OnInit, OnChanges {
  @Input() orgObj!: Org;
  @Input() selectedCafeteria: any;
  @Output() isVendorAssigned = new EventEmitter<boolean>();
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  bulkMenuList: SnackMenuItem[] = [];
  snackMenuFetched: SnackMenuMeta = {};
  menuSearchText = '';
  searchText = '';
  imageUrl = environment.imageUrl;
  slabEditMode = false;
  changesMade = false;
  foodItemList: any[] = [];
  orgChoices: Org[] = [];
  orgSelected: string | null = null;
  selectedFoodItems: any[] = [];
  slabFields = [
    { key: 'slab1Price' as const, label: 'Slab 1' },
    { key: 'slab2Price' as const, label: 'Slab 2' },
    { key: 'slab3Price' as const, label: 'Slab 3' },
    { key: 'slab4Price' as const, label: 'Slab 4' },
  ];

  constructor(private api: ApiMainService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchOrgChoices();
    this.getEmployeeCustomizedSnackBoxMenuItems();
    this.getAllB2BFoodItemList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCafeteria']) {
      this.getEmployeeCustomizedSnackBoxMenuItems();
    }
  }

  async copyOrgMenu(): Promise<void> {
    try {
      if (!this.orgSelected) return;
      const menuItems: SnackMenuMeta =
        await this.api.b2b_customizedSnackboxFetch(this.orgSelected);
      this.snackMenuFetched = menuItems || {};
      this.bulkMenuList = menuItems.itemList || [];
    } catch (error) {
      console.error(error);
    }
  }

  async fetchOrgChoices(): Promise<void> {
    try {
      const orgChoices = await this.api.getOrgList();
      this.orgChoices = orgChoices || [];
    } catch (error) {
      console.error('cafeteria fetch error', error);
    }
  }

  async getEmployeeCustomizedSnackBoxMenuItems(): Promise<void> {
    try {
      const menuItems: SnackMenuMeta = await this.api.getEmployeeCustomizedFoodBoxMenu(this.selectedCafeteria._id);
      if (menuItems) {
        this.isVendorAssigned.emit(!!menuItems.vendorDetails);
        this.snackMenuFetched = menuItems || {};
        this.bulkMenuList = menuItems.itemList || [];
      } else {
        this.snackMenuFetched = {};
        this.bulkMenuList = [];
        this.isVendorAssigned.emit(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAllB2BFoodItemList(): Promise<void> {
    try {
      this.foodItemList = await this.api.getAllB2BFooditems();
    } catch (e) {
      console.error('error while fetching food items');
    }
  }

  editFoodItem(foodItem: SnackMenuItem): void {
    foodItem.edit = true;
    this.changesMade = true;
  }

  onDeleteItem(index: number, foodItem: SnackMenuItem): void {
    const ok = confirm(
      `Are you sure, you want to delete ${foodItem.itemName} item?`
    );
    if (!ok) return;
    this.bulkMenuList.splice(index, 1);
    this.changesMade = true;
  }

  toggleSlabEdit(): void {
    this.slabEditMode = !this.slabEditMode;
    this.changesMade = true;
  }

  openAddItemDialog(): void {
    this.selectedFoodItems = [];
    this.dialog
      .open(this.itemDialog, {
        width: '900px',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'add') {
          this.prepareB2BMenuList(this.selectedFoodItems);
        }
      });
  }

  prepareB2BMenuList(selected: any[]): void {
    const newItems: SnackMenuItem[] = selected.map((fooditem) => ({
      itemName: fooditem.itemName,
      imageUrl: fooditem.imageUrl,
      itemType: fooditem.itemType,
      itemServingType: fooditem.itemServingType,
      slab1Price: fooditem.slab1Price,
      slab2Price: fooditem.slab2Price,
      slab3Price: fooditem.slab3Price,
      slab4Price: fooditem.slab4Price,
      payAmtToKitchen: fooditem.payAmtToKitchen,
      mainMenuItemId: fooditem._id,
      servingQuantity: fooditem.servingQuantity,
      servingQuantityUnit: fooditem.servingQuantityUnit,
      edit: true,
    }));

    this.bulkMenuList = [...this.bulkMenuList, ...newItems];
    this.changesMade = true;
  }

  async editBulkMenu(): Promise<void> {
    const bulkMenuObj = {
      organization_id: this.orgObj._id,
      organization_name: this.orgObj.organization_name,
      cafeteriaId: this.selectedCafeteria._id,
      cafeteriaName: this.selectedCafeteria.cafeteria_name,
      mainCategory: 'foodbox',
      subCategory: 'employeecustomizedSnackBoxMenu',
      moq: this.snackMenuFetched.moq,
      slabLimit1: this.snackMenuFetched.slabLimit1,
      slabLimit2: this.snackMenuFetched.slabLimit2,
      slabLimit3: this.snackMenuFetched.slabLimit3,
      dateLimit1: this.snackMenuFetched.dateLimit1,
      dateLimit2: this.snackMenuFetched.dateLimit2,
      dateLimit3: this.snackMenuFetched.dateLimit3,
      slab1DeliveryPrice: this.snackMenuFetched.slab1DeliveryPrice,
      slab2DeliveryPrice: this.snackMenuFetched.slab2DeliveryPrice,
      slab3DeliveryPrice: this.snackMenuFetched.slab3DeliveryPrice,
      slab4DeliveryPrice: this.snackMenuFetched.slab4DeliveryPrice,
      itemList: [...this.bulkMenuList],
    };

    try {
      await this.api.saveEmployeeCustomizedFoodBoxMenu(bulkMenuObj);
      this.changesMade = false;
      this.slabEditMode = false;
      await this.getEmployeeCustomizedSnackBoxMenuItems();
    } catch (e) {
      console.error('error while saving employee customized foodbox menu', e);
    }
  }

  disableSave(): boolean {
    if (!this.bulkMenuList.length) return true;

    return this.bulkMenuList.some((item) => {
      if (!item.itemName) return true;
      if (
        item.slab1Price == null ||
        item.slab2Price == null ||
        item.slab3Price == null ||
        item.slab4Price == null
      ) {
        return true;
      }
      if (
        item.itemServingType === 'perQuantity' &&
        (!item.servingQuantity || !item.servingQuantityUnit)
      ) {
        return true;
      }
      return false;
    });
  }
}

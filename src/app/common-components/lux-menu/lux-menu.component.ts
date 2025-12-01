import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

interface Org {
  _id: string;
  organization_name: string;
}

interface LuxMenuItem {
  itemName: string;
  imageUrl: string;
  itemDescription: string;
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

interface LuxMenuMeta {
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
  itemList?: LuxMenuItem[];
}

@Component({
  selector: 'app-lux-menu',
  templateUrl: './lux-menu.component.html',
  styleUrls: ['./lux-menu.component.scss'],
})
export class LuxMenuComponent implements OnInit {
  @Input() orgObj!: Org;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;

  bulkMenuList: LuxMenuItem[] = [];
  bulkMenuFetched: LuxMenuMeta = {};

  menuSearchText = '';
  searchText = '';

  imageUrl = environment.imageUrl;

  slabEditMode = false;
  changesMade = false;

  foodItemList: any[] = [];
  orgChoices: Org[] = [];
  orgSelected: string | null = null;

  selectedFoodItems: any[] = [];

  // For looping slab fields in template
  slabFields = [
    { key: 'slab1Price' as const, label: 'Slab 1' },
    { key: 'slab2Price' as const, label: 'Slab 2' },
    { key: 'slab3Price' as const, label: 'Slab 3' },
    { key: 'slab4Price' as const, label: 'Slab 4' },
  ];

  constructor(private api: ApiMainService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchOrgChoices();
    this.getBulkMenuItems();
    this.getAllB2BFoodItemList();
  }

  async copyOrgMenu(): Promise<void> {
    try {
      if (!this.orgSelected) return;
      const menuItems: LuxMenuMeta =
        await this.api.b2b_fetchBulkLuxMenu(this.orgSelected);
      this.bulkMenuFetched = menuItems || {};
      this.bulkMenuList = menuItems.itemList || [];
    } catch (error) {
      console.log(error);
    }
  }

  async fetchOrgChoices(): Promise<void> {
    try {
      const orgChoices = await this.api.getOrgList();
      this.orgChoices = orgChoices || [];
    } catch (error) {
      console.log('cafeteria fetch error', error);
    }
  }

  async getBulkMenuItems(): Promise<void> {
    try {
      const menuItems: LuxMenuMeta =
        await this.api.b2b_fetchBulkLuxMenu(this.orgObj._id);
      this.bulkMenuFetched = menuItems || {};
      this.bulkMenuList = menuItems.itemList || [];
    } catch (error) {
      console.log(error);
    }
  }

  async getAllB2BFoodItemList(): Promise<void> {
    try {
      this.foodItemList = await this.api.getAllB2BFooditems();
      console.log(this.foodItemList);
    } catch (e) {
      console.log('error while fetching food items');
    }
  }

  editFoodItem(foodItem: LuxMenuItem): void {
    foodItem.edit = true;
    this.changesMade = true;
  }

  onDeleteItem(index: number, foodItem: LuxMenuItem): void {
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
    const newItems: LuxMenuItem[] = selected.map((fooditem) => ({
      itemName: fooditem.itemName,
      imageUrl: fooditem.imageUrl,
      itemDescription: fooditem.itemDescription,
      itemFlavour: fooditem.itemFlavour,
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
      packagingCost: fooditem.packagingCost,
      packagingDescription: fooditem.packagingDescription,
      group: fooditem.group,
      edit: true,
    }));

    this.bulkMenuList = [...this.bulkMenuList, ...newItems];
    this.changesMade = true;
  }

  async editBulkMenu(): Promise<void> {
    const bulkMenuObj = {
      companyName: this.orgObj.organization_name,
      companyId: this.orgObj._id,
      moq: this.bulkMenuFetched.moq,
      slabLimit1: this.bulkMenuFetched.slabLimit1,
      slabLimit2: this.bulkMenuFetched.slabLimit2,
      slabLimit3: this.bulkMenuFetched.slabLimit3,
      dateLimit1: this.bulkMenuFetched.dateLimit1,
      dateLimit2: this.bulkMenuFetched.dateLimit2,
      dateLimit3: this.bulkMenuFetched.dateLimit3,
      slab1DeliveryPrice: this.bulkMenuFetched.slab1DeliveryPrice,
      slab2DeliveryPrice: this.bulkMenuFetched.slab2DeliveryPrice,
      slab3DeliveryPrice: this.bulkMenuFetched.slab3DeliveryPrice,
      slab4DeliveryPrice: this.bulkMenuFetched.slab4DeliveryPrice,
      itemList: [...this.bulkMenuList],
    };

    try {
      console.log(bulkMenuObj);
      await this.api.b2b_updateBulkLuxMenu(bulkMenuObj);
      this.changesMade = false;
      this.slabEditMode = false;
      await this.getBulkMenuItems();
    } catch (e) {
      console.log('error while saving kitchen');
    }
  }

  disableSave(): boolean {
    if (!this.bulkMenuList.length) return true;

    return this.bulkMenuList.some((item) => {
      if (!item.itemName || !item.itemDescription) return true;
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

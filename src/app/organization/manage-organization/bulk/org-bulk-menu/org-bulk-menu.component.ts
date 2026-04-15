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
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { environment } from 'src/environments/environment';

interface Org {
  _id: string;
  organization_name: string;
}

interface BulkMenuItem {
  itemName: string;
  imageUrl: string;
  itemFlavour: string;
  itemType: 'Veg' | 'NonVeg' | 'Jain';
  itemServingType: 'perUnit' | 'perPerson' | 'perQuantity';
  servingQuantity?: number;
  servingQuantityUnit?: string;
  itemDescription: string;

  slab1Price: number;
  slab2Price: number;
  slab3Price: number;
  slab4Price: number;

  payAmtToKitchen: number;
  mainMenuItemId: string;
  edit?: boolean;
}

interface BulkMenuMeta {
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
  itemList?: BulkMenuItem[];
  vendorDetails?: any;
}

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { CustomPipeModule } from "../../../../../pipes/pipe.module";

@Component({
  selector: 'app-org-bulk-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, CustomPipeModule],
  templateUrl: './org-bulk-menu.component.html',
  styleUrls: ['./org-bulk-menu.component.scss'],
})
export class OrgBulkMenuComponent implements OnInit, OnChanges {
  @Input() orgObj!: Org;
  @Input() selectedCafeteria: any;
  @Output() isVendorAssigned = new EventEmitter<boolean>();
  @Output() hasMenu = new EventEmitter<boolean>();
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;

  bulkMenuList: BulkMenuItem[] = [];
  bulkMenuFetched: BulkMenuMeta = {};

  menuSearchText = '';
  searchText = '';

  imageUrl = environment.imageUrl;

  slabEditMode = false;
  changesMade = false;

  foodItemList: any[] = [];
  orgChoices: Org[] = [];
  orgSelected: string | null = null;

  selectedFoodItems: any[] = [];

  // for looping slab fields in template
  slabFields = [
    { key: 'slab1Price' as const, label: 'Slab 1' },
    { key: 'slab2Price' as const, label: 'Slab 2' },
    { key: 'slab3Price' as const, label: 'Slab 3' },
    { key: 'slab4Price' as const, label: 'Slab 4' },
  ];

  constructor(
    private api: ApiMainService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchOrgChoices();
    // this.getBulkMenuItems();
    this.getAllB2BFoodItemList();
    this.getBulkMenuItemsByCafeteriaId();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCafeteria']) {
      this.getBulkMenuItemsByCafeteriaId();
    }
  }

  async copyOrgMenu(): Promise<void> {
    if (!this.orgSelected) return;
    try {
      const menuItems: BulkMenuMeta = await this.api.B2B_fetchBulkMenu(
        this.orgSelected
      );
      this.bulkMenuFetched = menuItems || {};
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
      console.error('org fetch error', error);
    }
  }

  // async getBulkMenuItems(): Promise<void> {
  //   if (!this.orgObj?._id) return;
  //   try {
  //     const menuItems: BulkMenuMeta = await this.api.B2B_fetchBulkMenu(
  //       this.orgObj._id
  //     );
  //     this.bulkMenuFetched = menuItems || {};
  //     this.bulkMenuList = menuItems.itemList || [];
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async getBulkMenuItemsByCafeteriaId(): Promise<void> {
    if (!this.selectedCafeteria) return;
    try {
      this.hasMenu.emit(false);
      const menuItems: BulkMenuMeta = await this.api.B2B_fetchBulkMealMenu(this.selectedCafeteria.cafeteria_id);
      if (menuItems) {
        this.isVendorAssigned.emit(!!menuItems.vendorDetails);
        this.bulkMenuFetched = menuItems || {};
        this.bulkMenuList = menuItems.itemList || [];
        if (this.bulkMenuList.length > 0) this.hasMenu.emit(true);
      } else {
        this.bulkMenuFetched = {};
        this.bulkMenuList = [];
        this.isVendorAssigned.emit(false);
        this.hasMenu.emit(false);
      }
    } catch (error) {
      console.error(error);
      this.hasMenu.emit(false);
    }
  }

  async getAllB2BFoodItemList(): Promise<void> {
    try {
      this.foodItemList = await this.api.getAllB2BFooditems();
    } catch (error) {
      console.error('error while fetching food items', error);
    }
  }

  editFoodItem(foodItem: BulkMenuItem): void {
    foodItem.edit = true;
    this.changesMade = true;
  }

  onDeleteItem(index: number, foodItem: BulkMenuItem): void {
    const ok = confirm(
      `Are you sure you want to delete ${foodItem.itemName}?`
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
    // clear selection
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
    const newItems: BulkMenuItem[] = selected.map((fooditem) => ({
      itemName: fooditem.itemName,
      imageUrl: fooditem.imageUrl,
      itemFlavour: fooditem.itemFlavour,
      itemType: fooditem.itemType,
      itemServingType: fooditem.itemServingType,
      itemDescription: fooditem.itemDescription,
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
      cafeteriaId: this.selectedCafeteria.cafeteria_id,
      cafeteriaName: this.selectedCafeteria.cafeteria_name,
      mainCategory: 'meals',
      subCategory: 'bulkMealsMenu',
      moq: this.bulkMenuFetched.moq,
      slabLimit1: this.bulkMenuFetched.slabLimit1,
      slabLimit2: this.bulkMenuFetched.slabLimit2,
      slabLimit3: this.bulkMenuFetched.slabLimit3,
      dateLimit1: this.bulkMenuFetched.dateLimit1,
      dateLimit2: this.bulkMenuFetched.dateLimit2,
      dateLimit3: this.bulkMenuFetched.dateLimit3,
      slab1DeliveryPrice: this.bulkMenuFetched.slab1DeliveryPrice ?? 0,
      slab2DeliveryPrice: this.bulkMenuFetched.slab2DeliveryPrice ?? 0,
      slab3DeliveryPrice: this.bulkMenuFetched.slab3DeliveryPrice ?? 0,
      slab4DeliveryPrice: this.bulkMenuFetched.slab4DeliveryPrice ?? 0,
      itemList: [...this.bulkMenuList],
    };

    try {
      const res = await this.api.B2B_saveBulkMealMenu(bulkMenuObj);
      if (res) {
        this.changesMade = false;
        this.slabEditMode = false;
        this.hasMenu.emit(true);
        await this.getBulkMenuItemsByCafeteriaId();
      } else {
        this.hasMenu.emit(false);
      }
    } catch (error) {
      console.error('error while saving bulk menu', error);
    }
  }

  disableSave(): boolean {
    if (!this.bulkMenuList.length) return true;

    return this.bulkMenuList.some((item) => {
      if (!item.itemName || !item.itemDescription) {
        return true;
      }
      if (
        item.slab1Price == null ||
        item.slab2Price == null ||
        item.slab3Price == null ||
        item.slab4Price == null
      ) {
        return true;
      }
      return false;
    });
  }
}



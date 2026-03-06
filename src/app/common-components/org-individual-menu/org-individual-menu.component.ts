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

interface IndMenuItem {
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

interface IndMenuMeta {
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
  itemList?: IndMenuItem[];
  vendorDetails?: any;
}

@Component({
  selector: 'app-org-individual-menu',
  templateUrl: './org-individual-menu.component.html',
  styleUrls: ['./org-individual-menu.component.scss'],
})
export class OrgIndividualMenuComponent implements OnInit, OnChanges {
  @Input() orgObj!: Org;
  @Input() selectedCafeteria: any;
  @Output() isVendorAssigned = new EventEmitter<boolean>();
  @Output() hasMenu = new EventEmitter<boolean>();
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;

  bulkMenuList: IndMenuItem[] = [];
  indMenuFetched: IndMenuMeta = {};

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
    this.getIndividualMenuItemsByCafeteriaId();
    this.getAllB2BFoodItemList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCafeteria']) {
      this.getIndividualMenuItemsByCafeteriaId();
    }
  }


  async copyOrgMenu(): Promise<void> {
    if (!this.orgSelected) return;
    try {
      const menuItems: IndMenuMeta = await this.api.B2B_fetchIndividualMenu(
        this.orgSelected
      );
      this.indMenuFetched = menuItems || {};
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

  // async getIndividualMenu(): Promise<void> {
  //   if (!this.orgObj?._id) return;
  //   try {
  //     const menuItems: IndMenuMeta = await this.api.B2B_fetchIndividualMenu(
  //       this.orgObj._id
  //     );
  //     this.indMenuFetched = menuItems || {};
  //     this.bulkMenuList = menuItems.itemList || [];
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  async getIndividualMenuItemsByCafeteriaId(): Promise<void> {
    if (!this.selectedCafeteria) return;
    try {
      this.hasMenu.emit(false);
      const menuItems: IndMenuMeta = await this.api.B2B_fetchIndividualMealMenu(this.selectedCafeteria.cafeteria_id);
      if (menuItems) {
        this.isVendorAssigned.emit(!!menuItems.vendorDetails);
        this.indMenuFetched = menuItems || {};
        this.bulkMenuList = menuItems.itemList || [];
        if (this.bulkMenuList.length > 0) this.hasMenu.emit(true);
      } else {
        this.indMenuFetched = {};
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
    } catch (e) {
      console.error('error while fetching food items');
    }
  }

  editFoodItem(foodItem: IndMenuItem): void {
    foodItem.edit = true;
    this.changesMade = true;
  }

  onDeleteItem(index: number, foodItem: IndMenuItem): void {
    const ok = confirm(`Are you sure, you want to delete ${foodItem.itemName} item?`);
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
    const newItems: IndMenuItem[] = selected.map((fooditem) => ({
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
      subCategory: 'individualMealsMenu',
      moq: this.indMenuFetched.moq,
      slabLimit1: this.indMenuFetched.slabLimit1,
      slabLimit2: this.indMenuFetched.slabLimit2,
      slabLimit3: this.indMenuFetched.slabLimit3,
      dateLimit1: this.indMenuFetched.dateLimit1,
      dateLimit2: this.indMenuFetched.dateLimit2,
      dateLimit3: this.indMenuFetched.dateLimit3,
      slab1DeliveryPrice: this.indMenuFetched.slab1DeliveryPrice ?? 0,
      slab2DeliveryPrice: this.indMenuFetched.slab2DeliveryPrice ?? 0,
      slab3DeliveryPrice: this.indMenuFetched.slab3DeliveryPrice ?? 0,
      slab4DeliveryPrice: this.indMenuFetched.slab4DeliveryPrice ?? 0,
      itemList: [...this.bulkMenuList],
    };

    try {
      const res = await this.api.B2B_saveIndividualMealMenu(bulkMenuObj);
      if (res) {
        this.hasMenu.emit(true);
        this.changesMade = false;
        this.slabEditMode = false;
        await this.getIndividualMenuItemsByCafeteriaId();
      } else {
        this.hasMenu.emit(false);
      }
    } catch (error) {
      console.error('error while saving individual menu', error);
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

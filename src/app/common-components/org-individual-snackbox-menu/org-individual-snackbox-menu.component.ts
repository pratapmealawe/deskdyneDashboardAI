import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
// import { DdApiMainService } from 'src/service/apiService/ddApiMain.service';

@Component({
  selector: 'app-org-individual-snackbox-menu',
  templateUrl: './org-individual-snackbox-menu.component.html',
  styleUrls: ['./org-individual-snackbox-menu.component.scss']
})
export class OrgIndividualSnackboxMenuComponent {
  @Input() orgObj: any;
  @ViewChild("content") content: any;
  bulkMenuList: any;
  menuSearchText: any = '';
  searchText: any = '';
  imageUrl: any = environment.imageUrl;
  changesMade = false;
  editMode = false;
  indSnacksMenuFetched: any;
  slabEditMode = false;
  foodItemList: any;
  orgChoices: any;
  orgSelected: any
  index: any;

  constructor(private ddApiMainService: ApiMainService, private modalService: NgbModal, private confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
    console.log(this.orgObj)
    this.fetchOrgChoices();
    this.getIndSnackMenuItems();
    this.getAllB2BFoodItemList();
  }

  async copyOrgMenu() {
    try {
      if (this.orgSelected) {
        const menuItems = await this.ddApiMainService.B2B_fetchIndSnacksMenu(this.orgSelected);
        console.log(menuItems)
        this.indSnacksMenuFetched = menuItems;
        if (this.indSnacksMenuFetched) {
          this.bulkMenuList = menuItems.itemList ? menuItems.itemList : [];
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async fetchOrgChoices() {
    try {
      const orgChoices = await this.ddApiMainService.getOrgList();
      if (orgChoices && orgChoices.length > 0) {
        this.orgChoices = orgChoices;
        console.log(orgChoices)
      }
    } catch (error) {
      console.log('cafeteria fetch error', error)
    }
  }

  async getIndSnackMenuItems() {
    try {
      console.log(this.orgObj._id)
      const menuItems = await this.ddApiMainService.B2B_fetchIndSnacksMenu(this.orgObj._id);
      this.indSnacksMenuFetched = menuItems;
      console.log(menuItems)
      if (this.indSnacksMenuFetched) {
        this.bulkMenuList = menuItems.itemList ? menuItems.itemList : [];
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllB2BFoodItemList() {
    try {
      this.foodItemList = await this.ddApiMainService.getAllB2BFooditems();
      console.log(this.foodItemList)
    } catch (e) {
      console.log('error while fetching food itmem')
    }
  }

  editFoodItem(foodItem: any) {
    foodItem.edit = true;
    this.changesMade = true;
  }

  deleteFoodItem() {
    this.bulkMenuList.splice(this.index, 1);
    if (this.bulkMenuList.length === 0) {
      this.editBulkMenu();
    }
  }

  showPopup(foodItem: any, i: any) {
    this.index = i;
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${foodItem.itemName} Item`,
      this.deleteFoodItem,
      this
    );
  }

  onItemPriceBlur(item: any) {

  }

  addB2BFoodItem() {
    this.editMode = true;
    this.changesMade = true;
    this.open();
  }

  open() {
    this.foodItemList = [...this.foodItemList].map(ele => { ele.selected = false; return ele; })
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', windowClass: 'menuModel' })
      .result.then((result) => {
        console.log(`Closed with: ${result}`, this.foodItemList);
        if (result === 'add') {
          this.prepareB2BMenuList(this.foodItemList);
        }
      }, (reason) => {
        console.log(`Model Dismissed`);
      });
  }

  prepareB2BMenuList(fooditemList: any) {
    [...fooditemList].forEach((fooditem: any) => {
      if (fooditem.selected) {
        this.bulkMenuList.push({
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
          packagingCost: fooditem.packagingCost,
          packagingDescription: fooditem.packagingDescription,
          edit: true
        });
      }
    })

    console.log(this.bulkMenuList)
  }

  // editSlabs(){
  //   this.slabEditMode = true;
  // }

  async editBulkMenu() {
    const bulkMenuObj = {
      companyName: this.orgObj.organization_name,
      companyId: this.orgObj._id,
      moq: this.indSnacksMenuFetched.moq,
      slabLimit1: this.indSnacksMenuFetched.slabLimit1,
      slabLimit2: this.indSnacksMenuFetched.slabLimit2,
      slabLimit3: this.indSnacksMenuFetched.slabLimit3,
      dateLimit1: this.indSnacksMenuFetched.dateLimit1,
      dateLimit2: this.indSnacksMenuFetched.dateLimit2,
      dateLimit3: this.indSnacksMenuFetched.dateLimit3,
      itemList: [...this.bulkMenuList]
    };
    try {
      console.log(bulkMenuObj)
      await this.ddApiMainService.B2B_Ind_SnackMenuAdd(bulkMenuObj);
      this.editMode = false;
      this.changesMade = false;
      this.slabEditMode = false;
      this.getIndSnackMenuItems();
    } catch (e) {
      console.log('error while saving kitchen')
    }
  }

  disableSave() {
    console.log('disableSave ###',)
    let disable = false;
    if (this.bulkMenuList.length === 0) {
      disable = true;
    } else {
      this.bulkMenuList.forEach((ele: any) => {
        if (!ele.itemName || !ele.itemDescription) {
          disable = true
        }
        if (!ele.itemPrice) {
          disable = true
        }
        if (!ele.tasteOfRegion) {
          disable = true
        }
        if (ele.itemServingType === 'perQuantity' && (!ele.servingQuantity || !ele.servingQuantityUnit)) {
          disable = true
        }
      });
    }
    return disable;
  }

}

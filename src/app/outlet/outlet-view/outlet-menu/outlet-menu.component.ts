import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { categoryList } from 'src/config/food-category.config';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-outlet-menu',
  templateUrl: './outlet-menu.component.html',
  styleUrls: ['./outlet-menu.component.scss'],
})
export class OutletMenuComponent implements OnInit, OnChanges {
  @Input() outletObj: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') content: any;
  @ViewChild('comboContent') comboContent: any;
  @ViewChild('masterMenu') masterMenu: any;
  @ViewChild('selectOutletModal') selectOutletModal: any;
  @Output() dataToParent = new EventEmitter<string>();
  categoryList = categoryList;
  modalRef!: NgbModalRef;
  categorySelected: boolean = false;
  form: any;
  selectedCategory: any;
  uploadedImageFile: any;
  imageUrl: any;
  displayImgUrl = environment.imageUrl;
  showCard: any = false;
  menuList: any = [];
  // menuIndex: any = 0;
  selectedOutlet: any = null;
  selectedMenuItems: any[] = [];
  outletMenuList: any = []
  transformedMenuItems: any[] = [];

  menuId: any = 0;
  showUpdateBtn: any = false;
  imageReplaced: any = false;
  uploadStatus: any = false;
  noImages: boolean = false;
  foodItem: any;
  btnPolicy: any;
  filteredMenuList: any[] = []
  filteredMasterMenuList: any[] = []
  outletList: any = [];
  tempList: any;
  selectedMasterItem: any = null;
  selectedItems: any[] = [];
  menuInfo: any;
  eventInfo: any;
  tempMenuList: any;
  searchTerm: string = '';
  groupedMenuList: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService,
    private sendDataToComponent: SendDataToComponent
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.fetchOutletMasterMenus();
    this.fetchAllOutlets();
    this.init();
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.outletObj = changes['outletObj'].currentValue;
    this.init();
  }

  init() {
    if (this.outletObj.menuList && this.outletObj.menuList.length > 0) {
      this.filteredMenuList = this.outletObj.menuList.sort((a: any, b: any) => a.precedence - b.precedence)
      this.showCard = true;
    } else {
      this.filteredMenuList = []
    }

    this.groupItemsByCategory();

  }

  async fetchAllOutlets() {

    const res = await this.apiMainService.fetchAllOutlets();
    console.log(res);
    this.outletList = res;

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

    console.log(this.groupedMenuList);

  }

  onOutletChange() {
    console.log('Selected Outlet Object:', this.selectedOutlet.menuList);
    this.outletMenuList = this.selectedOutlet.menuList;

  }


  preventInvalidNumber(e: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(e.key)) e.preventDefault();
  }

  preventInvalidPaste(e: ClipboardEvent, type: "integer" | "decimal" = "integer") {
    const text = e.clipboardData?.getData('text') ?? '';
    if (type === "integer") {
      if (!/^[1-9]\d*$/.test(text)) e.preventDefault();
    } else {
      if (!/^\d+(\.\d+)?$/.test(text)) e.preventDefault();
    }
  }

  patchFormValue(item: any) {
    console.log(item, "item");
    this.form.patchValue({
      itemName: item.itemName,
      price: item.price,
      subsidy: item.subsidy ? item.subsidy : 0,
      category: item.category,
      mealTimingInfo: item.mealTimingInfo
        ? item.mealTimingInfo.map((a: any) => a.mealType)
        : [],
      itemType: item.itemType,
      precedence: item.precedence,
      isActive: item.isActive,
      doNotChangeInFuture: item.doNotChangeInFuture,
      description: item.description,
      itemContains: item.itemContains,
      energyValue: item.nutritionInfo ? item.nutritionInfo.energyValue : 0,
      nutritionList: item.nutritionInfo ? [...item.nutritionInfo.nutritionList] : []
    });
    if (item.nutritionInfo && item.nutritionInfo.nutritionList?.length) {
      this.nutrition_Lists.clear();
      item.nutritionInfo.nutritionList.forEach((nutrition: any, index: number) => {
        this.nutrition_Lists.push(this.fb.group(nutrition));
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      itemName: [''],
      price: [''],
      subsidy: [0],
      category: [''],
      subCategory: [''],
      mealTimingInfo: [[]],
      itemType: ['Veg'],
      precedence: [0],
      isActive: [false],
      description: [''],
      doNotChangeInFuture: [false],
      itemContains: [[]],
      energyValue: [10],
      nutritionList: this.fb.array([
        this.fb.group({
          nutritionName: [''],
          nutritionValue: [''],
          nutritionUnit: ['']
        })
      ])

    });
  }


  get nutrition_Lists(): FormArray {
    return this.form.get('nutritionList') as FormArray;
  }

  addNutritionLists() {
    this.nutrition_Lists.push(this.fb.group({
      nutritionName: [''],
      nutritionValue: [''],
      nutritionUnit: ['']
    }));
  }

  removenNutritionLists(index: number) {
    this.nutrition_Lists.removeAt(index);
  }

  setCategory(event: any) {
    this.selectedCategory = event.target.value;
    this.categorySelected = true;
  }

  onItemSelected(item: any) {
    this.selectedMasterItem = item;
    console.log('Selected Master Menu Item:', item);
  }

  applyFilter() {
    let tempList = [...this.tempList];

    if (this.selectedCategory) {
      tempList = tempList.filter(
        (data) => data.category === this.selectedCategory
      );
    }

    if (this.searchTerm) {
      tempList = tempList.filter(
        (data) =>
          (data.itemName?.toLowerCase() || '').includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredMasterMenuList = tempList;
  }


  async fetchOutletMasterMenus() {
    try {
      const res = await this.apiMainService.getAllOutletMasterMenus();
      console.log(res);
      if (res) {
        this.filteredMasterMenuList = res;
        this.tempList = this.filteredMasterMenuList;
        console.log(this.filteredMasterMenuList);

      }
    }
    catch (e) {
      console.log('error while fetching outlet master menus')
    }
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const modalRef: NgbModalRef = this.modalService.open(
              ImageCropperComponent,
              {
                ariaLabelledBy: 'modal-basic-title',
                size: 'xl',
                backdrop: 'static',
                centered: true,
              }
            );
            modalRef.result.then(
              (result: any) => {
                if (result && result.croppedImages) {
                  this.uploadedImageFile = result.croppedImages.file;
                  this.imageUrl = result.croppedImages.resizeDataUrl;
                  // console.log(imageUrl);
                  this.uploadStatus = true;
                  this.imageReplaced = true;
                }
              },
              (reason: any) => {
                console.log(`Model Dismissed`);
              }
            );
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
          } catch (e) {
            console.log('error while changes kitchen opened status ', e);
          }
        };
      }
    }
  }

  async edit(item: any, index: any) {
    this.imageUrl = item.imageUrl;
    this.showUpdateBtn = true;
    // this.menuIndex = index;
    this.menuId = item._id;

    this.patchFormValue(item);
    this.open();
  }

  async addMasterMenu() {

    if (this.modalRef) {
      this.modalRef.close();
    }

    this.imageReplaced = true;
    this.uploadStatus = false;
    this.imageUrl = this.selectedMasterItem?.imageUrl;
    try {
      const res = await this.apiMainService.addOutletList(this.outletObj._id, { outletList: this.selectedItems })
      this.selectedItems = [];
      this.dataToParent.emit(res);
    }
    catch (err) {
      console.log(err);

    }
    this.form.patchValue(this.selectedMasterItem);
  }

  async addMenuItem() {

    if (this.modalRef) {
      this.modalRef.close();
    }

    this.imageReplaced = true;
    this.uploadStatus = false;
    this.imageUrl = this.selectedMasterItem?.imageUrl;
    try {
      const res = await this.apiMainService.addOutletList(this.outletObj._id, { outletList: this.transformedMenuItems })
      this.transformedMenuItems = [];
      this.selectedMenuItems = [];
      this.dataToParent.emit(res);
    }
    catch (err) {
      console.log(err);
    }
    this.form.patchValue(this.selectedMasterItem);
  }

  async updateMenu(index: any) {
    if ((typeof this.form.value.subsidy === "undefined") ||
      this.form.value.subsidy === null ||
      this.form.value.subsidy === ''
    ) {
      this.form.patchValue({ subsidy: 0 });
    }
    try {
      // const menuId = this.outletObj.menuList[index]._id;
      const outletId = this.outletObj._id;
      const formData = new FormData();
      if (this.imageUrl) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageUrl', this.form.value.imageUrl);
      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('quantityAvailable', this.form.value.quantityAvailable);
      formData.append('setDailyQuantity', this.form.value.setDailyQuantity);
      formData.append('subsidy', this.form.value.subsidy);
      formData.append('doNotChangeInFuture', this.form.value.doNotChangeInFuture);
      formData.append('itemContains', JSON.stringify(this.form.value.itemContains));
      formData.append('category', this.form.value.category);
      formData.append('subCategory', this.form.value.subCategory);
      formData.append('itemType', this.form.value.itemType);
      formData.append('precedence', this.form.value.precedence);

      let mealTypes = this.form.value.mealTimingInfo;

      const updatedMeal = this.outletObj.mealTiming.filter((meal: any) =>
        mealTypes.includes(meal.mealType)
      );

      formData.append('mealTimingInfo', JSON.stringify(updatedMeal));
      const nutritionInfo = {
        energyValue: this.form.value.energyValue,
        nutritionList: this.form.value.nutritionList
      };
      formData.append('nutritionInfo', JSON.stringify(nutritionInfo));
      console.log(this.form.value, "formData");
      const res = await this.apiMainService.updateOutletMenu(
        outletId,
        this.menuId,
        formData
      );

      if (res && res._id) {
        this.outletObj = res;
        this.init()
      }

      this.resetValues();
    } catch (error) {
      console.log(error);
    }
  }

  resetValues() {
    this.form.reset();
    // this.menuIndex = 0;
    this.menuId = '';

    this.imageUrl = '';
    this.uploadedImageFile = '';
    this.showUpdateBtn = false;
    this.imageReplaced = false;
    this.noImages = false;
    this.nutrition_Lists.clear();
    this.addNutritionLists();
  }

  async submit() {
    console.log(this.form.value);

    try {
      const formData: any = new FormData();
      if (this.imageUrl) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageUrl', this.imageUrl);
      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive ? this.form.value.isActive : false);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('quantityAvailable', this.form.value.quantityAvailable ? this.form.value.quantityAvailable : 0);
      formData.append('setDailyQuantity', this.form.value.setDailyQuantity ? this.form.value.setDailyQuantity : 0);
      formData.append('subsidy', this.form.value.subsidy ? this.form.value.subsidy : 0);
      formData.append('doNotChangeInFuture', this.form.value.doNotChangeInFuture ? this.form.value.doNotChangeInFuture : false);
      formData.append('itemContains', JSON.stringify(this.form.value.itemContains));
      formData.append('category', this.form.value.category);
      formData.append('subCategory', this.form.value.subCategory);
      formData.append('itemType', this.form.value.itemType);
      formData.append('precedence', this.form.value.precedence ? this.form.value.precedence : 0);

      let mealTypes = this.form.value.mealTimingInfo;

      const updatedMeal = this.outletObj.mealTiming.filter((meal: any) =>
        mealTypes?.includes(meal.mealType)
      );

      formData.append('mealTimingInfo', JSON.stringify(updatedMeal));
      const nutritionInfo = {
        energyValue: this.form.value.energyValue,
        nutritionList: this.form.value.nutritionList
      };
      formData.append('nutritionInfo', JSON.stringify(nutritionInfo));

      const res = await this.apiMainService.addOutletMenu(
        formData,
        this.outletObj._id
      );

      if (res && res._id) {
        this.outletObj = res;
        this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);
        this.init()
      }
      this.resetValues();
    } catch (error) {
      console.log(error);
    }
  }

  objectToFormData(obj: any, formData = new FormData(), parentKey = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keyName = parentKey ? `${parentKey}[${key}]` : key;
        if (
          typeof obj[key] === 'object' &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          this.objectToFormData(obj[key], formData, keyName);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item: any, index: any) => {
            if (typeof item === 'object' && item !== null) {
              this.objectToFormData(item, formData, `${keyName}[${index}]`);
            } else {
              formData.append(`${keyName}[${index}]`, item);
            }
          });
        } else {
          formData.append(keyName, obj[key]);
        }
      }
    }
    return formData;
  }

  open() {
    this.selectedMasterItem = null;
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          if (result === 'add') {
            this.submit();
          } else if (result === 'update') {
            this.updateMenu(this.menuId);
          }
        },
        (reason) => {
          console.log(`Model Dismissed`);
        }
      );
  }

  openMenu() {
    this.modalRef = this.modalService.open(this.masterMenu, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl'
    });

    this.modalRef.result.then(
      (result) => {
      },
      (reason) => {
        this.selectedItems = [];
        this.selectedMenuItems = [];
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  openOutlet() {

    this.modalRef = this.modalService.open(this.selectOutletModal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl'
    });

    this.modalRef.result.then(
      (result) => {
        this.transformedMenuItems = []
      },
      (reason) => {
        this.transformedMenuItems = [];
        this.selectedMenuItems = [];
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  showPopup(item: any, i: any) {
    this.foodItem = item;
    // this.menuIndex = i;
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${item.itemName}`,
      this.deleteFoodItem,
      this
    );
  }


  onItemToggle(item: any, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i._id !== item._id);
    }
    console.log(this.selectedItems);
  }

  onMenuItemToggle(item: any, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedMenuItems.push(item);
    } else {
      this.selectedMenuItems = this.selectedMenuItems.filter(
        (i: any) => i._id !== item._id
      );
    }

    this.transformedMenuItems = this.selectedMenuItems.map(item => {
      return {
        ...item,
        mealTimingInfo: item.mealTimingInfo.map((info: any) => info.mealType)
      };
    });
  }

  isSelected(item: any): boolean {
    return this.selectedItems.find(i => i._id === item._id) !== undefined;
  }

  isMenuSelected(item: any): boolean {
    return this.transformedMenuItems.find(i => i._id === item._id) !== undefined;
  }

  async deleteFoodItem() {
    const res: any = await this.apiMainService.deleteOutletMenu(
      this.outletObj._id,
      this.foodItem._id
    );
    if (res && res._id) {
      console.log(res);
      this.outletObj = res;
      this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);

      this.showCard = true;
      this.init();
    }
    this.resetValues();
    this.back.emit(true);
  }

  async changeMenuActivation() {
    let menu = this.menuInfo;
    let event = this.eventInfo;
    menu.isActive = event.target.checked;

    const menuObj = {
      isActive: event.target.checked,
    };

    let outletmenu = await this.apiMainService.changeMenuActivation(
      this.outletObj._id,
      menu._id,
      menuObj
    );
  }

  showPopupForItemActivation(menu: any, event: any) {
    this.menuInfo = menu;
    this.eventInfo = event;
    this.confirmationModalService.modal(
      `Are you sure, you want to ${event.target.checked ? 'Enable' : 'Disable'} ${menu.itemName} Item`,
      this.changeMenuActivation,
      this
    );
  }

  defineDescription() {
    this.modalService
      .open(this.comboContent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
      })
      .result.then((result) => { });
  }

  comboout(event: any) {
    if (event) {
      this.createComboDescription(event);
    }
  }

  createComboDescription(comboItem: any) {
    let description = '';
    let comboType = '';
    let descriptionArr = [];
    let itemContains = [];
    if (comboItem.vegCurry.selected) {
      comboItem.vegCurry.curryList.forEach((curry: any) => {
        descriptionArr.push(`${curry.size} ${curry.curryName}`);
        itemContains.push({
          name: curry.curryName,
          quantity: curry.size,
          contentType: 'VegCurry',
        });
      });
    }
    if (comboItem.nonVegCurry.selected) {
      comboItem.nonVegCurry.curryList.forEach((curry: any) => {
        descriptionArr.push(`${curry.size} ${curry.curryName}`);
        itemContains.push({
          name: curry.curryName,
          quantity: curry.size,
          contentType: 'NonVegCurry',
        });
      });
    }
    if (comboItem.rice.selected) {
      descriptionArr.push(comboItem.rice.size + ' Rice');
      itemContains.push({
        name: 'Rice',
        quantity: comboItem.rice.size,
        contentType: 'Rice',
      });
    }
    if (comboItem.chapati.selected) {
      descriptionArr.push(
        comboItem.chapati.count + ` ${comboItem.chapati.chapatiName}`
      );
      itemContains.push({
        name: comboItem.chapati.chapatiName,
        quantity: comboItem.chapati.count,
        contentType: 'Chapati',
      });
    }
    if (comboItem.dal.selected) {
      descriptionArr.push(comboItem.dal.size + ' Dal');
      itemContains.push({
        name: 'Dal',
        quantity: comboItem.dal.size,
        contentType: 'Dal',
      });
    }
    if (comboItem.sweet.selected) {
      descriptionArr.push('Sweet');
      itemContains.push({
        name: 'Sweet',
        quantity: undefined,
        contentType: 'Sweet',
      });
    }
    if (comboItem.salad.selected) {
      descriptionArr.push('Salad');
      itemContains.push({
        name: 'Salad',
        quantity: undefined,
        contentType: 'Salad',
      });
    }
    const finalDescription = descriptionArr.join(', ');
    this.form.patchValue({ description: finalDescription });
    this.form.patchValue({ itemContains: itemContains });
  }
}
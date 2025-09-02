import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from '../confirmation-modal/confirmation-modal.service';
import { PolicyService } from 'src/service/policy.service';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { categoryList } from 'src/config/food-category.config';

@Component({
  selector: 'app-outlet-master-menu',
  templateUrl: './outlet-master-menu.component.html',
  styleUrls: ['./outlet-master-menu.component.scss']
})
export class OutletMasterMenuComponent implements OnInit {
  @Input() outletObj: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') content: any;
  @ViewChild('comboContent') comboContent: any;
  categorySelected: boolean = false;
  form: any;
  selectedCategory: any;
  subcategoryList: any = [];
  uploadedImageFile: any;
  imageUrl: any;
  displayImgUrl = environment.imageUrl;
  showCard: any = false;
  menuList: any = [];
  menuIndex: any = 0;
  showUpdateBtn: any = false;
  imageReplaced: any = false;
  noImages: boolean = false;
  foodItem: any;
  activeStatus = false;
  btnPolicy: any;
  menuInfo: any;
  eventInfo: any;
  filteredMenuList: any[] = []
  mealTimeList = [
    {
      "mealType": "Fullday",
      "acceptOrderFrom": "06:00",
      "acceptOrderTill": "23:00"
    },
    {
      "mealType": "Breakfast",
      "acceptOrderFrom": "07:00",
      "acceptOrderTill": "09:00"
    },
    {
      "mealType": "Lunch",
      "acceptOrderFrom": "11:00",
      "acceptOrderTill": "13:00"
    },
    {
      "mealType": "EveningSnacks",
      "acceptOrderFrom": "15:00",
      "acceptOrderTill": "17:00"
    },
    {
      "mealType": "Dinner",
      "acceptOrderFrom": "20:00",
      "acceptOrderTill": "22:00"
    }
  ];
  groupedMenuList: any;
  categoryList = categoryList;

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
    this.init();
    this.createForm();
  }

  get nutrition_Lists(): FormArray {
    return this.form.get('nutritionList') as FormArray;
  }

  init() {
    console.log(this.outletObj);

    if (this.filteredMenuList && this.filteredMenuList.length > 0) {
      this.filteredMenuList = this.filteredMenuList.sort((a: any, b: any) => a.precedence - b.precedence)
      console.log(this.filteredMenuList);

      this.showCard = true;
    }

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

    console.log(this.groupedMenuList);

  }

  async fetchOutletMasterMenus() {
    try {
      const res = await this.apiMainService.getAllOutletMasterMenus();
      console.log(res);
      if (res) {
        this.filteredMenuList = res;
        this.init();
      }
    }
    catch (e) {
      console.log('error while fetching outlet master menus')
    }
  }

  normalizeMealTiming(mealTimingInfo: any[]) {
    return mealTimingInfo.flatMap(item =>
      item.split(',').map((m: any) => { return m.trim() }).filter(Boolean)
    );
  }



  patchFormValue(item: any) {
    console.log('patchFormValue', item);
    this.form.reset();
    this.form.patchValue({
      itemName: item.itemName,
      price: item.price,
      itemType: item.itemType,
      isActive: item.isActive,
      description: item.description,
      itemContains: item.itemContains,
      subsidy: item.subsidy,
      precedence: item.precedence,
      category: item.category,
      mealTimingInfo: [...item.mealTimingInfo],
      energyValue: item.nutritionInfo ? item.nutritionInfo.energyValue : 0,
      nutritionList: item.nutritionInfo ? [...item.nutritionInfo.nutritionList] : []
    });
    if (item.subCategory) {
      this.selectedCategory = item.category;
      this.categorySelected = true;
      this.setSubCategoryList();
    }
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
      isActive: [''],
      itemType: ['Veg'],
      subsidy: [''],
      precedence: [''],
      description: [''],
      itemContains: [[]],
      mealTimingInfo: [[]],
      category: [''],
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
    this.setSubCategoryList();
  }

  setSubCategoryList() {
    this.outletObj.category.forEach((el: any) => {
      if (el.name === this.selectedCategory) {
        this.subcategoryList = el.subCategories;
      }
    });
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

  formatMealArray(arr: any) {
    return arr
      .join(',')           // Join the array into a single string: "Breakfast,Lunch"
      .split(',')          // Split by commas into ["Breakfast", "Lunch"]
      .map((item: any) => item.trim())       // Trim any extra whitespace
      .map((item: any, index: any) => {

        return index === 0 ? item : item.toLowerCase()
      }
      )

  } // Lowercase all except first if needed

  async edit(item: any, index: any) {
    console.log(item);

    this.imageUrl = item.imageUrl;
    this.showUpdateBtn = true;
    this.menuIndex = index;
    this.patchFormValue(item);
    this.open();
  }

  async updateMenu(index: any) {
    // if ((typeof this.form.value.subsidy === "undefined") ||
    //   this.form.value.subsidy === null ||
    //   this.form.value.subsidy === ''
    // ) {
    //   this.form.patchValue({ subsidy: 0 });
    // }
    console.log(this.form.value);
    console.log(index);


    try {
      const menuId = this.filteredMenuList[index]?._id;
      console.log(this.form.value);

      const formData = new FormData();
      if (this.imageUrl) {
        formData.append('image', this.uploadedImageFile);
      }

      const mealTimingInfoData = this.normalizeMealTiming(this.form.value.mealTimingInfo)
      formData.append('imageUrl', this.form.value.imageUrl);
      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('itemContains', JSON.stringify(this.form.value.itemContains));
      formData.append('itemType', this.form.value.itemType);
      formData.append('subsidy', this.form.value.subsidy);
      formData.append('precedence', this.form.value.precedence);
      formData.append('category', this.form.value.category);
      formData.append('mealTimingInfo', JSON.stringify(mealTimingInfoData));
      const nutritionInfo = {
        energyValue: this.form.value.energyValue,
        nutritionList: this.form.value.nutritionList
      };
      formData.append('nutritionInfo', JSON.stringify(nutritionInfo));
      console.log('updateMenu ####', formData)
      const res = await this.apiMainService.updateOutletMasterMenu(menuId, formData);

      if (res && res._id) {
        this.fetchOutletMasterMenus();
      }

      this.resetValues();
    } catch (error) {
      console.log(error);
    }
  }

  checkStatus(event: any, index: any) {
    if (event.target.checked) {
      this.form.controls['isActive'].patchValue(true);
    } else {

      this.form.controls['isActive'].patchValue(false);
      console.log(this.form.controls['isActive'].value);
    }
  }

  resetValues() {
    this.form.reset();
    this.menuIndex = 0;
    this.imageUrl = '';
    this.uploadedImageFile = '';
    this.showUpdateBtn = false;
    this.imageReplaced = false;
    this.noImages = false;
    this.nutrition_Lists.clear();
    this.addNutritionLists();
  }

  async submit() {
    if ((typeof this.form.value.subsidy === "undefined") ||
      this.form.value.subsidy === null ||
      this.form.value.subsidy === ''
    ) {
      this.form.patchValue({ subsidy: 0 });
    }

    if (this.form.controls['isActive'].value == null) {
      this.form.controls['isActive'].patchValue(false);
    }
    try {
      const formData: any = new FormData();
      if (this.imageUrl) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageUrl', this.form.value.imageUrl);
      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('subsidy', this.form.value.subsidy);
      formData.append('itemContains', JSON.stringify(this.form.value.itemContains));
      formData.append('category', this.form.value.category);
      // formData.append('subCategory', this.form.value.subCategory);
      formData.append('itemType', this.form.value.itemType);
      formData.append('precedence', this.form.value.precedence);
      formData.append('mealTimingInfo', JSON.stringify(this.form.value.mealTimingInfo));
      const nutritionInfo = {
        energyValue: this.form.value.energyValue,
        nutritionList: this.form.value.nutritionList
      };
      formData.append('nutritionInfo', JSON.stringify(nutritionInfo));

      // let mealTypes = this.form.value.mealTimingInfo;

      // const updatedMeal = this.outletObj.mealTiming.filter((meal: any) =>
      //   mealTypes.includes(meal.mealType)
      // );

      // formData.append('mealTimingInfo', JSON.stringify(updatedMeal));

      const res = await this.apiMainService.addOutletMasterMenu(
        formData
      );
      console.log(res);

      if (res && res._id) {
        // this.outletObj = res;
        // this.init()
        this.fetchOutletMasterMenus();
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
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          if (result === 'add') {
            this.submit();
          } else if (result === 'update') {
            this.updateMenu(this.menuIndex);
          }
        },
        (reason) => {
          console.log(`Model Dismissed`);
        }
      );
  }

  showPopup(item: any, i: any) {
    this.foodItem = item;
    this.menuIndex = i;
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${item.itemName}`,
      this.deleteFoodItem,
      this
    );
  }

  async deleteFoodItem() {
    const res: any = await this.apiMainService.deleteOutletMasterMenu(
      this.foodItem._id
    );
    if (res && res._id) {
      // this.outletObj = res;
      // this.showCard = true;
      this.fetchOutletMasterMenus();
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

    let outletMastermenu = await this.apiMainService.changeMasterMenuActivation(
      menu._id,
      menuObj
    );
    console.log(outletMastermenu);

  }

  showPopupForItemActivation(menu: any, event: any) {
    this.menuInfo = menu;
    this.eventInfo = event;
    this.confirmationModalService.modal(
      `Are you sure, you want to ${event.target.checked ? 'Enable' : 'Disable'} ${menu.itemName} Item`,
      this.changeMenuActivation,
      this,
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
    console.log(this.form.value);

  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from '../../service/confirmation-modal.service';
import { PolicyService } from 'src/service/policy.service';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { categoryList, nutritionListOptions } from 'src/config/food-category.config';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

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
  // form: any;
  form!: import('@angular/forms').FormGroup; // Fix type for better intellisense if needed
  selectedCategory: any;
  subcategoryList: any = [];
  uploadedImageFile: any;
  imageUrl: any;
  displayImgUrl = environment.imageUrl;
  showCard: any = false;
  menuList: any = [];
  menuId: any = 0;
  showUpdateBtn: any = false;
  imageReplaced: any = false;
  noImages: boolean = false;
  foodItem: any;
  activeStatus = false;
  btnPolicy: any;
  menuInfo: any;
  eventInfo: any;
  filteredMenuList: any[] = []
  masterMenuList: any[] = []; // Store original list
  searchTerm: string = '';
  selectedCategoryFilter: string = '';
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
  pageSize: number = 5;
  pageIndex: number = 0;
  nutritionListOptions = nutritionListOptions;
  energyTooltip = `
Nutrient Conversion Factors:
• Protein: 4 kcal/g
• Carbohydrates: 4 kcal/g
• Fat: 9 kcal/g
• Fiber: 2 kcal/g
`;
  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService,
    private sendDataToComponent: SendDataToComponent,
    private router: Router,
    private dialog: MatDialog
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
    if (this.filteredMenuList && this.filteredMenuList.length > 0) {
      this.filteredMenuList = this.filteredMenuList.sort((a: any, b: any) => a.precedence - b.precedence)
      this.showCard = true;
    }

    // Keep a copy of full list
    if (!this.masterMenuList.length && this.filteredMenuList.length) {
      this.masterMenuList = [...this.filteredMenuList];
    }

    this.applyFilter();
  }

  applyFilter() {
    let temp = [...this.masterMenuList];

    // 1. Text Search
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter(item =>
        (item.itemName && item.itemName.toLowerCase().includes(term)) ||
        (item.description && item.description.toLowerCase().includes(term))
      );
    }

    // 2. Category Filter
    if (this.selectedCategoryFilter && this.selectedCategoryFilter !== 'all') {
      temp = temp.filter(item => item.category === this.selectedCategoryFilter);
    }

    // 3. Sort
    this.filteredMenuList = temp.sort((a: any, b: any) => a.precedence - b.precedence);

    this.showCard = this.filteredMenuList.length > 0;
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
  }

  async fetchOutletMasterMenus() {
    try {
      const res = await this.apiMainService.getAllOutletMasterMenus();
      if (res) {
        this.filteredMenuList = res;
        this.masterMenuList = res; // Update master list too
        this.init();
      }
    }
    catch (e) {
      console.log('error while fetching outlet master menus')
    }
  }

  normalizeMealTiming(mealTimingInfo: any[]) {
    // Check if it's already an array of strings
    if (Array.isArray(mealTimingInfo) && typeof mealTimingInfo[0] === 'string') {
      return mealTimingInfo;
    }
    // Check if it's an array of objects
    if (Array.isArray(mealTimingInfo) && typeof mealTimingInfo[0] === 'object') {
      return mealTimingInfo.map(m => m.mealType);
    }
    return [];
  }

  patchFormValue(item: any) {
    this.form.reset();

    // Extract meal types as strings for the chip list
    const mealTypes = item.mealTimingInfo ? item.mealTimingInfo.map((m: any) => m.mealType || m) : [];

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
      mealTimingInfo: mealTypes,
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
      item.nutritionInfo.nutritionList.forEach((nutrition: any) => {
        const option = this.nutritionListOptions.find(opt =>
          opt.id === nutrition.nutritionId || opt.title === nutrition.nutritionName
        );
        this.nutrition_Lists.push(this.fb.group({
          nutritionId: [nutrition.nutritionId || option?.id],
          nutritionName: [option || nutrition.nutritionName],
          nutritionValue: [nutrition.nutritionValue],
          nutritionUnit: [nutrition.nutritionUnit || 'gm']
        }));
      });
      this.calculateEnergyValue();
    }
  }

  createForm() {
    this.form = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      isActive: [true],
      itemType: ['', Validators.required],
      subsidy: [''],
      precedence: [''],
      description: ['', [Validators.required]],
      itemContains: [[]],
      mealTimingInfo: ['', [Validators.required]],
      category: ['', Validators.required],
      energyValue: [''],
      nutritionList: this.fb.array([
        this.fb.group({
          nutritionId: [null],
          nutritionName: [null],
          nutritionValue: [''],
          nutritionUnit: ['gm']
        })
      ])
    });
    this.form.get('nutritionList')?.valueChanges.subscribe(() => {
      this.calculateEnergyValue();
    });
  }

  hasError(controlName: string, errorName: string) {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.touched || control.dirty);
  }

  preventInvalidNumber(e: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(e.key)) e.preventDefault();
  }

  addNutritionLists() {
    this.nutrition_Lists.push(this.fb.group({
      nutritionId: [null],
      nutritionName: [null],
      nutritionValue: [''],
      nutritionUnit: ['gm']
    }));
  }

  removenNutritionLists(index: number) {
    this.nutrition_Lists.removeAt(index);
  }

  setCategory(event: any) {
    this.selectedCategory = event.value; // MatSelect change event uses .value
    this.categorySelected = true;
    this.setSubCategoryList();
  }

  setSubCategoryList() {
    if (!this.outletObj || !this.outletObj.category) return;
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
            const dialogRef = this.dialog.open(ImageCropperComponent, {
              width: '50%',
              panelClass: 'image-cropper-dialog',
              disableClose: true,
              data: {
                imageUrl: imageUrl,
                imageWidth: 150,
                imageHeight: 150,
                aspectRatio: 1
              }
            });

            dialogRef.afterClosed().subscribe((result: any) => {
              if (result && result.croppedImages) {
                this.uploadedImageFile = result.croppedImages.file;
                this.imageUrl = result.croppedImages.resizeDataUrl;
                this.imageReplaced = true;
              }
            });
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
    this.menuId = item._id;
    this.patchFormValue(item);
    this.open();
  }

  async updateMenu(index: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);

    try {
      const formData = new FormData();
      if (this.imageUrl && this.imageReplaced) {
        formData.append('image', this.uploadedImageFile);
      }

      // Preserve existing logic if image isn't replaced and exists
      formData.append('imageUrl', this.imageUrl || '');

      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('itemContains', JSON.stringify(this.form.value.itemContains));
      formData.append('itemType', this.form.value.itemType);

      const subsidy = this.form.value.subsidy ? this.form.value.subsidy : 0;
      formData.append('subsidy', subsidy);

      const precedence = this.form.value.precedence ? this.form.value.precedence : 0;
      formData.append('precedence', precedence);

      formData.append('category', this.form.value.category);

      // Reconstruct mealTimingInfo as array of objects from mealTimeList
      const selectedMealTypes = this.form.value.mealTimingInfo; // Array of strings
      const mealTimingObjects = this.mealTimeList.filter(m => selectedMealTypes.includes(m.mealType));
      formData.append('mealTimingInfo', JSON.stringify(mealTimingObjects));

      const nutritionInfo = {
        energyValue: this.form.value.energyValue,
        nutritionList: (this.form.value.nutritionList || []).map((nut: any) => ({
          nutritionId: nut.nutritionId || nut.nutritionName?.id,
          nutritionName: typeof nut.nutritionName === 'object' ? nut.nutritionName?.title : (nut.nutritionName || ''),
          nutritionValue: nut.nutritionValue || 0,
          nutritionUnit: nut.nutritionUnit || 'gm'
        }))
      };
      formData.append('nutritionInfo', JSON.stringify(nutritionInfo));

      const res = await this.apiMainService.updateOutletMasterMenu(this.menuId, formData);
      console.log(res);

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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if ((typeof this.form.value.subsidy === "undefined") ||
      this.form.value.subsidy === null ||
      this.form.value.subsidy === ''
    ) {
      this.form.patchValue({ subsidy: 0 });
    }

    if (this.form.controls['isActive'].value == null) {
      this.form.controls['isActive'].patchValue(true);
    }

    try {
      const formData: any = new FormData();
      if (this.imageUrl && this.imageReplaced) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageUrl', this.imageUrl || '');

      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('subsidy', this.form.value.subsidy);
      formData.append('itemContains', JSON.stringify(this.form.value.itemContains));
      formData.append('category', this.form.value.category);
      // formData.append('subCategory', this.form.value.subCategory);
      formData.append('itemType', this.form.value.itemType ? this.form.value.itemType : "Veg");
      formData.append('precedence', this.form.value.precedence ? this.form.value.precedence : 0);

      // Reconstruct mealTimingInfo
      const selectedMealTypes = this.form.value.mealTimingInfo; // Array of strings
      const mealTimingObjects = this.mealTimeList.filter(m => selectedMealTypes.includes(m.mealType));
      formData.append('mealTimingInfo', JSON.stringify(mealTimingObjects));

      const nutritionInfo = {
        energyValue: this.form.value.energyValue || 0,
        nutritionList: (this.form.value.nutritionList || []).map((nut: any) => ({
          nutritionId: nut.nutritionId || nut.nutritionName?.id,
          nutritionName: typeof nut.nutritionName === 'object' ? nut.nutritionName?.title : (nut.nutritionName || ''),
          nutritionValue: nut.nutritionValue || 0,
          nutritionUnit: nut.nutritionUnit || 'gm'
        }))
      };
      formData.append('nutritionInfo', JSON.stringify(nutritionInfo));


      const res = await this.apiMainService.addOutletMasterMenu(
        formData
      );
      console.log(res);

      if (res && res._id) {
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
    const dialogRef = this.dialog.open(this.content, {
      width: '950px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      // NOTE: resetValues() is NOT called here anymore, but inside submit/updateMenu
      if (result === 'add') {
        this.submit();
      } else if (result === 'update') {
        this.updateMenu(this.menuId);
      } else {
        // Did not submit or update (Cancel)
        this.resetValues();
      }
    });
  }

  showPopup(item: any, i: any) {
    this.foodItem = item;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${item.itemName}`,
      callback: this.deleteFoodItem,
      context: this
    });
  }

  async deleteFoodItem() {
    const res: any = await this.apiMainService.deleteOutletMasterMenu(
      this.foodItem._id
    );
    if (res && res._id) {
      this.fetchOutletMasterMenus();
    }
    this.resetValues();
    this.back.emit(true);
  }

  async changeMenuActivation() {
    const menu = this.menuInfo;
    const event = this.eventInfo;
    menu.isActive = event.checked;

    const menuObj = {
      isActive: event.checked,
    };

    try {
      const outletMastermenu = await this.apiMainService.changeMasterMenuActivation(
        menu._id,
        menuObj
      );
      console.log(outletMastermenu);
    } catch (error) {
      console.log(error);
      // Revert if API fails
      menu.isActive = !event.checked;
      event.source.checked = !event.checked;
    }
  }

  showPopupForItemActivation(menu: any, event: any) {
    this.menuInfo = menu;
    this.eventInfo = event;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to ${event.checked ? 'Enable' : 'Disable'} ${menu.itemName} Item`,
      callback: this.changeMenuActivation,
      context: this,
    });
  }

  defineDescription() {
    this.dialog.open(this.comboContent, {
      width: '90%',
      maxWidth: '1000px',
    }).afterClosed().subscribe(result => { });
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
  // 
  goBack() {

  }
  // paginator logic 
  onPageChanges(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex

  }

  onNutritionSelect(option: any, index: number) {
    if (option) {
      this.nutrition_Lists.at(index).patchValue({
        nutritionId: option.id
      });
    }
  }

  isOptionSelected(optionId: number, currentIndex: number): boolean {
    const selectedIds = this.nutrition_Lists.controls
      .map((control, idx) => (idx !== currentIndex ? control.get('nutritionId')?.value : null))
      .filter(id => id !== null && id !== undefined);

    return selectedIds.includes(optionId);
  }

  compareNutrition(o1: any, o2: any): boolean {
    if (!o1 || !o2) return o1 === o2;
    return o1.id === o2.id;
  }
  calculateEnergyValue() {
    const nutritionList = this.form.get('nutritionList')?.value as any[];
    if (!nutritionList) return;

    let totalEnergy = 0;
    nutritionList.forEach((item) => {
      const value = parseFloat(item.nutritionValue) || 0;
      // Use nutritionId directly or from the nutritionName object
      const nutritionId = item.nutritionId || item.nutritionName?.id;

      if (nutritionId === 1) { // Protein
        totalEnergy += value * 4;
      } else if (nutritionId === 2) { // Fat
        totalEnergy += value * 9;
      } else if (nutritionId === 3) { // Carbohydrate
        totalEnergy += value * 4;
      } else if (nutritionId === 4) { // Fibre
        totalEnergy += value * 2;
      }
    });

    this.form.get('energyValue')?.patchValue(parseFloat(totalEnergy.toFixed(2)), { emitEvent: false });
  }
}

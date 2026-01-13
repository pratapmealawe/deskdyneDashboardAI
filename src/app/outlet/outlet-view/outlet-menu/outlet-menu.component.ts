import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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
  @Output() dataToParent = new EventEmitter<string>();

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('masterMenu') masterMenu!: TemplateRef<any>;
  @ViewChild('selectOutletModal') selectOutletModal!: TemplateRef<any>;

  // @ViewChild(MatPaginator) menuPaginator!: MatPaginator; // Removed

  categoryList = categoryList;

  form!: FormGroup;

  selectedCategory: any;
  uploadedImageFile: any;
  imageUrl: any;
  displayImgUrl = environment.imageUrl;
  showCard: boolean = false;

  // main outlet menu lists
  menuList: any[] = [];
  filteredMenuList: any[] = [];
  groupedMenuList: any[] = [];

  // outlet copy
  selectedOutlet: any = null;
  outletMenuList: any[] = [];
  filteredOutletMenuList: any[] = [];
  searchTermCopyMenu: string = '';

  // master menu
  filteredMasterMenuList: any[] = [];
  tempList: any[] = [];

  // selections for master/copy
  selectedMasterItem: any = null;
  selectedItems: any[] = [];
  selectedMenuItems: any[] = [];
  transformedMenuItems: any[] = [];

  menuId: any = 0;
  showUpdateBtn: boolean = false;
  imageReplaced: boolean = false;
  uploadStatus: boolean = false;
  noImages: boolean = false;
  foodItem: any;
  btnPolicy: any;
  outletList: any[] = [];
  menuInfo: any;
  eventInfo: any;

  // filters
  searchTerm: string = '';        // for master menu
  searchTermMenu: string = '';    // for outlet menu
  selectedCategoryFilter: string = '';

  // pagination removed


  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService,
    private sendDataToComponent: SendDataToComponent,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.fetchOutletMasterMenus();
    this.fetchAllOutlets();
    this.createForm();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['outletObj']) {
      this.outletObj = changes['outletObj'].currentValue;
      this.init();
    }
  }

  // INIT OUTLET MENU
  init() {
    if (this.outletObj?.menuList && this.outletObj.menuList.length > 0) {
      this.filteredMenuList = this.outletObj.menuList
        .slice()
        .sort((a: any, b: any) => a.precedence - b.precedence);
      this.showCard = true;
    } else {
      this.filteredMenuList = [];
      this.showCard = false;
    }

    this.applyMenuFilters();
  }

  // FETCH ALL OUTLETS
  async fetchAllOutlets() {
    try {
      const res = await this.apiMainService.fetchAllOutlets();
      this.outletList = res || [];
    } catch (e) {
      console.log('error while fetching outlets', e);
      this.outletList = [];
    }
  }

  // OUTLET MENU FILTERS + PAGINATION
  applyMenuFilters() {
    if (!this.outletObj?.menuList) {
      this.filteredMenuList = [];
      this.groupedMenuList = [];
      this.showCard = false;
      return;
    }

    let temp = this.outletObj.menuList
      .slice()
      .sort((a: any, b: any) => a.precedence - b.precedence);

    if (this.selectedCategoryFilter) {
      temp = temp.filter(
        (item: any) => item.category === this.selectedCategoryFilter
      );
    }

    if (this.searchTermMenu) {
      const term = this.searchTermMenu.toLowerCase();
      temp = temp.filter((item: any) =>
        (item.itemName || '').toLowerCase().includes(term) ||
        (item.description || '').toLowerCase().includes(term) ||
        (item.outletName || '').toLowerCase().includes(term)
      );
    }

    this.filteredMenuList = temp;
    this.showCard = this.filteredMenuList.length > 0;

    // Show all items (no pagination)
    this.groupedMenuList = this.buildGroupedMenu(this.filteredMenuList);
  }

  private buildGroupedMenu(list: any[]) {
    const grouped = list.reduce((acc: any, item: any) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((category) => ({
      category,
      items: grouped[category],
    }));
  }

  // Pagination methods removed


  onOutletChange() {
    if (this.selectedOutlet) {
      this.outletMenuList = this.selectedOutlet.menuList || [];
    } else {
      this.outletMenuList = [];
    }
    this.applyCopyMenuFilter();
  }

  applyCopyMenuFilter() {
    let temp = this.outletMenuList || [];
    if (this.searchTermCopyMenu) {
      const term = this.searchTermCopyMenu.toLowerCase();
      temp = temp.filter((item: any) =>
        (item.itemName || '').toLowerCase().includes(term) ||
        (item.description || '').toLowerCase().includes(term)
      );
    }
    this.filteredOutletMenuList = temp;
  }

  // NUMBER VALIDATIONS
  preventInvalidNumber(e: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E'];
    if (invalidKeys.includes(e.key)) e.preventDefault();
  }

  preventInvalidPaste(
    e: ClipboardEvent,
    type: 'integer' | 'decimal' = 'integer'
  ) {
    const text = e.clipboardData?.getData('text') ?? '';
    if (type === 'integer') {
      if (!/^[1-9]\d*$/.test(text)) e.preventDefault();
    } else {
      if (!/^\d+(\.\d+)?$/.test(text)) e.preventDefault();
    }
  }

  // FORM
  createForm() {
    this.form = this.fb.group({
      itemName: ['', [Validators.required, Validators.maxLength(80)]],
      price: [null, [Validators.required, Validators.min(1)]],
      subsidy: [0, [Validators.min(0)]],
      category: ['', Validators.required],
      mealTimingInfo: [[], Validators.required],
      itemType: ['Veg', Validators.required],
      precedence: [0, [Validators.min(0)]],
      isActive: [false],
      description: ['', [Validators.maxLength(200)]],
      doNotChangeInFuture: [false],
      energyValue: [10],
      sectionConfig: [null],
      nutritionList: this.fb.array([
        this.fb.group({
          nutritionName: [''],
          nutritionValue: [''],
          nutritionUnit: [''],
        }),
      ]),
    });
  }


  get nutrition_Lists(): FormArray {
    return this.form.get('nutritionList') as FormArray;
  }

  addNutritionLists() {
    this.nutrition_Lists.push(
      this.fb.group({
        nutritionName: [''],
        nutritionValue: [''],
        nutritionUnit: [''],
      })
    );
  }

  removenNutritionLists(index: number) {
    this.nutrition_Lists.removeAt(index);
  }

  patchFormValue(item: any) {
    console.log(item);

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
      energyValue: item.nutritionInfo ? item.nutritionInfo.energyValue : 0,
      sectionConfig: item.sectionConfig || null,
      nutritionList: item.nutritionInfo
        ? [...item.nutritionInfo.nutritionList]
        : [],
    });

    if (item.nutritionInfo && item.nutritionInfo.nutritionList?.length) {
      this.nutrition_Lists.clear();
      item.nutritionInfo.nutritionList.forEach((nutrition: any) => {
        this.nutrition_Lists.push(this.fb.group(nutrition));
      });
    }
  }

  // MASTER MENU FILTER
  applyMasterFilter() {
    let tempList = [...(this.tempList || [])];

    if (this.selectedCategory) {
      tempList = tempList.filter(
        (data: any) => data.category === this.selectedCategory
      );
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      tempList = tempList.filter((data: any) =>
        (data.itemName?.toLowerCase() || '').includes(term)
      );
    }

    this.filteredMasterMenuList = tempList;
  }

  async fetchOutletMasterMenus() {
    try {
      const res = await this.apiMainService.getAllOutletMasterMenus();
      if (res) {
        this.filteredMasterMenuList = res;
        this.tempList = this.filteredMasterMenuList;
      }
    } catch (e) {
      console.log('error while fetching outlet master menus', e);
      this.filteredMasterMenuList = [];
      this.tempList = [];
    }
  }

  // IMAGE HANDLING (ImageCropper via NgbModal)
  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
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
                this.uploadStatus = true;
                this.imageReplaced = true;
              }
            });

          } catch (e) {
            console.log('error while opening image cropper', e);
          }
        };
      }
    }
  }

  // EDIT / ADD
  async edit(item: any, index: any) {
    this.imageUrl = item.imageUrl;
    this.showUpdateBtn = true;
    this.menuId = item._id;

    this.patchFormValue(item);
    this.open();
  }

  async addMasterMenu() {
    this.imageReplaced = true;
    this.uploadStatus = false;
    this.imageUrl = this.selectedMasterItem?.imageUrl;

    try {
      console.log("selectedItems", this.selectedItems);

      const res = await this.apiMainService.addOutletList(
        this.outletObj._id,
        { outletList: this.selectedItems }
      );
      this.selectedItems = [];
      this.dataToParent.emit(res);
    } catch (err) {
      console.log(err);
    }

    if (this.selectedMasterItem) {
      this.form.patchValue(this.selectedMasterItem);
    }
  }

  async addMenuItem() {
    this.imageReplaced = true;
    this.uploadStatus = false;
    this.imageUrl = this.selectedMasterItem?.imageUrl;

    console.log(this.transformedMenuItems);

    try {
      const res = await this.apiMainService.addOutletList(
        this.outletObj._id,
        { outletList: this.transformedMenuItems }
      );
      this.transformedMenuItems = [];
      this.selectedMenuItems = [];
      this.dataToParent.emit(res);
    } catch (err) {
      console.log(err);
    }

    if (this.selectedMasterItem) {
      this.form.patchValue(this.selectedMasterItem);
    }
  }

  async updateMenu(index: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (
      typeof this.form.value.subsidy === 'undefined' ||
      this.form.value.subsidy === null ||
      this.form.value.subsidy === ''
    ) {
      this.form.patchValue({ subsidy: 0 });
    }
    try {
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
      formData.append(
        'quantityAvailable',
        this.form.value.quantityAvailable
      );
      formData.append(
        'setDailyQuantity',
        this.form.value.setDailyQuantity
      );
      formData.append('subsidy', this.form.value.subsidy);
      formData.append(
        'doNotChangeInFuture',
        this.form.value.doNotChangeInFuture
      );
      formData.append('category', this.form.value.category);
      formData.append('subCategory', this.form.value.subCategory);
      formData.append('itemType', this.form.value.itemType);
      formData.append('precedence', this.form.value.precedence);

      const mealTypes = this.form.value.mealTimingInfo;
      const updatedMeal = this.outletObj.mealTiming.filter((meal: any) =>
        mealTypes.includes(meal.mealType)
      );
      formData.append('mealTimingInfo', JSON.stringify(updatedMeal));

      const nutritionInfo = {
        energyValue: this.form.value.energyValue,
        nutritionList: this.form.value.nutritionList,
      };
      formData.append('nutritionInfo', JSON.stringify(nutritionInfo));

      if (this.form.value.sectionConfig) {
        const payload = {
          ...this.form.value.sectionConfig,
          sectionId: this.form.value.sectionConfig._id,
        };
        formData.append('sectionConfig', JSON.stringify(payload));
      }

      const res = await this.apiMainService.updateOutletMenu(
        outletId,
        this.menuId,
        formData
      );

      if (res && res._id) {
        this.outletObj = res;
        this.init();
      }

      this.resetValues();
    } catch (error) {
      console.log(error);
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
    try {
      const formData: any = new FormData();
      if (this.imageUrl) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageUrl', this.imageUrl);
      formData.append('description', this.form.value.description);
      formData.append(
        'isActive',
        this.form.value.isActive ? this.form.value.isActive : false
      );
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append(
        'quantityAvailable',
        this.form.value.quantityAvailable
          ? this.form.value.quantityAvailable
          : 0
      );
      formData.append(
        'setDailyQuantity',
        this.form.value.setDailyQuantity
          ? this.form.value.setDailyQuantity
          : 0
      );
      formData.append(
        'subsidy',
        this.form.value.subsidy ? this.form.value.subsidy : 0
      );
      formData.append(
        'doNotChangeInFuture',
        this.form.value.doNotChangeInFuture
          ? this.form.value.doNotChangeInFuture
          : false
      );
      formData.append('category', this.form.value.category);
      formData.append('subCategory', this.form.value.subCategory);
      formData.append('itemType', this.form.value.itemType);
      formData.append(
        'precedence',
        this.form.value.precedence ? this.form.value.precedence : 0
      );

      const mealTypes = this.form.value.mealTimingInfo;
      const updatedMeal = this.outletObj.mealTiming.filter((meal: any) =>
        mealTypes?.includes(meal.mealType)
      );
      formData.append('mealTimingInfo', JSON.stringify(updatedMeal));

      const nutritionInfo = {
        energyValue: this.form.value.energyValue,
        nutritionList: this.form.value.nutritionList,
      };
      formData.append('nutritionInfo', JSON.stringify(nutritionInfo));

      if (this.form.value.sectionConfig) {
        const payload = {
          ...this.form.value.sectionConfig,
          sectionId: this.form.value.sectionConfig._id,
        };
        formData.append('sectionConfig', JSON.stringify(payload));
      }

      const res = await this.apiMainService.addOutletMenu(
        formData,
        this.outletObj._id
      );

      if (res && res._id) {
        this.outletObj = res;
        this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);
        this.init();
      }
      this.resetValues();
    } catch (error) {
      console.log(error);
    }
  }

  get f() {
    return this.form.controls;
  }

  // SELECTION HELPERS
  compareSection(o1: any, o2: any): boolean {
    if (!o1 || !o2) {
      return o1 === o2;
    }
    // Check various ID combinations since saved item has sectionId but list has _id
    if (o1._id && o2._id) return o1._id === o2._id;
    if (o1.sectionId && o2._id) return o1.sectionId === o2._id;
    if (o1._id && o2.sectionId) return o1._id === o2.sectionId;
    if (o1.sectionId && o2.sectionId) return o1.sectionId === o2.sectionId;
    return false;
  }

  onItemSelected(item: any) {
    this.selectedMasterItem = item;
    console.log('Selected Master Menu Item:', item);
  }

  onItemToggle(item: any, event: any) {
    const checkbox = event;

    if (checkbox.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(
        (i) => i._id !== item._id
      );
    }
  }

  onMenuItemToggle(item: any, event: any) {
    const checkbox = event;

    if (checkbox.checked) {
      this.selectedMenuItems.push(item);
    } else {
      this.selectedMenuItems = this.selectedMenuItems.filter(
        (i: any) => i._id !== item._id
      );
    }

    this.transformedMenuItems = this.selectedMenuItems.map((each: any) => {
      return {
        ...each,
        mealTimingInfo: each.mealTimingInfo.map(
          (info: any) => info.mealType
        ),
      };
    });
  }

  isSelected(item: any): boolean {
    return this.selectedItems.find((i) => i._id === item._id) !== undefined;
  }

  isMenuSelected(item: any): boolean {
    return (
      this.transformedMenuItems.find((i) => i._id === item._id) !==
      undefined
    );
  }

  // DELETE / ACTIVATE / DEACTIVATE
  async deleteFoodItem() {
    const res: any = await this.apiMainService.deleteOutletMenu(
      this.outletObj._id,
      this.foodItem._id
    );
    if (res && res._id) {
      this.outletObj = res;
      this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);
      this.showCard = true;
      this.init();
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

    await this.apiMainService.changeMenuActivation(
      this.outletObj._id,
      menu._id,
      menuObj
    );
  }

  showPopup(item: any, i: any) {
    this.foodItem = item;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${item.itemName}`,
      callback: this.deleteFoodItem,
      context: this
    });
  }

  showPopupForItemActivation(menu: any, event: any) {
    this.menuInfo = menu;
    this.eventInfo = event;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to ${event.checked ? 'Enable' : 'Disable'
        } ${menu.itemName} Item`,
      callback: this.changeMenuActivation,
      context: this
    });
  }

  // MAT DIALOG OPENERS
  open() {
    this.selectedMasterItem = null;

    const dialogRef = this.dialog.open(this.content, {
      width: '950px',
      maxWidth: '95vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.submit();
      } else if (result === 'update') {
        this.updateMenu(this.menuId);
      }
    });
  }

  openMenu() {
    const dialogRef = this.dialog.open(this.masterMenu, {
      width: '900px',
      maxWidth: '95vw',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'addMasterMenu') {
        this.addMasterMenu();
      }
      this.selectedItems = [];
      this.selectedMenuItems = [];
    });
  }

  openOutlet() {
    const dialogRef = this.dialog.open(this.selectOutletModal, {
      width: '900px',
      maxWidth: '95vw',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'addMenuItem') {
        this.addMenuItem();
      }
      this.transformedMenuItems = [];
      this.selectedMenuItems = [];
    });
  }

  async excelExport() {
    if (!this.filteredMenuList || this.filteredMenuList.length === 0) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Outlet Menu');

    worksheet.columns = [
      { header: 'Item Name', key: 'itemName', width: 25 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Type', key: 'itemType', width: 10 },
      { header: 'Price (₹)', key: 'price', width: 15 },
      { header: 'Subsidy (₹)', key: 'subsidy', width: 15 }
    ];

    // Header style
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    this.filteredMenuList.forEach((item) => {
      worksheet.addRow({
        itemName: item.itemName,
        description: item.description || '',
        category: item.category,
        itemType: item.itemType,
        price: item.price || 0,
        subsidy: item.subsidy || 0
      });
    });

    const fileName =
      `outlet_menu_${this.outletObj?.outletName || 'outlet'}` +
      `_${new Date().toISOString().slice(0, 10)}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName);
  }
}

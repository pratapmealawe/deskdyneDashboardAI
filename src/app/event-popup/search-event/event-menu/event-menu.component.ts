import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { categoryList } from 'src/config/food-category.config';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { PolicyService } from 'src/service/policy.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.scss']
})
export class EventMenuComponent implements OnInit {

  @Input() eventObj: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataToParent = new EventEmitter<string>();

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('selectOutletModal') selectOutletModal!: TemplateRef<any>;

  @ViewChild(MatPaginator) menuPaginator!: MatPaginator;

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

  // event copy
  selectedEvent: any = null;
  eventMenuList: any[] = [];

  // selections for master/copy
  selectedMasterItem: any = null;
  selectedMenuItems: any[] = [];
  transformedMenuItems: any[] = [];

  menuId: any = 0;
  showUpdateBtn: boolean = false;
  imageReplaced: boolean = false;
  uploadStatus: boolean = false;
  noImages: boolean = false;
  foodItem: any;
  btnPolicy: any;
  eventPopupList: any[] = [];
  menuInfo: any;
  eventInfo: any;

  // filters
  searchTerm: string = '';        // for master menu
  searchTermMenu: string = '';    // for outlet menu
  selectedCategoryFilter: string = '';

  // pagination
  menuPageSize = 10;
  menuPageIndex = 0;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private policyService: PolicyService,
    private sendDataToComponent: SendDataToComponent,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.fetchAllOutlets();
    this.createForm();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventObj']) {
      this.eventObj = changes['eventObj'].currentValue;
      this.init();
    }
  }

  // INIT OUTLET MENU
  init() {
    if (this.eventObj?.menuList && this.eventObj.menuList.length > 0) {
      this.filteredMenuList = this.eventObj.menuList
        .slice()
        .sort((a: any, b: any) => a.precedence - b.precedence);
      this.showCard = true;
    } else {
      this.filteredMenuList = [];
      this.showCard = false;
    }

    this.menuPageIndex = 0;
    this.applyMenuFilters();
  }

  // FETCH ALL POPUP OUTLETS
  async fetchAllOutlets() {
    try {
      const res = await this.apiMainService.getPopupOutlets();
      this.eventPopupList = res || [];
    } catch (e) {
      console.log('error while fetching outlets', e);
      this.eventPopupList = [];
    }
  }

  // OUTLET MENU FILTERS + PAGINATION
  applyMenuFilters() {
    if (!this.eventObj?.menuList) {
      this.filteredMenuList = [];
      this.groupedMenuList = [];
      this.showCard = false;
      return;
    }

    let temp = this.eventObj.menuList
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
        (item.itemName || '').toLowerCase().includes(term)
      );
    }

    this.filteredMenuList = temp;
    this.showCard = this.filteredMenuList.length > 0;

    this.menuPageIndex = 0;
    this.updateMenuPagination();
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

  updateMenuPagination() {
    const start = this.menuPageIndex * this.menuPageSize;
    const end = start + this.menuPageSize;
    const slice = this.filteredMenuList.slice(start, end);
    this.groupedMenuList = this.buildGroupedMenu(slice);
  }

  onMenuPageChange(event: PageEvent) {
    this.menuPageIndex = event.pageIndex;
    this.menuPageSize = event.pageSize;
    this.updateMenuPagination();
  }

  onOutletChange() {
    if (this.selectedEvent) {
      this.eventMenuList = this.selectedEvent.menuList || [];
    } else {
      this.eventMenuList = [];
    }
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
      itemType: ['Veg', Validators.required],
      precedence: [0, [Validators.min(0)]],
      isActive: [false],
      description: ['', [Validators.maxLength(200)]],
      doNotChangeInFuture: [false],
      energyValue: [10],
    });
  }

  patchFormValue(item: any) {
    this.form.patchValue({
      itemName: item.itemName,
      price: item.price,
      subsidy: item.subsidy ? item.subsidy : 0,
      category: item.category,
      itemType: item.itemType,
      precedence: item.precedence,
      isActive: item.isActive,
      doNotChangeInFuture: item.doNotChangeInFuture,
      description: item.description,
      energyValue: item.nutritionInfo ? item.nutritionInfo.energyValue : 0,
    });
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
            const modalRef = this.modalService.open(ImageCropperComponent, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'xl',
              backdrop: 'static',
              centered: true,
            });
            modalRef.result.then(
              (result: any) => {
                if (result && result.croppedImages) {
                  this.uploadedImageFile = result.croppedImages.file;
                  this.imageUrl = result.croppedImages.resizeDataUrl;
                  this.uploadStatus = true;
                  this.imageReplaced = true;
                }
              },
              () => {
                console.log('Image cropper dismissed');
              }
            );
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
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

  //Need to change API
  // add menu to outlet method
  async addMenuItem() {
    this.imageReplaced = true;
    this.uploadStatus = false;
    this.imageUrl = this.selectedMasterItem?.imageUrl;

    try {
      const res = await this.apiMainService.addOutletList(
        this.eventObj._id,
        { eventPopupList: this.transformedMenuItems }
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

  resetValues() {
    this.form.reset();
    this.menuId = '';
    this.imageUrl = '';
    this.uploadedImageFile = '';
    this.showUpdateBtn = false;
    this.imageReplaced = false;
    this.noImages = false;
  }

  //update menu
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
      const outletId = this.eventObj._id;
      const formData = new FormData();
      if (this.imageUrl) {
        formData.append('image', this.uploadedImageFile);
      }
      formData.append('imageUrl', this.uploadedImageFile ? '' : this.imageUrl);
      formData.append('description', this.form.value.description);
      formData.append('isActive', this.form.value.isActive);
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
      formData.append('precedence', this.form.value.precedence);
      const res = await this.apiMainService.updateMenuItem(outletId, this.menuId, formData);
      if (res && res._id) {
        this.eventObj = res;
        this.init();
      }

      this.resetValues();
    } catch (error) {
      console.log(error);
    }
  }

  // add new menu
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
      const res = await this.apiMainService.saveMenuItem(this.eventObj._id, formData);
      if (res && res._id) {
        this.eventObj = res;
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

  onMenuItemToggle(item: any, event: any) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedMenuItems.push(item);
    } else {
      this.selectedMenuItems = this.selectedMenuItems.filter(
        (i: any) => i._id !== item._id
      );
    }
  }

  isMenuSelected(item: any): boolean {
    return (
      this.transformedMenuItems.find((i) => i._id === item._id) !==
      undefined
    );
  }

  // DELETE / ACTIVATE / DEACTIVATE
  async deleteFoodItem() {
    const res = await this.apiMainService.deleteMenuItem(this.eventObj._id, this.foodItem._id);
    if (res && res._id) {
      this.eventObj = res;
      this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);
      this.showCard = true;
      this.init();
    }
    this.resetValues();
    this.back.emit(true);
  }

  async changeMenuActivation(isActive: boolean, menu: any) {
    menu.isActive = isActive;
    await this.apiMainService.toggleMenuItemStatus(this.eventObj._id, menu._id);
  }

  showPopup(item: any, i: any) {
    this.foodItem = item;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${item.itemName}`,
      callback: this.deleteFoodItem,
      context: this
    });
  }

  showPopupForItemActivation(menu: any, event: MatCheckboxChange) {
    const newState = event.checked;
    const oldState = menu.isActive;

    this.menuInfo = menu;
    this.eventInfo = event;

    this.confirmationModalService.modal({
      msg: `Are you sure you want to ${newState ? 'Enable' : 'Disable'} ${menu.itemName} Item?`,
      callback: () => this.handleConfirm(newState, menu),   // Yes
      context: () => this.handleCancel(event, oldState)    // No
    });
  }

  handleConfirm(newState: boolean, menu: any) {
    menu.isActive = newState;
    this.changeMenuActivation(newState, menu);
  }

  handleCancel(event: MatCheckboxChange, oldState: boolean) {
    event.source.checked = oldState;
  }

  // MAT DIALOG OPENERS
  open() {
    this.selectedMasterItem = null;

    const modalRef = this.modalService.open(this.content, {
      size: 'xl',
      backdrop: 'static',
      centered: true,
      keyboard: false
    });

    modalRef.result.then(
      (result) => {
        if (result === 'add') {
          this.submit();
        } else if (result === 'update') {
          this.updateMenu(this.menuId);
        }
      },
      () => {
        // dismissed
      }
    );
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
}

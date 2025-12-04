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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { categoryList } from 'src/config/food-category.config';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-qr-menu',
  templateUrl: './qr-menu.component.html',
  styleUrls: ['./qr-menu.component.scss'],
})
export class QrMenuComponent implements OnInit, OnChanges {
  @Input() outletObj: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataToParent = new EventEmitter<string>();

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild(MatPaginator) menuPaginator!: MatPaginator;

  categoryList = categoryList;

  form!: FormGroup;

  uploadedImageFile: any;
  imageUrl: any;
  displayImgUrl = environment.imageUrl;
  showCard: boolean = false;

  // Raw docs from API (one per mealType)
  qrMenus: any[] = [];

  // All groups (one per mealType doc) after filters
  allGroups: any[] = [];

  // Groups shown on current page
  groupedMenuList: any[] = [];

  menuId: any = 0;
  showUpdateBtn: boolean = false;
  imageReplaced: boolean = false;
  uploadStatus: boolean = false;
  noImages: boolean = false;
  foodItem: any;
  groupItem: any;
  editGroupItem: any;
  btnPolicy: any;
  menuInfo: any;
  eventInfo: any;

  // filters
  searchTermMenu: string = '';
  selectedMealTypeFilter: string = ''; // mealType dropdown

  // meal type options (for dropdown)
  mealTypeOptions: string[] = [];

  // pagination (group-wise)
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
    this.createForm();
    this.setupMealTypeAutoTime();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['outletObj']) {
      this.outletObj = changes['outletObj'].currentValue;
      this.init();
    }
  }

  // ===== INIT: fetch QrMenu docs (already mealType-wise) =====
  async init() {
    try {
      if (!this.outletObj?._id) {
        this.qrMenus = [];
        this.allGroups = [];
        this.groupedMenuList = [];
        this.showCard = false;
        return;
      }

      const res: any = await this.apiMainService.getQrMenuList({
        outletId: this.outletObj._id,
      });

      this.qrMenus = Array.isArray(res) ? res : [];

      const mealTypesSet = new Set<string>();
      this.qrMenus.forEach((m) => {
        if (m.mealType) mealTypesSet.add(m.mealType);
      });
      this.mealTypeOptions = Array.from(mealTypesSet);

      this.menuPageIndex = 0;
      this.applyMenuFilters();
    } catch (err: any) {
      console.log(err);
      this.qrMenus = [];
      this.allGroups = [];
      this.groupedMenuList = [];
      this.showCard = false;
    }
  }

  // ===== FILTERS + PAGINATION (mealType + search) =====
  applyMenuFilters() {
    if (!this.qrMenus || this.qrMenus.length === 0) {
      this.allGroups = [];
      this.groupedMenuList = [];
      this.showCard = false;
      return;
    }

    // 1) Filter docs by mealType (if selected)
    let docs = [...this.qrMenus];
    if (this.selectedMealTypeFilter) {
      docs = docs.filter(
        (doc: any) => doc.mealType === this.selectedMealTypeFilter
      );
    }

    // 2) For each doc, filter its items by searchTerm and sort by precedence
    const groups: any[] = [];

    docs.forEach((doc: any) => {
      let items = (doc.qrMenuList || []).slice();

      // search filter
      if (this.searchTermMenu) {
        const term = this.searchTermMenu.toLowerCase();
        items = items.filter((item: any) =>
          (item.itemName || '').toLowerCase().includes(term)
        );
      }

      // sort by precedence
      items.sort(
        (a: any, b: any) => (a.precedence || 0) - (b.precedence || 0)
      );

      if (items.length > 0) {
        groups.push({
          id: doc._id,
          mealType: doc.mealType,
          acceptOrderFrom: doc.acceptOrderFrom,
          acceptOrderTill: doc.acceptOrderTill,
          isMealTypeActive: doc.isMealTypeActive,
          outletId: doc.outletId,
          outletName: doc.outletName,
          items,
        });
      }
    });

    this.allGroups = groups;
    this.showCard = this.allGroups.length > 0;

    this.menuPageIndex = 0;
    this.updateMenuPagination();
  }

  updateMenuPagination() {
    const start = this.menuPageIndex * this.menuPageSize;
    const end = start + this.menuPageSize;
    this.groupedMenuList = this.allGroups.slice(start, end);
  }

  onMenuPageChange(event: PageEvent) {
    this.menuPageIndex = event.pageIndex;
    this.menuPageSize = event.pageSize;
    this.updateMenuPagination();
  }

  // ===== MEALTYPE ON/OFF =====
  async onMealTypeActivationToggle(group: any, event: any) {
    const checked = event.checked;
    group.isMealTypeActive = checked;

    try {
      const res = await this.apiMainService.changeQrMealTypeActivation(group.id, { checked })
    } catch (err) {
      console.log('Error changing mealType active flag', err);
      group.isMealTypeActive = !checked;
    }
  }

  // ===== NUMBER VALIDATIONS =====
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

  // ===== FORM =====
  createForm() {
    this.form = this.fb.group({
      itemName: ['', [Validators.required, Validators.maxLength(80)]],
      mealType: ['', [Validators.required]],
      acceptOrderFrom: ['', [Validators.required]],
      acceptOrderTill: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      subsidy: [0, [Validators.min(0)]],
      category: ['', Validators.required],
      itemType: ['Veg', Validators.required],
      precedence: [0, [Validators.min(0)]],
      isActive: [false],
      description: ['', [Validators.maxLength(200)]],
      doNotChangeInFuture: [false],
    });
  }

  get f() {
    return this.form.controls;
  }

  setupMealTypeAutoTime() {
    this.form.get('mealType')?.valueChanges.subscribe((mealType) => {
      const mealConfig = this.outletObj?.mealTiming?.find(
        (m: any) => m.mealType === mealType
      );

      if (mealConfig) {
        this.form.patchValue(
          {
            acceptOrderFrom: mealConfig.acceptOrderFrom || '',
            acceptOrderTill: mealConfig.acceptOrderTill || '',
          },
          { emitEvent: false }
        );
      } else {
        this.form.patchValue(
          {
            acceptOrderFrom: '',
            acceptOrderTill: '',
          },
          { emitEvent: false }
        );
      }
    });
  }

  patchFormValue(group: any, item: any) {
    this.form.patchValue({
      itemName: item.itemName,
      mealType: group?.mealType || '',
      acceptOrderFrom: group?.acceptOrderFrom || '',
      acceptOrderTill: group?.acceptOrderTill || '',
      price: item.price,
      subsidy: item.subsidy ? item.subsidy : 0,
      category: item.category,
      itemType: item.itemType,
      precedence: item.precedence,
      isActive: item.isActive,
      doNotChangeInFuture: item.doNotChangeInFuture,
      description: item.description,
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
            (modalRef.componentInstance as any).uploadedImageUrl = imageUrl;
            (modalRef.componentInstance as any).imageWidth = 150;
            (modalRef.componentInstance as any).imageHeight = 150;
            (modalRef.componentInstance as any).aspectRatio = 1;
          } catch (e) {
            console.log('error while opening image cropper', e);
          }
        };
      }
    }
  }

  // EDIT / ADD
  async edit(group: any, item: any, index: any) {
    this.imageUrl = item.imageUrl;
    this.showUpdateBtn = true;
    this.menuId = item._id;
    this.editGroupItem = group
    this.patchFormValue(group, item);
    this.open();
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
      const formData = new FormData();

      if (this.imageUrl) {
        formData.append('image', this.uploadedImageFile);
      }

      formData.append('imageUrl', this.form.value.imageUrl || '');
      formData.append('description', this.form.value.description || '');
      formData.append('isActive', this.form.value.isActive);
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
      formData.append('subsidy', this.form.value.subsidy ?? 0);
      formData.append(
        'doNotChangeInFuture',
        this.form.value.doNotChangeInFuture ?? false
      );
      formData.append('category', this.form.value.category);
      formData.append('mealType', this.form.value.mealType || '');
      formData.append('acceptOrderFrom', this.form.value.acceptOrderFrom || '');
      formData.append('acceptOrderTill', this.form.value.acceptOrderTill || '');
      formData.append('itemType', this.form.value.itemType);
      formData.append('precedence', this.form.value.precedence ?? 0);
      formData.append('outletId', this.outletObj._id);
      formData.append('outletName', this.outletObj.outletName);
      formData.append('menuId', this.menuId);

      const res = await this.apiMainService.createQrMenu(
        formData,
        this.outletObj._id
      );

      if (res && res._id) {
        await this.init();
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

    // restore some sensible defaults
    this.form.patchValue({
      itemType: 'Veg',
      subsidy: 0,
      precedence: 0,
      isActive: false,
      doNotChangeInFuture: false,
    });
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
      formData.append('imageUrl', this.form.value.imageUrl || '');
      formData.append('description', this.form.value.description || '');
      formData.append(
        'isActive',
        this.form.value.isActive ? this.form.value.isActive : false
      );
      formData.append('itemName', this.form.value.itemName);
      formData.append('price', this.form.value.price);
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
      formData.append('mealType', this.form.value.mealType || '');
      formData.append('acceptOrderFrom', this.form.value.acceptOrderFrom || '');
      formData.append('acceptOrderTill', this.form.value.acceptOrderTill || '');
      formData.append('itemType', this.form.value.itemType);
      formData.append(
        'precedence',
        this.form.value.precedence ? this.form.value.precedence : 0
      );

      // Outlet
      formData.append('outletId', this.outletObj._id);
      formData.append('outletName', this.outletObj.outletName);

      const res = await this.apiMainService.createQrMenu(
        formData,
        this.outletObj._id
      );

      if (res && res._id) {
        this.sendDataToComponent.publish('SAVE_OUTLET_QR_MENU', res);
        await this.init();
      }
      this.resetValues();
    } catch (error) {
      console.log(error);
    }
  }

  // COPY MENU (creates a new identical menu item)
  async copyMenu(group: any, item: any) {
    console.log(group);

    try {
      const outletId = this.outletObj._id;
      const formData = new FormData();

      // reuse existing image via URL
      formData.append('imageUrl', item.imageUrl || '');
      formData.append('description', item.description || '');
      formData.append('isActive', item.isActive ?? false);
      formData.append('itemName', item.itemName || '');
      formData.append('price', item.price);
      formData.append('subsidy', item.subsidy ?? 0);
      formData.append(
        'doNotChangeInFuture',
        item.doNotChangeInFuture ?? false
      );
      formData.append('category', item.category || '');
      formData.append('mealType', group.mealType || '');
      formData.append('acceptOrderFrom', group.acceptOrderFrom || '');
      formData.append('acceptOrderTill', group.acceptOrderTill || '');
      formData.append('itemType', item.itemType || 'Veg');
      formData.append('precedence', item.precedence ?? 0);

      formData.append('outletId', group.outletId);
      formData.append('outletName', group.outletName);

      // Using same create API for copy
      const res = await this.apiMainService.createQrMenu(formData, outletId);

      if (res && res._id) {
        this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);
        await this.init();
      }
    } catch (error) {
      console.log('Error while copying menu item', error);
    }
  }

  async deleteFoodItem() {
    try {
      const res: any = await this.apiMainService.deleteQrMenuItem(
        this.groupItem.outletId,
        this.groupItem.mealType,
        this.foodItem._id
      );
      if (res && res._id) {
        this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);
        this.showCard = true;
        await this.init();
      }
      this.resetValues();
      this.back.emit(true);
    } catch (err) {
      console.log(err);
    }
  }

  async changeMenuActivation(checked: any) {
    const menu = this.menuInfo;

    menu.isActive = checked;

    const menuObj = {
      isActive: checked,
    };

    await this.apiMainService.changeQrMenuActivation(
      this.outletObj._id,
      menu._id,
      menuObj
    );

    // After activation change, refresh to be safe
    await this.init();
  }

  showPopup(group: any, item: any, i: any) {
    this.groupItem = group
    this.foodItem = item;
    this.confirmationModalService.modal(
      `Are you sure, you want to delete ${item.itemName}`,
      this.deleteFoodItem,
      this
    );
  }

  showPopupForItemActivation(menu: any, event: any) {
    this.menuInfo = menu;
    this.eventInfo = event.checked;
      this.changeMenuActivation(event.checked)
  }

  // MAT DIALOG OPENERS
  open() {
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
}

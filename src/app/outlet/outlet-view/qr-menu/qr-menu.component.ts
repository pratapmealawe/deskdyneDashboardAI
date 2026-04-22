import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { categoryList } from 'src/config/food-category.config';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { SendDataToComponent } from '@service/sendDataToComponent.service';
import { OutletViewService } from '../outlet-view.service';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-qr-menu',
  templateUrl: './qr-menu.component.html',
  styleUrls: ['./qr-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class QrMenuComponent implements OnInit {
  outletObj: any;

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild(MatPaginator) menuPaginator!: MatPaginator;

  categoryList = categoryList;

  form!: FormGroup;

  showCard: boolean = false;

  // Raw docs from API (one per mealType)
  qrMenus: any[] = [];

  // All groups (one per mealType doc) after filters
  allGroups: any[] = [];

  // Groups shown on current page
  groupedMenuList: any[] = [];

  menuId: any = 0;
  showUpdateBtn: boolean = false;
  foodItem: any;
  groupItem: any;
  editGroupItem: any;
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
    private sendDataToComponent: SendDataToComponent,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private outletViewService: OutletViewService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.setupMealTypeAutoTime();
    this.outletViewService.outlet$.subscribe(outlet => {
      if (outlet) {
        this.outletObj = outlet;
        this.init();
      }
    });
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
          categoryMenuType: doc.categoryMenuType,
          paidType: doc.paidType,
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
    const prev = group.isMealTypeActive;
    group.isMealTypeActive = checked;

    try {
      await this.apiMainService.changeQrMealTypeActivation(group.id, { checked });
      this.snackBar.open(
        `"${group.mealType}" is now ${checked ? 'enabled' : 'disabled'} for ordering.`,
        'Close',
        { duration: 2500 }
      );
    } catch (err) {
      group.isMealTypeActive = prev;
      this.snackBar.open('Failed to update meal status. Please try again.', 'Close', {
        duration: 2500,
      });
    }
  }


  // ===== MENUTYPE ON/OFF =====
  async ToggleCategoryMenuType(group: any, event: any) {
    const newType = event.value;
    const prev = group.categoryMenuType;
    group.categoryMenuType = newType;

    try {
      await this.apiMainService.changeCategoryMenuType(group.id, { categoryMenuType: newType });

      const msg =
        newType === 'fixed'
          ? `Menu mode set to FIXED for "${group.mealType}". Only one item can be active.`
          : `Menu mode set to DYNAMIC for "${group.mealType}". Multiple items can be active.`;

      this.snackBar.open(msg, 'Close', { duration: 3000 });
    } catch (err) {
      group.categoryMenuType = prev;
      this.snackBar.open('Failed to update menu mode. Please try again.', 'Close', {
        duration: 2500,
      });
    }
  }


  // ===== MENUTYPE ON/OFF =====
  async TogglePaidType(group: any, event: any) {
    const newPaidType = event.value;
    const prev = group.paidType;
    group.paidType = newPaidType;

    try {
      await this.apiMainService.changePaidType(group.id, { paidType: newPaidType });

      const msg =
        newPaidType === 'company'
          ? `Paid type set to COMPANY for "${group.mealType}".`
          : `Paid type set to USER for "${group.mealType}".`;

      this.snackBar.open(msg, 'Close', { duration: 2500 });
    } catch (err) {
      group.paidType = prev;
      this.snackBar.open('Failed to update paid type. Please try again.', 'Close', {
        duration: 2500,
      });
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
      maxQuantity: [1, [Validators.min(1)]],
      category: ['', Validators.required],
      itemType: ['Veg', Validators.required],
      precedence: [0, [Validators.min(0)]],
      isActive: [false],
      description: ['', [Validators.maxLength(200)]],
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
  }



  // EDIT / ADD
  async edit(group: any, item: any, index: any) {
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
      const data = {
        description: this.form.value.description || '',
        isActive: this.form.value.isActive,
        itemName: this.form.value.itemName,
        price: this.form.value.price,
        subsidy: this.form.value.subsidy ?? 0,
        maxQuantity: this.form.value.maxQuantity ?? 1,
        category: this.form.value.category,
        mealType: this.form.value.mealType || '',
        acceptOrderFrom: this.form.value.acceptOrderFrom || '',
        acceptOrderTill: this.form.value.acceptOrderTill || '',
        itemType: this.form.value.itemType,
        precedence: this.form.value.precedence ?? 0,
        outletId: this.outletObj._id,
        outletName: this.outletObj.outletName,
        menuId: this.menuId
      };

      const res = await this.apiMainService.createQrMenu(
        data,
        this.outletObj._id
      );

      if (res && res._id) {
        await this.init();
      }

      this.resetValues();
    } catch (error) {
    }
  }

  resetValues() {
    this.form.reset();
    this.menuId = '';
    this.showUpdateBtn = false;

    // restore some sensible defaults
    this.form.patchValue({
      itemType: 'Veg',
      subsidy: 0,
      maxQuantity: 1,
      precedence: 0,
      isActive: false,
    });
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const data = {
        description: this.form.value.description || '',
        isActive: this.form.value.isActive ? this.form.value.isActive : false,
        itemName: this.form.value.itemName,
        price: this.form.value.price,
        subsidy: this.form.value.subsidy ? this.form.value.subsidy : 0,
        maxQuantity: this.form.value.maxQuantity ? this.form.value.maxQuantity : 0,
        category: this.form.value.category,
        mealType: this.form.value.mealType || '',
        acceptOrderFrom: this.form.value.acceptOrderFrom || '',
        acceptOrderTill: this.form.value.acceptOrderTill || '',
        itemType: this.form.value.itemType,
        precedence: this.form.value.precedence ? this.form.value.precedence : 0,
        outletId: this.outletObj._id,
        outletName: this.outletObj.outletName,
      };

      const res = await this.apiMainService.createQrMenu(
        data,
        this.outletObj._id
      );

      if (res && res._id) {
        this.sendDataToComponent.publish('SAVE_OUTLET_QR_MENU', res);
        await this.init();
      }
      this.resetValues();
    } catch (error) {
    }
  }

  // COPY MENU (creates a new identical menu item)
  async copyMenu(group: any, item: any) {

    try {
      const outletId = this.outletObj._id;

      const data = {
        description: item.description || '',
        isActive: item.isActive ?? false,
        itemName: item.itemName || '',
        price: item.price,
        subsidy: item.subsidy ?? 0,
        maxQuantity: item.maxQuantity ?? 1,
        category: item.category || '',
        mealType: group.mealType || '',
        acceptOrderFrom: group.acceptOrderFrom || '',
        acceptOrderTill: group.acceptOrderTill || '',
        itemType: item.itemType || 'Veg',
        precedence: item.precedence ?? 0,
        outletId: group.outletId,
        outletName: group.outletName
      };

      // Using same create API for copy
      const res = await this.apiMainService.createQrMenu(data, outletId);

      if (res && res._id) {
        this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);
        await this.init();
      }
    } catch (error) {
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
    } catch (err) {
    }
  }

  async changeMenuActivation(menu: any, checked: boolean, showToast: boolean = true) {
    const prev = menu.isActive;
    menu.isActive = checked;

    const menuObj = { isActive: checked };

    try {
      await this.apiMainService.changeQrMenuActivation(
        this.outletObj._id,
        menu._id,
        menuObj
      );

      if (showToast) {
        this.snackBar.open(
          `Item "${menu.itemName}" ${checked ? 'activated' : 'deactivated'} successfully.`,
          'Close',
          { duration: 2500 }
        );
      }
    } catch (err) {
      menu.isActive = prev;

      if (showToast) {
        this.snackBar.open('Failed to update item status. Please try again.', 'Close', {
          duration: 2500,
        });
      }

      throw err;
    }
  }


  async onItemActiveToggle(group: any, menu: any, event: any) {
    const checked = event.checked;

    // DYNAMIC: simple toggle
    if (group.categoryMenuType === 'dynamic') {
      await this.changeMenuActivation(menu, checked);
      return;
    }

    // FIXED mode
    if (!checked) {
      // Just turning this one OFF
      await this.changeMenuActivation(menu, false);
      return;
    }

    // Turning ON in FIXED mode: only one active allowed
    const alreadyActive = (group.items || []).filter(
      (i: any) => i.isActive && i._id !== menu._id
    );

    try {
      // Deactivate all other active items in this group
      for (const other of alreadyActive) {
        await this.changeMenuActivation(other, false, false);
        other.isActive = false;
      }

      // Activate selected one
      await this.changeMenuActivation(menu, true, false);
      menu.isActive = true;

      this.snackBar.open(
        `Fixed mode: Activated "${menu.itemName}". Other active items in "${group.mealType}" were turned off.`,
        'Close',
        { duration: 3000 }
      );
    } catch (err) {

      // Revert UI state
      menu.isActive = false;
      alreadyActive.forEach((o: any) => (o.isActive = true));

      this.snackBar.open('Failed to update active item. Please try again.', 'Close', {
        duration: 3000,
      });
    }
  }


  showPopup(group: any, item: any, i: any) {
    this.groupItem = group
    this.foodItem = item;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${item.itemName} ?`,
      callback: this.deleteFoodItem,
      context: this
    });
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

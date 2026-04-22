import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { categoryList } from 'src/config/food-category.config';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { SendDataToComponent } from '@service/sendDataToComponent.service';
import { AddEventPopMenuComponent } from './add-event-pop-menu/add-event-pop-menu.component';
import { CopyEventPopMenuComponent } from './copy-event-pop-menu/copy-event-pop-menu.component';


@Component({
  selector: 'app-event-pop-menu',
  templateUrl: './event-pop-menu.component.html',
  styleUrls: ['./event-pop-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    AddEventPopMenuComponent,
    CopyEventPopMenuComponent
  ]

})
export class EventPopMenuComponent implements OnInit {

  @Input() eventObj: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataToParent = new EventEmitter<string>();

  @ViewChild(MatPaginator) menuPaginator!: MatPaginator;

  categoryList = categoryList;
  displayImgUrl = environment.imageUrl;
  showCard: boolean = false;

  // main list
  menuList: any[] = [];
  filteredMenuList: any[] = [];
  groupedMenuList: any[] = [];

  // filters
  searchTermMenu: string = '';
  selectedCategoryFilter: string = '';

  // pagination
  menuPageSize = 12; // Grid friendly
  menuPageIndex = 0;

  foodItem: any;

  constructor(
    private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService,
    private sendDataToComponent: SendDataToComponent,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventObj']) {
      this.eventObj = changes['eventObj'].currentValue;
      this.init();
    }
  }

  init() {
    if (this.eventObj?.menuList && this.eventObj.menuList.length > 0) {
      this.filteredMenuList = [...this.eventObj.menuList].sort((a: any, b: any) => a.precedence - b.precedence);
      this.showCard = true;
    } else {
      this.filteredMenuList = [];
      this.showCard = false;
    }

    this.menuPageIndex = 0;
    this.applyMenuFilters();
  }

  applyMenuFilters() {
    if (!this.eventObj?.menuList) {
      this.filteredMenuList = [];
      this.groupedMenuList = [];
      this.showCard = false;
      return;
    }

    let temp = [...this.eventObj.menuList].sort((a: any, b: any) => a.precedence - b.precedence);

    if (this.selectedCategoryFilter) {
      temp = temp.filter((item: any) => item.category === this.selectedCategoryFilter);
    }

    if (this.searchTermMenu) {
      const term = this.searchTermMenu.toLowerCase();
      temp = temp.filter((item: any) => (item.itemName || '').toLowerCase().includes(term));
    }

    this.filteredMenuList = temp;
    this.showCard = this.filteredMenuList.length > 0;
    this.menuPageIndex = 0;
    this.updateMenuPagination();
  }

  private buildGroupedMenu(list: any[]) {
    const grouped = list.reduce((acc: any, item: any) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) acc[category] = [];
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

  // ACTIONS
  edit(item: any) {
    this.open(item);
  }

  async deleteFoodItem() {
    const res = await this.apiMainService.deleteMenuItem(this.eventObj._id, this.foodItem._id);
    if (res && res._id) {
      this.eventObj = res;
      this.sendDataToComponent.publish('SAVE_OUTLET_MENU', res);
      this.init();
    }
  }

  async toggleStatus(menu: any, event: any) {
    const newState = event.checked;
    const oldState = menu.isActive;

    this.confirmationModalService.modal({
      msg: `Are you sure you want to ${newState ? 'Enable' : 'Disable'} ${menu.itemName}?`,
      callback: async () => {
        menu.isActive = newState;
        await this.apiMainService.toggleMenuItemStatus(this.eventObj._id, menu._id);
      },
      context: () => {
        event.source.checked = oldState;
      }
    });
  }

  showDeletePopup(item: any) {
    this.foodItem = item;
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete ${item.itemName}?`,
      callback: this.deleteFoodItem,
      context: this
    });
  }

  // DIALOGS
  open(item?: any) {
    const dialogRef = this.dialog.open(AddEventPopMenuComponent, {

      width: '900px',
      maxWidth: '95vw',
      panelClass: 'modern-dialog',
      data: { eventObj: this.eventObj, menuItem: item }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventObj = result;
        this.init();
      }
    });
  }

  openCopyMenu() {
    const dialogRef = this.dialog.open(CopyEventPopMenuComponent, {

      width: '900px',
      maxWidth: '95vw',
      panelClass: 'modern-dialog',
      data: { eventObj: this.eventObj }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventObj = result;
        this.init();
      }
    });
  }
}

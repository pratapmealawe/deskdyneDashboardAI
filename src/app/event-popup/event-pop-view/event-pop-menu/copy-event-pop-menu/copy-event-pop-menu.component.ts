import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-copy-event-pop-menu',
  templateUrl: './copy-event-pop-menu.component.html',
  styleUrls: ['./copy-event-pop-menu.component.scss'],
  standalone: true,

  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    FormsModule
  ]
})
export class CopyEventPopMenuComponent implements OnInit {


  displayImgUrl = environment.imageUrl;
  eventPopupList: any[] = [];
  selectedEvent: any = null;
  eventMenuList: any[] = [];
  selectedMenuItems: any[] = [];
  transformedMenuItems: any[] = [];
  searchTerm: string = '';
  originalMenuList: any[] = [];


  constructor(
    private apiMainService: ApiMainService,
    public dialogRef: MatDialogRef<CopyEventPopMenuComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.fetchAllOutlets();
  }

  async fetchAllOutlets() {
    try {
      const res = await this.apiMainService.getEventPopups();
      // Filter out the current event itself from the source list
      this.eventPopupList = (res || []).filter((e: any) => e._id !== this.data.eventObj._id);
    } catch (e) {
      console.log('error while fetching outlets', e);
      this.eventPopupList = [];
    }
  }

  onOutletChange() {
    if (this.selectedEvent) {
      this.originalMenuList = this.selectedEvent.menuList || [];
      this.eventMenuList = [...this.originalMenuList];
    } else {
      this.originalMenuList = [];
      this.eventMenuList = [];
    }
    this.searchTerm = '';
    this.selectedMenuItems = [];
    this.transformedMenuItems = [];
  }

  applyFilter() {
    if (!this.selectedEvent) return;
    const term = this.searchTerm.toLowerCase();
    this.eventMenuList = this.originalMenuList.filter(item =>
      (item.itemName || '').toLowerCase().includes(term) ||
      (item.description || '').toLowerCase().includes(term)
    );
  }


  onMenuItemToggle(item: any, event: any) {
    const checkbox = event.checked;

    if (checkbox) {
      this.selectedMenuItems.push(item);
      this.transformedMenuItems.push(item);
    } else {
      this.selectedMenuItems = this.selectedMenuItems.filter((i: any) => i._id !== item._id);
      this.transformedMenuItems = this.transformedMenuItems.filter((i: any) => i._id !== item._id);
    }
  }

  isMenuSelected(item: any): boolean {
    return this.selectedMenuItems.find((i) => i._id === item._id) !== undefined;
  }

  async addMenuItem() {
    if (this.transformedMenuItems.length === 0) return;

    try {
      const res = await this.apiMainService.addOutletList(
        this.data.eventObj._id,
        { eventPopupList: this.transformedMenuItems }
      );
      this.dialogRef.close(res);
    } catch (err) {
      console.log(err);
    }
  }

  dismiss() {
    this.dialogRef.close();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { environment } from '@environments/environment';
import { PermissionsService } from '@service/permission.service';
import { AddBulkMasterMenuComponent } from '../add-bulk-master-menu/add-bulk-master-menu.component';

@Component({
  selector: 'app-bulk-master-menu-card',
  templateUrl: './bulk-master-menu-card.component.html',
  styleUrls: ['./bulk-master-menu-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class BulkMasterMenuCardComponent implements OnInit {
  @Input() foodItem: any;
  @Output() refreshList = new EventEmitter<void>();

  imageUrl = environment.imageUrl;
  btnPolicy: any;
  fallbackImage = 'assets/images/dummyUpload.png';

  private menuInfo: any;
  private eventInfo: any;

  constructor(
    private confirmationModalService: ConfirmationModalService,
    private permissionsService: PermissionsService,
    private apiMainService: ApiMainService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.permissionsService.getCurrentButtonPolicy();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.fallbackImage;
  }

  // --- DELETE LOGIC ---
  showDeletePopup(event: Event): void {
    event.stopPropagation();
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete ${this.foodItem.itemName}?`,
      callback: this.deleteFoodItem,
      context: this
    });
  }

  async deleteFoodItem(): Promise<void> {
    try {
      await this.apiMainService.deleteBulkMasterMenu(this.foodItem._id);
      this.refreshList.emit();
    } catch (error) {
      console.error('Delete error', error);
    }
  }

  // --- EDIT LOGIC ---
  editFoodItem(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddBulkMasterMenuComponent, {
      width: '900px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: {
        editType: 'edit',
        editMenuItemObj: this.foodItem
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true || (result && result !== 'cancel')) {
        this.refreshList.emit();
      }
    });
  }

  // --- ACTIVATION LOGIC ---
  toggleActivation(event: any): void {
    this.menuInfo = this.foodItem;
    this.eventInfo = event;
    this.confirmationModalService.modal({
      msg: `Are you sure you want to ${event.checked ? 'Enable' : 'Disable'} ${this.foodItem.itemName}?`,
      callback: this.changeActivation,
      context: this,
    });
  }

  async changeActivation(): Promise<void> {
    const menu = this.menuInfo;
    const event = this.eventInfo;
    const originalState = !event.checked;

    try {
      await this.apiMainService.changeMasterMenuActivation(menu._id, { isActive: event.checked });
      menu.isActive = event.checked;
    } catch (error) {
      // Revert on failure
      menu.isActive = originalState;
      if (event.source) event.source.checked = originalState;
    }
  }
}

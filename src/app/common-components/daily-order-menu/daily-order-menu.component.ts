import { Component, Input, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ToasterService } from 'src/service/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { AddDailyOrderMenuComponent } from './add-daily-order-menu/add-daily-order-menu.component';
import { AddSubTypeDailyOrderMenuComponent } from './add-sub-type-daily-order-menu/add-sub-type-daily-order-menu.component';
import { AddVendorDailyOrderMenuComponent } from './add-vendor-daily-order-menu/add-vendor-daily-order-menu.component';
import { CopyDailyOrderMenuComponent } from './copy-daily-order-menu/copy-daily-order-menu.component';
import { ImportDailyOrderMenuComponent } from './import-daily-order-menu/import-daily-order-menu.component';

@Component({
  selector: 'app-daily-order-menu',
  templateUrl: './daily-order-menu.component.html',
  styleUrls: ['./daily-order-menu.component.scss']
})
export class DailyOrderMenuComponent implements OnInit {
  @Input() orgObj: any;
  selectedCafeteria: any;
  selectedCafeteriaName: any;
  selectedCafeteriaId: any;
  mealFilter: string = 'All Meal Types';

  displayedColumns: string[] = ['mealType', 'moq', 'charge', 'timeWindow', 'cutOff', 'sameDay', 'actions'];
  deliverySettings: any[] = [];
  vendorDetails: any;

  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    }
    this.getDailyOrderMenuByCafeteriaId();
  }

  getDailyOrderMenuByCafeteriaId() {
    this.apiMainService.getDailyOrderMenuByCafeteriaId(this.selectedCafeteriaId).then((res: any) => {
      if (res) {
        this.vendorDetails = res.vendorDetails;
        if (res.mealTypeList && res.mealTypeList.length > 0) {
          this.deliverySettings = res.mealTypeList;
        } else {
          this.deliverySettings = [];
        }
      } else {
        this.vendorDetails = undefined;
        this.deliverySettings = [];
      }
    }).catch((err: any) => {
      console.log(err);
    })
  }

  onCafeteriaChange(event: any) {
    this.selectedCafeteria = event.value;
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    this.getDailyOrderMenuByCafeteriaId();
  }

  openModal(component: any, data: any) {
    const dialogRef = this.modalService.open(component, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDailyOrderMenuByCafeteriaId();
    });
  }

  addDeliverySettings() {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
      existingMealTypes: this.deliverySettings.map(m => m.selectedMealType)
    }
    this.openModal(AddDailyOrderMenuComponent, payload);
  }

  onEdit(element: any) {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
      mealType: element,
      existingMealTypes: this.deliverySettings.map(m => m.selectedMealType)
    }
    this.openModal(AddDailyOrderMenuComponent, payload);
  }

  onDelete(element: any) {
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${element.selectedMealType} meal type`,
      callback: () => this.deleteMealType(element),
      context: this
    });
  }

  deleteMealType(element: any): void {
    const payload = {
      cafeteriaId: this.selectedCafeteriaId,
      selectedMealType: element.selectedMealType,
    }
    this.apiMainService.deleteMealType(payload).then((res: any) => {
      this.toaster.success('Meal type deleted successfully');
      this.getDailyOrderMenuByCafeteriaId();
    }).catch((err: any) => {
      console.log(err);
      this.toaster.error('Failed to delete meal type');
    })
  }

  onAddSubMenu(selectedMealType: any) {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
      selectedMealType: selectedMealType,
    }
    this.openModal(AddSubTypeDailyOrderMenuComponent, payload);
  }

  onEditSubMenu(selectedMealType: any, element: any) {
    const payload = {
      cafeteriaId: this.selectedCafeteriaId,
      selectedMealType: selectedMealType,
      mealConfigId: element._id,
      mealConfigData: element,
    }
    this.openModal(AddSubTypeDailyOrderMenuComponent, payload);
  }

  onDeleteSubMenu(selectedMealType: any, element: any) {
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete ${element.itemName} meal type`,
      callback: () => this.deleteSubMealType(selectedMealType, element),
      context: this
    });
  }

  deleteSubMealType(selectedMealType: any, element: any): void {
    const payload = {
      cafeteriaId: this.selectedCafeteriaId,
      selectedMealType: selectedMealType,
      mealConfigId: element._id,
    }
    this.apiMainService.deleteMealConfig(payload).then((res: any) => {
      this.toaster.success('Meal type deleted successfully');
      this.getDailyOrderMenuByCafeteriaId();
    }).catch((err: any) => {
      console.log(err);
      this.toaster.error('Failed to delete meal type');
    })
  }

  isActiveAndDeActiveMealConfig(selectedMealType: any, element: any): void {
    element.isActive = !element.isActive;
    const payload = {
      cafeteriaId: this.selectedCafeteriaId,
      selectedMealType: selectedMealType,
      mealConfigId: element._id,
      isActive: element.isActive,
    }
    this.apiMainService.isActiveAndDeActiveMealConfig(payload).then((res: any) => {
      this.toaster.success(`${element.isActive ? 'Meal type activated successfully' : 'Meal type deactivated successfully'}`);
      setTimeout(() => {
        this.getDailyOrderMenuByCafeteriaId();
      }, 1000);
    }).catch((err: any) => {
      console.log(err);
      this.toaster.error('Failed to update meal type status');
    })
  }

  assignVendor() {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
    }
    this.openModal(AddVendorDailyOrderMenuComponent, payload);
  }

  changeVendor() {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
      vendorDetails: this.vendorDetails,
    }
    this.openModal(AddVendorDailyOrderMenuComponent, payload);
  }

  copyMenu() {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
    }
    const dialogRef = this.modalService.open(CopyDailyOrderMenuComponent, {
      width: '1000px',
      data: payload,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getDailyOrderMenuByCafeteriaId();
    });
  }

  async exportMenu() {
    if (!this.deliverySettings || this.deliverySettings.length === 0) {
      this.toaster.warning('No menu items found to export');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Cafeteria Menu');

    // Title Row
    ws.mergeCells('A1:Q1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `Daily Order Menu - ${this.orgObj.organization_name} (${this.selectedCafeteriaName})`;
    titleCell.font = { bold: true, size: 16 };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE9ECEF' } };

    // Parent Header Row (Nested Labels)
    const parentHeader = [
      'Delivery Settings', '', '', '', '', '', '',
      'Meal Configuration', '', '',
      'Monday', '', '', 'Tuesday', '', '', 'Wednesday', '', '', 'Thursday', '', '', 'Friday', '', '', 'Saturday', '', '', 'Sunday', '', ''
    ];
    const parentRow = ws.addRow(parentHeader);

    // Merge parent header cells
    ws.mergeCells('A2:G2'); // Delivery Settings
    ws.mergeCells('H2:J2'); // Meal Config
    // Merge Days (each gets 3 columns: Name, Desc, Status)
    let charCode = 75; // Starting from 'K'
    for (let i = 0; i < 7; i++) {
      const startCol = 11 + (i * 3);
      const endCol = startCol + 2;
      ws.mergeCells(2, startCol, 2, endCol);
    }

    // Style parent header
    parentRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true, size: 12 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      if (colNumber <= 7) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCFE2FF' } }; // Blue
      else if (colNumber <= 10) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3CD' } }; // Yellow
      else cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1E7DD' } }; // Green
    });

    // Sub-Header Row
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const subHeaders = [
      'Meal Type', 'MOQ', 'Price', 'From', 'To', 'Cutoff', 'Same Day',
      'Item Name', 'Item Price', 'Kitchen Pay'
    ];
    days.forEach(() => {
      subHeaders.push('Item Name', 'Description', 'Status');
    });

    const headerRow = ws.addRow(subHeaders);
    headerRow.eachCell((cell: any) => {
      cell.font = { bold: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = { horizontal: 'center' };
    });

    // Column Widths
    const widths = [15, 8, 10, 10, 10, 10, 12, 25, 12, 12];
    for (let i = 0; i < 7; i++) {
      widths.push(25, 30, 15); // Name, Desc, Status for each day
    }
    widths.forEach((w, i) => ws.getColumn(i + 1).width = w);

    let currentRow = 4;

    this.deliverySettings.forEach((setting: any) => {
      const startCell = currentRow;
      const mealConfigs = setting.mealConfig || [];

      if (mealConfigs.length > 0) {
        mealConfigs.forEach((config: any) => {
          const rowValues = [
            setting.selectedMealType,
            setting.deliveryMOQ,
            setting.deliveryCharge,
            setting.deliveryTimeFrom,
            setting.deliveryTimeTo,
            setting.cutOffTime,
            config.isSameDay ? 'Yes' : 'No',
            config.itemName,
            config.mealPrice,
            config.payAmtToKitchen
          ];

          // Fill weekly menu horizontally with 3 cols per day
          days.forEach(dayName => {
            const dayData = config.weeklyMenu?.find((d: any) => d.itemDay === dayName);
            if (dayData) {
              rowValues.push(dayData.itemName || '');
              rowValues.push(dayData.itemDescription || '');
              rowValues.push(dayData.notApplicable ? 'Not Applicable' : 'Applicable');
            } else {
              rowValues.push('', '', '');
            }
          });

          const row = ws.addRow(rowValues);
          row.eachCell((cell: any) => {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          });
          currentRow++;
        });
      } else {
        const rowValues = [
          setting.selectedMealType,
          setting.deliveryMOQ,
          setting.deliveryCharge,
          setting.deliveryTimeFrom,
          setting.deliveryTimeTo,
          setting.cutOffTime,
          setting.isSameDay ? 'Yes' : 'No',
          '', '', ''
        ];
        for (let i = 0; i < 21; i++) rowValues.push('');
        const row = ws.addRow(rowValues);
        row.eachCell((cell: any) => {
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        currentRow++;
      }

      const endCell = currentRow - 1;
      if (startCell < endCell) {
        for (let col = 1; col <= 7; col++) {
          ws.mergeCells(startCell, col, endCell, col);
          const cell = ws.getCell(startCell, col);
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }
      }
    });

    // Write to Buffer and Save
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `Detailed_Menu_${this.orgObj.organization_name}_${this.selectedCafeteriaName}.xlsx`;
    saveAs(blob, fileName);
    this.toaster.success('Detailed menu exported successfully');
  }

  importMenu() {
    const payload = {
      organization_name: this.orgObj.organization_name,
      organizationId: this.orgObj._id,
      cafeteriaId: this.selectedCafeteriaId,
      cafeteriaName: this.selectedCafeteriaName,
    }
    const dialogRef = this.modalService.open(ImportDailyOrderMenuComponent, {
      width: '800px',
      data: payload,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        // Handle imported data
        this.getDailyOrderMenuByCafeteriaId();
      }
    });
  }

  formatTime(time: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    return `${hour}:${minutes} ${ampm}`;
  }
}

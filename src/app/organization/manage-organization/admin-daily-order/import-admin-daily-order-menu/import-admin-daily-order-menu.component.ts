import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ToasterService } from '@service/toaster.service';
import { ApiMainService } from '@service/apiService/apiMain.service';

@Component({
  selector: 'app-import-admin-daily-order-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './import-admin-daily-order-menu.component.html',
  styleUrls: ['./import-admin-daily-order-menu.component.scss']
})
export class ImportAdminDailyOrderMenuComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  isImporting = false;
  selectedFileName = '';
  importPreviewData: any[] = [];
  parsedData: any = null;

  constructor(
    private dialogRef: MatDialogRef<ImportAdminDailyOrderMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToasterService,
    private apiMainService: ApiMainService
  ) { }

  closeModal() {
    this.dialogRef.close();
  }

  async downloadTemplate() {
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Menu Template');

    // Parent Header Row
    const parentHeader = [
      'Delivery Settings', '', '', '', '', '', '',
      'Meal Configuration', '', '',
      'Monday', '', '', 'Tuesday', '', '', 'Wednesday', '', '', 'Thursday', '', '', 'Friday', '', '', 'Saturday', '', '', 'Sunday', '', ''
    ];
    const parentRow = ws.addRow(parentHeader);

    ws.mergeCells('A1:G1');
    ws.mergeCells('H1:J1');
    for (let i = 0; i < 7; i++) {
      const startCol = 11 + (i * 3);
      ws.mergeCells(1, startCol, 1, startCol + 2);
    }

    // Style parent header
    parentRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true, size: 12 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      if (colNumber <= 7) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCFE2FF' } };
      else if (colNumber <= 10) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3CD' } };
      else cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1E7DD' } };
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
    for (let i = 0; i < 7; i++) widths.push(25, 30, 15);
    widths.forEach((w, i) => ws.getColumn(i + 1).width = w);

    // Add a sample row
    const sampleRow = [
      'Lunch', 5, 0, '12:30', '14:00', '11:00', 'No',
      'Executive Veg Thali', 250, 210,
      'Paneer Butter Masala', 'Served with Roti & Rice', 'Applicable',
      'Aloo Gobhi', 'Standard side', 'Applicable',
      'Dal Fry', 'Lentil soup', 'Applicable',
      'Vegetable Pulao', 'Fragrant rice', 'Applicable',
      'Gulab Jamun', 'Dessert', 'Applicable',
      '', 'No service', 'Not Applicable',
      '', 'No service', 'Not Applicable'
    ];
    const row = ws.addRow(sampleRow);
    row.eachCell((cell: any) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Menu_Template_${this.data?.cafeteriaName || 'Cafeteria'}.xlsx`);
    this.toaster.success('Detailed template downloaded');
  }

  private formatTime(val: any): string {
    if (val instanceof Date) {
      // Excel stores time as Date. If year is 1899/1900, it's just a time cell.
      const hours = val.getHours().toString().padStart(2, '0');
      const minutes = val.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    if (typeof val === 'number') {
      // Excel stores time as fraction of day (0.5 = 12:00)
      const totalMinutes = Math.round(val * 24 * 60);
      const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
      const minutes = (totalMinutes % 60).toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return val ? val.toString().trim() : '';
  }

  private getCellValue(cell: any): any {
    if (!cell) return null;
    const val = cell.value;
    if (val && typeof val === 'object' && 'result' in val) {
      return val.result;
    }
    return val;
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFileName = file.name;
    this.isImporting = true;
    this.importPreviewData = [];

    try {
      const workbook = new ExcelJS.Workbook();
      const buffer = await file.arrayBuffer();
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.getWorksheet(1);

      const jsonData: any[] = [];
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      let lastDeliverySettings: any = null;

      worksheet?.eachRow((row, rowNumber) => {
        if (rowNumber <= 2) return; // Skip headers

        const mealTypeVal = this.getCellValue(row.getCell(1));
        const itemNameVal = this.getCellValue(row.getCell(8));

        const mealType = mealTypeVal?.toString()?.trim();
        const itemName = itemNameVal?.toString()?.trim();

        // Skip header repeated or empty rows
        if (mealType === 'Meal Type' && itemName === 'Item Name') return;
        if (!mealType && !itemName) return;

        // If mealType exists, update the current "active" delivery settings (for merged rows)
        if (mealType) {
          lastDeliverySettings = {
            mealType: mealType,
            moq: Number(this.getCellValue(row.getCell(2))) || 0,
            deliveryCharge: Number(this.getCellValue(row.getCell(3))) || 0,
            from: this.formatTime(this.getCellValue(row.getCell(4))),
            to: this.formatTime(this.getCellValue(row.getCell(5))),
            cutoff: this.formatTime(this.getCellValue(row.getCell(6))),
            isSameDay: ['yes', 'true', 'y'].includes(this.getCellValue(row.getCell(7))?.toString()?.trim().toLowerCase())
          };
        }

        // Must have an item name and delivery settings to create a menu entry
        if (!itemName || !lastDeliverySettings) return;

        const rowData: any = {
          ...lastDeliverySettings,
          itemName: itemName,
          mealPrice: Number(this.getCellValue(row.getCell(9))) || 0,
          kitchenPay: Number(this.getCellValue(row.getCell(10))) || 0,
          weeklyMenu: []
        };

        days.forEach((day, index) => {
          const colIndex = 11 + (index * 3);
          const dName = this.getCellValue(row.getCell(colIndex))?.toString()?.trim() || '';
          const dDesc = this.getCellValue(row.getCell(colIndex + 1))?.toString()?.trim() || '';
          const dStatus = this.getCellValue(row.getCell(colIndex + 2))?.toString()?.trim().toLowerCase() || '';

          rowData.weeklyMenu.push({
            itemDay: day,
            itemName: dName,
            itemDescription: dDesc,
            notApplicable: dStatus.includes('not') || dStatus.includes('n/a') || dStatus === 'no'
          });
        });

        jsonData.push(rowData);
        this.importPreviewData.push({
          mealType: rowData.mealType,
          itemName: rowData.itemName,
          price: rowData.mealPrice,
          isValid: true
        });
      });

      this.parsedData = jsonData;
      this.toaster.success(`Parsed ${jsonData.length} items successfully.`);
    } catch (error) {
      console.error('Error parsing file:', error);
      this.toaster.error('Error parsing file. Please use the provided template.');
    } finally {
      this.isImporting = false;
    }
  }

  async processImport() {
    if (!this.parsedData || this.parsedData.length === 0) return;

    this.isImporting = true;
    try {
      const mealTypeGroups = new Map<string, any>();

      // Group by delivery setting combination
      this.parsedData.forEach((row: any) => {
        const key = `${row.mealType}_${row.moq}_${row.deliveryCharge}_${row.from}_${row.to}_${row.cutoff}_${row.isSameDay}`;

        if (!mealTypeGroups.has(key)) {
          mealTypeGroups.set(key, {
            selectedMealType: row.mealType,
            deliveryMOQ: row.moq,
            deliveryCharge: row.deliveryCharge,
            isSameDay: row.isSameDay,
            cutOffTime: row.cutoff,
            deliveryTimeFrom: row.from,
            deliveryTimeTo: row.to,
            mealConfig: []
          });
        }

        const group = mealTypeGroups.get(key);
        group.mealConfig.push({
          itemName: row.itemName,
          mealPrice: row.mealPrice,
          payAmtToKitchen: row.kitchenPay,
          isActive: true,
          weeklyMenu: row.weeklyMenu
        });
      });

      const payload = {
        organization_name: this.data.organization_name,
        organizationId: this.data.organizationId,
        cafeteriaId: this.data.cafeteriaId,
        cafeteriaName: this.data.cafeteriaName,
        mealTypeList: Array.from(mealTypeGroups.values())
      };

      this.apiMainService.addBulkDailyOrderMenu(payload).then((res: any) => {
        this.dialogRef.close(true);
        this.toaster.success('Menu items imported successfully');
      }).catch((error: any) => {
        console.error('API Error:', error);
        this.toaster.error('Server failed to import menu items');
      });
    } catch (error) {
      console.error('Process Import Error:', error);
      this.toaster.error('An error occurred during import processing');
    } finally {
      this.isImporting = false;
    }
  }
}

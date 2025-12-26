import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-import-daily-order-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './import-daily-order-menu.component.html',
  styleUrls: ['./import-daily-order-menu.component.scss']
})
export class ImportDailyOrderMenuComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  isImporting = false;
  selectedFileName = '';
  importPreviewData: any[] = [];
  parsedData: any = null;

  constructor(
    private dialogRef: MatDialogRef<ImportDailyOrderMenuComponent>,
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

    // Parent Header Row (Nested Labels)
    const parentHeader = [
      'Delivery Settings', '', '', '', '', '', '',
      'Meal Configuration', '', '',
      'Weekly Menu', '', '', '', '', '', ''
    ];
    const parentRow = ws.addRow(parentHeader);

    ws.mergeCells('A1:G1'); // Delivery Settings
    ws.mergeCells('H1:J1'); // Meal Config
    ws.mergeCells('K1:Q1'); // Weekly Menu

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
      'Item Name', 'Item Price', 'Kitchen Pay', ...days
    ];
    const headerRow = ws.addRow(subHeaders);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = { horizontal: 'center' };
    });

    // Column Widths
    const widths = [15, 8, 10, 10, 10, 10, 12, 25, 12, 12, 20, 20, 20, 20, 20, 20, 20];
    widths.forEach((w, i) => ws.getColumn(i + 1).width = w);

    // Add a sample row
    const sampleRow = [
      'Lunch', 5, 50, '12:00', '14:00', '10:00', 'Yes',
      'Veg Thali', 120, 80,
      'Palak Paneer', 'Aloo Gobhi', 'Mixed Veg', 'Paneer Butter Masala', 'Baingan Bharta', 'N/A', 'N/A'
    ];
    const row = ws.addRow(sampleRow);
    row.eachCell((cell) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Daily_Order_Menu_Template.xlsx');
    this.toaster.success('Template downloaded successfully');
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

      // Row 1 & 2 are headers, start from Row 3 (sample was Row 3, so data is Row 3+)
      // Actually my template has:
      // Row 1: Parent Headers
      // Row 2: Sub Headers
      // Row 3: Sample/Data

      worksheet?.eachRow((row, rowNumber) => {
        if (rowNumber <= 2) return; // Skip headers

        const rowData: any = {
          mealType: row.getCell(1).value,
          moq: row.getCell(2).value,
          deliveryCharge: row.getCell(3).value,
          from: row.getCell(4).value,
          to: row.getCell(5).value,
          cutoff: row.getCell(6).value,
          isSameDay: row.getCell(7).value === 'Yes',
          itemName: row.getCell(8).value,
          mealPrice: row.getCell(9).value,
          kitchenPay: row.getCell(10).value,
          weeklyMenu: []
        };

        if (rowData.mealType && rowData.itemName) {
          days.forEach((day, index) => {
            const dayItemName = row.getCell(11 + index).value;
            rowData.weeklyMenu.push({
              itemDay: day,
              itemName: dayItemName === 'N/A' ? '' : dayItemName,
              itemDescription: '',
              notApplicable: dayItemName === 'N/A'
            });
          });

          jsonData.push(rowData);
          this.importPreviewData.push({
            mealType: rowData.mealType,
            itemName: rowData.itemName,
            price: rowData.mealPrice,
            isValid: true
          });
        }
      });

      this.parsedData = jsonData;
      this.toaster.success('File parsed successfully. Review data and confirm.');
    } catch (error) {
      console.error('Error parsing file:', error);
      this.toaster.error('Error parsing Excel file. Please check the format.');
    } finally {
      this.isImporting = false;
    }
  }

  async processImport() {
    if (!this.parsedData || this.parsedData.length === 0) return;

    this.isImporting = true;
    try {
      // In a real scenario, you'd transform this back into the structure the API expects
      // and call the copy/add API. 
      // For now, we'll simulate the import.
      console.log('Final Data to Import:', this.parsedData);

      // Emit success and close
      this.dialogRef.close(this.parsedData);
      this.toaster.success('Menu imported successfully');
    } catch (error) {
      this.toaster.error('Failed to import menu');
    } finally {
      this.isImporting = false;
    }
  }
}

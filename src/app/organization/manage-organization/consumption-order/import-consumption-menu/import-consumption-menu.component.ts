import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-import-consumption-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatDialogModule],
  templateUrl: './import-consumption-menu.component.html',
  styleUrls: ['./import-consumption-menu.component.scss']
})
export class ImportConsumptionMenuComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  menuList: any[] = [];
  isLoading = false;
  fileName: string | null = null;
  dragOver = false;
  currentStep: 'select' | 'preview' = 'select';

  constructor(
    private api: ApiMainService,
    private toaster: ToasterService,
    private dialogRef: MatDialogRef<ImportConsumptionMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orgObj: any, selectedCafeteria: any }
  ) { }

  ngOnInit(): void {
  }

  async downloadTemplate() {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Menu Template');

      worksheet.columns = [
        { header: 'Item Name', key: 'name', width: 30 },
        { header: 'Price (Incl. GST)', key: 'price', width: 20 },
        { header: 'Min Guarantees', key: 'mg', width: 20 }
      ];

      // Header styling
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0E49B5' }
      };

      // Samples
      worksheet.addRow({ name: 'Deluxe Veg Thali', price: 150, mg: 20 });
      worksheet.addRow({ name: 'Paneer Lababdar', price: 180, mg: 10 });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Menu_Import_Template_${this.data.selectedCafeteria?.cafeteria_name || 'Outlet'}.xlsx`);

      this.toaster.success('Menu template downloaded');
    } catch (error) {
      console.error('Template download error:', error);
      this.toaster.error('Failed to download template');
    }
  }

  async onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) return;
    await this.processFile(target.files[0]);
  }

  async processFile(file: File) {
    this.isLoading = true;
    this.fileName = file.name;

    try {
      let data: any = await this.uploadExcel(file);
      if (data && data.length > 0) {
        const parsedItems: any[] = [];

        data.forEach((row: any) => {
          const itemName = row[0];
          // Skip header or empty rows
          if (itemName && itemName !== 'Item Name') {
            parsedItems.push({
              itemName: itemName,
              mealPrice: parseFloat(row[1]) || 0,
              minGuarantees: parseInt(row[2]) || 0,
              selctedmealtype: '' // Default or can be inferred
            });
          }
        });

        if (parsedItems.length > 0) {
          this.menuList = parsedItems;
          this.currentStep = 'preview';
          this.toaster.success(`${parsedItems.length} menu items parsed.`);
        } else {
          this.toaster.warning('No valid menu items found in file.');
        }
      }
    } catch (error) {
      console.error('Excel processing error:', error);
      this.toaster.error('Failed to process Excel file.');
    } finally {
      this.isLoading = false;
      if (this.fileInput) this.fileInput.nativeElement.value = '';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer?.files.length === 1) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  resetImport() {
    this.currentStep = 'select';
    this.menuList = [];
    this.fileName = null;
  }

  async onSubmit() {
    if (this.menuList.length === 0) return;

    this.isLoading = true;
    try {
      const payload = {
        organization_name: this.data.orgObj.organization_name,
        organization_id: this.data.orgObj._id,
        cafeteria_name: this.data.selectedCafeteria.cafeteria_name,
        cafeteria_id: this.data.selectedCafeteria.cafeteria_id,
        cafeteria_orignal_id: this.data.selectedCafeteria._id,
        mealTypeList: this.menuList
      };

      await this.api.addConsumptionOrderList(payload);
      this.toaster.success('Menu items imported successfully.');
      this.dialogRef.close(true);

    } catch (error: any) {
      console.error('Import error:', error);
      this.toaster.error(error?.error?.msg || 'Failed to import menu list');
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  async uploadExcel(file: File): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.getWorksheet(1);
    const data: any[] = [];
    worksheet?.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      const values = Array.isArray(row.values) ? row.values.slice(1) : [];
      data.push(values);
    });
    return data;
  }
}

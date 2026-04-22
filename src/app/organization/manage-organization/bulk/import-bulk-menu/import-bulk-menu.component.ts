import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@service/toaster.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-import-bulk-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './import-bulk-menu.component.html',
  styleUrls: ['./import-bulk-menu.component.scss']
})
export class ImportBulkMenuComponent implements OnInit {
  selectedFileName: string = '';
  isImporting: boolean = false;
  importPreviewData: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<ImportBulkMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToasterService,
    private api: ApiMainService
  ) { }

  ngOnInit(): void { }

  closeModal(): void {
    this.dialogRef.close();
  }

  downloadTemplate(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bulk Menu Template');

    worksheet.columns = [
      { header: 'Item Name*', key: 'itemName', width: 25 },
      { header: 'Item Type (Veg/NonVeg)*', key: 'itemType', width: 20 },
      { header: 'Category*', key: 'group', width: 15 },
      { header: 'Description', key: 'itemDescription', width: 30 },
      { header: 'Kitchen Payout*', key: 'payAmtToKitchen', width: 15 },
      { header: 'Slab 1 Price*', key: 'slab1Price', width: 15 },
      { header: 'Slab 2 Price*', key: 'slab2Price', width: 15 },
      { header: 'Slab 3 Price*', key: 'slab3Price', width: 15 },
      { header: 'Slab 4 Price*', key: 'slab4Price', width: 15 }
    ];

    // Add example row
    worksheet.addRow({
      itemName: 'Example Meal',
      itemType: 'Veg',
      group: 'Main Course',
      itemDescription: 'Delicious meal description',
      payAmtToKitchen: 100,
      slab1Price: 150,
      slab2Price: 140,
      slab3Price: 130,
      slab4Price: 120
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Bulk_Menu_Template.xlsx`;
      link.click();
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.parseExcel(file);
    }
  }

  async parseExcel(file: File): Promise<void> {
    this.isImporting = true;
    const workbook = new ExcelJS.Workbook();
    try {
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.getWorksheet(1);
      const preview: any[] = [];

      worksheet?.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Skip header
          const item = {
            itemName: row.getCell(1).value,
            itemType: row.getCell(2).value,
            group: row.getCell(3).value,
            itemDescription: row.getCell(4).value,
            payAmtToKitchen: Number(row.getCell(5).value),
            slab1Price: Number(row.getCell(6).value),
            slab2Price: Number(row.getCell(7).value),
            slab3Price: Number(row.getCell(8).value),
            slab4Price: Number(row.getCell(9).value),
            isValid: !!row.getCell(1).value && !!row.getCell(2).value && !!row.getCell(5).value
          };
          preview.push(item);
        }
      });

      this.importPreviewData = preview;
    } catch (error) {
      this.toaster.error('Error reading excel file');
    } finally {
      this.isImporting = false;
    }
  }

  async processImport(): Promise<void> {
    if (this.importPreviewData.length === 0) return;

    this.isImporting = true;
    try {
      // In a real scenario, we might send this to the parent or call an API
      // For now, we'll return the data to the parent to be added to the list
      this.dialogRef.close(this.importPreviewData.filter(i => i.isValid));
      this.toaster.success('Menu data imported to list');
    } catch (error) {
      this.toaster.error('Failed to import menu');
    } finally {
      this.isImporting = false;
    }
  }
}

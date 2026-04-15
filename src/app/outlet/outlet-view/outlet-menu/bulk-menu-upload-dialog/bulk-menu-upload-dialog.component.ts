import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { categoryList } from 'src/config/food-category.config';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-bulk-menu-upload-dialog',
  templateUrl: './bulk-menu-upload-dialog.component.html',
  styleUrls: ['./bulk-menu-upload-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class BulkMenuUploadDialogComponent implements OnInit {
  outletId = '';
  outletObj: any;
  isUploading = false;
  fileName = '';
  parsedData: any[] = [];
  isValidFile = false;
  errorMessage = '';
  categoryList = categoryList;

  constructor(
    public dialogRef: MatDialogRef<BulkMenuUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { outletId: string, outletObj: any },
    private snackBar: MatSnackBar,
    private apiMainService: ApiMainService
  ) {
    this.outletId = data.outletId;
    this.outletObj = data.outletObj;
  }

  ngOnInit(): void {
  }

  downloadTemplate() {
    const workbook = new ExcelJS.Workbook();

    // Main sheet
    const worksheet = workbook.addWorksheet('Outlet Menu Template');

    // Hidden sheet
    const hiddenSheet = workbook.addWorksheet('DropdownData');
    hiddenSheet.state = 'veryHidden';

    // Fill category list
    this.categoryList.forEach((cat, index) => {
      hiddenSheet.getCell(`A${index + 1}`).value = cat.value;
    });

    const categoryRange = `DropdownData!$A$1:$A$${this.categoryList.length}`;

    // Columns
    worksheet.columns = [
      { header: 'Item Name', key: 'itemName', width: 25 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Price', key: 'price', width: 12 },
      { header: 'Category', key: 'category', width: 25 },
      { header: 'Item Type', key: 'itemType', width: 18 },
      { header: 'Subsidy', key: 'subsidy', width: 12 },
      { header: 'Is Active', key: 'isActive', width: 15 },
      { header: 'Precedence', key: 'precedence', width: 12 },
      {
        header: 'Meal Types (e.g. Lunch,Dinner,Breakfast,Fullday,EveningSnacks)',
        key: 'mealTypes',
        width: 45
      },
    ];

    // Header styling
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Freeze header
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    // Sample row
    worksheet.addRow({
      itemName: 'Special Thali',
      description: 'Full vegetarian meal with sweet',
      price: 140,
      category: 'Thali',
      itemType: 'Veg',
      subsidy: 10,
      isActive: 'TRUE',
      precedence: 1,
      mealTypes: 'Lunch,Dinner',
    });

    // Apply validations
    for (let i = 2; i <= 100; i++) {

      // ✅ Category dropdown (SAFE)
      worksheet.getCell(`D${i}`).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: [`=${categoryRange}`],
        showErrorMessage: true,
        error: 'Select a valid category'
      };

      // Veg / NonVeg
      worksheet.getCell(`E${i}`).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: ['"Veg,NonVeg"'],
      };

      // TRUE / FALSE
      worksheet.getCell(`G${i}`).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: ['"TRUE,FALSE"'],
      };
    }

    // Notes
    worksheet.getCell('D1').note = 'Select category from dropdown';
    worksheet.getCell('E1').note = 'Veg or NonVeg';
    worksheet.getCell('G1').note = 'TRUE = Active';
    worksheet.getCell('I1').note = 'Comma separated (e.g. Lunch,Dinner)';

    // Align numeric columns
    ['C', 'F', 'H'].forEach(col => {
      worksheet.getColumn(col).alignment = { horizontal: 'center' };
    });

    // Download
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'Outlet_Menu_Upload_Template.xlsx');
    });
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      this.setError('File size exceeds 5MB limit');
      return;
    }
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      try {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          this.setError('Invalid Excel file');
          return;
        }
        this.parsedData = [];
        const errors: string[] = [];
        worksheet.eachRow((row: any, rowNumber: number) => {
          if (rowNumber === 1) return;
          if (!row.getCell(1).value) return;

          const rowErrors: string[] = [];

          const itemName = row.getCell(1).value?.toString().trim();
          const description = row.getCell(2).value?.toString().trim() || '';
          const price = Number(row.getCell(3).value);
          const category = row.getCell(4).value?.toString().trim();

          let itemType = row.getCell(5).value?.toString().trim();
          if (itemType) {
            itemType = itemType.toLowerCase().includes('veg') && !itemType.toLowerCase().includes('non')
              ? 'Veg'
              : 'NonVeg';
          }

          const subsidy = Number(row.getCell(6).value) || 0;
          const isActive = row.getCell(7).value?.toString().toLowerCase() === 'true';
          const precedence = Number(row.getCell(8).value) || 0;
          const mealTypes = row.getCell(9).value
            ? row.getCell(9).value.toString().split(',').map((m: string) => m.trim())
            : [];

          if (!itemName) rowErrors.push(`Row ${rowNumber}: Item Name required`);
          if (!price || price <= 0) rowErrors.push(`Row ${rowNumber}: Invalid Price`);
          if (!category) rowErrors.push(`Row ${rowNumber}: Category required`);
          if (!itemType) rowErrors.push(`Row ${rowNumber}: Item Type required`);

          if (rowErrors.length) {
            errors.push(...rowErrors);
            return;
          }

          this.parsedData.push({
            itemName,
            description,
            price,
            category,
            itemType,
            subsidy,
            isActive,
            precedence,
            mealTypes,
          });
        });

        if (errors.length) {
          const showErrors = errors.slice(0, 5).join('<br>');
          const more = errors.length > 5 ? `<br>...and ${errors.length - 5} more` : '';
          this.setError(`Validation Failed:<br>${showErrors}${more}`);
          return;
        }
        if (!this.parsedData.length) {
          this.setError('No valid rows found');
          return;
        }
        this.isValidFile = true;
        this.errorMessage = '';
      } catch (err) {
        console.error(err);
        this.setError('Invalid Excel format');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  setError(msg: string) {
    this.errorMessage = msg;
    this.isValidFile = false;
    this.parsedData = [];
  }

  async upload() {
    if (!this.parsedData.length) return;

    this.parsedData = this.parsedData.map(item => {
      const mealTimingInfo = this.outletObj?.mealTiming?.filter((meal: any) =>
        item.mealTypes?.includes(meal.mealType)
      );
      return {
        ...item,
        mealTimingInfo
      };
    });
    this.isUploading = true;
    try {
      const res = await this.apiMainService.bulkUploadOutletMenu(this.parsedData, this.outletId);
      if (res && res.length > 0) {
        this.snackBar.open('Bulk menus uploaded successfully', 'OK', { duration: 3000 });
        this.dialogRef.close(res);
      } else {
        this.snackBar.open(res?.message || 'Upload failed', 'OK', { duration: 3000 });
      }
    }
    catch (err) {
      console.error(err);
      this.snackBar.open('Upload Failed', 'OK', { duration: 3000 });
    }
    finally {
      this.isUploading = false;
    }

  }

  close(result?: any) {
    this.dialogRef.close(result);
  }

}

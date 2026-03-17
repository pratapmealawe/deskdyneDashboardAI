import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-bulk-menu-upload-dialog',
  templateUrl: './bulk-menu-upload-dialog.component.html',
  styleUrls: ['./bulk-menu-upload-dialog.component.scss']
})
export class BulkMenuUploadDialogComponent {
  outletId = '';
  outletObj: any;
  isUploading = false;
  fileName = '';
  parsedData: any[] = [];
  isValidFile = false;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<BulkMenuUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { outletId: string, outletObj: any },
    private snackBar: MatSnackBar,
    private apiMainService: ApiMainService
  ) {
    this.outletId = data.outletId;
    this.outletObj = data.outletObj;
  }

  downloadTemplate() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bulk Menu Template');
    worksheet.columns = [
      { header: 'Item Name', key: 'itemName', width: 25 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Price', key: 'price', width: 12 },
      { header: 'Category', key: 'category', width: 18 },
      { header: 'Sub Category', key: 'subCategory', width: 18 },
      { header: 'Item Type (Veg/NonVeg)', key: 'itemType', width: 18 },
      { header: 'Quantity Available', key: 'quantityAvailable', width: 18 },
      { header: 'Set Daily Quantity', key: 'setDailyQuantity', width: 18 },
      { header: 'Subsidy', key: 'subsidy', width: 10 },
      { header: 'Is Active (TRUE/FALSE)', key: 'isActive', width: 18 },
      { header: 'Do Not Change In Future (TRUE/FALSE)', key: 'doNotChangeInFuture', width: 25 },
      { header: 'Precedence', key: 'precedence', width: 12 },
      { header: 'Meal Types (comma separated)', key: 'mealTypes', width: 30 },
      { header: 'Energy Value', key: 'energyValue', width: 12 },
      { header: 'Image Url', key: 'imageUrl', width: 30 }
    ];
    worksheet.addRow({
      itemName: 'Special Thali',
      description: 'Full vegetarian meal with sweet',
      price: 140,
      category: 'Dinner',
      subCategory: 'Thali',
      itemType: 'Veg',
      quantityAvailable: 40,
      setDailyQuantity: 50,
      subsidy: 10,
      isActive: true,
      doNotChangeInFuture: false,
      precedence: 1,
      mealTypes: 'Lunch,Dinner',
      energyValue: 250,
      imageUrl: ''
    });
    worksheet.getRow(1).font = { bold: true };
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob(
        [buffer],
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      );
      saveAs(blob, 'Bulk_Menu_Upload_Template.xlsx');
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
          const subCategory = row.getCell(5).value?.toString().trim() || '';
          let itemType = row.getCell(6).value?.toString().trim();
          if (itemType) {
            itemType = itemType.toLowerCase().includes('veg') && !itemType.toLowerCase().includes('non')
              ? 'Veg'
              : 'NonVeg';
          }
          const quantityAvailable = Number(row.getCell(7).value) || 0;
          const setDailyQuantity = Number(row.getCell(8).value) || 0;
          const subsidy = Number(row.getCell(9).value) || 0;
          const isActive = row.getCell(10).value?.toString().toLowerCase() === 'true';
          const doNotChangeInFuture = row.getCell(11).value?.toString().toLowerCase() === 'true';
          const precedence = Number(row.getCell(12).value) || 0;
          const mealTypes = row.getCell(13).value
            ? row.getCell(13).value.toString().split(',').map((m: string) => m.trim())
            : [];
          const energyValue = Number(row.getCell(14).value) || 0;
          const imageUrl = row.getCell(15).value?.toString().trim() || '';
          /* validations */
          if (!itemName)
            rowErrors.push(`Row ${rowNumber}: Item Name required`);
          if (!price || price <= 0)
            rowErrors.push(`Row ${rowNumber}: Invalid Price`);
          if (!category)
            rowErrors.push(`Row ${rowNumber}: Category required`);
          if (!itemType)
            rowErrors.push(`Row ${rowNumber}: Item Type required`);
          if (rowErrors.length) {
            errors.push(...rowErrors);
            return;
          }
          this.parsedData.push({
            itemName,
            description,
            price,
            category,
            subCategory,
            itemType,
            quantityAvailable,
            setDailyQuantity,
            subsidy,
            isActive,
            doNotChangeInFuture,
            precedence,
            mealTypes,
            energyValue,
            imageUrl
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
      }
      catch (err) {
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
      if (res && res._id) {
        this.snackBar.open('Bulk menu upload successful', 'OK', { duration: 3000 });
        this.dialogRef.close(res);
      } else {
        this.snackBar.open(res?.message || 'Upload failed', 'OK', { duration: 3000 });
      }
    }
    catch (err) {
      console.error(err);
      this.snackBar.open('Upload failed', 'OK', { duration: 3000 });
    }
    finally {
      this.isUploading = false;
    }

  }

  close(result?: any) {
    this.dialogRef.close(result);
  }

}

import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../material.module';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-import-virtual-cafeteria-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './import-virtual-cafeteria-categories.component.html',
  styleUrls: ['./import-virtual-cafeteria-categories.component.scss']
})
export class ImportVirtualCafeteriaCategoriesComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  categoryList: any[] = [];
  isLoading = false;
  fileName: string | null = null;
  dragOver = false;
  currentStep: 'select' | 'preview' = 'select';

  constructor(
    private api: ApiMainService,
    private toaster: ToasterService,
    private dialogRef: MatDialogRef<ImportVirtualCafeteriaCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orgObj: any, selectedCafeteria?: any }
  ) { }

  ngOnInit(): void {
  }

  async downloadTemplate() {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Category Template');

      worksheet.columns = [
        { header: 'Category Name', key: 'name', width: 25 },
        { header: 'Display Name', key: 'displayName', width: 25 },
        { header: 'Priority', key: 'priority', width: 10 },
        { header: 'Description', key: 'description', width: 40 },
        { header: 'Show Only To Employees (Yes/No)', key: 'showOnlyToEmployees', width: 30 }
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      worksheet.addRow({
        name: 'lunch',
        displayName: 'Lunch',
        priority: 1,
        description: 'Daily lunch specials',
        showOnlyToEmployees: 'No'
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Virtual_Cafeteria_Category_Template.xlsx`);

      this.toaster.success('Import template downloaded');
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
        const excelCategories: any[] = [];

        data.forEach((elm: any) => {
          if (elm[0] && elm[0] !== 'Category Name') {
            excelCategories.push({
              categoryName: elm[0] || '',
              categoryDisplayName: elm[1] || '',
              priority: Number(elm[2]) || 0,
              description: elm[3] || '',
              showOnlyToEmployees: String(elm[4]).toLowerCase() === 'yes',
              org_id: this.data.orgObj._id,
              cafeteria_id: this.data.selectedCafeteria?.cafeteria_id || '',
            });
          }
        });

        if (excelCategories.length > 0) {
          this.categoryList = excelCategories;
          this.currentStep = 'preview';
          this.toaster.success(`${excelCategories.length} records parsed.`);
        } else {
          this.toaster.warning('No valid category records found.');
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
    this.categoryList = [];
    this.fileName = null;
  }

  async onSubmit() {
    if (this.categoryList.length === 0) return;

    this.isLoading = true;
    try {
      const res: any = await this.api.addVirtualCafeteriaCategoryList({ categoryList: this.categoryList });
      
      const successCount = res?.success?.length || 0;
      const skippedCount = res?.skipped?.length || 0;

      if (successCount > 0) {
        this.toaster.success(`${successCount} categories imported successfully.`);
      }

      if (skippedCount > 0) {
        this.toaster.warning(`${skippedCount} categories were skipped (likely duplicates).`);
      }

      if (successCount > 0) {
        this.dialogRef.close(true);
      }
    } catch (error: any) {
      console.error('Import error:', error);
      this.toaster.error('Failed to import categories.');
    } finally {
      this.isLoading = false;
    }
  }

  close() {
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

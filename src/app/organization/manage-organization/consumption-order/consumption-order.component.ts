import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MaterialModule } from '../../../material.module';
import { AddConsumptionOrderComponent } from './add-consumption-order/add-consumption-order.component';
import { ImportConsumptionMenuComponent } from './import-consumption-menu/import-consumption-menu.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-consumption-order', 
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, AddConsumptionOrderComponent, ImportConsumptionMenuComponent],
  templateUrl: './consumption-order.component.html',
  styleUrls: ['./consumption-order.component.scss']
})
export class ConsumptionOrderComponent implements OnChanges, OnInit {
  @Input() orgObj: any;
  selectedCafeteria: any;
  selectedCafeteriaName: any;
  selectedCafeteriaId: any;
  disableSubmit: any = false;
  consumptionList: any = [];
  searchTerm = '';
  @ViewChild("content") content: any;

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    }
    this.fetchOrgMeals();
  }

  selectCafeteria(cafeteria: any) {
    this.selectedCafeteria = cafeteria;
    this.selectedCafeteriaName = cafeteria.cafeteria_name;
    this.selectedCafeteriaId = cafeteria.cafeteria_id;
  }

  getFilteredItems(): any[] {
    if (!this.consumptionList) return [];
    let items: any[] = [];
    this.consumptionList.forEach((consumptionItem: any) => {
      if (consumptionItem.cafeteria_id === this.selectedCafeteriaId) {
        consumptionItem.mealTypeList?.forEach((mealItem: any) => {
          items.push({ ...mealItem, cafeteria_orignal_id: consumptionItem.cafeteria_orignal_id });
        });
      }
    });

    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      items = items.filter(item => 
        item.itemName?.toLowerCase().includes(search) || 
        item.mealPrice?.toString().includes(search) ||
        item.minGuarantees?.toString().includes(search)
      );
    }

    return items;
  }

  async exportMenu() {
    const items = this.getFilteredItems();
    if (items.length === 0) {
      alert('No menu items to export');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Consumption Menu');

    // Header styling
    const headerRow = worksheet.addRow(['Item Name', 'Price (Incl. GST)', 'Min Guarantees', 'Cafeteria']);
    headerRow.eachCell((cell) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0E49B5' } };
      cell.font = { color: { argb: 'FFFFFF' }, bold: true };
    });

    // Content
    items.forEach(item => {
      worksheet.addRow([
        item.itemName,
        item.mealPrice,
        item.minGuarantees,
        this.selectedCafeteriaName
      ]);
    });

    worksheet.columns.forEach(col => col.width = 25);

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Consumption_Menu_${this.selectedCafeteriaName}_${new Date().toLocaleDateString()}.xlsx`);
  }

  openImportDialog() {
    if (!this.selectedCafeteria) {
      alert('Please select a cafeteria first');
      return;
    }

    const dialogRef = this.dialog.open(ImportConsumptionMenuComponent, {
      width: '700px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria
      },
      panelClass: 'premium-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.fetchOrgMeals();
    });
  }

  editConsumption(mealItem: any, cafeteria_orignal_id: any) {
    const dialogRef = this.dialog.open(AddConsumptionOrderComponent, {
      width: '600px',
      data: {
        mealItem: { ...mealItem, cafeteria_orignal_id },
        orgObj: this.orgObj
      },
      panelClass: 'premium-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.fetchOrgMeals();
    });
  }

  addConsumptionOrder() {
    if (!this.selectedCafeteria) {
      alert('Please select a cafeteria first');
      return;
    }

    const dialogRef = this.dialog.open(AddConsumptionOrderComponent, {
      width: '600px',
      data: {
        selectedCafeteria: this.selectedCafeteria,
        orgObj: this.orgObj
      },
      panelClass: 'premium-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.fetchOrgMeals();
    });
  }

  async fetchOrgMeals() {
    try {
      const result = await this.apiMainService.getConsumptionOrderByOrgId(this.orgObj._id);
      this.consumptionList = result || [];
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  }
}

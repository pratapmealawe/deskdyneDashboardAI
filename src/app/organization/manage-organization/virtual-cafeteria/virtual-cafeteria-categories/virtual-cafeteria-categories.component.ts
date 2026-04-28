import { Component, Input, ViewChild, TemplateRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { AddEditVirtualCafeteriaCategoriesComponent } from './add-edit-virtual-cafeteria-categories/add-edit-virtual-cafeteria-categories.component';
import { AddEditVirtualCafeteriaCategoriesWeeklyMenuComponent } from './add-edit-virtual-cafeteria-categories-weekly-menu/add-edit-virtual-cafeteria-categories-weekly-menu.component';
import { SetVirtualCafeteriaCategoriesConfigComponent } from './set-virtual-cafeteria-categories-config/set-virtual-cafeteria-categories-config.component';
import { ImportVirtualCafeteriaCategoriesComponent } from './import-virtual-cafeteria-categories/import-virtual-cafeteria-categories.component';
import { environment } from '@environments/environment';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-virtual-cafeteria-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './virtual-cafeteria-categories.component.html',
  styleUrls: ['./virtual-cafeteria-categories.component.scss']
})
export class VirtualCafeteriaCategoriesComponent implements OnChanges {
  categories: any[] = [];
  @Input() orgObj: any;
  @Input() selectedCafeteria: any;
  defaultCategories: boolean = false;
  serverDDUrl = environment.imageUrl;
  searchTerm: string = '';
  @ViewChild('viewCategoryDialog') viewCategoryDialog!: TemplateRef<any>;

  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService
  ) { }

  get cafeteriaId(): string {
    return this.selectedCafeteria?.cafeteria_id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCafeteria'] && this.cafeteriaId) {
      this.getCategoriesByCafeteria();
      this.getDefaultCategories();
    }
  }


  async getDefaultCategories(): Promise<void> {
    try {
      const res: any = await this.apiMainService.getVirtualCafeteriaDefaultCategories();
      this.defaultCategories = !!res;
    } catch (error) {
      console.error("❌ Default categories check failed", error);
      this.defaultCategories = false;
    }
  }

  async getCategoriesByCafeteria() {
    try {
      const data: any = await this.apiMainService.getVirtualCafeteriaCategories(this.cafeteriaId);
      this.categories = data || [];
    } catch (error) {
      console.error("❌ Categories loading failed", error);
      this.categories = [];
    }
  }

  getFilteredCategories() {
    if (!this.searchTerm) {
      return this.categories;
    }
    const term = this.searchTerm.toLowerCase();
    return this.categories.filter(cat =>
      (cat.categoryName?.toLowerCase().includes(term)) ||
      (cat.categoryDisplayName?.toLowerCase().includes(term))
    );
  }

  getInitials(name: string): string {
    if (!name) return 'VC';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  createCategory() {
    const data = {
      orgObj: this.orgObj,
      selectedCafeteria: this.selectedCafeteria,
    }
    const dialogRef = this.modalService.open(AddEditVirtualCafeteriaCategoriesComponent, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategoriesByCafeteria();
      }
    });
  }

  async changeCategoryStatus(status: boolean, id: string) {
    try {
      await this.apiMainService.changeVirtualCafeteriaCategoryStatus({ status, id, cafeteriaId: this.cafeteriaId });
      this.getCategoriesByCafeteria();
      this.toaster.success("Status updated");
    } catch (error) {
      console.error("❌ Status update failed", error);
      this.toaster.error("Status update failed");
    }
  }

  openEditCategoryDialog(category: any) {
    const data = {
      orgObj: this.orgObj,
      selectedCafeteria: this.selectedCafeteria,
      category
    }
    const dialogRef = this.modalService.open(AddEditVirtualCafeteriaCategoriesComponent, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategoriesByCafeteria();
      }
    });
  }

  deleteCategoryVirtualCafeteria(categoryName: string) {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete ${categoryName}?`,
      callback: async () => {
        try {
          await this.apiMainService.deleteVirtualCafeteriaCategory(this.cafeteriaId, { categoryName });
          this.getCategoriesByCafeteria();
          this.toaster.success(`${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} deleted`);
        } catch (err) {
          console.error(`❌ Delete error:`, err);
          this.toaster.error(`Delete failed. No changes applied.`);
        }
      },
      context: this
    });
  }

  openWeeklyMenu(category: any) {
    const dialogData: any = {
      category,
      cafeteriaList: this.orgObj?.cafeteriaList || [],
      selectedCafeteria: this.selectedCafeteria
    };
    const dialogRef = this.modalService.open(AddEditVirtualCafeteriaCategoriesWeeklyMenuComponent, {
      width: '1200px',
      data: dialogData,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe();
  }

  async createDefaultCategories() {
    try {
      const defaultCats: any = await this.apiMainService.getVirtualCafeteriaDefaultCategories();
      if (!defaultCats || !Array.isArray(defaultCats)) {
        this.toaster.error("No default categories found to setup");
        return;
      }

      const categoryList = defaultCats.map(cat => ({
        ...cat,
        org_id: this.orgObj._id,
        cafeteria_id: this.selectedCafeteria?.cafeteria_id,
        isActive: true // Ensure they are active by default
      }));

      await this.apiMainService.addVirtualCafeteriaCategoryList({ categoryList });
      this.getCategoriesByCafeteria();
      this.toaster.success("Default categories setup successfully");
    } catch (error) {
      console.error("❌ Default categories setup failed", error);
      this.toaster.error("Failed to setup default categories");
    }
  }

  setConfig(category: any) {
    this.modalService.open(SetVirtualCafeteriaCategoriesConfigComponent, {
      width: '800px',
      data: {
        cafeteriaId: this.cafeteriaId,
        category: category
      }
    });
  }

  importCategories() {
    const dialogRef = this.modalService.open(ImportVirtualCafeteriaCategoriesComponent, {
      width: '800px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria
      },
      autoFocus: false,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategoriesByCafeteria();
      }
    });
  }

  viewCategory(category: any) {
    this.modalService.open(this.viewCategoryDialog, {
      data: { category },
      width: '600px'
    });
  }

  addMultipleManual() {
    this.toaster.info('Bulk add feature coming soon');
    // Implement using AddEditMultipleVirtualCafeteriaCategoriesComponent when available
  }

  async exportToExcel() {
    if (this.categories.length === 0) {
      this.toaster.warning('No categories to export');
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Category List');

      worksheet.columns = [
        { header: 'Category Name', key: 'name', width: 25 },
        { header: 'Display Name', key: 'displayName', width: 30 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Cafeteria', key: 'cafe', width: 25 },
        { header: 'Organization', key: 'org', width: 30 }
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      this.categories.forEach(cat => {
        worksheet.addRow({
          name: cat.categoryName,
          displayName: cat.categoryDisplayName || cat.categoryName,
          status: cat.isActive ? 'Active' : 'Inactive',
          cafe: this.selectedCafeteria?.cafeteria_name || 'Default',
          org: this.orgObj.organization_name
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Categories_${this.selectedCafeteria?.cafeteria_name || 'VC'}_${new Date().toLocaleDateString()}.xlsx`);

      this.toaster.success('Excel file exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      this.toaster.error('Failed to export Excel file');
    }
  }
}

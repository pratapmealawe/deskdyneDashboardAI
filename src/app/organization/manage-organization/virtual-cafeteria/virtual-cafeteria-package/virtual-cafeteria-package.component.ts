import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { environment } from '@environments/environment';
import { CopyMealaweVirtualCafeteriaPackageComponent } from './copy-mealawe-virtual-cafeteria-package/copy-mealawe-virtual-cafeteria-package.component';
import { AddEditVirtualCafeteriaPackageComponent } from './add-edit-virtual-cafeteria-package/add-edit-virtual-cafeteria-package.component';
import { VirtualCafeteriaBannersComponent } from '../virtual-cafeteria-banners/virtual-cafeteria-banners.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-virtual-cafeteria-package',
  standalone: true,
  imports: [CommonModule, MaterialModule, VirtualCafeteriaBannersComponent],
  templateUrl: './virtual-cafeteria-package.component.html',
  styleUrls: ['./virtual-cafeteria-package.component.scss']
})
export class VirtualCafeteriaPackageComponent {
  @Input() packages: any[] = [];
  @Input() orgObj: any;
  @Input() selectedCafeteria: any;
  @Input() categories: any[] = [];
  

  serverUrl = environment.mlImageUrl;

  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService
  ) {}

  get cafeteriaId(): string {
    return this.selectedCafeteria?.cafeteria_id;
  }

  manageBanners() {
    const dialogRef = this.modalService.open(VirtualCafeteriaBannersComponent, {
      width: '800px',
      maxWidth: '95vw',
      data: {
        cafeteriaId: this.cafeteriaId,
        banners: this.selectedCafeteria?.bannerImages || []
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(updatedBanners => {
      if (updatedBanners) {
        this.selectedCafeteria.bannerImages = updatedBanners;
      }
    });
  }

  async importMealawePackages() {
    try {
      const meals = await this.apiMainService.getMLMealPackageList();

      const dialogRef = this.modalService.open(CopyMealaweVirtualCafeteriaPackageComponent, {
        width: '800px',
        data: {
          orgObj: this.orgObj,
          selectedCafeteria: this.selectedCafeteria,
          meals: meals,
          alreadyPackages: this.packages.map((e: any) => e.masterMenuId)
        },
        autoFocus: true,
        disableClose: false
      });
      dialogRef.afterClosed().subscribe();
    } catch (error) {
      console.error('Error importing Mealawe packages:', error);
      this.toaster.error('Failed to load Mealawe data');
    }
  }

  createManualPackage() {
    const dialogRef = this.modalService.open(AddEditVirtualCafeteriaPackageComponent, {
      width: '800px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria,
        categories: this.categories
      },
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((res) => {
      // if (res) this.refreshData.emit();
    });
  }

  editPackage(p: any) {
    const dialogRef = this.modalService.open(AddEditVirtualCafeteriaPackageComponent, {
      width: '800px',
      data: {
        orgObj: this.orgObj,
        package: p,
        selectedCafeteria: this.selectedCafeteria,
        categories: this.categories
      },
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((res) => {
      // if (res) this.refreshData.emit();
    });
  }

  async changePackageStatus(status: boolean, masterMenuId: string) {
    try {
      await this.apiMainService.changeVirtualCafeteriaPackageStatus({ status, mealId: masterMenuId, cafeteriaId: this.cafeteriaId });
      this.toaster.success("Status updated");
    } catch (error) {
      console.error("❌ Status update failed", error);
      this.toaster.error("Status update failed");
    }
  }

  deletePackage(item: any) {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete ${item.packageName}?`,
      callback: async () => {
        try {
          await this.apiMainService.deleteVirtualCafeteriaPackageItem({ cafeteriaId: this.cafeteriaId, masterMenuId: item.masterMenuId });
          this.toaster.success(`Package deleted`);
        } catch (err) {
          console.error(`❌ Delete error:`, err);
          this.toaster.error(`Delete failed. No changes applied.`);
        }
      },
      context: this
    });
  }

  async exportToExcel() {
    if (this.packages.length === 0) {
      this.toaster.warning('No packages to export');
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Package List');

      worksheet.columns = [
        { header: 'Package Name', key: 'name', width: 30 },
        { header: 'Price', key: 'price', width: 15 },
        { header: 'Category', key: 'category', width: 20 },
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

      this.packages.forEach(p => {
        worksheet.addRow({
          name: p.packageName,
          price: `₹${p.packagePrice}`,
          category: p.packageCategory,
          status: p.isActive ? 'Active' : 'Inactive',
          cafe: this.selectedCafeteria?.cafeteria_name || 'Default',
          org: this.orgObj.organization_name
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Packages_${this.selectedCafeteria?.cafeteria_name || 'VC'}_${new Date().toLocaleDateString()}.xlsx`);

      this.toaster.success('Excel file exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      this.toaster.error('Failed to export Excel file');
    }
  }
}

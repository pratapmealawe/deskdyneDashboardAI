import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@service/toaster.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { AddEditPackageCategoryComponent } from './add-edit-package-category/add-edit-package-category.component';
import { AddEditPackageWeeklyMenuComponent } from './add-edit-package-weekly-menu/add-edit-package-weekly-menu.component';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-virtual-cafeteria-categories',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './virtual-cafeteria-categories.component.html',
  styleUrls: ['./virtual-cafeteria-categories.component.scss']
})
export class VirtualCafeteriaCategoriesComponent {
  @Input() categories: any[] = [];
  @Input() orgObj: any;
  @Input() selectedCafeteria: any;
  @Input() defaultCategories: boolean = false;
  @Input() cafeteriaList: any[] = [];

  @Output() refreshData = new EventEmitter<void>();

  serverDDUrl = environment.imageUrl;

  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService
  ) { }

  get cafeteriaId(): string {
    return this.selectedCafeteria?.cafeteria_id;
  }

  createCategory() {
    const data = {
      orgObj: this.orgObj,
      selectedCafeteria: this.selectedCafeteria,
    }
    const dialogRef = this.modalService.open(AddEditPackageCategoryComponent, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData.emit());
  }

  async changeCategoryStatus(status: boolean, id: string) {
    try {
      await this.apiMainService.changeCategoryStatus({ status, id, cafeteriaId: this.cafeteriaId });
      this.toaster.success("Status updated");
      this.refreshData.emit();
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
    const dialogRef = this.modalService.open(AddEditPackageCategoryComponent, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData.emit());
  }

  deleteCategoryVirtualCafeteria(categoryName: string) {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete ${categoryName}?`,
      callback: async () => {
        try {
          await this.apiMainService.deleteCategoryMealAweOutlet(this.cafeteriaId, { categoryName });
          this.toaster.success(`${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} deleted`);
          this.refreshData.emit();
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
      cafeteriaList: this.cafeteriaList,
      selectedCafeteria: this.selectedCafeteria
    };
    const dialogRef = this.modalService.open(AddEditPackageWeeklyMenuComponent, {
      width: '1200px',
      data: dialogData,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => this.refreshData.emit());
  }

  async createDefaultCategories() {
    try {
      const { cafeteria_id, cafeteria_name, address1, address2, cafeteria_city, cafeteria_location } = this.selectedCafeteria;
      const payload: any = {
        org_id: this.orgObj._id,
        org_name: this.orgObj.organization_name,
        cafeteriaDetails: {
          cafeteria_name,
          address1,
          address2,
          cafeteria_city,
          cafeteria_location,
          cafeteria_id
        }
      };
      await this.apiMainService.createDefaultCategories(payload);
      this.toaster.success("Categories generated successfully");
      this.refreshData.emit();
    } catch (error) {
      console.error("❌ Update failed", error);
      this.toaster.error("Create default categories failed");
    }
  }
}

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { AddEditPackageCategoryComponent } from './add-edit-package-category/add-edit-package-category.component';
import { AddEditPackageMealaweOutletComponent } from './add-edit-package-mealawe-outlet/add-edit-package-mealawe-outlet.component';
import { AddEditPackageWeeklyMenuComponent } from './add-edit-package-weekly-menu/add-edit-package-weekly-menu.component';

@Component({
  selector: 'app-mealawe-outlet',
  templateUrl: './mealawe-outlet.component.html',
  styleUrls: ['./mealawe-outlet.component.scss']
})
export class MealaweOutletComponent implements AfterViewInit {
  @Input() orgObj: any;
  serverUrl = environment.mlImageUrl;
  serverDDUrl = environment.imageUrl;
  cafeteriaList: any[] = [];
  defaultCategories: boolean = false;
  selectedCafeteria: any = {};
  mealOutlet: any = {};
  categories: any[] = [];
  packages: any[] = [];
  config: any[] = [
    { name: "SUBSCRIPTION_PLATFORM_CHARGES", label: "Subscription Platform Charges", value: 0 },
    { name: "SUBSCRIPTION_PLATFORM_CHARGES_DISCOUNT", label: "Subscription Platform Charges Discount", value: 0 },
    { name: "SUBSCRIPTION_DELIVERY_CHARGES", label: "Subscription Delivery Charges", value: 0 },
    { name: "SUBSCRIPTION_DELIVERY_CHARGES_DISCOUNT", label: "Subscription Delivery Charges Discount", value: 0 },
    { name: "SUBSCRIPTION_ECO_FRIENDLY_PACKAGING_CHARGES", label: "Subscription Eco-Friendly Packaging Charges", value: 0 },
    { name: "SUBSCRIPTION_ECO_FRIENDLY_PACKAGING_CHARGES_DISCOUNT", label: "Subscription Eco-Friendly Packaging Charges Discount", value: 0 },
    { name: "DELIVERY_CHARGES_GST", label: "Delivery Charges GST %", value: 0 },
    { name: "PACKAGE_CHARGES_GST", label: "Package Charges GST %", value: 0 },
    { name: "PLATFORM_CHARGES_GST", label: "Platform Charges GST %", value: 0 },
    { name: "CGST_PERCENTAGE", label: "CGST %", value: 0 },
    { name: "SGST_PERCENTAGE", label: "SGS %", value: 0 }
  ];
  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService,
  ) { }

  ngAfterViewInit(): void {
    this.getDefaultCategories();
    this.cafeteriaList = [...(this.orgObj?.cafeteriaList || [])];
    if (this.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.cafeteriaList[0];
      this.getMealAweOutletByCafeteria();
    }
  }

  get addNew(): boolean {
    return !this.mealOutlet?.cafeteriaDetails;
  }

  get cafeteriaId(): any {
    return this.selectedCafeteria?._id;
  }

  async getDefaultCategories(): Promise<void> {
    try {
      const defaultCategories = await this.apiMainService.getDefaultCategories();
      if (typeof defaultCategories === 'boolean') {
        this.defaultCategories = defaultCategories;
      } else {
        this.defaultCategories = false;
      }
    } catch (error) {
      console.error("❌ Loading failed", error);
    }
  }

  async getMealAweOutletByCafeteria(): Promise<void> {
    try {
      this.mealOutlet = await this.apiMainService.getMealAweOutletByCafeteria(this.cafeteriaId);
      if (this.mealOutlet) {
        this.config = this.config.map(item => {
          const found = this.mealOutlet?.config?.find((value: any) => value.name === item.name);
          return {
            ...item,
            value: found ? found.value : item.value
          };
        });
        this.categories = this.mealOutlet?.categoryConfig || [];
        this.packages = (this.mealOutlet?.itemList || []).map((p: any) => ({
          ...p,
          editing: false
        }));
      }
    } catch (error) {
      console.error("❌ Loading failed", error);
    }
  }

  async updateMealAweOutlet() {
    // 1. Check for negative values
    const invalidConfig = this.config.find(item => item.value < 0);
    if (invalidConfig) {
      this.toaster.error(`${invalidConfig.label} cannot be negative`);
      return;
    }

    // 2. Check for discounts without charges
    const getValue = (name: string) => this.config.find(c => c.name === name)?.value || 0;

    const validateDiscount = (chargeKey: string, discountKey: string, label: string) => {
      const charge = getValue(chargeKey);
      const discount = getValue(discountKey);
      if (discount > 0 && charge <= 0) {
        return `${label} Discount cannot be applied without ${label} Charges`;
      }
      return null;
    };

    const errors = [
      validateDiscount('SUBSCRIPTION_PLATFORM_CHARGES', 'SUBSCRIPTION_PLATFORM_CHARGES_DISCOUNT', 'Platform'),
      validateDiscount('SUBSCRIPTION_DELIVERY_CHARGES', 'SUBSCRIPTION_DELIVERY_CHARGES_DISCOUNT', 'Delivery'),
      validateDiscount('SUBSCRIPTION_ECO_FRIENDLY_PACKAGING_CHARGES', 'SUBSCRIPTION_ECO_FRIENDLY_PACKAGING_CHARGES_DISCOUNT', 'Eco-Friendly Packaging')
    ].filter(e => e !== null);

    if (errors.length > 0) {
      this.toaster.error(errors[0]!);
      return;
    }

    try {
      const simplifiedConfig = this.config.map(item => ({
        name: item.name,
        value: item.value
      }));
      const payload = {
        ...this.mealOutlet,
        itemList: this.packages,
        categoryConfig: this.categories,
        config: simplifiedConfig
      };
      await this.apiMainService.updateMealAweOutlet(this.mealOutlet?._id, payload);
      this.toaster.success("Updated successfully");
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Update failed", error);
      this.toaster.error("Update failed. No changes applied.  ");
    }
  }

  openModal(component: any, data: any) {
    const dialogRef = this.modalService.open(component, {
      width: '800px',
      data,
      autoFocus: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(() => this.getMealAweOutletByCafeteria());
  }

  createPackages() {
    this.openModal(AddEditPackageMealaweOutletComponent, {
      orgObj: this.orgObj,
      addNew: this.addNew,
      selectedCafeteria: this.selectedCafeteria,
      alreadyPackages: this.packages.map((e: any) => e.masterMenuId)
    });
  }

  createCategory() {
    const data = {
      orgObj: this.orgObj,
      selectedCafeteria: this.selectedCafeteria,
    }
    this.openModal(AddEditPackageCategoryComponent, data);
  }

  async changePackageStatus(status: boolean, masterMenuId: string) {
    try {
      await this.apiMainService.changePackageStatus({ status, mealId: masterMenuId, cafeteriaId: this.cafeteriaId });
      this.toaster.success("Status updated");
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Status update failed", error);
      this.toaster.error("Status update failed");
    }
  }

  async changeCategoryStatus(status: boolean, id: string) {
    try {
      await this.apiMainService.changeCategoryStatus({ status, id, cafeteriaId: this.cafeteriaId });
      this.toaster.success("Status updated");
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Status update failed", error);
      this.toaster.error("Status update failed");
    }
  }

  updatePackage(pkg: any) {
    if (!pkg?._id) return this.toaster.error("Invalid package");
    pkg.editing = false;
    this.updateMealAweOutlet();
  }

  deleteCategoryMealAweOutlet(categoryName: string) {
    this.confirmationModalService.modal(`Are you sure you want to delete ${categoryName}?`, async () => {
      try {
        await this.apiMainService.deleteCategoryMealAweOutlet(this.cafeteriaId, { categoryName });
        this.toaster.success(`${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} deleted`);
        this.getMealAweOutletByCafeteria();
      } catch (err) {
        console.error(`❌ Delete error:`, err);
        this.toaster.error(`Delete failed. No changes applied.`);
      }
    }, this);
  }


  deleteItem(type: 'package' | 'category', item: any) {
    const name = type === 'package' ? item.packageName : item.categoryName;
    const apiCall = type === 'package' ? () => this.apiMainService.deleteMealItem({ cafeteriaId: this.cafeteriaId, masterMenuId: item.masterMenuId }) : () => this.apiMainService.deleteCategoryConfig({ cafeteriaId: this.cafeteriaId, categoryName: item.categoryName });
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete ${type === 'package' ? name : 'category' + name}?`,
      callback: async () => {
        try {
          await apiCall();
          this.toaster.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted`);
          this.getMealAweOutletByCafeteria();
        } catch (err) {
          console.error(`❌ Delete error:`, err);
          this.toaster.error(`Delete failed. No changes applied.`);
        }
      },
      context: this
    });
  }

  openEditCategoryDialog(category: any) {
    const data = {
      orgObj: this.orgObj,
      selectedCafeteria: this.selectedCafeteria,
      category
    }
    this.openModal(AddEditPackageCategoryComponent, data);
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
    dialogRef.afterClosed().subscribe(() => this.getMealAweOutletByCafeteria());
  }

  async createDefaultCategories() {
    try {
      const { _id: cafeteria_id, cafeteria_name, address1, address2, cafeteria_city, cafeteria_location } = this.selectedCafeteria;
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
      this.toaster.success("Updated successfully");
      this.getMealAweOutletByCafeteria();
    } catch (error) {
      console.error("❌ Update failed", error);
      this.toaster.error("Create default categories failed");
    }
  }

  closeDialog() {
    this.modalService.closeAll();
  }
}
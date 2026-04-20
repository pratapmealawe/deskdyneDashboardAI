import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ToasterService } from '@service/toaster.service';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { VirtualCafeteriaEmployeeListingComponent } from './virtual-cafeteria-employee-listing/virtual-cafeteria-employee-listing.component';
import { VirtualCafeteriaCategoriesComponent } from './virtual-cafeteria-categories/virtual-cafeteria-categories.component';
import { VirtualCafeteriaPackageComponent } from './virtual-cafeteria-package/virtual-cafeteria-package.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-virtual-cafeteria',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, VirtualCafeteriaEmployeeListingComponent, VirtualCafeteriaCategoriesComponent, VirtualCafeteriaPackageComponent],
  templateUrl: './virtual-cafeteria.component.html',
  styleUrls: ['./virtual-cafeteria.component.scss']
})
export class VirtualCafeteriaComponent implements OnInit {
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

  ngOnInit(): void {
    if (this.orgObj?.cafeteriaList) {
      this.cafeteriaList = [...this.orgObj.cafeteriaList];
      if (this.cafeteriaList.length > 0) {
        this.getDefaultCategories();
        this.selectedCafeteria = this.cafeteriaList[0];
        this.getVirtualCafeteriaByCafeteria();
      }
    }
  }

  get addNew(): boolean {
    return !this.mealOutlet?.cafeteriaDetails;
  }

  get cafeteriaId(): any {
    return this.selectedCafeteria?.cafeteria_id;
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

  async getVirtualCafeteriaByCafeteria(): Promise<void> {
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

  async updateVirtualCafeteria() {
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
      this.getVirtualCafeteriaByCafeteria();
    } catch (error) {
      console.error("❌ Update failed", error);
      this.toaster.error("Update failed. No changes applied.  ");
    }
  }

  closeDialog() {
    this.modalService.closeAll();
  }
}
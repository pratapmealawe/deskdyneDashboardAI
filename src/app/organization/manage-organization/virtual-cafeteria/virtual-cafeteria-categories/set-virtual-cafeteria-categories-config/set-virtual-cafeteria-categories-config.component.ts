import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-set-virtual-cafeteria-categories-config',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './set-virtual-cafeteria-categories-config.component.html',
  styleUrls: ['./set-virtual-cafeteria-categories-config.component.scss']
})
export class SetVirtualCafeteriaCategoriesConfigComponent implements OnInit {
  category: any;
  showOnlyToEmployees: boolean = false;
  loading: boolean = false;
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
    private toaster: ToasterService,
    public dialogRef: MatDialogRef<SetVirtualCafeteriaCategoriesConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.category = data.category;
  }

  ngOnInit(): void {
    if (this.category && this.category.config) {
      this.config = this.config.map(item => {
        const found = this.category.config.find((value: any) => value.name === item.name);
        return {
          ...item,
          value: found ? found.value : item.value
        };
      });
    }
    this.showOnlyToEmployees = this.category?.showOnlyToEmployees || false;
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
      this.loading = true;
      const simplifiedConfig = this.config.map(item => ({
        name: item.name,
        value: item.value
      }));
      
      const payload = {
        cafeteriaId: this.data?.cafeteriaId,
        categoryName: this.category?.categoryName,
        config: simplifiedConfig,
        showOnlyToEmployees: this.showOnlyToEmployees
      };
      
      await this.apiMainService.updateVirtualCafeteriaCategoryConfig(payload);
      this.toaster.success("Updated successfully");
      this.dialogRef.close(true);
    } catch (error) {
      console.error("❌ Update failed", error);
      this.toaster.error("Update failed. No changes applied.");
    } finally {
      this.loading = false;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

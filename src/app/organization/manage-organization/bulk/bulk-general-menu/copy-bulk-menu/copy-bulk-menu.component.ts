import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ToasterService } from '@service/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../material.module';
import { CustomPipeModule } from "@pipes/pipe.module";

interface Org {
  _id: string;
  organization_name: string;
}

interface Cafeteria {
  _id: string;
  cafeteria_id: string;
  cafeteria_name: string;
}

@Component({
  selector: 'app-copy-bulk-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, CustomPipeModule],
  templateUrl: './copy-bulk-menu.component.html',
  styleUrls: ['./copy-bulk-menu.component.scss']
})
export class CopyBulkMenuComponent implements OnInit {
  imageUrl = environment.imageUrl;

  // Selection State
  orgChoices: Org[] = [];
  cafeteriaChoices: Cafeteria[] = [];
  mainCategories = [
    { name: 'Meals', value: 'meals', hasSub: true },
    { name: 'Snacks', value: 'snacks', hasSub: true },
    { name: 'Foodbox', value: 'foodbox', hasSub: true },
    { name: 'Cake', value: 'cakeMenu', hasSub: false },
    { name: 'Sweet', value: 'sweetMenu', hasSub: false },
    { name: 'Lux', value: 'luxMenu', hasSub: false },
    { name: 'Pantry', value: 'pantryMenu', hasSub: false }
  ];
  subCategories: any[] = [];

  selectedSourceOrgId: string | null = null;
  selectedSourceCafeId: string | null = null;
  selectedMainCat: any = null;
  selectedSubCat: string | null = null;

  // UI State
  menuPreview: any[] = [];
  isLoading = false;
  isFetchingCafeterias = false;
  searchText = '';

  constructor(
    private dialogRef: MatDialogRef<CopyBulkMenuComponent>,
    private api: ApiMainService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: {
      orgChoices: Org[],
      currentOrgId: string,
      currentCafeId: string,
      currentMainCat: string,
      currentSubCat: string
    }
  ) { }

  ngOnInit(): void {
    // We already have orgChoices from parent, but let's filter current one
    this.orgChoices = this.data.orgChoices.filter(org => org._id !== this.data.currentOrgId);

    // Auto-select current categories for convenience if desired, 
    // but the user asked for selecting org then cafe then sub types
    // so we'll start clean for source.
  }

  async onOrgChange() {
    this.selectedSourceCafeId = null;
    this.cafeteriaChoices = [];
    this.menuPreview = [];

    if (!this.selectedSourceOrgId) return;

    this.isFetchingCafeterias = true;
    try {
      const res: any = await this.api.searchOutletByOrgId({ orgId: this.selectedSourceOrgId });
      this.cafeteriaChoices = res || [];
      if (this.cafeteriaChoices.length === 0) {
        this.toaster.info('No cafeterias found for this organization.');
      }
    } catch (error) {
      console.error('Error fetching cafeterias:', error);
      this.toaster.error('Failed to load cafeterias.');
    } finally {
      this.isFetchingCafeterias = false;
    }
  }

  onCafeChange() {
    this.menuPreview = [];
  }

  onMainCatChange() {
    this.selectedSubCat = null;
    this.menuPreview = [];

    if (this.selectedMainCat?.value === 'meals') {
      this.subCategories = [
        { name: 'Bulk Meals Menu', value: 'bulkMealsMenu' },
        { name: 'Individual Meals Menu', value: 'individualMealsMenu' }
      ];
    } else if (this.selectedMainCat?.value === 'snacks') {
      this.subCategories = [
        { name: 'Bulk Snacks Menu', value: 'bulkSnacksMenu' },
        { name: 'Individual Snacks Menu', value: 'individualSnacksMenu' }
      ];
    } else if (this.selectedMainCat?.value === 'foodbox') {
      this.subCategories = [
        { name: 'Pre-Defined Food Box', value: 'predefinedFoodBoxMenu' },
        { name: 'Customized Food Box', value: 'customizedFoodBoxMenu' }
      ];
    } else {
      this.subCategories = [];
    }
  }

  async fetchPreview() {
    if (!this.selectedSourceOrgId || !this.selectedSourceCafeId || !this.selectedMainCat) {
      this.toaster.warning('Please complete selection to preview.');
      return;
    }

    const subCategory = this.selectedMainCat.hasSub ? this.selectedSubCat : this.selectedMainCat.value;
    if (this.selectedMainCat.hasSub && !subCategory) {
      this.toaster.warning('Please select a sub-category.');
      return;
    }

    this.isLoading = true;
    try {
      const payload = {
        organizationId: this.selectedSourceOrgId,
        cafeteriaId: this.selectedSourceCafeId,
        mainCategory: this.selectedMainCat.value,
        subCategory: subCategory
      };

      const res: any = await this.api.getBulkMenuByCategory(payload);
      this.menuPreview = res?.itemList || [];

      if (this.menuPreview.length === 0) {
        this.toaster.info('No items found in the source menu.');
      }
    } catch (error) {
      console.error('Error fetching preview:', error);
      this.toaster.error('Failed to fetch menu preview.');
    } finally {
      this.isLoading = false;
    }
  }

  copyMenus() {
    if (!this.menuPreview.length) return;

    // Return the selected source details so parent can perform the copy
    this.dialogRef.close({
      sourceOrgId: this.selectedSourceOrgId,
      sourceCafeId: this.selectedSourceCafeId,
      mainCategory: this.selectedMainCat.value,
      subCategory: this.selectedMainCat.hasSub ? this.selectedSubCat : this.selectedMainCat.value,
      items: this.menuPreview
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}



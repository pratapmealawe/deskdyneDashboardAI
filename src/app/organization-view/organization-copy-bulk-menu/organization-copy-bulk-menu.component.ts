import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-organization-copy-bulk-menu',
  templateUrl: './organization-copy-bulk-menu.component.html',
  styleUrls: ['./organization-copy-bulk-menu.component.scss']
})
export class OrganizationCopyBulkMenuComponent implements OnInit {
  menusToCopy: any[] = [];
  selectedCafeteriaId: any;
  imageUrl = environment.imageUrl;
  categoryList = [
    {
      mainCategory: 'meals',
      subCategory: [
        { name: 'Bulk Meals Menu', value: 'bulkMealsMenu' },
        { name: 'Individual Meals Menu', value: 'individualMealsMenu' }
      ]
    },
    {
      mainCategory: 'snacks',
      subCategory: [
        { name: 'Bulk Snacks Menu', value: 'bulkSnacksMenu' },
        { name: 'Individual Snacks Menu', value: 'individualSnacksMenu' }
      ]
    },
    {
      mainCategory: 'foodbox',
      subCategory: [
        { name: 'Predefined Food Box', value: 'predefinedFoodBoxMenu' },
        { name: 'Customized Food Box', value: 'customizedFoodBoxMenu' }
      ]
    },
    { mainCategory: 'cake', subCategory: [] },
    { mainCategory: 'sweet', subCategory: [] },
    { mainCategory: 'lux', subCategory: [] }
  ];
  selectedMainCategory: string | null = null;
  selectedSubCategory: string | null = null;
  mainCategoryList: string[] = [];
  subCategoryList: { name: string; value: string }[] = [];

  constructor(
    private dialogRef: MatDialogRef<OrganizationCopyBulkMenuComponent>,
    private apiMainService: ApiMainService,
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.mainCategoryList = this.categoryList.map(c => c.mainCategory);
  }

  onChangeMainCategory() {
    this.selectedSubCategory = null;
    this.menusToCopy = [];
    const selected = this.categoryList.find(
      c => c.mainCategory === this.selectedMainCategory
    );
    this.subCategoryList = selected?.subCategory || [];
    this.selectedSubCategory = null;
    if (this.subCategoryList.length === 0) {
      this.selectedSubCategory = `${this.selectedMainCategory}Menu`;
      this.getItemsToCopy();
    }
  }

  onChangeSubCategory() {
    if (this.selectedMainCategory && this.selectedSubCategory) {
      this.getItemsToCopy();
    }
  }

  getItemsToCopy() {
    try {
      const payload = {
        organizationId: this.data.organizationId,
        cafeteriaId: this.data.cafeteriaId,
        mainCategory: this.selectedMainCategory,
        subCategory: this.selectedSubCategory
      }
      this.apiMainService.getB2bBulkMenuByCategory(payload).then((res: any) => {
        if (res?.itemList) {
          this.menusToCopy = res?.itemList || [];
        } else {
          this.menusToCopy = [];
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  copyMenus() {
    if (!this.selectedMainCategory) {
      this.toaster.warning('Please select a category to copy from');
      return;
    }   
    const payload = {
      organizationId: this.data.organizationId,
      cafeteriaId: this.data.cafeteriaId,
      mainCategory: this.data.mainCategory,
      subCategory: this.data.subCategory,
      itemList: this.menusToCopy
    }
    if (payload) {
      this.apiMainService.copyB2bBulkMenu(payload).then((res: any) => {
        if (res) {
          this.toaster.success('Menus copied successfully to ' + this.data.cafeteriaName);
          this.dialogRef.close({ success: true, data: res });
        } else {
          this.toaster.error('Failed to copy menus');
          this.dialogRef.close({ success: true, data: res });
        }
      })
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}

import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-add-edit-package-weekly-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './add-edit-package-weekly-menu.component.html',
  styleUrls: ['./add-edit-package-weekly-menu.component.scss']
})
export class AddEditPackageWeeklyMenuComponent implements OnInit {
  availableClusters: any[] = [];
  uniqueMenus: any[] = [];
  weekMenuList: any[] = [];
  cafeteriaList: any[] = [];
  orgList: any[] = [];
  selectedSource: string = '';
  selectedClusterId: string = '';
  selectedCafeteria: any;
  selectedOrg: any;
  activeWeekIndex: number = 0;
  showRequiredError: boolean = false;
  categoryKey: string = 'breakfast'; // Default or determined dynamically

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditPackageWeeklyMenuComponent>,
    private apiMainService: ApiMainService,
    private toastService: ToasterService
  ) { }

  menuSources = [
    { label: 'Organization Cafe', color: 'accent', action: (data: any) => { this.selectedSource = 'otherCafe'; this.getMealAweOutletByCafeteria() } },
    { label: 'Other Org Cafe', color: 'warn', action: (data: any) => { this.selectedSource = 'otherOrgCafe'; this.getOrgCafeteriaWeeklyMenu(); } },
    { label: 'Custom Menu', color: 'success', action: (data: any) => { this.selectedSource = 'custom'; this.weekMenuList = []; } }
  ];
  menuTypes = ['Veg', 'Non-Veg'];
  mealTimes = ['Breakfast', 'Lunch', 'Dinner'];


  ngOnInit(): void {
    if (this.data.cafeteriaList) {
      this.cafeteriaList = this.data.cafeteriaList;
    }

    if (this.data.selectedCafeteria) {
      this.cafeteriaList = this.cafeteriaList.filter(c => c._id !== this.data.selectedCafeteria._id);
    }

    if (this.data?.category?.categoryName) {
      const name = this.data.category.categoryName.toLowerCase();
      if (name.includes('lunch')) {
        this.categoryKey = 'lunch';
      } else if (name.includes('dinner')) {
        this.categoryKey = 'dinner';
      } else if (name.includes('breakfast')) {
        this.categoryKey = 'breakfast';
      } else {
        this.categoryKey = 'lunch'; // fallback
      }
    }

    if (this.data?.category?.weeklyMenu && this.data.category.weeklyMenu.length > 0) {
      // Deep copy to avoid mutating parent data before save
      this.weekMenuList = JSON.parse(JSON.stringify(this.data.category.weeklyMenu));
      this.selectedSource = 'custom';
      this.activeWeekIndex = this.weekMenuList.findIndex(w => w.isSelected);
      if (this.activeWeekIndex === -1) this.activeWeekIndex = 0;
    }
  }

  onClusterChange(data: any) {
    const matchedMenu = this.uniqueMenus.find((m: any) => m.clusterIds.includes(this.selectedClusterId));
    this.weekMenuList = matchedMenu ? matchedMenu.weekMenuList : [];
    this.activeWeekIndex = this.weekMenuList.findIndex(w => w.isSelected);
    if (this.activeWeekIndex === -1) this.activeWeekIndex = 0;
  }

  getMenuList(week: any, type: string) {
    return type === 'veg' ? week.vegMenuList : week.nonvegMenuList;
  }

  getVisibleMeals(data: any) {
    if (!data?.category?.categoryName) return this.mealTimes;
    return this.mealTimes.filter(meal => meal === data.category.categoryName);
  }

  selectWeek(i: number) {
    this.weekMenuList.forEach((w, index) => w.isSelected = index === i);
    this.activeWeekIndex = i;
  }

  addNewWeek() {
    const nextWeekNumber = this.weekMenuList.length + 1;
    const createEmptyMenu = (type: string) => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return days.map((day, index) => ({
        day,
        type,
        sequence: index + 1,
        breakfast: { description: '' },
        lunch: { description: '' },
        dinner: { description: '' }
      }));
    };
    const newWeek = {
      weekNumber: nextWeekNumber,
      isSelected: false,
      vegMenuList: createEmptyMenu('veg'),
      nonvegMenuList: createEmptyMenu('nonveg')
    };
    this.weekMenuList.push(newWeek);
  }

  deleteWeek(index: number) {
    if (this.weekMenuList.length === 1) {
      this.toastService.error("At least one week is required.");
      return;
    }
    this.weekMenuList.splice(index, 1);
    // Re-index remaining weeks
    this.weekMenuList.forEach((w, i) => w.weekNumber = i + 1);

    // Adjust active index
    if (this.activeWeekIndex >= this.weekMenuList.length) {
      this.activeWeekIndex = this.weekMenuList.length - 1;
    }
  }

  async saveMenu() {
    const active = this.weekMenuList.some(w => w.isSelected);
    if (!active) {
      this.showRequiredError = true;
      return;
    }
    // Validate descriptions
    for (let week of this.weekMenuList) {
      const allItems = [...week.vegMenuList, ...week.nonvegMenuList];
      for (let item of allItems) {
        const key = this.categoryKey || 'breakfast';
        // Initialize if missing
        if (!item[key]) {
          item[key] = { description: '' };
        }
        if (!item[key].description || item[key].description.trim() === '') {
          this.toastService.error(`Please fill all required descriptions for ${key}.`);
          return;
        }
      }
    }
    const body = {
      cafeteriaId: this.data.selectedCafeteria.cafeteria_id,
      weeklyMenu: this.weekMenuList,
      categoryName: this.data.category.categoryName
    }
    console.log(body)
    try {
      await this.apiMainService.updateWeeklyMenuCategory(body);
      this.dialogRef.close();
    } catch (error) {
      console.error("❌ Loading failed", error);
    }
  }


  async getMealAweOutletByCafeteria(): Promise<void> {
    try {
      let value = await this.apiMainService.getMealAweOutletByCafeteria(this.selectedCafeteria._id);
      this.weekMenuList = [];
      if (value?.categoryConfig?.length) {
        const matchedMenu = value.categoryConfig.find((m: any) => m.categoryName === this.data.category.categoryName);
        if (matchedMenu) {
          this.weekMenuList = matchedMenu.weeklyMenu ?? [];
        }
      }
    } catch (error) {
      console.error("❌ Loading failed", error);
      this.weekMenuList = [];
    }
  }

  getCafeteriaListByOrg(): void {
    this.cafeteriaList = this.orgList.find(e => e._id == this.selectedOrg._id).cafeteriaList || [];
    this.selectedCafeteria = null;
  }

  async getOrgCafeteriaWeeklyMenu(): Promise<void> {
    const orgList = await this.apiMainService.B2B_fetchFilteredAllOrgs({});
    this.cafeteriaList = this.cafeteriaList.filter(c => c._id !== this.data.selectedCafeteria._id);
    this.selectedSource = 'otherOrgCafe';
    this.orgList = orgList;
  }

  resetCreateType() {
    this.selectedSource = "";
    this.cafeteriaList = this.cafeteriaList.filter(c => c._id !== this.data.selectedCafeteria._id);
    this.selectedCafeteria = null;   // clears cafeteria
    this.weekMenuList = [];
  }


  /** Close dialog */
  closeDialog() {
    this.dialogRef.close();
  }
}
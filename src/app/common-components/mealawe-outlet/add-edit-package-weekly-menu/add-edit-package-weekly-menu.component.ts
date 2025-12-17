import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { MlApiMainService } from 'src/service/apiService/mlApiMain.service';
import { ToasterService } from 'src/app/toaster/toaster.service';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditPackageWeeklyMenuComponent>,
    private apiMainService: ApiMainService,
    private mlApiMainService: MlApiMainService,
    private toastService: ToasterService
  ) { }

  menuSources = [
    { label: 'Mealawe Menu', color: 'primary', action: (data: any) => this.loadMealaweMenu(data) },
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
    if (this.data?.category.weeklyMenu) {
      this.weekMenuList = this.data?.category.weeklyMenu;
      this.activeWeekIndex = this.weekMenuList.findIndex(w => w.isSelected);
      if (this.activeWeekIndex === -1) this.activeWeekIndex = 0;
    }
  }


  async loadMealaweMenu(data: any) {
    try {
      const res = await this.mlApiMainService.getWeeklyMenuByCategory(data.category.categoryName);
      this.selectedSource = 'mealawe';
      const clusters: any = await this.mlApiMainService.getAllGeoFencingList();
      this.availableClusters = clusters
        .filter((c: any) => res.clusterIds.includes(c.clusterId))
        .map((c: any) => ({
          clusterId: c.clusterId,
          clusterName: c.clusterName
        }));
      this.uniqueMenus = res.uniqueMenus || [];

    } catch (err) {
      console.error("Error loading menu", err);
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
    const createEmptyMenu = () => {
      return [
        { day: 'Monday', description: '' },
        { day: 'Tuesday', description: '' },
        { day: 'Wednesday', description: '' },
        { day: 'Thursday', description: '' },
        { day: 'Friday', description: '' },
        { day: 'Saturday', description: '' },
        { day: 'Sunday', description: '' }
      ];
    };
    const newWeek = {
      weekNumber: nextWeekNumber,
      isSelected: false,
      vegMenuList: createEmptyMenu(),
      nonvegMenuList: createEmptyMenu()
    };
    this.weekMenuList.push(newWeek);
  }

  saveMenu() {
    const active = this.weekMenuList.some(w => w.isSelected);
    if (!active) {
      this.showRequiredError = true;
      return;
    }
    for (let week of this.weekMenuList) {
      for (let item of week.vegMenuList) {
        if (!item.description || item.description.trim() === '') {
          this.toastService.error("Please fill all required descriptions.");
          return;
        }
      }
      for (let item of week.nonvegMenuList) {
        if (!item.description || item.description.trim() === '') {
          this.toastService.error("Please fill all required descriptions.");
          return;
        }
      }
    }
    this.dialogRef.close({ action: 'save', data: this.weekMenuList });
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
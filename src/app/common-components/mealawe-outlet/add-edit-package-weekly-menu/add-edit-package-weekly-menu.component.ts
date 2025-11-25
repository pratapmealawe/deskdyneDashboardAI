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
  customWeeklyMenu: any[] = [];
  selectedSource: string = '';
  activeWeekIndex: number = 0;
  showRequiredError: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditPackageWeeklyMenuComponent>,
    private apiMainService: ApiMainService,
    private mlApiMainService: MlApiMainService,
    private toastService: ToasterService
  ) {

  }

  /** BUTTON SOURCES */
  menuSources = [
    { label: 'Mealawe Menu', color: 'primary', action: (data: any) => this.loadMealaweMenu(data) },
    { label: 'Organization Cafe', color: 'accent', action: (data: any) => this.selectedSource = 'otherCafe' },
    { label: 'Other Org Cafe', color: 'warn', action: (data: any) => this.selectedSource = 'otherOrgCafe' },
    { label: 'Custom Menu', color: 'success', action: (data: any) => { this.selectedSource = 'custom'; this.customWeeklyMenu = []; } }
  ];

  menuTypes = ['Veg', 'Non-Veg'];
  mealTimes = ['Breakfast', 'Lunch', 'Dinner'];


  ngOnInit(): void {
    if (this.data?.category.weeklyMenu) {
      this.weekMenuList = this.data?.category.weeklyMenu;
      this.activeWeekIndex = this.weekMenuList.findIndex(w => w.isSelected);
      if (this.activeWeekIndex === -1) this.activeWeekIndex = 0;
    }
  }

  /** LOAD MEAL AWE MENU */
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

  /** When cluster changes */
  onClusterChange(data: any) {
    const matchedMenu = this.uniqueMenus.find((m: any) => m.clusterIds.includes(data.selectedClusterId));
    this.weekMenuList = matchedMenu ? matchedMenu.weekMenuList : [];
    this.activeWeekIndex = this.weekMenuList.findIndex(w => w.isSelected);
    if (this.activeWeekIndex === -1) this.activeWeekIndex = 0;
  }

  /** List of meals */
  getMenuList(week: any, type: string) {
    return type === 'veg' ? week.vegMenuList : week.nonvegMenuList;
  }

  /** Show only category meal */
  getVisibleMeals(data: any) {
    if (!data?.category?.categoryName) return this.mealTimes;
    return this.mealTimes.filter(meal => meal === data.category.categoryName);
  }

  selectWeek(i: number) {
    // mark only this week as selected
    this.weekMenuList.forEach((w, index) => w.isSelected = index === i);

    // update active index
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

    // Auto-open the newly added week
    this.activeWeekIndex = this.weekMenuList.length - 1;
  }

  saveMenu() {
    const active = this.weekMenuList.some(w => w.isSelected);

    if (!active) {
      this.showRequiredError = true;
      return;
    }

    // VALIDATE ALL DESCRIPTIONS
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


  /** Close dialog */
  closeDialog() {
    this.dialogRef.close();
  }
}
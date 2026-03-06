import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface OrgDashboardFilterData {
  cafeList: any[];
  currentFilters: {
    cafeteria_id: string;
    city: string;
  };
}

@Component({
  selector: 'app-org-dashboard-filter-dialog',
  templateUrl: './org-dashboard-filter-dialog.component.html',
  styleUrls: ['./org-dashboard-filter-dialog.component.scss']
})
export class OrgDashboardFilterDialogComponent {
  selectedCafeteriaId = '';
  selectedCity = '';

  uniqueCities: string[] = [];
  filteredCafes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<OrgDashboardFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrgDashboardFilterData
  ) {
    this.selectedCafeteriaId = data.currentFilters.cafeteria_id || '';
    this.selectedCity = data.currentFilters.city || '';
    this.buildOptions();
  }

  buildOptions() {
    const cities = new Set<string>();
    this.data.cafeList.forEach(c => {
      if (c.cafeteria_city) cities.add(c.cafeteria_city);
    });
    this.uniqueCities = Array.from(cities).sort();
    this.updateFilteredCafes();
  }

  onCityChange() {
    this.selectedCafeteriaId = '';
    this.updateFilteredCafes();
  }

  updateFilteredCafes() {
    this.filteredCafes = this.selectedCity
      ? this.data.cafeList.filter(c => c.cafeteria_city === this.selectedCity)
      : [...this.data.cafeList];
  }

  get activeCount(): number {
    let count = 0;
    if (this.selectedCity) count++;
    if (this.selectedCafeteriaId) count++;
    return count;
  }

  clearAll() {
    this.selectedCafeteriaId = '';
    this.selectedCity = '';
    this.updateFilteredCafes();
  }

  apply() {
    this.dialogRef.close({
      cafeteria_id: this.selectedCafeteriaId,
      city: this.selectedCity
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}

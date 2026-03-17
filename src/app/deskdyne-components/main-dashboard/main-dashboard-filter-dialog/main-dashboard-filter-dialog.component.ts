import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { orderStatusMapper } from 'src/config/order-status.config';

export interface MainDashboardFilterData {
    orgList: any[];
    uniqueOrderStatuses: string[];
    currentFilters: {
        org: string;
        city: string;
        location: string;
        status: string;
    };
}

@Component({
    selector: 'app-main-dashboard-filter-dialog',
    templateUrl: './main-dashboard-filter-dialog.component.html',
    styleUrls: ['./main-dashboard-filter-dialog.component.scss']
})
export class MainDashboardFilterDialogComponent implements OnInit {
    orderStatusMapper: any = orderStatusMapper;

    // Selections
    selectedOrg = '';
    selectedCity = '';
    selectedLocation = '';
    selectedStatus = '';

    // Combined Filter Model
    selectedCityLocation: string = ''; // JSON stringified {city, location}

    // Options
    filteredCityLocations: { city: string, location: string, label: string, value: string }[] = [];

    constructor(
        public dialogRef: MatDialogRef<MainDashboardFilterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MainDashboardFilterData
    ) {
        // Initialize from current filters
        this.selectedOrg = data.currentFilters.org || '';
        this.selectedCity = data.currentFilters.city || '';
        this.selectedLocation = data.currentFilters.location || '';
        this.selectedStatus = data.currentFilters.status || '';

        if (this.selectedCity && this.selectedLocation) {
            this.selectedCityLocation = JSON.stringify({ city: this.selectedCity, location: this.selectedLocation });
        }
    }

    ngOnInit(): void {
        this.updateCascadingOptions();
    }

    // ── Cascading Logic ──
    onOrgChange() {
        this.selectedCity = '';
        this.selectedLocation = '';
        this.selectedCityLocation = '';
        this.updateCascadingOptions();
    }

    onCityLocationChange() {
        if (this.selectedCityLocation) {
            try {
                const parsed = JSON.parse(this.selectedCityLocation);
                this.selectedCity = parsed.city;
                this.selectedLocation = parsed.location;
            } catch (e) {
                console.error('Error parsing city-location', e);
            }
        } else {
            this.selectedCity = '';
            this.selectedLocation = '';
        }
    }

    updateCascadingOptions() {
        // Build "City - Location" list based on Selected Org
        const uniqueSet = new Set<string>();
        const options: { city: string, location: string, label: string, value: string }[] = [];

        this.data.orgList.forEach(org => {
            // If org is selected, only consider that org. Else consider all.
            if (this.selectedOrg && org.organization_name !== this.selectedOrg) return;

            if (org.cafeteriaList) {
                org.cafeteriaList.forEach((cafe: any) => {
                    const city = cafe.cafeteria_city;
                    const location = cafe.location; // Using 'location' field as per requirement

                    if (city && location) {
                        const comboValue = JSON.stringify({ city, location });
                        if (!uniqueSet.has(comboValue)) {
                            uniqueSet.add(comboValue);
                            options.push({
                                city,
                                location,
                                label: `${city} - ${location}`,
                                value: comboValue
                            });
                        }
                    }
                });
            }
        });

        this.filteredCityLocations = options.sort((a, b) => a.label.localeCompare(b.label));
    }

    get activeCount(): number {
        let count = 0;
        if (this.selectedOrg) count++;
        if (this.selectedCityLocation) count++; // Count combined filter as 1
        if (this.selectedStatus) count++;
        return count;
    }

    clearAll() {
        this.selectedOrg = '';
        this.selectedCity = '';
        this.selectedLocation = '';
        this.selectedCityLocation = '';
        this.selectedStatus = '';
        this.updateCascadingOptions();
    }

    apply() {
        this.dialogRef.close({
            org: this.selectedOrg,
            city: this.selectedCity,
            location: this.selectedLocation,
            status: this.selectedStatus
        });
    }

    cancel() {
        this.dialogRef.close();
    }
}

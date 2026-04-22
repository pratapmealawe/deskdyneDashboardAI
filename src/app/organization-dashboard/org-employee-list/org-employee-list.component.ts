import { CommonModule } from '@angular/common';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { SearchFilterService } from '@service/search-filter.service';
import { CommonOutletCafeSelectComponent, CommonSelectConfig, SubmitPayload } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';

interface Employee {
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  employeePhoneNo: number;
  organization_id: string;
  organization_name: string;
  cafeteria_id: string;
  cafeteria_name: string;
}

@Component({
  selector: 'app-org-employee-list',
  templateUrl: './org-employee-list.component.html',
  styleUrls: ['./org-employee-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, CommonOutletCafeSelectComponent]
})
export class OrgEmployeeListComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  orgAdmin: any;
  
  employeeList: Employee[] = [];
  filteredEmployeeList: Employee[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  headerConfig: CommonSelectConfig = {
    mode: 'cafeteria',
    showDateRange: false,
    disableOrg: true,
    requireAll: false
  };

  currentFilter!: SubmitPayload;

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) { }

  ngOnInit(): void {
    this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.updateHeaderConfig();
  }

  ngOnChanges(changes: any): void {
    if (changes['adminOrg']) {
      this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
      this.updateHeaderConfig();
    }
  }

  updateHeaderConfig() {
    if (this.adminOrg) {
      this.headerConfig.defaultOrgId = this.adminOrg._id;
      this.headerConfig.disableOrg = true;
    } else if (this.orgAdmin?.role === 'ORGADMIN') {
      this.headerConfig.defaultOrgId = this.orgAdmin?.orgDetails?._id;
      this.headerConfig.disableOrg = true;
    } else {
      this.headerConfig.disableOrg = false;
    }
    this.headerConfig = { ...this.headerConfig }; // trigger change detection if needed
  }

  filterSubmitted(event: SubmitPayload) {
    if (event) {
      this.currentFilter = event;
      this.getEmployeeListByOrgId();
    }
  }

  async getEmployeeListByOrgId() {
    if (!this.currentFilter?.org_id) return;

    try {
      this.isLoading = true;
      let data = await this.apiMainService.getEmployeeListByOrgId(this.currentFilter.org_id, this.currentFilter.cafeteria_id);
      console.log(data);
      this.employeeList = data || [];
      this.applySearchFilter();
    } catch (err) {
      console.error('Error fetching employee:', err);
      this.employeeList = [];
      this.applySearchFilter();
    } finally {
      this.isLoading = false;
    }
  }

  applySearchFilter() {
    if (!this.searchTerm) {
      this.filteredEmployeeList = [...this.employeeList];
    } else {
      const config = {
        keys: ['employeeId', 'employeeName', 'employeeEmail', 'cafeteria_name'],
      };
      this.filteredEmployeeList = this.searchService.searchData(
        this.employeeList,
        config,
        this.searchTerm
      );
    }
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
}


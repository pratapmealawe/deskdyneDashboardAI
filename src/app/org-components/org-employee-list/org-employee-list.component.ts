import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

@Component({
  selector: 'app-org-employee-list',
  templateUrl: './org-employee-list.component.html',
  styleUrls: ['./org-employee-list.component.scss'],
})
export class OrgEmployeeListComponent implements OnInit {
  orgDetails: any;
  employeeList: any[] = [];
  filteredEmployeeList: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) {}

  ngOnInit(): void {
    this.orgDetails =
      this.localStorageService.getCacheData('ADMIN_PROFILE')?.orgDetails;
    this.getEmployeeListByOrgId();
  }

  async getEmployeeListByOrgId() {
    try {
      let data = await this.apiMainService.getEmployeeListByOrgId(
        this.orgDetails?._id
      );
      this.employeeList = data;
      this.filteredEmployeeList = data.length === 0 ? [] : data;
    } catch (err) {
      console.error('Error fetching employee:', err);
    }
  }

  searchFilter(e: any) {
    const searchText = e.target.value;

    const config = {
      keys: ['employeeId', 'employeeName', 'employeeEmail', 'cafeteria_name'],
    };

    this.filteredEmployeeList = this.searchService.searchData(
      this.employeeList,
      config,
      searchText
    );
  }
}

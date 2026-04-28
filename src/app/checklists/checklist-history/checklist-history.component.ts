import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonSelectConfig, SubmitPayload } from '../../common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { SearchFilterService } from '@service/search-filter.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonOutletCafeSelectComponent } from '../../common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-checklist-history',
  templateUrl: './checklist-history.component.html',
  styleUrls: ['./checklist-history.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonOutletCafeSelectComponent
  ]
})
export class ChecklistHistoryComponent implements OnInit {
  // Stores checklist report history
  reportHistory: any[] = [];
  // Stores the filtered report history for search functionality
  filteredReportHistory: any[] = [];

  // Pagination properties
  totalLength = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];

  // Filter object used for API calls
  filterObj: any = {
    outlet_id: '',
    fromDate: '',
    toDate: '',
    page: 1,
  };
  adminProfile: any;
  isLoading = false;
  searchControl = new FormControl('');

  isAdmin: boolean = false;
  headerConfigAdmin: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: false,
    requireAll: true,
  };

  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true,
  };

  filterData?: SubmitPayload;

  constructor(
    public apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminProfile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.isAdmin = this.adminProfile?.role === 'ADMIN';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999);

    this.headerConfig.defaultDateFrom = today;
    this.headerConfig.defaultDateTo = tomorrow;
    this.headerConfigAdmin.defaultDateFrom = today;
    this.headerConfigAdmin.defaultDateTo = tomorrow;

    this.headerConfig.defaultOrgId = this.adminProfile?.orgDetails?._id || '';
    this.headerConfigAdmin.defaultOrgId = this.adminProfile?.orgDetails?._id || '';

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.applyLocalSearch(value || '');
    });
  }

  filterSubmitted(data: SubmitPayload) {
    this.filterData = data;
    this.filterObj.outlet_id = data.outlet_id;

    if (data.date_from) {
      this.filterObj.fromDate = data.date_from;
    }
    if (data.date_to) {
      this.filterObj.toDate = data.date_to;
    }

    // Reset to first page on new filter
    this.pageIndex = 0;
    this.filterObj.page = 1;
    this.getReportHistoryByfilter();
  }

  async getReportHistoryByfilter() {
    if (!this.filterObj.outlet_id) return;

    this.isLoading = true;
    this.reportHistory = [];
    this.filteredReportHistory = [];

    this.filterObj.page = this.pageIndex + 1;

    try {
      const data = await this.apiMainService.getReportHistoryByfilter(
        this.filterObj
      );

      if (Array.isArray(data)) {
        this.reportHistory = data;
        this.applyLocalSearch(this.searchControl.value || '');

        if (data.length >= this.pageSize) {
          this.totalLength = (this.pageIndex + 2) * this.pageSize;
        } else {
          this.totalLength = (this.pageIndex * this.pageSize) + data.length;
        }
      }
    } catch (e) {
      console.error('Error fetching history:', e);
    } finally {
      this.isLoading = false;
    }
  }

  reloadHistory() {
    this.getReportHistoryByfilter();
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getReportHistoryByfilter();
  }

  applyLocalSearch(searchText: string) {
    const text = searchText.trim();
    if (!text) {
      this.filteredReportHistory = [...this.reportHistory];
      return;
    }

    const config = { keys: ['SubmitedBy'] };
    this.filteredReportHistory = this.searchService.searchData(
      this.reportHistory,
      config,
      text
    );
  }

  editChecklist(report: any) {
    this.router.navigate(['/orgapp/submitChecklist'], { state: report });
  }

  isToday(dateString: string | Date): boolean {
    if (!dateString) return false;
    const reportDate = new Date(dateString);
    const today = new Date();
    return (
      reportDate.getFullYear() === today.getFullYear() &&
      reportDate.getMonth() === today.getMonth() &&
      reportDate.getDate() === today.getDate()
    );
  }
}

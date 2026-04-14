import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { CommonSelectConfig, SubmitPayload } from '../common-outlet-cafe-select/common-outlet-cafe-select.component';



@Component({
  selector: 'app-checklist-history',
  templateUrl: './checklist-history.component.html',
  styleUrls: ['./checklist-history.component.scss'],
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

  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true,
    defaultOrgId: '',
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
    this.headerConfig.defaultOrgId = this.adminProfile?.orgDetails?._id || '';
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

    this.reportHistory = [];
    this.filteredReportHistory = [];

    // Sync filterObj page with material paginator (1-based vs 0-based if api uses 1-based)
    // Assuming API uses 1-based indexing
    this.filterObj.page = this.pageIndex + 1;

    try {
      const data = await this.apiMainService.getReportHistoryByfilter(
        this.filterObj
      );

      // API might return just the array, or an object with count. 
      // Based on previous code `data.length > 0`, it seems to be an array.
      // If backend doesn't return total count, we have to fake it or rely on "load more" style
      // but user asked for frontend pagination style. 
      // If valid array:
      if (Array.isArray(data)) {
        this.reportHistory = data;
        this.filteredReportHistory = [...this.reportHistory];

        // Logic to guess total length if API doesn't provide it:
        // If we got a full page, assume there might be more.
        // But for standard Paginator, we need a length.
        // If API doesn't provide count, we can only set length to (page * size) + (more ? size : 0)
        // OR, we just stick to this simple view but using Paginator controls event if length is unknown.

        // Let's assume for now we set a high number if data exists, to allow "Next".
        if (data.length >= this.pageSize) {
          this.totalLength = (this.pageIndex + 2) * this.pageSize; // Allow next page
        } else {
          this.totalLength = (this.pageIndex * this.pageSize) + data.length;
        }
      }

    } catch (e) {
      console.log('Error while fetching data', e);
    }
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getReportHistoryByfilter();
  }

  // Search local list
  searchFilter(e: any) {
    const searchText = (e.target.value || '').trim();
    if (!searchText) {
      this.filteredReportHistory = [...this.reportHistory];
      return;
    }

    const config = { keys: ['SubmitedBy' /*, 'SubmitedDate'*/] };
    this.filteredReportHistory = this.searchService.searchData(
      this.reportHistory,
      config,
      searchText
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

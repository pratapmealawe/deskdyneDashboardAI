import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

// Interface for defining filter object structure
interface filter {
  orgId: string;
  cafeId: string;
  fromDate: string;
  toDate: string;
  page: number;
}

@Component({
  selector: 'app-checklist-history',
  templateUrl: './checklist-history.component.html',
  styleUrls: ['./checklist-history.component.scss'],
})
export class ChecklistHistoryComponent implements OnInit {
  // Holds the selected organization's details
  orgDetails: any = null;
  // Stores the list of all organizations
  orglist: any[] = [];
  // Stores checklist report history based on applied filters
  reportHistory: any[] = [];
  // Stores the filtered report history for search functionality
  filteredReportHistory: any[] = [];
  // Array to track expanded/collapsed state of each item
  expandedItems: boolean[] = [];
  // Filter object used for API calls
  filterObj: filter = {
    orgId: '',
    cafeId: '',
    fromDate: '',
    toDate: '',
    page: 1,
  };
  // Stores admin details fetched from local storage
  orgAdmin: any;
  // Controls the visibility of the "Load More" button
  nextOn: boolean = false;

  constructor(
    public apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) {}

  ngOnInit() {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgList();
  }

  // Fetch the list of all organizations
  // Set initial values based on admin role
  async getOrgList() {
    try {
      let page = 1;
      let searchObj = { countOnly: false };
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        searchObj,
        page
      );
      this.orglist = data;
      this.getInitialValues();
    } catch (error) {
      console.log(error);
    }
  }

  // If the logged-in user is an Org Admin, auto-select their organization
  // Otherwise, fetch report history using filters
  getInitialValues() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails();
    } else {
      this.getReportHistoryByfilter();
    }
  }

  // Find the selected organization based on the filter
  // Reset cafe ID and clear list
  setOrgDetails() {
    this.orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });
    this.filterObj.cafeId = '';
    this.clearList();
  }

  // Clear the list and fetch fresh data
  clearList() {
    this.reportHistory = [];
    this.filterObj.page = 1;
    this.getReportHistoryByfilter();
  }

  // Toggle visibility of feedback
  toggleFeedback(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
  }

  // Fetch data based on applied filters
  // Determine if "Load More" button should be shown
  // Append the fetched data to existing list
  // Initialize expansion state for each item
  async getReportHistoryByfilter() {
    try {
      const data = await this.apiMainService.getReportHistoryByfilter(
        this.filterObj
      );
      this.nextOn = data.length > 0;
      this.reportHistory = [...this.reportHistory, ...data];
      this.filteredReportHistory = [...this.reportHistory];
      this.expandedItems = new Array(this.reportHistory.length).fill(true);
    } catch (e) {
      console.log('Error while fetching data', e);
    }
  }

  // Increment the page number to fetch the next set of data
  getMore() {
    this.filterObj.page++;
    this.getReportHistoryByfilter();
  }

  // Define search configuration (searching by key)
  // Perform search on mainlist
  searchFilter(e: any) {
    const searchText = e.target.value;
    const config = { keys: ['SubmitedBy'] };
    this.filteredReportHistory = this.searchService.searchData(
      this.reportHistory,
      config,
      searchText
    );
  }
}

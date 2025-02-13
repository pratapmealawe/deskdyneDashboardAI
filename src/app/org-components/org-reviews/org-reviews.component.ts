import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

@Component({
  selector: 'app-org-reviews',
  templateUrl: './org-reviews.component.html',
  styleUrls: ['./org-reviews.component.scss'],
})
export class OrgReviewsComponent implements OnInit {
  orgDetails: any;
  feedbackList: any[] = [];
  filteredFeedbackList: any[] = [];
  page: number = 1;
  expandedItems: boolean[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) {}

  ngOnInit(): void {
    this.orgDetails =
      this.localStorageService.getCacheData('ADMIN_PROFILE')?.orgDetails;
    this.getfeedbackListById();
  }

  async getfeedbackListById() {
    try {
      let data = await this.apiMainService.getFeedbackListByOrgId(
        this.orgDetails?._id,
        this.page
      );
      this.feedbackList = data;
      this.filteredFeedbackList = data;
      this.expandedItems = new Array(this.feedbackList.length).fill(true);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  }

  toggleFeedback(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
  }

  getMore() {
    this.page++;
    this.getfeedbackListById();
  }

  searchFilter(e: any) {
    const searchText = e.target.value;

    const config = {
      keys: ['feedbackFrom_name', 'outletName'],
    };

    this.filteredFeedbackList = this.searchService.searchData(
      this.feedbackList,
      config,
      searchText
    );
  }
}

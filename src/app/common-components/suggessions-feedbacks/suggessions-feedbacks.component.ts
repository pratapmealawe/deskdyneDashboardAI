import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { SuggestionsFeedbackService } from 'src/service/suggestions-feedback.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-suggessions-feedbacks',
  templateUrl: './suggessions-feedbacks.component.html',
  styleUrls: ['./suggessions-feedbacks.component.scss'],
})
export class SuggessionsFeedbacksComponent implements OnInit {
  // Raw list from API
  feedbacklist: any[] = [];

  // After search/filter
  filteredFeedback: any[] = [];

  // Current page slice (for Material paginator)
  pagedFeedback: any[] = [];

  // Material paginator state (frontend-side)
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 50];

  // Single search input text
  searchText = '';

  btnPolicy: any;
  isLoading = false;
  admin: any

  constructor(
    private ddApiMainService: ApiMainService,
    private policyService: PolicyService,
    private suggestionsFeedbackService: SuggestionsFeedbackService,
    private searchService: SearchFilterService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.admin = this.localStorageService.getCacheData("ADMIN_PROFILE");
    console.log(this.admin);
    
    this.getFeedbackList();
  }

  // === Load feedback list from API ===
  async getFeedbackList() {
    this.isLoading = true;
    try {
      // NOTE:
      // This assumes getGeneralAppFeeback(1) returns all records,
      // or at least enough for this admin view.
      const feedbacklist: any[] =
        await this.ddApiMainService.getGeneralAppFeeback(1);

      if (Array.isArray(feedbacklist) && feedbacklist.length > 0) {
        this.feedbacklist = feedbacklist.map((ele: any) => {
          // derive submitDate from ObjectId timestamp
          ele.submitDate = new Date(
            parseInt(ele._id.substring(0, 8), 16) * 1000
          );

          // make sure acknowledgeStatus has a default
          if (!ele.acknowledgeStatus) {
            ele.acknowledgeStatus = ele.acknowledged ? 'Resolved' : 'New';
          }

          return ele;
        });

        // reset paginator
        this.pageIndex = 0;

        // apply search (if any) and slice
        this.applyFilters();
      } else {
        this.feedbacklist = [];
        this.filteredFeedback = [];
        this.pagedFeedback = [];
      }
    } catch (error) {
      console.log('error while fetching feedbacklist ', error);
    } finally {
      this.isLoading = false;
    }
  }

  // =========================
  // 🔎 Search with SearchService
  // =========================

  // called from (input)="searchFilter($event)"
  searchFilter(e: any) {
    const searchText = e.target?.value || '';
    this.searchText = searchText;
    this.pageIndex = 0; // go back to first page on new search
    this.applyFilters();
  }

  clearSearch() {
    this.searchText = '';
    this.pageIndex = 0;
    this.applyFilters();
  }

  applyFilters() {
    const text = (this.searchText || '').trim();

    if (!text) {
      // no search → full list
      this.filteredFeedback = [...this.feedbacklist];
    } else {
      // use your generic search service
      const config = {
        keys: [
          'feedbackFrom_name',
          'feedbackFrom_phoneNo',
          'orgName',
          'empId',
          'orderNo',
          'orderType',
          'feedbackType',
          'feedbackComment',
        ],
      };

      this.filteredFeedback = this.searchService.searchData(
        this.feedbacklist,
        config,
        text
      );
    }

    this.updatePagedFeedback();
  }

  // =========================
  // 📄 Paginator (frontend-side)
  // =========================
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedFeedback();
  }

  updatePagedFeedback() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedFeedback = this.filteredFeedback.slice(start, end);
  }

  // =========================
  // ✅ Acknowledge with comment + status
  // =========================

  // Start editing acknowledge (show inline form)
  startAcknowledge(feedback: any) {
    feedback._isEditing = true;
    // default comment draft
    feedback._commentDraft = feedback._commentDraft || '';
    // default status: if New → InProgress, else existing
    feedback._statusDraft =
      feedback.acknowledgeStatus && feedback.acknowledgeStatus !== 'New'
        ? feedback.acknowledgeStatus
        : 'InProgress';
  }

  cancelAcknowledge(feedback: any) {
    feedback._isEditing = false;
    // optional: clear drafts
    // feedback._commentDraft = '';
    // feedback._statusDraft = '';
  }

  async saveAcknowledge(feedback: any) {
    try {
      const payload = {
        comment: feedback._commentDraft || '',
        adminUser: {
          _id: this.admin?._id || "",
          name: this.admin?.name || "Admin",
          phoneNo: this.admin?.phoneNo || ""
        }
      };

      await this.ddApiMainService.feedbackacknowledge(feedback._id, payload);

      feedback.acknowledged = true;
      feedback.acknowledgeComment = payload.comment;
      feedback._isEditing = false;

      // Update global count (for header badge etc.)
      this.getFeedbackList()
      this.suggestionsFeedbackService.getGeneralAppFeebackCount(false);
    } catch (error) {
      console.log('error while acknowledge feedback ', error);
    }
  }
}

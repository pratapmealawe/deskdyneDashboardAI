import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/material.module';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { PermissionsService } from '@service/permission.service';
import { SuggestionsFeedbackService } from '@service/suggestions-feedback.service';
import { SearchFilterService } from '@service/search-filter.service';
import { LocalStorageService } from '@service/local-storage.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
})
export class FeedbacksComponent implements OnInit {
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
  orgList: any[] = [];
  selectedOrg: any = '';

  btnPolicy: any;
  isLoading = false;
  admin: any

  constructor(
    private apiMainService: ApiMainService,
    private permissionsService: PermissionsService,
    private suggestionsFeedbackService: SuggestionsFeedbackService,
    private searchService: SearchFilterService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.permissionsService.getCurrentButtonPolicy();
    this.admin = this.localStorageService.getCacheData("ADMIN_PROFILE");

    this.getFeedbackList();
  }

  // === Load feedback list from API ===
  async getFeedbackList() {
    this.isLoading = true;
    try {
      // NOTE:
      // This assumes getGeneralAppFeeback(1) returns all records,
      // or at least enough for this admin view.
      const feedbacklist: any[] = await this.apiMainService.getGeneralAppFeeback(1);

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
          return ele;
        });

        this.extractOrganizations();

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
    } finally {
      this.isLoading = false;
    }
  }

  extractOrganizations() {
    const orgs = new Map();
    this.feedbacklist.forEach(item => {
      if (item.orgName && !orgs.has(item.orgName)) {
        orgs.set(item.orgName, { orgName: item.orgName });
      }
    });
    this.orgList = Array.from(orgs.values());
  }

  // =========================
  // ðŸ”Ž Search with SearchService
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
    let temp = [...this.feedbacklist];

    if (this.selectedOrg) {
      temp = temp.filter(item => item.orgName === this.selectedOrg);
    }

    const text = (this.searchText || '').trim();

    if (!text) {
      // no search â†’ full list
      this.filteredFeedback = temp;
    } else {
      // use your generic search service
      const config = {
        keys: [
          'feedbackFrom_name',
          'feedbackFrom_phoneNo',
          'orgName',
          'feedbackType',
          'feedbackComment',
          'orderNo'
        ],
      };

      this.filteredFeedback = this.searchService.searchData(
        temp,
        config,
        text
      );
    }

    this.updatePagedFeedback();
  }

  // =========================
  // ðŸ“„ Paginator (frontend-side)
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
  // âœ… Acknowledge with comment + status
  // =========================

  // Start editing acknowledge (show inline form)
  startAcknowledge(feedback: any) {
    feedback._isEditing = true;
    // default comment draft
    feedback._commentDraft = feedback._commentDraft || '';
    // default status: if New â†’ InProgress, else existing
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

      await this.apiMainService.feedbackacknowledge(feedback._id, payload);

      feedback.acknowledged = true;
      feedback.acknowledgeComment = payload.comment;
      feedback._isEditing = false;

      // Update global count (for header badge etc.)
      this.getFeedbackList()
      this.suggestionsFeedbackService.getGeneralAppFeebackCount(false);
    } catch (error) {
    }
  }

  async excelExport() {
    if (!this.filteredFeedback || this.filteredFeedback.length === 0) {
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Feedback List');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Organization', key: 'orgName', width: 20 },
      { header: 'Order No', key: 'orderNo', width: 15 },
      { header: 'Feedback Type', key: 'feedbackType', width: 15 },
      { header: 'Comment', key: 'comment', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Submit Date', key: 'submitDate', width: 20 }
    ];

    // Header style
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    this.filteredFeedback.forEach((item) => {
      worksheet.addRow({
        name: item.feedbackFrom_name || '-',
        phone: item.feedbackFrom_phoneNo || '-',
        orgName: item.orgName || '-',
        orderNo: item.orderNo || '-',
        feedbackType: item.feedbackType || '-',
        comment: item.feedbackComment || '-',
        status: item.acknowledgeStatus || 'New',
        submitDate: item.submitDate ? new Date(item.submitDate).toLocaleString() : '-'
      });
    });

    const fileName = `feedback_list_${new Date().toISOString().slice(0, 10)}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName);
  }
}


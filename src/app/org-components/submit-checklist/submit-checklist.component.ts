import { Component, OnInit } from '@angular/core';
import {
  CommonSelectConfig,
  SubmitPayload
} from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface ChecklistQuestion {
  _id: string;
  checklistQuestion: string;
  checklistQuestionType: string;
  selected: boolean;
  comment: string;
  // keep room for backend extras
  [key: string]: any;
}

@Component({
  selector: 'app-submit-checklist',
  templateUrl: './submit-checklist.component.html',
  styleUrls: ['./submit-checklist.component.scss'],
})
export class SubmitChecklistComponent implements OnInit {
  editMode = false; // kept for future use / header text toggle

  allChecklistQuestions: ChecklistQuestion[] = [];
  filteredChecklistQuestions: ChecklistQuestion[] = [];
  reportHistory: any[] = [];
  reportObj: any = {};

  adminProfile: any = {};
  btnPolicy: any;

  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: false,
    disableOrg: true,
    requireAll: true,
    defaultOrgId: '',
  };

  filterData?: SubmitPayload;

  constructor(
    public apiMainService: ApiMainService,
    public localStorageService: LocalStorageService,
    private policyService: PolicyService,
    private searchService: SearchFilterService
  ) { }

  ngOnInit(): void {
    this.clear();

    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.adminProfile = this.localStorageService.getCacheData('ADMIN_PROFILE');

    // default org from profile
    this.headerConfig.defaultOrgId = this.adminProfile?.orgDetails?._id || '';
  }

  // called from app-common-outlet-cafe-select
  filterSubmitted(e: SubmitPayload): void {
    this.filterData = e;

    if (this.filterData?.outlet_id) {
      this.getReportHistoryByfilter();
    } else {
      this.allChecklistQuestions = [];
      this.filteredChecklistQuestions = [];
      this.reportHistory = [];
    }
  }

  trackByQuestionId(index: number, item: ChecklistQuestion): string {
    return item._id;
  }

  // Enforce outlet + at least one selected/commented
  canSubmit(): boolean {
    if (!this.filterData || !this.filterData.outlet_id) {
      return false;
    }

    if (!this.allChecklistQuestions || this.allChecklistQuestions.length === 0) {
      return false;
    }

    const hasAnySelection = this.allChecklistQuestions.some(
      q => q.selected || (q.comment && q.comment.trim())
    );
    return hasAnySelection;
  }

  private async getAllChecklistQuestions(): Promise<void> {
    this.allChecklistQuestions = [];
    this.filteredChecklistQuestions = [];

    try {
      const checklistQuestions: any[] = await this.apiMainService.getAllChecklistQuestions();

      if (checklistQuestions && checklistQuestions.length > 0) {
        let base: ChecklistQuestion[] = checklistQuestions.map((q: any) => ({
          ...q,
          selected: false,
          comment: '',
        }));

        // If there is history, merge the last submitted state
        if (
          this.reportHistory.length > 0 &&
          this.reportHistory[0].checklist_questions
        ) {
          base = this.mergeChecklistData(
            this.reportHistory[0].checklist_questions,
            base
          );
        }

        console.log("base", base);

        this.allChecklistQuestions = base;
        this.filteredChecklistQuestions = [...base];
      }
    } catch (e) {
      console.log('Error while fetching checklist questions ', e);
    }
  }

  private mergeChecklistData(
    previous: any[],
    current: ChecklistQuestion[]
  ): ChecklistQuestion[] {
    const map = new Map(previous.map(item => [item._id, item]));
    return current.map(item => {
      if (map.has(item._id)) {
        const m: any = map.get(item._id);
        return {
          ...item,
          selected: !!m.selected,
          comment: m.comment || ''
        };
      }
      return item;
    });
  }

  async getReportHistoryByfilter(): Promise<void> {
    if (!this.filterData || !this.filterData.outlet_id) {
      // nothing to fetch yet
      this.reportHistory = [];
      this.allChecklistQuestions = [];
      this.filteredChecklistQuestions = [];
      return;
    }

    try {
      const data = await this.apiMainService.getChecklistReportByOutletId(
        this.filterData.outlet_id
      );
      console.log("data", data);

      this.reportHistory = data || [];
      await this.getAllChecklistQuestions();
    } catch (e) {
      console.log('Error while fetching report history', e);
      this.reportHistory = [];
      await this.getAllChecklistQuestions();
    }
  }

  async submitChecklist(): Promise<void> {
    if (!this.canSubmit() || !this.filterData) return;

    // build report object for new submission
    const payload: any = {
      ...this.reportObj,
      checklist_questions: this.allChecklistQuestions,
      orgDetails: {
        organization_name: this.filterData.org_name,
        _id: this.filterData.org_id,
      },
      cafeDetails: {
        cafeteria_name: this.filterData.cafeteria_name,
        cafeteria_id: this.filterData.cafeteria_id,
      },
      outletDetails: {
        outletName: this.filterData.outlet_name,
        outletId: this.filterData.outlet_id,
      },
      SubmitedBy: this.adminProfile?.name,
      submitedUserId: this.adminProfile?._id,
    };

    try {
      await this.apiMainService.saveChecklistReport(payload);
      this.editMode = false; // in case you add edit in future
      await this.getReportHistoryByfilter();
    } catch (e) {
      console.log('Error while saving checklist report ', e);
    }
  }

  clear(): void {
    this.reportObj = {};
    this.filteredChecklistQuestions = [];
    this.allChecklistQuestions = [];
    this.reportHistory = [];
    // keep filterData as-is; it will be set when outlet is selected
  }

  searchFilter(e: Event): void {
    const target = e.target as HTMLInputElement;
    const searchText = (target.value || '').trim();

    if (!searchText) {
      this.filteredChecklistQuestions = [...this.allChecklistQuestions];
      return;
    }

    const config = { keys: ['checklistQuestion'] };

    this.filteredChecklistQuestions = this.searchService.searchData(
      this.allChecklistQuestions,
      config,
      searchText
    );
  }
}

import { LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface filter {
  orgId: string;
  cafeId: string;
  fromDate: Date;
}

@Component({
  selector: 'app-submit-checklist',
  templateUrl: './submit-checklist.component.html',
  styleUrls: ['./submit-checklist.component.scss'],
})
export class SubmitChecklistComponent implements OnInit {
  editMode: boolean = false;
  allChecklistQuestions: any[] = [];
  filteredChecklistQuestions: any[] = [];
  reportHistory: any[] = [];
  reportObj: any = {};
  adminProfile: any = {};
  btnPolicy: any;
  orglist: any[] = [];
  filterObj: filter = {
    orgId: '',
    cafeId: '',
    fromDate: new Date(),
  };
  cafeList: any[] = [];
  stateData: any;

  constructor(
    public apiMainService: ApiMainService,
    public localStorageService: LocalStorageService,
    private policyService: PolicyService,
    private searchService: SearchFilterService,
    private router: Router,
    private location: LocationStrategy
  ) {}

  ngOnInit() {
    this.clear();
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.adminProfile = this.localStorageService.getCacheData('ADMIN_PROFILE');

    this.stateData = this.location.getState();

    console.log(this.stateData);

    this.stateData?._id ? (this.editMode = true) : (this.editMode = false);

    this.getOrgList();
  }

  async getOrgList() {
    try {
      let page = 1;
      let searchObj = { countOnly: false };
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        searchObj,
        page
      );

      this.orglist = data.filter((item: any) =>
        this.adminProfile?.siteExecutiveDetails?.orgDetails.some(
          (a: any) => a._id === item._id
        )
      );
      // this.filterObj.orgId = this.orglist[0]?._id;

      if (this.editMode) {
        this.filterObj.orgId = this.stateData.orgDetails._id;
        this.filterObj.cafeId = this.stateData.cafeDetails._id;
        this.setOrgDetails();
      }
      this.getReportHistoryByfilter();
    } catch (error) {
      console.log(error);
    }
  }

  changeCafe() {
    this.getReportHistoryByfilter();
  }

  setOrgDetails() {
    this.cafeList = [];
    let orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });

    this.cafeList = orgDetails?.cafeteriaList.filter((item: any) =>
      this.adminProfile?.siteExecutiveDetails?.cafeDetails.some(
        (a: any) => a._id === item._id
      )
    );

    // !this.editMode && (this.filterObj.cafeId = '');
  }

  async getAllChecklistQuestions() {
    this.allChecklistQuestions = [];
    this.filteredChecklistQuestions = [];
    try {
      const checklistQuestions: any[] =
        await this.apiMainService.getAllChecklistQuestions();
      if (checklistQuestions && checklistQuestions.length > 0) {
        this.allChecklistQuestions = checklistQuestions.map((q: any) => {
          return {
            ...q,
            selected: false,
            comment: '',
          };
        });
        if (this.reportHistory.length > 0) {
          this.allChecklistQuestions = this.mergeChecklistData(
            this.reportHistory[0].checklist_questions,
            this.allChecklistQuestions
          );
        }
        this.filteredChecklistQuestions = this.allChecklistQuestions;
      } else {
        this.allChecklistQuestions = [];
      }
    } catch (e) {
      console.log('Error while fetching reports ', e);
    }
  }

  mergeChecklistData(arr1: any[], arr2: any[]) {
    // Convert first array to a map for quick lookup
    const map = new Map(arr1.map((item) => [item._id, item]));

    // Update the second array with values from the first array
    return arr2.map((item) => {
      if (map.has(item._id)) {
        return {
          ...item,
          selected: map.get(item._id).selected,
          comment: map.get(item._id).comment,
        };
      }
      return item;
    });
  }

  async getReportHistoryByfilter() {
    console.log(this.filterObj);

    try {
      const data = await this.apiMainService.getReportHistoryByfilter(
        this.filterObj
      );

      console.log(data);

      this.reportHistory = data;

      this.getAllChecklistQuestions();
    } catch (e) {
      console.log('Error while fetching data', e);
    }
  }

  async submitChecklist() {
    this.reportObj.checklist_questions = this.allChecklistQuestions;
    this.reportObj.orgDetails =
      this.adminProfile.siteExecutiveDetails.orgDetails.find(
        (item: any) => item._id === this.filterObj.orgId
      );
    this.reportObj.cafeDetails =
      this.adminProfile.siteExecutiveDetails.cafeDetails.find(
        (item: any) => item._id === this.filterObj.cafeId
      );
    this.reportObj.SubmitedBy = this.adminProfile.name;
    this.reportObj.submitedUserId = this.adminProfile._id;
    try {
      const allReports = await this.apiMainService.saveChecklistReport(
        this.reportObj
      );
      this.cancelChecklistSubmit();
    } catch (e) {
      console.log('Error while fetching reports ', e);
    }
  }

  async updateChecklist() {
    this.reportObj.checklist_questions = this.allChecklistQuestions;
    this.reportObj.orgDetails =
      this.adminProfile.siteExecutiveDetails.orgDetails.find(
        (item: any) => item._id === this.filterObj.orgId
      );
    this.reportObj.cafeDetails =
      this.adminProfile.siteExecutiveDetails.cafeDetails.find(
        (item: any) => item._id === this.filterObj.cafeId
      );
    this.reportObj.SubmitedBy = this.stateData?.SubmitedBy;
    this.reportObj.submitedUserId = this.stateData?.submitedUserId;
    this.reportObj._id = this.stateData?._id;
    try {
      await this.apiMainService.updateChecklistReports(this.reportObj);
      this.cancelChecklistSubmit();
    } catch (e) {
      console.log('Error while fetching reports ', e);
    }
  }

  clear() {
    this.reportObj = {};
    this.filterObj = {
      cafeId: '',
      orgId: '',
      fromDate: new Date(),
    };
    this.filteredChecklistQuestions = [];
    this.allChecklistQuestions = [];
  }

  cancelChecklistSubmit() {
    this.clear();
    this.router.navigate(['/checklistHistory']);
  }

  async deleteFAQ(id: string) {
    try {
      await this.apiMainService.deleteFAQ(id);
      this.cancelChecklistSubmit();
    } catch (e) {
      console.log('Error while fetching reports ', e);
    }
  }

  searchFilter(e: any) {
    const searchText = e.target.value;
    const config = { keys: ['checklistQuestion'] };
    this.filteredChecklistQuestions = this.searchService.searchData(
      this.allChecklistQuestions,
      config,
      searchText
    );
  }
}

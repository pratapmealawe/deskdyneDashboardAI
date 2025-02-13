import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

interface filter {
  orgId: string;
  cafeId: string;
  fromDate: string;
  toDate: string;
}
@Component({
  selector: 'app-checklist-history',
  templateUrl: './checklist-history.component.html',
  styleUrls: ['./checklist-history.component.scss'],
})
export class ChecklistHistoryComponent implements OnInit {
  orgDetails: any = null;
  orglist: any = [];
  reportHistory: any = [];
  expandedItems: boolean[] = [];
  filterObj: filter = {
    orgId: '',
    cafeId: '',
    fromDate: '',
    toDate: '',
  };
  orgAdmin: any;

  constructor(
    public apiMainService: ApiMainService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgList();
  }

  async getOrgList() {
    try {
      let page = 1;
      let searchObj = {
        countOnly: false,
      };
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        searchObj,
        page
      );
      this.orglist = data;
      this.getInitialVlaues();
    } catch (error) {
      console.log(error);
    }
  }

  getInitialVlaues() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails();
      this.getReportHistoryByfilter();
    } else {
      this.getReportHistory();
    }
  }

  setOrgDetails() {
    this.orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });
    this.filterObj.cafeId = '';
    this.getReportHistoryByfilter();
  }

  toggleFeedback(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
  }

  async getReportHistory() {
    try {
      const reportHistory = await this.apiMainService.getAllChecklistReports();
      if (reportHistory && reportHistory.length > 0) {
        this.reportHistory = reportHistory;
        this.expandedItems = new Array(this.reportHistory.length).fill(true);
      } else {
        this.reportHistory = [];
      }
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  async getReportHistoryByfilter() {
    try {
      const reportHistory = await this.apiMainService.getReportHistoryByfilter(
        this.filterObj
      );
      if (reportHistory && reportHistory.length > 0) {
        this.reportHistory = reportHistory;
        this.expandedItems = new Array(this.reportHistory.length).fill(true);
      } else {
        this.reportHistory = [];
      }
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
}

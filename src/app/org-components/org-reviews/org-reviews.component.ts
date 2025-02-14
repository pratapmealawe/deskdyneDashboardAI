import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface filter {
  orgId: string;
  cafeId: string;
  fromDate: string;
  toDate: string;
  page: number;
}

@Component({
  selector: 'app-org-reviews',
  templateUrl: './org-reviews.component.html',
  styleUrls: ['./org-reviews.component.scss'],
})
export class OrgReviewsComponent implements OnInit {
  orglist: any = [];
  orgDetails: any;
  feedbackList: any[] = [];
  filteredFeedbackList: any[] = [];
  page: number = 1;
  expandedItems: boolean[] = [];
  nextOn:boolean=false;
  filterObj: filter = {
    orgId: '',
    cafeId: '',
    fromDate: '',
    toDate: '',
    page:  1,
  };
  orgAdmin: any;
  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) {}

  ngOnInit() {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgList();
  }
  toggleFeedback(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
  }

  getMore() {
    this.filterObj.page++;
    this.getfeedbacklistByfilter();
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
  setOrgDetails() {
    this.filterObj.page=1;
    this.orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });
    this.filterObj.cafeId = '';
    this.getfeedbacklistByfilter();
  }
  async getfeedbacklistByfilter(){
    this.nextOn=false;
    try {
      const feedbackList = await this.apiMainService.getfeedbacklistByfilter(
        this.filterObj
      );
      if (feedbackList && feedbackList.length > 0) {
        this.nextOn=true;
        this.feedbackList = [...this.feedbackList, ...feedbackList];
        this.filteredFeedbackList = [...this.filteredFeedbackList, ...feedbackList];
        this.expandedItems = new Array(this.feedbackList.length).fill(true);
      }else{
        this.nextOn=false;
      }
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
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
    }
  }
  onCafeChange(){
    this.feedbackList=[];
    this.filteredFeedbackList=[];
  }
}

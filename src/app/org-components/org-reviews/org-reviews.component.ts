import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { log } from 'util';

interface filter {
  orgId: string;
  outletId: string;
  fromDate: string;
  toDate: string;
  page: number;
}

@Component({
  selector: 'app-org-reviews',
  templateUrl: './org-reviews.component.html',
  styleUrls: ['./org-reviews.component.scss'],
})
export class OrgReviewsComponent implements OnInit, OnChanges {
  @Input() adminOrg: any
  orglist: any = [];
  orgDetails: any;
  feedbackList: any[] = [];
  filteredFeedbackList: any[] = [];
  page: number = 1;
  expandedItems: boolean[] = [];
  nextOn: boolean = false;
  filterObj: filter = {
    orgId: '',
    outletId: '',
    fromDate: '',
    toDate: '',
    page: 1,
  };
  orgAdmin: any;
  outletList: any[] = []

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
  ) { }

  ngOnInit() {
    this.initFunc()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.initFunc()
    }
  }

  initFunc() {
    this.orgAdmin = this.adminOrg ? { role: "ORGADMIN", orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
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
    this.filterObj.page = 1;
    this.orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });
    
    this.filterObj.outletId = '';

    this.getfeedbacklistByfilter();
  }
  async getfeedbacklistByfilter() {
    this.nextOn = false;
    try {
      const feedbackList = await this.apiMainService.getfeedbacklistByfilter(
        this.filterObj
      );

      if (feedbackList && feedbackList.length > 0) {
        this.nextOn = true;
        this.feedbackList = [...this.feedbackList, ...feedbackList];
        this.filteredFeedbackList = [
          ...this.filteredFeedbackList,
          ...feedbackList,
        ];
        this.expandedItems = new Array(this.feedbackList.length).fill(true);
      } else {
        this.nextOn = false;
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
      this.getOutlets()
    } catch (error) {
      console.log(error);
    }
  }

  async getOutlets() {
    let searchObj = {
      orgId: this.orgAdmin?.orgDetails._id
    };
    try {
      const data = await this.apiMainService.searchOutletByOrgId(
        searchObj
      );

      this.outletList = [ ...data];

      console.log(this.outletList);
      
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  }


  getInitialVlaues() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails();
    }
  }
  onCafeChange() {
    this.feedbackList = [];
    this.filteredFeedbackList = [];
  }
}

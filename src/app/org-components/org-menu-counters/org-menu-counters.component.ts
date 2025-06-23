import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface filter {
  orgId: string;
}

@Component({
  selector: 'app-org-menu-counters',
  templateUrl: './org-menu-counters.component.html',
  styleUrls: ['./org-menu-counters.component.scss'],
})
export class OrgMenuCountersComponent implements OnInit, OnChanges {
  @Input() adminOrg: any
  outletList: any[] = [];
  filteredOutletList: any[] = [];
  searchObj: filter = {
    orgId: '',
  };
  // Stores admin details fetched from local storage
  orgAdmin: any;
  imageUrl: any = environment.imageUrl;
  selectedOutlet: any = null;
  filteredMenuList: any[] = [];
  cafeteria_id: any
  cafeList: any[] = []
  filteredCafeList: any[] = []
  orgDetails: any
  outletOrderData: any[] = []

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) { }

  ngOnInit(): void {
    this.initFunc()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.initFunc()
    }
  }

  initFunc() {
    this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgDetailsById();
  }


  async getOrgDetailsById() {
    try {
      const res = await this.apiMainService.getOrg(this.orgAdmin?.orgDetails?._id)
      this.orgDetails = res
      if (res?.cafeteriaList.length > 0) {
        this.cafeList = res?.cafeteriaList
        this.cafeteria_id = this.cafeList[0]?.cafeteria_id
        this.getOutlets()
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  async getMatchedOutlets() {
    const merged = this.cafeList.map((cafe: any) => ({
      ...cafe,
      outlets: this.outletList.filter(o => o.cafeteriaDetails.cafeteria_name === cafe.cafeteria_name)
    }));

    this.filteredCafeList = merged

    if(this.filteredCafeList.length > 0) {
      this.filteredOutletList  = this.filteredCafeList.find((item:any) => item?.cafeteria_id === this.cafeteria_id)?.outlets
    }
  }



  async getOutlets() {
    const searchObj = {
      orgId: this.orgAdmin?.orgDetails?._id
    }
    try {
      const data = await this.apiMainService.searchOutletByOrgId(searchObj)

      this.outletList = [...data];
      this.getMatchedOutlets()
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  }

  showOutletDetails(outlet: any) {
    this.selectedOutlet = outlet;
    this.filteredMenuList = [...outlet.menuList];
  }

  getStars(rating: number) {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }

  toggleReadMore(index: number) {
    this.filteredOutletList[index]["showFullDescription"] =
      !this.filteredOutletList[index].showFullDescription;

  }

  backToMainPage() {
    this.selectedOutlet = null;
  }

  searchFilter(e: any) {
    const searchText = e.target.value;

    if (this.selectedOutlet) {
      // Search inside selectedOutlet.menuList
      const config = { keys: ['itemName'] };
      this.filteredMenuList = this.searchService.searchData(
        this.selectedOutlet.menuList,
        config,
        searchText
      );
    } else {
      // Search in outlet list
      const config = { keys: ['outletName'] };
      this.filteredOutletList = this.searchService.searchData(
        this.outletList,
        config,
        searchText
      );
    }
  }

  fetchData() {
    this.getOutlets()
  }
}

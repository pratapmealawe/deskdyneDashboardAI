import { Component, OnInit } from '@angular/core';
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
export class OrgMenuCountersComponent implements OnInit {
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

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) {}

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOutlets();
  }

  async getOutlets() {
    this.searchObj.orgId = this.orgAdmin?.orgDetails._id;
    try {
      const data = await this.apiMainService.searchOutletByOrgId(
        this.searchObj
      );
      this.outletList = [...this.outletList, ...data];
      this.filteredOutletList = [...this.outletList];
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
    this.filteredOutletList[index].showFullDescription =
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
}

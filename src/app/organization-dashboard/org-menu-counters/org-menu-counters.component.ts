import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonSelectConfig } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface filter {
  orgId: string;
}

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommonOutletCafeSelectComponent } from "src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component";
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-org-menu-counters',
  templateUrl: './org-menu-counters.component.html',
  styleUrls: ['./org-menu-counters.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonOutletCafeSelectComponent,
    A11yModule
  ]
})
export class OrgMenuCountersComponent implements OnInit, OnChanges {
  @Input() adminOrg: any;
  outletList: any[] = [];
  filteredOutletList: any[] = [];
  searchObj: filter = {
    orgId: '',
  };
  headerConfig: CommonSelectConfig = {
    mode: 'cafeteria',
    showDateRange: false,
    disableOrg: true,
    requireAll: true
  }
  orgAdmin: any;
  imageUrl: any = environment.imageUrl;
  selectedOutlet: any = null;
  filteredMenuList: any[] = [];
  cafeteria_id: any;
  cafeList: any[] = [];
  filteredCafeList: any[] = [];
  orgDetails: any;
  outletOrderData: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) { }

  ngOnInit(): void {
    this.setInitials();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.setInitials();
    }
  }

  setInitials() {
    // if Admin is logged in
    if (this.adminOrg) {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.adminOrg._id,
      };
    }
    //if OrgAdmin is logged in
    this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (this.orgAdmin?.role === 'ORGADMIN') {
      this.headerConfig = {
        ...this.headerConfig,
        defaultOrgId: this.orgAdmin?.orgDetails?._id,
      };
    }
    this.getOrgDetailsById();
  }

  async getOrgDetailsById() {
    try {
      const res = await this.apiMainService.getOrg(this.orgAdmin?.orgDetails?._id)
      this.orgDetails = res;
      if (res?.cafeteriaList.length > 0) {
        this.cafeList = res?.cafeteriaList;
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

    if (this.filteredCafeList.length > 0) {
      this.filteredOutletList = this.filteredCafeList.find((item: any) => item?.cafeteria_id === this.cafeteria_id)?.outlets
      console.log(this.filteredOutletList, "filteredOutletList");
    }
  }

  async getOutlets() {
    const searchObj = {
      orgId: this.orgAdmin?.orgDetails?._id
    }
    try {
      const data = await this.apiMainService.searchOutletByOrgId(searchObj)
      this.outletList = [...data];
      this.getMatchedOutlets();
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  }

  showOutletDetails(outlet: any) {
    this.selectedOutlet = outlet;
    this.filteredMenuList = [...outlet.menuList];
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

  filterSubmitted(event: any) {
    this.cafeteria_id = event.cafeteria_id;
    this.getOutlets();
  }
}

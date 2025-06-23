import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface Filter {
  orgId: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerList: any[] = []
  filteredCustomerList: any[] = []
  filterObj: Filter = {
    orgId: '',
  };

  orglist: any[] = [];
  orgDetails: any = {};
  orgAdmin: any;
  isViewCustomer: boolean = false
  selectedUser: any

  constructor(private apiMainService: ApiMainService, private localStorageService: LocalStorageService, private searchService: SearchFilterService, private router: Router) { }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.getOrgList()
    this.getCustomerProfileList();
  }

  async getOrgList() {
    try {
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        { countOnly: false },
        1
      );
      this.orglist = data;
      this.setInitialData();
    } catch (error) {
      console.error(error);
    }
  }

  setInitialData() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails()
    }
  }

  setOrgDetails() {
    let orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });

  }

  searchFilter(e: any) {
    const searchText = e.target.value;
    const config = { keys: ['userName', 'phoneNo', 'email'] };
    this.filteredCustomerList = this.searchService.searchData(
      this.customerList,
      config,
      searchText
    );
  }

  submitFilter() {
    // console.log(this.filterObj)
    this.getCustomerProfileList();
  }

  async getCustomerProfileList() {
    try {
      const res = await this.apiMainService.getCustomerListByOrgId(this.filterObj)
      console.log(res);
      this.customerList = res;
      this.filteredCustomerList = this.customerList.length > 0 ? this.customerList : [];
    } catch (err: any) {
      console.log(err);
    }
  }

  viewCustomer(user: any) {
    // console.log(user);
    this.selectedUser = user
    this.isViewCustomer = true
  }

  backBtnPress() {
    this.isViewCustomer = false
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-search-organization',
  templateUrl: './search-organization.component.html',
  styleUrls: ['./search-organization.component.scss'],
})
export class SearchOrganizationComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 5;
  orgList: any = [];
  showSearchSection: boolean = true;
  showSearchFilter: boolean = true;
  selectedOrg: any = {};
  btnPolicy: any;
  searchControl = new FormControl('');
  originalOrgList: any // ma 

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchOrg();
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      this.applyLocalFilter(value);
    })
  }

  applyLocalFilter(value: any) {
    if (!value) {
      // restore full list
      this.orgList = [...this.originalOrgList];
      return;
    }
    const lower = value.toLowerCase();
    // filter from ORIGINAL data
    this.orgList = this.originalOrgList.filter((d: any) =>
      d.organization_name?.toLowerCase().includes(lower)
    );
  }


  async searchOrg(searchValue?: any) {
    try {
      const safeSearchValue = searchValue || {};
      const safePoc = safeSearchValue.poc_details || {};
      const searchObj: any = {
        organization_name: searchValue || '',
        location: safeSearchValue.location || '',
        poc_details: {
          poc_name: safePoc.poc_name || '',
          poc_phoneNo: safePoc.poc_phoneNo || '',
          poc_email: safePoc.poc_email || '',
          poc_location: safePoc.poc_location || ''
        }
      };
      const orgList = await this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj);
      if (orgList && orgList.length > 0) {
        this.orgList = orgList;
        this.originalOrgList = orgList;
      }
    } catch (error) {
      console.log(error);
    }
  }

  viewOrg(org: any) {
    this.selectedOrg = org;
    this.showSearchSection = false;
  }

  toggleShowOrder(val: any) {
    this.showSearchSection = true;
    this.selectedOrg = {};
  }

  paginationConfig(config: any) {
    this.pageIndex = config.pageIndex;
    this.pageSize = config.pageSize;
  }

  addOrg() {
    this.router.navigate(['/b2bAddorg'])
  }
}

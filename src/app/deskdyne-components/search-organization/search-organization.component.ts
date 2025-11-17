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
  searchForm!: FormGroup;
  pageIndex: number = 0;
  pageSize: number = 5;
  orgList: any = [];
  showSearchSection = true;
  showSearchFilter: boolean = true;
  selectedOrg: any;
  btnPolicy: any;
  searchControl = new FormControl('')

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.initializeForm();
    this.searchOrg(this.searchForm.value);
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchOrg(value);
    })
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      organization_name: [''],
      location: [''],
      poc_name: [''],
      poc_phoneNo: [''],
      poc_email: ['']

    })
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
      const orgList = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        searchObj,
      );
      if (orgList && orgList.length > 0) {
        this.orgList = orgList;
        console.log(this.orgList);
        
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
    this.showSearchSection = val;
  }

  paginationConfig(config: any) {
    this.pageIndex = config.pageIndex;
    this.pageSize = config.pageSize;
    // this.searchOrg(this.pageIndex, this.pageSize);
  }

  addOrg() {
    this.router.navigate(['/b2bAddorg'])
  }
}

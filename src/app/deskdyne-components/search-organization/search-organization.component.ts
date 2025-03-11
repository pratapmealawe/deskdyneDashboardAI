import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-search-organization',
  templateUrl: './search-organization.component.html',
  styleUrls: ['./search-organization.component.scss'],
})
export class SearchOrganizationComponent implements OnInit {
  searchObj: any = {
    organization_name: '',
    location: '',
    poc_details: {
      poc_name: '',
      poc_phoneNo: '',
      poc_email: '',
      poc_location: '',
    },
  };
  page: any = 0;
  orgList: any = [];
  showSearchSection = true;
  selectedOrg: any;
  btnPolicy: any;

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.searchOrg();
  }

  async searchOrg() {
    try {
      this.orgList = [];
      this.page = 1;
      const orgList = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        this.searchObj,
        this.page
      );
      if (orgList && orgList.length > 0) {
        this.orgList = orgList;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getOrgList() {}

  viewOrg(org: any) {
    this.selectedOrg = org;
    this.showSearchSection = false;
  }

  resetForm() {
    this.searchObj = {
      organization_name: '',
      location: '',
      poc_details: {
        poc_name: '',
        poc_phoneNo: '',
        poc_email: '',
        poc_location: '',
      },
    };
  }

  toggleShowOrder(val: any) {
    this.showSearchSection = val;
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orglist: any = [];
  orgSelected: any = null;
  isOrgSelected: boolean = false;
  isLoading: boolean = false;

  selectedIndex: number = 0;
  allTabs = [
    { index: 0, name: 'Dashboard', icon: 'dashboard', policyKey: 'Dashboard' },
    { index: 1, name: 'Admin Orders', icon: 'receipt_long', policyKey: 'dashBoardAdminOrder' },
    { index: 2, name: 'Menu Items', icon: 'menu_book', policyKey: 'menuItems' },
    { index: 3, name: 'Orders', icon: 'shopping_cart', policyKey: 'Orders' },
    { index: 4, name: 'Reviews', icon: 'rate_review', policyKey: 'Reviews' },
    { index: 5, name: 'Users', icon: 'people', policyKey: 'User' },
    { index: 6, name: 'Vendor Info', icon: 'store', policyKey: 'vendorInfo' },
    { index: 7, name: 'Menu Counters', icon: 'countertops', policyKey: 'menuCounters' },
    { index: 8, name: 'Audit Reports', icon: 'assessment', policyKey: 'auditReports' },
    { index: 9, name: 'Employee Poll', icon: 'poll', policyKey: 'empPoll' }
  ];

  tabs: any[] = [];
  tabPolicy: any;
  constructor(private apiMainService: ApiMainService, private router: Router, private ref: ChangeDetectorRef, private policyService: PolicyService) {
  }

  ngOnInit() {
    this.tabs = this.policyService.filterTabsByPolicy(this.allTabs);
    this.getorganizations();
  }

  onTabChange(index: number) {
    this.selectedIndex = index;
  }

  changeOrganization(e: any) {
    const id = e.value
    this.orgSelected = this.orglist.find((item: any) => item._id === id);
    this.isOrgSelected = true;
    if (this.tabs.length > 0) {
      this.selectedIndex = this.tabs[0].index; // Reset to first visible tab on org change
    }
  }


  async getorganizations() {
    try {
      this.isLoading = true;
      this.orglist = [];
      let page = 1;
      let searchObj = {
        countOnly: false
      }
      let result = await this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
      this.orglist = result;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error)
    }
  }
}


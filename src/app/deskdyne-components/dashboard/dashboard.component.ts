import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import * as Highcharts from 'highcharts';
import { Router } from "@angular/router";

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
  tabs = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Admin Orders', icon: 'receipt_long' },
    { name: 'Menu Items', icon: 'menu_book' },
    { name: 'Orders', icon: 'shopping_cart' },
    { name: 'Reviews', icon: 'rate_review' },
    { name: 'Users', icon: 'people' },
    { name: 'Vendor Info', icon: 'store' },
    { name: 'Menu Counters', icon: 'countertops' },
    { name: 'Audit Reports', icon: 'assessment' }
  ];

  constructor(private apiMainService: ApiMainService, private router: Router, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getorganizations();
  }

  onTabChange(index: number) {
    this.selectedIndex = index;
  }

  changeOrganization(e: any) {
    const id = e.value
    this.orgSelected = this.orglist.find((item: any) => item._id === id);
    this.isOrgSelected = true;
    this.selectedIndex = 0; // Reset to first tab on org change
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


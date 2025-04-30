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


  constructor(private apiMainService: ApiMainService, private router: Router, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getorganizations();
  }


  changeOrganization(e: any) {
    const id = e.value
    this.orgSelected = this.orglist.find((item: any) => item._id === id)
  }


  async getorganizations() {
    try {
      this.orglist = [];
      let page = 1;
      let searchObj = {
        countOnly: false
      }
      let result = await this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
      this.orglist = result;
    } catch (error) {
      console.log(error)
    }
  }
}


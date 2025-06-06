import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
})
export class OrgDetailsComponent implements OnInit {
  @Input() orgObj: any;
  btnPolicy: any;
  outltList: any[] = []
  filteredOutletList: any[] = []
  constructor(
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private policyService: PolicyService,
    private apiMainService: ApiMainService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    // console.log(this.orgObj);
    this.getOutlets()
  }

  async getOutlets() {
    const searchObj = {
      orgId: this.orgObj?._id
    }
    try {
      const res = await this.apiMainService.searchOutletByOrgId(searchObj)
      // console.log(res);
      this.outltList = res
      this.getMatchedOutlets()
    } catch (err: any) {
      console.log(err);
    }
  }

  async getMatchedOutlets() {
    const merged = this.orgObj?.cafeteriaList.map((cafe: any) => ({
      ...cafe,
      outlets: this.outltList.filter(o => o.cafeteriaDetails.cafeteria_name === cafe.cafeteria_name)
    }));

    this.filteredOutletList = merged
    console.log(merged);
  }

  editOrg() {
    this.runtimeStorageService.setCacheData('VIEW_ORG', this.orgObj);
    this.router.navigate(['b2bAddorg']);
  }
}

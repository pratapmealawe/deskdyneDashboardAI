import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
})
export class OutletComponent implements OnInit {
  showSearchSection: boolean = true;
  filteredOutletList: any;
  searchObj: any = {
    outletName: '',
    emailID: '',
    phoneNo: '',
  };
  page: any = 0;
  outletList: any = [];
  selectedOutlet: any;
  btnPolicy: any;

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private runtimeStorageService: RuntimeStorageService,
    private sendDataToComponent: SendDataToComponent
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.searchOutlet();
  }

  async searchOutlet() {
    try {
      this.outletList = await this.apiMainService.searchOutlet(this.searchObj);
      console.log(this.outletList);

      if (this.outletList.length > 0) {
        const orgMap = new Map<string, {
          organizationId: string;
          organizationName: string;
          outletList: any[];
        }>();

        for (const outlet of this.outletList) {
          const orgId = outlet?.organizationDetails?.organizationId || "No Organization";
          const orgName = outlet?.organizationDetails?.organization_name || "No Organization";

          if (!orgMap.has(orgId)) {
            orgMap.set(orgId, {
              organizationId: orgId,
              organizationName: orgName,
              outletList: []
            });
          }

          orgMap.get(orgId)!.outletList.push(outlet);
        }

        this.filteredOutletList = Array.from(orgMap.values());

        console.log(this.filteredOutletList);
      }
      console.log(this.outletList);

    } catch (error) {
      console.log('seachOutlet', error);
    }
  }

  resetForm() {
    this.searchObj = {
      outletName: '',
      emailID: '',
      phoneNo: '',
    };
  }

  viewOutlet(val: any) {
    this.selectedOutlet = val;
    if (this.selectedOutlet) {
      this.showSearchSection = false;
    }
  }

  addOutlet() {
    this.runtimeStorageService.setCacheData('OUTLET_EDIT', {});
    this.router.navigate(['/addOutlet']);
  }

  toggleShowOrder(val: any) {
    this.showSearchSection = val;
    if (val.val) {
      this.showSearchSection = val.val;
    } else {
      this.showSearchSection = val;
    }
    if (val.updateval) {
      this.searchOutlet();
    }
  }
}

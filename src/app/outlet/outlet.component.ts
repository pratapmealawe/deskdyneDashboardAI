import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
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
  searchControl = new FormControl();
  pagedOutLet: any[] = []

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private runtimeStorageService: RuntimeStorageService,
    private sendDataToComponent: SendDataToComponent,
    private searchService: SearchFilterService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.searchOutlet();
    this.searchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(value => { this.applyFilter(value) })
  }

  applyFilter(value: string) {
    const v = (value || '').trim().toLowerCase();
    if (!v) {
      this.pagedOutLet = [...this.filteredOutletList];
    } else {
      this.pagedOutLet = this.filteredOutletList
        .map((org: any) => {
          // Check if organization name matches
          const orgMatches = org.organizationName?.toLowerCase().includes(v);
          // Filter outlets that match the search term
          const matchingOutlets = org.outletList?.filter((outlet: any) =>
            outlet.outletName?.toLowerCase().includes(v)
          ) || [];

          if (orgMatches) {
            // If org matches, return all outlets
            return { ...org };
          } else if (matchingOutlets.length > 0) {
            // If outlets match, return org with only matching outlets
            return { ...org, outletList: matchingOutlets };
          }
          return null;
        })
        .filter((org: any) => org !== null);
    }
    console.log(this.pagedOutLet, "update value ");
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
        this.pagedOutLet = this.filteredOutletList
      }
    } catch (error) {
      console.log('seachOutlet', error);
    }
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

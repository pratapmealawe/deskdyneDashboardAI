import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss']
})
export class SearchEventComponent {
  showSearchSection: boolean = true;
  filteredEventList: any;
  page: any = 0;
  eventList: any = [];
  selectedEvent: any;
  btnPolicy: any;
  searchControl = new FormControl();
  pagedEvent: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private runtimeStorageService: RuntimeStorageService,
    private searchService: SearchFilterService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.searchEvent();
    this.searchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(value => { this.applyFilter(value) })
  }

  applyFilter(value: string) {
    const config = { keys: ['organizationName'] };
    const v = (value || '').trim();
    this.pagedEvent = v
      ? [...this.searchService.searchData(this.filteredEventList, config, v)]
      : [...this.filteredEventList];
  }

  async searchEvent() {
    try {
      this.eventList = await this.apiMainService.getPopupOutlets();
      if (this.eventList.length > 0) {
        const orgMap = new Map<string, {
          organizationId: string;
          organizationName: string;
          outletList: any[];
        }>();

        for (const event of this.eventList) {
          const orgId = event?.organizationDetails?.organizationId || "No Organization";
          const orgName = event?.organizationDetails?.organization_name || "No Organization";

          if (!orgMap.has(orgId)) {
            orgMap.set(orgId, {
              organizationId: orgId,
              organizationName: orgName,
              outletList: []
            });
          }

          orgMap.get(orgId)!.outletList.push(event);
        }

        this.filteredEventList = Array.from(orgMap.values());
        this.pagedEvent = this.filteredEventList
      }
    } catch (error) {
      console.log('seachEvent', error);
    }
  }

  viewEvent(val: any) {
    this.selectedEvent = val;
    if (this.selectedEvent) {
      this.showSearchSection = false;
    }
  }

  getEvents() {
    this.searchEvent();
  }

  addEvent() {
    this.runtimeStorageService.setCacheData('EVENTPOPUP_EDIT', {});
    this.router.navigate(['/addEventPopup']);
  }

  toggleShowOrder(val: any) {
    this.showSearchSection = val;
    if (val.val) {
      this.showSearchSection = val.val;
    } else {
      this.showSearchSection = val;
    }
    if (val.updateval) {
      this.searchEvent();
    }
  }
}

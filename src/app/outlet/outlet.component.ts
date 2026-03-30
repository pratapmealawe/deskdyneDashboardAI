import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { DeletedOutletsDialogComponent } from './deleted-outlets-dialog/deleted-outlets-dialog.component';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
})
export class OutletComponent implements OnInit {
  showSearchSection: boolean = true;
  filteredOutletList: any;
  page: any = 0;
  outletList: any = [];
  selectedOutlet: any;
  searchControl = new FormControl();
  pagedOutLet: any[] = []

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private sendDataToComponent: SendDataToComponent,
    private searchService: SearchFilterService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
          const orgMatches = org.organizationName?.toLowerCase().includes(v);
          const matchingOutlets = org.outletList?.filter((outlet: any) =>
            outlet.outletName?.toLowerCase().includes(v)
          ) || [];

          if (orgMatches) {
            return { ...org };
          } else if (matchingOutlets.length > 0) {
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
      this.outletList = await this.apiMainService.searchOutlet({});
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

  openDeletedOutletsDialog() {
    this.dialog.open(DeletedOutletsDialogComponent, {
      width: '850px',
      maxHeight: '85vh',
      panelClass: 'deleted-outlets-dialog-container'
    });
  }

  onOutletDeleted() {
    this.searchOutlet();
  }
}

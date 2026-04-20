import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';
import { SearchFilterService } from '@service/search-filter.service';
import { SendDataToComponent } from '@service/sendDataToComponent.service';
import { DeletedOutletsDialogComponent } from './deleted-outlets-dialog/deleted-outlets-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletCardComponent } from './outlet-card/outlet-card.component';
import { OutletViewComponent } from './outlet-view/outlet-view.component';
import { DirectivesModule } from 'src/shared/directives/common-directives.directives.modules';
import { AddOutletComponent } from './add-outlet/add-outlet.component';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OutletCardComponent,
    OutletViewComponent,
    DeletedOutletsDialogComponent,
    DirectivesModule
  ]
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
  }

  async searchOutlet() {
    try {
      this.outletList = await this.apiMainService.searchOutlet({});

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
    }
  }

  viewOutlet(val: any) {
    this.selectedOutlet = val;
    if (this.selectedOutlet) {
      this.showSearchSection = false;
    }
  }

  addOutlet() {
    const dialogRef = this.dialog.open(AddOutletComponent, {
      width: '90vw',
      maxWidth: '90vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchOutlet();
      }
    });
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

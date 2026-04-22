import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';
import { SearchFilterService } from '@service/search-filter.service';
import { SendDataToComponent } from '@service/sendDataToComponent.service';
import { DeletedOutletsDialogComponent } from './deleted-outlets-dialog/deleted-outlets-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletCardComponent } from './outlet-card/outlet-card.component';
import { RouterModule } from '@angular/router';
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
    DirectivesModule,
    RouterModule
  ]
})
export class OutletComponent implements OnInit {
  outletList: any[] = [];
  filteredOutletList: any[] = [];
  pagedOutLet: any[] = [];
  searchControl = new FormControl('');
  showSearchSection: boolean = true;
  isListingView: boolean = true;

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkRoute();

    // Subscribe to router events to toggle view
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });

    this.searchOutlet();
    this.applyFilter(this.searchControl.value ?? '');
    this.searchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(value => { this.applyFilter(value ?? '') })
  }

  checkRoute() {
    const baseUrl = this.router.url.split('?')[0].split('#')[0];
    const urlParts = baseUrl.split('/').filter(p => p);
    // /app/outlet is 2 parts
    this.isListingView = urlParts.length === 2 && urlParts[1] === 'outlet';
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
    if (val) {
      this.router.navigate(['/app/outlet', val._id]);
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

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEventPopComponent } from './add-event-pop/add-event-pop.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { EventPopCardComponent } from './event-pop-card/event-pop-card.component';
import { EventPopViewComponent } from './event-pop-view/event-pop-view.component';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EventPopCardComponent,
    EventPopViewComponent
  ]
})
export class EventPopupComponent implements OnInit {
  showSearchSection: boolean = true;
  filteredEventList: any;
  page: any = 0;
  eventList: any = [];
  selectedEvent: any;
  searchControl = new FormControl();
  pagedEvent: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    private searchService: SearchFilterService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.searchEvent();
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => { 
      this.applyFilter(value);
    });
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
      const res = await this.apiMainService.getEventPopups();
      this.eventList = res || [];
      
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
        this.pagedEvent = this.filteredEventList;
      } else {
        this.filteredEventList = [];
        this.pagedEvent = [];
      }
    } catch (error) {
      console.log('searchEvent', error);
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
    const dialogRef = this.dialog.open(AddEventPopComponent, {
      width: '95vw',
      maxWidth: '95vw',
      panelClass: 'modern-dialog',
      data: { eventObj: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchEvent();
      }
    });
  }

  toggleShowOrder(val: any) {
    if (val && typeof val === 'object' && 'val' in val) {
      this.showSearchSection = val.val;
    } else {
      this.showSearchSection = !!val;
    }
    
    if (val && val.updateval) {
      this.searchEvent();
    }
  }
}


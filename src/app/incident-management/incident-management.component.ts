import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { ChangeStatusIncidentComponent } from './change-status-incident/change-status-incident.component';
import { CommonSelectConfig } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { LocalStorageService } from '@service/local-storage.service';
import { SearchFilterService } from '@service/search-filter.service';

export interface SubmittedByInfo {
  name: string;
  id: string;
}

export interface CafeteriaDetails {
  cafeteria_id: string;
  cafeName?: string;
}

export interface outletDetails {
  outletId: string;
  outletName?: string;
}

export interface OrgDetails {
  orgName?: string;
  orgId: string;
}

export interface HistoryEntry {
  changedByInfo: SubmittedByInfo;
  prevStatus?: 'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved';
  changedToStatus:
  | 'created'
  | 'acknowledged'
  | 'inReview'
  | 'blocked'
  | 'resolved';
  changedAt?: Date;
  remark?: string;
}

export interface IncidentManagement {
  _id?: string;
  incidentType: string;
  incidentSubject: string;
  incidentDescription: string;
  submittedByInfo: SubmittedByInfo;
  cafeteriaDetails: CafeteriaDetails;
  orgDetails: OrgDetails;
  history: HistoryEntry[];
  status: 'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved';
  remark?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommonOutletCafeSelectComponent } from 'src/app/common-components/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-incident-management',
  templateUrl: './incident-management.component.html',
  styleUrls: ['./incident-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonOutletCafeSelectComponent,
    NgbModule
  ]
})
export class IncidentManagementComponent implements OnInit {
  @ViewChild('delete') delete: any;

  showAddPage = false;
  isEdit = false;
  adminProfile: any;

  incidentList: IncidentManagement[] = [];
  filteredIncidentList: IncidentManagement[] = [];
  pagedIncidentList: IncidentManagement[] = [];

  pageSize = 10;
  pageIndex = 0;

  searchText = '';
  isFilterApplied = false;

  filterObj: any

  incidentObj = {} as IncidentManagement;
  incidentForm!: FormGroup;
  isSubmitting = false;
  deleteIncidentObj: any;
  statusList: Array<
    'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved'
  > = ['created', 'acknowledged', 'inReview', 'blocked', 'resolved'];
  adminList: any[] = [];
  showSiteUser = false;
  assignedToInfo: SubmittedByInfo = { id: '', name: '' };
  nextStatus!: 'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved';
  modalRef!: NgbModalRef;

  // Modern UI Props
  incidentCounts: { status: string; count: number; label: string; icon: string; class: string }[] = [];
  filterStatus: string = '';
  activeFilterCount: number = 0;
  isLoading: boolean = false;

  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: false,
    requireAll: true,
  };

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
    private confirmationModalService: ConfirmationModalService,
    private modalService: NgbModal,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.adminProfile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.initIncidentForm();
  }

  initIncidentForm() {
    this.incidentForm = this.fb.group({
      incidentType: ['', Validators.required],
      incidentSubject: ['', Validators.required],
      incidentDescription: ['', Validators.required],
      remark: [''],
      assignedToInfo: this.fb.group({
        id: [''],
        name: [''],
      }),
      status: [
        {
          value: this.isEdit ? this.incidentObj.status : this.statusList[0],
          disabled: true,
        },
        Validators.required,
      ],
      cafeteriaDetails: this.fb.group({
        cafeteria_id: [
          {
            value: this.isEdit
              ? this.incidentObj.cafeteriaDetails?.cafeteria_id
              : '',
            disabled: this.isEdit,
          },
          Validators.required,
        ],
        cafeName: [''],
      }),
      orgDetails: this.fb.group({
        orgName: [''],
        orgId: [
          {
            value: this.isEdit ? this.incidentObj.orgDetails?.orgId : '',
            disabled: true,
          },
          Validators.required,
        ],
      }),
    });
  }

  filterSubmitted(event: any) {
    this.filterObj = event;
    this.isFilterApplied = true;
    this.pageIndex = 0;
    this.filterStatus = ''; // Reset status filter on new date/org selection
    this.getIncidentListByFilter();
  }

  async getIncidentListByFilter() {
    this.isLoading = true;
    this.incidentList = [];
    this.filteredIncidentList = [];
    this.pagedIncidentList = [];

    try {
      const data = await this.apiMainService.getIncidentsByDateAndFilters(this.filterObj);
      this.incidentList = data?.incidents || [];
      this.computeTotals();
      this.applyLocalFilters();
    } catch (err) {
      console.error('Error fetching incidents:', err);
    } finally {
      this.isLoading = false;
    }
  }

  computeTotals() {
    const counts: Record<string, number> = {
      all: this.incidentList.length,
      created: 0,
      acknowledged: 0,
      inReview: 0,
      resolved: 0,
      blocked: 0
    };

    this.incidentList.forEach(i => {
      if (counts[i.status] !== undefined) {
        counts[i.status]++;
      }
    });

    this.incidentCounts = [
      { status: '', count: counts['all'], label: 'All Incidents', icon: 'list_alt', class: 'primary' },
      { status: 'created', count: counts['created'], label: 'New', icon: 'add_alert', class: 'info' },
      { status: 'acknowledged', count: counts['acknowledged'], label: 'Acknowledged', icon: 'visibility', class: 'warning' },
      { status: 'inReview', count: counts['inReview'], label: 'In Review', icon: 'sync', class: 'ready' },
      { status: 'resolved', count: counts['resolved'], label: 'Resolved', icon: 'check_circle', class: 'success' },
      { status: 'blocked', count: counts['blocked'], label: 'Blocked', icon: 'block', class: 'error' }
    ];
  }

  setPagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedIncidentList = this.filteredIncidentList.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPagedData();
  }

  onFilterStatus(status: string) {
    this.filterStatus = this.filterStatus === status ? '' : status;
    this.applyLocalFilters();
  }

  applyLocalFilters() {
    let list = [...this.incidentList];

    // Status Filter
    if (this.filterStatus) {
      list = list.filter(i => i.status === this.filterStatus);
    }

    // Search Filter
    if (this.searchText) {
      const config = { keys: ['incidentType', 'incidentSubject', 'incidentDescription'] };
      list = this.searchService.searchData(list, config, this.searchText);
    }

    this.filteredIncidentList = list;
    this.activeFilterCount = (this.filterStatus ? 1 : 0);
    this.pageIndex = 0;
    this.setPagedData();
  }

  searchFilter(e: any) {
    this.searchText = e.target.value?.trim() || '';
    this.applyLocalFilters();
  }

  clearSearch() {
    this.searchText = '';
    this.applyLocalFilters();
  }

  async getSiteExeUsers(incident: IncidentManagement) {
    try {
      this.adminList = await this.apiMainService.searchSiteExecutive({
        orgId: incident.orgDetails.orgId,
        cafeteria_name: (incident.cafeteriaDetails as any).cafeteria_name,
      });
    } catch (e) {
    }
  }

  openChangeStatus(incident: IncidentManagement, status: any) {
    const dialogRef = this.dialog.open(ChangeStatusIncidentComponent, {
      width: '500px',
      data: {
        incident: incident,
        nextStatus: status,
        adminList: this.adminList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getIncidentListByFilter();
      }
    });
  }

  // Obsolete add/edit dialog methods removed. Status change now handled by ChangeStatusIncidentComponent.

  async deleteIncident(incident: IncidentManagement) {
    this.deleteIncidentObj = incident;
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to delete Incident ${incident.incidentSubject}?`,
      callback: this.deleteIncidentApi,
      context: this
    });
  }

  async deleteIncidentApi() {
    try {
      await this.apiMainService.deleteIncident(this.deleteIncidentObj._id);
      this.getIncidentListByFilter();
    } catch (err: any) {
    }
  }

  clear() {
    this.isEdit = false;
    this.incidentForm.reset();
    this.incidentObj = {} as IncidentManagement;
    this.getIncidentListByFilter();
  }

  backBtn() {
    this.clear();
    this.showAddPage = false;
  }
}

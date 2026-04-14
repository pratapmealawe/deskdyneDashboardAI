import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { AddIncidentDialogComponent } from './add-incident-dialog/add-incident-dialog.component';
import { CommonSelectConfig } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.component';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

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
import { CommonOutletCafeSelectModule } from 'src/app/common-outlet-cafe-select/common-outlet-cafe-select.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-org-incident-management',
  templateUrl: './org-incident-management.component.html',
  styleUrls: ['./org-incident-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonOutletCafeSelectModule,
    NgbModule
  ]
})
export class OrgIncidentManagementComponent implements OnInit {
  @ViewChild('delete') delete: any;
  @ViewChild('statusChangeDiv') statusChangeDiv: any;

  showAddPage = false;
  isEdit = false;
  orgAdmin: any;

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
  orgDetailsForm: any;
  adminList: any[] = [];
  showSiteUser = false;
  assignedToInfo!: SubmittedByInfo;
  nextStatus!: 'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved';
  modalRef!: NgbModalRef;

  incidentFiles: File[] = [];

  headerConfig: CommonSelectConfig = {
    mode: 'outlet',
    showDateRange: true,
    disableOrg: true,
    requireAll: true,
    defaultOrgId: '', // will set in ngOnInit
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
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');

    if (this.orgAdmin?.orgDetails?._id) {
      this.headerConfig.defaultOrgId = this.orgAdmin.orgDetails._id;
    }

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
            value:
              this.orgAdmin?.role === 'ORGADMIN'
                ? this.orgAdmin?.orgDetails?._id
                : this.isEdit
                  ? this.incidentObj.orgDetails?.orgId
                  : '',
            disabled: true,
          },
          Validators.required,
        ],
      }),
    });
  }

  // ---------------------------------------------------------------------------
  // FILTER + LIST
  // ---------------------------------------------------------------------------

  filterSubmitted(event: any) {
    this.filterObj = event;
    this.isFilterApplied = true;

    // whenever filter is submitted, refresh list
    this.pageIndex = 0;
    this.getIncidentListByFilter();
  }

  setInitialData() {
    if (this.orgAdmin?.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
    }
  }

  async getIncidentListByFilter() {
    this.incidentList = [];
    this.filteredIncidentList = [];
    this.pagedIncidentList = [];

    try {
      const data = await this.apiMainService.getIncidentsByDateAndFilters(
        this.filterObj
      );

      this.incidentList = data?.incidents || [];
      this.filteredIncidentList = [...this.incidentList];

      this.pageIndex = 0;
      this.setPagedData();
    } catch (err) {
      console.error('Error fetching incidents:', err);
    }
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

  // ---------------------------------------------------------------------------
  // SEARCH
  // ---------------------------------------------------------------------------

  searchFilter(e: any) {
    this.searchText = e.target.value?.trim() || '';

    const config = { keys: ['incidentType', 'incidentSubject'] };
    this.filteredIncidentList = this.searchService.searchData(
      this.incidentList,
      config,
      this.searchText
    );

    this.pageIndex = 0;
    this.setPagedData();
  }

  clearSearch() {
    this.searchText = '';
    const fakeEvent = { target: { value: '' } };
    this.searchFilter(fakeEvent);
  }

  // ---------------------------------------------------------------------------
  // SITE EXEC USERS + STATUS CHANGE
  // ---------------------------------------------------------------------------

  async getSiteExeUsers(incident: IncidentManagement) {
    try {
      this.adminList = await this.apiMainService.searchSiteExecutive({
        orgId: incident.orgDetails.orgId,
        cafeteria_name: (incident.cafeteriaDetails as any).cafeteria_name,
      });
    } catch (e) {
      console.log('error while searching admin profile', e);
    }
  }

  changeStatus() {
    const formValue = this.incidentForm.getRawValue() as IncidentManagement;

    if (this.orgAdmin?.role === 'ADMIN' && formValue.status === 'acknowledged') {
      this.showSiteUser = true;
    } else {
      this.showSiteUser = false;
    }
  }

  async updateIncidentStatus() {
    this.isSubmitting = true;

    const formValue = this.incidentForm.getRawValue() as IncidentManagement;

    const assignedToInfo: SubmittedByInfo = {
      id:
        this.orgAdmin?.role === 'ADMIN'
          ? this.assignedToInfo.id
          : this.orgAdmin._id,
      name:
        this.orgAdmin?.role === 'ADMIN'
          ? this.adminList.find(
            (item: any) => item._id === this.assignedToInfo.id
          )?.name
          : this.orgAdmin.name,
    };

    const updatedBy: SubmittedByInfo = {
      id: this.orgAdmin._id,
      name: this.orgAdmin.name,
    };

    let history: HistoryEntry[] = [
      ...(this.incidentObj.history || []),
      {
        prevStatus: this.incidentObj.status,
        changedByInfo: updatedBy,
        changedToStatus: this.nextStatus,
        remark: this.incidentObj.remark,
      },
    ];

    let status = this.nextStatus;

    if (this.nextStatus === 'acknowledged') {
      status = 'inReview';
      history.push({
        prevStatus: 'acknowledged',
        changedByInfo: updatedBy,
        changedToStatus: 'inReview',
        remark: 'Auto transition to inReview',
      });
    }

    const dataObj: any = {
      _id: this.incidentObj._id,
      status,
      history,
      assignedToInfo,
      remark: history.at(-1)?.remark,
    };

    // If you want to send files:
    // const formData = new FormData();
    // formData.append('data', JSON.stringify(dataObj));
    // this.incidentFiles.forEach(f => formData.append('files', f));
    // await this.apiMainService.updateIncidentWithFiles(formData);

    try {
      await this.apiMainService.updateIncident(dataObj);
      this.modalRef.close();
      this.getIncidentListByFilter();
    } catch (error) {
      console.error('Error updating incident:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  // ---------------------------------------------------------------------------
  // CREATE / EDIT INCIDENT
  // ---------------------------------------------------------------------------

  async saveIncident() {
    if (this.incidentForm.invalid) return;

    this.isSubmitting = true;
    const formValue = this.incidentForm.getRawValue() as IncidentManagement;

    // const selectedOrg = this.orglist.find(
    //   (item: any) => item._id === formValue.orgDetails.orgId
    // );
    // formValue.orgDetails.orgName = selectedOrg?.organization_name;

    // formValue.cafeteriaDetails.cafeName =
    //   selectedOrg?.cafeteriaList.find(
    //     (item: any) =>
    //       item.cafeteria_id === formValue.cafeteriaDetails.cafeteria_id
    //   )?.cafeteria_name;

    formValue.submittedByInfo = {
      name: this.orgAdmin?.name,
      id: this.orgAdmin?._id,
    };

    formValue.status = formValue.status;
    formValue.history = [
      {
        changedByInfo: formValue.submittedByInfo,
        changedToStatus: formValue.status,
        remark: formValue.remark,
      },
    ];

    try {
      await this.apiMainService.createIncident(formValue);
      this.backBtn();
    } catch (error) {
      console.error('Error adding incident:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  async updateIncident(isStatusChange: boolean = false) {
    if (this.incidentForm.invalid) return;
    this.isSubmitting = true;

    const formValue = this.incidentForm.getRawValue() as IncidentManagement;

    formValue.cafeteriaDetails = this.incidentObj.cafeteriaDetails;
    formValue.orgDetails = this.incidentObj.orgDetails;
    formValue.history = this.incidentObj.history;
    formValue._id = this.incidentObj._id;

    try {
      await this.apiMainService.updateIncident(formValue);
      this.backBtn();
    } catch (error) {
      console.error('Error updating incident:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  addIncident() {
    this.openAddIncidentDialog('create');
  }

  editIncident(incident: IncidentManagement) {
    this.openAddIncidentDialog('edit', incident);
  }

  openAddIncidentDialog(mode: 'create' | 'edit', incident?: IncidentManagement) {
    const dialogRef = this.dialog.open(AddIncidentDialogComponent, {
      width: '600px',
      data: {
        mode,
        incident,
        filterObj: this.filterObj,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getIncidentListByFilter();
      }
    });
  }

  openChangeStatus(
    incident: IncidentManagement,
    status: 'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved'
  ) {
    this.incidentObj = incident;
    this.nextStatus = status;
    this.getSiteExeUsers(incident);

    this.incidentFiles = [];

    this.initIncidentForm();
    this.modalRef = this.modalService.open(this.statusChangeDiv);
    this.modalRef.result.then(
      (result: any) => {
        console.log(result);
      },
      () => {
        console.log('Model Dismissed');
      }
    );
  }

  // ---------------------------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------------------------

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
      console.log(err);
    }
  }

  // ---------------------------------------------------------------------------
  // RESET / BACK
  // ---------------------------------------------------------------------------

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

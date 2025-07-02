import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface Filter {
  orgId: string;
  cafeteria_id: string;
  vendorId: string;
  fromDate: string;
  toDate: string;
}

export interface SubmittedByInfo {
  name: string;
  id: string;
}

export interface CafeteriaDetails {
  cafeId: string;
  cafeteria_id: string;
  cafeName?: string;
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
  assignedToInfo: SubmittedByInfo;
  cafeteriaDetails: CafeteriaDetails;
  orgDetails: OrgDetails;
  history: HistoryEntry[];
  status: 'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved';
  remark?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-org-incident-management',
  templateUrl: './org-incident-management.component.html',
  styleUrls: ['./org-incident-management.component.scss'],
})
export class OrgIncidentManagementComponent implements OnInit {
  @ViewChild('delete') delete: any;
  @ViewChild('statusChangeDiv') statusChangeDiv: any;

  showAddPage: boolean = false;
  isEdit: boolean = false;
  orgAdmin: any;
  incidentList: IncidentManagement[] = [];
  filteredIncidentList: IncidentManagement[] = [];
  filterObj: Filter = {
    orgId: '',
    cafeteria_id: '',
    vendorId: '',
    fromDate: '',
    toDate: '',
  };
  incidentObj = <IncidentManagement>{};
  orglist: any[] = [];
  orgDetails: any = {};
  orgDetailsForm: any = {};
  incidentForm!: FormGroup;
  isSubmitting: boolean = false; // Prevent multiple submissions
  btnPolicy: any;
  deleteIncidentObj: any;
  statusList = ['created', 'acknowledged', 'inReview', 'blocked', 'resolved'];
  cafeList: any[] = [];
  adminList: any[] = [];
  showSiteUser: boolean = false;
  assignedToInfo!: SubmittedByInfo;
  nextStatus!: 'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved';
  modalRef!: NgbModalRef;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService,
    private policyService: PolicyService,
    private confirmationModalService: ConfirmationModalService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();

    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');

    this.initIncidentForm();
    this.getOrgList();
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
            value: this.isEdit ? this.incidentObj.cafeteriaDetails.cafeteria_id : '',
            disabled: this.isEdit ? true : false,
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
              this.orgAdmin.role === 'ORGADMIN'
                ? this.orgAdmin?.orgDetails?._id
                : this.isEdit
                  ? this.incidentObj.orgDetails.orgId
                  : '',
            disabled: true,
          },
          Validators.required,
        ],
      }),
    });
  }

  async getSiteExeUsers(incident: any) {
    try {
      this.adminList = await this.apiMainService.searchSiteExecutive({
        orgId: incident.orgDetails.orgId,
        cafeteria_name: incident.cafeteriaDetails.cafeteria_name,
      });

      if (this.orgAdmin.role === 'SITEEXE') {
        this.assignedToInfo = {
          id: this.orgAdmin._id,
          name: this.orgAdmin.name,
        };
      }
    } catch (e) {
      console.log('error while searching admin profile');
    }
  }

  changeStatus() {
    const formValue = this.incidentForm.getRawValue() as IncidentManagement;

    if (this.orgAdmin.role === 'ADMIN' && formValue.status === 'acknowledged') {
      this.showSiteUser = true;
    } else {
      this.showSiteUser = false;
    }
  }

  async saveIncident() {
    if (this.incidentForm.invalid) return;
    this.isSubmitting = true;
    const formValue = this.incidentForm.getRawValue() as IncidentManagement;
    let selectedOrg = this.orglist.find(
      (item: any) => item._id === formValue.orgDetails.orgId
    );
    formValue.orgDetails.orgName = selectedOrg?.organization_name;
    formValue.cafeteriaDetails.cafeName = selectedOrg.cafeteriaList.find(
      (item: any) => item.cafeteria_id === formValue.cafeteriaDetails.cafeteria_id
    )?.cafeteria_name;
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

    formValue.assignedToInfo = formValue.submittedByInfo;

    console.log(formValue);

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

    formValue.assignedToInfo = this.incidentObj.assignedToInfo;
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

  async updateIncidentStatus() {
    this.isSubmitting = true;
    const formValue = this.incidentForm.getRawValue() as IncidentManagement;

    let assignedToInfo: SubmittedByInfo = {
      id:
        this.orgAdmin.role === 'ADMIN'
          ? this.assignedToInfo.id
          : this.orgAdmin._id,
      name:
        this.orgAdmin.role === 'ADMIN'
          ? this.adminList.find(
            (item: any) => item._id === this.assignedToInfo.id
          )?.name
          : this.orgAdmin.name,
    };

    let updatedBy: SubmittedByInfo = {
      id: this.orgAdmin._id,
      name: this.orgAdmin.name,
    };

    let history = [
      ...this.incidentObj.history,
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

    let dataObj = {
      _id: this.incidentObj._id,
      status,
      history,
      assignedToInfo,
      remark: history.at(-1)?.remark,
    };

    console.log(dataObj);

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

  async getOrgList() {
    try {
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        { countOnly: false },
        1
      );
      this.orglist = data;
      this.setInitialData();
    } catch (error) {
      console.error(error);
    }
  }

  setInitialData() {
    console.log(this.orgAdmin);
    
    if (this.orgAdmin.role === 'ORGADMIN' ) {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails();
      this.formOrgChange();
    }

    if (this.orgAdmin.role === 'SITEEXE') {
      this.orglist = this.orglist.filter((item: any) =>
        this.orgAdmin?.siteExecutiveDetails?.orgDetails.some(
          (a: any) => a._id === item._id
        )
      );
    }
  }

  setOrgDetails() {
    let orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });

    if (this.orgAdmin.role === 'SITEEXE') {
      this.cafeList = orgDetails?.cafeteriaList.filter((item: any) =>
        this.orgAdmin?.siteExecutiveDetails?.cafeDetails.some(
          (a: any) => a.cafeteria_id === item.cafeteria_id
        )
      );
    } else {
      this.cafeList = orgDetails.cafeteriaList;
    }
    this.filterObj.cafeteria_id = '';
    this.getIncidentListByFilter();
  }

  formOrgChange() {
    this.orgDetailsForm = this.orglist.find(
      (org) => org._id === this.incidentForm.get('orgDetails.orgId')?.value
    );
  }

  async getIncidentListByFilter() {
    this.incidentList = [];
    this.filteredIncidentList = [];

    console.log(this.filterObj);
    
    try {
      let data = await this.apiMainService.getIncidentsByDateAndFilters(
        this.filterObj
      );

      this.incidentList = data?.incidents;
      this.filteredIncidentList =
        this.incidentList.length > 0 ? this.incidentList : [];
    } catch (err) {
      console.error('Error fetching incidents:', err);
    }
  }

  addIncident() {
    this.showAddPage = true;
    this.isEdit = false;
    this.initIncidentForm();
  }

  editIncident(incident: any) {
    this.incidentObj = incident;
    this.isEdit = true;
    this.showAddPage = true;
    this.initIncidentForm();
  }

  openChangeStatus(
    incident: IncidentManagement,
    status: 'created' | 'acknowledged' | 'inReview' | 'blocked' | 'resolved'
  ) {
    this.incidentObj = incident;
    this.nextStatus = status;
    this.getSiteExeUsers(incident);
    this.assignedToInfo = incident.assignedToInfo;

    this.initIncidentForm();
    this.modalRef = this.modalService.open(this.statusChangeDiv);
    this.modalRef.result.then(
      (result: any) => {
        console.log(result);
      },
      (reason: any) => {
        console.log(`Model Dismissed`);
      }
    );
  }

  async deleteIncident(incident: any) {
    this.deleteIncidentObj = incident;
    this.confirmationModalService.modal(
      `Are you sure, you want to delete Incident ${incident.incidentSubject}`,
      this.deleteIncidentApi,
      this
    );
  }

  async deleteIncidentApi() {
    try {
      const res = this.apiMainService.deleteIncident(
        this.deleteIncidentObj._id
      );

      this.getIncidentListByFilter();
    } catch (err: any) {
      console.log(err);
    }
  }

  searchFilter(e: any) {
    const searchText = e.target.value;
    const config = { keys: ['incidentType', 'incidentSubject'] };
    this.filteredIncidentList = this.searchService.searchData(
      this.incidentList,
      config,
      searchText
    );
  }

  clear() {
    this.isEdit = false;
    this.incidentForm.reset();
    this.incidentObj = <IncidentManagement>{};
    this.getIncidentListByFilter();
  }

  backBtn() {
    this.clear();
    this.showAddPage = false;
  }
}

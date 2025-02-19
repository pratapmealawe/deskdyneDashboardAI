import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

interface Filter {
  orgId: string;
  cafeId: string;
  vendorId: string;
  fromDate: string;
  toDate: string;
}

export interface IncidentManagement {
  incidentType: string;
  incidentSubject: string;
  incidentDescription: string;
  submittedByInfo: {
    name: string;
    id?: string;
  };
  cafeteriaDetails: {
    cafeId: string;
    cafeName: string;
  };
  orgDetails: {
    orgName: string;
    orgId: string;
  };
  vendorDetails: {
    vendorName: string;
    vendorId?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-org-incident-management',
  templateUrl: './org-incident-management.component.html',
  styleUrls: ['./org-incident-management.component.scss'],
})
export class OrgIncidentManagementComponent implements OnInit {
  orgAdmin: any;
  incidentList: IncidentManagement[] = [];
  filteredIncidentList: IncidentManagement[] = [];
  filterObj: Filter = {
    orgId: '',
    cafeId: '',
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

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) {}

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.initIncidentForm();
    this.getOrgList();
  }

  initIncidentForm() {
    this.incidentForm = this.fb.group({
      incidentType: ['', Validators.required],
      incidentSubject: ['', Validators.required],
      incidentDescription: ['', Validators.required],
    });
  }

  async saveIncident() {
    if (this.incidentForm.invalid) return;
    this.isSubmitting = true;
    this.incidentObj.submittedByInfo = {
      name: this.orgAdmin?.name,
      id: this.orgAdmin?._id,
    };

    this.incidentObj.orgDetails = this.incidentObj.orgDetails || {};
    this.incidentObj.cafeteriaDetails = this.incidentObj.cafeteriaDetails || {};
    this.incidentObj.orgDetails.orgId = this.filterObj.orgId;
    this.incidentObj.cafeteriaDetails.cafeId = this.filterObj.cafeId;

    try {
      await this.apiMainService.createIncident(this.incidentObj);
      this.getIncidentListByFilter();
      // Close modal by simulating a close button click
      let closeButton = document.querySelector('#incidentModal .btn-close');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
      this.incidentForm.reset();
    } catch (error) {
      console.error('Error adding incident:', error);
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
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails();
    }
  }

  setOrgDetails() {
    this.orgDetails = this.orglist.find(
      (org) => org._id == this.filterObj?.orgId
    );
    this.filterObj.cafeId = '';
    this.getIncidentListByFilter();
  }

  async getIncidentListByFilter() {
    try {
      let data = await this.apiMainService.getIncidentsByDateAndFilters(
        this.filterObj
      );
      this.incidentList = data?.incidents.sort(
        (a: any, b: any) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      this.filteredIncidentList =
        this.incidentList.length > 0 ? this.incidentList : [];
    } catch (err) {
      console.error('Error fetching incidents:', err);
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
}

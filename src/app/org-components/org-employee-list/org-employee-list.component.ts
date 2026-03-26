import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';
interface Employee {
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  employeePhoneNo: number;
  organization_id: string;
  organization_name: string;
  cafeteria_id: string;
  cafeteria_name: string;
}

@Component({
  selector: 'app-org-employee-list',
  templateUrl: './org-employee-list.component.html',
  styleUrls: ['./org-employee-list.component.scss'],
})
export class OrgEmployeeListComponent implements OnInit, OnChanges {
  @Input() adminOrg: any
  orgAdmin: any;
  employeeList: Employee[] = [];
  filteredEmployeeList: Employee[] = [];
  employeeObj: Employee = {
    cafeteria_id: '',
    cafeteria_name: '',
    employeeEmail: '',
    employeeId: '',
    employeeName: '',
    employeePhoneNo: 0,
    organization_id: '',
    organization_name: '',
  };
  orglist: any[] = [];
  orgDetails: any = {};
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private searchService: SearchFilterService
  ) { }

  ngOnInit(): void {
    this.initFunc()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
      this.initFunc()
    }
  }

  initFunc() {
    this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.initEmployeeForm();
    this.getEmployeeListByOrgId();
    this.getOrgList();
  }

  initEmployeeForm() {
    this.employeeForm = this.fb.group({
      employeeId: ['', Validators.required],
      employeeName: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePhoneNo: [
        '',
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
      organization_id: [
        { value: '', disabled: this.orgAdmin.role === 'ORGADMIN' },
        Validators.required,
      ],
      cafeteria_id: ['', Validators.required],
    });
  }

  async saveEmployee() {
    const cafeDetails = this.orgDetails.cafeteriaList.find((cafe: any) =>
      cafe._id == this.employeeObj.cafeteria_id
    );

    if (!cafeDetails) { return; }
    const payload = {
        ...this.employeeObj,
        cafeteria_list: [{
            cafeteria_id: cafeDetails.cafeteria_id,
            cafeteria_name: cafeDetails.cafeteria_name
        }]
    };
    try {
      let res = await this.apiMainService.employeeAdd(payload);
    } catch (error) {
      console.log(error);
    }
  }

  get f() {
    return this.employeeForm.controls;
  }

  async getOrgList() {
    try {
      let page = 1;
      let searchObj = { countOnly: false };
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        searchObj,
        page
      );
      this.orglist = data;
      this.setInitialData();
    } catch (error) {
      console.log(error);
    }
  }

  setInitialData() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.employeeObj.organization_id = this.orgAdmin?.orgDetails?._id;
      this.employeeObj.organization_name =
        this.orgAdmin?.orgDetails?.organization_name;
      this.setOrgDetails();
    }
  }

  setOrgDetails() {
    this.orgDetails = this.orglist.find((org: any) => {
      return org._id == this.employeeObj?.organization_id;
    });
    this.employeeObj.cafeteria_id = '';
  }

  async getEmployeeListByOrgId() {
    try {
      let data = await this.apiMainService.getEmployeeListByOrgId(
        this.orgAdmin?.orgDetails?._id
      );
      this.employeeList = data;
      this.filteredEmployeeList = data.length === 0 ? [] : data;
    } catch (err) {
      console.error('Error fetching employee:', err);
    }
  }

  searchFilter(e: any) {
    const searchText = e.target.value;

    const config = {
      keys: ['employeeId', 'employeeName', 'employeeEmail', 'cafeteria_name'],
    };

    this.filteredEmployeeList = this.searchService.searchData(
      this.employeeList,
      config,
      searchText
    );
  }
}

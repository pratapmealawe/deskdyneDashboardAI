import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  adminList: any = [];
  filteredAdminList: any[] = []; // Holds filtered data (search + role)
  pagedAdminList: any[] = [];    // Holds data for current page
  roleList: any[] = [];          // List of unique roles
  access: any;
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;

  searchControl = new FormControl('');
  roleControl = new FormControl(''); // Control for Role Filter

  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    public router: Router,
    private apiMainService: ApiMainService,
    private runtimeStorageService: RuntimeStorageService,
    private policyService: PolicyService,
    private searchService: SearchFilterService
  ) {
    this.getAllAdminList();
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();

    // Subscribe to changes
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });

    this.roleControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  addAdmin() {
    this.router.navigate(['addAdmin']);
  }

  async getAllAdminList() {
    try {
      this.adminList = await this.apiMainService.getAdminProfileList();
      // Extract unique roles
      this.roleList = [...new Set(this.adminList.map((admin: any) => admin.role))].filter(Boolean);
      this.filteredAdminList = [...this.adminList];
      this.updateCard();
    } catch (e) {
      console.log('error while fetching admin profile');
    }
  }

  editAdmin(admin: any) {
    this.runtimeStorageService.setCacheData('VIEW_ADMIN', admin);
    this.router.navigate(['addAdmin']);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateCard();
  }

  applyFilters() {
    let data = [...this.adminList];

    // 1. Filter by Role
    const role = this.roleControl.value;
    if (role) {
      data = data.filter((item) => item.role === role);
    }

    // 2. Filter by Search
    const search = this.searchControl.value;
    if (search) {
      const config = { keys: ['name', 'loginId', 'email'] };
      data = this.searchService.searchData(data, config, search);
    }

    this.filteredAdminList = data;
    this.pageIndex = 0; // Reset to first page on filter change
    this.updateCard();
  }

  updateCard() {
    if (!this.filteredAdminList) return;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedAdminList = this.filteredAdminList.slice(start, end);
  }
}

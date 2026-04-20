import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { RuntimeStorageService } from '@service/runtime-storage.service';
import { SearchFilterService } from '@service/search-filter.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddAdminComponent } from './add-admin/add-admin.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class AdminComponent implements OnInit {
  adminList: any = [];
  filteredAdminList: any[] = []; // Holds filtered data (search + role)
  pagedAdminList: any[] = [];    // Holds data for current page
  roleList: any[] = [];          // List of unique roles
  access: any;
  imageUrl: any = environment.imageUrl;
  searchControl = new FormControl('');
  roleControl = new FormControl(''); // Control for Role Filter

  pageSize: number = 10;
  pageIndex: number = 0;

  private apiMainService = inject(ApiMainService);
  private runtimeStorageService = inject(RuntimeStorageService);
  private searchService = inject(SearchFilterService);
  private dialog = inject(MatDialog);
  public router = inject(Router);

  constructor() {
    this.getAllAdminList();
  }

  ngOnInit(): void {
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
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '80%',
      maxWidth: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllAdminList();
      }
    });
  }

  async getAllAdminList() {
    try {
      this.adminList = await this.apiMainService.getAdminProfileList();
      // Extract unique roles
      this.roleList = [...new Set(this.adminList.map((admin: any) => admin.role))].filter(Boolean);
      this.filteredAdminList = [...this.adminList];
      this.updateCard();
    } catch (e) {
    }
  }

  editAdmin(admin: any) {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '80%',
      maxWidth: '1000px',
      disableClose: true,
      data: admin
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllAdminList();
      }
    });
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

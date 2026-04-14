import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-organization-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
})
export class OrganizationCardComponent {
  displayedColumns: string[] = ['Organization Name', 'Location', 'Cafeteria', 'Poc Details', 'action'];
  columns: string[] = [];
  tableDetails: string = ''
  dataSource = new MatTableDataSource<any>([]);
  tableData: any[] = [];
  imageUrl = environment.imageUrl;
  totalRecords = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [10, 15, 20];
  showModal: boolean = false;
  selectedOrgData: any[] = [];
  readonly dialog = inject(MatDialog);
  private _organization: any[] = [];
  pagedOrganized: any[] = [];

  @Input() showDeletedMode: boolean = false;

  @Input()
  get organization(): any[] {
    return this._organization;
  }
  set organization(value: any[]) {
    this._organization = value || [];
    this.ngOnInit();
  }
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  @Output() paginationConfig: EventEmitter<any> = new EventEmitter<any>();
  @Output() softDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() hardDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() restore: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.updatePage();
  }


  vieworg(org: any) {
    this.view.emit(org);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  updatePage() {
    if (!this.organization) return;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedOrganized = this.organization.slice(start, end);
  }

  dataView(org: any, type: any) {
    let keysToRemove: any[] = [];
    this.tableDetails = type === 'poc' ? 'POC Details' : 'Cafeteria Details';
    if (type === 'poc') {
      keysToRemove = ["_id", "approverDetails", "poc_id"];
    }
    let cafeteriaOrder: string[] = [];
    if (type === 'cafeteria') {
      keysToRemove = ["cafeteria_location", "poc_details", "_id", "accessCode", "subsidy"];
      cafeteriaOrder = ["cafeteria_name", "cafeteria_id", "cafeteria_city", "cafeteria_gstin", "address1", "address2", "appMenu_type", "landmark", "location", "showAdminDaily", "showEmpPolls", "showVirtualCafe", "showSaas", "showSiteExecutive", "showchecklist", "isEmployeeEmailLogin", "showComplienceTracker", "showConsumptionOrder"];
    }
    const filteredData = this.removeKeysFromObjects(org, keysToRemove);
    if (type === 'cafeteria') {
      const availableCols = Object.keys(filteredData[0]);
      this.columns = cafeteriaOrder.filter(col => availableCols.includes(col));
    } else {
      this.columns = Object.keys(filteredData[0]);
    }
    filteredData.forEach(row => {
      this.columns.forEach(col => {
        if (!(col in row)) row[col] = null;
      });
    });
    this.selectedOrgData = filteredData;
    this.tableData = [...this.selectedOrgData];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  removeKeysFromObjects(data: any[], keys: string[]) {
    return data.map(item => {
      const newItem = { ...item };
      keys.forEach(k => delete newItem[k]);
      return newItem;
    });
  }

  getInitials(name: string): string {
    if (!name) return 'O';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  onSoftDelete(org: any) {
    this.softDelete.emit(org);
  }

  onHardDelete(org: any) {
    this.hardDelete.emit(org);
  }

  onRestore(org: any) {
    this.restore.emit(org);
  }
}
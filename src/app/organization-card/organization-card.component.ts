import { AfterViewInit, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
})
export class OrganizationCardComponent implements AfterViewInit {
  displayedColumns: string[] = ['Organization Name', 'Location', 'Cafeteria', 'Poc Details', 'action'];
  columns: string[] = [];
  tableDetails: string = ''
  dataSource = new MatTableDataSource<any>([]);
  tableData: any[] = [];
  totalRecords = 0;
  pageIndex: number = 0;
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 20];
  showModal: boolean = false;
  selectedOrgData: any[] = [];
  readonly dialog = inject(MatDialog);
  private _organization: any[] = [];
  @Input()
  get organization(): any[] {
    return this._organization;
  }
  set organization(value: any[]) {
    this._organization = value || [];
    this.refreshDataSource();
  }
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  @Output() paginationConfig: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  refreshDataSource() {
    this.dataSource.data = this._organization;
    this.totalRecords = this._organization.length || 0;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  vieworg(org: any) {
    this.view.emit(org);
  }

  onPageChange(event: PageEvent) {
    this.paginationConfig.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    });
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
      cafeteriaOrder = ["cafeteria_name", "cafeteria_id", "cafeteria_city", "cafeteria_gstin", "address1", "address2", "appMenu_type", "landmark", "location", "showAdminDaily", "showEmpPolls", "showVirtualCafe", "showSaas", "showSiteExecutive", "showCompanyWallet", "showchecklist", "isEmployeeEmailLogin", "showComplienceTracker", "showConsumptionOrder"];
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
}
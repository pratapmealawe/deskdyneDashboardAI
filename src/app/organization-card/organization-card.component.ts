import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges, AfterViewInit, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PolicyService } from 'src/service/policy.service';
import { CommonDialogComponent } from '../shared/common-dialog/common-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
})
export class OrganizationCardComponent implements  AfterViewInit {
  displayedColumns: string[] = ['Organization Name', 'Location', 'Cafeteria', 'Poc Details' , 'action'];
  dataSource = new MatTableDataSource<any>([]);
  totalRecords = 0; 
  pageIndex: number = 0;
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 20];
  // @Input() organization :any[]=[]
  readonly dialog = inject(MatDialog);
  private _organization: any[] = [];

  @Input()
  get organization(): any[] {
    return this._organization;
  }
  set organization(value: any[]) {
    this._organization = value || [];
    this.refreshDataSource(); // refresh whenever new data arrives from parent
  }

  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  @Output () paginationConfig :EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  refreshDataSource() {
    this.dataSource.data = this._organization;
    this.totalRecords = this._organization.length || 0;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      console.log(this.sort);
      
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

  dataView(org:any){
    const dialogRef = this.dialog.open(CommonDialogComponent,{
      width: '900px',
      data: Array.isArray(org) ? org : [org]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
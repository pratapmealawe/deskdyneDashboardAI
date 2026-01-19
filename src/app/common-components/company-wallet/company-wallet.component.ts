import { Component, Input, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeCompanyWalletComponent } from './add-employee-company-wallet/add-employee-company-wallet.component';

@Component({
  selector: 'app-company-wallet',
  templateUrl: './company-wallet.component.html',
  styleUrls: ['./company-wallet.component.scss']
})
export class CompanyWalletComponent implements OnInit {
  @Input() orgObj: any;
  selectedCafeteria: any;
  selectedCafeteriaName: any;
  selectedCafeteriaId: any;
  searchQuery: string = '';
  displayedEmployees: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  constructor(private apiMainService: ApiMainService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    }
    this.fetchEmployees();
  }

  onCafeteriaChange(event: any) {
    this.selectedCafeteria = event.value;
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
  }

  fetchEmployees() {
    const payload: any = {
      organization_id: this.orgObj._id,
      page: this.currentPage,
      pageSize: this.itemsPerPage,
      search: this.searchQuery || '',
      cafeteriaId: this.selectedCafeteriaId
    };
    this.apiMainService.getCompanyWalletCafeteriaDetails(payload).then((res: any) => {
      if (res && res.data) {
        this.displayedEmployees = res.data;
        this.totalPages = Math.ceil((res.count || 0) / this.itemsPerPage); 
      } else {
        this.displayedEmployees = [];
        this.totalPages = 0;
      }
    }, (error) => {

    });
  }

  onSearchChange() {
    this.currentPage = 1;
    this.fetchEmployees();
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchEmployees();
    }
  }

  get pages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
  +    rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }

  getInitials(name: string): string {
    return name
      ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
      : '';
  }

  getAvatarClass(index: number): string {
    return index % 2 === 0 ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning';
  }

  getBadgeClass(cafeteria: string): string {
    if (!cafeteria) return 'bg-secondary-subtle text-secondary';
    const lowerName = cafeteria.toLowerCase();
    if (lowerName.includes('bailamos')) {
      return 'bg-success-subtle text-success';
    } else if (lowerName.includes('skyline')) {
      return 'bg-primary-subtle text-primary';
    } else {
      return 'bg-info-subtle text-info';
    }
  }

  addMultipleEmployee() {
  }

  editUser(element: any) {
  }

  deleteUser(element: any) {
  }

  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeCompanyWalletComponent, {
      width: '600px',
      data: {
        orgObj: this.orgObj,
        cafeteriaList: this.orgObj?.cafeteriaList || [],
        selectedCafeteria: this.selectedCafeteria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEmployees();
      }
    });
  }
}

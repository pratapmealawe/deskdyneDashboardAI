import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OrganizationSharedService } from '../../organization-shared.service';
import { Subscription } from 'rxjs';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeCompanyWalletComponent } from './add-employee-company-wallet/add-employee-company-wallet.component';
import { ImportWalletEmployeeComponent } from './import-wallet-employee/import-wallet-employee.component';
import { AddMultipleEmployeeCompanyWalletComponent } from './add-multiple-employee-company-wallet/add-multiple-employee-company-wallet.component';
import { AddAutoRuleComponent } from './add-auto-rule/add-auto-rule.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';

import { CafeteriaSelectorComponent } from '../cafeteria-selector/cafeteria-selector.component';

@Component({
  selector: 'app-company-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, CafeteriaSelectorComponent],
  templateUrl: './company-wallet.component.html',
  styleUrls: ['./company-wallet.component.scss']
})
export class CompanyWalletComponent implements OnInit {
  orgObj: any;
  selectedCafeteria: any;
  selectedCafeteriaName: any;
  selectedCafeteriaId: any;
  searchQuery: string = '';
  displayedEmployees: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalEmployeesCount: number = 0;
  autoRules: any[] = [];
  searchSubject = new Subject<string>();
  activeTabIndex: number = 0;
  private orgSub: Subscription | undefined;

  constructor(
    private apiMainService: ApiMainService,
    private dialog: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private orgSharedService: OrganizationSharedService
  ) { }

  ngOnInit(): void {
    if (this.orgObj) {
      this.initializeComponent();
    } else {
      this.orgSub = this.orgSharedService.organization$.subscribe(org => {
        if (org) {
          this.orgObj = org;
          this.initializeComponent();
        }
      });
    }

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.searchQuery = searchText;
      this.currentPage = 1;
      this.fetchEmployees();
    });
  }

  initializeComponent() {
    if (this.orgObj && this.orgObj.cafeteriaList && this.orgObj.cafeteriaList.length > 0) {
      this.selectedCafeteria = this.orgObj.cafeteriaList[0];
      this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
      this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    }
    this.fetchEmployees();
    this.fetchAutoRules();
  }

  ngOnDestroy() {
    if (this.orgSub) {
      this.orgSub.unsubscribe();
    }
  }

  onCafeteriaChange(event: any) {
    this.selectedCafeteria = event.value;
    this.selectedCafeteriaName = this.selectedCafeteria.cafeteria_name;
    this.selectedCafeteriaId = this.selectedCafeteria.cafeteria_id;
    this.currentPage = 1; // Reset to page 1 on cafeteria change
    this.fetchEmployees();
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
        this.totalEmployeesCount = res.count || 0;
        this.totalPages = Math.ceil(this.totalEmployeesCount / this.itemsPerPage);
      } else {
        this.displayedEmployees = [];
        this.totalEmployeesCount = 0;
        this.totalPages = 0;
      }
    }, (error) => {

    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
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
      rangeWithDots.push(i);
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
    const dialogRef = this.dialog.open(AddMultipleEmployeeCompanyWalletComponent, {
      width: '1100px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEmployees();
      }
    });
  }

  importWallet() {
    const dialogRef = this.dialog.open(ImportWalletEmployeeComponent, {
      width: '850px',
      data: {
        orgObj: this.orgObj,
        selectedCafeteria: this.selectedCafeteria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEmployees();
      }
    });
  }

  editUser(element: any) {
    const dialogRef = this.dialog.open(AddEmployeeCompanyWalletComponent, {
      width: '600px',
      data: {
        orgObj: this.orgObj,
        cafeteriaList: this.orgObj?.cafeteriaList || [],
        employee: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEmployees();
      }
    });
  }

  deleteUser(element: any) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to delete this employee?',
      context: this,
      callback: () => {
        this.apiMainService.deleteCompanyWalletCafeteriaDetails(element._id).then((res: any) => {
          if (res) {
            this.fetchEmployees();
            this.fetchAutoRules();
          }
        }, (error) => {
          console.error("Error deleting employee:", error);
        });
      }
    });
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

  fetchAutoRules() {
    if (!this.orgObj || !this.orgObj._id) return;
    this.apiMainService.getAutoRules(this.orgObj._id).then((res: any) => {
      this.autoRules = res || [];
    });
  }

  addAutoRule() {
    const dialogRef = this.dialog.open(AddAutoRuleComponent, {
      width: '600px',
      data: { orgObj: this.orgObj, autoRules: this.autoRules }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) this.fetchAutoRules();
    });
  }

  editRule(rule: any) {
    const dialogRef = this.dialog.open(AddAutoRuleComponent, {
      width: '600px',
      data: { orgObj: this.orgObj, rule: rule, autoRules: this.autoRules }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.fetchAutoRules();
    });
  }

  deleteRule(rule: any) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to delete this rule?',
      context: this,
      callback: () => {
        this.apiMainService.deleteAutoRule(rule._id).then(res => {
          this.fetchAutoRules();
        });
      }
    });
  }

  toggleRule(rule: any) {
    this.confirmationModalService.modal({
      msg: 'Are you sure you want to toggle this rule?',
      context: this,
      callback: () => {
        this.apiMainService.toggleAutoRule(rule._id).then(res => {
          this.fetchAutoRules();
        });
      }
    });
  }

  getCafeteriaName(rule: any): string {
    if (rule.cafeteriaName) return rule.cafeteriaName;
    if (rule.cafeteria_name) return rule.cafeteria_name;

    const id = rule.cafeteriaId || rule.cafeteria_id;
    if (!id) return '-';
    if (this.orgObj && this.orgObj.cafeteriaList) {
      const cafe = this.orgObj.cafeteriaList.find((c: any) => c.cafeteriaId === id);
      if (cafe) return cafe.cafeteria_name;
    }
    return id;
  }

  getEmployeeName(rule: any): string {
    return rule.employeeName || rule.employee_name || rule.employeeId || rule.employee_id || '-';
  }
}


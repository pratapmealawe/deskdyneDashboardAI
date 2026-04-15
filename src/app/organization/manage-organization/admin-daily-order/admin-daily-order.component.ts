import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { AdminDailyOrderMenuComponent } from './admin-daily-order-menu/admin-daily-order-menu.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@Component({
  selector: 'app-admin-daily-order',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    AdminDailyOrderMenuComponent,
    EmployeeListComponent
  ],
  templateUrl: './admin-daily-order.component.html',
  styleUrls: ['./admin-daily-order.component.scss']
})
export class AdminDailyOrderComponent implements OnInit {
  @Input() orgObj: any;

  selectedSubTabIndex = 0;

  subTabs = [
    { name: 'Admin Daily Order Menu', path: 'adminDailyOrderMenu', icon: 'restaurant_menu' },
    { name: 'Employee List', path: 'employeeList', icon: 'people' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubTabChange(index: number): void {
    this.selectedSubTabIndex = index;
  }

  get selectedSubPath(): string {
    return this.subTabs[this.selectedSubTabIndex].path;
  }
}

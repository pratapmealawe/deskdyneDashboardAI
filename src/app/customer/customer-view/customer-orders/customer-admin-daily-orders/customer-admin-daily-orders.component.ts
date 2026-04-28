import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-customer-admin-daily-orders',
  templateUrl: './customer-admin-daily-orders.component.html',
  styleUrls: ['./customer-admin-daily-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class CustomerAdminDailyOrdersComponent implements OnInit {
  @Input() userDetails: any;

  constructor() { }

  ngOnInit(): void {
  }
}

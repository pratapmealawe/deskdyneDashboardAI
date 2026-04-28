import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-customer-bulk-orders',
  templateUrl: './customer-bulk-orders.component.html',
  styleUrls: ['./customer-bulk-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class CustomerBulkOrdersComponent implements OnInit {
  @Input() userDetails: any;

  constructor() { }

  ngOnInit(): void {
  }
}

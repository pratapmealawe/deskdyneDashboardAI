import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-customer-employee-polling',
  templateUrl: './customer-employee-polling.component.html',
  styleUrls: ['./customer-employee-polling.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class CustomerEmployeePollingComponent implements OnInit {
  @Input() userDetails: any;

  constructor() { }

  ngOnInit(): void {
  }
}

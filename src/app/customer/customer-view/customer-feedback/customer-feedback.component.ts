import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class CustomerFeedbackComponent implements OnInit {
  @Input() userDetails: any;

  constructor() { }

  ngOnInit(): void {
  }
}

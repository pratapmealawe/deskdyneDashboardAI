import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class CustomerReviewComponent implements OnInit {
  @Input() userDetails: any;

  constructor() { }

  ngOnInit(): void {
  }
}

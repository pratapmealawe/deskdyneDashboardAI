import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {
  @Input() userDetails: any;
  selectedSubTab: string = 'outlet';

  constructor() { }

  ngOnInit(): void {
  }

  selectSubTab(tab: string) {
    this.selectedSubTab = tab;
  }
}

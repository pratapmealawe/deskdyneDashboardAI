import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlet-view',
  templateUrl: './outlet-view.component.html',
  styleUrls: ['./outlet-view.component.scss'],
})
export class OutletViewComponent implements OnInit {
  @Input() outlet: any;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();

  outletViewList = [
    { name: 'Basic Details', path: 'outlet-details' },
    { name: 'Categories', path: 'outlet-categories' },
    { name: 'Menu', path: 'outlet-menu' },
    { name: 'Feedback', path: 'outlet-feedback' },
    { name: 'Vendor', path: 'outlet-vendor' },
    // { name: 'Complience', path: 'outlet-compliance' },
  ];
  selectedTab = 'outlet-details';
  updateval: any = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotToTab(tab: string) {
    this.selectedTab = tab;
  }

  goBack() {
    this.back.emit({ val: true, updateval: this.updateval });
  }
  updateOutlet(val: any) {
    this.updateval = val;
  }
}

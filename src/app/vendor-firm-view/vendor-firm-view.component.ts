import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-vendor-firm-view',
  templateUrl: './vendor-firm-view.component.html',
  styleUrls: ['./vendor-firm-view.component.scss']
})
export class VendorFirmViewComponent implements OnChanges {
  @Input() vendor: any;
  @Output() back = new EventEmitter<boolean>();

  selectedTab: string = 'vendorFirmDetails';
  selectedSubTab: string = '';
  selectedChildTab: string = '';
  btnPolicy: any;

  vendorViewList = [
    { name: 'VendorFirm Details', path: 'vendorFirmDetails' },
    { name: 'Wallet', path: 'wallet' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.vendor);
  }

  goBack(): void {
    this.back.emit(true);
  }

  gotToTab(tab: string): void {
    this.selectedTab = tab;
    // this.initSubTabFor(tab);
  }
}

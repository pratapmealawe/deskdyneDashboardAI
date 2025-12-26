import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit, OnChanges {
  @Input() userDetails: any
  @Output() backBtnEmitter: any = new EventEmitter();

  userViewList = [
    { name: 'User Details', path: 'userDetails' },
    // { name: 'Past Orders', path: 'pastorders' },
    // { name: 'Past Meal Orders', path: 'pastmealorders' },
    { name: 'Outlet Orders', path: 'outletOrders' },
    { name: 'Wallet', path: 'wallet' }
  ];
  selectedTab = 'userDetails';
  selectedTabIndex: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.userDetails)
  }

  ngOnInit(): void {
    // console.log(this.userDetails)
    if (this.selectedTab) {
      const foundIndex = this.userViewList.findIndex(x => x.path === this.selectedTab);
      this.selectedTabIndex = foundIndex >= 0 ? foundIndex : 0;
    }
  }

  gotToTab(tab: string) {
    this.selectedTab = tab;
  }

  onTabChange(event: any) {
    const selectTab = this.userViewList[event.index];
    this.gotToTab(selectTab.path);
  }

  backBtn() {
    this.backBtnEmitter.emit(true)
  }

}

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
    { name: 'Wallet', path: 'wallet' },
    { name: 'Company Wallet', path: 'companyWallet' }
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

  onMainTabChange(index: number) {
    this.selectedTabIndex = index;
    this.selectedTab = this.userViewList[index].path;
  }

  getTabIcon(path: string): string {
    const icons: { [key: string]: string } = {
      'userDetails': 'person',
      'outletOrders': 'receipt_long',
      'wallet': 'account_balance_wallet',
      'companyWallet': 'corporate_fare'
    };
    return icons[path] || 'tab';
  }

  backBtn() {
    this.backBtnEmitter.emit(true)
  }

}

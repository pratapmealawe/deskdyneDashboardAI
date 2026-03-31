import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit, OnChanges {
  @Input() userDetails: any
  @Output() backBtnEmitter: any = new EventEmitter();

  userViewList = [
    { name: 'User Details', path: 'userDetails', policyKey: 'userDetails' },
    // { name: 'Past Orders', path: 'pastorders' },
    // { name: 'Past Meal Orders', path: 'pastmealorders' },
    { name: 'Outlet Orders', path: 'outletOrders', policyKey: 'customerOutletOrder' },
    { name: 'Wallet', path: 'wallet', policyKey: 'customerWallet' },
    { name: 'Company Wallet', path: 'companyWallet', policyKey: 'customerCompanyWallet' }
  ];
  selectedTab = 'userDetails';
  selectedTabIndex: number = 0;

  tabPolicy: any;

  constructor(private policyService: PolicyService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.userDetails)
  }

  ngOnInit(): void {
    this.userViewList = this.policyService.filterTabsByPolicy(this.userViewList);
    if (this.selectedTab) {
      const foundIndex = this.userViewList.findIndex(x => x.path === this.selectedTab);
      this.selectedTabIndex = foundIndex >= 0 ? foundIndex : 0;
      if (this.selectedTabIndex === 0 && this.userViewList.length > 0) {
        this.selectedTab = this.userViewList[0].path;
      }
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

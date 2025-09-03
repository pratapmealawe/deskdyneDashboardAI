import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';

interface GroupedOrder {
  totalSubsidy: number;
  totalAmount: number;
  totalItemAmount: number;
  outlets: {
    [outletName: string]: {
      totalSubsidy: number;
      totalAmount: number;
      totalItemAmount: number;
      orders: any[];
    };
  };
}

@Component({
  selector: 'app-outlet-billing',
  templateUrl: './outlet-billing.component.html',
  styleUrls: ['./outlet-billing.component.scss']
})
export class OutletBillingComponent implements OnInit {
  @Input() selectedOrg: any
  orglist: any = [];
  orgSelected: any = null;

  cafeteria_id: any
  cafeList: any[] = []
  dateGroup!: FormGroup;
  maxDate: Date = new Date();
  orders: any[] = [];
  groupedOrders: { [date: string]: GroupedOrder } = {};
  expandedItems: boolean[] = [];
  grandTotalAmount: number = 0;
  grandTotalSubsidy: number = 0;
  grandTotalItemAmount: number = 0;

  constructor(private apiMainService: ApiMainService, private excelService: ExcelService,) {
    this.dateGroup = new FormGroup({
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {
    this.initFunc()
  }

  initFunc() {
    this.getorganizations()

    this.maxDate.setDate(this.maxDate.getDate());
    this.maxDate.setHours(23, 59, 59, 999);
  }

  compareDates = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
    const dateA = new Date(a.key);
    const dateB = new Date(b.key);
    return dateA.getTime() - dateB.getTime(); // ascending order
  };

  async getorganizations() {
    try {
      this.orglist = [];
      let page = 1;
      let searchObj = {
        countOnly: false
      }
      let result = await this.apiMainService.B2B_fetchFilteredAllOrgs(searchObj, page);
      this.orglist = result;
      if (this.selectedOrg) {
        this.orgSelected = this.orglist.find((item: any) => item._id === this.selectedOrg?._id)
      } else {
        this.orgSelected = this.orglist[0]
      }

      if (this.orgSelected) {
        await this.getOrgDetailsById();
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getOrgDetailsById() {
    try {
      const res = await this.apiMainService.getOrg(this.orgSelected?._id)
      // this.orgDetails = res
      if (res?.cafeteriaList.length > 0) {
        this.cafeList = res?.cafeteriaList
        this.cafeteria_id = this.cafeList[0]?.cafeteria_id
      }
      this.fetchData()
    } catch (err: any) {
      console.log(err);
    }
  }

  fetchData() {
    const selCafe = this.cafeList.find(c => c.cafeteria_id === this.cafeteria_id)
    console.log(selCafe);
  }

  changeOrganization(e: any) {
    const id = e.value
    this.orgSelected = this.orglist.find((item: any) => item._id === id)
    this.getOrgDetailsById()
  }

  async getOrders() {
    const selectedCafeteria = this.cafeList.find(c => c.cafeteria_id === this.cafeteria_id);

    const body = {
      cafeteriaName: selectedCafeteria?.cafeteria_name || '',
      organizationName: this.orgSelected?.organization_name || '',
      cafeteriaId: selectedCafeteria?.cafeteria_id || '',
      organizationId: this.orgSelected?._id || '',
      fromDate: this.dateGroup.get('start')?.value,
      toDate: this.dateGroup.get('end')?.value,
    };

    console.log(body);


    this.fetchOutletOrders(body);
  }


  async fetchOutletOrders(body: any) {
    try {
      const res = await this.apiMainService.fetchOutletOrdersbysearchObj(body);
      console.log(res);
      this.orders = res
      if (res.length > 0) {
        this.groupOrdersByDate()
      }

    } catch (err: any) {
      console.log("err", err);
    }
  }

  groupOrdersByDate() {
    this.groupedOrders = {};
    this.grandTotalAmount = 0;
    this.grandTotalSubsidy = 0;
    this.grandTotalItemAmount = 0;

    this.orders.forEach(order => {
      const dateKey = new Date(order.orderDate).toISOString().split('T')[0]; // better sorting
      const outletName = order.outletName || 'Unknown Outlet';

      if (!this.groupedOrders[dateKey]) {
        this.groupedOrders[dateKey] = {
          totalSubsidy: 0,
          totalAmount: 0,
          totalItemAmount: 0,
          outlets: {}
        };
      }

      if (!this.groupedOrders[dateKey].outlets[outletName]) {
        this.groupedOrders[dateKey].outlets[outletName] = {
          orders: [],
          totalSubsidy: 0,
          totalAmount: 0,
          totalItemAmount: 0,
        };
      }

      const subsidy = order.subsidyAmount || 0;
      const totalAmt = (order.amount || 0) + (order.moneyWalletPointsUsed || 0);
      const totalItemAmount = order.itemAmount || 0;

      this.groupedOrders[dateKey].outlets[outletName].orders.push(order);
      this.groupedOrders[dateKey].outlets[outletName].totalSubsidy += subsidy;
      this.groupedOrders[dateKey].outlets[outletName].totalAmount += totalAmt;
      this.groupedOrders[dateKey].outlets[outletName].totalItemAmount += totalItemAmount;

      this.groupedOrders[dateKey].totalSubsidy += subsidy;
      this.groupedOrders[dateKey].totalAmount += totalAmt;
      this.groupedOrders[dateKey].totalItemAmount += totalItemAmount;

      this.grandTotalSubsidy += subsidy;
      this.grandTotalAmount += totalAmt;
      this.grandTotalItemAmount += totalItemAmount;
    });

    console.log(this.groupedOrders);
    
  }

  toggleFeedback(index: number) {
    this.expandedItems[index] = !this.expandedItems[index];
  }

  trackByDateKey(index: number, item: KeyValue<string, any>) {
    return item.key;
  }

  async excelExport() {
    const exportData: any[] = [];

    const selectedCafeteria = this.cafeList.find(c => c.cafeteria_id === this.cafeteria_id);


    for (const dateKey in this.groupedOrders) {
      const dateGroup = this.groupedOrders[dateKey];

      exportData.push({
        Date: new Date(dateKey).toISOString().split('T')[0],
        Organization: this.orgSelected?.organization_name || '',
        Cafeteria: selectedCafeteria?.cafeteria_name,
        'Total Item Amount (₹)': dateGroup.totalItemAmount,
        'Subsidy Amount (₹)': dateGroup.totalSubsidy,
        'Total Paid Amount (₹)': dateGroup.totalAmount,
      });
    }

    exportData.push({
      Date: 'Grand Total',
      Organization: '',
      Cafeteria: '',
      'Total Item Amount (₹)': this.grandTotalItemAmount,
      'Subsidy Amount (₹)': this.grandTotalSubsidy,
      'Total Paid Amount (₹)': this.grandTotalAmount,
    });

    const from = this.dateGroup.get('start')?.value?.toLocaleDateString() || '';
    const to = this.dateGroup.get('end')?.value?.toLocaleDateString() || '';
    const filename = `Outlet_Billing_${from}_to_${to}`;

    this.excelService.download(exportData, filename);
  }

}

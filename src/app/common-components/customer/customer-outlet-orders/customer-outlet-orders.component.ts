import { Component, Input, OnInit } from '@angular/core';
import { orderStatusMapper } from 'src/config/order-status.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ExcelService } from 'src/service/excel.service';

@Component({
  selector: 'app-customer-outlet-orders',
  templateUrl: './customer-outlet-orders.component.html',
  styleUrls: ['./customer-outlet-orders.component.scss']
})
export class CustomerOutletOrdersComponent implements OnInit {
  @Input() userDetails: any
  outletOrderList: any[] = []
  filteredList: any[] = []
  page = 1;
  lastPage = 1;
  pageLimit = 200;
  pageFirstEntry = 1;
  pageLastEntry = 1;
  paginationOver = false;
    orderStatusMapper: any = orderStatusMapper
  

  constructor(private apiMainService: ApiMainService, private excelService: ExcelService,) { }

  ngOnInit(): void {
    this.getOrderListByCustomerId(this.page)
  }

  async getOrderListByCustomerId(page: number) {
     this.page = page;
      let orderList: any = [];
    try {
       orderList = await this.apiMainService.getOutletOrdersByCustomerId(this.userDetails?._id, page, this.pageLimit)
      this.outletOrderList = orderList
      if (orderList && orderList.length > 0) {
        this.pageFirstEntry = ((page - 1) * this.pageLimit) + 1;
        this.pageLastEntry = this.pageFirstEntry + orderList.length - 1;
        this.filteredList = [...orderList];

        if (orderList.length < this.pageLimit) {
          this.paginationOver = true;
          this.lastPage = page;
        }
      } else {
        this.paginationOver = true;
        this.lastPage = page;
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  previous(page: number) {
    page--;
    this.getOrderListByCustomerId(page);
  }
  next(page: number) {
    page++;
    this.getOrderListByCustomerId(page);
  }

  async excelExport() {
    const exportData = this.outletOrderList.map(order => {
      const items = (order.itemList || [])
        .map((i: any) => `${i.itemName} x${i.count} @₹${i.price}`)
        .join('; ');
      return {
        'Order No': order.orderNo,
        'Order Date': new Date(order.orderDate).toLocaleString(),
        'Status': this.orderStatusMapper[order.orderstatus] || order.orderstatus,
        'Customer Name': order.customerName,
        'Customer Mobile': order.customerPhoneNo,
        'Customer Email': order.customerEmail,
        'Org Name': order.organizationDetails.organization_name,
        'Cafe Name': order.cafeteriaDetails.cafeteria_name,
        'Items': items,
        'Total Amount (₹)': order.itemAmount,
        'Subsidy Amount (₹)': order.subsidyAmount,
        'Paid Amount (₹)': order.amount,
      };
    })

    console.log(exportData);

    this.excelService.download(exportData, `outlet_order_${this.outletOrderList[0]?.customerName}_${this.outletOrderList[0]?.customerPhoneNo}`)
  }

}

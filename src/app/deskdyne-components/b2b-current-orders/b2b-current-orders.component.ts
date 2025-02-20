import { Component, OnInit } from '@angular/core';
import { b2b_orders_mapper } from 'src/config/b2b_orders.mapping.config'
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-b2b-current-orders',
  templateUrl: './b2b-current-orders.component.html',
  styleUrls: ['./b2b-current-orders.component.scss']
})
export class B2bCurrentOrdersComponent implements OnInit {
  selectedStatus = '';
  b2bSelectedStatus:any = '';
  bulkSelectedStatus:any = '';
  selectedGroup = ''
  currentOrderStatusList: any = [];
  page = 1;
  day:any;
  lastPage = 1;
  pageLimit = 200;
  pageFirstEntry = 1;
  pageLastEntry = 1;
  paginationOver = false;
  filteredList: any[] = [];
  b2b_orders_mapper: any = b2b_orders_mapper;
  orderStatusCountObj: any = {
    paymentInprogress: 0,
    paymentFailed: 0,
    acceptedOrder: 0,
    deliveredOrder: 0,
    deliveryBoyAssigned: 0,
    handedOverToDeliveryBoy: 0,
    newOrder: 0,
    onTheWay: 0,
    preparingOrder: 0,
    readyToDeliveryOrder: 0,
    autoCancelled: 0,
    rejectedByKitchen: 0,
    cancelledByKitchen: 0,
    cancelledByUser: 0,
    bulkOrder: 0,
    placed: 0,
    approved: 0,
    preApproved: 0,
    decline: 0,
    waitingForApproval:0
  };

  constructor(private ddApiMainService:ApiMainService, private sendDataToComponent:SendDataToComponent, private utilityService:UtilityService){}

  ngOnInit(): void {
    this.getCurrentOrders(false);
    this.subscribeEvents();
  }

  subscribeEvents(){
    this.sendDataToComponent.subscribe('UPDATE_BULK_ORDER_PAGE', (data) => {
      if (data && data.reload) {
        this.getCurrentOrders(false);
        let selectedIndex = -1;
        let b2bselectedIndex = -1;
        this.filteredList.forEach((ele, index) => {
          if (ele._id === data._id) {
            selectedIndex = index;
          }
        });
        if (selectedIndex > -1) {
          this.filteredList.splice(selectedIndex, 1);
        }
      }
    });
  }

  reloadPage(){
    this.getCurrentOrders(false);
  }

  async getLatestb2bOrderStatusList(status:any){
    this.selectedStatus = '';
    this.bulkSelectedStatus = '';
    this.b2bSelectedStatus = this.b2b_orders_mapper[status];
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
    this.getOrderStatusList(this.b2bSelectedStatus, 1, true, false);
  }

  async getLatestBulkDailyOrderStatusList(status:any){
    this.selectedStatus = '';
    this.b2bSelectedStatus = '';
    this.bulkSelectedStatus = status;
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
    this.getOrderStatusList(this.bulkSelectedStatus, 1, false, true);
  }

  async getOrderStatusList(status: string, page: number, showB2B:any, showDailyBulk:any) {
    try {
      this.page = page;
      let orderList: any = [];
      let bulkOrderList: any = [];
      if(showB2B){
        orderList = await this.ddApiMainService.getb2bBulkOrderList(status,this.page, this.pageLimit)
      }
      else if(showDailyBulk){
        orderList = await this.ddApiMainService.getb2bBulkDailyOrderList(status,this.page, this.pageLimit)
      }
      if (orderList && orderList.length > 0) {
        this.pageFirstEntry = ((page - 1) * this.pageLimit) + 1;
        this.pageLastEntry = this.pageFirstEntry + orderList.length - 1;
        this.filteredList = orderList;
        if (orderList.length < this.pageLimit) {
          this.paginationOver = true;
          this.lastPage = page;
        }
      }
      else {
        this.paginationOver = true;
        this.lastPage = page;
      }
    } catch (error) {
      console.log('error while searching orders ', error);
    }
  }

  async getCurrentOrders(showAlarm: boolean) {
    try {
      this.selectedStatus = '';
      this.currentOrderStatusList = [];
      this.page = 1;
      this.lastPage = 1;
      this.paginationOver = false;
      const orderList = await this.ddApiMainService.getCurrentB2BOrdersCount();
      console.log(orderList)
      this.orderStatusCountObj = orderList;
    } catch (error) {
      console.log('error while searching orders ', error);
    }
  }

  async getEmployeePollList(day:any){
    this.day = day;
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
    this.filteredList = [];
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const after1Day = new Date((new Date()).setDate(currentDate.getDate() + 1)).setHours(0,0,0,0);
    const after2Day = new Date((new Date()).setDate(currentDate.getDate() + 2)).setHours(0,0,0,0);
    if(day === 'today'){
      const filteredList = await this.ddApiMainService.getCafeteriasPollingList({deliveryStartDate:currentDate,deliveryEndDate:currentDate});
      if(filteredList && filteredList.length > 0){
        console.log(filteredList)
        this.filteredList = filteredList;
      }
    }
    else if(day === 'tomorrow'){
      const filteredList = await this.ddApiMainService.getCafeteriasPollingList({deliveryStartDate:after1Day,deliveryEndDate:after1Day});
      if(filteredList && filteredList.length > 0){
        this.filteredList = filteredList;
      }
    }
    else{
      const filteredList = await this.ddApiMainService.getCafeteriasPollingList({deliveryStartDate:after2Day,deliveryEndDate:after2Day});
      if(filteredList && filteredList.length > 0){
        this.filteredList = filteredList;
      }
    }
  }

  previous(page: number) {
    page--;
    const status = this.selectedStatus ? true : false;
    const bulk = this.bulkSelectedStatus ? true : false;
    const b2b = this.b2bSelectedStatus ? true : false;
    this.getOrderStatusList(status ? this.selectedStatus : bulk ? this.bulkSelectedStatus : this.b2bSelectedStatus , page, b2b, bulk);
  }
  next(page: number) {
    page++;
    const status = this.selectedStatus ? true : false;
    const bulk = this.bulkSelectedStatus ? true : false;
    const b2b = this.b2bSelectedStatus ? true : false;
    this.getOrderStatusList(status ? this.selectedStatus : bulk ? this.bulkSelectedStatus : this.b2bSelectedStatus , page, b2b, bulk);
  }

  setBtnGroup(group: any) {
    this.selectedGroup = group;
  }

}

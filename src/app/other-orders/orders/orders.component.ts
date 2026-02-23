import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { b2b_orders_mapper } from 'src/config/b2b_orders.mapping.config';
import { bulk_orders_mapper } from 'src/config/bulk_orders.mapping.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { DdApiMainService } from 'src/service/apiService/ddApiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild("noConnectionContent") noConnectionContent: any;
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
    waitingForApproval: 0
  };
  selectedStatus = '';
  b2bSelectedStatus: any = '';
  bulkSelectedStatus: any = '';
  selectedGroup = ''
  currentOrderStatusList: any = [];
  page = 1;
  lastPage = 1;
  pageLimit = 300;
  pageFirstEntry = 1;
  pageLastEntry = 1;
  paginationOver = false;
  filteredList: any[] = [];
  dbMasterList: any[] = [];
  filterMeal: any[] = [];

  b2b_orders_mapper: any = b2b_orders_mapper;
  bulk_orders_mapper: any = bulk_orders_mapper;
  ws: any;
  subscriptionChecked = false;
  subscriptionPackageChecked = false;
  advanceChecked = false;
  dailyChecked = false;
  allDaychecked = false;
  oyochecked = false;
  dinnerChecked = false;
  lunchChecked = false;
  breakfastChecked = false;
  highTeaChecked = false;

  pune = false;
  bangalore = false;

  // clusterCount = 0;
  clusterList: any = [];
  clusterSelected = '';
  allcluster = true;
  allclusterIgnore = false;
  access: any;

  constructor(public router: Router, private apiMainService: ApiMainService, private modalService: NgbModal,
    private utilityService: UtilityService, private localStorageService: LocalStorageService, private policyService: PolicyService,
    private sendDataToComponent: SendDataToComponent, private ddApiMainService: DdApiMainService) {
    // this.b2b_orders_mapper = b2b_orders_mapper;
    this.access = this.policyService.getCurrentButtonPolicy();
  }

  ngOnInit(): void {
    this.getAllCluster();
    // this.getCurrentOrders(false);
    // this.getLatestOrderStatusList('accepted');
    this.subscribeEvents();
  }

  reloadPage() {
    this.getCurrentOrders(false);
    this.getLatestOrderStatusList('accepted');
  }
  subscribeEvents() {
    this.sendDataToComponent.subscribe('UPDATE_ORDER_PAGE', (orderList) => {
      if (orderList) {
        this.orderStatusCountObj = orderList;
      }
    });
    this.sendDataToComponent.subscribe('UPDATE_CURRENT_ORDER_PAGE', (data) => {
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

  // connectWebsocket(){
  //     this.ws = this.wsMainService.subscribeWS('NEW_ORDER',(res)=>{
  //       console.log('subscribeWS',res, new Date());
  //       if(res){
  //         if(res.orderNo){
  //           // notification 
  //           const msg =  `Hi, New order ${res.orderNo} has been placed`;          
  //           this.webNotificationService.showNotification(msg);
  //           this.getCurrentOrders(false);
  //           this.toasterService.alarm(msg);
  //         }
  //         if(res.connectionLost){
  //           // alert of connection lost
  //           this.openConnectionLost();
  //         }
  //       }
  //     });
  // }



  goBack() {
    this.router.navigate(['/home/orders']);
  }

  async getCurrentOrders(showAlarm: boolean) {
    try {
      const cluserSelectedList: any = [];
      if (!this.allclusterIgnore) {
        this.clusterList.forEach((cluster: any) => {
          if (cluster.selected) {
            cluserSelectedList.push(cluster.clusterId);
          }
        });
      }
      this.selectedStatus = '';
      this.currentOrderStatusList = [];
      // this.filteredList = [];
      // this.b2bFilteredList = [];
      this.page = 1;
      this.lastPage = 1;
      this.paginationOver = false;
      const orderList = await this.utilityService.getCurrentOrdersCount(showAlarm, cluserSelectedList);
      this.orderStatusCountObj = orderList;
      // if(this.orderStatusCountObj.newOrder > 0 && showAlarm){
      //   const msg = 'These are some new orders placed';
      //   this.webNotificationService.showNotification(msg);
      //   this.toasterService.alarm(msg);
      // }
      // const self = this;      
      // this.currentOrderCounter = setTimeout(()=>{
      //   self.getCurrentOrders(true)
      // },1000*60*2);
      // console.log('orderList ',orderList);
    } catch (error) {
      console.log('error while searching orders ', error);
    }
  }

  async getLatestBulkOrderStatusList(status: any) {
    this.selectedStatus = '';
    this.b2bSelectedStatus = '';
    this.bulkSelectedStatus = this.bulk_orders_mapper[status];
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
    this.getOrderStatusList(this.bulkSelectedStatus, 1, false, true);
  }

  async getLatestb2bOrderStatusList(status: any) {
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

  async getLatestOrderStatusList(status: string) {
    this.bulkSelectedStatus = '';
    this.b2bSelectedStatus = '';
    this.selectedGroup = '';
    this.selectedStatus = status;
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
    this.getOrderStatusList(status, 1, false, false);
  }

  async getOrderStatusList(status: string, page: number, showB2B: any, showBulk: any) {
    try {
      const cluserSelectedList: any = [];
      if (!this.allclusterIgnore) {
        this.clusterList.forEach((cluster: any) => {
          if (cluster.selected) {
            cluserSelectedList.push(cluster.clusterId);
          }
        });
      }
      this.page = page;
      let orderList: any = [];
      let bulkOrderList: any = [];
      if (status === 'bulkOrder') {
        orderList = await this.apiMainService.getCurrentBulkOrdersList(this.page, this.pageLimit)
      }
      else if (showBulk) {
        orderList = await this.apiMainService.getClusterBulkOrderList(status, this.page, this.pageLimit, { clusterList: cluserSelectedList })
      }
      else if (showB2B) {
        orderList = await this.ddApiMainService.getClusterb2bBulkOrderList(status, this.page, this.pageLimit, { clusterList: cluserSelectedList })
      }
      else {
        const response = await Promise.all([
          this.apiMainService.getClusterCurrentOrdersList(status, this.page, this.pageLimit, { clusterList: cluserSelectedList }),
          this.apiMainService.getClusterCurrentPackageOrdersList(status, this.page, this.pageLimit, { clusterList: cluserSelectedList }),
          this.ddApiMainService.getClusterCurrentPackageOrdersList(status, this.page, this.pageLimit, { clusterList: cluserSelectedList }),
          this.ddApiMainService.getClusterCurrentOrdersList(status, this.page, this.pageLimit, { clusterList: cluserSelectedList }),
          // this.apiMainService.getClusterBulkOrderList(status, this.page, this.pageLimit, { clusterList: cluserSelectedList })
        ]);
        if (response[0] && response[1] && response[2] && response[3]) {
          orderList = [...response[0], ...response[1], ...response[2], ...response[3]];
        } else if (response[0] && response[1]) {
          orderList = [...response[0], ...response[1]];
        } else if (response[0] && response[2]) {
          orderList = [...response[0], ...response[1]];
        } else if (response[0]) {
          orderList = response[0];
        }
        // if (response[4]) {
        //   if (response[4].length > 0) {
        //     orderList = [...orderList, ...response[4]];
        //     this.bulkSelectedStatus = true;
        //   }
        // }
      }

      // console.log('orderList',orderList)
      if (orderList && orderList.length > 0) {
        this.pageFirstEntry = ((page - 1) * this.pageLimit) + 1;
        this.pageLastEntry = this.pageFirstEntry + orderList.length - 1;
        this.filteredList = [...orderList];
        this.dbMasterList = [...orderList];
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
  previous(page: number) {
    page--;
    const status = this.selectedStatus ? true : false;
    const bulk = this.bulkSelectedStatus ? true : false;
    const b2b = this.b2bSelectedStatus ? true : false;
    this.getOrderStatusList(status ? this.selectedStatus : bulk ? this.bulkSelectedStatus : this.b2bSelectedStatus, page, b2b, bulk);
  }
  next(page: number) {
    page++;
    const status = this.selectedStatus ? true : false;
    const bulk = this.bulkSelectedStatus ? true : false;
    const b2b = this.b2bSelectedStatus ? true : false;
    console.log('next',status,bulk,b2b);
    this.getOrderStatusList(status ? this.selectedStatus : bulk ? this.bulkSelectedStatus : this.b2bSelectedStatus, page, b2b, bulk);
  }

  openConnectionLost() {
    this.modalService.open(this.noConnectionContent, { ariaLabelledBy: 'modal-basic-title', size: 'md', backdrop: false, centered: true })
      .result.then((result) => {
        console.log(`Closed with: ${result}`);
        if (result === 'retry') {
          this.reloadPage();
        }
      }, (reason) => {
        console.log(`Model Dismissed`);
      });
  }

  setBtnGroup(group: any) {
    this.selectedGroup = group;
  }

  ngOnDestroy() {
    console.log('ngOnDestroy current order component');
    // this.wsMainService.unsubscribeWS('NEW_ORDER',this.ws);
    this.sendDataToComponent.unsubscribe('UPDATE_ORDER_PAGE');
    //clearTimeout(this.currentOrderCounter);
  }

  checkforClusterFilter(elm: any) {
    if (!(this.pune || this.bangalore)) {
      return true;
    } else {
      const isPune = this.pune && elm.clusterName === 'pune';
      const isBanglore = this.bangalore && elm.clusterName === 'Bangalore Full';
      return isPune || isBanglore;
    }
  }

  orderTypeFilterList() {
    this.filteredList = this.dbMasterList.filter((elm: any) => {
      if (!(this.subscriptionChecked || this.subscriptionPackageChecked || this.advanceChecked || this.dailyChecked || this.allDaychecked || this.oyochecked)) {
        return true && this.checkforClusterFilter(elm); 0
      } else {
        const isSubscription = this.subscriptionChecked && elm.orderType === 'subscription';
        const isSubscriptionPackage = this.subscriptionPackageChecked && elm.orderType === 'subscriptionPackage';
        const isAdvance = this.advanceChecked && elm.orderType === 'advance';
        const isDaily = this.dailyChecked && elm.orderType === 'daily';
        const isAllDay = this.allDaychecked && elm.orderType === 'allDay';
        const isOyo = this.oyochecked && elm.orderType === 'oyo';
        console.log(isSubscription, isSubscriptionPackage);
        if (isSubscription || isSubscriptionPackage) {
          if (!(this.dinnerChecked || this.lunchChecked || this.breakfastChecked || this.highTeaChecked)) {
            return true && this.checkforClusterFilter(elm);
          } else {
            const isDinner = this.dinnerChecked && elm.mealType == 'Dinner' || this.dinnerChecked && elm.mealTimeDinner;
            const isLunch = this.lunchChecked && elm.mealType == 'Lunch' || this.lunchChecked && elm.mealTimeLunch;
            const isBreakfast = this.breakfastChecked && elm.mealType == 'Breakfast';
            const ishighTea = this.highTeaChecked && elm.mealType == 'HighTea';
            return (isDinner || isLunch || isBreakfast || ishighTea) && this.checkforClusterFilter(elm);;
          }
        } else {
          return (isSubscription || isSubscriptionPackage || isAdvance || isDaily || isAllDay || isOyo) && this.checkforClusterFilter(elm);;
        }
      }
    });
  }

  async getAllCluster() {
    try {
      const result: any = await this.apiMainService.getGeoFencingList();
      const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
      let cluster_allowed: any = [];
      if (profile && profile.cluster_allowed) {
        cluster_allowed = profile.cluster_allowed
      }
      if (result && result.length) {
        this.clusterList = result.filter((cluster: any) => {
          let allowed = false
          cluster_allowed.forEach((allowedCluster: any) => {
            if (allowedCluster.allowed && allowedCluster.clusterId === cluster.clusterId) {
              allowed = true;
            }
          });
          return allowed;
        });
        this.clusterList.forEach((cluster: any) => {
          cluster.selected = true;
        });
        // this.clusterCount = result.length;
        console.log('cluster list', this.clusterList);
        this.reloadPage();
      }
    } catch (error) {
      console.log('error while getting dashboard count', error)
    }
  }

  setCluster(selectedCluster: any) {
    this.reloadPage();
    this.allcluster = false;
  }

  setAllCluster() {
    if (this.allcluster) {
      this.clusterList.forEach((cluster: any) => {
        cluster.selected = true;
      });
      this.allclusterIgnore = false;
    } else {
      this.clusterList.forEach((cluster: any) => {
        cluster.selected = false;
      });
      this.allclusterIgnore = false;
    }
    this.reloadPage();
  }

  setAllClusterIgnore() {
    this.allclusterIgnore != this.allclusterIgnore;
    if (this.allclusterIgnore) {
      this.allcluster = false;
    } else {
      this.allcluster = true;
    }
    this.setAllCluster();
    console.log(this.allcluster, this.allclusterIgnore);
  }

}

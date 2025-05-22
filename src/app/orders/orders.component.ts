import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { UtilityService } from 'src/service/utility.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  pollingSub!: Subscription;

  orderStatusCountObj: any = {
    paymentInprogress: 0,
    paymentFailed: 0,
    completed: 0,
    placed: 0
  };
  selectedStatus = '';
  selectedGroup = ''
  currentOrderStatusList: any = [];
  page = 1;
  lastPage = 1;
  pageLimit = 200;
  pageFirstEntry = 1;
  pageLastEntry = 1;
  paginationOver = false;
  filteredList: any[] = [];
  dbMasterList: any[] = [];
  filterMeal: any[] = [];
  orglist: any[] = [];
  cafeList: any[] = [];
  filterObj: any = {
    orgId: '',
    cafeId: '',
  };


  constructor(public router: Router, private apiMainService: ApiMainService, private modalService: NgbModal, private utilityService: UtilityService, private sendDataToComponent: SendDataToComponent,) {
  }

  ngOnInit(): void {
    this.subscribeEvents();
    this.getOrgList()

    this.pollingSub = interval(30_000).subscribe(() => {
      this.getCurrentOrders(false);
      // this.getLatestOrderStatusList('placed');
    });
  }

  reloadPage() {
    this.getCurrentOrders(false);
    this.getLatestOrderStatusList('placed');
  }
  

  subscribeEvents() {
    // this.sendDataToComponent.subscribe('UPDATE_ORDER_PAGE', (orderList) => {
    //   if (orderList) {
    //     this.orderStatusCountObj = orderList;
    //   }
    // });
    // this.sendDataToComponent.subscribe('UPDATE_CURRENT_ORDER_PAGE', (data) => {
    //   if (data && data.reload) {
    //     this.getCurrentOrders(false);
    //     let selectedIndex = -1;
    //     this.filteredList.forEach((ele, index) => {
    //       if (ele._id === data._id) {
    //         selectedIndex = index;
    //       }
    //     });
    //     if (selectedIndex > -1) {
    //       this.filteredList.splice(selectedIndex, 1);
    //     }
    //   }
    // });
  }


  async getOrgList() {
    try {
      let data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        { countOnly: false },
        1
      );
      this.orglist = data;
    } catch (error) {
      console.error(error);
    }
  }

  setOrgDetails() {
    let orgDetails = this.orglist.find((org: any) => {
      return org._id == this.filterObj?.orgId;
    });

    this.cafeList = orgDetails.cafeteriaList;
    this.filterObj.cafeId = '';
  }

  goBack() {
    this.router.navigate(['/home/orders']);
  }

  async getCurrentOrders(showAlarm: boolean) {
    try {
      const orderList = await this.apiMainService.getCurrentOutletOrdersCount();
      this.orderStatusCountObj = orderList;
    } catch (error) {
      console.log('error while searching orders ', error);
    }
  }

  async getLatestOrderStatusList(status: string) {
    this.selectedGroup = '';
    this.selectedStatus = status;
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
    this.getOrderStatusList(status, 1);
  }

  async getOrderStatusList(status: string, page: number) {
    try {
      this.page = page;
      let orderList: any = [];
      const cafeName = this.cafeList.find((item: any) => item.cafeteria_id === this.filterObj.cafeId)?.cafeteria_name
      orderList = await this.apiMainService.getCurrentOutletOrdersList(this.filterObj.orgId, cafeName, status, this.page, this.pageLimit)
      if (orderList && orderList.length > 0) {
        this.pageFirstEntry = ((page - 1) * this.pageLimit) + 1;
        this.pageLastEntry = this.pageFirstEntry + orderList.length - 1;
        this.filteredList = [...orderList];
        console.log(this.filteredList);
        
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
    this.getOrderStatusList(this.selectedStatus, page);
  }
  next(page: number) {
    page++;
    this.getOrderStatusList(this.selectedStatus, page);
  }



  setBtnGroup(group: any) {
    this.selectedGroup = group;
  }

  ngOnDestroy() {
    this.sendDataToComponent.unsubscribe('UPDATE_ORDER_PAGE');
    this.pollingSub?.unsubscribe();
  }


}

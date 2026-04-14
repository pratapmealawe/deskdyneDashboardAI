import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { b2b_orders_mapper } from 'src/config/b2b_orders.mapping.config';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { UtilityService } from 'src/service/utility.service';

@Component({
  selector: 'app-virtual-cafeteria',
  templateUrl: './virtual-cafeteria.component.html',
  styleUrls: ['./virtual-cafeteria.component.scss']
})
export class VirtualCafeteriaComponent implements OnInit, OnDestroy {
  @ViewChild("noConnectionContent") noConnectionContent: any;
  orderStatusCountObj: any;
  selectedStatus: string = 'placed';
  selectedOrderDate: Date = new Date();
  isLoading: boolean = false;

  statusChips = [
    { label: 'New', value: 'placed', count: 0 },
    { label: 'Accepted', value: 'accepted', count: 0 },
    { label: 'Preparing', value: 'preparing', count: 0 },
    { label: 'Ready To Delivery', value: 'readyToDelivery', count: 0 },
    { label: 'Agent Assigned', value: 'deliveryBoyAssigned', count: 0 },
    { label: 'Handover', value: 'handedOverToDeliveryBoy', count: 0 },
    { label: 'On Way', value: 'onTheWay', count: 0 },
    { label: 'Delivered', value: 'delivered', count: 0 },
    { label: 'Payment', value: 'paymentInprogress', count: 0 },
    { label: 'Bulk New', value: 'bulk_placed', count: 0 },
    { label: 'Cancelled', value: 'cancelledByUser', count: 0 },
  ];

  selectedGroup = '';
  currentOrderStatusList: any = [];
  page = 1;
  lastPage = 1;
  pageLimit = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageFirstEntry = 1;
  pageLastEntry = 1;
  paginationOver = false;
  filteredList: any[] = [];
  dbMasterList: any[] = [];
  filterMeal: any[] = [];

  b2b_orders_mapper: any = b2b_orders_mapper;
  bulk_orders_mapper: any = b2b_orders_mapper;
  access: any;

  constructor(
    public router: Router,
    private apiMainService: ApiMainService,
    private modalService: NgbModal,
    private utilityService: UtilityService,
    private localStorageService: LocalStorageService,
    private policyService: PolicyService,
    private sendDataToComponent: SendDataToComponent) {
    this.access = this.policyService.getCurrentButtonPolicy();
  }

  ngOnInit(): void {
    this.subscribeEvents();
    this.refreshPage();
  }

  refreshPage() {
    this.getCurrentOrders();
    this.getLatestOrderStatusList(this.selectedStatus);
  }

  onOrderDateChange(event: any): void {
    this.selectedOrderDate = event.value;
    this.refreshPage();
  }

  async getCurrentOrders() {
    try {
      this.isLoading = true;
      const dateParam = this.selectedOrderDate ? this.selectedOrderDate.toISOString() : new Date().toISOString();
      const response: any = await Promise.all([
        this.apiMainService.getClusterCurrentOrdersCount(dateParam),
        this.apiMainService.getClusterCurrentPackageCount(dateParam)
      ]);
      if (response[0] && response[1]) {
        this.orderStatusCountObj = { ...response[0], ...response[1] };
      } else if (response[0]) {
        this.orderStatusCountObj = response[0];
      } else if (response[1]) {
        this.orderStatusCountObj = response[1];
      }

      if (this.orderStatusCountObj) {
        this.statusChips.forEach(chip => {
          if (chip.value.startsWith('bulk_')) {
            const bulkKey = chip.value.split('_')[1];
            chip.count = (this.orderStatusCountObj.bulkOrder && this.orderStatusCountObj.bulkOrder[bulkKey]) || 0;
          } else if (chip.value === 'placed') {
            chip.count = this.orderStatusCountObj.newOrder || 0;
          } else if (chip.value === 'accepted') {
            chip.count = this.orderStatusCountObj.acceptedOrder || 0;
          } else if (chip.value === 'preparing') {
            chip.count = this.orderStatusCountObj.preparingOrder || 0;
          } else if (chip.value === 'readyToDelivery') {
            chip.count = this.orderStatusCountObj.readyToDeliveryOrder || 0;
          } else if (chip.value === 'delivered') {
            chip.count = this.orderStatusCountObj.deliveredOrder || 0;
          } else {
            chip.count = this.orderStatusCountObj[chip.value] || 0;
          }
        });
      }
    } catch (error) {
      console.log('error while fetching order counts', error);
    } finally {
      this.isLoading = false;
    }
  }

  reloadPage() {
    this.refreshPage();
  }

  subscribeEvents() {
    this.sendDataToComponent.subscribe('UPDATE_ORDER_PAGE', (orderList) => {
      if (orderList) {
        this.orderStatusCountObj = orderList;
      }
    });
    this.sendDataToComponent.subscribe('UPDATE_CURRENT_ORDER_PAGE', (data) => {
      if (data && data.reload) {
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


  goBack() {
    this.router.navigate(['/app/home/orders']);
  }


  async getLatestBulkOrderStatusList(status: any) {
    this.selectedStatus = status;
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;
    this.getOrderStatusList(this.selectedStatus, 1, false, true);
  }

  async getLatestOrderStatusList(status: string) {
    this.selectedStatus = status;
    this.currentOrderStatusList = [];
    this.filteredList = [];
    this.page = 1;
    this.lastPage = 1;
    this.paginationOver = false;

    const isBulk = status.startsWith('bulk_');
    const actualStatus = isBulk ? status : status; // handled in service call or below

    this.getOrderStatusList(actualStatus, 1, false, isBulk);
  }

  async getOrderStatusList(status: string, page: number, showB2B: any, showBulk: any) {
    try {
      this.isLoading = true;
      this.page = page;
      const dateStr = this.selectedOrderDate ? this.selectedOrderDate.toISOString() : new Date().toISOString();
      let orderList: any = [];

      const response: any = await Promise.all([
        this.apiMainService.getClusterCurrentOrdersList(status, this.page, this.pageLimit, dateStr),
        this.apiMainService.getClusterCurrentPackageOrdersList(status, this.page, this.pageLimit, dateStr),
      ]);

      if (response[0] && response[1]) {
        orderList = [...response[0], ...response[1]];
      } else if (response[0]) {
        orderList = response[0];
      } else if (response[1]) {
        orderList = response[1];
      }

      if (orderList && orderList.length > 0) {
        this.pageFirstEntry = ((page - 1) * this.pageLimit) + 1;
        this.pageLastEntry = this.pageFirstEntry + orderList.length - 1;
        this.filteredList = [...orderList];
        this.dbMasterList = [...orderList];
        if (orderList.length < this.pageLimit) {
          this.paginationOver = true;
          this.lastPage = page;
        } else {
          this.paginationOver = false;
        }
      }
      else {
        this.filteredList = [];
        this.paginationOver = true;
        this.lastPage = page;
      }
    } catch (error) {
      console.log('error while searching orders ', error);
      this.filteredList = [];
    } finally {
      this.isLoading = false;
    }
  }

  onPageSizeChange(newSize: number) {
    this.pageLimit = newSize;
    this.page = 1;
    this.getLatestOrderStatusList(this.selectedStatus);
  }

  get totalPages(): number {
    // If we don't have total count from API, we estimate or hide total
    return this.paginationOver ? this.page : this.page + 1;
  }

  get visiblePages(): (number | string)[] {
    const range: (number | string)[] = [];
    range.push(this.page);
    return range; // simplified for now as API doesn't return totalCount easily here
  }

  goToPage(pageNum: number | string) {
    if (typeof pageNum !== 'number') return;
    this.page = pageNum;
    this.getLatestOrderStatusList(this.selectedStatus);
  }
  previous(page: number) {
    if (page <= 1) return;
    this.getLatestOrderStatusList(this.selectedStatus); // This simplified logic might need page adjustment
    // But given the way getOrderStatusList is called, it should probably be:
    this.getOrderStatusList(this.selectedStatus, page - 1, false, this.selectedStatus.startsWith('bulk_'));
  }
  next(page: number) {
    if (this.paginationOver) return;
    this.getOrderStatusList(this.selectedStatus, page + 1, false, this.selectedStatus.startsWith('bulk_'));
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

}

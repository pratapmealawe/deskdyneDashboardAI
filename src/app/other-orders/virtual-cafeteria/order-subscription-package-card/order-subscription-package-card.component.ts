import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { orderStatusMapper } from 'src/config/order-status.config';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { DeliveryOrderService } from 'src/service/delivery-order.service';
import { GoogleMapService } from 'src/service/google-map.service';
import { PolicyService } from 'src/service/policy.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  selector: 'app-order-subscription-package-card',
  templateUrl: './order-subscription-package-card.component.html',
  styleUrls: ['./order-subscription-package-card.component.scss'],
})
export class OrderSubscriptionPackageCardComponent implements OnInit {
  @ViewChild('contentkitchen') contentkitchen: any;
  @ViewChild('childOrderModal') childOrderModal: any;
  @ViewChild('selectKitchenModal') selectKitchenModal: any;
  @ViewChild('contentAdmin') contentAdmin: any;
  @Input() orderInput: any;
  @Input() parentPage: string = '';
  @Input() showDeliveryDetail: boolean = true;
  order: any;
  server = 'DD';
  filteredOrderInput: any;
  orderStage = 0;
  orderTransferStart = false;
  selectedTab: string | null = null;
  showReschedule = false;
  rescheduleStart = false;
  mealTypeChange = false;
  mealTypeChangeStart = false;
  mealSlotChangeStart = false;
  newMealType: any = '';
  packageAddonsList: any = [];
  mealPerdayCount = 1;
  subscriptionLunchSlot: String = '';
  subscriptionDinnerSlot: String = '';
  orderStatusMapper: any = orderStatusMapper;
  showStopRefund = false;
  gatwayPaymentHistory: any = {};
  editMode: boolean = false;
  editOrderDate = false;
  today: string = '';
  newSubscriptionDate = new Date();
  isEditRouteInfo: boolean = false;
  routeNo: any;
  routeRank: any;
  addressEdit: boolean = false;
  childOrdersEditMode: boolean = false;
  isEditPrice: boolean = false;
  customerAddressList: any = [];
  addressIndex: any;
  statusList: any = [];
  selectedObj: any;
  nearKitchenFullList: any = [];
  showLoadMoreKitchen = true;
  nearKitchenList: any = [];
  nearestKitchen = '';
  searchedKitchen: any = {};
  searchKitenLogingId = '';
  transferExtraAmt = 0;
  reduceExtraAmt = 0;
  kitchenmodal: any;
  transferDeliveryCharges = 0;
  access: any;
  rescheduelDate: any;
  oldSlab1Price = 0;
  oldSlab2Price = 0;
  childOrder: any;
  orderEditFlag: boolean = false;
  selectedChildOrderList: Array<any> = [];
  increaseOrderDateBy: any;
  selctedRM: any;
  adminList: any = [];
  imageUrl = environment.imageUrl;
  mealTypeList = [{ label: 'Lunch', value: 'Lunch' }, { label: 'Dinner', value: 'Dinner' }];
  childOrdersShow: boolean = false;

  constructor(
    public router: Router,
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    private googleMapService: GoogleMapService,
    private sendDataToComponent: SendDataToComponent,
    private deliveryOrderService: DeliveryOrderService,
    private modalService: NgbModal,
    private policyService: PolicyService,
    private confirmationModalService: ConfirmationModalService
  ) {
    this.access = this.policyService.getCurrentButtonPolicy();
  }

  ngOnInit(): void {
    this.order = this.orderInput;
    if (this.showDeliveryDetail) {
      this.getDeliveryStatus();
    }
    for (const prop in this.orderStatusMapper) {
      this.statusList.push({
        name: this.orderStatusMapper[prop],
        value: prop,
        selected: false,
      });
    }
    this.packageAddonsList = this.orderInput.mealPackage.addonsList;
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  checkOrderCondition() {
    if (this.order) {
      this.orderStage = 0;
      if (this.order.orderstatus === 'paymentInprogress') {
        this.orderStage = 1;
      }
      if (this.order.orderstatus === 'placed') {
        this.orderStage = 2;
      } else if (this.order.orderstatus === 'accepted') {
        this.orderStage = 3;
      } else if (this.order.orderstatus === 'paymentFailed') {
        this.orderStage = 8;
      }
      if (this.order && this.order.mealPackage) {
        this.packageAddonsList = this.order.mealPackage.addonsList;

      }
      if (this.order.mealTimeDinner && this.order.mealTimeLunch) {
        this.mealPerdayCount = 2;
      }
    }
  }
 


  async getDeliveryStatus() {
    if (this.order && this.order.deliveryTaskId) {
      try {
        await this.deliveryOrderService.trackDeliveryTask(this.order, this.order.deliveryVendor, this.order.orderCreatedBy);
      } catch (error) {
        console.log('error while creating delivery task', error);
      }
    }
    else if (this.orderInput && this.orderInput.deliveryTaskId) {
      try {
        await this.deliveryOrderService.trackDeliveryTask(this.orderInput, this.orderInput.deliveryVendor, this.order.orderCreatedBy);
      } catch (error) {
        console.log('error while creating delivery task', error);
      }
    }
  }

  getInstructionStatus(instructionText: string): boolean {
    return (
      this.orderInput?.deliveryPartnerInstruction?.find(
        (x: any) => x.instruction.toLowerCase() === instructionText.toLowerCase()
      )?.selected ?? false
    );
  }

  getBadgeClass(orderType: string): string {
    switch (orderType?.toLowerCase()) {
      case 'subscriptionpackage': return 'badge-subscriptionPackage';
      default: return 'bg-secondary';
    }
  }

  getBadgeClassForMealPackage(mealPackage: string): string {
    switch (mealPackage?.toLowerCase()) {
      case 'veg': return 'badge-veg';
      case 'jain': return 'badge-jain';
      case 'nonveg': return 'badge-nonveg';
      default: return 'badge-default';
    }
  }

  getBadgeClassForOrderStatus(orderStatus: string): string {
    if (!orderStatus) return 'badge-default';

    switch (orderStatus.toLowerCase()) {
      case 'paymentinitiated': return 'badge-payment-initiated';
      case 'paymentinprogress': return 'badge-payment-inprogress';
      case 'paymentfailed': return 'badge-payment-failed';

      case 'placed': return 'badge-placed';
      case 'accepted': return 'badge-accepted';
      case 'preparing': return 'badge-preparing';
      case 'readytodelivery': return 'badge-readyToDelivery';

      case 'deliveryboyassigned': return 'badge-deliveryBoyAssigned';
      case 'handedovertodeliveryboy': return 'badge-handedOverToDeliveryBoy';
      case 'ontheway': return 'badge-onTheWay';
      case 'delivered': return 'badge-delivered';

      case 'cancelledbyuser':
      case 'cancelledbykitchen': return 'badge-cancelled';

      case 'rejectedbykitchen': return 'badge-rejected';
      case 'autocancelled': return 'badge-autoCancelled';
      case 'refundcompleted': return 'badge-refundCompleted';

      default: return 'badge-default';
    }
  }

  get hasSelectedAddons(): boolean {
    return this.packageAddonsList?.some((a: any) => a.selected);
  }

  toggleTab(tabName: string) {
    this.selectedTab = this.selectedTab === tabName ? null : tabName;
  }

  async performOrderTransfer() {
    try {
      const selectedOrderIds = this.selectedChildOrderList;
      const kitchenObj: any = await this.googleMapService.getKitchenDistance(
        this.searchedKitchen,
        this.order.customerLocation.geolocation
      );
      const orderObj = { ...this.order };
      if (orderObj.transferHistory && orderObj.transferHistory.length === 0) {
        orderObj.firstKitchenName = orderObj.kitchenName;
      }
      orderObj.kitchenId = this.searchedKitchen._id;
      orderObj.kitchenName = this.searchedKitchen.kitchenName;
      orderObj.kitchenPhoneNo = this.searchedKitchen.phoneNo;
      orderObj.kitchenAddress = this.searchedKitchen.address;
      orderObj.kitchenGeolocation = this.searchedKitchen.geolocation;
      orderObj.deliveryByMealaweBoy = this.searchedKitchen.deliveryByMealaweBoy
        ? this.searchedKitchen.deliveryByMealaweBoy
        : false;
      orderObj.skipWalletPayment = this.searchedKitchen.skipWalletPayment
        ? this.searchedKitchen.skipWalletPayment
        : false;
      orderObj.distance = kitchenObj.distance;
      orderObj.transferExtraAmt = this.transferExtraAmt
        ? this.transferExtraAmt
        : 0;
      orderObj.reduceExtraAmt = this.reduceExtraAmt ? this.reduceExtraAmt : 0;
      orderObj.orderTransferred = true;
      orderObj.transferHistory = orderObj.transferHistory
        ? orderObj.transferHistory
        : [];
      orderObj.transferHistory.push({
        kitchenName: this.order.kitchenName,
        kitchenPhoneNo: this.order.kitchenPhoneNo,
      });
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      orderObj.dailyOrderList = orderObj.dailyOrderList.filter(
        (foodOrder: any) => {
          const orderDate = new Date(foodOrder.orderDate);
          if (
            orderDate.getTime() >= today.getTime() &&
            foodOrder.orderstatus === 'accepted'
          ) {
            foodOrder.orderTransferred = true;
            return true;
          } else {
            return false;
          }
        }
      );
      // if(orderObj.dailyOrderList && orderObj.dailyOrderList.length === 0){
      //     this.toasterService.error('Order not eligible for transfer')
      //     return;
      // }
      if (this.order.orderCreatedBy === 'DDUser') {
        const order = await this.apiMainService.performPackageOrderTransfer(
          orderObj
        );
        if (order && order._id) {
          this.order = { ...order };
          this.orderInput = this.order;
        }
      } else {
        const order = await this.apiMainService.performPackageOrderTransfer(
          orderObj
        );
        if (order && order._id) {
          this.order = { ...order };
          this.orderInput = this.order;
        }
      }
      this.cancelTransfer();
    } catch (error) {
      console.log('error while tranferring order ', error);
    }
  }


  cancelTransfer() {
    this.orderTransferStart = false;
    this.searchedKitchen = {};
    this.searchKitenLogingId = '';
    this.transferExtraAmt = 0;
    this.reduceExtraAmt = 0;
  }


  async placePaymentFailedOrder() {
    try {
      let order;
      if (this.order.orderCreatedBy != 'DDUser') {
        order = await this.apiMainService.validatePaytmPaymentTransaction({
          foodOrderId: this.order._id,
          orderType: 'subscriptionPackage',
        });
      } else {
        order = await this.apiMainService.validatePaytmPaymentTransaction({
          foodOrderId: this.order._id,
          orderType: 'subscriptionPackage',
        });
      }

      if (order && order.status) {
        this.order.orderstatus = 'placed';
      }
      this.checkOrderCondition();
      this.showStopRefund = false;
    } catch (error) {
      console.log('error while placePaymentFailedOrder order ', error);
    }
  }

  async stopRefundProcess() {
    try {
      const order = { ...this.order };
      order.stopRefundProcess = true;
      await this.apiMainService.updatePackageFoodOrder(order);
      this.order.stopRefundProcess = true;
      this.checkOrderCondition();
      this.showStopRefund = false;
      this.toasterService.success(116);
    } catch (error) {
      console.log('error while getGatewayPaymentHistory order ', error);
    }
  }

  async acceptRejectOrder(status: string) {
    try {
      const order = { ...this.order };
      order.orderstatus = status;
      if (order.orderCreatedBy === 'DDUser') {
        await this.apiMainService.updatePackageFoodOrder(order);
      } else {
        await this.apiMainService.updatePackageFoodOrder(order);
      }
      this.order.orderstatus = status;
      this.checkOrderCondition();
      this.sendDataToComponent.publish('UPDATE_CURRENT_ORDER_PAGE', {
        reload: true,
        _id: this.order._id,
      });
    } catch (error) {
      console.log('error while changing staus', error);
    }
  }

  

  rejectOrder() {
    this.acceptRejectOrder('rejectedByKitchen');
    this.sendDataToComponent.publish('UPDATE_CURRENT_ORDER_PAGE', {
      reload: true,
      _id: this.order._id,
    });
  }

  tranferToAnotherKitchen() {
    this.orderTransferStart = true;
  }

  editSubscriptionDate() {
    this.editOrderDate = true;
  }

  async confirmSubscriptionDate() {
    try {
      const order = { ...this.order }
      order.subscriptionStartDate = new Date(this.newSubscriptionDate);
      if (order.orderCreatedBy != 'DDUser') {
        await this.apiMainService.updatePackageFoodOrder(order);
      } else {
        await this.apiMainService.updateddPackageFoodOrder(order);
      }
      this.order.subscriptionStartDate = order.subscriptionStartDate;
      this.checkOrderCondition();
      this.editOrderDate = false;
    } catch (error) {
      console.log('error while changing staus', error);
    }
  }

  cancelOrderDateEdit() {
    this.editOrderDate = false;
  }

  async createDailyPackageOrder() {
    try {
      const order = { ...this.order };
      console.log(order);
      if (order.orderCreatedBy === 'DDUser') {
        const updateOrder = await this.apiMainService.createDailyPackageOrder(
          order
        );
        if (updateOrder && updateOrder._id) {
          this.order = updateOrder;
          this.orderInput = updateOrder;
        }
      } else {
        const updateOrder = await this.apiMainService.createDailyPackageOrder(order);
        if (updateOrder && updateOrder._id) {
          this.order = updateOrder;
          this.orderInput = updateOrder;
          this.toasterService.success(306);
        }
      }
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while changing staus', error);
      this.toasterService.error('Errror while accepting order');
    }
  }

  childOrderSelected(order: any) {
    const orderIdx = this.selectedChildOrderList?.indexOf(order);
    if (orderIdx >= 0) {
      this.selectedChildOrderList.splice(orderIdx, 1);
    } else {
      this.selectedChildOrderList.push(order)
    }
  }

  async viewChildOrder(order: any) {
    if (!this.order) {
      this.order = order;
    }
    this.order.orderCreatedBy === 'DDUser'
      ? (this.server = 'DD')
      : (this.server = '');
    this.childOrder = order;
    const modalRef = this.modalService.open(this.childOrderModal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      windowClass: 'menuModel',
    });
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      async (reason) => {
        try {
          if (this.orderEditFlag) {
            if (this.order.orderCreatedBy === 'DDUser') {
              const order = await this.apiMainService.getOrderPackage(
                this.order._id
              );
              if (order) {
                this.order = order;
              }
            } else {
              const order = await this.apiMainService.getOrderPackage(
                this.order._id
              );
              if (order) {
                this.order = order;
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
    // this.offcanvasService.open(this.childOrderCanvas, { position: 'end', panelClass: 'wide-panel' });
  }

  orderEdited(status: any) {
    console.log(status);
    this.orderEditFlag = status;
  }

  onEditOrder(order: any) {
    this.editMode = true;
    this.order = order;
    this.googleMapService.getGoogle();
    this.checkOrderCondition();
    if (this.selectedTab === null) {
      this.selectedTab = "Order Details"
    }
  }


  
}

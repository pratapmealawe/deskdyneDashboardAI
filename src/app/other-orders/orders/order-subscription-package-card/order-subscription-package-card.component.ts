import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { orderStatusMapper } from 'src/config/order-status.config';
import { environment } from 'src/environments/environment';
import { CustomPipeModule } from 'src/pipes/pipe.module';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { DeliveryOrderService } from 'src/service/delivery-order.service';
import { GoogleMapService } from 'src/service/google-map.service';
import { PolicyService } from 'src/service/policy.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CustomPipeModule],
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
  orderTabs = ordersDetails;
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

  async refund() {
    try {
      const refundObj = {
        orderId: this.order._id,
        comment: 'Refund by system',
      };
      this.order = await this.apiMainService.refund(refundObj);
      this.toasterService.success(106);
    } catch (e) {
      this.toasterService.success(105);
      console.log('error while proceeding refund ', e);
    }
  }

  async checkCancelEligibility() {
    try {
      const eligilityObj = await this.apiMainService.checkCancelEligibility(
        this.order._id
      );
      if (eligilityObj.cancelEligible) {
        this.confirmationModalService.modal(
          `Refund amount is ${eligilityObj.refund_amount}, Do you want to refund?`,
          this.refund,
          this
        );
      } else {
        this.toasterService.error(107);
      }
    } catch (e) {
      console.log('error while cancelling order ', e);
    }
  }

  async getDeliveryStatus() {
    if (this.order && this.order.deliveryTaskId) {
      try {
        const deliveryOrderStatus = await this.deliveryOrderService.trackDeliveryTask(this.order.deliveryTaskId, this.order.deliveryVendor, this.order.orderCreatedBy);
        this.order.deliveryTaskState = deliveryOrderStatus.state;
        console.log(deliveryOrderStatus.state)
        if (deliveryOrderStatus && deliveryOrderStatus.eta) {
          this.order.pickupEta = deliveryOrderStatus.eta.pickup;
          this.order.dropoffEta = deliveryOrderStatus.eta.dropoff;
        }
        if (deliveryOrderStatus && deliveryOrderStatus.sfx_order_id) {
          this.order.sfx_order_id = deliveryOrderStatus.sfx_order_id;
        }
        if (deliveryOrderStatus && deliveryOrderStatus.runner) {
          this.order.runnerName = deliveryOrderStatus.runner.name;
          this.order.runnerPhone = deliveryOrderStatus.runner.phone_number;
          this.order.runnerLocation = deliveryOrderStatus.runner.location;
        }
        if (deliveryOrderStatus.state === 'runner_cancelled' || deliveryOrderStatus.state === 'cancelled') {
          this.order.runnerName = undefined;
          this.order.runnerPhone = undefined;
          this.order.runnerLocation = undefined;
        }
        if (deliveryOrderStatus.state === 'CANCELLED') {
          this.order.deliveryTaskState = 'cancelled';
        }
      } catch (error) {
        console.log('error while creating delivery task', error);
      }
    }
    else if (this.orderInput && this.orderInput.deliveryTaskId) {
      try {
        const deliveryOrderStatus = await this.deliveryOrderService.trackDeliveryTask(this.orderInput.deliveryTaskId, this.orderInput.deliveryVendor, this.order.orderCreatedBy);
        this.orderInput.deliveryTaskState = deliveryOrderStatus.state;
        if (deliveryOrderStatus && deliveryOrderStatus.eta) {
          this.orderInput.pickupEta = deliveryOrderStatus.eta.pickup;
          this.orderInput.dropoffEta = deliveryOrderStatus.eta.dropoff;
        }
        if (deliveryOrderStatus && deliveryOrderStatus.sfx_order_id) {
          this.orderInput.sfx_order_id = deliveryOrderStatus.sfx_order_id;
        }
        if (deliveryOrderStatus && deliveryOrderStatus.runner) {
          this.orderInput.runnerName = deliveryOrderStatus.runner.name;
          this.orderInput.runnerPhone = deliveryOrderStatus.runner.phone_number;
          this.orderInput.runnerLocation = deliveryOrderStatus.runner.location;
        }
        if (deliveryOrderStatus.state === 'runner_cancelled' || deliveryOrderStatus.state === 'cancelled') {
          this.orderInput.runnerName = undefined;
          this.orderInput.runnerPhone = undefined;
          this.orderInput.runnerLocation = undefined;
        }
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

  async getDunzoDeliveryDistance(kitchenObj: any, cutomerLatLng: any) {
    try {
      const kitchenLatLng = kitchenObj.geolocation;
      const deliveryObj = {
        optimised_route: true,
        pickup_details: [{ ...kitchenLatLng, reference_id: 'pickup_location' }],
        drop_details: [{ ...cutomerLatLng, reference_id: 'drop_location' }],
      };
      const quaotObj = await this.deliveryOrderService.getdeliveryAmount(deliveryObj, this.order.orderCreatedBy);
      return quaotObj;
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
    }
  }

  async calculateDistance(kitchenList: any, index: number) {
    return new Promise(async (resolve, reject) => {
      try {
        if (index === kitchenList.length) {
          resolve(kitchenList);
        } else {
          // const kitchenObj:any = await this.googleMapService.getKitchenDistance(kitchenList[index],this.order.customerLocation.geolocation);
          // const kitchenObj:any = await this.getDunzoDeliveryDistance(kitchenList[index],this.order.customerLocation.geolocation);
          const response = await Promise.all([
            this.googleMapService.getKitchenDistance(
              kitchenList[index],
              this.order.customerLocation.geolocation
            ),
            this.getDunzoDeliveryDistance(
              kitchenList[index],
              this.order.customerLocation.geolocation
            ),
          ]);
          const kitchenObj: any = response[0];
          if (response[1]) {
            kitchenObj.dunzoDistance = response[1].distance;
            kitchenObj.estimated_price = response[1].estimated_price;
          }
          kitchenList[index] = kitchenObj;
          index++;
          const res = await this.calculateDistance(kitchenList, index);
          resolve(res);
        }
      } catch (error) {
        console.log('error while calculate Distance');
      }
    });
  }

  async searchKitchen() {
    try {
      console.log('searchKitenLogingId ', this.searchKitenLogingId);
      if (this.searchKitenLogingId) {
        this.searchKitenLogingId = this.searchKitenLogingId.toUpperCase();
        const kitchen = await this.apiMainService.getKitchenPartnerProfile(
          this.searchKitenLogingId
        );
        if (kitchen && kitchen._id) {
          if (kitchen.profileApproval === 'approved') {
            if (kitchen.kitchenOpened) {
              this.searchedKitchen = { ...kitchen };
            } else {
              this.toasterService.error(115);
            }
          } else {
            this.toasterService.error(114);
          }
        } else {
          this.toasterService.error(113);
        }
      }
    } catch (error) {
      this.toasterService.error(112);
    }
  }

  async getKitchenAssignedOrders(kitchenList: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const ids = kitchenList.map((ele: any) => ele._id);
        const onGoingOrdersCountList = await this.apiMainService.getKitchenAssignedOrders({ kitchenIdList: ids });
        if (onGoingOrdersCountList && onGoingOrdersCountList.length > 0) {
          kitchenList.forEach((kitchen: any) => {
            kitchen.totalMonthlycompletedOrders = 0;
            onGoingOrdersCountList.forEach((orderCountObj: any) => {
              if (kitchen._id === orderCountObj._id) {
                kitchen.totalMonthlycompletedOrders = orderCountObj.totalMonthlycompletedOrders;
              }
            });
          });
        }
        resolve(kitchenList);
      }
      catch (error) {
        resolve(kitchenList);
      }
    });
  }

  async loadMoreKitchen() {
    const currentListLength = this.nearKitchenList.length;
    const nextListLength = currentListLength + 10;
    if (nextListLength > this.nearKitchenFullList.length) {
      //hide loadMore
      this.showLoadMoreKitchen = false;
    } else {
      let nextlist = this.nearKitchenFullList.slice(this.nearKitchenList.length, this.nearKitchenList.length + 10);
      nextlist = await this.calculateDistance(nextlist, 0);
      const withOngaoingOrder: any = await this.getKitchenAssignedOrders(nextlist);
      this.nearKitchenList = [...this.nearKitchenList, ...withOngaoingOrder];
    }
  }

  selectKitchen() {
    let selectedKitchen: any = {};
    this.nearKitchenList.forEach((kitchen: any) => {
      if (kitchen.loginId === this.nearestKitchen) {
        selectedKitchen = kitchen;
      }
    });
    if (selectedKitchen && selectedKitchen._id) {
      this.searchedKitchen = { ...selectedKitchen };
    }
    this.kitchenmodal.dismiss('add');
  }

  checkdistance() {
    const selectedKitchen = this.nearKitchenList.find((kitchen: any) => {
      return kitchen.loginId == this.nearestKitchen;
    });
    if (selectedKitchen.distance > 6) {
      const modalRef = this.modalService.open(this.selectKitchenModal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
        windowClass: 'kitchenModel',
      });
      modalRef.result.then(
        (result) => {
          if (result === 'add') {
            this.selectKitchen();
          }

          this.nearestKitchen = '';
        },
        (reason) => {
          console.log(`Model Dismissed`);
          this.showLoadMoreKitchen = true;
          this.nearestKitchen = '';
        }
      );
    } else {
      this.selectKitchen();
    }
  }

  editItemPrice() {
    this.isEditPrice = true;
    this.oldSlab1Price = this.order.mealPackage.payToKitchenPerMeal;
    this.oldSlab2Price = this.order.mealPackage.payToKitchenPerMeal2;
  }

  async confirmEditItemPrice() {
    try {
      const order = { ...this.order };
      if (order.orderCreatedBy === 'DDUser') {
        await this.ddApiMainService.updatePackageFoodOrder(order);
      } else {
        await this.apiMainService.updatePackageFoodOrder(order);
      }
      this.isEditPrice = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
    }
  }

  cancelEditItemPrice() {
    this.isEditPrice = false;
    this.order.mealPackage.payToKitchenPerMeal = this.oldSlab1Price;
    this.order.mealPackage.payToKitchenPerMeal2 = this.oldSlab2Price;
  }

  async editAddress(phoneNo: any) {
    try {
      const customer = await this.apiMainService.getCustomerProfileByMobile(
        phoneNo
      );
      this.customerAddressList = customer.addressList;
      this.addressEdit = true;
    } catch (error) {
      this.addressEdit = false;
    }
  }

  async onConfirmCustomerAddress() {
    try {
      const order = { ...this.order };
      const selectedAddress = this.customerAddressList[this.addressIndex];
      const clusters: any = await this.googleMapService.getClusterName(
        selectedAddress.geolocation
      );
      if (!clusters || clusters.length === 0) {
        this.toasterService.error(120);
      } else {
        const newAddress = {
          address: selectedAddress.address,
          geolocation: {
            lat: selectedAddress.geolocation.lat,
            lng: selectedAddress.geolocation.lng,
          },
          landmark: selectedAddress.landmark,
          location: selectedAddress.location,
          tagLocation: selectedAddress.tagLocation,
        };
        if (this.selectedChildOrderList?.length > 0 && this.childOrdersEditMode) {
          this.updateSelectedChildOrdersAddress(newAddress);
        } else {
          const orderIds: any = [];
          this.order.dailyOrderList.forEach((order: any) => {
            orderIds.push(order.orderNo);
          });
          const payload = {
            ids: orderIds,
            address: newAddress,
          };
          await this.apiMainService.changeChildOrdersAddress(payload);
          const order = await this.apiMainService.getOrderPackage(this.order._id);
          if (order) {
            this.order = order;
            this.addressEdit = false;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  editRouteInfo() {
    this.isEditRouteInfo = true;
    this.routeNo = this.order.routeNo;
    this.routeRank = this.order.routeRank;
  }

  async onConfirmRouteInfo() {
    try {
      const order = { ...this.order };
      if (order.orderCreatedBy === 'DDUser') {
        await this.ddApiMainService.updatePackageFoodOrder(order);
      } else {
        if (this.order.dailyOrderList && this.order.dailyOrderList.length > 0) {
          const data = {
            routeNo: this.order.routeNo,
            routeRank: order.routeRank
          }
          await this.apiMainService.updatePackageRouteInfo(this.order._id, data);
        } else {
          await this.apiMainService.updatePackageFoodOrder(order);
        }

      }
      this.isEditRouteInfo = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
    }
  }

  cancelRouteInfo() {
    this.isEditRouteInfo = false;
    this.order.routeNo = this.routeNo;
    this.order.routeRank = this.routeRank;
  }

  async openKitchen(kitchenList: any) {
    const topFiveKitchen = kitchenList.slice(0, 10);
    const topFive = await this.calculateDistance(topFiveKitchen, 0);
    this.nearKitchenList = await this.getKitchenAssignedOrders(topFive);
    console.log('this.nearKitchenList', this.nearKitchenList);
    this.kitchenmodal = this.modalService.open(this.contentkitchen, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      windowClass: 'menuModel',
    });

    this.kitchenmodal.result.then(
      (result: any) => {
        console.log(`Closed with: ${result}`, kitchenList);
        if (result === 'add') {
          console.log(this.nearestKitchen, 'click on add');
          let selectedKitchen: any = {};
          this.nearKitchenList.forEach((kitchen: any) => {
            if (kitchen.loginId === this.nearestKitchen) {
              selectedKitchen = kitchen;
            }
          });
          if (selectedKitchen && selectedKitchen._id) {
            this.searchedKitchen = { ...selectedKitchen };
          }
        }

        this.nearestKitchen = '';
      },
      (reason: any) => {
        console.log(`Model Dismissed`);
        this.showLoadMoreKitchen = true;
        this.nearestKitchen = '';
      }
    );
  }


  async searchNearKitchen() {
    try {
      let clusterList = [];
      const clusters: any = await this.googleMapService.getClusterName(this.order.customerLocation.geolocation);
      if (!clusters || clusters.length === 0) {
        this.toasterService.error(120);
        return;
      } else {
        clusterList = clusters;
      }
      // const kitchenList = await this.apiMainService.getNearestKitchen(1, this.order.customerLocation.geolocation.lng,
      //   this.order.customerLocation.geolocation.lat, { clusterList });
      const kitchenType = ['Subscription', 'B2C'];
      const kitchenList = await this.apiMainService.getNearestKitchensOfType(1, this.order.customerLocation.geolocation.lng,
        this.order.customerLocation.geolocation.lat, { clusterList, kitchenType });
      this.nearKitchenFullList = kitchenList;
      this.openKitchen(kitchenList);
    } catch (error) {
      console.log('searchNearKitchen error ', error);
    }
  }

  async changeChildOrdersKitchen() {
    const orderObj = { ...this.order };
    const kitchenObj: any = await this.googleMapService.getKitchenDistance(
      this.searchedKitchen,
      this.order.customerLocation.geolocation
    );
    const foodOrder: any = {};
    foodOrder.kitchenId = this.searchedKitchen._id;
    foodOrder.kitchenName = this.searchedKitchen.kitchenName;
    foodOrder.kitchenPhoneNo = this.searchedKitchen.phoneNo;
    foodOrder.kitchenAddress = this.searchedKitchen.address;
    foodOrder.kitchenGeolocation = this.searchedKitchen.geolocation;
    foodOrder.deliveryByMealaweBoy = this.searchedKitchen.deliveryByMealaweBoy
      ? this.searchedKitchen.deliveryByMealaweBoy
      : false;
    foodOrder.skipWalletPayment = this.searchedKitchen.skipWalletPayment
      ? this.searchedKitchen.skipWalletPayment
      : false;
    foodOrder.distance = kitchenObj.distance;
    foodOrder.transferExtraAmt = this.transferExtraAmt
      ? this.transferExtraAmt
      : 0;
    foodOrder.reduceExtraAmt = this.reduceExtraAmt ? this.reduceExtraAmt : 0;
    foodOrder.orderTransferred = true;
    foodOrder.transferHistory = foodOrder.transferHistory
      ? foodOrder.transferHistory
      : [];
    foodOrder.transferHistory.push({
      kitchenName: this.order.kitchenName,
      kitchenPhoneNo: this.order.kitchenPhoneNo,
    });
    // });
    const updateProp = { ...foodOrder };
    this.updateChildOrdersProps(updateProp);
    this.cancelTransfer();
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
        const order = await this.ddApiMainService.performPackageOrderTransfer(
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

  confirmTransfer() {
    if (this.childOrdersEditMode && this.selectedChildOrderList.length > 0) {
      this.confirmationModalService.modal(
        `Are you sure, you want to transfer selected child orders to ${this.searchedKitchen.kitchenName}`,
        () => this.changeChildOrdersKitchen(),
        this
      );
    } else {
      this.confirmationModalService.modal(
        `Are you sure, you want to transfer this order to ${this.searchedKitchen.kitchenName}`,
        () => this.performOrderTransfer(),
        this
      );
    }
  }

  cancelTransfer() {
    this.orderTransferStart = false;
    this.searchedKitchen = {};
    this.searchKitenLogingId = '';
    this.transferExtraAmt = 0;
    this.reduceExtraAmt = 0;
  }

  async updateSelectedChildOrdersAddress(newAddress: any) {
    try {
      const addressProp = {
        customerLocation: { ...newAddress }
      }
      this.confirmationModalService.modal(
        `Are you sure, you want to change the address of selected order(s)?`,
        () => this.updateChildOrdersProps(addressProp),
        this
      );
      this.addressEdit = false;
    } catch (error) {
      console.log('update order address error', error)
    }
  }

  async cancelEditAddress() {
    this.addressEdit = false;
  }

  async confirmEditAddress() {
    try {
      const order = { ...this.order };
      const selectedAddress = this.customerAddressList[this.addressIndex];
      const clusters: any = await this.googleMapService.getClusterName(
        selectedAddress.geolocation
      );
      if (!clusters || clusters.length === 0) {
        this.toasterService.error(120);
      } else {
        const newAddress = {
          address: selectedAddress.address,
          geolocation: {
            lat: selectedAddress.geolocation.lat,
            lng: selectedAddress.geolocation.lng,
          },
          landmark: selectedAddress.landmark,
          location: selectedAddress.location,
          tagLocation: selectedAddress.tagLocation,
        };
        if (this.selectedChildOrderList?.length > 0 && this.childOrdersEditMode) {
          this.updateSelectedChildOrdersAddress(newAddress);
        } else {
          const orderIds: any = [];
          this.order.dailyOrderList.forEach((order: any) => {
            orderIds.push(order.orderNo);
          });
          const payload = {
            ids: orderIds,
            address: newAddress,
          };
          await this.apiMainService.changeChildOrdersAddress(payload);
          const order = await this.apiMainService.getOrderPackage(this.order._id);
          if (order) {
            this.order = order;
            this.addressEdit = false;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

  async rescheduleSelectedChildOrders() {
    try {
      const updateProp = {
        increaseOrderDateBy: this.increaseOrderDateBy,
        rescheduleOrder: true
      }
      this.updateChildOrdersProps(updateProp);
      this.editOrderDate = false;
    } catch (error) {
      console.log('reschedule orders error', error)
    }
  }

  confirmRescheduleChildOrders() {
    if (this.increaseOrderDateBy <= 0) {
      this.toasterService.error('Please select the valid number of day to reschedule');
      return;
    }
    this.confirmationModalService.modal(
      `Are you sure, you want to reschedule selected orders date by ${this.increaseOrderDateBy} days?`,
      () => this.rescheduleSelectedChildOrders(),
      this
    );
  }

  cancelReschedule() {
    this.editOrderDate = false;
  }

  async refundToUserWallet() {
    try {
      const order = await this.apiMainService.refundToUserWallet(
        this.order._id,
        this.order.orderType
      );
      if (order && order._id) {
        this.order = { ...order };
        this.checkOrderCondition();
        this.showStopRefund = false;
      }
    } catch (error) {
      console.log('error while getGatewayPaymentHistory order ', error);
    }
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
        order = await this.ddApiMainService.validatePaytmPaymentTransaction({
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

  async getGatewayPaymentHistory() {
    try {
      const history = await this.apiMainService.getGatewayPaymentHistory(
        this.order.order_id
      );
      // console.log('getGatewayPaymentHistory ',history);
      if (history) {
        this.gatwayPaymentHistory = history;
      }
      this.showStopRefund = true;
    } catch (error) {
      console.log('error while getGatewayPaymentHistory order ', error);
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
        await this.ddApiMainService.updatePackageFoodOrder(order);
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

  async confirmRejectOrder() {
    try {
      this.confirmationModalService.modal(
        `Are you sure, you want to Reject this Order`,
        this.rejectOrder,
        this
      );
    } catch (e) {
      console.log('error while cancelling order ', e);
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
        await this.ddApiMainService.updateddPackageFoodOrder(order);
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
        const updateOrder = await this.ddApiMainService.createDailyPackageOrder(
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
              const order = await this.ddApiMainService.getOrderPackage(
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

  async updateChildOrdersProps(updateProp: any) {
    try {
      if (!updateProp) {
        return;
      }
      const subsPackageId = this.orderInput._id;
      const orderIds = this.selectedChildOrderList.map(order => order.foodOrderId) || [];
      const response = await this.apiMainService.updatePendingOrdersProps({ orderIds, updateProp, masterId: subsPackageId });
      if (response) {
        this.orderInput = { ...this.orderInput, ...response };
        this.order = { ...this.orderInput };
        this.selectedChildOrderList = [];
      }
    } catch (error) {
      console.log('error in updating pending child orders props', error)
    }
  }

  async cancelSelectedChildOrders() {
    try {
      const updateProp = {
        orderstatus: 'cancelledByUser'
      }
      this.updateChildOrdersProps(updateProp);
    } catch (error) {
      console.log('cancel orders error', error)
    }
  }

  async confirmCancelChildOrder() {
    try {
      this.confirmationModalService.modal(
        `Are you sure, you want to cancel the selected order(s)?`,
        this.cancelSelectedChildOrders,
        this
      );
    } catch (e) {
      console.log('error while cancelling order ', e);
    }
  }

  handleChildOrdersAction(action: any) {
    if (this.selectedChildOrderList?.length == 0 && action !== 'close_edit_mode') {
      this.toasterService.error(134);
      return;
    }
    switch (action) {
      case 'cancel_order':
        this.confirmCancelChildOrder();
        break;
      case 'change_kitchen': this.orderTransferStart = true;
        break;
      case 'change_address':
        this.editAddress(this.orderInput.customerPhoneNo);
        break;
      case 'reschedule_order': this.editOrderDate = true;
        break;
      case 'close_edit_mode':
        this.childOrdersEditMode = false;
        this.selectedChildOrderList = [];
        break;
      default:
        // default
        break;
    }
  }
}

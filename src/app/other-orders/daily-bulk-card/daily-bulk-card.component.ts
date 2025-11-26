import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { DeliveryOrderService } from 'src/service/delivery-order.service';
import { GoogleMapService } from 'src/service/google-map.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-daily-bulk-card',
  templateUrl: './daily-bulk-card.component.html',
  styleUrls: ['./daily-bulk-card.component.scss']
})
export class DailyBulkCardComponent implements OnInit {
  @Input() orderInput: any;
  @ViewChild('contentkitchen') contentkitchen: any;
  @ViewChild('selectKitchenModal') selectKitchenModal: any;

  imageUrl = environment.imageUrl;

  showless = true;
  order: any;

  editMode = false;
  itemPriceEdit = false;
  oldItemPrice = 0;

  showOrderDetails = true;
  showPOCDetails = false;
  showKitchenDetails = false;
  showPaymentDetails = false;
  showDeliveryDetails = false;
  showStatusHistory = false;
  showOrgDetails = false;

  addDeliveryCost = false;
  orderTransferStart = false;

  nearKitchenFullList: any[] = [];
  nearKitchenList: any[] = [];
  nearestKitchen = '';
  searchedVendor: any = {};
  transferDeliveryCharges = 0;
  showLoadMoreKitchen = true;
  searchVendor: any;
  orderStage = 0;
  kitchenmodal: any;

  constructor(
    private apiMainService: ApiMainService,
    private deliveryOrderService: DeliveryOrderService,
    private sendDataToComponent: SendDataToComponent,
    private confirmationModalService: ConfirmationModalService,
    private modalService: NgbModal,
    private googleMapService: GoogleMapService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    if (this.orderInput) {
      // start with collapsed summary view, but we keep a reference for quick access
      this.order = { ...this.orderInput };
      this.getDeliveryStatus();
      this.checkOrderCondition();
    }
  }

  // ===== UI HELPERS =====

  viewOrder(order: any): void {
    this.order = { ...order };
    this.showless = false;
    this.checkOrderCondition();
  }

  showLess(): void {
    this.showless = true;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  toggleSection(section: 'order' | 'org' | 'kitchen' | 'poc' | 'delivery' | 'payment' | 'status'): void {
    switch (section) {
      case 'order':
        this.showOrderDetails = !this.showOrderDetails;
        break;
      case 'org':
        this.showOrgDetails = !this.showOrgDetails;
        break;
      case 'kitchen':
        this.showKitchenDetails = !this.showKitchenDetails;
        break;
      case 'poc':
        this.showPOCDetails = !this.showPOCDetails;
        break;
      case 'delivery':
        this.showDeliveryDetails = !this.showDeliveryDetails;
        break;
      case 'payment':
        this.showPaymentDetails = !this.showPaymentDetails;
        break;
      case 'status':
        this.showStatusHistory = !this.showStatusHistory;
        break;
    }
  }

  getStatusClass(status?: string): string {
    if (!status) {
      return '';
    }
    const normalized = status.replace(/\s+/g, '');
    return `status-${normalized}`;
  }

  // ===== ITEM AMOUNT / DELIVERY COST =====

  async confirmEditItemPrice(): Promise<void> {
    try {
      const order = { ...this.order };
      await this.apiMainService.updateBulkB2BDailyFoodOrder(order);
      this.itemPriceEdit = false;
      this.checkOrderCondition();
      this.toasterService.success?.(200); // if you have a success code
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
      this.toasterService.error(112);
    }
  }

  async confirmDeliveryCost(): Promise<void> {
    try {
      const order = { ...this.order };
      await this.apiMainService.updateBulkB2BDailyFoodOrder(order);
      this.addDeliveryCost = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmDeliveryCost ', error);
      this.toasterService.error(112);
    }
  }

  editItemPrice(): void {
    this.itemPriceEdit = true;
    this.oldItemPrice = this.order?.itemAmount || 0;
  }

  cancelEditItemPrice(): void {
    this.itemPriceEdit = false;
    this.order.itemAmount = this.oldItemPrice;
  }

  cancelDeliveryCost(): void {
    this.addDeliveryCost = false;
  }

  // ===== ORDER STATUS =====

  async acceptRejectOrder(status: string): Promise<void> {
    try {
      const order = { ...this.order, orderstatus: status };
      await this.apiMainService.updateBulkB2BDailyFoodOrder(order);

      this.order.orderstatus = status;
      this.checkOrderCondition();
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', {
        reload: true,
        _id: this.order._id
      });

      if (status === 'readyForDelivery' && !this.order.startManualDelivery) {
        this.startDeliveryProcess();
      }
    } catch (error) {
      console.log('error while changing status', error);
      this.toasterService.error(112);
    }
  }

  async setManualDelivery(): Promise<void> {
    try {
      const order = await this.apiMainService.updateB2BDailyManualDelivery(this.order._id);
      if (order && order._id) {
        this.order = order;
        this.checkOrderCondition();
      }
    } catch (error) {
      console.log('error while setManualDelivery order ', error);
      this.toasterService.error(112);
    }
  }

  async startDeliveryProcess(): Promise<void> {
    try {
      const deliveryOrder: any = await this.deliveryOrderService.createTask(this.order, 'All', 'DDDaily');
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;
      this.order.deliveryVendor = deliveryOrder.deliveryVendor;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
      this.toasterService.error(112);
    }
  }

  async payAmtToKitchen(): Promise<void> {
    try {
      this.order.orderstatus = 'completed';
      const response = await this.apiMainService.updateBulkB2BDailyFoodOrder(this.order);
      console.log('payment to kitchen successful', response);
      this.checkOrderCondition();
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', {
        reload: true,
        _id: this.order._id
      });
    } catch (error) {
      console.log('error while changing status', error);
      this.toasterService.error(112);
    }
  }

  checkOrderCondition(): void {
    if (!this.order) {
      return;
    }

    this.orderStage = 0;
    switch (this.order.orderstatus) {
      case 'placed':
        this.orderStage = 1;
        break;
      case 'accepted':
        this.orderStage = 2;
        break;
      case 'preparing':
        this.orderStage = 3;
        break;
      case 'readyForDelivery':
        this.getDeliveryStatus();
        this.orderStage = 4;
        break;
      case 'deliveryBoyAssigned':
      case 'handedOverToDeliveryBoy':
      case 'onTheWay':
        this.getDeliveryStatus();
        this.orderStage = 5;
        break;
      case 'delivered':
        this.orderStage = 6;
        break;
      default:
        this.orderStage = 0;
        break;
    }
  }

  // ===== DELIVERY STATUS =====

  async getDeliveryStatus(): Promise<void> {
    try {
      if (this.order && this.order.deliveryTaskId) {
        const deliveryOrderStatus = await this.apiMainService.trackDeliveryTask(
          this.order.deliveryTaskId,
          this.order.deliveryVendor
        );

        this.order.deliveryTaskState = deliveryOrderStatus.state;

        if (deliveryOrderStatus?.eta) {
          this.order.pickupEta = deliveryOrderStatus.eta.pickup;
          this.order.dropoffEta = deliveryOrderStatus.eta.dropoff;
        }

        if (deliveryOrderStatus?.sfx_order_id) {
          this.order.sfx_order_id = deliveryOrderStatus.sfx_order_id;
        }

        if (deliveryOrderStatus?.runner) {
          this.order.runnerName = deliveryOrderStatus.runner.name;
          this.order.runnerPhone = deliveryOrderStatus.runner.phone_number;
          this.order.runnerLocation = deliveryOrderStatus.runner.location;
        }

        if (
          deliveryOrderStatus.state === 'runner_cancelled' ||
          deliveryOrderStatus.state === 'cancelled'
        ) {
          this.order.runnerName = undefined;
          this.order.runnerPhone = undefined;
          this.order.runnerLocation = undefined;
        }

        if (deliveryOrderStatus.state === 'CANCELLED') {
          this.order.deliveryTaskState = 'cancelled';
        }
      } else if (this.orderInput && this.orderInput.deliveryTaskId) {
        const deliveryOrderStatus = await this.apiMainService.trackDeliveryTask(
          this.orderInput.deliveryTaskId,
          this.orderInput.deliveryVendor
        );

        this.orderInput.deliveryTaskState = deliveryOrderStatus.state;

        if (deliveryOrderStatus?.eta) {
          this.orderInput.pickupEta = deliveryOrderStatus.eta.pickup;
          this.orderInput.dropoffEta = deliveryOrderStatus.eta.dropoff;
        }

        if (deliveryOrderStatus?.sfx_order_id) {
          this.orderInput.sfx_order_id = deliveryOrderStatus.sfx_order_id;
        }

        if (deliveryOrderStatus?.runner) {
          this.orderInput.runnerName = deliveryOrderStatus.runner.name;
          this.orderInput.runnerPhone = deliveryOrderStatus.runner.phone_number;
          this.orderInput.runnerLocation = deliveryOrderStatus.runner.location;
        }

        if (
          deliveryOrderStatus.state === 'runner_cancelled' ||
          deliveryOrderStatus.state === 'cancelled'
        ) {
          this.orderInput.runnerName = undefined;
          this.orderInput.runnerPhone = undefined;
          this.orderInput.runnerLocation = undefined;
        }
      }
    } catch (error) {
      console.log('error while fetching delivery status', error);
    }
  }

  // ===== DELIVERY PROVIDER WRAPPERS =====

  async startDunzoDeliveryProcess(): Promise<void> {
    try {
      const deliveryOrder: any = {}; // hook with your service when ready
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;
      this.order.deliveryVendor = deliveryOrder.deliveryVendor;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating DUNZO delivery task', error);
    }
  }

  async startPorterDeliveryProcess(): Promise<void> {
    try {
      const deliveryOrder: any = {}; // integrate when needed
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = 'open';
      this.order.deliveryVendor = 'Porter';
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating PORTER delivery task', error);
    }
  }

  async startShadowFaxDeliveryProcess(): Promise<void> {
    try {
      const deliveryOrder: any = {}; // integrate when needed
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = 'ACCEPTED';
      this.order.deliveryVendor = 'ShadowFax';
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating SHADOWFAX delivery task', error);
    }
  }

  async startPidgeDeliveryProcess(): Promise<void> {
    try {
      const deliveryOrder: any = await this.deliveryOrderService.createTask(
        this.order,
        'PIDGE',
        'DDDaily'
      );
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;
      this.order.deliveryVendor = 'Pidge';
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating PIDGE delivery task', error);
    }
  }

  async cancelPorterDelivery(): Promise<void> {
    try {
      await this.apiMainService.cancelPorterTask(this.order.deliveryTaskId);
      this.getDeliveryStatus();
    } catch (error) {
      console.log('error while cancelling PORTER delivery task', error);
    }
  }

  async cancelShadowFaxDelivery(): Promise<void> {
    try {
      await this.apiMainService.cancelShadowFaxDelivery(this.order.deliveryTaskId);
      this.getDeliveryStatus();
    } catch (error) {
      console.log('error while cancelling SHADOWFAX delivery task', error);
    }
  }

  async cancelPidge3PLOrder(): Promise<void> {
    try {
      await this.apiMainService.cancelPidge3PLOrder(this.order.deliveryTaskId);
      this.getDeliveryStatus();
    } catch (error) {
      console.log('error while cancelling PIDGE delivery task', error);
    }
  }

  // ===== TRANSFER TO ANOTHER KITCHEN =====

  tranferToAnotherKitchen(): void {
    this.orderTransferStart = true;
  }

  async searchNearKitchen(): Promise<void> {
    try {
      const lng = this.order?.customerLocation?.geolocation?.lng;
      const lat = this.order?.customerLocation?.geolocation?.lat;
      if (lng == null || lat == null) {
        this.toasterService.error(112);
        return;
      }

      const kitchenList = await this.apiMainService.getNearestVendors(lng, lat);
      this.nearKitchenFullList = kitchenList || [];
      await this.openKitchen(this.nearKitchenFullList);
    } catch (error) {
      console.log('searchNearKitchen error ', error);
      this.toasterService.error(112);
    }
  }

  async openKitchen(kitchenList: any[]): Promise<void> {
    const topTen = kitchenList.slice(0, 10);
    const enriched = await this.calculateDistance(topTen, 0);
    this.nearKitchenList = enriched as any[];
    this.kitchenmodal = this.modalService.open(this.contentkitchen, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      windowClass: 'menuModel'
    });

    this.kitchenmodal.result.then(
      (result: any) => {
        if (result === 'add') {
          let selectedKitchen: any = {};
          this.nearKitchenList.forEach((k) => {
            if (k._id === this.nearestKitchen) {
              selectedKitchen = k;
            }
          });
          if (selectedKitchen && selectedKitchen._id) {
            this.searchedVendor = { ...selectedKitchen };
          }
        }
        this.nearestKitchen = '';
      },
      () => {
        this.showLoadMoreKitchen = true;
        this.nearestKitchen = '';
      }
    );
  }

  calculateDistance(kitchenList: any[], index: number): Promise<any[]> {
    return new Promise(async (resolve) => {
      try {
        if (index === kitchenList.length) {
          resolve(kitchenList);
        } else {
          const [googleRes, dunzoRes] = await Promise.all([
            this.googleMapService.getKitchenDistance(kitchenList[index], this.order.customerLocation.geolocation),
            this.getDunzoDeliveryDistance(kitchenList[index], this.order.customerLocation.geolocation)
          ]);

          const kitchenObj: any = googleRes;
          if (dunzoRes) {
            kitchenObj.dunzoDistance = dunzoRes.distance;
            kitchenObj.estimated_price = dunzoRes.estimated_price;
          }

          kitchenList[index] = kitchenObj;
          const res = await this.calculateDistance(kitchenList, index + 1);
          resolve(res);
        }
      } catch (error) {
        console.log('error while calculate Distance', error);
        resolve(kitchenList);
      }
    });
  }

  async getDunzoDeliveryDistance(kitchenObj: any, customerLatLng: any): Promise<any> {
    try {
      const kitchenLatLng = kitchenObj.geolocation;
      const deliveryObj = {
        optimised_route: true,
        pickup_details: [{ ...kitchenLatLng, reference_id: 'pickup_location' }],
        drop_details: [{ ...customerLatLng, reference_id: 'drop_location' }]
      };
      const quoteObj = await this.apiMainService.getdeliveryAmount(deliveryObj);
      return quoteObj;
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
      return null;
    }
  }

  async loadMoreKitchen(): Promise<void> {
    const current = this.nearKitchenList.length;
    const next = current + 10;

    if (next >= this.nearKitchenFullList.length) {
      this.showLoadMoreKitchen = false;
    }

    let nextList = this.nearKitchenFullList.slice(current, current + 10);
    nextList = await this.calculateDistance(nextList, 0);
    this.nearKitchenList = [...this.nearKitchenList, ...nextList];
  }

  async getDeliveryChargeQuote(): Promise<void> {
    try {
      const customerLatLng = this.order.customerLocation.geolocation;
      const vendorLatLng = this.searchedVendor.geolocation;
      const deliveryObj = {
        optimised_route: true,
        pickup_details: [{ ...vendorLatLng, reference_id: 'pickup_location' }],
        drop_details: [{ ...customerLatLng, reference_id: 'drop_location' }]
      };
      const quoteObj = await this.apiMainService.getdeliveryAmount(deliveryObj);
      this.transferDeliveryCharges = quoteObj.estimated_price;
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
    }
  }

  async searchKitchen(): Promise<void> {
    try {
      if (!this.searchVendor) {
        return;
      }

      const query = this.searchVendor; // keep as string; backend uses regex
      const vendor = await this.apiMainService.searchVendorProfile(query);

      if (vendor && vendor.length > 0) {
        const newVendor = vendor[0];
        this.searchedVendor = newVendor;
      } else {
        this.toasterService.error(113);
      }
    } catch (error) {
      console.log('searchKitchen error', error);
      this.toasterService.error(112);
    }
  }

  async performOrderTransfer(): Promise<void> {
    try {
      const orderObj = { ...this.order };

      if (orderObj.transferHistory && orderObj.transferHistory.length === 0) {
        orderObj.firstVendorName = orderObj.vendorName;
      }

      orderObj.vendorId = this.searchedVendor._id;
      orderObj.vendorFirmId = this.searchedVendor?.vendorFirmDetails?.vendorFirmId;
      orderObj.vendorFirmName = this.searchedVendor?.vendorFirmDetails?.vendorFirmName;
      orderObj.vendorName = this.searchedVendor.vendorName;
      orderObj.vendorPhoneNo = this.searchedVendor.vendorPhoneNo;
      orderObj.vendorAddress = this.searchedVendor.addressList[0];
      orderObj.vendorGeolocation = this.searchedVendor.addressList[0]?.geolocation;
      orderObj.deliveryByMealaweBoy = this.searchedVendor.deliveryByMealaweBoy;
      orderObj.skipWalletPayment = this.searchedVendor.skipWalletPayment;

      // if (this.searchedVendor.distance) {
      //   orderObj.distance = this.searchedVendor.distance;
      // } else {
      //   const kitchenObj: any = await this.googleMapService.getKitchenDistance(
      //     this.searchedVendor,
      //     this.order.customerLocation.geolocation
      //   );
      //   orderObj.distance = kitchenObj.distance;
      // }

      orderObj.orderTransferred = true;
      orderObj.transferHistory = orderObj.transferHistory || [];
      orderObj.transferHistory.push({
        vendorName: this.order.vendorName,
        vendorFirmName: this.order.vendorFirmName,
        vendorPhoneNo: this.order.vendorPhoneNo
      });

      const order = await this.apiMainService.performBulkDailyOrderTransfer(orderObj);
      if (order && order._id) {
        this.order = { ...order };
      }

      this.cancelTransfer();
    } catch (error) {
      console.log('error while transferring order ', error);
      this.toasterService.error(112);
    }
  }

  confirmTransfer(): void {
    this.confirmationModalService.modal(
      `Are you sure, you want to transfer this order to ${this.searchedVendor?.vendorFirmDetails?.vendorFirmName} - ${this.searchedVendor?.vendorName}?`,
      () => this.performOrderTransfer(),
      this
    );
  }

  cancelTransfer(): void {
    this.orderTransferStart = false;
    this.searchedVendor = {};
    this.searchVendor = '';
  }

  checkdistance(): void {
    const selectedKitchen = this.nearKitchenList.find(
      (k: any) => k._id === this.nearestKitchen
    );

    if (!selectedKitchen) {
      this.toasterService.error(113);
      return;
    }

    if (selectedKitchen.distance > 6) {
      const modalRef = this.modalService.open(this.selectKitchenModal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
        windowClass: 'kitchenModel'
      });

      modalRef.result.then(
        (result) => {
          if (result === 'add') {
            this.selectKitchen();
          }
          this.nearestKitchen = '';
        },
        () => {
          this.showLoadMoreKitchen = true;
          this.nearestKitchen = '';
        }
      );
    } else {
      this.selectKitchen();
    }
  }

  selectKitchen(): void {
    let selectedKitchen: any = {};
    this.nearKitchenList.forEach((kitchen: any) => {
      if (kitchen._id === this.nearestKitchen) {
        selectedKitchen = kitchen;
      }
    });

    if (selectedKitchen && selectedKitchen._id) {
      this.searchedVendor = { ...selectedKitchen };
    }

    if (this.kitchenmodal) {
      this.kitchenmodal.dismiss('add');
    }
  }
}

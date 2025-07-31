import { Component, Input, ViewChild } from '@angular/core';
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
export class DailyBulkCardComponent {
  @Input() orderInput: any;
  @ViewChild("contentkitchen") contentkitchen: any;
  @ViewChild('selectKitchenModal') selectKitchenModal: any;
  imageUrl = environment.imageUrl;
  showless: boolean = true;
  order: any;
  editMode: boolean = false;
  itemPriceEdit = false;
  oldItemPrice = 0;
  showOrderDetails: boolean = true;
  showPOCDetails: boolean = false;
  showKitchenDetails: boolean = false;
  showPaymentDetails: boolean = false;
  showDeliveryDetails: boolean = false;
  showStatusHistory: boolean = false;
  showOrgDetails: boolean = false;
  addDeliveryCost = false;
  orderTransferStart = false;
  nearKitchenFullList: any = [];
  nearKitchenList: any = [];
  nearestKitchen = '';
  searchedVendor: any = {};
  transferDeliveryCharges = 0;
  showLoadMoreKitchen = true;
  searchVendor = '';
  orderStage = 0;
  kitchenmodal:any

  constructor(private apiMainService: ApiMainService, private deliveryOrderService:DeliveryOrderService, private sendDataToComponent:SendDataToComponent, private confirmationModalService:ConfirmationModalService, private modalService:NgbModal,  private googleMapService:GoogleMapService, private toasterService:ToasterService) { }

  ngOnInit(): void {
    console.log(this.orderInput)
  }

  viewOrder(order: any) {
    this.order = order;
    this.showless = false;
    this.checkOrderCondition()
  }

  showLess() {
    this.showless = true;
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  async confirmEditItemPrice() {
    try {
      const order = { ...this.order };
      await this.apiMainService.updateBulkB2BDailyFoodOrder(order);
      this.itemPriceEdit = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
    }
  }

  async confirmDeliveryCost() {
    try {
      const order = { ...this.order };
      await this.apiMainService.updateBulkB2BDailyFoodOrder(order);
      this.addDeliveryCost = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
    }
  }

  async acceptRejectOrder(status: string) {
    try {
      const order = { ...this.order }
      order.orderstatus = status;
      await this.apiMainService.updateBulkB2BDailyFoodOrder(order);
      this.order.orderstatus = status;
      this.checkOrderCondition();
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', { reload: true, _id: this.order._id })
      if (status === 'readyForDelivery' && !this.order.startManualDelivery) {
        this.startDeliveryProcess();
      }
    } catch (error) {
      console.log('error while changing staus', error);
    }
  }

  async setManualDelivery() {
    try {
        const order = await this.apiMainService.updateB2BDailyManualDelivery(this.order._id);
        if (order && order._id) {
          this.order = order;
          this.checkOrderCondition()
        }
    } catch (error) {
      console.log('error while setManualDelivery order ', error)
    }
  }

  async startDeliveryProcess() {
    try {
      const deliveryOrder:any = await this.deliveryOrderService.createTask(this.order, 'All','DDDaily');
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;
      this.order.deliveryVendor = deliveryOrder.deliveryVendor;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }

  async searchNearKitchen() {
    try {
      const kitchenList = await this.apiMainService.getNearestVendors(this.order.customerLocation.geolocation.lng, this.order.customerLocation.geolocation.lat);
      
      this.nearKitchenFullList = kitchenList;
      this.openKitchen(kitchenList);
    } catch (error) {
      console.log('searchNearKitchen error ', error);
    }
  }

  async openKitchen(kitchenList: any) {
    const topFiveKitchen = kitchenList.slice(0, 10);
    const topFive = await this.calculateDistance(topFiveKitchen, 0);
    this.nearKitchenList = topFive;
    this.kitchenmodal = this.modalService.open(this.contentkitchen, { ariaLabelledBy: 'modal-basic-title', size: 'xl', windowClass: 'menuModel' });
    this.kitchenmodal.result.then((result: any) => {
      console.log(`Closed with: ${result}`, kitchenList);
      if (result === 'add') {
        let selectedKitchen: any = {};
        this.nearKitchenList.forEach((kitchen: any) => {
          if (kitchen.loginId === this.nearestKitchen) {
            selectedKitchen = kitchen;
          }
        });
        if (selectedKitchen && selectedKitchen._id) {
          this.searchedVendor = { ...selectedKitchen };
          // this.getDeliveryChargeQuote();
        }
      }
      this.nearestKitchen = '';
    }, (reason: any) => {
      console.log(`Model Dismissed`);
      this.showLoadMoreKitchen = true;
      this.nearestKitchen = '';
    });
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
            this.googleMapService.getKitchenDistance(kitchenList[index], this.order.customerLocation.geolocation),
            this.getDunzoDeliveryDistance(kitchenList[index], this.order.customerLocation.geolocation)
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
        console.log('error while calculate Distance')
      }
    });
  }

  async getDunzoDeliveryDistance(kitchenObj: any, cutomerLatLng: any) {
    try {
      const kitchenLatLng = kitchenObj.geolocation;
      const deliveryObj = {
        optimised_route: true, pickup_details: [{ ...kitchenLatLng, reference_id: 'pickup_location' }],
        drop_details: [{ ...cutomerLatLng, reference_id: 'drop_location' }]
      };
      const quoteObj = await this.apiMainService.getdeliveryAmount(deliveryObj);
      return quoteObj;
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
    }
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
      this.nearKitchenList = [...this.nearKitchenList, ...nextlist];
    }
  }

  async getDeliveryChargeQuote() {
    try {
      const cutomerLatLng = this.order.customerLocation.geolocation;
      const vendorLatLng = this.searchedVendor.geolocation;
      const deliveryObj = {
        optimised_route: true, pickup_details: [{ ...vendorLatLng, reference_id: 'pickup_location' }],
        drop_details: [{ ...cutomerLatLng, reference_id: 'drop_location' }]
      };
      const quoteObj = await this.apiMainService.getdeliveryAmount(deliveryObj);
      this.transferDeliveryCharges = quoteObj.estimated_price
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
    }
  }

  async searchKitchen() {
    try {
      console.log('searchKitenLogingId ', this.searchVendor);
      if (this.searchVendor) {
        this.searchVendor = this.searchVendor.toUpperCase();
        const vendor = await this.apiMainService.searchVendorProfile(this.searchVendor);
        console.log(vendor);
        
        if (vendor.length > 0) {
          let newVendor = vendor[0]
            // if (kitchen.kitchenOpened) {
              const vendorObj: any = await this.googleMapService.getKitchenDistance(newVendor, this.order.customerLocation.geolocation);
              this.searchedVendor = { ...vendorObj };
              // this.getDeliveryChargeQuote();
            // } else {
            //   this.toasterService.error(115);
            // }
        } else {
          this.toasterService.error(113);
        }
      }
    } catch (error) {
      this.toasterService.error(112);
    }
  }

  async performOrderTransfer() {
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
      orderObj.vendorAddress = this.searchedVendor.address;
      orderObj.vendorGeolocation = this.searchedVendor.geolocation;
      orderObj.deliveryByMealaweBoy = this.searchedVendor.deliveryByMealaweBoy;
      orderObj.skipWalletPayment = this.searchedVendor.skipWalletPayment;
      if (this.searchedVendor.distance) {
        orderObj.distance = this.searchedVendor.distance;
      } else {
        const kitchenObj: any = await this.googleMapService.getKitchenDistance(this.searchedVendor, this.order.customerLocation.geolocation)
        orderObj.distance = kitchenObj.distance;
      }
      orderObj.orderTransferred = true;
      orderObj.transferHistory = orderObj.transferHistory ? orderObj.transferHistory : [];
      orderObj.transferHistory.push({ vendorName: this.order.vendorName, vendorFirmName: this.order.vendorFirmName, vendorPhoneNo: this.order.vendorPhoneNo });
      
      const order = await this.apiMainService.performBulkDailyOrderTransfer(orderObj);
      if (order && order._id) {
        this.order = { ...order };
      }
      this.cancelTransfer();
    } catch (error) {
      console.log('error while tranferring order ', error);
    }
  }

  confirmTransfer() {
    this.confirmationModalService.modal(`Are you sure, you want to transfer this order to ${this.searchedVendor?.vendorFirmDetails?.vendorFirmName} - ${this.searchedVendor?.vendorName} `,
      () => this.performOrderTransfer(), this);
  }

  cancelTransfer() {
    this.orderTransferStart = false;
    this.searchedVendor = {};
    this.searchVendor = '';
  }

  async payAmtToKitchen() {
    try {
      this.order.orderstatus = 'completed';
      const response = await this.apiMainService.updateBulkB2BDailyFoodOrder(this.order);
      // await this.apiMainService.payServerFoodOrderAmtToKitchenDirect({ ids: [this.order.orderNo],server:'DDDaily' });

      console.log('payment to kitchen successfull', response);
      this.checkOrderCondition();
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', { reload: true, _id: this.order._id })
    } catch (error) {
      console.log('error while changing staus', error);
    }
  }

  checkOrderCondition() {
    console.log('checkOrderCondition...');
    if (this.order) {
      this.orderStage = 0;
      if (this.order.orderstatus === 'placed') {
        this.orderStage = 1;
      }
      if (this.order.orderstatus === 'accepted') {
        this.orderStage = 2;
      } else if (this.order.orderstatus === 'preparing') {
        this.orderStage = 3;
      }  else if (this.order.orderstatus === 'readyForDelivery') {
        this.getDeliveryStatus();
        this.orderStage = 4;
      } else if (this.order.orderstatus === 'deliveryBoyAssigned'
        || this.order.orderstatus === 'handedOverToDeliveryBoy'
        || this.order.orderstatus === 'onTheWay') {
        this.getDeliveryStatus();
        this.orderStage = 5;
      } else if (this.order.orderstatus === 'delivered') {
        this.orderStage = 6;
      }
    }
  }

  async getDeliveryStatus() {
 console.log("status", this.order)
    if (this.order && this.order.deliveryTaskId) {
      try {
        const deliveryOrderStatus = await this.apiMainService.trackDeliveryTask(this.order.deliveryTaskId, this.order.deliveryVendor);
        this.order.deliveryTaskState = deliveryOrderStatus.state;
        console.log(deliveryOrderStatus.state)
        if (deliveryOrderStatus && deliveryOrderStatus.eta) {
          this.order.pickupEta = deliveryOrderStatus.eta.pickup;
          this.order.dropoffEta = deliveryOrderStatus.eta.dropoff;
        }
        if(deliveryOrderStatus && deliveryOrderStatus.sfx_order_id){
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
        if(deliveryOrderStatus.state === 'CANCELLED'){
          this.order.deliveryTaskState = 'cancelled';
        }
      } catch (error) {
        console.log('error while creating delivery task', error);
      }
    }
    else if (this.orderInput && this.orderInput.deliveryTaskId) {
      try {
        const deliveryOrderStatus = await this.apiMainService.trackDeliveryTask(this.orderInput.deliveryTaskId, this.orderInput.deliveryVendor);
        this.orderInput.deliveryTaskState = deliveryOrderStatus.state;
        if (deliveryOrderStatus && deliveryOrderStatus.eta) {
          this.orderInput.pickupEta = deliveryOrderStatus.eta.pickup;
          this.orderInput.dropoffEta = deliveryOrderStatus.eta.dropoff;
        }
        if(deliveryOrderStatus && deliveryOrderStatus.sfx_order_id){
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

  async startDunzoDeliveryProcess() {
    try {
      // const deliveryOrder:any = await this.deliveryOrderService.createTask(this.order, 'DUNZO','DDDaily');
      const deliveryOrder:any = {}
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;
      this.order.deliveryVendor = deliveryOrder.deliveryVendor;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }

  async startPorterDeliveryProcess() {
    try {
      // const deliveryOrder:any = await this.deliveryOrderService.createTask(this.order, 'PORTER','DDDaily');
      const deliveryOrder:any = {}
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = 'open';
      this.order.deliveryVendor = 'Porter';
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }

  async startShadowFaxDeliveryProcess() {
    try {
      // const deliveryOrder:any = await this.deliveryOrderService.createTask(this.order, 'SHADOWFAX','DDDaily');
      const deliveryOrder:any = {}
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = 'ACCEPTED';
      this.order.deliveryVendor = 'ShadowFax';
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }

  async startPidgeDeliveryProcess() {
    try {
      const deliveryOrder:any = await this.deliveryOrderService.createTask(this.order, 'PIDGE','DDDaily');
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;;
      this.order.deliveryVendor = 'Pidge';
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }


  async cancelPorterDelivery() {
    try {
      await this.apiMainService.cancelPorterTask(this.order.deliveryTaskId);
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }

  async cancelShadowFaxDelivery() {
    try {
      await this.apiMainService.cancelShadowFaxDelivery(this.order.deliveryTaskId);
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }

  async cancelPidge3PLOrder() {
    try {
      await this.apiMainService.cancelPidge3PLOrder(this.order.deliveryTaskId);
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }

  editItemPrice() {
    this.itemPriceEdit = true;
    this.oldItemPrice = this.order.itemAmount;
  }

  cancelEditItemPrice() {
    this.itemPriceEdit = false;
    this.order.itemAmount = this.oldItemPrice;
  }

  cancelDeliveryCost() {
    this.addDeliveryCost = false;
  }

  tranferToAnotherKitchen() {
    this.orderTransferStart = true;
  }

  checkdistance() {
    const selectedKitchen = this.nearKitchenList.find((kitchen: any) => {
      return kitchen._id == this.nearestKitchen;
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
    }else{
      this.selectKitchen();
    }
  }

  selectKitchen() {
    let selectedKitchen: any = {};
    this.nearKitchenList.forEach((kitchen: any) => {
      if (kitchen._id === this.nearestKitchen) {
        selectedKitchen = kitchen;
      }
    });
    if (selectedKitchen && selectedKitchen._id) {
      this.searchedVendor = { ...selectedKitchen };
      // this.getDeliveryChargeQuote();
    }
    this.kitchenmodal.dismiss('add');
  }

}

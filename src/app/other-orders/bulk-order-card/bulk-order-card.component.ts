import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { B2bInvoiceService } from 'src/service/b2b-invoice.service';
import { DeliveryOrderService } from 'src/service/delivery-order.service';
import { GoogleMapService } from 'src/service/google-map.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-bulk-order-card',
  templateUrl: './bulk-order-card.component.html',
  styleUrls: ['./bulk-order-card.component.scss']
})
export class BulkOrderCardComponent {
 @ViewChild("contentkitchen") contentkitchen: any;
  @ViewChild("selectKitchenModal") selectKitchenModal:any;
  @Input() orderInput: any;
  imageUrl = environment.imageUrl;
  showless:boolean = true;
  order:any;
  editMode: boolean = false;
  showOrderDetails: boolean = true;
  showCustomerDetails: boolean = false;
  showKitchenDetails: boolean = false;
  showPaymentDetails: boolean = false;
  showStatusHistory: boolean = false;
  showDeliveryDetails: boolean = false;

  itemPriceEdit = false;
  packagingPriceEdit = false;
  oldItemPrice = 0;
  oldPackagingPrice = 0;
  addDeliveryCost = false;

  orderTransferStart: boolean = false;
  searchedVendor: any = {};
  searchVendor = '';
  transferDeliveryCharges = 0;
  nearKitchenFullList: any = [];
  nearVendorList: any = [];
  nearestVendor = '';
  showLoadMoreKitchen = true;
  orderStage = 0;
  kitchenmodal:any;

  constructor(private sendDataToComponent:SendDataToComponent, private deliveryOrderService:DeliveryOrderService, private modalService:NgbModal, private confirmationModalService:ConfirmationModalService, private googleMapService:GoogleMapService, private apiMainService:ApiMainService, private toasterService:ToasterService,  private b2bInvoice:B2bInvoiceService){}

  ngOnInit(): void {
    console.log(this.orderInput)
  }

  viewOrder(order: any) {
    this.order = order;
    this.showless = false;
    this.checkOrderCondition()
    // this.preparePage();
  }

  showLess() {
    this.showless = true;
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  async acceptRejectOrder(status: string) {
    try {
      const order = { ...this.order }
      order.orderstatus = status;
      await this.apiMainService.updateb2bFoodOrder(order);
      this.order.orderstatus = status;
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', { reload: true, _id: this.order._id })
      console.log(this.order.startManualDelivery)
      if (status === 'readyForDelivery' && !this.order.startManualDelivery) {
        this.startDeliveryProcess();
      }
    } catch (error) {
      console.log('error while changing staus', error);
    }
  }

 
  async startPorterDeliveryProcess() {
    try {
      const deliveryOrder = await this.deliveryOrderService.createTask(this.order, 'PORTER','DDBulk');
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
      const deliveryOrder = await this.deliveryOrderService.createTask(this.order, 'SHADOWFAX','DDBulk');
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
      const deliveryOrder = await this.deliveryOrderService.createTask(this.order, 'PIDGE','DDBulk');
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

  async startDeliveryProcess() {
    try {
      const deliveryOrder = await this.deliveryOrderService.createTask(this.order, 'All','DDBulk');
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;
      this.order.deliveryVendor = deliveryOrder.deliveryVendor;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
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
      } else if (this.order.orderstatus === 'inprogress' || this.order.orderstatus === 'preparing') {
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

  invoice(type:any){
    // if(type === 'view'){
    //   this.b2bInvoice.view(this.order);
    // }
    // else if(type === 'download'){
    //   this.b2bInvoice.download(this.order);
    // }
    // else if(type === 'mail'){
      this.apiMainService.generateInvoice(this.orderInput._id);
    // }
  }

  async confirmEditItemPrice() {
    try {
      const order = { ...this.order };
      await this.apiMainService.updateb2bFoodOrder(order);
      this.itemPriceEdit = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
    }
  }

  async confirmEditPackagingPrice() {
    try {
      const order = { ...this.order };
      await this.apiMainService.updateb2bFoodOrder(order);
      this.packagingPriceEdit = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
    }
  }

  async confirmDeliveryCost() {
    try {
      const order = { ...this.order };
      await this.apiMainService.updateb2bFoodOrder(order);
      this.addDeliveryCost = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
    }
  }

  async searchKitchen() {
    try {
      console.log('searchVendor ', this.searchVendor);
      if (this.searchVendor) {
        this.searchVendor = this.searchVendor.toUpperCase();
         const vendor = await this.apiMainService.searchVendorProfile(this.searchVendor);
       if (vendor.length > 0) {
          let newVendor = vendor[0]
              const vendorObj: any = await this.googleMapService.getKitchenDistance(newVendor, this.order.customerLocation.geolocation);
              this.searchedVendor = { ...vendorObj };
              // this.getDeliveryChargeQuote();
          //   } else {
          //     this.toasterService.error(115);
          //   }
          // } else {
          //   this.toasterService.error(114);
          // }
        } else {
          this.toasterService.error(113);
        }
      }
    } catch (error) {
      this.toasterService.error(112);
    }
  }

  async getDeliveryChargeQuote() {
    try {
      const cutomerLatLng = this.order.customerLocation.geolocation;
      const kitchenLatLng = this.searchedVendor.geolocation;
      const deliveryObj = {
        optimised_route: true, pickup_details: [{ ...kitchenLatLng, reference_id: 'pickup_location' }],
        drop_details: [{ ...cutomerLatLng, reference_id: 'drop_location' }]
      };
      // const quaotObj = await this.apiMainService.getdeliveryAmount(deliveryObj);
      const quaotObj:any = {}
      this.transferDeliveryCharges = quaotObj.estimated_price
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
    }
  }

  confirmTransfer() {
    this.confirmationModalService.modal(`Are you sure, you want to transfer this order to ${this.searchedVendor?.vendorFirmDetails?.vendorFirmName} - ${this.searchedVendor?.vendorName}`,
      () => this.performOrderTransfer(), this);
  }

  async performOrderTransfer() {
    try {
      const orderObj = { ...this.order };
      if (orderObj.transferHistory && orderObj.transferHistory.length === 0) {
        orderObj.firstKitchenName = orderObj.vendorName;
      }
     orderObj.vendorId = this.searchedVendor._id;
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
      // orderObj.transferExtraAmt = this.transferExtraAmt ? this.transferExtraAmt : 0;
      // orderObj.reduceExtraAmt = this.reduceExtraAmt ? this.reduceExtraAmt : 0;
      orderObj.orderTransferred = true;
      orderObj.transferHistory = orderObj.transferHistory ? orderObj.transferHistory : [];
      orderObj.transferHistory.push({ vendorName: this.order.vendorName, vendorFirmName: this.order.vendorFirmName, vendorPhoneNo: this.order.vendorPhoneNo });
      const order = await this.apiMainService.performBulkOrderTransfer(orderObj);
      if (order && order._id) {
        this.order = { ...order };
      }
      this.cancelTransfer();
    } catch (error) {
      console.log('error while tranferring order ', error);
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
    this.nearVendorList = topFive;
    this.kitchenmodal = this.modalService.open(this.contentkitchen, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      windowClass: 'menuModel',
    });

    this.kitchenmodal.result.then(
      (result:any) => {
      console.log(`Closed with: ${result}`, kitchenList);
      if (result === 'add') {
        let selectedKitchen: any = {};
        this.nearVendorList.forEach((kitchen: any) => {
          if (kitchen._id === this.nearestVendor) {
            selectedKitchen = kitchen;
          }
        });
        if (selectedKitchen && selectedKitchen._id) {
          this.searchedVendor = { ...selectedKitchen };
          // this.getDeliveryChargeQuote();
        }
      }
      this.nearestVendor = '';
    }, (reason: any) => {
      console.log(`Model Dismissed`);
      this.showLoadMoreKitchen = true;
      this.nearestVendor = '';
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
      // const quaotObj = await this.apiMainService.getdeliveryAmount(deliveryObj);
      const quaotObj:any = {}
      return quaotObj;
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
    }
  }

  async loadMoreKitchen() {
    const currentListLength = this.nearVendorList.length;
    const nextListLength = currentListLength + 10;
    if (nextListLength > this.nearKitchenFullList.length) {
      //hide loadMore
      this.showLoadMoreKitchen = false;
    } else {
      let nextlist = this.nearKitchenFullList.slice(this.nearVendorList.length, this.nearVendorList.length + 10);
      nextlist = await this.calculateDistance(nextlist, 0);
      this.nearVendorList = [...this.nearVendorList, ...nextlist];
    }
  }

  async payAmtToKitchen() {
    try {
      this.order.orderstatus = 'completed';
      const response = await this.apiMainService.updateb2bFoodOrder(this.order);
      // await this.apiMainService.payServerFoodOrderAmtToKitchenDirect({ ids: [this.order.orderNo], server:'DDBulk' });
      console.log('payment to kitchen successfull', response);
      this.checkOrderCondition();
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', { reload: true, _id: this.order._id })
    } catch (error) {
      console.log('error while changing staus', error);
    }
  }

  editItemPrice() {
    this.itemPriceEdit = true;
    this.oldItemPrice = this.order.itemAmount;
  }
  editPackagingPrice() {
    this.packagingPriceEdit = true;
    this.oldPackagingPrice = this.order.packagingCost;
  }

  cancelEditItemPrice() {
    this.itemPriceEdit = false;
    this.order.itemAmount = this.oldItemPrice;
  }
  cancelEditPackagingPrice() {
    this.packagingPriceEdit = false;
    this.order.packagingCost = this.oldPackagingPrice;
  }
  cancelDeliveryCost() {
    this.addDeliveryCost = false;
  }

  tranferToAnotherKitchen() {
    this.orderTransferStart = true;
  }

  cancelTransfer() {
    this.orderTransferStart = false;
    this.searchedVendor = {};
    this.searchVendor = '';
  }

   checkdistance() {
    const selectedKitchen = this.nearVendorList.find((kitchen: any) => {
      return kitchen._id == this.nearestVendor;
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

          this.nearestVendor = '';
        },
        (reason) => {
          console.log(`Model Dismissed`);
          this.showLoadMoreKitchen = true;
          this.nearestVendor = '';
        }
      );
    }else{
      this.selectKitchen();
    }
  }

  selectKitchen() {
    let selectedKitchen: any = {};
    this.nearVendorList.forEach((kitchen: any) => {
      if (kitchen._id === this.nearestVendor) {
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

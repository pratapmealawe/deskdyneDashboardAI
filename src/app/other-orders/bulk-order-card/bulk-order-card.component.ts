import { Component, Input, ViewChild, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ToasterService } from 'src/service/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { DeliveryOrderService } from 'src/service/delivery-order.service';
import { GoogleMapService } from 'src/service/google-map.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-bulk-order-card',
  templateUrl: './bulk-order-card.component.html',
  styleUrls: ['./bulk-order-card.component.scss']
})
export class BulkOrderCardComponent implements OnInit {
  @ViewChild('contentkitchen') contentkitchen: any;
  @ViewChild('selectKitchenModal') selectKitchenModal: any;
  @Input() orderInput: any;
  @Output() statusChange = new EventEmitter<boolean>();
  imageUrl = environment.imageUrl;

  showless: boolean = true;
  order: any;

  editMode: boolean = false;

  showOrderDetails: boolean = true;
  showCustomerDetails: boolean = false;
  showKitchenDetails: boolean = false;
  showOrgDetails: boolean = false;       // used by Org expansion panel
  showPaymentDetails: boolean = false;
  showStatusHistory: boolean = false;
  showDeliveryDetails: boolean = false;
  showTransferPanel: boolean = false;

  itemPriceEdit = false;
  packagingPriceEdit = false;
  oldItemPrice = 0;
  oldPackagingPrice = 0;
  addDeliveryCost = false;

  orderTransferStart: boolean = false;
  searchedVendor: any = {};
  searchVendor: any;
  transferDeliveryCharges = 0;

  nearKitchenFullList: any[] = [];
  nearVendorList: any[] = [];
  nearestVendor = '';
  showLoadMoreKitchen = true;
  orderStage = 0;
  kitchenmodal: any;

  vendorForm!: FormGroup;
  vendorFirmList: any[] = [];
  vendorList: any[] = [];
  isVendorAssigned: boolean = false;

  constructor(
    private sendDataToComponent: SendDataToComponent,
    private deliveryOrderService: DeliveryOrderService,
    private modalService: NgbModal,
    private confirmationModalService: ConfirmationModalService,
    private googleMapService: GoogleMapService,
    private apiMainService: ApiMainService,
    private toasterService: ToasterService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    // For summary card we can still show live delivery status if taskId is present
    this.getDeliveryStatus();
    this.initializeForm();
    this.getVendors();
  }

  /** Map status to CSS class for chips */
  getStatusClass(status: string): string {
    if (!status) return '';
    const okStatuses = ['placed', 'accepted', 'delivered', 'completed', 'preApproved'];
    const badStatuses = ['declined', 'cancelled'];
    if (okStatuses.includes(status)) return 'green';
    if (badStatuses.includes(status)) return 'red';
    return 'yellow';
  }

  viewOrder(order: any) {
    this.order = order;
    this.showless = false;
    this.checkOrderCondition();
    this.checkIsVendorAssigned();
  }

  showLess() {
    this.showless = true;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.checkIsVendorAssigned();
  }

  async acceptRejectOrder(status: string) {
    if (status === 'preparing') {
      const isVendorAssigned = !!this.order?.vendorPhoneNo;
      if (!isVendorAssigned) {
        this.showVendorToaster();
        return;
      }
    }
    try {

      const updatedOrder = { ...this.order };
      const adminId = this.localStorageService.getCacheData('ADMIN_ID');
      if (adminId) {
        updatedOrder.actionBy = adminId;
      }
      updatedOrder.orderstatus = status;
      await this.apiMainService.updateb2bFoodOrder(updatedOrder);

      this.order.orderstatus = status;
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', {
        reload: true,
        _id: this.order._id
      });

      if (status === 'readyForDelivery' && !this.order.startManualDelivery) {
        this.startDeliveryProcess();
      }
      this.statusChange.emit(true);
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while changing status', error);
    }
  }

  showVendorToaster() {
    this.toasterService.warning(301);
  }

  async startPorterDeliveryProcess() {
    try {
      const deliveryOrder = await this.deliveryOrderService.createTask(
        this.order,
        'PORTER',
        'DDBulk'
      );
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
      const deliveryOrder = await this.deliveryOrderService.createTask(
        this.order,
        'SHADOWFAX',
        'DDBulk'
      );
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
      const deliveryOrder = await this.deliveryOrderService.createTask(
        this.order,
        'PIDGE',
        'DDBulk'
      );
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;
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
      console.log('error while cancelling Porter task', error);
    }
  }

  async cancelShadowFaxDelivery() {
    try {
      await this.apiMainService.cancelShadowFaxDelivery(this.order.deliveryTaskId);
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while cancelling ShadowFax task', error);
    }
  }

  async cancelPidge3PLOrder() {
    try {
      await this.apiMainService.cancelPidge3PLOrder(this.order.deliveryTaskId);
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while cancelling Pidge order', error);
    }
  }

  async startDeliveryProcess() {
    try {
      const deliveryOrder = await this.deliveryOrderService.createTask(
        this.order,
        'All',
        'DDBulk'
      );
      this.order.deliveryTaskId = deliveryOrder.deliveryTaskId;
      this.order.deliveryTaskState = deliveryOrder.deliveryTaskState;
      this.order.deliveryVendor = deliveryOrder.deliveryVendor;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while creating delivery task', error);
    }
  }

  async setManualDelivery(): Promise<void> {
    try {
      const order = await this.apiMainService.updateB2BManualDelivery(this.order._id);
      if (order && order._id) {
        this.order = order;
        this.checkOrderCondition();
      }
    } catch (error) {
      console.log('error while setManualDelivery order ', error);
      this.toasterService.error(112);
    }
  }

  checkOrderCondition() {
    if (this.order) {
      this.orderStage = 0;

      if (this.order.orderstatus === 'placed') {
        this.orderStage = 1;
      }

      if (this.order.orderstatus === 'accepted') {
        this.orderStage = 2;
      } else if (
        this.order.orderstatus === 'inprogress' ||
        this.order.orderstatus === 'preparing'
      ) {
        this.orderStage = 3;
      } else if (this.order.orderstatus === 'readyForDelivery') {
        this.getDeliveryStatus();
        this.orderStage = 4;
      } else if (
        this.order.orderstatus === 'deliveryBoyAssigned' ||
        this.order.orderstatus === 'handedOverToDeliveryBoy' ||
        this.order.orderstatus === 'onTheWay'
      ) {
        this.getDeliveryStatus();
        this.orderStage = 5;
      } else if (this.order.orderstatus === 'delivered') {
        this.orderStage = 6;
      }
    }
  }

  async getDeliveryStatus() {
    // Detailed view (this.order) has priority
    if (this.order && this.order.deliveryTaskId) {
      try {
        await this.deliveryOrderService.trackDeliveryTask(
          this.order,
          this.order.deliveryVendor
        );
      } catch (error) {
        console.log('error while tracking delivery task', error);
      }
    }
    // Summary view, we still want live status
    else if (this.orderInput && this.orderInput.deliveryTaskId) {
      try {
        await this.deliveryOrderService.trackDeliveryTask(
          this.orderInput,
          this.orderInput.deliveryVendor
        );
      } catch (error) {
        console.log('error while tracking delivery task', error);
      }
    }
  }

  invoice(type: any) {
    // If you later want to separate view/download/mail, you can uncomment
    // and use b2bInvoice service accordingly.
    // if (type === 'view') {
    //   this.b2bInvoice.view(this.order);
    // } else if (type === 'download') {
    //   this.b2bInvoice.download(this.order);
    // } else if (type === 'mail') {
    //   this.b2bInvoice.mail(this.order);
    // }
    this.apiMainService.generateInvoice(this.orderInput._id);
  }

  async confirmEditItemPrice() {
    try {
      const updatedOrder = { ...this.order };
      await this.apiMainService.updateb2bFoodOrder(updatedOrder);
      this.itemPriceEdit = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditItemPrice ', error);
    }
  }

  async confirmEditPackagingPrice() {
    try {
      const updatedOrder = { ...this.order };
      await this.apiMainService.updateb2bFoodOrder(updatedOrder);
      this.packagingPriceEdit = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmEditPackagingPrice ', error);
    }
  }

  async confirmDeliveryCost() {
    try {
      const updatedOrder = { ...this.order };
      await this.apiMainService.updateb2bFoodOrder(updatedOrder);
      this.addDeliveryCost = false;
      this.checkOrderCondition();
    } catch (error) {
      console.log('error while confirmDeliveryCost ', error);
    }
  }

  async searchKitchen() {
    try {
      if (!this.searchVendor) {
        return;
      }

      const keyword = this.searchVendor
      const vendorList = await this.apiMainService.searchVendorProfile(keyword);

      if (vendorList && vendorList.length > 0) {
        const newVendor = vendorList[0];
        this.searchedVendor = newVendor;
      } else {
        this.toasterService.error(113);
      }
    } catch (error) {
      console.log('searchKitchen error', error);
      this.toasterService.error(112);
    }
  }

  async getDeliveryChargeQuote() {
    try {
      const cutomerLatLng = this.order.customerLocation.geolocation;
      const kitchenLatLng = this.searchedVendor.geolocation;
      const deliveryObj = {
        optimised_route: true,
        pickup_details: [{ ...kitchenLatLng, reference_id: 'pickup_location' }],
        drop_details: [{ ...cutomerLatLng, reference_id: 'drop_location' }]
      };
      // const quaotObj = await this.apiMainService.getdeliveryAmount(deliveryObj);
      const quaotObj: any = {};
      this.transferDeliveryCharges = quaotObj.estimated_price;
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
    }
  }

  confirmTransfer() {
    this.confirmationModalService.modal({
      msg: `Are you sure, you want to transfer this order to ${this.searchedVendor?.vendorFirmDetails?.vendorFirmName} - ${this.searchedVendor?.vendorName}`,
      callback: () => this.performOrderTransfer(),
      context: this
    });
  }

  async performOrderTransfer() {
    try {
      const orderObj = { ...this.order };

      if (orderObj.transferHistory && orderObj.transferHistory.length === 0) {
        orderObj.firstKitchenName = orderObj.vendorName;
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
      orderObj.transferHistory = orderObj.transferHistory ? orderObj.transferHistory : [];
      orderObj.transferHistory.push({
        vendorName: this.order.vendorName,
        vendorFirmName: this.order.vendorFirmName,
        vendorPhoneNo: this.order.vendorPhoneNo
      });

      const updatedOrder = await this.apiMainService.performBulkOrderTransfer(orderObj);
      if (updatedOrder && updatedOrder._id) {
        this.order = { ...updatedOrder };
      }

      this.cancelTransfer();
    } catch (error) {
      console.log('error while tranferring order ', error);
    }
  }

  async searchNearKitchen() {
    try {
      const kitchenList = await this.apiMainService.getNearestVendors(
        this.order.customerLocation.geolocation.lng,
        this.order.customerLocation.geolocation.lat
      );

      this.nearKitchenFullList = kitchenList;
      this.openKitchen(kitchenList);
    } catch (error) {
      console.log('searchNearKitchen error ', error);
    }
  }

  async openKitchen(kitchenList: any[]) {
    const topTenKitchen = kitchenList.slice(0, 10);
    const topTen = await this.calculateDistance(topTenKitchen, 0);
    this.nearVendorList = topTen as any[];

    this.kitchenmodal = this.modalService.open(this.contentkitchen, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      windowClass: 'menuModel'
    });

    this.kitchenmodal.result.then(
      (result: any) => {
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
      },
      (reason: any) => {
        console.log(`Modal Dismissed`);
        this.showLoadMoreKitchen = true;
        this.nearestVendor = '';
      }
    );
  }

  async calculateDistance(kitchenList: any[], index: number): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (index === kitchenList.length) {
          resolve(kitchenList);
        } else {
          const response = await Promise.all([
            this.googleMapService.getKitchenDistance(
              kitchenList[index],
              this.order.customerLocation.geolocation
            ),
            this.getDunzoDeliveryDistance(
              kitchenList[index],
              this.order.customerLocation.geolocation
            )
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
        reject(error);
      }
    });
  }

  async getDunzoDeliveryDistance(kitchenObj: any, cutomerLatLng: any) {
    try {
      const kitchenLatLng = kitchenObj.geolocation;
      const deliveryObj = {
        optimised_route: true,
        pickup_details: [{ ...kitchenLatLng, reference_id: 'pickup_location' }],
        drop_details: [{ ...cutomerLatLng, reference_id: 'drop_location' }]
      };
      // const quaotObj = await this.apiMainService.getdeliveryAmount(deliveryObj);
      const quaotObj: any = {};
      return quaotObj;
    } catch (error) {
      console.log('error while fetching dunzo quote ', error);
    }
  }

  async loadMoreKitchen() {
    const currentListLength = this.nearVendorList.length;
    const nextListLength = currentListLength + 10;

    if (nextListLength > this.nearKitchenFullList.length) {
      // hide loadMore
      this.showLoadMoreKitchen = false;
    } else {
      let nextlist = this.nearKitchenFullList.slice(
        this.nearVendorList.length,
        this.nearVendorList.length + 10
      );
      nextlist = await this.calculateDistance(nextlist, 0);
      this.nearVendorList = [...this.nearVendorList, ...nextlist];
    }
  }

  async payAmtToKitchen() {
    try {
      this.order.orderstatus = 'completed';
      const response = await this.apiMainService.updateb2bFoodOrder(this.order);
      // await this.apiMainService.payServerFoodOrderAmtToKitchenDirect({ ids: [this.order.orderNo], server:'DDBulk' });
      console.log('payment to kitchen successful', response);
      this.checkOrderCondition();
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', {
        reload: true,
        _id: this.order._id
      });
      this.statusChange.emit(true);
    } catch (error) {
      console.log('error while changing status', error);
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
    this.showTransferPanel = true; // open the accordion
  }

  cancelTransfer() {
    this.orderTransferStart = false;
    this.showTransferPanel = false; // close the accordion
    this.searchedVendor = {};
    this.searchVendor = '';
  }

  checkdistance() {
    const selectedKitchen = this.nearVendorList.find((kitchen: any) => {
      return kitchen._id === this.nearestVendor;
    });

    if (selectedKitchen && selectedKitchen.distance > 6) {
      const modalRef = this.modalService.open(this.selectKitchenModal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
        windowClass: 'kitchenModel'
      });
      modalRef.result.then(
        (result: any) => {
          if (result === 'add') {
            this.selectKitchen();
          }
          this.nearestVendor = '';
        },
        (reason: any) => {
          console.log(`Modal Dismissed`);
          this.showLoadMoreKitchen = true;
          this.nearestVendor = '';
        }
      );
    } else {
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

    if (this.kitchenmodal) {
      this.kitchenmodal.dismiss('add');
    }
  }

  onClickChangeVendor(changeVendor: TemplateRef<any>) {
    this.modalService.open(changeVendor,
      {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg',
        windowClass: 'changeVendorModel'
      });
  }

  async confirmChangeVendor() {
    if (this.vendorForm.invalid) return;

    const payload = {
      orderId: this.order._id,
      ...this.vendorForm.value
    };
    try {
      const result = await this.apiMainService.B2B_changeVendor(payload);
      if (result) {
        this.statusChange.emit(true);
        this.vendorForm.reset();
        this.toasterService.success('Vendor changed successfully');
        this.modalService.dismissAll();
      }
    } catch (e) {
      console.error('Change vendor failed', e);
    }

  }

  cancelChangeVendor() {
    this.vendorForm.reset();
    this.vendorForm.get('vendorId')?.setValue('');
    this.modalService.dismissAll();
  }

  onVendorFirmChange(event: any) {
    this.apiMainService.getVendorFirmById(event.value).then((res) => {
      if (res) {
        this.vendorForm.get('vendorFirmId')?.setValue(res._id);
        this.vendorForm.get('vendorFirmName')?.setValue(res.vendorFirmName);
        this.vendorList = this.vendorFirmList.find((firm: any) => firm.vendorFirmDetails.vendorFirmId === event.value)?.vendorList;
      }
    })
  }

  onVendorChange(event: any) {
    const vendor = this.vendorList.find((vendor: any) => vendor._id === event.value);
    this.vendorForm.get('vendorId')?.setValue(vendor._id);
    this.vendorForm.get('vendorName')?.setValue(vendor.vendorName);
    this.vendorForm.get('vendorPhoneNo')?.setValue(vendor.vendorPhoneNo);
    this.vendorForm.get('vendorAddress.address1')?.setValue(vendor.address.address1);
    this.vendorForm.get('vendorAddress.address2')?.setValue(vendor.address.address2);
    this.vendorForm.get('vendorAddress.landmark')?.setValue(vendor.address.landmark);
    this.vendorForm.get('vendorGeolocation.lat')?.setValue(vendor.geolocation.lat);
    this.vendorForm.get('vendorGeolocation.lng')?.setValue(vendor.geolocation.lng);
  }

  private initializeForm() {
    this.vendorForm = this.fb.group({
      vendorFirmId: ['', Validators.required],
      vendorFirmName: ['', Validators.required],
      vendorId: ['', Validators.required],
      vendorName: ['', Validators.required],
      vendorPhoneNo: ['', Validators.required],
      vendorAddress: this.fb.group({
        address1: [''],
        address2: [''],
        landmark: [''],
      }),
      vendorGeolocation: this.fb.group({
        lat: [''],
        lng: ['']
      })
    })
  }

  private getVendors() {
    this.apiMainService.searchVendor(undefined).then((res) => {
      if (res && res.length > 0) {
        const dailyAccessVendors = res.filter((vendor: any) => vendor.isDailyAndBulkAccess === true && vendor?.vendorFirmDetails?.vendorFirmName);
        const firmMap = new Map();
        dailyAccessVendors.forEach((vendor: any) => {
          const firmId = vendor?.vendorFirmDetails?.vendorFirmId;
          if (!firmMap.has(firmId)) {
            firmMap.set(firmId, {
              vendorFirmDetails: vendor.vendorFirmDetails,
              vendorList: []
            });
          }
          firmMap.get(firmId).vendorList.push(vendor);
        });
        this.vendorFirmList = [...firmMap.values()];
      }
    })
  }

  private checkIsVendorAssigned(): void {
    this.isVendorAssigned = !!this.order?.vendorPhoneNo;
  }

  get canShowChangeVendor(): boolean {
    if (!this.editMode || !this.order) {
      return false;
    }

    if (this.order.orderstatus === 'placed' || this.order.orderstatus === 'waitingForApproval' || this.order.orderstatus === 'accepted') {
      return true;
    }

    if (this.order.orderstatus === 'preparing' && !this.isVendorAssigned) {
      return true;
    }

    return false;
  }

}

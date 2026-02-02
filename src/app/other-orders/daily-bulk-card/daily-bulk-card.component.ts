import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'src/service/toaster.service';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SendDataToComponent } from 'src/service/sendDataToComponent.service';

@Component({
  selector: 'app-daily-bulk-card',
  templateUrl: './daily-bulk-card.component.html',
  styleUrls: ['./daily-bulk-card.component.scss']
})
export class DailyBulkCardComponent implements OnInit {
  @ViewChild('actionModal') actionModal: any;
  @Input() orderInput: any;
  @Output() updateOrder = new EventEmitter<any>();
  imageUrl = environment.imageUrl;
  showStatusHistory: boolean = true;
  showless: boolean = true;
  showEmployees: boolean = true;
  order: any;
  addDeliveryCost = 0;
  statusComment: string = '';
  activeModalAction: string = '';
  tempStatus: string = '';
  previewImageSrc: string = '';
  orderStage: number = 1;
  actionList: any[] = [];
  modalRef?: NgbModalRef;
  commentRequired: boolean = false;
  showDeliveryInput: boolean = false;
  deliveryChargesFromModal: number = 0;
  modalMessage: string = '';

  constructor(
    private apiMainService: ApiMainService,
    private localStorageService: LocalStorageService,
    private sendDataToComponent: SendDataToComponent,
    private modalService: NgbModal,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    if (this.orderInput) {
      this.order = { ...this.orderInput };
      this.updateOrderStage();
    }
  }

  getStatusClass(status?: string): string {
    if (!status) {
      return '';
    }
    const normalized = status.replace(/\s+/g, '');
    return `status-${normalized}`;
  }

  getStatusLabel(status: string): string {
    if (!status) return '';
    const labels: { [key: string]: string } = {
      'placed': 'Placed',
      'accepted': 'Accepted',
      'preparing': 'Preparing',
      'readyForDelivery': 'Ready For Delivery',
      'deliveryBoyAssigned': 'Agent Assigned',
      'handedOverToDeliveryBoy': 'Handed Over',
      'onTheWay': 'On The Way',
      'delivered': 'Delivered',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return labels[status] || status;
  }

  getParsedDate(timeStr: string): Date | null {
    if (!timeStr) return null;
    const parts = timeStr.split(':');
    if (parts.length < 2) return null;
    const hours = +parts[0];
    const minutes = +parts[1];

    if (isNaN(hours) || isNaN(minutes)) return null;

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }

  async acceptRejectOrder(status: string, comment?: string, deliveryCharge?: number): Promise<void> {
    try {
      console.log('status', status);
      let order: any = { ...this.order, orderstatus: status };
      if (comment) {
        order.comment = comment;
      }
      const oldDeliveryCharge = this.order.deliveryCharge || 0;
      if (deliveryCharge !== undefined && deliveryCharge !== null) {
        order.deliveryCharge = deliveryCharge;
      }
      const adminId = this.localStorageService.getCacheData('ADMIN_ID');
      if (adminId) {
        order.actionBy = adminId;
      }
      order.startManualDelivery = true;
      this.order.orderstatus = status;
      if (deliveryCharge !== undefined && deliveryCharge !== null) {
        this.order.amount = ((this.order.amount || 0) - oldDeliveryCharge) + deliveryCharge;
        this.order.deliveryCharge = deliveryCharge;
        if (this.orderInput) {
          this.orderInput.amount = this.order.amount;
          order.deliveryCharge = this.order.deliveryCharge;
        }
      }
      await this.apiMainService.updateBulkDailyFoodOrder(order);
      this.sendDataToComponent.publish('UPDATE_BULK_ORDER_PAGE', {
        reload: true,
        _id: this.order._id
      });
      this.updateOrder.emit({
        reload: true,
        _id: this.order._id
      });
      this.updateOrderStage();
    } catch (error) {
      console.log('error while changing status', error);
      this.toasterService.error(112);
    }
  }

  openActionModal(content: any, action: string, status: string, commentRequired: boolean = false, message: string = '', showDeliveryInput: boolean = false) {
    this.activeModalAction = action;
    this.tempStatus = status;
    this.statusComment = '';
    this.commentRequired = commentRequired;
    this.modalMessage = message;
    this.showDeliveryInput = showDeliveryInput;
    this.deliveryChargesFromModal = this.order.deliveryCharge || 0;
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  confirmAction() {
    if (this.commentRequired && !this.statusComment) {
      this.toasterService.error('Comment is required');
      return;
    }
    const deliveryCharge = this.showDeliveryInput ? this.deliveryChargesFromModal : undefined;
    this.acceptRejectOrder(this.tempStatus, this.statusComment, deliveryCharge);
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  updateOrderStage() {
    const status = this.order?.orderstatus;
    if (!status) return;
    switch (status) {
      case 'placed':
        this.orderStage = 1;
        this.actionList = [
          { label: 'Accept', action: 'accept', color: 'primary', icon: 'check', commentRequired: false, message: 'Are you sure you want to accept this order?' },
          { label: 'Cancel', action: 'cancel', color: 'warn', icon: 'close', commentRequired: true, message: 'Are you sure you want to cancel this order?' }
        ]
        break;
      case 'accepted':
        this.orderStage = 2;
        this.actionList = [
          { label: 'Prepairing', action: 'preparing', color: 'primary', icon: 'check', commentRequired: false, message: 'Is the order preparation started?' },
        ]
        break;
      case 'preparing':
        this.orderStage = 3;
        this.actionList = [
          { label: 'Ready For Delivery', action: 'readyForDelivery', color: 'primary', icon: 'check', commentRequired: false, message: 'Is the order ready for delivery?' },
        ]
        break;
      case 'readyForDelivery':
        this.orderStage = 4;
        this.actionList = [
          { label: 'Assign Agent', action: 'assignAgent', color: 'primary', icon: 'check', commentRequired: true, message: 'Assign a delivery agent to this order.' },
          { label: 'Delivery Cost Change', action: 'deliveryCostChange', color: 'warn', icon: 'close', commentRequired: true, message: 'Update delivery cost for this order.' }
        ]
        break;
      case 'deliveryBoyAssigned':
        this.orderStage = 5;
        this.actionList = [
          { label: 'Handover To Agent', action: 'handoverToAgent', color: 'primary', icon: 'check', commentRequired: false, message: 'Confirm handover to delivery agent.' },
        ]
        break;
      case 'handedOverToDeliveryBoy':
        this.orderStage = 6;
        this.actionList = [
          { label: 'On The Way', action: 'onTheWay', color: 'primary', icon: 'check', commentRequired: false, message: 'Confirm handover to delivery agent.' },
        ]
        break;
      case 'onTheWay':
        this.orderStage = 7;
        this.actionList = [
          { label: 'Delivered', action: 'delivered', color: 'primary', icon: 'check', commentRequired: false, message: 'Confirm order delivery.' },
        ]
        break;
      case 'delivered':
        this.orderStage = 8;
        this.actionList = [
          { label: 'Complete', action: 'complete', color: 'primary', icon: 'check', commentRequired: false, message: 'Mark order as completed?' },
        ]
        break;
      case 'completed':
        this.orderStage = 9;
        this.actionList = []
        break;
      case 'cancelled':
        this.orderStage = 10;
        this.actionList = []
        break;
      default:
        this.orderStage = 1;
        break;
    }
  }

  handleAction(action: string) {
    const actionConfig = this.actionList.find(a => a.action === action);
    const commentRequired = actionConfig?.commentRequired || false;
    const label = actionConfig?.label || action;
    const message = actionConfig?.message || '';

    switch (action) {
      case 'cancel':
        this.openActionModal(this.actionModal, label, 'cancelled', commentRequired, message);
        break;
      case 'accept':
        this.openActionModal(this.actionModal, label, 'accepted', commentRequired, message);
        break;
      case 'preparing':
        this.openActionModal(this.actionModal, label, 'preparing', commentRequired, message);
        break;
      case 'readyForDelivery':
        this.openActionModal(this.actionModal, label, 'readyForDelivery', commentRequired, message);
        break;
      case 'assignAgent':
        this.openActionModal(this.actionModal, label, 'deliveryBoyAssigned', commentRequired, message);
        break;
      case 'handoverToAgent':
        this.openActionModal(this.actionModal, label, 'handedOverToDeliveryBoy', commentRequired, message);
        break;
      case 'delivered':
        this.openActionModal(this.actionModal, label, 'delivered', commentRequired, message);
        break;
      case 'complete':
        this.openActionModal(this.actionModal, label, 'completed', commentRequired, message);
        break;
      case 'placeOrder':
        this.openActionModal(this.actionModal, label, 'placed', commentRequired, message);
        break;
      case 'deliveryCostChange':
        this.openActionModal(this.actionModal, label, this.order.orderstatus, commentRequired, message, true);
        break;
      case 'onTheWay':
        this.openActionModal(this.actionModal, label, 'onTheWay', commentRequired, message);
        break;
    }
  }

  openImagePreview(content: any, imageSrc: string) {
    this.previewImageSrc = imageSrc;
    this.modalService.open(content, { size: 'lg', centered: true, ariaLabelledBy: 'modal-basic-title' });
  }

  formatTime12Hour(time: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    const m = parseInt(minutes);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    const mStr = m < 10 ? '0' + m : m;
    return `${h}:${mStr} ${ampm}`;
  }
}
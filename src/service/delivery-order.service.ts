import { Injectable } from '@angular/core';
import { ApiMainService } from './apiService/apiMain.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderService {
  constructor(private apiMainService: ApiMainService) {
  }

  async createTask(order: any, type: string, serv: any) {
    const vendorProfile = await this.apiMainService.getVendorById(order.vendorId)

    const orderNoList: any = [];
    const taskObj: any = { optimised_route: true, payment_method: 'DUNZO_CREDIT' };
    taskObj.drop_details = [];
    taskObj.reference_id = 'mealawe order';

    taskObj.pickup_details = [
      {
        reference_id: `${vendorProfile._id}`,
        address: {
          street_address_1: vendorProfile.address.address1,
          street_address_2: vendorProfile.address.address2,
          landmark: vendorProfile.address.landmark,
          ...vendorProfile.geolocation,
          contact_details: {
            name: vendorProfile.vendorName,
            phone_number: vendorProfile.vendorPhoneNo
          }
        }
      }
    ];
    taskObj.drop_details.push({
      reference_id: `${order.orderNo}_${order.customerId ? order.customerId : order.poc_profileId ? order.poc_profileId : order.pocId}`,
      address: {
        street_address_1: order.customerLocation.address ? order.customerLocation.address : order.customerLocation.location,
        street_address_2: order.customerLocation.location,
        landmark: order.customerLocation.landmark,
        ...order.customerLocation.geolocation,
        contact_details: {
          name: order.customerName ? order.customerName : order.user_name ? order.user_name : order.pocName,
          phone_number: order.customerPhoneNo ? order.customerPhoneNo : order.user_phoneNo ? order.user_phoneNo.toString() : order.pocPhoneNo.toString()
        }
      },
      special_instructions: order.nonContactDelivery ? 'Contect less delivery' : 'nothing'
    });
    taskObj.reference_id += `_${order.orderNo}`;
    orderNoList.push(order.orderNo);
    let server = 'DD';
    if (type === 'PORTER') {
      return this.apiMainService.createPorterTask({ taskObj, orderNoList, server });
    }
    if (type === 'SHADOWFAX') {
      return this.apiMainService.createShadowFaxTask({ taskObj, orderNoList, server });
    } if (type === 'PIDGE') {
      return this.apiMainService.createPidge3PLTask({ taskObj, orderNoList, server });
    } else {
      return this.apiMainService.createDeliveryTask({ taskObj, orderNoList, server });
    }

  }


  trackTask(taskId: any, partner: any) {
    return this.apiMainService.trackDeliveryTask(taskId, partner);
  }

  async trackDeliveryTask(order: any, partner: any, server?: any) {
    if (!order || !order.deliveryTaskId) {
      return;
    }
    try {
      const deliveryOrderStatus = await this.apiMainService.trackDeliveryTask(order.deliveryTaskId, partner);
      order.deliveryTaskState = deliveryOrderStatus.state;

      if (deliveryOrderStatus && deliveryOrderStatus.eta) {
        order.pickupEta = deliveryOrderStatus.eta.pickup;
        order.dropoffEta = deliveryOrderStatus.eta.dropoff;
      }

      if (deliveryOrderStatus && deliveryOrderStatus.sfx_order_id) {
        order.sfx_order_id = deliveryOrderStatus.sfx_order_id;
      }

      if (deliveryOrderStatus && deliveryOrderStatus.runner) {
        order.runnerName = deliveryOrderStatus.runner.name;
        order.runnerPhone = deliveryOrderStatus.runner.phone_number;
        order.runnerLocation = deliveryOrderStatus.runner.location;
      }

      if (deliveryOrderStatus.state === 'runner_cancelled' || deliveryOrderStatus.state === 'cancelled') {
        order.runnerName = undefined;
        order.runnerPhone = undefined;
        order.runnerLocation = undefined;
      }

      if (deliveryOrderStatus.state === 'CANCELLED') {
        order.deliveryTaskState = 'cancelled';
      }
      return deliveryOrderStatus;
    } catch (error) {
      throw error;
    }
  }
}
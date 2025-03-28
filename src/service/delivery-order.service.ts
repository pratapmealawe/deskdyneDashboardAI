import { Injectable } from '@angular/core';
import { ApiMainService } from './apiService/apiMain.service';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root'
  })
  export class DeliveryOrderService {
    constructor(private apiMainService: ApiMainService,private localStorageService: LocalStorageService){
            }

    // async createTask(order:any, type:string,serv:any){
    //     const kitchenProfile = await this.apiMainService.getKitchenPartner(order.kitchenId)
    //     const orderNoList:any = [];
    //     const taskObj:any = {optimised_route: true,payment_method: 'DUNZO_CREDIT'};
    //     taskObj.drop_details = [];
    //     taskObj.reference_id = 'mealawe order';

    //     taskObj.pickup_details = [
    //         {
    //           reference_id: `${kitchenProfile._id}`,
    //           address: {
    //               street_address_1: kitchenProfile.address.address1,
    //               street_address_2: kitchenProfile.address.address2,
    //               landmark: kitchenProfile.address.landmark,
    //               ...kitchenProfile.geolocation,
    //               contact_details:{
    //                   name: kitchenProfile.kitchenPartnerName,
    //                   phone_number: kitchenProfile.phoneNo
    //               }
    //             }
    //         }
    //     ];
    //     taskObj.drop_details.push({
    //         reference_id:`${order.orderNo}_${order.customerId ? order.customerId : order.poc_profileId ? order.poc_profileId : order.pocId}`,
    //         address: {
    //             street_address_1: order.customerLocation.address ? order.customerLocation.address : order.customerLocation.location,
    //             street_address_2: order.customerLocation.location,
    //             landmark: order.customerLocation.landmark,
    //             ...order.customerLocation.geolocation,
    //             contact_details:{
    //                 name: order.customerName ? order.customerName : order.user_name ? order.user_name : order.pocName,
    //                 phone_number: order.customerPhoneNo ? order.customerPhoneNo : order.user_phoneNo ? order.user_phoneNo.toString() : order.pocPhoneNo.toString()
    //             }
    //         },
    //         special_instructions: order.nonContactDelivery ? 'Contect less delivery' : 'nothing'                
    //     });
    //     taskObj.reference_id += `_${order.orderNo}`;
    //     orderNoList.push(order.orderNo); 
    //     let server = serv;
    //     if(serv === 'ML'){
    //         server = order.orderCreatedBy === 'DDUser' ? 'DD' : 'ML';
    //     }
    //     console.log(server)
    //     // const server = order.orderCreatedBy === 'DDUser' ? 'DD' : 'ML';
    //     // if(type === 'DUNZO'){
    //     //     return this.apiMainService.createOnlyDunzoTask({taskObj,orderNoList,server});
    //     // }
    //     // if(type === 'PORTER'){
    //     //     return this.apiMainService.createPorterTask({taskObj,orderNoList,server});
    //     // }
    //     // if(type === 'SHADOWFAX'){
    //     //     return this.apiMainService.createShadowFaxTask({taskObj,orderNoList,server});
    //     // } if(type === 'PIDGE'){
    //     //     return this.apiMainService.createPidge3PLTask({taskObj,orderNoList,server});
    //     // }else{
    //     //     return this.apiMainService.createDeliveryTask({taskObj,orderNoList,server});
    //     // }
        
    // }


    trackTask(taskId:any,partner:any){
        // return this.apiMainService.trackDeliveryTask(taskId,partner);
    }
   
}
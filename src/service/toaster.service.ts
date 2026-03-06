import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  msgObj:any = {
    100: 'Kindly select from and to date',
    101: 'To date cannot be lesser than from date',
    104: 'Payment transaction failed',
    105: 'Error during payment transaction',
    106: 'Payment refund is successfull',
    107: 'Order is not eligible for refund',
    108: 'Upload kitchen partner profile image',
    109: 'Fill all mandatory fields',
    110: 'Notification sent successfully',
    111: 'Error while sending notification',
    112: 'Error while searching Vendor',
    113: 'Vendor not found',
    114: 'Kitchen is not approved',
    115: 'Kitchen is not operation right now',
    116: 'Order updated successfully',
    117: 'No Customer Found',
    118: 'Vendor updated successfully',
    119: 'Customer updated successfully',
    120: 'Address is not servicable',
    121: 'No change in Meal Type',
    122: 'Not Authorized',
    123: 'Amount and Remark are required',
    124: 'No Change in slot',
    125: 'Nothing to download',
    300: 'Something went wrong, Please try again later.',
    301: 'Please assign vendor to this order.'
}

toasterSubject = new BehaviorSubject({});
constructor() { }

success(msgCode: any){
  const msg = this.msgObj[msgCode]? this.msgObj[msgCode] : msgCode;
  this.toasterSubject.next({msg, type: 'success'});
}
error(msgCode: any){
  const msg = this.msgObj[msgCode]? this.msgObj[msgCode] : msgCode;
  this.toasterSubject.next({msg, type: 'error'});
}

warning(msgCode: any){
  const msg = this.msgObj[msgCode]? this.msgObj[msgCode] : msgCode;
  this.toasterSubject.next({msg, type: 'warning'});
}
info(msgCode: any){
  const msg = this.msgObj[msgCode]? this.msgObj[msgCode] : msgCode;
  this.toasterSubject.next({msg, type: 'info'});
}
alarm(msgCode: any){
  const msg = this.msgObj[msgCode]? this.msgObj[msgCode] : msgCode;
  this.toasterSubject.next({msg, type: 'alarm'});
} 
}

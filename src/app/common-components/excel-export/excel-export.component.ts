import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';
import { ExcelService } from 'src/service/excel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.scss']
})
export class ExcelExportComponent  implements OnInit {
  searchObj: any = {
    orderType: '',
    fromDate: '',
    toDate: '',
    org_id: ''
  }
  orgChoices: any;
  filteredList: any;
  monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  constructor(private ddApiMainService: ApiMainService, private datePipe: DatePipe, private excelService: ExcelService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.fetchOrgChoices();
  }

  async fetchOrgChoices() {
    try {
      const orgChoices = await this.ddApiMainService.getOrgList();
      if (orgChoices && orgChoices.length > 0) {
        this.orgChoices = orgChoices;
      }
    } catch (error) {
      console.log('cafeteria fetch error', error)
    }
  }

  async searchOrder() {
    try {
      this.filteredList = [];
      let filteredList: any;
      if (!this.searchObj.orderType || (!this.searchObj.fromDate) || (!this.searchObj.toDate) || (!this.searchObj.org_id)) {
        this.toasterService.error(126);
        return;
      }
      if (this.searchObj.orderType === 'dailyBulk') {
        filteredList = await this.ddApiMainService.getAdminDailyBulkOrders(this.searchObj);
        if (filteredList && filteredList.length > 0) {
          this.filteredList = filteredList;
          this.createDailyBulkExcel(filteredList);
        }
      }
      else if (this.searchObj.orderType === 'subscriptionPackage') {
        const obj = {
          id: this.searchObj.org_id,
          fromDate: new Date(this.searchObj.fromDate),
          toDate: new Date(this.searchObj.toDate)
        }
        obj.fromDate.setHours(0, 0, 0, 0)
        obj.toDate.setHours(23, 59, 59, 999)
        filteredList = await this.ddApiMainService.orgMealPackages(obj);
        if (filteredList && filteredList.length > 0) {
          this.filteredList = filteredList;
          this.createPackageExcel(filteredList);
        }
      }
      else if (this.searchObj.orderType === 'empPoll') {
        this.searchObj.fromDate = new Date(this.searchObj.fromDate)
        this.searchObj.toDate = new Date(this.searchObj.toDate)
        this.searchObj.fromDate.setHours(0, 0, 0, 0)
        this.searchObj.toDate.setHours(23, 59, 59, 999)
        filteredList = await this.ddApiMainService.getAdminEmpPolls(this.searchObj);
        console.log("filteredList",filteredList);
        if (filteredList && filteredList.length > 0) {
          this.filteredList = filteredList;
          this.createEmpPollExcel(filteredList);
        }
      }
      else if (this.searchObj.orderType === 'indEmpPoll') {
        const obj = {
          id: this.searchObj.org_id,
          fromDate: new Date(this.searchObj.fromDate),
          toDate: new Date(this.searchObj.toDate)
        }
        obj.fromDate.setHours(0, 0, 0, 0)
        obj.toDate.setHours(23, 59, 59, 999)
        filteredList = await this.ddApiMainService.getOrgEmployeePollingList(obj);
        if (filteredList && filteredList.length > 0) {
          this.filteredList = filteredList;
          this.createIndividualExcel(filteredList);
        }
      }
      else {
        filteredList = await this.ddApiMainService.getAdminPastOrders(this.searchObj);
        if (filteredList && filteredList.length > 0) {
          this.filteredList = filteredList;
          this.createBulkEventExcel(filteredList);
        }
      }
    } catch (error) {
      console.log(error)
    }
    console.log(this.searchObj)
  }

  createDailyBulkExcel(orderList: any) {
    let data: any = [];
    orderList.forEach((order: any) => {
      const currentDate = new Date(order.orderDate);
      const deliveryDate = new Date(order.deliveryDate);
      const location = order.customerLocation.location;
      let pin = '';
      if (location) {
        const res = location.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        }
        else {
          pin = 'N/A';
        }
      }
      const row = {
        "POC Name": order.pocName,
        "POC Phone No": order.pocPhoneNo,
        "POC Email Id": order.pocEmail,
        "POC ID": order.pocId,
        "POC Role": order.pocRole,
        "POC Location / Pin Code": pin ? pin : location,
        "Org Name": order.orgName,
        "Org Location": order.orgLocation,
        "Order Date": currentDate,
        "Delivery Date": deliveryDate,
        "Meal Name": order.itemList[0].itemName,
        "Count": order.itemList[0].count,
        "Cutoff Time": order.itemList[0].cutOffTime,
        "Delivery Time From": this.datePipe.transform(order.itemList[0].deliveryTimeFrom, 'shortTime'),
        "Delivery Time To": this.datePipe.transform(order.itemList[0].deliveryTimeTo, 'shortTime'),
        "Delivered Item": order.itemList[0].deliveredItem ? order.itemList[0].deliveredItem : 'N/A',
        "Amount Paid To Kitchen": order.itemAmount,
        "Amount + Fixed Delivery": order.amount,
        "Amount without Fixed Delivery": order.amount - order.deliveryCharge,
        "Fixed Delivery Charges": order.deliveryCharge,
        "Delivery paid by mealawe": order.deliveryAmtPaidByMealawe ? order.deliveryAmtPaidByMealawe : 'N/A',
        "Pay Amt To Kitchen": order.itemAmount,
        "Taxes": order.taxes,
      }
      data.push(row);
    })
    this.excelService.download(data, `admin_bulk_${this.datePipe.transform(this.searchObj.fromDate, 'shortDate')}_TO_${this.datePipe.transform(this.searchObj.toDate, 'shortDate')}`)
  }

  createPackageExcel(orderList: any) {
    console.log('getOrderPackageList....')
    let data: any = [];
    orderList.forEach((foodPackage: any) => {
      let mealPerdayCount = 1;
      let addonsTotal = 0;
      if (foodPackage.mealTimeLunch && foodPackage.mealTimeDinner) {
        mealPerdayCount = 2;
      }
      foodPackage.mealPackage.addonsList.forEach((addon: any) => {
        if (addon.selected) {
          if (addon.daily) {
            addonsTotal += addon.extraPrice * foodPackage.mealPackage.count * mealPerdayCount * foodPackage.subscriptionDays
          }
          else {
            addonsTotal += addon.extraPrice * foodPackage.mealPackage.count * mealPerdayCount * addon.dayCount
          }
        }
      })
      let mealType;
      if (foodPackage.mealTimeLunch && foodPackage.mealTimeDinner) {
        mealType = 'Lunch & Dinner'
      }
      else if (foodPackage.mealTimeLunch) {
        mealType = 'Lunch'
      }
      else if (foodPackage.mealTimeDinner) {
        mealType = 'Dinner'
      }
      else {
        mealType = 'Breakfast'
      }
      const currentDate: any = new Date(foodPackage.orderDate);
      const month = currentDate.getMonth() + 1;
      const startDate: any = new Date(currentDate.getFullYear(), 0, 1);
      const subStartDate: any = new Date(foodPackage.subscriptionStartDate);
      const subMonth = subStartDate.getMonth() + 1;
      let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
      let weekNumber = Math.ceil(days / 7);
      let subscriptionCount = 1;
      if (foodPackage.mealTimeLunch && foodPackage.mealTimeDinner) {
        subscriptionCount = 2;
      }
      const totalOrders = foodPackage.subscriptionDays * subscriptionCount;
      const deliveryCost = totalOrders * 55;
      const packagingCost = totalOrders * 18;
      const totalAmtReceived = foodPackage.mealaweTotalAmt + foodPackage.moneyWalletPointsUsed;
      const location = foodPackage.customerLocation.location;
      const address = foodPackage.customerLocation.address;
      const packageDiscount = foodPackage.mealPackage.discount ? foodPackage.mealPackage.discount : 0;
      const deskDynePackageDiscount = foodPackage.mealPackage.ddDiscount ? foodPackage.mealPackage.ddDiscount : 0;
      const subsidyAmount = foodPackage.mealPackage.subsidyAmount ? foodPackage.mealPackage.subsidyAmount : 0;
      const subsidyValue = foodPackage.mealPackage.subsidyValue ? foodPackage.mealPackage.subsidyValue : 0;
      const subsidyType = foodPackage.mealPackage.subsidyType ? foodPackage.mealPackage.subsidyType : 0;
      let pin;
      const finalLocation = location ? location : address;
      if(address){
        const res = address.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        }
      }
      if (location) {
        const res = location.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        }
      }
      let totalPaidToKitchen = 0;
      if (foodPackage.dailyOrderList && foodPackage.dailyOrderList.length > 0) {
        foodPackage.dailyOrderList.forEach((dailyOrder: any) => {
          totalPaidToKitchen += dailyOrder.itemAmount
        });
      }
      let payToKitchenPerMeal = 0;
      if (totalPaidToKitchen) {
        payToKitchenPerMeal = totalPaidToKitchen / totalOrders;
      } else {
        payToKitchenPerMeal = foodPackage.mealPackage.payToKitchenPerMeal;
      }
      const placedAt = foodPackage.statusHistory.find((status: any) => status.orderstatus === 'placed')
      const row = {
        "Customer Name": foodPackage.customerName,
        "Customer Phone No": foodPackage.customerPhoneNo,
        "Customer Email Id": foodPackage.customerEmail,
        "Customer Location / Pin Code": pin ? pin : finalLocation,
        "MealType": mealType,
        "Order Placed At": placedAt ? this.datePipe.transform(placedAt.updatedOn, 'shortTime') : 'N/A',
        "Kitchen Name": foodPackage.kitchenName,
        "Subscription Days": foodPackage.subscriptionDays,
        "No. of Subscription": subscriptionCount,
        "Order Frequency": foodPackage.subscriptionType ? foodPackage.subscriptionType : 'N/A',
        "Total Orders": totalOrders,
        "MealAwe Package Discount": packageDiscount,
        "DeskDyne Package Discount": deskDynePackageDiscount,
        "Subsidy Type": subsidyType,
        "Subsidy Value": subsidyValue,
        "Subsidy Amount": subsidyAmount,
        "Avg Pay To Kitchen Per Meal": payToKitchenPerMeal,
        "Total Paid to Kitchen": totalPaidToKitchen,
        "Delivery Cost(Rs55)": deliveryCost,
        "Packaging Cost(Rs18)": packagingCost,
        "Total Amount Received": totalAmtReceived,
        "Gross Profit": totalAmtReceived - totalPaidToKitchen - deliveryCost - packagingCost,
        "Package Name": foodPackage.mealPackage.packageName,
        "Package Category": foodPackage.mealPackage.packageCategory,
        "Order Date": currentDate.getDate() + '-' + month + '-' + currentDate.getFullYear(),
        "Order Month": this.monthList[(new Date(foodPackage.orderDate)).getMonth()],
        "Subscription Start Date": subStartDate.getDate() + '-' + subMonth + '-' + subStartDate.getFullYear(),
        "Week No.": weekNumber,
        "Order Status": foodPackage.orderstatus,
        "Package Days": foodPackage.mealPackage.days,
        "Coupon Code": foodPackage.couponCode ? foodPackage.couponCode : 'N/A',
        "Voucher Code": foodPackage.voucherCode ? foodPackage.voucherCode : 'N/A',
        "Order Created By": foodPackage.orderCreatedBy,
        "Cutlery Discount": foodPackage.cutleryDiscount,
        "Package MRP": foodPackage.mealPackage.packagePrice,
        "Package Discount": foodPackage.mealPackage.discount,
        "Base Price": foodPackage.mealPackage.packagePrice - foodPackage.mealPackage.discount,
        "Adonns Total": addonsTotal,
        "Billing Discount": foodPackage.mealaweItemDiscount ? foodPackage.mealaweItemDiscount : 0 + foodPackage.discount + foodPackage.cutleryDiscount + foodPackage.voucherDiscount + foodPackage.couponDiscount + foodPackage.mealaweDeliveryDiscount ? foodPackage.mealaweDeliveryDiscount : 0,
        "Taxes": foodPackage.taxes,
        "Amount Paid By User-Taxes": totalAmtReceived - foodPackage.taxes,
        "Amount Paid By User": totalAmtReceived,
      };
      data.push(row);
    });
    this.excelService.download(data, `virtual_cafe_${this.datePipe.transform(this.searchObj.fromDate, 'shortDate')}_TO_${this.datePipe.transform(this.searchObj.toDate, 'shortDate')}`)
  }

  createEmpPollExcel(orderList: any) {
    let data: any = [];
    orderList.forEach((order: any) => {
      const currentDate = new Date(order.orderDate);
      const deliveryDate = new Date(order.deliveryDate);
      const location = order.customerLocation.location;
      let pin = '';
      if (location) {
        const res = location.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        }
        else {
          pin = 'N/A';
        }
      }
      order.excelReportlist.forEach((exdetails: any) => {
        if(exdetails.employeeVote=='YES'){
          const currentDate: any = new Date(deliveryDate);
        const month = currentDate.getMonth() + 1;
        let odate = new Date( order.orderDate);
      const row = {
        "Order Date": odate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        "Delivery Date short":currentDate.getDate() + '-' + month + '-' + currentDate.getFullYear(),
        "Employee Name":exdetails.employeeName,
        "Employee Vote":exdetails.employeeVote,
        "Item Name":order.itemList[0].itemName,
        "Delivered Item": order.itemList[0].deliveredItem ? order.itemList[0].deliveredItem : 'N/A',
        "Organization Name":order.orgName
      }
      data.push(row);
    }
      })
    })
    this.excelService.download(data, `admin_bulk_${this.datePipe.transform(this.searchObj.fromDate, 'shortDate')}_TO_${this.datePipe.transform(this.searchObj.toDate, 'shortDate')}`)
  }

  createIndividualExcel(orderList: any) {
    console.log(orderList)
  }

  createBulkEventExcel(orderList: any) {
    let data: any = [];
    orderList.forEach((order: any) => {
      const currentDate = new Date(order.orderDate);
      const deliveryDate = new Date(order.deliveryDate);
      const location = order.customerLocation.location;
      let pin = '';
      if (location) {
        const res = location.match(/\b\d{6}\b/);
        if (res && res.length > 0) {
          pin = res[0];
        }
        else {
          pin = 'N/A';
        }
      }
      const row = {
        "User Name": order.user_name,
        "User Phone No": order.user_phoneNo,
        "User Email Id": order.user_email,
        "User Role": order.user_role,
        "User Location / Pin Code": pin ? pin : location,
        "Org Name": order.org_name,
        "Org Location": order.org_location,
        "Order Date": currentDate,
        "Delivery Date": deliveryDate,
        "Meal Name": order.itemList[0].itemName,
        "Count": order.itemList[0].count,
        "Kitchen Name": order.kitchenName,
        "Kitchen Phone No": order.kitchenPhoneNo,
        "Delivery Time From": this.datePipe.transform(order.slotStartTime, 'shortTime'),
        "Delivery Time To": this.datePipe.transform(order.slotEndTime, 'shortTime'),
        "Special Request": order.specialRequest ? order.specialRequest : 'N/A',
        "Amount": order.orderAmount,
        "Amount Paid To Kitchen": order.itemAmount,
        "Delivery paid by mealawe": order.deliveryAmtPaidByMealawe ? order.deliveryAmtPaidByMealawe : 'N/A',
        "Taxes": order.taxes,
      }
      data.push(row);
    })
    this.excelService.download(data, `event_bulk_${this.datePipe.transform(this.searchObj.fromDate, 'shortDate')}_TO_${this.datePipe.transform(this.searchObj.toDate, 'shortDate')}`)
  }

}


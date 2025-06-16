import { Injectable } from '@angular/core';
import { RuntimeStorageService } from '../runtime-storage.service';
import { ApiHttpService } from './apiHttp.service';
import { MlApiConfigService } from './mlApiConfig.service';

@Injectable({
  providedIn: 'root'
})
export class MlApiMainService {

  constructor(
    private apiConfigService: MlApiConfigService,
    private apiHttpService: ApiHttpService,
    private runtimeStorageService: RuntimeStorageService
  ) { }

  private runTimeCacheInterceptor(key: any, apiObj: any, bodyObj?: any, extraHeaderObj?: any, hideLoader?: boolean) {
    return new Promise(async (resolve, reject) => {
      const cacheList = this.runtimeStorageService.getCacheData(key);
      if (cacheList) {
        resolve(cacheList)
      } else {
        try {
          const data = await this.apiHttpService.REQUEST(apiObj, bodyObj, extraHeaderObj, hideLoader);
          this.runtimeStorageService.setCacheData(key, data);
          resolve(data);
        } catch (error) {
          reject(error)
        }

      }
    });
  }
  private getTodayStartDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
  }

  loginAdmin(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.loginAdmin, data);
  }
  verifyOTP(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.verifyOTP, data);
  }
  logout() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.logout);
  }
  getAllFooditems() {
    return this.runTimeCacheInterceptor('ALL_FOOD_ITEMS', this.apiConfigService.apiEndPointObj.getAllFooditems);
  }
  getfoodItemsList(query: string, text: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getfoodItemsList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${query}/${text}`, method: urlObj.method });
  }
  saveFoodItem(data: any) {
    this.runtimeStorageService.resetCacheData('ALL_FOOD_ITEMS');
    this.runtimeStorageService.resetCacheData('ALL_SPECIAL_FOOD_ITEMS');
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveFoodItem, data);
  }
  updateFoodItem(id: string, data: any) {
    this.runtimeStorageService.resetCacheData('ALL_FOOD_ITEMS');
    this.runtimeStorageService.resetCacheData('ALL_SPECIAL_FOOD_ITEMS');
    const urlObj = this.apiConfigService.apiEndPointObj.updateFoodItem;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  deleteFooditem(id: string) {
    this.runtimeStorageService.resetCacheData('ALL_FOOD_ITEMS');
    this.runtimeStorageService.resetCacheData('ALL_SPECIAL_FOOD_ITEMS');
    const urlObj = this.apiConfigService.apiEndPointObj.deleteFooditem;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  savekitchenPartner(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.savekitchenPartner, data);
  }
  searchKitchenWithFilter(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchKitchenWithFilter;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }
  exportKitchenPartners(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.exportKitchenPartners;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }
  updateKitchenPatner(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateKitchenPatner;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  getKitchenItemList(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getKitchenItemList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
    // return this.runTimeCacheInterceptor('KITCHEN_ITEM_LIST',{url: urlObj.url + `/${id}`, method: urlObj.method});
  }
  getKitchenAddonList(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getKitchenAddonList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  saveKitchenMenu(data: any) {
    // this.runtimeStorageService.resetCacheData('KITCHEN_ITEM_LIST');
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveKitchenMenu, data);
  }
  getAllGeoFencingList() {
    return this.runTimeCacheInterceptor('GEO_FENCING_LIST_ALL', this.apiConfigService.apiEndPointObj.getAllGeoFencingList);
  }
  getGeoFencingList() {
    return this.runTimeCacheInterceptor('GEO_FENCING_LIST', this.apiConfigService.apiEndPointObj.getGeoFencingList);
  }
  saveGeoFencing(data: any) {
    this.runtimeStorageService.resetCacheData('GEO_FENCING_LIST');
    this.runtimeStorageService.resetCacheData('GEO_FENCING_LIST_ALL');
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveGeoFencing, data);
  }
  updateGeoFencing(id: string, data: any) {
    this.runtimeStorageService.resetCacheData('GEO_FENCING_LIST');
    this.runtimeStorageService.resetCacheData('GEO_FENCING_LIST_ALL');
    const urlObj = this.apiConfigService.apiEndPointObj.updateGeoFencing;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  deleteGeoFencing(id: string) {
    this.runtimeStorageService.resetCacheData('GEO_FENCING_LIST');
    this.runtimeStorageService.resetCacheData('GEO_FENCING_LIST_ALL');
    const urlObj = this.apiConfigService.apiEndPointObj.deleteGeoFencing;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  activateGeoFencing(id: any, active: boolean) {
    this.runtimeStorageService.resetCacheData('GEO_FENCING_LIST');
    this.runtimeStorageService.resetCacheData('GEO_FENCING_LIST_ALL');
    const urlObj = this.apiConfigService.apiEndPointObj.activateGeoFencing;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${active}`, method: urlObj.method });
  }
  getKitchenWallet(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getKitchenWallet;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  saveKitchenWallet(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveKitchenWallet, data);
  }
  updateKitchenWallet(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateKitchenWallet;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  getAllVariables() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllVariables);
  }
  saveVariable(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveVariable, data);
  }
  updateVariable(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateVariable, data);
  }
  deleteVariable(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteVariable;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  getAllFAQs() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllFAQs);
  }
  saveFAQ(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveFAQ, data);
  }
  updateFAQ(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateFAQ, data);
  }
  deleteFAQ(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteFAQ;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  searchFoodOrderList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchFoodOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }
  searchSubscriptionFoodOrderList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchSubscriptionFoodOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }
  searchPackageFoodOrderList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchPackageFoodOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }

  checkCancelEligibility(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.checkCancelEligibility;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  refund(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.refund, data);
  }
  updateOrderStatus(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateOrderStatus, data);
  }
  getVariables(variableNames: any, from: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getVariables;
    return this.runTimeCacheInterceptor('CONFIG_VARIABLE' + from,
      { url: urlObj.url, method: urlObj.method }, { variableNames });
  }
  saveAdminProfile(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.adminProfile, data);
  }
  getAdminProfileList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAdminProfileList);
  }
  getadminprofile(loginId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getadminprofile;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${loginId}`, method: urlObj.method });
  }
  updateadminprofile(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateadminprofile;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  searchAdmin(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.searchAdmin, data);
  }
  deleteAdmin(loginId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteAdmin;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${loginId}`, method: urlObj.method });
  }
  getdashboardCount() {
    return this.runTimeCacheInterceptor('DASHBOARD_COUNT', this.apiConfigService.apiEndPointObj.getdashboardCount);
  }
  getKitchenPatnerCount() {
    return this.runTimeCacheInterceptor('KITCHEN_COUNT', this.apiConfigService.apiEndPointObj.getKitchenPatnerCount);
  }
  getUserCount() {
    return this.runTimeCacheInterceptor('USER_COUNT', this.apiConfigService.apiEndPointObj.getUserCount);
  }
  getkitchenlead() {
    return this.runTimeCacheInterceptor('KITCHEN_LEAD', this.apiConfigService.apiEndPointObj.getkitchenlead);
  }
  getListForReward(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getListForReward, data);
  }
  updateProfileApproval(id: string, status: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateProfileApproval;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${status}`, method: urlObj.method }, data);
  }
  getAllAppVersionList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllAppVersionList);
  }
  saveAppVersion(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveAppVersion, data);
  }
  updateAppVersion(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateAppVersion, data);
  }
  getOfferCouponList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getOfferCouponList);
  }
  saveOfferCoupon(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveOfferCoupon, data);
  }
  updateOfferCoupon(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOfferCoupon;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  deleteOfferCoupon(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOfferCoupon;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  getAllBanners() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllBanners);
  }
  saveBanner(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveBanner, data);
  }
  updateBanner(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateBanner;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  deleteBanner(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteBanner;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  updateDiscountOffer(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateDiscountOffer;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  getGeneralAppFeeback(page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getGeneralAppFeeback;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method });
  }
  createKitchenTestUser(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createKitchenTestUser, data);
  }
  validateKitchenPartner(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.validateKitchenPartner, data);
  }
  leadnoteligible(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.leadnoteligible, data);
  }
  getDishList(page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getDishList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method });
  }
  dishacknowledge(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.dishacknowledge;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  feedbackacknowledge(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.feedbackacknowledge;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  updatekitchenleadstatus(id: string, status: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.updatekitchenleadstatus;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${status}`, method: urlObj.method });
  }
  getAllConfigImages() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllConfigImages);
  }
  saveConfigImage(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveConfigImage, data);
  }
  updateConfigImage(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateConfigImage;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  validateKitchenReferralCode(code: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.validateKitchenReferralCode;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${code}`, method: urlObj.method }, null, null, true);
  }
  payAmtToKitchen(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.payAmtToKitchen, data);
  }
  payServerFoodOrderAmtToKitchenDirect(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.payServerFoodOrderAmtToKitchenDirect, data);
  }
  payServerFoodOrderAmtToKitchen(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.payServerFoodOrderAmtToKitchen, data);
  }
  kitchenOpenedStatus(id: any, status: boolean) {
    const urlObj = this.apiConfigService.apiEndPointObj.kitchenOpenedStatus;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${status}`, method: urlObj.method });
  }
  getCurrentOrdersCount() {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentOrdersCount;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${this.getTodayStartDate()}`, method: urlObj.method });
  }
  getCurrentSubscriptionCount() {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentSubscriptionCount;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${this.getTodayStartDate()}`, method: urlObj.method });
  }
  getCurrentOrdersList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentOrdersList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${this.getTodayStartDate()}/${page}/${limit}/${status}`, method: urlObj.method });
  }
  getCurrentSubOrdersList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentSubOrdersList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${this.getTodayStartDate()}/${page}/${limit}/${status}`, method: urlObj.method });
  }
  trackDeliveryTask(id: string, partner: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.trackDeliveryTask;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${partner}`, method: urlObj.method }, null, null, true);
  }
  trackPorterDeliveryTask(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.trackPorterDeliveryTask;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, true);
  }
  getServerLogs(fileName: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.serverlogs;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${fileName}`, method: urlObj.method }, null, { Accept: 'text/html' }, true);
  }
  searchUserWithFilter(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchUserWithFilter;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }

  getClusterKitchenPartnerList(data: any) {
    return this.runTimeCacheInterceptor('KITCHEN_LIST_' + data.clusterList[0], this.apiConfigService.apiEndPointObj.getClusterKitchenPartnerList, data, null, false);
    // return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getClusterKitchenPartnerList, data);
  }

  getCustomerProfileList() {
    return this.runTimeCacheInterceptor('USER_LIST', this.apiConfigService.apiEndPointObj.getCustomerProfileList, null, null, false);
    // return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getCustomerProfileList,null,null,false); 
  }

  updateFoodOrder(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateFoodOrder, data);
  }

  createDeliveryTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createDeliveryTask, data);
  }

  createOnlyDunzoTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createOnlyDunzoTask, data);
  }

  createPorterTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createPorterTask, data);
  }

  getKitchenPartner(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getKitchenPartner;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  sendTestNotification(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.sendTestNotification, data);
  }
  getKitchenPartnerProfile(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getKitchenPartnerProfile;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  performOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.performOrderTransfer, data);
  }
  performBulkOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.performBulkOrderTransfer, data);
  }
  performSubscriptionOrderTransfer(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.performSubscriptionOrderTransfer, data);
  }
  getGatewayPaymentHistory(paymentOrderid: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getGatewayPaymentHistory;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${paymentOrderid}`, method: urlObj.method });
  }
  refundGatewayPayment(id: string, orderType: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.refundGatewayPayment;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${orderType}`, method: urlObj.method }, data);
  }
  refundToUserWallet(id: string, orderType: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.refundToUserWallet;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${orderType}`, method: urlObj.method });
  }
  placePaymentFailedOrder(id: string, orderType: string, paymentId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.placePaymentFailedOrder;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${orderType}/${paymentId}`, method: urlObj.method });
  }
  getRefundOrders() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getRefundOrders);
  }
  getSubscriptionRefundOrders() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getSubscriptionRefundOrders);
  }
  updateComplianceByAdmin(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateComplianceByAdmin;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  updateSubscriptionDetails(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateSubscriptionDetails;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  getFoodOrder(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getFoodOrder;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  acceptSubscriptionOrder(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.acceptSubscriptionOrder, data);
  }
  updateSubscriptionFoodOrder(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateSubscriptionFoodOrder, data);
  }
  resechedulePackageOrder(orderDate: any, foodOrderId: any, subscriptionOrderId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.resechedulePackageOrder;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orderDate}/${foodOrderId}/${subscriptionOrderId}`, method: urlObj.method });
  }
  changeMealType(mealType: any, foodOrderId: any, subscriptionOrderId: any, slot: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeMealTypeFromAdmin;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${mealType}/${foodOrderId}/${subscriptionOrderId}`, method: urlObj.method }, slot);
  }
  getOfferVoucherList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getOfferVoucherList);
  }
  saveOfferVoucher(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveOfferVoucher, data);
  }
  updateOfferVoucher(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateOfferVoucher;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  deleteOfferVoucher(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteOfferVoucher;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  updateCouponList(mobile: string, coupon: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateCouponList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${mobile}/${coupon}`, method: urlObj.method });
  }
  getSpecialItems() {
    return this.runTimeCacheInterceptor('ALL_SPECIAL_FOOD_ITEMS', this.apiConfigService.apiEndPointObj.getSpecialItems);
  }
  searchOrderBookingList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchOrderBookingList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }
  getCustomerProfileByMobile(phone: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerProfileByMobile;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${phone}`, method: urlObj.method });
  }
  getKitchenbyMobile(phone: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getKitchenbyMobile;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${phone}`, method: urlObj.method });
  }

  saveOrderBooking(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveOrderBooking, data);
  }

  updateOrderBooking(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateOrderBooking, data);
  }
  createFoodOrderByAdmin(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createFoodOrderByAdmin, data);
  }
  getNearestKitchen(pageNumber: any, lng: any, lat: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getNearestKitchen;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${pageNumber}/${lng}/${lat}`, method: urlObj.method }, data);
  }
  getNearestKitchensOfType(pageNumber: any, lng: any, lat: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getNearestKitchensOfType;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${pageNumber}/${lng}/${lat}`, method: urlObj.method }, data);
  }
  updateManualDelivery(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateManualDelivery;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  deliveryByMealaweBoy(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deliveryByMealaweBoy;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  updateBulkManualDelivery(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateBulkManualDelivery;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  cancelPorterTask(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelPorterTask;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }
  cancelDunzotask(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelDunzotask;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }
  getdeliveryAmount(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getdeliveryAmount, data);
  }
  getOneConfigImage(imageName: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOneConfigImage;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${imageName}`, method: urlObj.method });
  }

  withdrawalHistory(kitchenId: any, pageNo: any, pageCount: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.withdrawalHistory;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${kitchenId}/${pageNo}/${pageCount}`, method: urlObj.method });
  }
  getCustomerPastOrders(customerId: any, pageNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerPastOrders;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${customerId}/${pageNo}/${this.getTodayStartDate()}`, method: urlObj.method });
  }
  getCustomerPackageList(customerId: any, pageNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerPackageList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${customerId}/${pageNo}`, method: urlObj.method });
  }

  getCustomerBulkOrderList(customerId: any, pageNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerBulkOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${customerId}/${pageNo}`, method: urlObj.method });
  }

  getCashbackListUser(customerId: any, pageNo: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCashbackListUser;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${customerId}/${pageNo}`, method: urlObj.method });
  }
  saveCashback(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveCashback, data);
  }

  getCustomerWalletBalance(customerId: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerWalletBalance;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${customerId}`, method: urlObj.method });
  }

  searchBulkOrderList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchBulkOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }

  updateBulkOrderStatus(data: any, id: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateBulkOrderStatus;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  getCurrentBulkOrdersCount() {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentBulkOrdersCount;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${this.getTodayStartDate()}`, method: urlObj.method });
  }

  getCurrentBulkOrdersList(page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentBulkOrdersList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}/${limit}`, method: urlObj.method });
  }
  createImage(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createImage, data);
  }

  getCurrentPackageOrdersList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentPackageOrdersList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method });
  }
  getCurrentPackageCount() {
    const urlObj = this.apiConfigService.apiEndPointObj.getCurrentPackageCount;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method });
  }
  updatePackageFoodOrder(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updatePackageFoodOrder;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }

  createDailyPackageOrder(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.createDailyPackageOrder;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }
  performPackageOrderTransfer(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.performPackageOrderTransfer;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }
  getMealPackageList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getMealPackageList);
  }
  saveMealPackage(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveMealPackage;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }
  updateMealPackage(id: string, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateMealPackage;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  deleteMealPackage(id: string) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteMealPackage;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  validatePaytmPaymentTransaction(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.validatePaytmPaymentTransaction, data);
  }

  getSubscriptionEndDetails() {
    // return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getSubscriptionEndDetails); 
    return this.runTimeCacheInterceptor('SUBSCRIPTION_ENDS', this.apiConfigService.apiEndPointObj.getSubscriptionEndDetails);
  }
  getOrderPackageByOrderNo(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOrderPackageByOrderNo;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getKitchenPastPackageOrders(kitchenId: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getKitchenPastPackageOrders;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${kitchenId}/${page}`, method: urlObj.method });
  }

  getOrderPackage(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getOrderPackage;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  addPolicy(policy: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    const urlObj = this.apiConfigService.apiEndPointObj.addPolicy;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, policy);
  }

  getAllPolicy() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllPolicy;
    // return this.apiHttpService.REQUEST({url: urlObj.url, method: urlObj.method});
    return this.runTimeCacheInterceptor('POLICIES', { url: urlObj.url, method: urlObj.method });
  }

  updatePolicy(id: any, data: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    const urlObj = this.apiConfigService.apiEndPointObj.updatePolicy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  deletePolicy(id: any) {
    this.runtimeStorageService.resetCacheData('POLICIES');
    const urlObj = this.apiConfigService.apiEndPointObj.deletePolicy;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  exportFoodOrderList(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.exportFoodOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }

  exportFoodOrderPackageList(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.exportFoodOrderPackageList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }

  getKitchenAssignedOrders(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getKitchenAssignedOrders;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }


  deductkitchenWallet(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deductkitchenWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }

  addkitchenWallet(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.addkitchenWallet;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }

  exportCustomerList(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.exportCustomerList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }
  createShadowFaxTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createShadowFaxTask, data);
  }

  cancelShadowFaxDelivery(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelShadowFaxTask;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }

  createPidge3PLTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createPidge3PLTask, data);
  }

  cancelPidge3PLOrder(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelPidge3PLOrder;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }

  saveBulkFoodItem(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveBulkFoodItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload, null, false, true);
  }

  updateBulkfoodItem(item: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateBulkfoodItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, item, null, false, true);
  }

  getAllBulkFooditems() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllBulkFooditems;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, null, null, false, true);
  }

  deleteBulkFoodItem(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteBulkFoodItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, null, null, false, true);
  }

  fetchBulkMenu(category: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.fetchBulkMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${category}`, method: urlObj.method }, null, null, false, true);
  }

  bulkMenuAdd(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.bulkMenuAdd;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload, null, false, true);
  }

  updateBulkMenu(payload: any, id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateBulkMenu;
    return this.apiHttpService.REQUEST({ url: urlObj.url, method: urlObj.method }, payload, null, false, true);
  }

  getBulkOrderList(status: any, page: any, limit: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.getBulkOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}/${limit}/${this.getTodayStartDate()}/${status}`, method: urlObj.method });
  }

  updateBulkFoodOrder(order: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateBulkFoodOrder;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, order);
  }

  depositeInWallet(id: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.depositeInWallet;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload);
  }

  withdrawFromWallet(id: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.withdrawFromWallet;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload);
  }

  changeFoodOrderAddress(id: any, payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeFoodOrderAddress;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, payload);
  }

  changeChildOrdersAddress(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.changeChildOrdersAddress;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, payload);
  }

  changePackageStatus(status: any, id: any) {
    console.log(status)
    const urlObj = this.apiConfigService.apiEndPointObj.changePackageStatus;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, { status });
  }
  getCustomerFirstOrder(payload: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCustomerFirstOrder;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, { ids: payload });
  }
  userRewardsPointsHistory(id: any, page: any, limit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.userRewardsPointsHistory;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}` + `/${page}` + `/${limit}`, method: urlObj.method });
  }
  getAllMarketplaceItems() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllMarketplaceItems;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method });
  }
  savemarketplaceItem(data: any) {
    this.runtimeStorageService.resetCacheData('ALL_MARKETPLACE_ITEMS');
    this.runtimeStorageService.resetCacheData('ALL_SPECIAL_MARKETPLACE_ITEMS');
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.savemarketplaceItem, data);
  }
  updatemarketplaceItem(id: any, data: any) {
    this.runtimeStorageService.resetCacheData('ALL_MARKETPLACE_ITEMS');
    this.runtimeStorageService.resetCacheData('ALL_SPECIAL_MARKETPLACE_ITEMS');
    const urlObj = this.apiConfigService.apiEndPointObj.updatemarketplaceItem;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  changemarketplaceAvailability(id: any, status: boolean) {
    const urlObj = this.apiConfigService.apiEndPointObj.marketplaceItemAvailability;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}/${status}`, method: urlObj.method });
  }
  getDayRangeBasedLogs(startDate: any, endDate: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getDayRangeBasedLogs;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${startDate}` + `/${endDate}`, method: urlObj.method });
  }
  getTimeBasedLogs(hour: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTimeBasedLogs;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${hour}`, method: urlObj.method });
  }
  getLineBasedLogs(lineLimit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getLineBasedLogs;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${lineLimit}`, method: urlObj.method });
  }

  getDayRangeBasedAuditLogs(startDate: any, endDate: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getDayRangeBasedAuditLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${startDate}` + `/${endDate}`,
      method: urlObj.method,
    });
  }
  getTimeBasedAuditLogs(hour: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getTimeBasedAuditLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${hour}`,
      method: urlObj.method,
    });
  }
  getLineBasedAuditLogs(lineLimit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getLineBasedAuditLogs;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${lineLimit}`,
      method: urlObj.method,
    });
  }

  getAllKitchenWalletList() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllKitchenWalletList);
  }

  getClusterCurrentOrdersCount(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getClusterCurrentOrdersCount, data);
  }
  getClusterCurrentSubscriptionCount(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getClusterCurrentSubscriptionCount, data);
  }
  getClusterCurrentBulkOrdersCount(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getClusterCurrentBulkOrdersCount, data);
  }
  getClusterCurrentPackageCount(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getClusterCurrentPackageCount, data);
  }
  getClusterCurrentOrdersList(status: any, page: any, limit: number, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getClusterCurrentOrdersList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method }, data);
  }
  getClusterCurrentPackageOrdersList(status: any, page: any, limit: number, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getClusterCurrentPackageOrdersList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method }, data);
  }

  getClusterBulkOrderList(status: any, page: any, limit: number, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getClusterBulkOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}/${limit}/${status}`, method: urlObj.method }, data);
  }

  orderListToDeliver(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.orderListToDeliver, data);
  }
  checkUserWallet(data: { customerId: any; customerPhoneNo: any; customerEmail: any; }) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.checkUserWallet, data, null, true);
  }

  marketPlaceGrouplist() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.marketPlaceGrouplist);
  }

  marketPlaceGroup(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.marketPlaceGroup, data);
  }

  updatemarketPlaceGroup(id: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updatemarketPlaceGroup;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  deletemarketPlaceGroup(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deletemarketPlaceGroup;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getAllMarketPlaceItem() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getAllMarketPlaceItem);
  }

  getMarketPlaceItemById(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMarketPlaceItemById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  saveMarketPlaceItem(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveMarketPlaceItem, data);
  }

  updateMarketPlaceItem(id: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateMarketPlaceItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  updateMarketPlaceItemImage(id: any, index: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateMarketPlaceItemImage;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${index}`, method: urlObj.method }, data);
  }
  deleteMarketPlaceItemImage(id: any, imageUrl: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteMarketPlaceItemImage;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${imageUrl}`, method: urlObj.method });
  }
  deleteMarketPlaceItem(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteMarketPlaceItem;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  saveMarketPlaceInventory(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.saveMarketPlaceInventory, data);
  }
  getMarketPlaceInventoryById(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMarketPlaceInventoryById;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }
  getMarketPlaceInventory() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getMarketPlaceInventory);
  }
  updateMarketPlaceInventory(id: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateMarketPlaceInventory;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }
  deleteMarketPlaceInventory(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteMarketPlaceInventory;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getMarketPlaceItemOrdersCount() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getMarketPlaceItemOrdersCount);
  }

  getMarketPlaceItemOrdersList(status: any, page: any, limit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMarketPlaceItemOrdersList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${status}/${page}/${limit}`, method: urlObj.method });
  }

  getMarketPlaceMainOrdersCount() {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.getMarketPlaceMainOrdersCount);
  }

  getMarketPlaceMainOrdersList(status: any, page: any, limit: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMarketPlaceMainOrdersList;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${status}/${page}/${limit}`, method: urlObj.method });
  }

  updateMarketPlaceMainAndItemOrder(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateMarketPlaceMainAndItemOrder, data);
  }

  getMarketPlaceInventoryByItemId(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getMarketPlaceInventoryByItemId;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  updateMarketPlaceItemOrder(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateMarketPlaceItemOrder, data);
  }

  updateMarketPlaceItemOrderStatus(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateMarketPlaceItemOrderStatus, data);
  }
  updateMarketPlaceMainAndItemOrderInfo(orderNo: any, msg: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateMarketPlaceMainAndItemOrderInfo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orderNo}/${msg}`, method: urlObj.method }, data);
  }
  updateAllItemOrdersInfo(orderNo: any, msg: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateAllItemOrdersInfo;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${orderNo}/${msg}`, method: urlObj.method }, data);
  }

  createShipRocketDeliveryTask(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.createShipRocketDeliveryTask, data);
  }

  cancelShipRocketDeliveryTask(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.cancelShipRocketDeliveryTask;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }

  trackShipRocketDeliveryTask(taskId: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.trackShipRocketDeliveryTask;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${taskId}`, method: urlObj.method });
  }

  generateShipRocketMenifest(shipment_id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.generateShipRocketMenifest;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${shipment_id}`, method: urlObj.method });
  }

  generateShipRocketLabel(shipment_id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.generateShipRocketLabel;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${shipment_id}`, method: urlObj.method });
  }

  generateShipRocketInvoice(shipment_id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.generateShipRocketInvoice;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${shipment_id}`, method: urlObj.method });
  }

  getCombineOrderForDelivery(status: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getCombineOrderForDelivery;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${status}`, method: urlObj.method });
  }

  updateInventoryItemLimit(id: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateInventoryItemLimit;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  getInventoryItemHistory(id: any, page: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getInventoryItemHistory;
    return this.apiHttpService.REQUEST({ url: urlObj.url + `/${id}/${page}`, method: urlObj.method });
  }

  updateStandAloneShipment(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateStandAloneShipment, data);
  }

  cancelMarketPlaceItemOrder(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.cancelMarketPlaceItemOrder, data);
  }

  searchMarketPlaceItemOrderList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchMarketPlaceItemOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }

  searchMarketPlaceMainOrderList(data: any, page: number) {
    const urlObj = this.apiConfigService.apiEndPointObj.searchMarketPlaceMainOrderList;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${page}`, method: urlObj.method }, data);
  }

  updateUserRMInfo(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.updateUserRMInfo, data);
  }

  assignRMtoUserOrder(data: any) {
    return this.apiHttpService.REQUEST(this.apiConfigService.apiEndPointObj.assignRMtoUserOrder, data);
  }

  saveHotel(data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.saveHotel;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method }, data);
  }

  getAllHotels() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllHotels;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method });
  }

  getAllKitchenPatners() {
    const urlObj = this.apiConfigService.apiEndPointObj.getAllKitchenPatners;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url, method: urlObj.method });
  }

  getHotelByID(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getHotelByID;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  updateHotel(id: any, data: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.updateHotel;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method }, data);
  }

  deleteHotel(id: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.deleteHotel;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${id}`, method: urlObj.method });
  }

  getUtmEvents(cluster_name: any) {
    const urlObj = this.apiConfigService.apiEndPointObj.getUtmEvents;
    return this.apiHttpService
      .REQUEST({ url: urlObj.url + `/${cluster_name}`, method: urlObj.method });
  }
   getCustomerMarketPlaceItemPastOrders(id: any, page: number) {
    const urlObj =
      this.apiConfigService.apiEndPointObj.getCustomerMarketPlaceItemPastOrders;
    return this.apiHttpService.REQUEST({
      url: urlObj.url + `/${id}/${page}`,
      method: urlObj.method,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { ConfirmationModalService } from '../confirmation-modal/confirmation-modal.service';
import { environment } from 'src/environments/environment';


interface Filter {
  orgId: string;
  cafeId: string;
  fromDate: string;
  toDate: string;
}
@Component({
  selector: 'app-consumption-order-details',
  templateUrl: './consumption-order-details.component.html',
  styleUrls: ['./consumption-order-details.component.scss']
})
export class ConsumptionOrderDetailsComponent implements OnInit {

  orglist: any = [];
  orgAdmin: any;
  filterObj: Filter = {
    orgId: '',
    cafeId: '',
    fromDate: '',
    toDate: '',
  };
  orgDetails: any = {};
  filteredOrderList: any = [];
  cafeList: any[] = [];
  imageUrl = environment.imageUrl;
  orderDate: any;
  statusPayload: any;

  constructor(private apiMainService: ApiMainService, private localStorageService: LocalStorageService, private confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
    this.orgAdmin = this.localStorageService.getCacheData('ADMIN_PROFILE');
    console.log(this.orgAdmin);

    this.initializeDates();

    this.getOrgList();
  }

  private initializeDates(): void {
    const today = new Date();
    const iso = today.toISOString().substring(0, 10);
    this.filterObj.fromDate = iso;
    this.filterObj.toDate = iso;
  }

  async getOrgList() {
    try {
      const data = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        { countOnly: false },
        1
      );
      this.orglist = data;
      this.setInitialData();
    } catch (error) {
      console.error(error);
    }
  }

  setInitialData() {
    if (this.orgAdmin.role === 'ORGADMIN') {
      this.filterObj.orgId = this.orgAdmin?.orgDetails?._id;
      this.setOrgDetails();
    }
  }

  setOrgDetails() {
    const org = this.orglist.find((o: any) => o._id === this.filterObj.orgId);
    this.cafeList = org?.cafeteriaList ?? [];
  }

  filterOrders(): void {
    const org = this.orglist.find((o: any) => o._id === this.filterObj.orgId);
    const cafe = this.cafeList.find(c => c.cafeteria_id === this.filterObj.cafeId);

    if (!org || !cafe) {
      console.warn('Organization or Cafeteria not selected!');
      return;
    }

    const body = {
      cafeteriaName: cafe.cafeteria_name,
      organizationName: org.organization_name,
      fromDate: new Date(this.filterObj.fromDate),
      toDate: new Date(this.filterObj.toDate),
    };

    this.getConsumptionOrderByFilter(body);
  }

  async getConsumptionOrderByFilter(body: any) {
    try {
      const res = await this.apiMainService.fetchConsumptionOrdersbysearchObj(body);
      console.log(res);

      this.filteredOrderList = res

    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
    }
  }


  async updateConsumptionOrderStatus() {
    try {
      const res = await this.apiMainService.updateConsumptionOrderStatus(this.filteredOrderList[0].
        organization_id, this.filteredOrderList[0].
        cafeteria_orignal_id,
        this.statusPayload
      );
      this.filterOrders();

    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
    }
  }

  async updateConsumptionSingleMealStatus() {
    try {
      const res = await this.apiMainService.updateConsumptionSingleMeslStatus(this.filteredOrderList[0].
        organization_id, this.filteredOrderList[0].
        cafeteria_orignal_id,
        this.statusPayload
      );
      this.filterOrders();

    } catch (err: any) {
      console.error('Error fetching outlet orders', err);
    }
  }

  showPopupForItemActivation(order: any, status: any) {
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status: status
    };
    const actionText = status === 'approved' ? 'approve' : 'reject';
    const statusText = `Are you sure you want to ${actionText} all menu items?`;
    this.confirmationModalService.modal(
      statusText,
      this.updateConsumptionOrderStatus,
      this
    );
  }

  showPopupForSinleItemActivation(order: any, meal: any, status: any) {
    this.orderDate = order.orderDate;
    this.statusPayload = {
      orderDate: this.orderDate,
      status,
      itemId: meal._id
    };
    const actionText = status === 'approved' ? 'approve' : 'reject';
    const statusText = `Are you sure you want to ${actionText} ${meal.itemName} item?`;
    this.confirmationModalService.modal(
      statusText,
      this.updateConsumptionSingleMealStatus,
      this
    );
  }

  checkAllMealStatus(order: any) {
    return order.mealTypeList.find((data: any) => data.status == 'review');
  }

  downloadOrder(order: any) {
    const url = `${this.imageUrl}${order.imageUrl}`;
    const link = document.createElement('a');
    link.href = url;

    const fileName = order.imageUrl.split('/').pop() || 'downloaded-file';
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


}

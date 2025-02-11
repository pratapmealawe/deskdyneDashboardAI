import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ApiMainService } from './apiService/apiMain.service';
import { SendDataToComponent } from './sendDataToComponent.service';

@Injectable({
  providedIn: 'root'
})
export class OrgAdminDataService {

  constructor(private localStorageService: LocalStorageService, private apiMainService: ApiMainService, private sendDataToComponent: SendDataToComponent) { }

  async getFilteredOrders(filter: any, page: number) {
    try {
      const data = await this.apiMainService.searchOutletOrderList(filter, page);
      return data;
    } catch (error) {
      console.error("Error while loading data:", error);
      throw error;
    }
  }
}

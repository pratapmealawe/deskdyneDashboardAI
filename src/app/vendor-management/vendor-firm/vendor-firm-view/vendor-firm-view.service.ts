import { Injectable } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class VendorFirmViewService {
  private vendorFirmSubject = new BehaviorSubject<any>(null);
  vendorFirm$ = this.vendorFirmSubject.asObservable();

  constructor(private apiMainService: ApiMainService) {}

  setVendorFirm(vendorFirm: any) {
    this.vendorFirmSubject.next(vendorFirm);
  }

  getVendorFirm() {
    return this.vendorFirmSubject.getValue();
  }

  async refreshVendorFirm(id: string) {
    try {
      const vendorFirm = await this.apiMainService.getVendorFirmById(id);
      this.setVendorFirm(vendorFirm);
      return vendorFirm;
    } catch (error) {
      console.error('Error refreshing vendor firm:', error);
      throw error;
    }
  }
}

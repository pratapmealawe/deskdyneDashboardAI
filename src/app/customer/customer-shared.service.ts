import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiMainService } from '@service/apiService/apiMain.service';

@Injectable()
export class CustomerSharedService {
  private userDetailsSubject = new BehaviorSubject<any>(null);
  userDetails$: Observable<any> = this.userDetailsSubject.asObservable();

  constructor(private apiMainService: ApiMainService) { }

  setUserDetails(details: any) {
    this.userDetailsSubject.next(details);
  }

  getUserDetails(): any {
    return this.userDetailsSubject.value;
  }

  async refreshCustomerById(id: string) {
    if (!id || id === 'undefined') {
      return null;
    }
    try {
      const customer = await this.apiMainService.getCustomerById(id);
      if (customer) {
        this.setUserDetails(customer);
      }
      return customer;
    } catch (error) {
      console.error('Error refreshing customer data by ID:', error);
      return null;
    }
  }

  clearUserDetails() {
    this.userDetailsSubject.next(null);
  }
}

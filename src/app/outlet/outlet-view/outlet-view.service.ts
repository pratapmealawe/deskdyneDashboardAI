import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiMainService } from '@service/apiService/apiMain.service';

@Injectable({
  providedIn: 'root'
})
export class OutletViewService {
  private outletSubject = new BehaviorSubject<any>(null);
  outlet$: Observable<any> = this.outletSubject.asObservable();

  constructor(private apiMainService: ApiMainService) {}

  setOutlet(outlet: any) {
    this.outletSubject.next(outlet);
  }

  getOutlet(): any {
    return this.outletSubject.value;
  }

  async refreshOutlet(id: string) {
    try {
      const outlet = await this.apiMainService.getOutletById(id);
      if (outlet) {
        this.setOutlet(outlet);
      }
      return outlet;
    } catch (error) {
      console.error('Error refreshing outlet data:', error);
      return null;
    }
  }

  clearOutlet() {
    this.outletSubject.next(null);
  }
}

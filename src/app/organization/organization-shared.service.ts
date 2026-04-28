import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiMainService } from '@service/apiService/apiMain.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationSharedService {
  private organizationSubject = new BehaviorSubject<any>(null);
  organization$: Observable<any> = this.organizationSubject.asObservable();

  constructor(private apiMainService: ApiMainService) {}

  setOrganization(org: any) {
    this.organizationSubject.next(org);
  }

  getOrganization(): any {
    return this.organizationSubject.value;
  }

  async refreshOrganization(id: string) {
    try {
      // Assuming getOrg fetches a single organization by ID
      const org = await this.apiMainService.getOrg(id);
      if (org) {
        this.setOrganization(org);
      }
      return org;
    } catch (error) {
      console.error('Error refreshing organization data:', error);
      return null;
    }
  }

  clearOrganization() {
    this.organizationSubject.next(null);
  }
}

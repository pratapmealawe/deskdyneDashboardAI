import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { SearchFilterService } from 'src/service/search-filter.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-billing',
  templateUrl: './org-billing.component.html',
  styleUrls: ['./org-billing.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OrgBillingComponent implements OnInit, OnChanges {
  @Input() adminOrg: any
    orgAdmin: any;
  
    constructor(
      private apiMainService: ApiMainService,
      private localStorageService: LocalStorageService,
      private searchService: SearchFilterService
    ) { }
  
  
    ngOnInit(): void {
      this.initFunc()
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['adminOrg'] && changes['adminOrg'].currentValue) {
        this.initFunc()
      }
    }
  
    initFunc() {
      this.orgAdmin = this.adminOrg ? { orgDetails: this.adminOrg } : this.localStorageService.getCacheData('ADMIN_PROFILE');
    }
}

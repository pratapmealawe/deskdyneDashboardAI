import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderstatusService } from 'src/app/main-loader/loaderstatus.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss'],
})
export class OutletDetailsComponent implements OnInit {
  @Input() outletObj: any;
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;
  loading: boolean = false

  constructor(
    private router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private loadingService: LoaderstatusService,
    private policyService: PolicyService
  ) {
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  editOrg() {
    this.runtimeStorageService.setCacheData('OUTLET_EDIT', this.outletObj);
    this.router.navigate(['/addOutlet']);
  }
}

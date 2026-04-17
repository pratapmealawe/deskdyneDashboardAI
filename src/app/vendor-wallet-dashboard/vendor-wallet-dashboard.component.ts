import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { SearchFilterService } from 'src/service/search-filter.service';
import { ConfirmationModalService } from '../../service/confirmation-modal.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-vendor-wallet-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './vendor-wallet-dashboard.component.html',
  styleUrls: ['./vendor-wallet-dashboard.component.scss']
})
export class VendorWalletDashboardComponent {

  constructor(
    private apiMainService: ApiMainService,
    private router: Router,
    private policyService: PolicyService,
    private localStorageService: LocalStorageService,
    private confirmationModalService: ConfirmationModalService,
    private searchService: SearchFilterService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

}
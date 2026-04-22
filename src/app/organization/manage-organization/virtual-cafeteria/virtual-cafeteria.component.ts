import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OrganizationSharedService } from '../../organization-shared.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ToasterService } from '@service/toaster.service';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { VirtualCafeteriaEmployeeListingComponent } from './virtual-cafeteria-employee-listing/virtual-cafeteria-employee-listing.component';
import { VirtualCafeteriaCategoriesComponent } from './virtual-cafeteria-categories/virtual-cafeteria-categories.component';
import { VirtualCafeteriaPackageComponent } from './virtual-cafeteria-package/virtual-cafeteria-package.component';
import { CafeteriaSelectorComponent } from '../cafeteria-selector/cafeteria-selector.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-virtual-cafeteria',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, VirtualCafeteriaEmployeeListingComponent, VirtualCafeteriaCategoriesComponent, CafeteriaSelectorComponent, VirtualCafeteriaPackageComponent],
  templateUrl: './virtual-cafeteria.component.html',
  styleUrls: ['./virtual-cafeteria.component.scss']
})
export class VirtualCafeteriaComponent implements OnInit {
  orgObj: any;
  serverUrl = environment.mlImageUrl;
  serverDDUrl = environment.imageUrl;
  cafeteriaList: any[] = [];
  selectedCafeteria: any = {};
  selectedTabIndex = 0;
  private orgSub: Subscription | undefined;

  constructor(
    private apiMainService: ApiMainService,
    private modalService: MatDialog,
    private confirmationModalService: ConfirmationModalService,
    private toaster: ToasterService,
    private orgSharedService: OrganizationSharedService
  ) { }

  ngOnInit(): void {
    this.orgSub = this.orgSharedService.organization$.subscribe(org => {
      if (org) {
        this.orgObj = org;
        this.initializeComponent();
      }
    });
  }

  initializeComponent(): void {
    if (this.orgObj?.cafeteriaList) {
      this.cafeteriaList = [...this.orgObj.cafeteriaList];
      if (this.cafeteriaList.length > 0 && !this.selectedCafeteria?.cafeteria_id) {
        this.selectedCafeteria = this.cafeteriaList[0];
        this.loadTabData();
      }
    }
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    this.loadTabData();
  }

  onCafeteriaSelection(cafe: any): void {
    this.selectedCafeteria = cafe;
  }

  loadTabData(): void {
    // Each tab (Categories, Packages, Employees) handles its own loading via its child component
  }

  ngOnDestroy() {
    if (this.orgSub) {
      this.orgSub.unsubscribe();
    }
  }


  closeDialog() {
    this.modalService.closeAll();
  }
}
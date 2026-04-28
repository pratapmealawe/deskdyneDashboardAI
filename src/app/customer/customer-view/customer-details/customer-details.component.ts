import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ToasterService } from '@service/toaster.service';
import { MaterialModule } from 'src/app/material.module';
import { CustomerSharedService } from '../../customer-shared.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class CustomerDetailsComponent implements OnInit {
  imgBasePath = environment.imageUrl;
  imageUrl = '';
  pocDetails: any
  customerDetails: any;

  constructor(
    private toasterService: ToasterService,
    private confirmationModalService: ConfirmationModalService,
    private apiMainService: ApiMainService,
    private customerSharedService: CustomerSharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerSharedService.userDetails$.subscribe(details => {
      if (details) {
        this.customerDetails = details;
      }
    });
  }

  // 👉 Generate initials for avatar
  getInitials(name: string | undefined): string {
    if (!name) return '?';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  confirmDelete() {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete this user ${this.customerDetails?.userName || this.customerDetails?.customer?.userName || 'this user'}? User will be removed from all lists.`,
      callback: this.deleteUser,
      context: this
    })
  }

  async deleteUser() {
    try {
      const phoneNo = this.customerDetails?.phoneNo || this.customerDetails?.customer?.phoneNo;
      if (!phoneNo) return;
      
      const res = await this.apiMainService.deleteUserFromAllList(phoneNo);
      this.toasterService.success("Deleted User Successfully");
      this.router.navigate(['/app/customer']);
    } catch (err: any) {
      console.error(err);
    }
  }

  imgError(event: any) {
    event.target.src = 'assets/Imageunavailable.webp';
  }

  // 👉 Filter POCs to show only the current user's POC entry
  getFilteredPocs(): any[] {
    const pocs = this.customerDetails?.orgInfo?.poc_details || [];
    const userPhone = this.customerDetails?.customer?.phoneNo;
    // Find if current user is a POC
    const userPoc = pocs.find((poc: any) => poc.poc_phoneNo?.toString() === userPhone?.toString());
    return userPoc ? [userPoc] : [];
  }
}

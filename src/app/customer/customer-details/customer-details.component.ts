import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { ConfirmationModalService } from '@service/confirmation-modal.service';
import { ToasterService } from '@service/toaster.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() userDetails: any
  imageUrl = '';
  pocDetails: any
  customerDetails: any

  constructor(
    private toasterService: ToasterService,
    private confirmationModalService: ConfirmationModalService,
    private apiMainService: ApiMainService
  ) { }

  ngOnInit(): void {
    this.getUserCustomerDetails()

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
      msg: `Are you sure you want to delete this user ${this.userDetails?.userName}? User will be removed from all lists.`,
      callback: this.deleteUser,
      context: this
    })
  }

  async getUserCustomerDetails() {
    try {
      const res = await this.apiMainService.getCustomerProfileDetails(this.userDetails?.phoneNo)
      // 
      this.customerDetails = res
    } catch (err: any) {
    }
  }

  async deleteUser() {
    try {
      const res = await this.apiMainService.deleteUserFromAllList(this.userDetails?.phoneNo)
      this.toasterService.success("Deleted User SuccessFully")
      this.getUserCustomerDetails()
    } catch (err: any) {
    }
  }

  // 👉 Get image URL for profile
  getImageUrl(imageUrl: string): string {
    return `${environment.imageUrl}${imageUrl}`;
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

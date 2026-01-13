import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from 'src/service/confirmation-modal.service';
import { ToasterService } from 'src/service/toaster.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() userDetails: any
  imageUrl = '';
  pocDetails: any

  constructor(private toasterService: ToasterService, private confirmationModalService: ConfirmationModalService, private apiMainService: ApiMainService) { }

  ngOnInit(): void {
    console.log(this.userDetails);
    this.getUserPocDetails()

  }

  confirmDelete() {
    this.confirmationModalService.modal({
      msg: `Are you sure you want to delete this user ${this.userDetails?.userName}? User will be removed from all lists.`,
      callback: this.deleteUser,
      context: this
    })
  }

  async getUserPocDetails() {
    try {
      const body = {
        poc_phoneNo: this.userDetails?.phoneNo
      }
      const res = await this.apiMainService.fetchtOrgInfo(body)
      console.log(res);
      this.pocDetails = res
    } catch (err: any) {
      console.log(err);
    }
  }

  async deleteUser() {
    try {
      const res = await this.apiMainService.deleteUserFromAllList(this.userDetails?.phoneNo)
      this.toasterService.success("Deleted User SuccessFully")
    } catch (err: any) {
      console.log(err);
    }
  }
}

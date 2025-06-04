import { Component, Input, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-customer-wallet',
  templateUrl: './customer-wallet.component.html',
  styleUrls: ['./customer-wallet.component.scss']
})
export class CustomerWalletComponent implements OnInit {
@Input() userObj: any;
  walletDetails:any;
  editMode:any = false;
  amt:any
  actionType:any;
  walletObj = {
    customerId:"",
    customerName:"",
    rewardsPoints:0,
    remark:""
  }
  page = 1;
  walletList: any = [];

  constructor(private apiMainService: ApiMainService, private policyService: PolicyService) {
  }
  ngOnInit() {
    console.log(this.userObj,"this.userObj");
    this.walletObj.customerId = this.userObj._id
    this.walletObj.customerName = this.userObj.userName
    this.checkWallets();
    this.getWalletBalance();
    this.getWalletList();
  }

  async getWalletBalance(){
      const res = await this.apiMainService.getWalletBalance(this.userObj._id);
      this.walletDetails = res;
  }

  changeBalance(type:any){
    this.walletObj.rewardsPoints = 0
    this.walletObj.remark = ""
    this.actionType = type;
    this.editMode = true;
  }

  async updateWallet(type:any){
    try {
        const res = type === 'add' ? await this.apiMainService.depositeInWallet(this.userObj._id,this.walletObj) : await this.apiMainService.withdrawFromWallet(this.userObj._id,this.walletObj);
        this.editMode = false;
        this.getWalletBalance();
        this.getWalletList();
    } catch (error) {
      console.log(error)
    }
  }

  async getWalletList() {
    try {
      let walletList:any=[];
        walletList = await this.apiMainService.userRewardsPointsHistory(this.userObj._id, this.page, 10);
      if (walletList && walletList.length > 0) {
        this.walletList = [...walletList];
        console.log('wallet list ', this.walletList)
        // this.nextOn = true;
      } else {
        // this.nextOn = false;
      }
    } catch (error) {
      console.log('error while searching wallet ', error);
    }
  }

  getMore() {
    this.page++;
    this.getWalletList();
  }

  async checkWallets() {
    try {
      if (this.userObj && this.userObj._id && this.userObj.phoneNo && this.userObj.email) {
        const walletObj = {
          customerId: this.userObj._id,
          customerPhoneNo: this.userObj.phoneNo,
          customerEmail: this.userObj.email
        };
          let wallet = await this.apiMainService.checkUserWallet(walletObj);
      }
    } catch (error) {
      console.log('error while reload ', error)
    }
  }

}

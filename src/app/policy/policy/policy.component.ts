import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent {
  policyArr: any;
  noRecords:Boolean = false;

  constructor(private apiMainService: ApiMainService, private router:Router, private localStorageService:LocalStorageService,
     private runtimeStorageService:RuntimeStorageService,private confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
    this.getAllPolicy();
  }

  async getAllPolicy() {
    // this.policyArr = this.localStorageService.getCacheData('POLICIES')
    try {
      const policyArr:any = await this.apiMainService.getAllPolicy();
      console.log(policyArr)
      if (policyArr && policyArr.length > 0) {
        this.localStorageService.setCacheData('POLICIES',policyArr);
        this.policyArr = policyArr;
        this.noRecords = false;        
        console.log(this.policyArr)
      }
      else{
        this.noRecords = true;
      }
    } catch (error) {
      console.log(error)
    }
  }

  editPolicy(id: any) {
    this.runtimeStorageService.setCacheData('VIEW_POLICY',id);
    this.router.navigate(['/addPolicy']);
  }

  async deletePolicy(id: any) {
    try {
      await this.apiMainService.deletePolicy(id);
      this.getAllPolicy();
    } catch (error) {
      console.log(error);
    }
  }

  async confirmDelete(id:any) {
    try {
      this.confirmationModalService.modal(`Are you sure, you want to Delete this Policy`, ()=>this.deletePolicy(id), this);
    } catch (e) {
      console.log('error while Deleting Policy ', e);
    }
  }
}

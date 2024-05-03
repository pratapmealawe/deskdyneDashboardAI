import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent {
  policyObj: any = {
    policy_name: '',
    policy_description: '',
    route_policies: {
      
    },
    button_policies: {
      
    }
  }
  routeKeys: any;
  buttonKeys: any;
  policyArr: any;
  showErrorMsg: Boolean = false;
  editMode: Boolean = false;
  policyId: any

  constructor(private apiMainService: ApiMainService, private localStorageService: LocalStorageService, private runtimeStorageService:RuntimeStorageService, private router: Router) { }

  ngOnInit(): void {
    this.routeKeys = Object.keys(this.policyObj.route_policies);
    this.buttonKeys = Object.keys(this.policyObj.button_policies);
    this.policyId = this.runtimeStorageService.getCacheData('VIEW_POLICY');
    this.getAllPolicy(this.policyId);
  }

  editPolicy(id: any) {
    console.log('inside edit')
    this.editMode = true;
    const arr = this.policyArr.filter((el: any) => el._id == id)
    if (arr && arr.length > 0) {
      Object.keys(this.policyObj.button_policies).forEach((key:any)=>{
        if(!arr[0].button_policies[key]){
          arr[0].button_policies[key] = this.policyObj.button_policies[key];
        }
      })
      this.policyObj = arr[0];
      //use Object.assign
      console.log(this.policyObj)
    }
  }

  async updatePolicy() {
    try {
      const id = this.policyId;
      console.log(this.policyObj)
      const policy = await this.apiMainService.updatePolicy(id, this.policyObj);
      this.router.navigate(['policy']);
    } catch (error) {
      console.log(error)
    }

  }

  async getAllPolicy(id: any) {
    // this.policyArr = this.localStorageService.getCacheData('POLICIES');
    // if (id) {
    //   this.editPolicy(id);
    // }
    try {
      const policyArr:any = await this.apiMainService.getAllPolicy();
      if (policyArr && policyArr.length > 0) {
        this.policyArr = policyArr;
        if(id){
          this.editPolicy(id);
        }        
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addPolicy() {
    try {
      if (this.policyObj.policy_name === '' || this.policyObj.policy_description === '') {
        this.showErrorMsg = true;
        return;
      }
      else {
        this.showErrorMsg = false;
        const res = await this.apiMainService.addPolicy(this.policyObj);
        this.router.navigate(['policy']);
      }

    } catch (error) {
      console.log(error)
    }
  }

  showReferencePolicy(event: any) {
    const id = event.target.value;
    const arr = this.policyArr.filter((el: any) => el._id == id)
    if (arr && arr.length > 0) {
      Object.keys(this.policyObj.button_policies).forEach((key:any)=>{
        if(!arr[0].button_policies[key]){
          arr[0].button_policies[key] = this.policyObj.button_policies[key];
        }
      })
      this.policyObj = arr[0];
    }
  }

  cancelPolicy(){
    this.router.navigate(['policy'])
  }

  selectAllRoutes() {
    Object.keys(this.policyObj.route_policies).forEach((key: any) => {
      this.policyObj.route_policies[key] = true;
    })
  }

  selectAllPolicy() {
    Object.keys(this.policyObj.button_policies).forEach((key: any) => {
      this.policyObj.button_policies[key] = true;
    })
  }
}

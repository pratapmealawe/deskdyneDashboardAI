// import { Component } from "@angular/core";
// import { ApiMainService } from "src/service/apiService/apiMain.service";
// @Component({
// selector:'app-admin',
// templateUrl:'admin.component.html',
// styleUrls:['admin.component.scss']
// })
// export class AdminComponent{

//     adminList: any = [];
//     access:any;
//     constructor(private apiMainService:ApiMainService){
//       this.getAllAdminList();
//       console.log('admin list',this.adminList);
//     }
//     searchObj = {
//         adminName: '',
//         phoneNo: '',
//         email: '',
//         adminId: '',
//       };
//      async getAllAdminList(){
//       console.log('getAllAdminList');
//        try{
//            this.adminList = await this.apiMainService.getAdminProfileList();
//            console.log('getAllAdminList',this.adminList);
//        }catch(error){
//          console.log('getAllAdminList',error)
//        }
//       }
//       searchAdmin(){

//       }
//       addAdmin(){

//       }
//       editAdmin(admin:any){

//       }
// }




import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  searchObj = {
    adminName: '',
    phoneNo: '',
    email: '',
    adminId: '',
  };
  adminList: any = [];
  access:any;
  imageUrl: any = environment.imageUrl;
  constructor(public router: Router, private apiMainService: ApiMainService,
    private runtimeStorageService: RuntimeStorageService, private policyService:PolicyService) {
    this.getAllAdminList();
    this.access = this.policyService.getCurrentButtonPolicy();
  }


  addAdmin() {
    this.router.navigate(['adminAdd']);
  }
  async getAllAdminList() {
    try {
      this.adminList = await this.apiMainService.getAdminProfileList();
    } catch (e) {
      console.log('error while fetching admin profile')
    }
  }
  async searchAdmin() {
    try {
      this.adminList = await this.apiMainService.searchAdmin(this.searchObj);
    } catch (e) {
      console.log('error while searching admin profile')
    }
  }

  editAdmin(admin: any) {
    this.runtimeStorageService.setCacheData('VIEW_ADMIN', admin);
    this.router.navigate(['adminAdd']);
  }

}

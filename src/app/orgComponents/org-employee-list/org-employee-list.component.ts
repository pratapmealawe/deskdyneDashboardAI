import {Component, OnInit} from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';

@Component({
  selector: 'app-org-employee-list',
  templateUrl: './org-employee-list.component.html',
  styleUrls: ['./org-employee-list.component.scss']
})
export class OrgEmployeeListComponent implements OnInit {
  orgDetails:any={};
  employeeList: any;

  constructor(private apiMainService:ApiMainService,private localStorageService:LocalStorageService){
  }

  ngOnInit(){
    console.log("ngOnInit Calling");
    const profile = this.localStorageService.getCacheData('ADMIN_PROFILE');
    this.orgDetails = profile.orgDetails;
    this.getEmployeeListByOrgId()
  }

  async getEmployeeListByOrgId(){
    try{
      this.employeeList = await this.apiMainService.getEmployeeListByOrgId(this.orgDetails._id);
    }catch(err){
      console.log(err);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  searchObj = {
    adminName: '',
    phoneNo: '',
    email: '',
    adminId: '',
  };
  adminList: any = [];
  access: any;
  imageUrl: any = environment.imageUrl;
  btnPolicy: any;

  constructor(
    public router: Router,
    private apiMainService: ApiMainService,
    private runtimeStorageService: RuntimeStorageService,
    private policyService: PolicyService
  ) {
    this.getAllAdminList();
  }
  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
  }

  addAdmin() {
    this.router.navigate(['addAdmin']);
  }
  async getAllAdminList() {
    try {
      this.adminList = await this.apiMainService.getAdminProfileList();
    } catch (e) {
      console.log('error while fetching admin profile');
    }
  }
  async searchAdmin() {
    try {
      this.adminList = await this.apiMainService.searchAdmin(this.searchObj);
    } catch (e) {
      console.log('error while searching admin profile');
    }
  }

  editAdmin(admin: any) {
    this.runtimeStorageService.setCacheData('VIEW_ADMIN', admin);
    this.router.navigate(['addAdmin']);
  }
}

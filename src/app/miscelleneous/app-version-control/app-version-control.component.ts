import { Component, OnInit } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
  selector: 'app-app-version-control',
  templateUrl: './app-version-control.component.html',
  styleUrls: ['./app-version-control.component.scss'],
})
export class AppVersionControlComponent implements OnInit {
  allAppVersions: any = [];
  variableObj: any = {};
  editMode = false;
  addnewVariable = false;
  constructor(
    private apiMainService: ApiMainService
  ) {
    this.getAllAppVersions();
  }

  ngOnInit(): void {}

  async getAllAppVersions() {
    try {
      const allAppVersions = await this.apiMainService.getAllAppVersionList();
      if (allAppVersions && allAppVersions.length > 0) {
        this.allAppVersions = allAppVersions;
      } else {
        this.allAppVersions = [];
      }
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  addVariable() {
    this.editMode = true;
    this.addnewVariable = true;
  }

  async submitnewVariable(variableObj: any) {
    try {
      await this.apiMainService.saveAppVersion(variableObj);
      this.getAllAppVersions();
      this.cancel();
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  async updateVariable(variableObj: any) {
    try {
      await this.apiMainService.updateAppVersion(variableObj);
      this.getAllAppVersions();
      this.cancel();
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }

  cancel() {
    this.editMode = false;
    this.addnewVariable = false;
    this.variableObj = {};
  }

  editVariable(variableObj: any) {
    this.editMode = true;
    this.addnewVariable = false;
    this.variableObj = variableObj;
  }
}

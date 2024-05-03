import { Component } from '@angular/core';
import { ConfirmationModalService } from 'src/app/confirmation-modal/confirmation-modal.service';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-config-variable',
  templateUrl: './config-variable.component.html',
  styleUrls: ['./config-variable.component.scss']
})
export class ConfigVariableComponent {
  allVariables: any = [];
  variableObj: any = {};
  editMode = false;
  addnewVariable = false;
  variableType = 'String';
  access:any;
  constructor(private apiMainService: ApiMainService,
    private confirmationModalService: ConfirmationModalService, private policyService:PolicyService) {
    this.getAllVariables();
    this.access = this.policyService.getCurrentButtonPolicy();
  }
  async getAllVariables() {
    try {
      const allVariables = await this.apiMainService.getAllVariables();
      if (allVariables && allVariables.length > 0) {
        this.allVariables = allVariables;
      } else {
        this.allVariables = [];
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
      const allVariables = await this.apiMainService.saveVariable(variableObj);
      this.getAllVariables();
      this.cancel()
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  async updateVariable(variableObj: any) {
    try {
      await this.apiMainService.updateVariable(variableObj);
      this.getAllVariables();
      this.cancel()
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  cancel() {
    this.editMode = false;
    this.addnewVariable = false;
    this.variableObj = {};
  }
  async deleteVariable(id: string) {
    try {
      await this.apiMainService.deleteVariable(id);
      this.getAllVariables();
      this.cancel()
    } catch (e) {
      console.log('Error while fetching config variables ', e);
    }
  }
  editVariable(variableObj: any) {
    this.editMode = true;
    this.addnewVariable = false;
    this.variableObj = variableObj;
  }
  showPopup(variableObj: any) {
    this.confirmationModalService.modal(`Are you sure, you want to delete ${variableObj.configName}`,
      () => this.deleteVariable(variableObj._id), this);
  }
}

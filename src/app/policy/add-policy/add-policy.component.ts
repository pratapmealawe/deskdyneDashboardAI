import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { LocalStorageService } from 'src/service/local-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss'],
})
export class AddPolicyComponent {
  policyObj: any = {
    policy_name: '',
    policy_description: '',
    route_policies: {
      outlet: false,
      addOutlet: false,
      vendor: false,
      searchVendor: false,
      addVendor: false,
      admin: false,
      addAdmin: false,
      faq: false,
      configVariable: false,
      appVersionControl: false,
      policy: false,
      addPolicy: false,
      currentOrder: false,
      searchOrder: false,
      dashboard: false,
      serverlogs: false,
      b2bAddorg: false,
      b2bSearchOrg: false,
      consumptionOrders: false,
      orgDashboard: false,
      orgMenuItems: false,
      orgOrders: false,
      orgPreOrders: false,
      orgSubcription: false,
      orgReviews: false,
      appFeedbacks: false,
      excelExport: false,
      orgReports: false,
      orgVendorInfo: false,
      orgMenuCounters: false,
      orgIncidentManagement: false,
      orgChecklist: false,
      orgEmployeeList: false,
      orgBulkOrderHistory: false,
      orgManualOrders: false,
      orgBilling: false,
      viewChecklistQuestion: false,
      submitChecklist: false,
      checklistHistory: false,
      foodItem: false,
      pastOrder: false,
      viewEnquiries: false,
      outletExcelExport: false,
      mainDashboard: false,
      customer: false,
      outletMasterMenu: false,
      addVendorFirm: false,
      searchVendorFirm: false,
      billing: false,
      otherOrder: false,
      configImages: false,
      configImagesGroup: false,
      eventPopup: false,
      addEventPopup: false,
    },
    button_policies: {
      addOutlet: false,
      editOutlet: false,
      deleteOutlet: false,
      viewOutlet: false,
      addOutletCategory: false,
      addMenu: false,
      editMenu: false,
      deleteMenu: false,
      addVendor: false,
      editVendor: false,
      deleteVendor: false,
      addPolicy: false,
      editPolicy: false,
      deletePolicy: false,
      addAdmin: false,
      editAdmin: false,
      deleteAdmin: false,
      addOrganization: false,
      editOrganization: false,
      deleteOrganization: false,
      viewOrganization: false,
      bulkMenuSection: false,
      mealAweOutlet: false,
      b2bWeeklyMenu: false,
      employeeList: false,
      guestEmployeeList: false,
      organizationCompliance: false,
      addFaq: false,
      editFaq: false,
      deleteFaq: false,
      addVariable: false,
      editVariable: false,
      deleteVariable: false,
      addAppVersion: false,
      editAppVersion: false,
      deleteAppVersion: false,
      addChecklist: false,
      editChecklist: false,
      deleteChecklist: false,
      addFoodItem: false,
      editFoodItem: false,
      deleteFoodItem: false,
      feedbackAcknowledge: false,
      addIncident: false,
      editIncident: false,
      deleteIncident: false,
      eventPopup: Boolean,
      addEventPopup: Boolean,
    },
  };
  routeKeys: any;
  buttonKeys: any;
  policyArr: any;
  showErrorMsg: Boolean = false;
  editMode: Boolean = false;
  policyId: any;
  btnPolicy: any;

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private runtimeStorageService: RuntimeStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();
    this.routeKeys = Object.keys(this.policyObj.route_policies);
    this.buttonKeys = Object.keys(this.policyObj.button_policies);
    this.policyId = this.runtimeStorageService.getCacheData('VIEW_POLICY');
    this.getAllPolicy(this.policyId);
  }

  editPolicy(id: any) {
    this.editMode = true;
    const arr = this.policyArr.filter((el: any) => el._id == id);
    if (arr && arr.length > 0) {
      Object.keys(this.policyObj.button_policies).forEach(
        (key: keyof typeof this.policyObj.button_policies) => {
          if (!arr[0].button_policies[key]) {
            arr[0].button_policies[key] = this.policyObj.button_policies[key];
          }
        }
      );
      this.policyObj = arr[0];
      //use Object.assign
    }
  }

  async updatePolicy() {
    try {
      const id = this.policyId;
      const policy = await this.apiMainService.updatePolicy(id, this.policyObj);
      this.router.navigate(['policy']);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPolicy(id: any) {
    // this.policyArr = this.localStorageService.getCacheData('POLICIES');
    // if (id) {
    //   this.editPolicy(id);
    // }
    try {
      const policyArr: any = await this.apiMainService.getAllPolicy();
      if (policyArr && policyArr.length > 0) {
        this.policyArr = policyArr;
        if (id) {
          this.editPolicy(id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addPolicy() {
    try {
      if (
        this.policyObj.policy_name === '' ||
        this.policyObj.policy_description === ''
      ) {
        this.showErrorMsg = true;
        return;
      } else {
        this.showErrorMsg = false;
        const res = await this.apiMainService.addPolicy(this.policyObj);
        this.router.navigate(['policy']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  showReferencePolicy(event: any) {
    const id = event.target.value;
    const arr = this.policyArr.filter((el: any) => el._id == id);
    if (arr && arr.length > 0) {
      Object.keys(this.policyObj.button_policies).forEach((key: any) => {
        if (!arr[0].button_policies[key]) {
          arr[0].button_policies[key] = this.policyObj.button_policies[key];
        }
      });
      this.policyObj = arr[0];
    }
  }

  cancelPolicy() {
    this.router.navigate(['policy']);
  }

  selectAllRoutes() {
    Object.keys(this.policyObj.route_policies).forEach((key: any) => {
      this.policyObj.route_policies[key] = true;
    });
  }

  selectAllPolicy() {
    Object.keys(this.policyObj.button_policies).forEach((key: any) => {
      this.policyObj.button_policies[key] = true;
    });
  }
}

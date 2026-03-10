import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
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
    route_policies: {},
    button_policies: {},
  };

  routeKeys: string[] = [];
  buttonKeys: string[] = [];

  policyArr: any[] = [];
  editMode = false;
  showErrorMsg = false;
  policyId: string | null = null;

  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private runtimeStorage: RuntimeStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.policyId = this.runtimeStorage.getCacheData('VIEW_POLICY');
    this.initializeDefaultPolicy();
    this.loadPolicies();
  }

  initializeDefaultPolicy() {
    // Default structure
    const defaultPolicy = {
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
      dailyAdminExcelExport: false,
      mainDashboard: false,
      customer: false,
      outletMasterMenu: false,
      addVendorFirm: false,
      searchVendorFirm: false,
      billing: false,
      otherOrder: false,
      configImages: false,
      configImagesGroup: false,
      vendorPayout: false,
      auditReport: false,
      eventPopup: false,
      addEventPopup: false,
      vendorWalletDashboard: false,
      allOrders: false,
      scheduledNotifications: false,
    };

    const button_policies = {
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
    }

    this.policyObj.route_policies = { ...defaultPolicy };
    this.policyObj.button_policies = { ...button_policies };

    this.routeKeys = Object.keys(this.policyObj.route_policies);
    this.buttonKeys = Object.keys(this.policyObj.button_policies);
  }

  async loadPolicies() {
    try {
      const response: any = await this.apiMainService.getAllPolicy();
      this.policyArr = response || [];

      if (this.policyId) {
        this.editPolicy(this.policyId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  editPolicy(id: string) {
    this.editMode = true;

    const policy = this.policyArr.find((p) => p._id === id);
    if (policy) {
      // Ensure backward compatibility (missing keys get added)
      Object.assign(this.policyObj.route_policies, policy.route_policies);
      Object.assign(this.policyObj.button_policies, policy.button_policies);

      this.policyObj.policy_name = policy.policy_name;
      this.policyObj.policy_description = policy.policy_description;
    }
  }

  async addPolicy() {
    if (!this.policyObj.policy_name || !this.policyObj.policy_description) {
      this.showErrorMsg = true;
      return;
    }

    this.showErrorMsg = false;

    try {
      await this.apiMainService.addPolicy(this.policyObj);
      this.router.navigate(['policy']);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePolicy() {
    try {
      await this.apiMainService.updatePolicy(this.policyId, this.policyObj);
      this.router.navigate(['policy']);
    } catch (error) {
      console.log(error);
    }
  }

  showReferencePolicy(event: any) {
    const policyId = event.value;
    const policy = this.policyArr.find((p) => p._id === policyId);

    if (policy) {
      this.policyObj.route_policies = { ...policy.route_policies };
      this.policyObj.button_policies = { ...policy.button_policies };
    }
  }

  selectAllRoutes() {
    Object.keys(this.policyObj.route_policies).forEach(
      (key) => (this.policyObj.route_policies[key] = true)
    );
  }

  selectAllButtons() {
    Object.keys(this.policyObj.button_policies).forEach(
      (key) => (this.policyObj.button_policies[key] = true)
    );
  }

  cancelPolicy() {
    this.router.navigate(['policy']);
  }
}

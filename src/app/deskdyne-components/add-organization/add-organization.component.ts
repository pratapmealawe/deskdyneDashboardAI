import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { GoogleMapService } from 'src/service/google-map.service';
import { PolicyService } from 'src/service/policy.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements OnInit {
  @ViewChild('content') content: any;
  @ViewChild('pocContent') pocContent: any;
  @ViewChild('geolocation') geolocation: any;
  form: any;
  viewOrg: any;
  showUpdate: boolean = false;
  adminSelected: any = [];
  roleList = ['poc', 'admin', 'superAdmin'];

  pocSelected: any;
  cafeSelected: any;
  showError: boolean = false;
  location: any;
  cafeLocation: any;
  modalAdmin: any;
  cafeteriaIndex: any;
  appmenutypelist = [1, 2];
  btnPolicy: any;
  orgSubsidy: number = 0;
  domainList: string[] = [];
  showDelete = false;
  orgInfo: any;
  panelOpenState = false;
  constructor(
    private apiMainService: ApiMainService,
    private policyService: PolicyService,
    private googleMapService: GoogleMapService,
    private chgDetRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private runtimeStorageService: RuntimeStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      organization_name: ['', Validators.required],
      location: ['', Validators.required],
      domain: [''],
      city: ['', Validators.required],
      gstin: ['', Validators.required],
      poc_details: this.fb.array([]),
      org_address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: ['', Validators.required],
        addressLine3: ['', Validators.required],
      }),
      cafeteriaList: this.fb.array([]),
      subsidy: [0],
      isEmpIdRequired: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();

    const cacheOrg = this.runtimeStorageService.getCacheData('VIEW_ORG');
    if (cacheOrg && cacheOrg._id) {
      this.viewOrg = cacheOrg;
      this.showUpdate = true;
      this.patchFormValue(cacheOrg);
    }
  }

  get poc(): FormArray {
    return this.form.get('poc_details') as FormArray;
  }

  get cafeteria(): FormArray {
    return this.form.get('cafeteriaList') as FormArray;
  }

  get admin(): FormArray {
    return this.form.get('admin_details') as FormArray;
  }

  new_admin_details(): FormGroup {
    return this.fb.group({
      admin_name: ['', Validators.required],
      admin_phoneNo: ['', Validators.required],
      admin_email: ['', [Validators.required, Validators.email]],
      admin_location: ['', Validators.required],
    });
  }

  new_cafeteria(): FormGroup {
    let id = Math.floor(Math.random() * 1000000000);
    return this.fb.group({
      accessCode: ['', [Validators.minLength(1), Validators.maxLength(4), Validators.pattern(/^[0-9]+$/)]],
      showAdminDaily: [false],
      showEmpPolls: [false],
      showVirtualCafe: [false],
      showSaas: [false],
      showSiteExecutive: [false],
      showCompanyWallet: [false],
      showchecklist: [false],
      isEmployeeEmailLogin: [false],
      showComplienceTracker: [false],
      showConsumptionOrder: [false],
      cafeteria_name: ['', Validators.required],
      cafeteria_id: [id, Validators.required,],
      cafeteria_city: ['', Validators.required],
      cafeteria_gstin: [''],
      cafeteria_location: this.fb.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      }),
      clusterId: [''],
      clusterName: [''],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      appMenu_type: [Number(1), Validators.required],
      landmark: ['', Validators.required],
      location: ['', Validators.required],
      subsidy: [0],
      poc_details: this.fb.group({
        poc_id: ['', Validators.required],
        poc_name: ['', Validators.required],
        poc_phoneNo: ['', Validators.required],
        poc_email: [''],
        poc_location: [''],
        poc_role: ['', Validators.required],
        approverPriceLimit: [''],
        approverCountLimit: [''],
        approverDetails: this.fb.group({
          approver_id: [''],
          approver_name: [''],
          approver_phoneNo: [''],
          approver_email: [''],
          approver_location: [''],
          approver_role: [''],
        }),
      }),
    });
  }

  new_poc_details(): FormGroup {
    return this.fb.group({
      poc_id: ['', Validators.required],
      poc_name: ['', Validators.required],
      poc_phoneNo: ['', Validators.required],
      poc_email: ['', [Validators.required, Validators.email]],
      poc_location: ['', Validators.required],
      poc_role: ['', Validators.required],
      approverDetails: this.fb.group({
        approver_id: [{ value: '', disabled: true }],
        approver_name: [{ value: '', disabled: true }],
        approver_phoneNo: [{ value: '', disabled: true }],
        approver_email: [{ value: '', disabled: true }],
        approver_location: [{ value: '', disabled: true }],
        approver_role: [{ value: '', disabled: true }],
      }),
    });
  }

  processDomains() {
    const inputValue: string = this.form.get('domain')?.value || '';
    this.domainList = inputValue
      .split(',')
      .map(domain => domain.trim())
      .filter(domain => domain !== '');
    this.form.get('domain')?.patchValue(this.domainList)

  }

  add_admin_details() {
    this.admin.push(this.new_admin_details());
  }

  add_cafeteria() {
    this.cafeteria.push(this.new_cafeteria());
  }

  add_poc_details() {
    this.poc.push(this.new_poc_details());
  }

  removeAdmin(index: any) {
    this.form.controls['admin_details'].removeAt(index);
  }

  removePOC(index: any) {
    let status = this.checkPocIdExists(this.orgInfo.cafeteriaList, this.form.controls['poc_details'].value[index].poc_id);
    if (status) {

      this.modalService
        .open(this.pocContent, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'md',
          windowClass: 'menuModel',
          centered: true
        })
        .result.then(
          (result) => {
          },
          (reason) => {
            console.log(`Model Dismissed`);
          }
        );

    }

    else {
      this.form.controls['poc_details'].removeAt(index);
    }
  }

  removeApprover(index: any) {
    this.form.controls['poc_details']
      .at(index)
      .controls['approverDetails'].reset();
  }

  checkPocIdExists(data: any, pocId: any) {
    return data.find((item: any) => item.poc_details.poc_id === pocId) !== undefined;
  }

  getOrgGstin(event: any, i: any) {
    const cafeteriaArray = this.form.get('cafeteriaList') as FormArray;
    const cafeteriaGroup = cafeteriaArray.at(i) as FormGroup;

    const gstinValue = event.target.checked
      ? this.form.get('gstin')?.value
      : '';

    cafeteriaGroup.patchValue({ cafeteria_gstin: gstinValue });
    console.log(cafeteriaGroup);

  }

  patchFormValue(org: any) {
    console.log("org", org);
    this.orgInfo = org;
    let clusterdetails: any = {};
    this.orgSubsidy = org.subsidy;
    // this.customerLocation = org.customerLocation;
    this.form.patchValue({
      organization_name: org.organization_name,
      location: org.location,
      city: org.city,
      gstin: org.gstin,
      subsidy: org.subsidy,
      domain: org.domain,
      isEmpIdRequired: org.isEmpIdRequired,
    });
    org.cafeteriaList.forEach(async (cafe: any, i: any) => {
      if (cafe.clusterId) {
        clusterdetails = {
          clusterId: cafe.clusterId,
          clusterName: cafe.clusterName,
        };
      } else {
        if (this.cafeLocation) {
          let cluster = await this.googleMapService.getClusterName(
            this.cafeLocation.latlng
          );
          let clusterDetailsnew =
            this.runtimeStorageService.getCacheData('CLUSTERS_details');
          clusterdetails = clusterDetailsnew;
        }
      }
      this.add_cafeteria();
      this.form.controls['cafeteriaList']
        .at(i)
        .controls['cafeteria_location'].patchValue({
          lat: cafe.cafeteria_location.lat,
          lng: cafe.cafeteria_location.lng,
        });

      this.form.controls['cafeteriaList'].at(i).patchValue({
        accessCode: cafe.accessCode,
        showAdminDaily: cafe.showAdminDaily,
        showEmpPolls: cafe.showEmpPolls,
        showVirtualCafe: cafe.showVirtualCafe,
        showSaas: cafe.showSaas,
        showSiteExecutive: cafe.showSiteExecutive,
        showCompanyWallet: cafe.showCompanyWallet,
        showchecklist: cafe.showchecklist,
        showConsumptionOrder: cafe.showConsumptionOrder,
        isEmployeeEmailLogin: cafe.isEmployeeEmailLogin,
        showComplienceTracker: cafe.showComplienceTracker,
        cafeteria_id: cafe.cafeteria_id,
        cafeteria_name: cafe.cafeteria_name,
        cafeteria_city: cafe.cafeteria_city,
        cafeteria_gstin: cafe.cafeteria_gstin,
        address1: cafe.address1,
        address2: cafe.address2 ? cafe.address2 : 1,
        appMenu_type: cafe.appMenu_type,
        landmark: cafe.landmark,
        location: cafe.location,
        clusterId: clusterdetails.clusterId,
        clusterName: clusterdetails.clusterName,
        subsidy: cafe.subsidy,
      });
      this.form.controls['cafeteriaList']
        .at(i)
        .controls['poc_details'].patchValue({
          poc_id: cafe.poc_details.poc_id,
          poc_name: cafe.poc_details.poc_name,
          poc_phoneNo: cafe.poc_details.poc_phoneNo,
          poc_email: cafe.poc_details.poc_email,
          poc_location: cafe.poc_details.poc_location,
          poc_role: cafe.poc_details.poc_role,
        });
      this.form.controls['cafeteriaList']
        .at(i)
        .controls['poc_details'].controls['approverDetails'].patchValue({
          approver_id: cafe.poc_details.approverDetails.approver_id,
          approver_name: cafe.poc_details.approverDetails.approver_name,
          approver_phoneNo: cafe.poc_details.approverDetails.approver_phoneNo,
          approver_email: cafe.poc_details.approverDetails.approver_email,
          approver_location: cafe.poc_details.approverDetails.approver_location,
          approver_role: cafe.poc_details.approverDetails.approver_role,
        });
    });
    this.form.controls.org_address.patchValue({
      addressLine1: org.org_address.addressLine1,
      addressLine2: org.org_address.addressLine2,
      addressLine3: org.org_address.addressLine3,
    });
    org.poc_details.forEach((el: any, i: any) => {
      this.add_poc_details();
      this.form.controls['poc_details'].at(i).patchValue({
        poc_id: el.poc_id,
        poc_name: el.poc_name,
        poc_phoneNo: el.poc_phoneNo,
        poc_email: el.poc_email,
        poc_location: el.poc_location,
        poc_role: el.poc_role,
      });
      this.form.controls['poc_details']
        .at(i)
        .controls['approverDetails'].patchValue({
          approver_id: el.approverDetails.approver_id,
          approver_name: el.approverDetails.approver_name,
          approver_phoneNo: el.approverDetails.approver_phoneNo,
          approver_email: el.approverDetails.approver_email,
          approver_location: el.approverDetails.approver_location,
          approver_role: el.approverDetails.approver_role,
        });
    });
  }

  addApprover(index: any) {
    this.modalService
      .open(this.content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
        windowClass: 'menuModel',
      })
      .result.then(
        (result) => {
          if (result === 'add') {
            this.patchSelectedAdmins(index);
          } else if (result === 'addCafe') {
            this.patchCafeAdmins(index);
          }
        },
        (reason) => {
          console.log(`Model Dismissed`);
        }
      );
  }

  toggleMap(index: any) {
    this.cafeteriaIndex = index;
    this.modalService
      .open(this.geolocation, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        windowClass: 'mapModel',
      })
      .result.then(
        (result) => {
          if (result === 'add') {
            this.patchCafeLocation();
          }
        },
        (reason) => {
          console.log(`Model Dismissed`);
        }
      );
  }

  async patchCafeLocation() {
    this.form.controls['cafeteriaList']
      .at(this.cafeteriaIndex)
      .controls['address2'].patchValue(this.cafeLocation.location);
    this.form.controls['cafeteriaList']
      .at(this.cafeteriaIndex)
      .controls['cafeteria_location'].controls['lat'].patchValue(
        this.cafeLocation.latlng.lat
      );
    this.form.controls['cafeteriaList']
      .at(this.cafeteriaIndex)
      .controls['cafeteria_location'].controls['lng'].patchValue(
        this.cafeLocation.latlng.lng
      );
    let cluster = await this.googleMapService.getClusterName(
      this.cafeLocation.latlng
    );
    let clusterDetails =
      this.runtimeStorageService.getCacheData('CLUSTERS_details');
    this.form.controls['cafeteriaList']
      .at(this.cafeteriaIndex)
      .controls['clusterId'].patchValue(clusterDetails.clusterId);
    this.form.controls['cafeteriaList']
      .at(this.cafeteriaIndex)
      .controls['clusterName'].patchValue(clusterDetails.clusterName);
  }

  updateLocation(event: any) {
    this.cafeLocation = event;
  }

  patchSelectedAdmins(index: any) {
    console.log(this.form.controls['poc_details']
      .at(index)
      .controls['approverDetails']);

    this.form.controls['poc_details']
      .at(index)
      .controls['approverDetails'].patchValue({
        approver_id: this.adminSelected.poc_id,
        approver_name: this.adminSelected.poc_name,
        approver_phoneNo: this.adminSelected.poc_phoneNo,
        approver_email: this.adminSelected.poc_email,
        approver_location: this.adminSelected.poc_location,
        approver_role: this.adminSelected.poc_role,
      });
    this.showDelete = true;
  }

  patchCafeAdmins(index: any) {
    this.form.controls['cafeteriaList']
      .at(index)
      .controls['poc_details'].patchValue({
        poc_id: this.adminSelected.poc_id,
        poc_name: this.adminSelected.poc_name,
        poc_phoneNo: this.adminSelected.poc_phoneNo,
        poc_email: this.adminSelected.poc_email,
        poc_location: this.adminSelected.poc_location,
        poc_role: this.adminSelected.poc_role,
      });
    this.form.controls['cafeteriaList']
      .at(index)
      .controls['poc_details'].controls['approverDetails'].patchValue({
        approver_id: this.adminSelected.approverDetails.approver_id,
        approver_name: this.adminSelected.approverDetails.approver_name,
        approver_phoneNo: this.adminSelected.approverDetails.approver_phoneNo,
        approver_email: this.adminSelected.approverDetails.approver_email,
        approver_location: this.adminSelected.approverDetails.approver_location,
        approver_role: this.adminSelected.approverDetails.approver_role,
      });
  }

  pushAdmin(admin: any) {
    this.adminSelected = admin;
  }

  async addOrg() {
    console.log(this.form.value);

    try {
      if (!this.form.valid) {
        this.showError = true;
        return;
      }

      await this.apiMainService.B2B_addOrg(this.form.getRawValue());
      this.clearRunTimeStorage();
      this.router.navigate(['b2bSearchOrg']);
    } catch (error) {
      console.log(error);
    }
  }

  goBack() {
    this.router.navigate(['b2bSearchOrg']);
  }
  async updateOrglevelSubsidy() {
    try {
      this.orgSubsidy = this.form.value.subsidy;
      let res = await this.apiMainService.B2B_org_updateOrglevelSubsidy(
        this.orgSubsidy,
        this.viewOrg._id
      );
      if (res && res._id) {
        this.viewOrg = res;
        this.showUpdate = true;
        this.patchorgcafeValue(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
  patchorgcafeValue(org: any) {
    this.orgSubsidy = org.subsidy;
    org.cafeteriaList.forEach(async (cafe: any, i: any) => {
      this.form.controls['cafeteriaList'].at(i).patchValue({
        subsidy: cafe.subsidy,
      });
    });
  }
  async updateOrg() {
    try {
      if (!this.form.valid) {
        this.showError = true;
        return;
      }
      console.log(this.form.getRawValue());

      await this.apiMainService.B2B_org_update(
        this.form.getRawValue(),
        this.viewOrg._id
      );
      this.clearRunTimeStorage();
      this.router.navigate(['b2bSearchOrg']);
    } catch (error) {
      console.log(error);
    }
  }

  poc_selected(index: any) {
    this.cafeSelected = '';
    this.pocSelected = this.form.controls['poc_details'].at(index).value;
  }

  cafe_selected(index: any) {
    this.pocSelected = '';
    this.cafeSelected = this.form.controls['cafeteriaList'].at(index).value;
  }

  resetForm() {
    this.form.reset();
  }

  back() {
    this.clearRunTimeStorage();
    this.router.navigate(['b2bSearchOrg']);
  }

  clearRunTimeStorage() {
    this.runtimeStorageService.resetCacheData('VIEW_ORG');
  }
  async updateCafelevelSubsidy(index: any) {
    console.log(this.form.controls.cafeteriaList.value[index]);
    try {
      console.log(this.form);
      let subsidy = this.form.controls.cafeteriaList.value[index].subsidy;
      let cafeteria_Id = this.form.controls.cafeteriaList.value[index].cafeteria_id
      let res = await this.apiMainService.B2B_org_updateCafelevelSubsidy(
        subsidy,
        cafeteria_Id
      );
      console.log(res, "res");
    } catch (error) {
      console.log(error);
    }
  }
  //  hasError for validations 
  hasError(form:FormGroup , controlName :string , error :string):boolean{
    return false
  }
}


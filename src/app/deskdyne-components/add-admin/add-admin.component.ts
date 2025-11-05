import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { PolicyService } from 'src/service/policy.service';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';

interface Organization {
  organization_name: string;
  _id: string;
}

interface Cafeteria {
  cafeteria_name: string;
  cafeteria_id: string;
  _id: string;
}

interface SiteExecutiveDetails {
  orgDetails: Organization[];
  cafeDetails: Cafeteria[];
}

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent {
  editMode = false;
  imageUrl: any;
  uploadedImageFile: any;
  adminObj: any = {
    name: '',
    phoneNo: '',
    email: '',
    id: '',
    role: '',
    policy: '',
  };
  roleArr = [
    { text: 'Admin', value: 'ADMIN' },
    { text: 'OrgAdmin', value: 'ORGADMIN' },
    { text: 'Site Executive', value: 'SITEEXE' },
    { text: 'Developer', value: 'DEVELOPER' },
    { text: 'Support', value: 'SUPPORT' },
    { text: 'Sales', value: 'SALES' },
    { text: 'Operations', value: 'OPERATIONS' },
    { text: 'Advisor', value: 'ADVISOR' },
    { text: 'Hyperpure Admin', value: 'HYPERPURE_ADMIN' },
    { text: 'Hyperpure POC', value: 'HYPERPURE_POC' }
  ];
  orglist: any[] = [];
  filteredOptions = [...this.orglist];
  btnPolicy: any;
  policyArr: any;
  searchQuery: string = '';
  // searchQuery: string = '';

  selectedValue: string = '';
  selectedCafeId: string = '';
  orgDetails: any = null;
  cafeDetails: any = null;
  // For Site Executive
  cafeList: any[] = [];
  siteExecutiveDetails: SiteExecutiveDetails = {
    orgDetails: [],
    cafeDetails: [],
  };

  selectedItemsCafe: any[] = [];

  constructor(
    private apiMainService: ApiMainService,
    public router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private modalService: NgbModal,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    this.btnPolicy = this.policyService.getCurrentButtonPolicy();

    this.getOrgList();
    const cacheAdmin = this.runtimeStorageService.getCacheData('VIEW_ADMIN');

    this.getAllPolicy();
    if (cacheAdmin) {
      this.editMode = true;
      this.adminObj.name = cacheAdmin.name;
      this.adminObj.phoneNo = cacheAdmin.phoneNo;
      this.adminObj.email = cacheAdmin.email;
      this.adminObj.role = cacheAdmin.role;
      this.adminObj.policy = cacheAdmin.policy_name;
      this.adminObj.id = cacheAdmin._id;
      this.imageUrl = environment.imageUrl + cacheAdmin.imageUrl;

      if (this.adminObj.role == 'ORGADMIN') {
        this.selectedValue = cacheAdmin.orgDetails._id;
        this.setOrgDetails();
      }
      if (this.adminObj.role === 'SITEEXE') {
        this.siteExecutiveDetails = cacheAdmin.siteExecutiveDetails;
      }
    }
  }

  cancel() {
    this.runtimeStorageService.resetCacheData('VIEW_ADMIN');
    this.router.navigate(['admin']);
  }

  filterOptions() {
    this.filteredOptions = this.orglist.filter((option: any) =>
      option.organization_name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }

  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const modalRef: NgbModalRef = this.modalService.open(
              ImageCropperComponent,
              {
                ariaLabelledBy: 'modal-basic-title',
                size: 'xl',
                backdrop: 'static',
                centered: true,
              }
            );
            modalRef.result.then(
              (result: any) => {
                if (result && result.croppedImages) {
                  this.uploadedImageFile = result.croppedImages.file;
                  this.imageUrl = result.croppedImages.resizeDataUrl;
                }
              },
              (reason: any) => {
                console.log(`Model Dismissed`);
              }
            );
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
          } catch (e) {
            console.log('error while changes kitchen opened status ', e);
          }
        };
      }
    }
  }

  async getAllPolicy() {
    try {
      const policyArr: any = await this.apiMainService.getAllPolicy();
      if (policyArr && policyArr.length > 0) {
        this.policyArr = policyArr;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addAdmin(adminObj: any) {
    const formData = new FormData();
    if (this.uploadedImageFile) {
      formData.append('image', this.uploadedImageFile);
    }
    if (adminObj.role == 'ORGADMIN') {
      formData.append('OrgDetails', JSON.stringify(this.orgDetails));
    }

    console.log(this.orgDetails);
    
    if (adminObj.role === 'SITEEXE') {
      let cafeList = this.orglist.flatMap((org: any) =>
        org.cafeteriaList.map((cafe: any) => ({
          ...cafe,
          organization_name: org.organization_name,
          organization_id: org._id,
        }))
      );

      if (!this.siteExecutiveDetails) {
        this.siteExecutiveDetails = { orgDetails: [], cafeDetails: [] };
      }

      this.selectedItemsCafe.forEach((item) => {
        const foundCafe = cafeList.find((a) => a.cafeteria_id === item);
        if (!foundCafe) return;

        const org: Organization = {
          organization_name: foundCafe.organization_name,
          _id: foundCafe.organization_id,
        };

        const cafe: Cafeteria = {
          cafeteria_name: foundCafe.cafeteria_name,
          cafeteria_id: foundCafe.cafeteria_id,
          _id: foundCafe._id,
        };

        if (
          !this.siteExecutiveDetails.orgDetails.some((o) => o._id === org._id)
        ) {
          this.siteExecutiveDetails.orgDetails.push(org);
        }
        if (
          !this.siteExecutiveDetails.cafeDetails.some((c) => c.cafeteria_id === cafe.cafeteria_id)
        ) {
          this.siteExecutiveDetails.cafeDetails.push(cafe);
        }
      });

      formData.append(
        'siteExecutiveDetails',
        JSON.stringify(this.siteExecutiveDetails)
      );
    }

    formData.append('name', adminObj.name);
    formData.append('phoneNo', adminObj.phoneNo);
    formData.append('email', adminObj.email);
    formData.append('role', adminObj.role);
    formData.append('policy_name', adminObj.policy);
    try {
      // await this.apiMainService.saveAdminProfile(formData);
      // this.router.navigate(['admin']);
    } catch (e) {
      console.log('Error while saving kitchen partner ', e);
    }
  }

  async updateAdmin(adminObj: any) {
    const formData = new FormData();
    if (this.uploadedImageFile) {
      formData.append('image', this.uploadedImageFile);
    } else {
      formData.append('name', adminObj.name);
      formData.append('phoneNo', adminObj.phoneNo);
      formData.append('email', adminObj.email);
      formData.append('role', adminObj.role);
      formData.append('policy', adminObj.policy);
    }
    if (adminObj.role == 'ORGADMIN') {
      formData.append('OrgDetails', JSON.stringify(this.orgDetails));
    }
    if (adminObj.role === 'SITEEXE') {
      let cafeList = this.orglist.flatMap((org: any) =>
        org.cafeteriaList.map((cafe: any) => ({
          ...cafe,
          organization_name: org.organization_name,
          organization_id: org._id,
        }))
      );

      if (!this.siteExecutiveDetails) {
        this.siteExecutiveDetails = { orgDetails: [], cafeDetails: [] };
      }

      this.selectedItemsCafe.forEach((item) => {
        const foundCafe = cafeList.find((a) => a.cafeteria_id === item);
        if (!foundCafe) return;

        const org: Organization = {
          organization_name: foundCafe.organization_name,
          _id: foundCafe.organization_id,
        };

        const cafe: Cafeteria = {
          cafeteria_name: foundCafe.cafeteria_name,
          cafeteria_id: foundCafe.cafeteria_id,
          _id: foundCafe._id,
        };


        if (
          !this.siteExecutiveDetails.orgDetails.some((o) => o._id === org._id)
        ) {
          this.siteExecutiveDetails.orgDetails.push(org);
        }
        if (
          !this.siteExecutiveDetails.cafeDetails.some((c) => c.cafeteria_id === cafe.cafeteria_id)
        ) {
          this.siteExecutiveDetails.cafeDetails.push(cafe);
        }
      });

      formData.append(
        'siteExecutiveDetails',
        JSON.stringify(this.siteExecutiveDetails)
      );
    }
    try {
      await this.apiMainService.updateadminprofile(adminObj.id, formData);
      this.router.navigate(['admin']);
    } catch (e) {
      console.log('Error while saving kitchen partner ', e);
    }
  }

  async getOrgList() {
    try {
      this.orglist = [];
      let page = 1;
      let searchObj = {
        countOnly: false,
      };
      let result = await this.apiMainService.B2B_fetchFilteredAllOrgs(
        searchObj,
        page
      );

      this.orglist = result;

      if (this.adminObj.role === 'SITEEXE') {
        this.selectedItemsCafe = [
          ...new Set(this.siteExecutiveDetails.cafeDetails.map((a) => a._id)),
        ];
      }

      this.filteredOptions = [...this.orglist];
      if (this.adminObj.role == 'ORGADMIN') {
        this.setOrgDetails();
      }
    } catch (error) {
      console.log(error);
    }
  }

  setOrgDetails() {
    this.orgDetails = this.orglist.find((org: any) => {
      return org._id == this.selectedValue;
    });
  }


}

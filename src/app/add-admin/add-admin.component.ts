import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { RuntimeStorageService } from 'src/service/runtime-storage.service';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { PolicyService } from 'src/service/policy.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent {
  editMode = false;
  imageUrl: any;
  uploadedImageFile: any;
  adminObj: any = { name: '', phoneNo: '', email: '', id: '', role:'', policy:'' };
  roleArr = [{text:'Admin', value:'ADMIN'}, {text:'Developer', value:'DEVELOPER'}, {text:'Support', value:'SUPPORT'}, {text:'Sales', value:'SALES'}, {text:'Operations', value:'OPERATIONS'}, {text:'Advisor', value:'ADVISOR'}]
  access:any;
  policyArr:any;
  constructor(private apiMainService: ApiMainService,
    public router: Router,
    private runtimeStorageService: RuntimeStorageService,
    private modalService: NgbModal, private policyService:PolicyService) {
       this.access = this.policyService.getCurrentButtonPolicy();
      
  }
  ngOnInit(): void {
    const cacheAdmin = this.runtimeStorageService.getCacheData('VIEW_ADMIN');
    console.log('catche admin',cacheAdmin)
    this.getAllPolicy();
    console.log('cacheAdmin ', cacheAdmin);
    if (cacheAdmin) {
      this.editMode = true;
      this.adminObj.name = cacheAdmin.name;
      this.adminObj.phoneNo = cacheAdmin.phoneNo;
      this.adminObj.email = cacheAdmin.email;
      this.adminObj.role = cacheAdmin.role;
      this.adminObj.policy = cacheAdmin.policy_name;
      this.adminObj.id = cacheAdmin._id;
      this.imageUrl = environment.imageUrl + cacheAdmin.imageUrl;
    }
  }
  cancel() {
    this.runtimeStorageService.resetCacheData('VIEW_ADMIN');
    this.router.navigate(['admin']);
  }
  handleFileInput($event: any) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const fileName = file.name;
        console.log(fileName);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const modalRef: NgbModalRef = this.modalService.open(ImageCropperComponent,
              {
                ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static',
                centered: true
              });
            modalRef.result.then((result: any) => {
              console.log('Closed with:', result);
              if (result && result.croppedImages) {
                console.log('croppedImages ', result.croppedImages);
                this.uploadedImageFile = result.croppedImages.file;
                this.imageUrl = result.croppedImages.resizeDataUrl;
              }
            }, (reason: any) => {
              console.log(`Model Dismissed`);
            });
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 150;
            modalRef.componentInstance.imageHeight = 150;
            modalRef.componentInstance.aspectRatio = 1;
          } catch (e) {
            console.log('error while changes kitchen opened status ', e);
          }
        }
      }
    }
  }
  async getAllPolicy() {
    try {
      const policyArr:any = await this.apiMainService.getAllPolicy();
      if (policyArr && policyArr.length > 0) {
        this.policyArr = policyArr;
        console.log(this.policyArr);
      }
    } catch (error) {
      console.log(error)
    }
  }
  async addAdmin(adminObj: any) {
    console.log('addAdmin',adminObj)
    const formData = new FormData();
    if (this.uploadedImageFile) {
      formData.append('image', this.uploadedImageFile);
    } 
    formData.append('name', adminObj.name);
    formData.append('phoneNo', adminObj.phoneNo);
    formData.append('email', adminObj.email);
    formData.append('role', adminObj.role);
    formData.append('policy_name', adminObj.policy);
    console.log('form data',formData,adminObj)
    try {
      await this.apiMainService.saveAdminProfile(formData);
      this.router.navigate(['admin']);
    } catch (e) {
      console.log('Error while saving kitchen partner ', e)
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
    try {
      await this.apiMainService.updateadminprofile(adminObj.id, formData);
      this.router.navigate(['admin']);
    } catch (e) {
      console.log('Error while saving kitchen partner ', e)
    }
  }
}

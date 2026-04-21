import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { environment } from '@environments/environment';
import { ImageCropperComponent } from 'src/app/common-components/image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import { PermissionsService } from '@service/permission.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-outlet-compliance',
  templateUrl: './outlet-compliance.component.html',
  styleUrls: ['./outlet-compliance.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class OutletComplianceComponent implements OnInit {
  @Input() outletObj: any;
  profileApproval: any;
  compliance: any = {};
  imageUrl = environment.imageUrl;
  fileUrl = environment.fileUrl;
  comment = '';
  editMode = false;
  uploadedCompliance: any = {};
  originalCompliance: any = {};
  access: any;
  fssailic = 'fssaiFile';
  aadhar = 'aadharFile'
  aadharpdfobj = {
    name: 'aadharFile',
    url: '',
    file: undefined
  }
  fssaipdfobj = {
    name: 'fssaiFile',
    url: '',
    file: undefined
  }

  constructor(private apiMainService: ApiMainService, private sanitizer: DomSanitizer, private dialog: MatDialog, private permissionsService: PermissionsService) {
    this.access = this.permissionsService.getCurrentButtonPolicy();
  }


  ngOnInit() {
    this.profileApproval = this.outletObj.profileApproval;
    if (this.outletObj.compliance) {
      this.compliance = this.outletObj.compliance;
      this.originalCompliance = { ...this.outletObj.compliance };
      this.prepareForEdit();
    }
  }

  prepareForEdit() {
    if (this.compliance.fssaiImageUrl) {
      this.originalCompliance.fssaiImageUrlOld = this.compliance.fssaiImageUrl;
      this.compliance.fssaiImageUrl = this.imageUrl + this.compliance.fssaiImageUrl;
      this.originalCompliance.fssaiImageUrl = this.compliance.fssaiImageUrl;
    }

    if (this.compliance.adhaarFrontImageUrl) {
      this.originalCompliance.adhaarFrontImageUrlOld = this.compliance.adhaarFrontImageUrl;
      this.compliance.adhaarFrontImageUrl = this.imageUrl + this.compliance.adhaarFrontImageUrl;
      this.originalCompliance.adhaarFrontImageUrl = this.compliance.adhaarFrontImageUrl;
    }
    if (this.compliance.adhaarBackImageUrl) {
      this.originalCompliance.adhaarBackImageUrlOld = this.compliance.adhaarBackImageUrl;
      this.compliance.adhaarBackImageUrl = this.imageUrl + this.compliance.adhaarBackImageUrl;
      this.originalCompliance.adhaarBackImageUrl = this.compliance.adhaarBackImageUrl;
    }
    if (this.compliance.fssaiExpiryDate) {
      this.originalCompliance.fssaiExpiryDate = this.compliance.fssaiExpiryDate;
      this.compliance.fssaiExpiryDate = this.compliance.fssaiExpiryDate.split('T')[0];
    }
    if (this.compliance.adhaarFileUrl) {
      this.originalCompliance.adhaarFileUrlold = this.compliance.adhaarFileUrl;
      this.compliance.adhaarFileUrl = this.fileUrl + this.compliance.adhaarFileUrl;
      this.originalCompliance.adhaarFileUrl = this.compliance.adhaarFileUrl;
    }
    if (this.compliance.fssaiFile) {
      this.originalCompliance.fssaiFileUrlOld = this.compliance.fssaiFile;
      this.originalCompliance.fssaiFile = this.compliance.fssaiFile;
      this.compliance.fssaiFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.fssaiFile);
    }

  }

  async updateProfileApproval(status: string) {
    try {
      await this.apiMainService.updateProfileApproval(this.outletObj._id, status, { comment: this.comment });
      this.profileApproval = status;
    } catch (error) {
    }
  }

  handleFileInput($event: any, filename: string, height: number) {
    // const fileToUpload = files.item(0);
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        // this.uploadedCompliance = file;
        const fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (_event) => {
          const imageUrl = reader.result;
          try {
            const dialogRef = this.dialog.open(ImageCropperComponent, {
              width: '50%',
              panelClass: 'image-cropper-dialog',
              disableClose: true,
              data: {
                imageUrl: imageUrl,
                imageWidth: 600,
                imageHeight: height * 2
              }
            });

            dialogRef.afterClosed().subscribe((result: any) => {
              if (result && result.croppedImages) {
                this.uploadedCompliance[filename] = result.croppedImages.file;
                // this.uploadedCompliance[filename+'Old'] = this.compliance[filename];
                this.compliance[filename] = result.croppedImages.resizeDataUrl;
              }
            });
          } catch (error) {
          }
        }
      }
    }
  }

  async saveImages() {
    try {
      const formData = new FormData();
      let uploadImageCount = 0
      if (this.uploadedCompliance.fssaiImageUrl) {
        formData.append('image', this.uploadedCompliance.fssaiImageUrl);
        formData.append('fssaiImageUrlNo', `${uploadImageCount}`);
        if (this.originalCompliance.fssaiImageUrlOld) {
          formData.append('fssaiImageUrlOld', this.originalCompliance.fssaiImageUrlOld);
        }
        uploadImageCount++;
      } else if (this.originalCompliance.fssaiImageUrlOld) {
        formData.append('fssaiImageUrl', this.originalCompliance.fssaiImageUrlOld);
      }

      if (this.uploadedCompliance.adhaarFrontImageUrl) {
        formData.append('image', this.uploadedCompliance.adhaarFrontImageUrl);
        formData.append('adhaarFrontImageUrlNo', `${uploadImageCount}`);
        if (this.originalCompliance.adhaarFrontImageUrlOld) {
          formData.append('adhaarFrontImageUrlOld', this.originalCompliance.adhaarFrontImageUrlOld);
        }
        uploadImageCount++;
      } else if (this.originalCompliance.adhaarFrontImageUrlOld) {
        formData.append('adhaarFrontImageUrl', this.originalCompliance.adhaarFrontImageUrlOld);
      }

      if (this.uploadedCompliance.adhaarBackImageUrl) {
        formData.append('image', this.uploadedCompliance.adhaarBackImageUrl);
        formData.append('adhaarBackImageUrlNo', `${uploadImageCount}`);
        if (this.originalCompliance.adhaarBackImageUrlOld) {
          formData.append('adhaarBackImageUrlOld', this.originalCompliance.adhaarBackImageUrlOld);
        }
      } else if (this.originalCompliance.adhaarBackImageUrlOld) {
        formData.append('adhaarBackImageUrl', this.originalCompliance.adhaarBackImageUrlOld);
      }
      if (this.compliance.fssai) {
        formData.append('fssai', this.compliance.fssai);
      }
      if (this.compliance.fssaiExpiryDate) {
        formData.append('fssaiExpiryDate', this.compliance.fssaiExpiryDate.split('T')[0]);
      }
      if (this.compliance.adhaar) {
        formData.append('adhaar', this.compliance.adhaar);
      }
      if (this.compliance.gstNumber) {
        formData.append('gstNumber', this.compliance.gstNumber);
      }
      if (this.originalCompliance.adhaarFileUrlold) {
        formData.append('aadharFile', this.originalCompliance.adhaarFileUrlold);
      }
      if (this.originalCompliance.fssaiFileUrlOld) {
        formData.append('fssaiFile', this.originalCompliance.fssaiFileUrlOld);
      }
      const kitchen = await this.apiMainService.updateComplianceByAdmin(this.outletObj._id, formData);
      this.outletObj.compliance = kitchen.compliance;
      this.compliance = this.outletObj.compliance;
      this.originalCompliance = { ...this.outletObj.compliance };
      this.editMode = false;
      this.uploadedCompliance = {};
      this.prepareForEdit();
    } catch (error) {
    }
  }

  cancelEdit() {
    this.compliance = { ...this.originalCompliance };
    this.editMode = false;
  }
  uploadDoc(event: any) {
    if (event.documentname == "aadharFile") {
      this.originalCompliance.adhaarFileUrlold = event.url;
      // this.compliance.adhaarFileUrl=this.fileUrl + event.url;
      this.compliance.adhaarFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    } else if (event.documentname == "fssaiFile") {
      this.originalCompliance.fssaiFileUrlOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
    }
  }
  DeleteFile(file: any) {
    if (file == 'fssailic') {
      this.compliance.fssaiFileUrl = null;
    } else if (file == 'aadhar') {
      this.compliance.adhaarFileUrl = null;
    }
  }
}


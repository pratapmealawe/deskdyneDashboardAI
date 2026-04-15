import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { environment } from 'src/environments/environment';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import { PolicyService } from 'src/service/policy.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { PdfuploadComponent } from '../../../pdfupload/pdfupload.component';

@Component({
  selector: 'app-organization-compliance',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, PdfuploadComponent],
  templateUrl: './organization-compliance.component.html',
  styleUrls: ['./organization-compliance.component.scss']
})
export class OrgComplianceComponent implements OnInit {
  @Input() orgObj: any;
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
  TradeLic = 'TradeLic';
  aadhar = 'aadharFile';
  pfFile = 'pfFile';
  ESIFile = 'ESIFile';
  GSTFile = 'GSTFile';
  PanCardFile = 'PanCardFile';
  pestconFile = 'pestconFile';
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

  constructor(private apiMainService: ApiMainService, private sanitizer: DomSanitizer, private dialog: MatDialog, private policyService: PolicyService) {
    this.access = this.policyService.getCurrentButtonPolicy();
    console.log(this.access);
  }


  ngOnInit() {

    this.profileApproval = this.orgObj.profileApproval;
    if (this.orgObj.compliance) {
      this.compliance = this.orgObj.compliance;
      this.originalCompliance = { ...this.orgObj.compliance };
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

    if (this.compliance.TradeLic) {
      this.originalCompliance.TradeLicUrlOld = this.compliance.TradeLic;
      this.originalCompliance.TradeLic = this.compliance.TradeLic;
      this.compliance.TradeLicFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.TradeLic);
    }
    if (this.compliance.pfFile) {
      this.originalCompliance.pfFileUrlOld = this.compliance.pfFile;
      this.originalCompliance.pfFile = this.compliance.pfFile;
      this.compliance.pfFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.pfFile);
    }
    if (this.compliance.ESIFile) {
      this.originalCompliance.ESIFileUrlOld = this.compliance.ESIFile;
      this.originalCompliance.ESIFile = this.compliance.ESIFile;
      this.compliance.ESIFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.ESIFile);
    }
    if (this.compliance.GSTFile) {
      this.originalCompliance.GSTFileUrlOld = this.compliance.GSTFile;
      this.originalCompliance.GSTFile = this.compliance.GSTFile;
      this.compliance.GSTFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.GSTFile);
    }
    if (this.compliance.PanCardFile) {
      this.originalCompliance.PanCardFileUrlOld = this.compliance.PanCardFile;
      this.originalCompliance.PanCardFile = this.compliance.PanCardFile;
      this.compliance.PanCardFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.PanCardFile);
    }
    if (this.compliance.pestconFile) {
      this.originalCompliance.pestconFileUrlOld = this.compliance.pestconFile;
      this.originalCompliance.pestconFile = this.compliance.pestconFile;
      this.compliance.pestconFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.pestconFile);
    }

  }

  async updateProfileApproval(status: string) {
    try {
      await this.apiMainService.updateProfileApproval(this.orgObj._id, status, { comment: this.comment });
      this.profileApproval = status;
    } catch (error) {
      console.log('error while updating kitchen wallet', error);
    }
  }

  handleFileInput($event: any, filename: string, height: number) {
    // const fileToUpload = files.item(0);
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        // this.uploadedCompliance = file;
        const fileName = file.name;
        console.log(fileName);
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
              console.log('Closed with:', result);
              if (result && result.croppedImages) {
                console.log('croppedImages ', result.croppedImages);
                this.uploadedCompliance[filename] = result.croppedImages.file;
                // this.uploadedCompliance[filename+'Old'] = this.compliance[filename];
                this.compliance[filename] = result.croppedImages.resizeDataUrl;
              }
            });
          } catch (error) {
            console.log('error while changes kitchen opened status ', error);
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
      if (this.compliance.fssaiExpiryDate) {
        formData.append('fssaiExpiryDate', this.compliance.fssaiExpiryDate.split('T')[0]);
      }
      if (this.compliance.fssai) {
        formData.append('fssai', this.compliance.fssai);
      }
      if (this.compliance.adhaar) {
        formData.append('adhaar', this.compliance.adhaar);
      }
      if (this.compliance.tradeLicNumber) {
        formData.append('tradeLicNumber', this.compliance.tradeLicNumber);
      }
      if (this.compliance.gstNumber) {
        formData.append('gstNumber', this.compliance.gstNumber);
      }
      if (this.compliance.pestconNumber) {
        formData.append('pestconNumber', this.compliance.pestconNumber);
      }
      if (this.compliance.panNumber) {
        formData.append('panNumber', this.compliance.panNumber);
      }
      if (this.compliance.ESIFileno) {
        formData.append('ESIFileno', this.compliance.ESIFileno);
      }
      if (this.originalCompliance.adhaarFileUrlold) {
        formData.append('aadharFile', this.originalCompliance.adhaarFileUrlold);
      }
      if (this.originalCompliance.fssaiFileUrlOld) {
        formData.append('fssaiFile', this.originalCompliance.fssaiFileUrlOld);
      }
      if (this.originalCompliance.TradeLicFileUrlOld) {
        formData.append('TradeLic', this.originalCompliance.TradeLicFileUrlOld);
      }
      if (this.originalCompliance.pfFileUrlOld) {
        formData.append('pfFile', this.originalCompliance.pfFileUrlOld);
      }
      if (this.originalCompliance.ESIFileUrlOld) {
        formData.append('ESIFile', this.originalCompliance.ESIFileUrlOld);
      }
      if (this.originalCompliance.GSTFileUrlOld) {
        formData.append('GSTFile', this.originalCompliance.GSTFileUrlOld);
      }
      if (this.originalCompliance.PanCardFileUrlOld) {
        formData.append('PanCardFile', this.originalCompliance.PanCardFileUrlOld);
      }
      if (this.originalCompliance.pestconFileUrlOld) {
        formData.append('pestconFile', this.originalCompliance.pestconFileUrlOld);
      }
      console.log('formData', formData);
      const kitchen = await this.apiMainService.updateOrgComplianceByAdmin(this.orgObj._id, formData);
      this.orgObj.compliance = kitchen.compliance;
      this.compliance = this.orgObj.compliance;
      this.originalCompliance = { ...this.orgObj.compliance };
      this.editMode = false;
      this.uploadedCompliance = {};
      this.prepareForEdit();
    } catch (error) {
      console.log('error while save compliance Images ', error);
    }
  }

  cancelEdit() {
    this.compliance = { ...this.originalCompliance };
    this.editMode = false;
  }
  uploadDoc(event: any) {
    console.log("harish");
    if (event.documentname == "aadharFile") {
      this.originalCompliance.adhaarFileUrlold = event.url;
      // this.compliance.adhaarFileUrl=this.fileUrl + event.url;
      this.compliance.adhaarFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.adhaarFileUrl);
      console.log("eventaadharFile", event);
    } else if (event.documentname == "fssaiFile") {
      this.originalCompliance.fssaiFileUrlOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
      console.log(this.compliance.fssaiFileUrl)
      this.compliance.fssaiFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log("eventfssaiFile", event);
    }
    else if (event.documentname == "TradeLic") {
      this.originalCompliance.TradeLicFileUrlOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
      this.compliance.TradeLicFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "pfFile") {
      this.originalCompliance.pfFileUrlOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
      this.compliance.pfFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "ESIFile") {
      this.originalCompliance.ESIFileUrlOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
      this.compliance.ESIFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "GSTFile") {
      this.originalCompliance.GSTFileUrlOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
      this.compliance.GSTFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }
    else if (event.documentname == "PanCardFile") {
      this.originalCompliance.PanCardFileOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
      this.compliance.PanCardFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "pestconFile") {
      this.originalCompliance.pestconFileUrlOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
      this.compliance.pestconFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }
  }
  DeleteFile(file: any) {
    if (file == 'fssailic') {
      this.compliance.fssaiFileUrl = null;
    } else if (file == 'aadhar') {
      this.compliance.adhaarFileUrl = null;
    } else if (file == 'TradeLic') {
      this.compliance.TradeLicFileUrl = null;
    } else if (file == 'pfFile') {
      this.compliance.pfFileUrl = null;
    } else if (file == 'ESIFile') {
      this.compliance.ESIFileUrl = null;
    } else if (file == 'GSTFile') {
      this.compliance.GSTFileUrl = null;
    } else if (file == 'PanCardFile') {
      this.compliance.PanCardFile = null;
    } else if (file == 'pestconFile') {
      this.compliance.pestconFileUrl = null;
    }
  }
}

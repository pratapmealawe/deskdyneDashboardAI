import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { environment } from 'src/environments/environment';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PolicyService } from 'src/service/policy.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-vendor-compliance',
  templateUrl: './vendor-compliance.component.html',
  styleUrls: ['./vendor-compliance.component.scss']
})
export class VendorComplianceComponent implements OnInit {
  @Input() venderDetails: any;
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

  constructor(private apiMainService: ApiMainService, private sanitizer: DomSanitizer, private modalService: NgbModal, private policyService: PolicyService) {
    this.access = this.policyService.getCurrentButtonPolicy();
    console.log(this.access);
  }


  ngOnInit() {
    // this.profileApproval = this.venderDetails.profileApproval;  
    if (this.venderDetails.compliance) {
      this.compliance = this.venderDetails.compliance;
      console.log(this.compliance);

      this.originalCompliance = { ...this.venderDetails.compliance };
      console.log(this.originalCompliance);

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
    if (this.compliance.aadharFile) {
      this.originalCompliance.aadharFileUrlOld = this.compliance.aadharFile;
      this.originalCompliance.aadharFile = this.fileUrl + this.compliance.aadharFile;
      this.compliance.aadharFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.aadharFile);;
    }
    if (this.compliance.fssaiFile) {
      this.originalCompliance.fssaiFileUrlOld = this.compliance.fssaiFile;
      this.originalCompliance.fssaiFile = this.compliance.fssaiFile;
      this.compliance.fssaiFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.fssaiFile);
    }
    if (this.compliance.siteFssaiFile) {
      this.originalCompliance.siteFssaiFileUrlOld = this.compliance.siteFssaiFile;
      this.originalCompliance.siteFssaiFile = this.compliance.siteFssaiFile;
      this.compliance.siteFssaiFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.siteFssaiFile);
    }

    if (this.compliance.shopActLicenseFile) {
      this.originalCompliance.shopActFileUrlOld = this.compliance.shopActLicenseFile;
      this.originalCompliance.shopActLicenseFile = this.compliance.shopActLicenseFile;
      this.compliance.shopActLicenseFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.shopActLicenseFile);
    }

    if (this.compliance.udyamAadharFile) {
      this.originalCompliance.udyamAadharFileUrlOld = this.compliance.udyamAadharFile;
      this.originalCompliance.udyamAadharFile = this.compliance.udyamAadharFile;
      this.compliance.udyamAadharFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.udyamAadharFile);
    }

    if (this.compliance.TradeLic) {
      this.originalCompliance.tradeLicFileUrlOld = this.compliance.TradeLic;
      this.originalCompliance.TradeLic = this.compliance.TradeLic;
      this.compliance.TradeLicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.TradeLic);
    }

    if (this.compliance.esiT3File) {
      this.originalCompliance.esiT3FileUrlOld = this.compliance.esiT3File;
      this.originalCompliance.esiT3File = this.compliance.esiT3File;
      this.compliance.esiT3FileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.esiT3File);
    }

    if (this.compliance.cancelledChequeFile) {
      this.originalCompliance.cancelledChequeFileUrlOld = this.compliance.cancelledChequeFile;
      this.originalCompliance.cancelledChequeFile = this.compliance.cancelledChequeFile;
      this.compliance.cancelledChequeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.cancelledChequeFile);
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
      console.log(this.compliance.PanCardFileUrl);

    }
    if (this.compliance.pestconFile) {
      this.originalCompliance.pestconFileUrlOld = this.compliance.pestconFile;
      this.originalCompliance.pestconFile = this.compliance.pestconFile;
      this.compliance.pestconFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.pestconFile);
    }

  }

  handleFileInput($event: any, filename: string, height: number) {
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
                this.uploadedCompliance[filename] = result.croppedImages.file;
                // this.uploadedCompliance[filename+'Old'] = this.compliance[filename];  
                this.compliance[filename] = result.croppedImages.resizeDataUrl;
              }
            }, (reason: any) => {
              console.log(`Model Dismissed`);
            });
            modalRef.componentInstance.uploadedImageUrl = imageUrl;
            modalRef.componentInstance.imageWidth = 600;
            modalRef.componentInstance.imageHeight = height * 2;
            // modalRef.componentInstance.aspectRatio = 1; 
          } catch (error) {
            console.log('error while changes kitchen opened status ', error);
          }
        }
      }
    }
  }

  async saveImages() {
    console.log(this.compliance);

    try {
      const formData = new FormData();
      let uploadImageCount = 0
      console.log(this.originalCompliance);

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

      if (this.compliance.fssaiNo) {
        formData.append('fssaiNo', this.compliance.fssaiNo);
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
      if (this.compliance.pfno) {
        formData.append('pfno', this.compliance.pfno);
      }
      if (this.compliance.pestconNumber) {
        formData.append('pestconNumber', this.compliance.pestconNumber);
      }
      if (this.compliance.panNumber) {
        formData.append('panNumber', this.compliance.panNumber);
      }
      if (this.compliance.siteFssaiNo) {
        formData.append('siteFssaiNo', this.compliance.siteFssaiNo);
      }
      if (this.compliance.shopActLicenseNo) {
        formData.append('shopActLicenseNo', this.compliance.shopActLicenseNo);
      }
      if (this.compliance.udyamAadharNo) {
        formData.append('udyamAadharNo', this.compliance.udyamAadharNo);
      }
      if (this.compliance.esiT3Number) {
        formData.append('esiT3Number', this.compliance.esiT3Number);
      }
      if (this.compliance.comment) {
        formData.append('comment', this.compliance.comment);
      }
      if (this.compliance.ESIFileno) {
        formData.append('ESIFileno', this.compliance.ESIFileno);
      }
      if (this.originalCompliance.fssaiFileUrlOld) {
        formData.append('fssaiFile', this.originalCompliance.fssaiFileUrlOld);
      }
      if (this.originalCompliance.siteFssaiFileUrlOld) {
        formData.append('siteFssaiFile', this.originalCompliance.siteFssaiFileUrlOld);
      }
      if (this.originalCompliance.shopActFileUrlOld) {
        formData.append('shopActLicenseFile', this.originalCompliance.shopActFileUrlOld);
      }
      if (this.originalCompliance.udyamAadharFileUrlOld) {
        formData.append('udyamAadharFile', this.originalCompliance.udyamAadharFileUrlOld);
      }

      if (this.originalCompliance.tradeLicFileUrlOld) {
        formData.append('TradeLic', this.originalCompliance.tradeLicFileUrlOld);
      }
      if (this.originalCompliance.esiT3FileUrlOld) {
        formData.append('esiT3File', this.originalCompliance.esiT3FileUrlOld);
      }
      if (this.originalCompliance.aadharFileUrlOld) {
        formData.append('aadharFile', this.originalCompliance.aadharFileUrlOld);
      }
      if (this.originalCompliance.cancelledChequeFileUrlOld) {
        formData.append('cancelledChequeFile', this.originalCompliance.cancelledChequeFileUrlOld);
      }
      // if (this.originalCompliance.shopActFileUrlOld) {
      //   formData.append('shopActLicenseFile', this.originalCompliance.shopActFileUrlOld);
      // }
      // if (this.originalCompliance.shopActFileUrlOld) {
      //   formData.append('shopActLicenseFile', this.originalCompliance.shopActFileUrlOld);
      // }
      if (this.originalCompliance.pfFileUrlOld) {
        formData.append('pfFile', this.originalCompliance.pfFileUrlOld);
      }
      if (this.originalCompliance.ESIFileUrlOld) {
        formData.append('ESIFile', this.originalCompliance.ESIFileUrlOld);
      }
      if (this.originalCompliance.GSTFileUrlOld) {
        formData.append('GSTFile', this.originalCompliance.GSTFileUrlOld);
      }
      console.log(this.originalCompliance);
      if (this.originalCompliance.PanCardFileUrlOld) {
        formData.append('PanCardFile', this.originalCompliance.PanCardFileUrlOld);
      }
      if (this.originalCompliance.pestconFileUrlOld) {
        formData.append('pestconFile', this.originalCompliance.pestconFileUrlOld);
      }
      console.log('formData', formData);
      console.log(this.venderDetails);

      const kitchen = await this.apiMainService.updateVendorFirmCompliance(this.venderDetails._id, formData);
      this.venderDetails.compliance = kitchen.compliance;
      this.compliance = this.venderDetails.compliance;
      this.originalCompliance = { ...this.venderDetails.compliance };
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
    console.log(event.documentname);

    if (event.documentname == "aadharFile") {
      this.originalCompliance.aadharFileUrlOld = event.url;
      console.log(this.fileUrl);

      // this.compliance.adhaarFileUrl=this.fileUrl + event.url;
      this.compliance.aadharFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.adhaarFileUrl);
      console.log("eventaadharFile", event);
    } else if (event.documentname == "fssaiFile") {
      this.originalCompliance.fssaiFileUrlOld = event.url;
      // this.compliance.fssaiFileUrl=this.fileUrl + event.url;
      this.compliance.fssaiFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.fssaiFileUrl)
      console.log("eventfssaiFile", event);
    } else if (event.documentname == "siteFssaiFile") {
      this.originalCompliance.siteFssaiFileUrlOld = event.url;

      this.compliance.siteFssaiFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.siteFssaiFileUrl)
      console.log("eventfssaiFile", event);
    } else if (event.documentname == "shopActLicenseFile") {
      this.originalCompliance.shopActFileUrlOld = event.url;
      this.compliance.shopActLicenseFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.shopActLicenseFileUrl)
    } else if (event.documentname == "udyamAadharFile") {
      this.originalCompliance.udyamAadharFileUrlOld = event.url;

      this.compliance.udyamAadharFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.udyamAadharFileUrl)
      console.log("eventfssaiFile", event);
    }
    else if (event.documentname == "TradeLic") {
      this.originalCompliance.tradeLicFileUrlOld = event.url;

      this.compliance.TradeLicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.udyamAadharFileUrl)
      console.log("eventfssaiFile", event);
    }
    else if (event.documentname == "esiT3File") {
      this.originalCompliance.esiT3FileUrlOld = event.url;
      this.compliance.esiT3FileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.esiT3FileUrl)
      console.log("eventfssaiFile", event);
    }

    else if (event.documentname == "cancelledChequeFile") {
      this.originalCompliance.cancelledChequeFileUrlOld = event.url;
      this.compliance.cancelledChequeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
      console.log(this.compliance.cancelledChequeFileUrl)
      console.log("eventfssaiFile", event);
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
      this.originalCompliance.PanCardFileUrlOld = event.url;
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
    console.log(file);

    if (file == 'fssailic') {
      this.compliance.fssaiFileUrl = null;
      this.originalCompliance.fssaiFileUrlOld = null;
    } else if (file == 'siteFssaiFile') {
      this.compliance.siteFssaiFileUrl = null;
      this.originalCompliance.siteFssaiFileUrlOld = null;
    } else if (file == 'udyamAadharFile') {
      this.compliance.udyamAadharFileUrl = null;
      this.originalCompliance.udyamAadharFileUrlOld = null;
    } else if (file == 'shopActLicenseFile') {
      this.compliance.shopActLicenseFileUrl = null;
      this.originalCompliance.shopActFileUrlOld = null;
    }
    else if (file == 'aadharFile') {
      this.compliance.aadharFileUrl = null;
      this.originalCompliance.aadharFileUrlOld = null;
    } else if (file == 'TradeLic') {
      this.compliance.TradeLicUrl = null;
      this.originalCompliance.tradeLicFileUrlOld = null;
    } else if (file == 'pfFile') {
      this.compliance.pfFileUrl = null;
      this.originalCompliance.pfFileUrlOld = null;
    } else if (file == 'ESIFile') {
      this.compliance.ESIFileUrl = null;
      this.originalCompliance.ESIFileUrlOld = null;
    } else if (file == 'GSTFile') {
      this.compliance.GSTFileUrl = null;
      this.originalCompliance.GSTFileUrlOld = null;
    } else if (file == 'PanCardFile') {
      this.compliance.PanCardFileUrl = null;
      this.originalCompliance.PanCardFileUrlOld = null;
    } else if (file == 'pestconFile') {
      this.compliance.pestconFileUrl = null;
      this.originalCompliance.pestconFileUrlOld = null;
    }
  }
}

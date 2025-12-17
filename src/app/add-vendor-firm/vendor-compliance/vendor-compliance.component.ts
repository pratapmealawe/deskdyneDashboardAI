import { Component, OnInit, Input, ViewChild, ElementRef, Inject, Optional } from '@angular/core';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { environment } from 'src/environments/environment';
import { ImageCropperComponent } from 'src/app/image-cropper/image-cropper.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PolicyService } from 'src/service/policy.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'src/service/local-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PdfPreviewDialogComponent } from 'src/app/org-components/audit-report/pdf-preview-dialog/pdf-preview-dialog.component';

@Component({
  selector: 'app-vendor-compliance',
  templateUrl: './vendor-compliance.component.html',
  styleUrls: ['./vendor-compliance.component.scss']
})
export class VendorComplianceComponent implements OnInit {
  @Input() venderDetails: any;
  orgDetails: any;
  isAdmin: boolean = false;
  profileApproval: any;
  compliance: any = {};
  imageUrl = environment.imageUrl;
  fileUrl = environment.fileUrl;
  comment = '';
  editMode = false;
  showError = false;
  fssaiNoStatus = false;
  aadharNoStatus = false;
  panNoStatus = false;
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
  cancelledChequeFileStatus = false;
  fssaiFileStatus = false;
  adhaarFileStatus = false;
  panFileStatus = false;
  selectedMerchantFile: any;
  orgVendorInfo: any;

  @ViewChild('fssaiNoRef') fssaiNoField!: ElementRef;
  @ViewChild('aadharNo') aadharNoField!: ElementRef;
  @ViewChild('panNoRef') panNoField!: ElementRef;
  @ViewChild('cancelledChequeRef') cancelledChequeField!: ElementRef;
  @ViewChild('selfDeclarationRef') selfDeclarationRef!: ElementRef;
  @ViewChild('fssaiFileRef') fssaiFileRef!: ElementRef;
  @ViewChild('adhaarFileRef') adhaarFileRef!: ElementRef;
  @ViewChild('panFileRef') panFileRef!: ElementRef;

  constructor(private apiMainService: ApiMainService, private sanitizer: DomSanitizer,
    private modalService: NgbModal, private policyService: PolicyService,
    private localStorageService: LocalStorageService, private matDialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<VendorComplianceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.access = this.policyService.getCurrentButtonPolicy();
    this.venderDetails = data || this.venderDetails || {};
  }


  ngOnInit() {
    // this.profileApproval = this.venderDetails.profileApproval;
    this.orgDetails = this.localStorageService.getCacheData('ADMIN_PROFILE');
    if (this.orgDetails) {
      this.isAdmin = this.orgDetails.role === 'ADMIN';
    }
    this.orgVendorInfo = this.localStorageService.getCacheData('ORG_VENDOR_INFO');
    if (this.venderDetails.compliance) {
      this.compliance = this.venderDetails.compliance;

      this.originalCompliance = { ...this.venderDetails.compliance };

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

    if (this.compliance.selfDeclarationFile) {
      this.originalCompliance.selfDeclarationFileUrlOld = this.compliance.selfDeclarationFile;
      this.originalCompliance.selfDeclarationFile = this.compliance.selfDeclarationFile;
      this.compliance.selfDeclarationFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + this.compliance.selfDeclarationFile);
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

  closeMerchantDoc() {
    this.compliance.merchantOnboarding = null;
    this.originalCompliance.merchantOnboarding = null;
    this.saveImages();

  }

  handleFileInput($event: any, filename: string, height: number) {
    if ($event && $event.target && $event.target.files) {
      const file: File = $event.target.files[0];
      if (file) {
        const fileName = file.name;
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

  checkFieldStatus(event: any, type: any) {

    if (event.target.value) {

      if (type == 'fssaiNo') {
        this.fssaiNoStatus = false;
      }
      if (type == 'aadharNo') {
        this.aadharNoStatus = false
        this.compliance.adhaar = event.target.value;
      }
      if (type == 'panNo') {
        this.panNoStatus = false
      }
    }
  }
  onFileSelected(event: any) {

    const file = event.target.files[0];
    if (file) {
      this.selectedMerchantFile = file.name;
      this.originalCompliance.merchantOnboarding = this.selectedMerchantFile;
      this.saveImages()
    }

  }

  async saveImages() {
    this.showError = true;
    if (!this.compliance.fssaiNo) {
      this.fssaiNoStatus = true;
      this.scrollToField(this.fssaiNoField);
      return;
    }
    if (!this.compliance.adhaar) {
      this.aadharNoStatus = true;
      this.scrollToField(this.aadharNoField);
      return;
    }

    if (!this.compliance.cancelledChequeFileUrl) {
      this.cancelledChequeFileStatus = true;
      this.scrollToField(this.cancelledChequeField);
      return;
    }

    if (!this.compliance.fssaiFileUrl) {
      this.fssaiFileStatus = true;
      this.scrollToField(this.fssaiFileRef);
      return;
    }
    if (!this.compliance.aadharFileUrl) {
      this.adhaarFileStatus = true;
      this.scrollToField(this.adhaarFileRef);
      return;
    }

    if (!this.compliance.PanCardFileUrl) {
      this.panFileStatus = true;
      this.scrollToField(this.panFileRef);
      return;
    }

    if (!this.compliance.panNumber) {
      this.panNoStatus = true;
      this.scrollToField(this.panNoField);
      return;
    }
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
      if (this.originalCompliance.selfDeclarationFileUrlOld) {
        formData.append('selfDeclarationFile', this.originalCompliance.selfDeclarationFileUrlOld);
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
      // if (this.originalCompliance.merchantOnboarding) {
      //   formData.append('merchantOnboarding', this.originalCompliance.merchantOnboarding);

      // }
      if (this.originalCompliance.pestconFileUrlOld) {
        formData.append('pestconFile', this.originalCompliance.pestconFileUrlOld);
      }

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
    this.editMode = false;
  }

  scrollToField(field: ElementRef) {
    field?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    field?.nativeElement?.focus();
  }


  uploadDoc(event: any) {

    if (event.documentname == "aadharFile") {
      this.originalCompliance.aadharFileUrlOld = event.url;
      this.compliance.aadharFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    } else if (event.documentname == "fssailic") {
      this.originalCompliance.fssaiFileUrlOld = event.url;
      this.compliance.fssaiFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    } else if (event.documentname == "siteFssaiFile") {
      this.originalCompliance.siteFssaiFileUrlOld = event.url;
      this.compliance.siteFssaiFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    } else if (event.documentname == "shopActLicenseFile") {
      this.originalCompliance.shopActFileUrlOld = event.url;
      this.compliance.shopActLicenseFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    } else if (event.documentname == "udyamAadharFile") {
      this.originalCompliance.udyamAadharFileUrlOld = event.url;
      this.compliance.udyamAadharFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }
    else if (event.documentname == "TradeLic") {
      this.originalCompliance.tradeLicFileUrlOld = event.url;
      this.compliance.TradeLicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }
    else if (event.documentname == "esiT3File") {
      this.originalCompliance.esiT3FileUrlOld = event.url;
      this.compliance.esiT3FileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "cancelledChequeFile") {
      this.cancelledChequeFileStatus = true;
      this.originalCompliance.cancelledChequeFileUrlOld = event.url;
      this.compliance.cancelledChequeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "selfDeclarationFile") {
      // this.cancelledChequeFileStatus = true;
      this.originalCompliance.selfDeclarationFileUrlOld = event.url;
      this.compliance.selfDeclarationFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "pfFile") {
      this.originalCompliance.pfFileUrlOld = event.url;
      this.compliance.pfFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "ESIFile") {
      this.originalCompliance.ESIFileUrlOld = event.url;
      this.compliance.ESIFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "GSTFile") {
      this.originalCompliance.GSTFileUrlOld = event.url;
      this.compliance.GSTFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }
    else if (event.documentname == "PanCardFile") {
      this.originalCompliance.PanCardFileUrlOld = event.url;
      this.compliance.PanCardFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }

    else if (event.documentname == "pestconFile") {
      this.originalCompliance.pestconFileUrlOld = event.url;
      this.compliance.pestconFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl + event.url);
    }
  }

  downloadFile(fileUrl: string | SafeResourceUrl): void {
    let urlString: string = '';

    // Get the raw URL string from the sanitized object
    if (fileUrl && (fileUrl as any).changingThisBreaksApplicationSecurity) {
      urlString = (fileUrl as any).changingThisBreaksApplicationSecurity;
    } else if (typeof fileUrl === 'string') {
      urlString = fileUrl;
    }

    // Check if a valid URL string was found
    if (urlString) {
      // We fetch the file as a Blob to ensure we can force a download
      fetch(urlString)
        .then(response => response.blob())
        .then(blob => {
          // Create an object URL from the Blob
          const blobUrl = URL.createObjectURL(blob);

          // Create a temporary anchor element
          const link = document.createElement('a');
          link.href = blobUrl;

          // Extract a filename from the URL for the download
          const fileName = urlString.substring(urlString.lastIndexOf('/') + 1);
          link.download = fileName;

          // Append, click, and remove the link
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up the object URL to free up memory
          URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
          console.error('Download failed:', error);
          alert('File download failed. Please try again.');
        });
    } else {
      console.error('Invalid file URL provided for download:', fileUrl);
    }
  }

  DeleteFile(file: any) {
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
    else if (file == 'esiT3File') {
      this.compliance.esiT3FileUrl = null;
      this.originalCompliance.esiT3FileUrlOld = null;
    } else if (file == 'cancelledChequeFile') {
      this.originalCompliance.cancelledChequeFileUrlOld = null;
      this.compliance.cancelledChequeFileUrl = null;
    }
    else if (file == 'selfDeclarationFile') {
      this.originalCompliance.selfDeclarationFileUrlOld = null;
      this.compliance.selfDeclarationFileUrl = null;
    }
  }

  viewFile(fileUrl: any, title: string) {
    let url: string = '';

    // Handle SafeResourceUrl or string
    if (fileUrl && typeof fileUrl === 'object' && (fileUrl as any).changingThisBreaksApplicationSecurity) {
      url = (fileUrl as any).changingThisBreaksApplicationSecurity;
    } else if (typeof fileUrl === 'string') {
      url = fileUrl;
    }

    if (url) {
      // Ensure the component is working with the dialog
      this.matDialog.open(PdfPreviewDialogComponent, {
        width: '800px',
        maxWidth: '95vw',
        height: '90vh',
        data: {
          title: title,
          fileName: title,
          url: url
        },
        panelClass: 'custom-dialog-container',
        autoFocus: false
      });
    } else {
      console.warn('ViewFile: No valid URL found', fileUrl);
      // Optional: Show a user friendly message
      // this.apiMainService.showSnackBar('No valid file URL to view.');
    }
  }

}

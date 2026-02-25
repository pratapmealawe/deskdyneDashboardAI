import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiMainService } from 'src/service/apiService/apiMain.service';
import { ToasterService } from 'src/service/toaster.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-pdfupload',
  templateUrl: './pdfupload.component.html',
  styleUrls: ['./pdfupload.component.scss']
})
export class PdfuploadComponent implements OnChanges {
  @Input() documentname: any;
  @Input() documentUrl: any;
  @Output() upload: EventEmitter<any> = new EventEmitter<any>();
  selectedFile: any;
  isDragging = false;
  selectedFileURL: SafeUrl | null = '';
  inputId = Math.random() * 1000;
  isUploading = false;

  constructor(
    private sanitizer: DomSanitizer,
    private apiMainService: ApiMainService,
    private toasterService: ToasterService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (this.documentUrl) {
      this.selectedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentUrl);
      console.log(this.selectedFileURL);

    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Create a URL for the selected file
      const objectURL = URL.createObjectURL(this.selectedFile);
      this.selectedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    }
  }


  cancelSelection() {
    this.selectedFile = null;
    this.selectedFileURL = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];

      // Create a URL for the dropped file
      const objectURL = URL.createObjectURL(this.selectedFile);
      this.selectedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    }
  }

  isImage(file: File | string | null): boolean {
    if (!file) return false;
    if (file instanceof File) {
      return file.type.startsWith('image/');
    }
    // For URLs, check extension
    const url = typeof file === 'string' ? file : '';
    return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
  }

  isPdf(file: File | string | null): boolean {
    if (!file) return false;
    if (file instanceof File) {
      return file.type === 'application/pdf';
    }
    const url = typeof file === 'string' ? file : '';
    return /\.pdf$/i.test(url);
  }

  async uploadFile() {
    if (this.isUploading) return;

    try {
      if (this.selectedFile) {
        // Validate file size locally as well (50MB)
        if (this.selectedFile.size > 50 * 1024 * 1024) {
          this.toasterService.error('File size too large. Professional maximum is 50MB.');
          return;
        }

        this.isUploading = true;
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);

        const filedetails = await this.apiMainService.createPdf(formData);

        const docobj = {
          url: filedetails.fileUrl,
          documentname: this.documentname,
          isImage: filedetails.isImage ?? false,
          mimetype: filedetails.mimetype ?? '',
          originalname: filedetails.originalname ?? ''
        };

        this.upload.emit(docobj);
        this.toasterService.success('File uploaded successfully');

        // Reset state after success
        this.selectedFile = null;
        this.selectedFileURL = null;
      } else {
        this.toasterService.warning('Please select a file first');
      }
    } catch (err) {
      console.error('PdfuploadComponent: Upload failed', err);
      // Note: apiHttpService already shows a toast for server errors 
      // since we returned { msg: "..." } from the backend.
    } finally {
      this.isUploading = false;
    }
  }
}

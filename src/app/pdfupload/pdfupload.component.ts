import { Component, Input, Output,EventEmitter ,OnChanges, SimpleChanges} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiMainService } from 'src/service/apiService/apiMain.service';


declare const Croppr:any;

@Component({
  selector: 'app-pdfupload',
  templateUrl: './pdfupload.component.html',
  styleUrls: ['./pdfupload.component.scss']
})
export class PdfuploadComponent implements OnChanges{
  @Input() documentname:any;
  @Input() documentUrl:any;
  @Output() upload:EventEmitter<any> = new EventEmitter<any>();
  selectedFile: File | null = null;
  isDragging = false;
  selectedFileURL: SafeUrl | null = '';
  inputId=Math.random()*1000
  constructor(private sanitizer: DomSanitizer, private apiMainService: ApiMainService,) {
  }
  ngOnChanges(changes: SimpleChanges): void {
   if(this.documentUrl){
    this.selectedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentUrl);
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

  async uploadFile() {
    try{
    if (this.selectedFile) {
      // Create FormData object
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name); // Append file to form data

      const filedetails = await this.apiMainService.createPdf(formData);
      console.log(this.documentname);
      let docobj={
        url:filedetails.fileUrl,
        documentname:this.documentname
      }
      this.upload.emit(docobj);
    } else {
      console.log('No file selected');
    }
  }catch(err){
    console.log(err)
  }
}
}

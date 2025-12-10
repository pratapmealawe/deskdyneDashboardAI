import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-pdf-preview-dialog',
    templateUrl: './pdf-preview-dialog.component.html',
    styleUrls: ['./pdf-preview-dialog.component.scss']
})
export class PdfPreviewDialogComponent implements OnInit {
    pdfUrl: SafeResourceUrl | null = null;
    rawUrl: string = '';
    fileName: string = 'document.pdf';

    constructor(
        private dialogRef: MatDialogRef<PdfPreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private sanitizer: DomSanitizer
    ) {
        if (data.url) {
            this.rawUrl = data.url;
            this.fileName = data.fileName || 'document.pdf';
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
        }
    }

    ngOnInit(): void {
    }

    download() {
        const link = document.createElement('a');
        link.href = this.rawUrl;
        link.download = this.fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    close() {
        this.dialogRef.close();
    }
}

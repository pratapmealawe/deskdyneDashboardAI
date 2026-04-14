import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare const Croppr: any;

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ImageCropperComponent implements OnInit {
  croppr: any;
  uploadedImageUrl: any;
  imageWidth: any;
  imageHeight: any;
  aspectRatio: any;

  constructor(
    public dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.uploadedImageUrl = this.data.imageUrl;
      this.imageWidth = this.data.imageWidth;
      this.imageHeight = this.data.imageHeight;
      this.aspectRatio = this.data.aspectRatio;
    }
    setTimeout(() => {
      this.cropImage();
    }, 100);
  }

  cropImage() {
    const croperObj: any = { returnMode: 'real' };
    if (this.imageWidth && this.imageHeight) {
      croperObj.minSize = [this.imageWidth, this.imageHeight, 'px'];
      croperObj.startSize = [this.imageWidth, this.imageHeight, 'px'];
    } else {
      croperObj.minSize = [10, 10, '%'];
      croperObj.startSize = [80, 80, '%'];
    }
    if (this.aspectRatio) {
      croperObj.aspectRatio = this.aspectRatio;
    }
    this.croppr = new Croppr('#cropper', croperObj);
  }

  async done() {
    try {
      const finalValue = this.croppr.getValue();
      const resizedImage = await this.resize({ imgUrl: this.croppr.imageClippedEl.getAttribute('src'), ...finalValue });
      this.goback(true, resizedImage);
    } catch (error) {
      console.log('resizedImage error ', error);
    }
  }

  reset() {
    this.croppr.reset();
  }

  goback(confirm: any, croppedImages?: any) {
    this.dialogRef.close({ confirm, croppedImages });
  }

  resize({ imgUrl, x, y, width, height }: any) {
    return new Promise((resolve, reject) => {
      try {
        const finalWidth = this.imageWidth ? this.imageWidth : width;
        const finalHeight = this.imageHeight ? this.imageHeight : height;
        const img = new Image();
        img.src = imgUrl;
        let oc: any = document.createElement('canvas'), octx: any = oc.getContext('2d');
        oc.width = finalWidth;
        oc.height = finalHeight;
        octx.fillStyle = 'white';
        octx.fillRect(0, 0, finalWidth, finalHeight);
        img.onload = function () {
          octx.drawImage(img, x, y, width, height, 0, 0, finalWidth, finalHeight);
          const resizeDataUrl = oc.toDataURL();
          oc.toBlob((blob: any) => {
            let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
            resolve({ file, resizeDataUrl });
          }, 'image/jpeg', 0.99);
        }
      } catch (e) {
        reject(e);
      }
    })
  }
}

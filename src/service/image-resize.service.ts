import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ImageResizeService {

    resize(imgUrl:any) {
        return new Promise((resolve) =>{
            try{
            const img = new Image();
            img.src = imgUrl;
            const width = 200;    
            var oc = document.createElement('canvas'), octx:any = oc.getContext('2d');
            oc.width = width;
            oc.height = width;
            img.onload = function(){
                octx.drawImage(img, 0, 0, oc.width, oc.height);
                // const resize = oc.toDataURL();
                oc.toBlob((blob:any) => {
                    let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
                    resolve(file);
                  }, 'image/jpeg', 0.99);
                
            }
            }catch(e){
                resolve(imgUrl);
            }
        })                   
    }

}
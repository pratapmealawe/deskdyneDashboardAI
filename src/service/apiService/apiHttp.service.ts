import { LoaderstatusService } from './../../app/main-loader/loaderstatus.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RuntimeStorageService } from '../runtime-storage.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  private withCredentials: boolean = environment.withCredentials ? environment.withCredentials : false;
  constructor(
    private httpClient: HttpClient,
    private loaderstatusService: LoaderstatusService,
    private toasterService: ToasterService,
    private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService,
    public router: Router
  ) { }

  callFinalApi(requestObj: HttpRequest<any>, hideLoader?:any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      if(!hideLoader){
        this.loaderstatusService.show();
      }      
      this.httpClient
      .request(requestObj)
      .subscribe(this.successCallback(resolve),this.errorCallback(reject));   
    });
    return p;
  }

  private successCallback = (resolve:any)=>{
    return (response: any) => {
      // console.log('successCallback ',response)
      if (response && response.body) {         
          this.loaderstatusService.hide();
          resolve(response.body);          
      }
    }
  };
  private errorCallback = (reject:any)=>{
    return  (error:any) => {
      this.loaderstatusService.hide();
      if(error && error.status === 401){
        this.localStorageService.resetAllCacheData();
        this.runtimeStorageService.resetAllCacheData();       
        this.router.navigate(['/login']);
      }else if(error && error.error && error.error.msg){
        this.toasterService.error(error.error.msg);
        reject(error);
      }else{
        this.toasterService.error(300);
        reject(error);
      }        
    }
  }

  REQUEST(
    apiConfig: {method: string; url: string},
    data?: any,
    extraHeaderObj?: any,
    hideLoader?: boolean,
    useDdToken?:boolean
  ): Promise<any> {
    const headerobj:any = {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    };
    let responseType = 'json';
    let requestObj: HttpRequest<any>;
    if(useDdToken){      
      const token = this.localStorageService.getCacheData('DD_ADMIN_TOKEN');
      if(token){
        headerobj['authorization'] = `Bearer ${token}`;
      }
    }else{
      const token = this.localStorageService.getCacheData('ADMIN_TOKEN');
      if(token){
        headerobj['authorization'] = `Bearer ${token}`;
      }
    }
   
    if (extraHeaderObj) {
      if(extraHeaderObj['Accept']=== 'text/html'){
        responseType = 'text';
      }
      for (const prop in extraHeaderObj) {
        headerobj[prop] = extraHeaderObj[prop];
      }      
    }
    
    if(responseType === 'text'){
      requestObj = new HttpRequest(
        apiConfig.method,
        apiConfig.url,
        data ? data : null,
        {
          headers: new HttpHeaders(headerobj),
          withCredentials: this.withCredentials,
          responseType: 'text'
        }
       );
    }else{
      requestObj = new HttpRequest(
        apiConfig.method,
        apiConfig.url,
        data ? data : null,
        {
          headers: new HttpHeaders(headerobj),
          withCredentials: this.withCredentials,
          responseType: 'json'
        }
       );
    }    
    
    return this.callFinalApi(requestObj, hideLoader);
  }

}
